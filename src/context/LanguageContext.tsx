"use client";

import { createContext, useContext, useState, useEffect } from 'react';

type Language = 'uk' | 'ru';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru');

  useEffect(() => {
    // Получаем язык браузера
    const browserLang = navigator.language.toLowerCase();
    
    // Если язык браузера украинский, устанавливаем украинский
    if (browserLang.startsWith('uk')) {
      setLanguage('uk');
    } else {
      // В остальных случаях оставляем русский
      setLanguage('ru');
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}