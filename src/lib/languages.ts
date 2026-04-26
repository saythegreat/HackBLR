// Shared language definitions used across Recognition, Synthesis, and UI
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

  // ── Phrases & Idioms ──────────────────────────────────────────────────────
  { code: 'phrases', label: 'Phrases (Idioms)', flag: '🧩', bcp47: 'en-US' },

  // ── Official Indian Languages (22 scheduled) ──────────────────────────────
  { code: 'hi',   label: 'Hindi',              flag: '🇮🇳', bcp47: 'hi-IN' },
  { code: 'bn',   label: 'Bengali',            flag: '🇮🇳', bcp47: 'bn-IN' },
  { code: 'mr',   label: 'Marathi',            flag: '🇮🇳', bcp47: 'mr-IN' },
  { code: 'gu',   label: 'Gujarati',           flag: '🇮🇳', bcp47: 'gu-IN' },
  { code: 'pa',   label: 'Punjabi',            flag: '🇮🇳', bcp47: 'pa-IN' },
  { code: 'ur',   label: 'Urdu',               flag: '🇮🇳', bcp47: 'ur-IN' },
  { code: 'or',   label: 'Odia',               flag: '🇮🇳', bcp47: 'or-IN' },
  { code: 'as',   label: 'Assamese',           flag: '🇮🇳', bcp47: 'as-IN' },
  { code: 'kok',  label: 'Konkani',            flag: '🇮🇳', bcp47: 'kok-IN', ttsLang: 'gom' },
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
  { code: 'he',   label: 'Hebrew',             flag: '🇮🇱', bcp47: 'he-IL' },
  { code: 'el',   label: 'Greek',              flag: '🇬🇷', bcp47: 'el-GR' },
  { code: 'sv',   label: 'Swedish',            flag: '🇸🇪', bcp47: 'sv-SE' },
  { code: 'no',   label: 'Norwegian',          flag: '🇳🇴', bcp47: 'no-NO' },
  { code: 'da',   label: 'Danish',             flag: '🇩🇰', bcp47: 'da-DK' },
  { code: 'fi',   label: 'Finnish',            flag: '🇫🇮', bcp47: 'fi-FI' },
  { code: 'cs',   label: 'Czech',              flag: '🇨🇿', bcp47: 'cs-CZ' },
  { code: 'hu',   label: 'Hungarian',          flag: '🇭🇺', bcp47: 'hu-HU' },
  { code: 'ro',   label: 'Romanian',           flag: '🇷🇴', bcp47: 'ro-RO' },
  { code: 'sk',   label: 'Slovak',             flag: '🇸🇰', bcp47: 'sk-SK' },
  { code: 'hr',   label: 'Croatian',           flag: '🇭🇷', bcp47: 'hr-HR' },
  { code: 'bg',   label: 'Bulgarian',          flag: '🇧🇬', bcp47: 'bg-BG' },
  { code: 'fa',   label: 'Persian',            flag: '🇮🇷', bcp47: 'fa-IR' },
  { code: 'af',   label: 'Afrikaans',          flag: '🇿🇦', bcp47: 'af-ZA' },
  { code: 'am',   label: 'Amharic',            flag: '🇪🇹', bcp47: 'am-ET' },
  { code: 'az',   label: 'Azerbaijani',        flag: '🇦🇿', bcp47: 'az-AZ' },
  { code: 'eu',   label: 'Basque',             flag: '🇪🇸', bcp47: 'eu-ES' },
  { code: 'be',   label: 'Belarusian',         flag: '🇧🇾', bcp47: 'be-BY' },
  { code: 'bs',   label: 'Bosnian',            flag: '🇧🇦', bcp47: 'bs-BA' },
  { code: 'ca',   label: 'Catalan',            flag: '🇪🇸', bcp47: 'ca-ES' },
  { code: 'ceb',  label: 'Cebuano',            flag: '🇵🇭', bcp47: 'ceb-PH' },
  { code: 'ny',   label: 'Chichewa',           flag: '🇲🇼', bcp47: 'ny-MW' },
  { code: 'co',   label: 'Corsican',           flag: '🇫🇷', bcp47: 'co-FR' },
  { code: 'eo',   label: 'Esperanto',          flag: '🏳️', bcp47: 'eo' },
  { code: 'et',   label: 'Estonian',           flag: '🇪🇪', bcp47: 'et-EE' },
  { code: 'tl',   label: 'Filipino',           flag: '🇵🇭', bcp47: 'tl-PH' },
  { code: 'fy',   label: 'Frisian',            flag: '🇳🇱', bcp47: 'fy-NL' },
  { code: 'gl',   label: 'Galician',           flag: '🇪🇸', bcp47: 'gl-ES' },
  { code: 'ka',   label: 'Georgian',           flag: '🇬🇪', bcp47: 'ka-GE' },
  { code: 'ht',   label: 'Haitian Creole',     flag: '🇭🇹', bcp47: 'ht-HT' },
  { code: 'ha',   label: 'Hausa',              flag: '🇳🇬', bcp47: 'ha-NG' },
  { code: 'haw',  label: 'Hawaiian',           flag: '🇺🇸', bcp47: 'haw-US' },
  { code: 'hmn',  label: 'Hmong',              flag: '🏳️', bcp47: 'hmn' },
  { code: 'is',   label: 'Icelandic',          flag: '🇮🇸', bcp47: 'is-IS' },
  { code: 'ig',   label: 'Igbo',               flag: '🇳🇬', bcp47: 'ig-NG' },
  { code: 'ga',   label: 'Irish',              flag: '🇮🇪', bcp47: 'ga-IE' },
  { code: 'jw',   label: 'Javanese',           flag: '🇮🇩', bcp47: 'jw-ID' },
  { code: 'kk',   label: 'Kazakh',             flag: '🇰🇿', bcp47: 'kk-KZ' },
  { code: 'km',   label: 'Khmer',              flag: '🇰🇭', bcp47: 'km-KH' },
  { code: 'rw',   label: 'Kinyarwanda',        flag: '🇷🇼', bcp47: 'rw-RW' },
  { code: 'ku',   label: 'Kurdish',            flag: '🇹🇷', bcp47: 'ku-TR' },
  { code: 'ky',   label: 'Kyrgyz',             flag: '🇰🇬', bcp47: 'ky-KG' },
  { code: 'lo',   label: 'Lao',                flag: '🇱🇦', bcp47: 'lo-LA' },
  { code: 'la',   label: 'Latin',              flag: '🇻🇦', bcp47: 'la' },
  { code: 'lv',   label: 'Latvian',            flag: '🇱🇻', bcp47: 'lv-LV' },
  { code: 'lt',   label: 'Lithuanian',         flag: '🇱🇹', bcp47: 'lt-LT' },
  { code: 'lb',   label: 'Luxembourgish',      flag: '🇱🇺', bcp47: 'lb-LU' },
  { code: 'mk',   label: 'Macedonian',         flag: '🇲🇰', bcp47: 'mk-MK' },
  { code: 'mg',   label: 'Malagasy',           flag: '🇲🇬', bcp47: 'mg-MG' },
  { code: 'mt',   label: 'Maltese',            flag: '🇲🇹', bcp47: 'mt-MT' },
  { code: 'mi',   label: 'Maori',              flag: '🇳🇿', bcp47: 'mi-NZ' },
  { code: 'mn',   label: 'Mongolian',          flag: '🇲🇳', bcp47: 'mn-MN' },
  { code: 'my',   label: 'Myanmar (Burmese)',  flag: '🇲🇲', bcp47: 'my-MM' },
  { code: 'ps',   label: 'Pashto',             flag: '🇦🇫', bcp47: 'ps-AF' },
  { code: 'sm',   label: 'Samoan',             flag: '🇼🇸', bcp47: 'sm-WS' },
  { code: 'gd',   label: 'Scots Gaelic',       flag: '🇬🇧', bcp47: 'gd-GB' },
  { code: 'st',   label: 'Sesotho',            flag: '🇿🇦', bcp47: 'st-ZA' },
  { code: 'sn',   label: 'Shona',              flag: '🇿🇼', bcp47: 'sn-ZW' },
  { code: 'si',   label: 'Sinhala',            flag: '🇱🇰', bcp47: 'si-LK' },
  { code: 'sl',   label: 'Slovenian',          flag: '🇸🇮', bcp47: 'sl-SI' },
  { code: 'so',   label: 'Somali',             flag: '🇸🇴', bcp47: 'so-SO' },
  { code: 'su',   label: 'Sundanese',          flag: '🇮🇩', bcp47: 'su-ID' },
  { code: 'tg',   label: 'Tajik',              flag: '🇹🇯', bcp47: 'tg-TJ' },
  { code: 'tt',   label: 'Tatar',              flag: '🇷🇺', bcp47: 'tt-RU' },
  { code: 'ti',   label: 'Tigrinya',           flag: '🇪🇷', bcp47: 'ti-ET' },
  { code: 'tk',   label: 'Turkmen',            flag: '🇹🇲', bcp47: 'tk-TM' },
  { code: 'uz',   label: 'Uzbek',              flag: '🇺🇿', bcp47: 'uz-UZ' },
  { code: 'cy',   label: 'Welsh',              flag: '🇬🇧', bcp47: 'cy-GB' },
  { code: 'xh',   label: 'Xhosa',              flag: '🇿🇦', bcp47: 'xh-ZA' },
  { code: 'yi',   label: 'Yiddish',            flag: '🏳️', bcp47: 'yi' },
  { code: 'yo',   label: 'Yoruba',             flag: '🇳🇬', bcp47: 'yo-NG' },
  { code: 'zu',   label: 'Zulu',               flag: '🇿🇦', bcp47: 'zu-ZA' },
];

/** Map from label string → BCP-47 (used in API prompts and TTS) */
export const LABEL_TO_BCP47: Record<string, string> = Object.fromEntries(
  LANGUAGES.map((l) => [l.label, l.bcp47])
);

/** Map from label string → BCP-47 for TTS specifically */
export const TTS_LANGUAGE_MAP: Record<string, string> = Object.fromEntries(
  LANGUAGES.map((l) => [l.label, l.bcp47])
);
