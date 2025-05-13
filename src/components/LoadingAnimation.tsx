"use client";

import React, { useState, useEffect } from 'react';

export default function LoadingAnimation() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    // Анимация прогресса от 0 до 100
    interval = setInterval(() => {
      setProgress(prev => {
        // Ускоряем в конце
        const increment = prev < 60 ? 2 : prev < 80 ? 1 : 0.5;
        const newValue = prev + increment;
        
        if (newValue >= 100) {
          clearInterval(interval);
          timeout = setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        
        return newValue;
      });
    }, 40);

    return () => {
      clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="flex flex-col items-center mb-16">
        {/* Иконка в отдельном контейнере с фиксированной высотой */}
        <div className="h-28 mb-4 flex items-center justify-center">
          <div className="animate-bounce">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-4xl">🏞</span>
            </div>
          </div>
        </div>

        {/* Текст в отдельном контейнере */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Legion Real Estate</h2>
          <p className="text-sm text-muted-foreground">Готовим вашу идеальный подборку...</p>
        </div>

        {/* Прогресс бар с градиентом */}
        <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden relative mb-2">
          <div 
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, hsl(26 100% 50%), hsl(35 91% 64%))',
              transition: 'width 0.3s ease-out'
            }}
          />
        </div>
        
        {/* Пульсирующий индикатор */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse" style={{ animationDelay: '300ms' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse" style={{ animationDelay: '600ms' }}></div>
        </div>
      </div>
    </div>
  );
} 