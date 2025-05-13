import { Country } from '../types/quiz';

export const countries: Country[] = [
  { code: '+380', name: '🇺🇦', format: '__ ___ __ __' },
  { code: '+971', name: '🇦🇪', format: '__ ___ ____' },
  { code: '+48', name: '🇵🇱', format: '___ ___ ___' },
  { code: '+43', name: '🇦🇹', format: '___ ___ ____' },
  { code: '+32', name: '🇧🇪', format: '___ ___ ____' },
  { code: '+359', name: '🇧🇬', format: '___ ___ ____' },
  { code: '+385', name: '🇭🇷', format: '___ ___ ____' },
  { code: '+357', name: '🇨🇾', format: '___ ___ ____' },
  { code: '+420', name: '🇨🇿', format: '___ ___ ___' },
  { code: '+45', name: '🇩🇰', format: '___ ___ ___' },
  { code: '+372', name: '🇪🇪', format: '___ ____' },
  { code: '+358', name: '🇫🇮', format: '___ ___ ____' },
  { code: '+33', name: '🇫🇷', format: '___ ___ ____' },
  { code: '+49', name: '🇩🇪', format: '___ ___ ____' },
  { code: '+30', name: '🇬🇷', format: '___ ___ ____' },
  { code: '+36', name: '🇭🇺', format: '___ ___ ____' },
  { code: '+354', name: '🇮🇸', format: '___ ____' },
  { code: '+353', name: '🇮🇪', format: '___ ___ ____' },
  { code: '+39', name: '🇮🇹', format: '___ ___ ____' },
  { code: '+371', name: '🇱🇻', format: '___ ____' },
  { code: '+370', name: '🇱🇹', format: '___ ____' },
  { code: '+352', name: '🇱🇺', format: '___ ___ ____' },
  { code: '+356', name: '🇲🇹', format: '___ ____' },
  { code: '+31', name: '🇳🇱', format: '___ ___ ____' },
  { code: '+47', name: '🇳🇴', format: '___ ___ ___' },
  { code: '+351', name: '🇵🇹', format: '___ ___ ____' },
  { code: '+40', name: '🇷🇴', format: '___ ___ ____' },
  { code: '+421', name: '🇸🇰', format: '___ ___ ___' },
  { code: '+386', name: '🇸🇮', format: '___ ___ ___' },
  { code: '+34', name: '🇪🇸', format: '___ ___ ____' },
  { code: '+46', name: '🇸🇪', format: '___ ___ ___' },
  { code: '+41', name: '🇨🇭', format: '___ ___ ____' },
  { code: '+44', name: '🇬🇧', format: '____ ______' },
  { code: 'custom', name: '🌍', format: '___________' }
];

export const isCustomCountry = (code: string) => code === 'custom';

export function getDefaultCountry(): Country {
  try {
    // Get user's language
    const userLanguage = navigator.language.toLowerCase();
    
    // Map common languages to country codes
    const languageToCountry: { [key: string]: string } = {
      'uk': '+380', // Ukraine
      'ru': '+7',   // Russia
      'en': '+44',  // UK
      'de': '+49',  // Germany
      'fr': '+33',  // France
      'es': '+34',  // Spain
      'it': '+39',  // Italy
    };
    
    // Get country code from language
    for (const [lang, code] of Object.entries(languageToCountry)) {
      if (userLanguage.startsWith(lang)) {
        const country = countries.find(c => c.code === code);
        if (country) return country;
      }
    }
    
    // Default to Ukraine if no match found
    return countries[0];
  } catch (error) {
    console.error('Error detecting country:', error);
    return countries[0];
  }
}