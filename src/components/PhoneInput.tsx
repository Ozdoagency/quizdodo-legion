import React, { useRef } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { Country } from '../types/quiz';
import { countries, isCustomCountry, getDefaultCountry } from '../data/countries';
import { CountryDropdown } from './CountryDropdown';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

type Props = {
  selectedCountry: Country;
  phone: string;
  onCountrySelect: (country: Country) => void;
  onPhoneChange: (phone: string) => void;
  showInfoBlock?: boolean;
};

export function PhoneInput({ 
  selectedCountry, 
  phone, 
  onCountrySelect, 
  onPhoneChange, 
  showInfoBlock = true
}: Props) {
  const { language } = useLanguage();
  const t = translations[language].quiz;
  const [isOpen, setIsOpen] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [customCode, setCustomCode] = React.useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonRect, setButtonRect] = React.useState<DOMRect | null>(null);

  // Calculate filled ratio for the bottom border animation
  const underscoreCount = (selectedCountry.format.match(/_/g) || []).length;
  const digitsInPhone = phone.length; // phone prop already contains only digits
  let filledRatio = 0;
  if (underscoreCount > 0) {
    filledRatio = Math.min(digitsInPhone / underscoreCount, 1);
  } else if (digitsInPhone > 0) { // No underscores in format, but phone has digits
    filledRatio = 1; // Consider it fully filled if any digit is present
  }

  React.useEffect(() => {
    function detectCountry() {
      const detectedCountry = getDefaultCountry();
      if (detectedCountry && !isCustomCountry(detectedCountry.code)) {
        onCountrySelect(detectedCountry);
      }
    }
    detectCountry();
  }, [onCountrySelect]);

  const formatPhone = (value: string = '') => {
    if (!value) return '';
    const digits = value.replace(/\D/g, '');
    const format = selectedCountry.format;
    let result = '';
    let digitIndex = 0;

    for (let i = 0; i < format.length && digitIndex < digits.length; i++) {
      if (format[i] === '_') {
        result += digits[digitIndex] || '_';
        digitIndex++;
      } else {
        result += format[i];
      }
    }

    return result;
  };

  const handleCustomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Добавляем + в начало, если его нет и это не пустая строка
    if (value && !value.startsWith('+')) {
      value = '+' + value;
    }
    // Увеличиваем максимальную длину до 7 символов (+ и до 6 цифр)
    if (value.length <= 4) {
      setCustomCode(value);
      // Обновляем страну, если есть хотя бы один символ после +
      if (value.length > 3) {
        onCountrySelect({ 
          code: value, 
          name: '🌍', 
          format: '_'.repeat(15) 
        });
      }
    }
  };

  const handleOpenDropdown = () => {
    if (buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {showInfoBlock && (
        <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-primary/10 rounded-lg border border-primary/20 gradient-border">
          <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          <p className="text-xs md:text-sm text-primary">
            {t.phoneInput.contactInstruction}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={handleOpenDropdown}
            className={`h-full px-3 py-3 md:px-4 md:py-4 rounded-lg border flex items-center gap-1.5 md:gap-2 min-w-[120px] md:min-w-[140px] transition-all duration-300 bg-white dark:bg-[rgb(21,20,24)] gradient-border ${
              isOpen ? 'border-primary shadow-md' : 'border-border hover:border-accent'
            }`}
          >
            {isCustomCountry(selectedCountry.code) ? (
              <input
                type="text"
                value={customCode}
                onChange={handleCustomCodeChange}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                onFocus={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                placeholder="+___"
                className="w-20 md:w-24 outline-none bg-transparent text-sm md:text-base dark:text-gray-200" 
              />
            ) : (
              <>
                <span className="font-medium text-sm md:text-base dark:text-gray-200">{selectedCountry.code}</span>
                <span className="text-gray-500 text-xs md:text-sm dark:text-gray-400">{selectedCountry.name}</span>
              </>
            )}
            <ChevronDown className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            } dark:text-gray-300`} />
          </button>
          
          <CountryDropdown
            countries={countries}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSelect={onCountrySelect}
            buttonRect={buttonRect}
          />
        </div>
        
        <div className="flex-1 relative">
          <input
            type="tel"
            inputMode="numeric"
            value={formatPhone(phone)}
            onChange={(e) => onPhoneChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={selectedCountry.format}
            autoFocus={false}
            className={`w-full p-3 md:p-4 rounded-lg border transition-all duration-300 bg-white dark:bg-[rgb(21,20,24)] text-sm md:text-base dark:text-gray-200 dark:placeholder-gray-500 gradient-border ${
              isFocused 
                ? 'border-primary shadow-md' 
                : 'border-border hover:border-accent'
            }`}
          />
          {/* Modified div for proportional animation */}
          <div 
            className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-b-lg origin-left transition-transform duration-500 transform"
            style={{ '--tw-scale-x': filledRatio.toString() } as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  );
}