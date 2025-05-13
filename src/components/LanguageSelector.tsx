"use client";

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const languages = [
  { code: 'uk', name: 'Українська', flag: '🇺🇦', style: { color: 'hsl(217.2deg 73.07% 56.5%)' } },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', style: { color: 'hsl(217.2deg 73.07% 56.5%)' } }
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors dark:text-white-300"
      >
        <Globe className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-700">{currentLang?.flag}</span>
        <span className="text-sm text-gray-700" style={currentLang?.style}>{currentLang?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-card rounded-lg shadow-lg border border-border/30 py-1 animate-fadeInDown">
          {languages.map((lang, index) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as 'uk' | 'ru');
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50 transition-colors ${
                language === lang.code ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
              }`}
              style={{
                animation: `slideInRight ${0.2}s ease-out ${index * 0.03}s both`
              }}
            >
              <span>{lang.flag}</span>
              <span className="text-sm" style={lang.style}>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}