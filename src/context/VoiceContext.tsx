'use client';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { LANGUAGES, type Language } from '@/lib/languages';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useTTS } from '@/hooks/useTTS';
import type { VoiceState, Message, AIResponse } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { audioService } from '@/lib/audioService';

// ─── Context Shape ─────────────────────────────────────────────────────────────
interface VoiceContextValue {
  fromLang: Language;
  toLang: Language;
  setFromLang: (lang: Language) => void;
  setToLang: (lang: Language) => void;
  voiceState: VoiceState;
  messages: Message[];
  sessionCount: number;
  errorMessage: string | null;
  startListening: () => void;
  stopListening: () => void;
  sendText: (text: string) => Promise<void>;
  clearMessages: () => void;
  clearError: () => void;
  speakText: (text: string, langLabel: string) => void;
  stopSpeaking: () => void;
  pendingNavigate: boolean;
  clearPendingNavigate: () => void;
}

const VoiceContext = createContext<VoiceContextValue | null>(null);

// ─── OPTIMIZATION: Client-side translation cache ────────────────────────────────
// Shared with the API's server-side cache. This client cache prevents
// repeat network requests entirely for the same phrase in the same session.
const clientTranslationCache = new Map<string, string>();

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [fromLang, setFromLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vb_from_lang');
      if (saved) {
        const found = LANGUAGES.find(l => l.code === saved);
        if (found) return found;
      }
    }
    return LANGUAGES[0];
  });

  const [toLang, setToLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vb_to_lang');
      if (saved) {
        const found = LANGUAGES.find(l => l.code === saved);
        if (found) return found;
      }
    }
    return LANGUAGES[1];
  });
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionCount, setSessionCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingNavigate, setPendingNavigate] = useState(false);

  const processingRef = useRef(false);
  const sessionStartRef = useRef<number>(Date.now());
  // Track message count in a ref to avoid re-creating processText callback
  const messageCountRef = useRef(0);

  const { addSession } = useAuth();

  // Sync message count ref when messages change
  useEffect(() => {
    messageCountRef.current = messages.length;
  }, [messages.length]);

  // ── TTS ──────────────────────────────────────────────────────────────────────
  const { speak, stop: stopSpeakingRaw } = useTTS({
    onStart: () => setVoiceState('speaking'),
    onEnd: () => setVoiceState('idle'),
  });

  const stopSpeaking = useCallback(() => stopSpeakingRaw(), [stopSpeakingRaw]);

  // ── API call with client-side cache check ─────────────────────────────────────
  const callAgent = useCallback(
    async (text: string): Promise<AIResponse | null> => {
      // ─── OPTIMIZATION: Check client cache before making any network request ─
      const ck = `${fromLang.label}|${toLang.label}|${text.toLowerCase()}`;
      const cached = clientTranslationCache.get(ck);
      if (cached) {
        return { original: text, corrected: text, translated: cached };
      }

      try {
        const res = await fetch('/api/agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // OPTIMIZATION: Only send what the API actually needs (smaller payload)
          body: JSON.stringify({ text, targetLang: toLang.label, fromLang: fromLang.label }),
        });

        if (!res.ok) return null;
        const data = await res.json();

        const result = {
          original: data.original ?? text,
          corrected: data.corrected ?? text,
          translated: data.translated ?? text,
        };

        // Cache the result client-side
        clientTranslationCache.set(ck, result.translated);
        return result;
      } catch (err) {
        console.error('[VoiceBridge] Agent error:', err);
        return null;
      }
    },
    [fromLang.label, toLang.label]
  );

  // ── Core pipeline: text → cache/API → messages → TTS ─────────────────────────
  const processText = useCallback(
    async (text: string) => {
      if (!text.trim() || processingRef.current) return;
      processingRef.current = true;

      setVoiceState('processing');
      setErrorMessage(null);

      const userMsgId = Date.now().toString();
      const userMsg: Message = {
        id: userMsgId,
        role: 'user',
        original: text,
        lang: fromLang.label,
        targetLang: toLang.label,
        timestamp: new Date(),
        isStreaming: true,
      };

      // OPTIMIZATION: Use functional update to avoid stale closure on messages
      setMessages((prev) => [...prev, userMsg]);

      setVoiceState('translating');
      const result = await callAgent(text);

      if (!result) {
        setMessages((prev) =>
          prev.map((m) => m.id === userMsgId ? { ...m, isStreaming: false, error: true } : m)
        );
        setErrorMessage("Couldn't reach AI. Showing your original text.");
        setVoiceState('idle');
        processingRef.current = false;
        return;
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === userMsgId
            ? { ...m, translated: result.translated, isStreaming: false }
            : m
        )
      );

      audioService.playSuccess();
      setSessionCount((c) => c + 1);
      setPendingNavigate(true);

      // OPTIMIZATION: Don't await session recording — it's not on the critical path
      const durationSec = Math.round((Date.now() - sessionStartRef.current) / 1000);
      const mins = Math.floor(durationSec / 60);
      const secs = durationSec % 60;
      // Non-blocking — wrap in Promise.resolve so .catch works even if addSession returns void
      Promise.resolve(addSession({
        from: fromLang.label,
        to: toLang.label,
        fromFlag: fromLang.flag,
        toFlag: toLang.flag,
        messages: messageCountRef.current + 1,
        duration: `${mins}m ${secs.toString().padStart(2, '0')}s`,
      })).catch(() => {});

      sessionStartRef.current = Date.now();

      setVoiceState('speaking');
      speak(result.translated, toLang.label);
      processingRef.current = false;
    },
    // OPTIMIZATION: Removed messages.length from deps (use ref instead) to prevent
    // processText from being recreated every time a new message is added.
    [fromLang.label, fromLang.flag, toLang.label, toLang.flag, callAgent, speak, addSession]
  );

  // ── Speech Recognition ───────────────────────────────────────────────────────
  const voiceStateRef = useRef(voiceState);
  useEffect(() => { voiceStateRef.current = voiceState; }, [voiceState]);

  const { start: startRecognition, stop: stopRecognition, isSupported } = useSpeechRecognition({
    lang: fromLang.bcp47,
    onResult: processText,
    onError: (err) => {
      setErrorMessage(err);
      setVoiceState('idle');
    },
    onStart: () => {
      setVoiceState('listening');
      audioService.playStart();
    },
    onEnd: () => {
      setVoiceState((prev) => (prev === 'listening' ? 'idle' : prev));
      if (voiceStateRef.current === 'listening') audioService.playStop();
    },
  });

  const startListening = useCallback(() => {
    if (!isSupported) {
      setErrorMessage('Speech recognition not supported. Use Chrome or Edge.');
      return;
    }
    setErrorMessage(null);
    stopSpeaking();
    startRecognition();
  }, [isSupported, startRecognition, stopSpeaking]);

  const stopListening = useCallback(() => {
    stopRecognition();
    setVoiceState('idle');
  }, [stopRecognition]);

  const sendText = useCallback(
    async (text: string) => {
      stopSpeaking();
      await processText(text);
    },
    [processText, stopSpeaking]
  );

  const clearMessages = useCallback(() => setMessages([]), []);
  const clearError = useCallback(() => setErrorMessage(null), []);
  const clearPendingNavigate = useCallback(() => setPendingNavigate(false), []);
  const setFromLang = useCallback((l: Language) => {
    setFromLangState(l);
    if (typeof window !== 'undefined') localStorage.setItem('vb_from_lang', l.code);
  }, []);
  const setToLang = useCallback((l: Language) => {
    setToLangState(l);
    if (typeof window !== 'undefined') localStorage.setItem('vb_to_lang', l.code);
  }, []);
  const speakText = useCallback(
    (text: string, langLabel: string) => { stopSpeaking(); speak(text, langLabel); },
    [speak, stopSpeaking]
  );

  // OPTIMIZATION: Memoize the full context value object so consumers only re-render
  // when a value they actually use changes (not on every VoiceProvider render).
  const contextValue = useMemo<VoiceContextValue>(
    () => ({
      fromLang, toLang, setFromLang, setToLang,
      voiceState, messages, sessionCount, errorMessage,
      startListening, stopListening, sendText,
      clearMessages, clearError,
      speakText, stopSpeaking,
      pendingNavigate, clearPendingNavigate,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      fromLang, toLang, voiceState, messages, sessionCount,
      errorMessage, pendingNavigate,
    ]
  );

  return (
    <VoiceContext.Provider value={contextValue}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice(): VoiceContextValue {
  const ctx = useContext(VoiceContext);
  if (!ctx) throw new Error('useVoice must be used inside <VoiceProvider>');
  return ctx;
}
