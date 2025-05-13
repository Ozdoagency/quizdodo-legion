"use client";

import { useState, useEffect } from 'react';

type Language = 'uk' | 'ru' | 'en';

export function useDeviceLanguage(): Language {
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