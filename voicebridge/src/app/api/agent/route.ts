import { NextRequest, NextResponse } from 'next/server';
import { QdrantClient } from '@qdrant/js-client-rest';
import { v4 as uuidv4 } from 'uuid';

// Initialize Qdrant Client for vector database integration
const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL || 'http://localhost:6333',
  apiKey: process.env.QDRANT_API_KEY,
});

async function logTranslationVector(original: string, translated: string, fromLang: string, targetLang: string) {
  try {
    // Ensure collection exists (for dev purposes, usually done on setup)
    try {
      await qdrant.getCollection("translations");
    } catch {
      await qdrant.createCollection("translations", { vectors: { size: 10, distance: 'Cosine' } });
    }
    // Upload translation and mock vectors
    await qdrant.upsert("translations", {
      wait: false,
      points: [
        {
          id: uuidv4(),
          vector: Array.from({ length: 10 }, () => Math.random() - 0.5), // Mock embeddings since we lack an embedding model here
          payload: { original, translated, fromLang, targetLang, timestamp: new Date().toISOString() }
        }
      ]
    });
  } catch (err) {
    console.error("[Qdrant] vector logging error:", err);
  }
}

// ─── Types ─────────────────────────────────────────────────────────────────────
interface AgentRequest {
  text: string;
  targetLang: string;   // e.g. "Hindi"
  fromLang?: string;    // e.g. "English"
}

interface AgentResponse {
  original: string;
  corrected: string;
  translated: string;
  error?: string;
}

// ─── Language → locale map (for MyMemory API) ──────────────────────────────────
const LANG_TO_LOCALE: Record<string, string> = {
  English: 'en', Hindi: 'hi', Bengali: 'bn', Marathi: 'mr', Gujarati: 'gu',
  Punjabi: 'pa', Urdu: 'ur', Odia: 'or', Assamese: 'as', Konkani: 'kok',
  Maithili: 'mai', Sindhi: 'sd', Dogri: 'doi', Sanskrit: 'sa', Telugu: 'te',
  Tamil: 'ta', Kannada: 'kn', Malayalam: 'ml', Manipuri: 'mni', Bodo: 'brx',
  Santali: 'sat', Kashmiri: 'ks', Nepali: 'ne', Spanish: 'es', French: 'fr',
  German: 'de', Mandarin: 'zh-CN', Arabic: 'ar', Japanese: 'ja', Korean: 'ko',
  Portuguese: 'pt', Russian: 'ru', Italian: 'it', Turkish: 'tr',
  Vietnamese: 'vi', Thai: 'th', Indonesian: 'id', Malay: 'ms', Swahili: 'sw',
  Dutch: 'nl', Polish: 'pl', Ukrainian: 'uk',
};

// ─── Free fallback: MyMemory translation API (no key required) ─────────────────
async function translateMyMemory(text: string, fromLang: string, targetLang: string): Promise<string | null> {
  const from = LANG_TO_LOCALE[fromLang] || 'en';
  const to   = LANG_TO_LOCALE[targetLang] || 'en';
  if (from === to) return text;

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const data = await res.json();
    const translated = data?.responseData?.translatedText;
    if (translated && typeof translated === 'string' && translated !== text) {
      return translated;
    }
    return null;
  } catch {
    return null;
  }
}

// ─── Gemini translation (if GEMINI_API_KEY is set) ─────────────────────────────
async function translateGemini(text: string, fromLang: string, targetLang: string): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const prompt = `Translate the following text from ${fromLang} to ${targetLang}. Return ONLY the translated text, nothing else, no explanation, no punctuation changes beyond the translation itself.\n\nText: ${text}`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 500 },
        }),
        signal: AbortSignal.timeout(10000),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const translated = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return translated || null;
  } catch {
    return null;
  }
}

// ─── OpenAI translation (if OPENAI_API_KEY is set & valid) ─────────────────────
async function translateOpenAI(text: string, fromLang: string, targetLang: string): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === 'your_openai_api_key_here') return null;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: `You are a translation engine. Translate from ${fromLang} to ${targetLang}. Return ONLY the translated text.` },
          { role: 'user', content: text },
        ],
        temperature: 0.1,
        max_tokens: 400,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.choices?.[0]?.message?.content?.trim() || null;
  } catch {
    return null;
  }
}

// ─── Route Handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: AgentRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body', original: '', corrected: '', translated: '' }, { status: 400 });
  }

  const { text, targetLang = 'Hindi', fromLang = 'English' } = body;

  if (!text?.trim()) {
    return NextResponse.json({ error: 'No text provided', original: '', corrected: '', translated: '' }, { status: 400 });
  }

  const input = text.trim();

  // Try providers in priority order: Gemini → OpenAI → MyMemory (free)
  let translated: string | null = null;

  translated = await translateGemini(input, fromLang, targetLang);
  if (!translated) translated = await translateOpenAI(input, fromLang, targetLang);
  if (!translated) translated = await translateMyMemory(input, fromLang, targetLang);

  if (translated) {
    // Log to Qdrant vector database
    await logTranslationVector(input, translated, fromLang, targetLang);

    return NextResponse.json({
      original: input,
      corrected: input,
      translated,
    } satisfies AgentResponse);
  }

  // All providers failed — return original with error flag
  return NextResponse.json({
    original: input,
    corrected: input,
    translated: input,
    error: 'Translation service unavailable. Showing original text.',
  } satisfies AgentResponse, { status: 200 });
}
