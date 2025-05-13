"use client";

import React, { useEffect, useState, useRef } from 'react';
import Quiz from './components/Quiz';
import { QuizSidebar } from './components/QuizSidebar';
import { LanguageSelector } from './components/LanguageSelector';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import { useTheme } from './context/ThemeContext';
import { translations } from '@/translations';
import { getDefaultCountry } from './data/countries';
import { useTimeBasedTheme } from './hooks/useTimeBasedTheme';
import LoadingAnimation from './components/LoadingAnimation';
import FeatureCard from './components/FeatureCard';
import './styles/index.css';
import { useDeviceLanguage } from '@/hooks/useDeviceLanguage';

function getActualDateString(language: 'ru' | 'uk' | 'en') {
  const now = new Date();
  const day = now.getDate();
  const monthNames = {
    ru: [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ],
    uk: [
      'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
      'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'
    ],
    en: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
  };
  const month = monthNames[language][now.getMonth()];
  if (language === 'uk') {
    return <>
      Актуальна підбірка на <strong className="font-extrabold">{day} {month}</strong>
    </>;
  }
  if (language === 'en') {
    return <>
      Current selection for <strong className="font-extrabold">{month} {day}</strong>
    </>;
  }
  return <>
    Актуальная подборка на <strong className="font-extrabold">{day} {month}</strong>
  </>;
}

export default function App() {
  const deviceLanguage = useDeviceLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const slides = [
    "https://optim.tildacdn.one/tild3939-3863-4961-a235-616436323137/-/format/webp/photo.png.webp",
    "https://optim.tildacdn.one/tild3737-6261-4834-b139-396663343936/-/format/webp/7.png.webp",
    "https://optim.tildacdn.one/tild3266-3737-4866-b434-326535343363/-/cover/724x514/center/center/-/format/webp/2e6adb8a-eb29-48d3-b.png.webp",
    "https://optim.tildacdn.one/tild3062-3663-4535-a366-656361623666/-/format/webp/GENERAL.png.webp",
    "https://optim.tildacdn.one/tild6666-6664-4162-a633-306533333331/-/format/webp/D11_1.png.webp",
    "https://optim.tildacdn.one/tild6265-6635-4166-a439-303662373534/-/cover/882x1050/center/center/-/format/webp/5317fa3c-f009-4903-8.png.webp"
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useTimeBasedTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setContentVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(slideInterval);
  }, [isPaused]);

  useEffect(() => {
    function fetchCountry() {
      getDefaultCountry();
    }
    fetchCountry();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { language = deviceLanguage } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];

  const handleStartQuiz = () => {
    setAnimate(true);
    setTimeout(() => setIsQuizStarted(true), 700);
  };

  // Фиксируем отсутствие пробела после ТОП-10 (делаем прямую замену текста)
  const fixedTitle = t.hero.top10Title
    .replace(/(ТОП-10)<\/b>проверенных/g, '$1</b> проверенных') // Добавляем пробел между тегом и словом
    .replace(/(ТОП-10)<\/b>перевірених/g, '$1</b> перевірених') // Украинская версия тоже на всякий случай
    .replace(/(ТОП-10)<\/b>verified/g, '$1</b> verified'); // Английская версия тоже на всякий случай

  return (
    <div className={`min-h-screen relative overflow-hidden ${theme === 'dark' ? 'dark' : ''}`}>
      {isLoading && <LoadingAnimation />}
      
      {!isQuizStarted && (
        <div className={`absolute inset-0 transition-all duration-700 ${animate ? 'main-exit pointer-events-none' : ''} overflow-y-auto`}> 
          <div className="flex items-center justify-center min-h-screen py-[40px]">
            <div className={`w-full max-w-[1280px] mx-auto px-4 transition-opacity duration-500 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div 
                className="w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl"
                style={{ 
                  backgroundColor: `rgba(var(--background), ${0.1 + Math.min(scrollY / 200, 0.4)})`
                }}
              >
                <div className="max-w-[1280px] mx-auto px-4 py-2.5 flex justify-between items-center">
                  <div className="text-center">
                    <span className="text-primary font-normal">{t.header.madeIn} </span>
                    <span className="font-bold text-foreground">QuizDo</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <LanguageSelector />
                  </div>
                </div>
              </div>
              <div className="pt-16 py-6 md:py-12" style={{ paddingTop: '30px' }}>
                <div className="text-center mb-7 md:mb-10">
                  <div className="flex justify-center mb-5 scale-in" style={{ opacity: 0 }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 backdrop-blur-2xl border border-primary/20 rounded-full text-primary text-xs md:text-sm font-medium">
                      <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                      {getActualDateString(language)}
                    </div>
                  </div>
                  
                  <div 
                    className="relative w-full max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto mb-6 rounded-xl overflow-hidden group hover-3d image-reveal"
                    style={{ animationDelay: '0.1s' }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    <div className="aspect-[21/9] md:aspect-[24/9] overflow-hidden">
                      <div className="relative w-full h-full">
                        {slides.map((slide, index) => (
                          <div 
                            key={index}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                              currentSlide === index 
                                ? 'opacity-100 z-10 slide-enter' 
                                : 'opacity-0 z-0 slide-exit'
                            }`}
                          >
                            <img 
                              src={slide}
                              alt={`Недвижимость на Бали ${index + 1}`}
                              className="w-full h-full object-cover animate-slow-zoom"
                              style={{ animationDelay: '0.1s' }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      onClick={prevSlide}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                      aria-label="Предыдущий слайд"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    
                    <button 
                      onClick={nextSlide}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                      aria-label="Следующий слайд"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
                      {slides.map((_, index) => (
                        <button 
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentSlide === index ? 'bg-primary w-4' : 'bg-primary/30'
                          }`}
                          aria-label={`Перейти к слайду ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="w-full max-w-[1400px] mx-auto">
                  <h1 
                      className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 md:mb-6 leading-tight font-normal md:whitespace-pre-line"
                      dangerouslySetInnerHTML={{__html: fixedTitle.replace(' <b>Вилл на Бали</b>', ' \n<b>Вилл на Бали</b>')}} 
                  />
                  </div>
                  
                  <p className="text-base md:text-lg lg:text-xl text-gray-500 max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto mb-4 md:mb-6 float-in md:line-clamp-2" style={{ animationDelay: '0.2s' }}
                    dangerouslySetInnerHTML={{ __html: t.hero.description }}
                  />
                  
                  <div className="relative inline-block">
                  <button
                    onClick={handleStartQuiz}
                      className="bolt-button group relative dark:text-white text-base md:text-lg px-6 py-3 md:px-8 md:py-4 scale-in"
                      style={{ animationDelay: '0.6s' }}
                  >
                    <span className="relative z-10 flex items-center gap-2 text-lg">
                      {t.hero.top10Cta}
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                    <div 
                      className="absolute -bottom-3 right-[-30px] w-14 h-14 opacity-0 z-20"
                      style={{
                        animation: 'finger 4s ease-in-out infinite',
                        animationDelay: '1s'
                      }}
                    >
                      <svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" className="text-gray-200 rotate-[225deg]">
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2">
                          <path d="m24.3679 55.4945c-9.0883 0-16.4558-7.3675-16.4558-16.4558s7.3675-16.4558 16.4558-16.4558"/>
                          <path d="m25.2415 55.4945h12"/>
                          <path d="m37.5349 48.5022c1.9313.081 3.4313 1.7123 3.3502 3.6436-.081 1.9313-1.7123 3.4313-3.6436 3.3502"/>
                          <path d="m37.7678 41.5052c1.9313.081 3.4313 1.7123 3.3502 3.6436-.081 1.9313-1.7123 3.4313-3.6436 3.3502"/>
                          <path d="m37.9016 41.5093c1.9268.155 3.3631 1.8426 3.2081 3.7694s-1.8426 3.3631-3.7694 3.2081"/>
                          <path d="m38.2461 34.4677c1.929.1237 3.3925 1.7878 3.2688 3.7168s-1.7878 3.3925-3.7168 3.2688"/>
                          <path d="m36.0224 17.5139c1.3904-1.3429 3.6061-1.3044 4.949.086s1.3044 3.6061-.086 4.949"/>
                          <path d="m60.6184 27.4677c1.933 0 3.5 1.567 3.5 3.5s-1.567 3.5-3.5 3.5"/>
                          <path d="m38.2831 34.4677h22.3353"/>
                          <path d="m60.6184 27.4677h-27.7906"/>
                          <path d="m38.6717 24.5068 2.2138-1.958"/>
                          <path d="m33.7028 19.2815c-2.1439 1.9526-5.1677 3.3734-9.5218 3.3013"/>
                          <path d="m36.0224 17.5139-2.3801 1.8214"/>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 mb-8 md:mb-12 -mx-4">
                  <div className="relative md:hidden" ref={galleryRef}>
                    <div className="relative overflow-hidden">
                      <div className="absolute left-0 top-0 w-24 h-full pointer-events-none bg-gradient-to-r from-background via-background/50 to-transparent z-50"></div>
                      <div className="absolute right-0 top-0 w-24 h-full pointer-events-none bg-gradient-to-l from-background via-background/50 to-transparent z-50"></div>
                      <div className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth px-4">
                        {[
                          { emoji: '💰', title: t.features.price.title, desc: t.features.price.description, delay: '0.2s' },
                          { emoji: '📈', title: t.features.income.title, desc: t.features.income.description, delay: '0.3s' },
                          { emoji: '💎', title: t.features.service.title, desc: t.features.service.description, delay: '0.4s' },
                          { emoji: '🏠', title: t.features.turnkey.title, desc: t.features.turnkey.description, delay: '0.5s' }
                        ].map((feature, index) => (
                          <FeatureCard
                            key={index}
                            emoji={feature.emoji}
                            title={feature.title}
                            description={feature.desc}
                            delay={feature.delay}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:contents">
                    {[
                      { emoji: '💰', title: t.features.price.title, desc: t.features.price.description, delay: '0.2s' },
                      { emoji: '📈', title: t.features.income.title, desc: t.features.income.description, delay: '0.3s' },
                      { emoji: '💎', title: t.features.service.title, desc: t.features.service.description, delay: '0.4s' },
                      { emoji: '🏠', title: t.features.turnkey.title, desc: t.features.turnkey.description, delay: '0.5s' }
                    ].map((feature, index) => (
                      <FeatureCard
                        key={index}
                        emoji={feature.emoji}
                        title={feature.title}
                        description={feature.desc}
                        delay={feature.delay}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/30 backdrop-blur-sm rounded-lg border border-primary/20 fade-in-delay" style={{ animationDelay: '0.6s' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-4 h-4 text-primary">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                    </svg>
                    <span className="text-sm text-muted-foreground">
                      {t.security}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {isQuizStarted && (
        <div className="absolute inset-0 quiz-enter overflow-y-auto">
          <div className="flex flex-col min-h-screen justify-center">
            <div className="flex-grow flex items-center justify-center py-4 md:py-6">
              <div className="w-full max-w-[1280px] mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-4 lg:gap-6">
                  <div className="hidden lg:block">
                    <QuizSidebar />
                  </div>
                  <Quiz />
                </div>
              </div>
            </div>
            <div className="lg:hidden text-center py-3 bg-background/80 backdrop-blur-sm border-t border-primary/20 w-full">
              <span className="text-primary font-normal">{t.header.madeIn} </span>
              <span className="font-bold text-foreground">QuizDo</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}