"use client";

import React from 'react';
import ReactDOM from 'react-dom';
import { Country } from '../types/quiz';
import { isCustomCountry } from '../data/countries';

interface CountryDropdownProps {
  countries: Country[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
  buttonRect: DOMRect | null;
}

export function CountryDropdown({ 
  countries, 
  isOpen, 
  onClose, 
  onSelect,
  buttonRect
}: CountryDropdownProps) {
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Закрываем дропдаун при клике вне его области
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !buttonRect) return null;

  // Рассчитываем позицию дропдауна
  const style: React.CSSProperties = {
    position: 'absolute',
    top: `${buttonRect.bottom + (typeof window !== 'undefined' ? window.scrollY : 0)}px`,
    left: `${buttonRect.left + (typeof window !== 'undefined' ? window.scrollX : 0)}px`,
    width: `${buttonRect.width}px`,
    zIndex: 9999999
  };

  return ReactDOM.createPortal(
    <div 
      ref={dropdownRef}
      style={style}
      className="bg-card border rounded-lg shadow-lg animate-fadeInDown max-h-[144px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:border-gray-700 gradient-border"
    >
      {countries.map((country, index) => (
        <button
          key={country.code}
          onClick={() => {
            if (isCustomCountry(country.code)) {
              onSelect({ 
                code: 'custom', 
                name: '🌍', 
                format: '_'.repeat(15) 
              });
            } else {
              onSelect(country);
            }
            onClose();
          }}
          className="w-full px-3 py-2 md:px-4 md:py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
          style={{
            animation: `slideInRight ${0.2}s ease-out ${index * 0.03}s both`
          }}
        >
          <span className="font-medium text-sm md:text-base dark:text-gray-200">
            {isCustomCountry(country.code) ? "Другое" : country.code}
          </span>
          <span className="ml-2 text-gray-600 text-xs md:text-sm dark:text-gray-400">{country.name}</span>
        </button>
      ))}
    </div>,
    document.body
  );
} 