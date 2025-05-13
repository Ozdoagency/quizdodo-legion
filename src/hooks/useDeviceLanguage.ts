import { useEffect, useState } from 'react';

type Language = 'ru' | 'uk' | 'en';

export function useDeviceLanguage() {
  const [deviceLanguage, setDeviceLanguage] = useState<Language>('ru');

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    
    if (browserLang.startsWith('uk')) {
      setDeviceLanguage('uk');
    } else if (browserLang.startsWith('ru')) {
      setDeviceLanguage('ru');
    } else {
      setDeviceLanguage('en');
    }
  }, []);

  return deviceLanguage;
} 