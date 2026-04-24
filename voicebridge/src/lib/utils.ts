/**
 * Formats a number according to the user's current locale.
 * If the language is one of the supported Indian languages, it uses that locale.
 */
export function formatNumber(n: number, langLabel: string): string {
  const localeMap: Record<string, string> = {
    'English': 'en-US',
    'Hindi': 'hi-IN',
    'Bengali': 'bn-IN',
    'Tamil': 'ta-IN',
    'Telugu': 'te-IN',
    'Kannada': 'kn-IN',
    'Malayalam': 'ml-IN',
    'Marathi': 'mr-IN',
    'Gujarati': 'gu-IN',
    'Punjabi': 'pa-IN',
    'Urdu': 'ur-PK',
  };

  const locale = localeMap[langLabel] || 'en-US';
  
  // Use Intl.NumberFormat for native digit representation if supported
  return new Intl.NumberFormat(locale).format(n);
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
