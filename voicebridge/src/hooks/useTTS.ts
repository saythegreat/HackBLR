import { useRef, useCallback } from 'react';
import { TTS_LANGUAGE_MAP } from '@/lib/languages';

interface TTSOptions {
  onStart?: () => void;
  onEnd?: () => void;
}

export function useTTS({ onStart, onEnd }: TTSOptions = {}) {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
    }
  }, [isSupported]);

  const speak = useCallback(
    (text: string, languageLabel: string) => {
      if (!isSupported || !text.trim()) return;

      // Cancel any ongoing speech first
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

      // Map language label to BCP-47
      const bcp47 = TTS_LANGUAGE_MAP[languageLabel] || 'en-US';
      utterance.lang = bcp47;
      const savedRate = typeof window !== 'undefined' ? localStorage.getItem('vb_tts_rate') : null;
      utterance.rate = savedRate ? parseFloat(savedRate) : 0.95;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Try to find a matching voice; fall back to default
      const voices = window.speechSynthesis.getVoices();
      const matchingVoice = voices.find(
        (v) => v.lang.startsWith(bcp47.split('-')[0]) && !v.name.includes('Google') === false
      ) || voices.find(
        (v) => v.lang.startsWith(bcp47.split('-')[0])
      );
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      utterance.onstart = () => onStart?.();
      utterance.onend = () => onEnd?.();
      utterance.onerror = () => onEnd?.();

      window.speechSynthesis.speak(utterance);
    },
    [isSupported, onStart, onEnd]
  );

  return { speak, stop, isSupported };
}
