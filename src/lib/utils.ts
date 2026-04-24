/**
 * Formats a number according to the user's current locale.
 * If the language is one of the supported Indian languages, it uses that locale.
 */
export function formatNumber(n: number, langLabel: string, options?: Intl.NumberFormatOptions): string {
  const localeMap: Record<string, string> = {
    'English': 'en-US',
    'Hindi': 'hi-IN-u-nu-native',
    'Bengali': 'bn-IN-u-nu-native',
    'Tamil': 'ta-IN-u-nu-native',
    'Telugu': 'te-IN-u-nu-native',
    'Kannada': 'kn-IN-u-nu-native',
    'Malayalam': 'ml-IN-u-nu-native',
    'Marathi': 'mr-IN-u-nu-native',
    'Gujarati': 'gu-IN-u-nu-native',
    'Punjabi': 'pa-IN-u-nu-native',
    'Urdu': 'ur-PK-u-nu-native',
    'Arabic': 'ar-SA-u-nu-native',
    'Mandarin': 'zh-CN-u-nu-native',
    'Japanese': 'ja-JP-u-nu-native',
    'Korean': 'ko-KR-u-nu-native',
    'Spanish': 'es-ES',
    'French': 'fr-FR',
    'German': 'de-DE',
    'Portuguese': 'pt-BR',
    'Russian': 'ru-RU',
    'Swahili': 'sw-KE',
  };

  const locale = localeMap[langLabel] || 'en-US';
  
  try {
    return new Intl.NumberFormat(locale, options).format(n);
  } catch (e) {
    return n.toLocaleString();
  }
}

/**
 * Converts standard digits (0-9) to native digits for specific languages
 * if Intl.NumberFormat doesn't do it automatically for some reason.
 */
export function toNativeDigits(n: number | string, langLabel: string): string {
  const str = n.toString();
  const digitMaps: Record<string, string[]> = {
    'Hindi': ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
    'Bengali': ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'],
    'Telugu': ['౦', '౧', '౨', '౩', '౪', '౫', '౬', '౭', '౮', '౯'],
    'Tamil': ['௦', '௧', '௨', '௩', '௪', '௫', '௬', '௭', '௮', '௯'],
    'Kannada': ['೦', '೧', '೨', '೩', '೪', '೫', '೬', '೭', '೮', '೯'],
    'Malayalam': ['൦', '൧', '൨', '൩', '൪', '൫', '൬', '൭', '൮', '൯'],
    'Marathi': ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
    'Gujarati': ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'],
    'Punjabi': ['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯'],
  };

  const map = digitMaps[langLabel];
  if (!map) return str;

  return str.replace(/[0-9]/g, w => map[+w]);
}

export function formatRelativeTime(ts: number, langLabel: string): string {
  const localeMap: Record<string, string> = {
    'English': 'en-US',
    'Hindi': 'hi-IN',
    'Marathi': 'mr-IN',
    'Bengali': 'bn-IN',
    'Tamil': 'ta-IN',
    'Telugu': 'te-IN',
    'Kannada': 'kn-IN',
    'Malayalam': 'ml-IN',
    'Gujarati': 'gu-IN',
    'Punjabi': 'pa-IN',
    'Spanish': 'es-ES',
    'French': 'fr-FR',
  };

  const locale = localeMap[langLabel] || 'en-US';
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  
  if (mins < 1) {
    return langLabel === 'Hindi' ? 'अभी' : (langLabel === 'Marathi' ? 'आत्ता' : 'Just now');
  }

  try {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    if (mins < 60) return rtf.format(-mins, 'minute');
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return rtf.format(-hrs, 'hour');
    const days = Math.floor(hrs / 24);
    if (days < 7) return rtf.format(-days, 'day');
    
    return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(ts);
  } catch (e) {
    return new Date(ts).toLocaleString();
  }
}

export function formatDuration(seconds: number, langLabel: string): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  const mLabel = langLabel === 'Hindi' ? 'मि' : (langLabel === 'Marathi' ? 'मि' : 'm');
  const sLabel = langLabel === 'Hindi' ? 'से' : (langLabel === 'Marathi' ? 'से' : 's');

  if (mins === 0) return `${formatNumber(secs, langLabel)}${sLabel}`;
  return `${formatNumber(mins, langLabel)}${mLabel} ${formatNumber(secs, langLabel, { minimumIntegerDigits: 2 })}${sLabel}`;
}
