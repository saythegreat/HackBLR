'use client';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import { LANGUAGES, type Language } from '@/lib/languages';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useTTS } from '@/hooks/useTTS';
import type { VoiceState, Message, AIResponse } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

// ─── Context Shape ─────────────────────────────────────────────────────────────
interface VoiceContextValue {
  // Language state
  fromLang: Language;
  toLang: Language;
  setFromLang: (lang: Language) => void;
  setToLang: (lang: Language) => void;

  // Voice pipeline state
  voiceState: VoiceState;
  messages: Message[];
  sessionCount: number;
  errorMessage: string | null;

  // Actions
  startListening: () => void;
  stopListening: () => void;
  sendText: (text: string) => Promise<void>;
  clearMessages: () => void;
  clearError: () => void;
  speakText: (text: string, langLabel: string) => void;
  stopSpeaking: () => void;

  // Navigate to conversation after voice input
  pendingNavigate: boolean;
  clearPendingNavigate: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const VoiceContext = createContext<VoiceContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function VoiceProvider({ children }: { children: ReactNode }) {
  const [fromLang, setFromLangState] = useState<Language>(LANGUAGES[0]); // English
  const [toLang, setToLangState] = useState<Language>(LANGUAGES[1]);     // Hindi
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionCount, setSessionCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingNavigate, setPendingNavigate] = useState(false);
  const processingRef = useRef(false);
  const sessionStartRef = useRef<number>(Date.now()); // track session duration

  // Auth context — used to record sessions in history
  const { addSession } = useAuth();

  // ── TTS ──────────────────────────────────────────────────────────────────────
  const { speak, stop: stopSpeaking } = useTTS({
    onStart: () => setVoiceState('speaking'),
    onEnd: () => setVoiceState('idle'),
  });

  // ── API call ─────────────────────────────────────────────────────────────────
  const callAgent = useCallback(
    async (text: string): Promise<AIResponse | null> => {
      try {
        const res = await fetch('/api/agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text,
            targetLang: toLang.label,
            fromLang: fromLang.label,
          }),
        });
        const data = await res.json();
        // Always return data — the API always has a translated field
        return {
          original: data.original ?? text,
          corrected: data.corrected ?? text,
          translated: data.translated ?? text,
        };
      } catch (err) {
        console.error('[VoiceBridge] Agent error:', err);
        return null;
      }
    },
    [fromLang.label, toLang.label]
  );

  // ── Core pipeline: text → API → messages → TTS ───────────────────────────────
  const processText = useCallback(
    async (text: string) => {
      if (!text.trim() || processingRef.current) return;
      processingRef.current = true;

      setVoiceState('processing');
      setErrorMessage(null);

      // Optimistically add user message (raw input)
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
      setMessages((prev) => [...prev, userMsg]);

      // Call AI Agent
      setVoiceState('translating');
      const result = await callAgent(text);

      if (!result) {
        // Update user message with error state
        setMessages((prev) =>
          prev.map((m) =>
            m.id === userMsgId
              ? { ...m, isStreaming: false, error: true }
              : m
          )
        );
        setErrorMessage("Couldn't reach AI. Showing your original text.");
        setVoiceState('idle');
        processingRef.current = false;
        return;
      }

      // Update user message with corrected + translated
      setMessages((prev) =>
        prev.map((m) =>
          m.id === userMsgId
            ? {
                ...m,
                improved: undefined, // translation-only mode: no grammar correction
                translated: result.translated,
                isStreaming: false,
              }
            : m
        )
      );

      setSessionCount((c) => c + 1);
      setPendingNavigate(true); // signal to navigate to conversation

      // Record session in AuthContext history
      const durationSec = Math.round((Date.now() - sessionStartRef.current) / 1000);
      const mins = Math.floor(durationSec / 60);
      const secs = durationSec % 60;
      addSession({
        from: fromLang.label,
        to: toLang.label,
        fromFlag: fromLang.flag,
        toFlag: toLang.flag,
        messages: messages.length + 1,
        duration: `${mins}m ${secs.toString().padStart(2, '0')}s`,
      });
      sessionStartRef.current = Date.now(); // reset for next session

      // Auto-speak the translated output
      setVoiceState('speaking');
      speak(result.translated, toLang.label);

      processingRef.current = false;
    },
    [fromLang.label, fromLang.flag, toLang.label, toLang.flag, callAgent, speak, addSession, messages.length]
  );

  // ── Speech Recognition ───────────────────────────────────────────────────────
  const { start: startRecognition, stop: stopRecognition, isSupported } = useSpeechRecognition({
    lang: fromLang.bcp47,
    onResult: (transcript) => {
      processText(transcript);
    },
    onError: (err) => {
      setErrorMessage(err);
      setVoiceState('idle');
    },
    onStart: () => setVoiceState('listening'),
    onEnd: () => {
      // If still listening (no result yet), go back to idle
      setVoiceState((prev) => (prev === 'listening' ? 'idle' : prev));
    },
  });

  const startListening = useCallback(() => {
    if (!isSupported) {
      setErrorMessage('Speech recognition not supported. Use Chrome or Edge.');
      return;
    }
    setErrorMessage(null);
    stopSpeaking(); // stop any TTS
    startRecognition();
  }, [isSupported, startRecognition, stopSpeaking]);

  const stopListening = useCallback(() => {
    stopRecognition();
    setVoiceState('idle');
  }, [stopRecognition]);

  // ── sendText (from keyboard input in ConversationScreen) ──────────────────────
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

  const setFromLang = useCallback((l: Language) => setFromLangState(l), []);
  const setToLang = useCallback((l: Language) => setToLangState(l), []);
  const speakText = useCallback(
    (text: string, langLabel: string) => {
      stopSpeaking();
      speak(text, langLabel);
    },
    [speak, stopSpeaking]
  );

  return (
    <VoiceContext.Provider
      value={{
        fromLang, toLang, setFromLang, setToLang,
        voiceState, messages, sessionCount, errorMessage,
        startListening, stopListening, sendText,
        clearMessages, clearError,
        speakText, stopSpeaking,
        pendingNavigate, clearPendingNavigate,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useVoice(): VoiceContextValue {
  const ctx = useContext(VoiceContext);
  if (!ctx) throw new Error('useVoice must be used inside <VoiceProvider>');
  return ctx;
}
