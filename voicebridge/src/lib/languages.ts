// Shared language definitions used across Recognition, Synthesis, and UI
export interface Language {
  code: string;       // internal key
  label: string;      // display name
  flag: string;       // emoji flag
  bcp47: string;      // BCP-47 locale for Web Speech APIs
  ttsLang?: string;   // override for TTS if different from bcp47
}

export const LANGUAGES: Language[] = [
  // ── English ───────────────────────────────────────────────────────────────
  { code: 'en',   label: 'English',            flag: '🇬🇧', bcp47: 'en-US' },

  // ── Official Indian Languages (22 scheduled) ──────────────────────────────
  { code: 'hi',   label: 'Hindi',              flag: '🇮🇳', bcp47: 'hi-IN' },
  { code: 'bn',   label: 'Bengali',            flag: '🇮🇳', bcp47: 'bn-IN' },
  { code: 'mr',   label: 'Marathi',            flag: '🇮🇳', bcp47: 'mr-IN' },
  { code: 'gu',   label: 'Gujarati',           flag: '🇮🇳', bcp47: 'gu-IN' },
  { code: 'pa',   label: 'Punjabi',            flag: '🇮🇳', bcp47: 'pa-IN' },
  { code: 'ur',   label: 'Urdu',               flag: '🇮🇳', bcp47: 'ur-IN' },
  { code: 'or',   label: 'Odia',               flag: '🇮🇳', bcp47: 'or-IN' },
  { code: 'as',   label: 'Assamese',           flag: '🇮🇳', bcp47: 'as-IN' },
  { code: 'kok',  label: 'Konkani',            flag: '🇮🇳', bcp47: 'kok-IN' },
  { code: 'mai',  label: 'Maithili',           flag: '🇮🇳', bcp47: 'mai-IN' },
  { code: 'sd',   label: 'Sindhi',             flag: '🇮🇳', bcp47: 'sd-IN' },
  { code: 'doi',  label: 'Dogri',              flag: '🇮🇳', bcp47: 'doi-IN' },
  { code: 'sa',   label: 'Sanskrit',           flag: '🇮🇳', bcp47: 'sa-IN' },
  { code: 'te',   label: 'Telugu',             flag: '🇮🇳', bcp47: 'te-IN' },
  { code: 'ta',   label: 'Tamil',              flag: '🇮🇳', bcp47: 'ta-IN' },
  { code: 'kn',   label: 'Kannada',            flag: '🇮🇳', bcp47: 'kn-IN' },
  { code: 'ml',   label: 'Malayalam',          flag: '🇮🇳', bcp47: 'ml-IN' },
  { code: 'mni',  label: 'Manipuri',           flag: '🇮🇳', bcp47: 'mni-IN' },
  { code: 'brx',  label: 'Bodo',               flag: '🇮🇳', bcp47: 'brx-IN' },
  { code: 'sat',  label: 'Santali',            flag: '🇮🇳', bcp47: 'sat-IN' },
  { code: 'ks',   label: 'Kashmiri',           flag: '🇮🇳', bcp47: 'ks-IN' },
  { code: 'ne',   label: 'Nepali',             flag: '🇮🇳', bcp47: 'ne-IN' },

  // ── Major Foreign Languages ───────────────────────────────────────────────
  { code: 'es',   label: 'Spanish',            flag: '🇪🇸', bcp47: 'es-ES' },
  { code: 'fr',   label: 'French',             flag: '🇫🇷', bcp47: 'fr-FR' },
  { code: 'de',   label: 'German',             flag: '🇩🇪', bcp47: 'de-DE' },
  { code: 'zh',   label: 'Mandarin',           flag: '🇨🇳', bcp47: 'zh-CN' },
  { code: 'ar',   label: 'Arabic',             flag: '🇸🇦', bcp47: 'ar-SA' },
  { code: 'ja',   label: 'Japanese',           flag: '🇯🇵', bcp47: 'ja-JP' },
  { code: 'ko',   label: 'Korean',             flag: '🇰🇷', bcp47: 'ko-KR' },
  { code: 'pt',   label: 'Portuguese',         flag: '🇧🇷', bcp47: 'pt-BR' },
  { code: 'ru',   label: 'Russian',            flag: '🇷🇺', bcp47: 'ru-RU' },
  { code: 'it',   label: 'Italian',            flag: '🇮🇹', bcp47: 'it-IT' },
  { code: 'tr',   label: 'Turkish',            flag: '🇹🇷', bcp47: 'tr-TR' },
  { code: 'vi',   label: 'Vietnamese',         flag: '🇻🇳', bcp47: 'vi-VN' },
  { code: 'th',   label: 'Thai',               flag: '🇹🇭', bcp47: 'th-TH' },
  { code: 'id',   label: 'Indonesian',         flag: '🇮🇩', bcp47: 'id-ID' },
  { code: 'ms',   label: 'Malay',              flag: '🇲🇾', bcp47: 'ms-MY' },
  { code: 'sw',   label: 'Swahili',            flag: '🇰🇪', bcp47: 'sw-KE' },
  { code: 'nl',   label: 'Dutch',              flag: '🇳🇱', bcp47: 'nl-NL' },
  { code: 'pl',   label: 'Polish',             flag: '🇵🇱', bcp47: 'pl-PL' },
  { code: 'uk',   label: 'Ukrainian',          flag: '🇺🇦', bcp47: 'uk-UA' },
];

/** Map from label string → BCP-47 (used in API prompts and TTS) */
export const LABEL_TO_BCP47: Record<string, string> = Object.fromEntries(
  LANGUAGES.map((l) => [l.label, l.bcp47])
);

/** Map from label string → BCP-47 for TTS specifically */
export const TTS_LANGUAGE_MAP: Record<string, string> = Object.fromEntries(
  LANGUAGES.map((l) => [l.label, l.bcp47])
);
