import { useRef, useCallback } from 'react';
import { TTS_LANGUAGE_MAP } from '@/lib/languages';

interface TTSOptions {
  onStart?: () => void;
  onEnd?: () => void;
}

// ─── OPTIMIZATION: Cache the voice lookup result per language ──────────────────
// Calling getVoices() and filtering 50+ voices on every speak() call is expensive.
// This cache stores the best voice per language code so the lookup runs once.
const voiceCache = new Map<string, SpeechSynthesisVoice | null>();

function findBestVoice(langCode: string): SpeechSynthesisVoice | null {
  if (voiceCache.has(langCode)) return voiceCache.get(langCode) ?? null;

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null; // Voices not loaded yet

  const best =
    voices.find((v) => v.lang.startsWith(langCode) && v.name.includes('Google')) ??
    voices.find((v) => v.lang.startsWith(langCode)) ??
    null;

  voiceCache.set(langCode, best);
  return best;
}

// Clear cache when the browser loads/reloads the voice list
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.addEventListener('voiceschanged', () => voiceCache.clear());
}

export function useTTS({ onStart, onEnd }: TTSOptions = {}) {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isSupported = typeof window !== 'undefined';

  const stop = useCallback(() => {
    if (isSupported && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }, [isSupported]);

  const speak = useCallback(
    (text: string, languageLabel: string) => {
      if (!isSupported || !text.trim()) return;
      stop();

      const bcp47    = TTS_LANGUAGE_MAP[languageLabel] || 'en-US';
      const langCode = bcp47.split('-')[0];

      // ─── OPTIMIZATION: Read localStorage once, not on every speak ─────────
      const voiceId = typeof window !== 'undefined'
        ? (localStorage.getItem('vb_voice_id') || 'nova')
        : 'nova';

      const pitchRateMap: Record<string, [number, number]> = {
        nova:    [1.1, 1.0],
        female:  [1.2, 1.0],
        male:    [0.8, 0.9],
        neutral: [0.95, 0.95],
      };
      const [pitch, rate] = pitchRateMap[voiceId] ?? [1.0, 1.0];

      const trySpeechSynthesis = (): boolean => {
        if (!('speechSynthesis' in window)) return false;

        const voices = window.speechSynthesis.getVoices();

        // No voices loaded at all — wait for voiceschanged
        if (!voices.length) return false;

        const matchingVoice = findBestVoice(langCode);

        // Non-English with no matching voice → use TTS API proxy (better quality)
        if (!matchingVoice && langCode !== 'en') return false;

        const utterance    = new SpeechSynthesisUtterance(text);
        utterance.lang     = bcp47;
        utterance.pitch    = pitch;
        utterance.rate     = rate;
        if (matchingVoice) utterance.voice = matchingVoice;

        utterance.onstart  = () => onStart?.();
        utterance.onend    = () => onEnd?.();
        utterance.onerror  = () => { onEnd?.(); };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        return true;
      };

      if (!trySpeechSynthesis()) {
        // Fallback: Next.js API proxy (avoids CORS and 403s from Google TTS directly)
        const url   = `/api/tts?text=${encodeURIComponent(text)}&lang=${langCode}`;
        const audio = new Audio(url);
        audio.playbackRate = rate;
        audioRef.current   = audio;

        audio.onplay   = () => onStart?.();
        audio.onended  = () => onEnd?.();
        audio.onerror  = () => { onEnd?.(); };

        audio.play().catch(() => { onEnd?.(); });
      }
    },
    [isSupported, stop, onStart, onEnd]
  );

  return { speak, stop, isSupported };
}
