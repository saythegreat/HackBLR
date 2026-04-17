import { useRef, useCallback, useEffect } from 'react';

interface UseSpeechRecognitionOptions {
  lang: string;        // BCP-47, e.g. "en-US"
  onResult: (transcript: string) => void;
  onError: (error: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

// ─── Web Speech API type declarations ─────────────────────────────────────────
// We inline these because @types/dom-speech-recognition is not always available
interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  readonly isFinal: boolean;
}
interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}
interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}
interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
  readonly resultIndex: number;
}
interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}
interface ISpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: ISpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: ISpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((this: ISpeechRecognition, ev: Event) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
interface ISpeechRecognitionConstructor {
  new (): ISpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: ISpeechRecognitionConstructor;
    webkitSpeechRecognition?: ISpeechRecognitionConstructor;
  }
}

export function useSpeechRecognition({
  lang,
  onResult,
  onError,
  onStart,
  onEnd,
}: UseSpeechRecognitionOptions) {
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  const isSupported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (!isSupported) {
      onError('Speech recognition not supported. Please use Chrome or Edge.');
      return;
    }

    // Clean up any existing instance
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }

    const SpeechRecognitionAPI =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      onError('Speech recognition not available.');
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      onStart?.();
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript.trim()) {
        onResult(finalTranscript.trim());
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      let msg = 'Microphone error. Please try again.';
      switch (event.error) {
        case 'not-allowed':
        case 'permission-denied':
          msg = 'Microphone access denied. Allow permission and try again.';
          break;
        case 'no-speech':
          msg = 'No speech detected. Speak clearly and try again.';
          break;
        case 'audio-capture':
          msg = 'No microphone found. Please connect one.';
          break;
        case 'network':
          msg = 'Network error during recognition. Check your connection.';
          break;
        case 'aborted':
          return; // user-triggered — no error
      }
      onError(msg);
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      onEnd?.();
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch {
      onError('Failed to start microphone. Please refresh and try again.');
    }
  }, [lang, isSupported, onResult, onError, onStart, onEnd]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  return { start, stop, isSupported };
}
