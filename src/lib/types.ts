export type VoiceState = 'idle' | 'listening' | 'processing' | 'translating' | 'speaking';

export interface AIResponse {
  original: string;
  corrected: string;
  translated: string;
}

export interface Message {
  id: string;
  role: 'user' | 'ai';
  original: string;
  improved?: string;   // corrected speech
  translated?: string; // translated output
  lang: string;        // from language label
  targetLang: string;  // to language label
  timestamp: Date;
  isStreaming?: boolean;
  error?: boolean;
}
