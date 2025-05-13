"use client";

import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export function useTimeBasedTheme() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const updateTheme = () => {
      // Всегда устанавливаем темную тему, так как светлая отключена
      setTheme('dark');
    };

    // Устанавливаем тему при монтировании
    updateTheme();

    // Обновляем тему каждый час
    const interval = setInterval(updateTheme, 3600000);

    return () => clearInterval(interval);
  }, [setTheme]);
} 