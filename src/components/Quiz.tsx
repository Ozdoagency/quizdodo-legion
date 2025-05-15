"use client";

import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ArrowLeft, CheckCircle, Gift, X, MessageCircle, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { QuizOption } from './QuizOption';
import { MessengerSelect } from './MessengerSelect';
import { PhoneInput } from './PhoneInput';
import { ProgressBar } from './ProgressBar';
import { RatingInput } from './RatingInput';
import { ImageChoice } from './ImageChoice';
import { RangeInput } from './RangeInput';
import { TextInput } from './TextInput';
import { DateInput } from './DateInput';
import { MatrixInput } from './MatrixInput';
import { PriorityInput } from './PriorityInput';
import { FileUpload } from './FileUpload';
import { ConsultantAvatar } from './ConsultantAvatar';
import { getQuestions } from '../data/questions';
import { countries } from '../data/countries';
import { useQuizContext } from '../context/QuizContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import type { Country, QuestionOption, Answers, ImageOption, Option } from '../types/quiz';
import Confetti from 'react-confetti';
import { sendToTelegram } from '../lib/telegram';
import { getUtmParams } from '../lib/utm';
import { getAllCookies } from '../lib/cookies';
import { track } from '@vercel/analytics';

export default function Quiz() {
  const { currentStep, setCurrentStep, answers, setAnswers } = useQuizContext();
  const { language } = useLanguage();
  const questions = getQuestions(language);
  const [completed, setCompleted] = useState(false);
  const [selectedMessenger, setSelectedMessenger] = useState<string | null>(null);
  const [telegramUsername, setTelegramUsername] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiFade, setConfettiFade] = useState(false);
  const [isQuizExiting, setIsQuizExiting] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right'>('right');
  const [showBonuses, setShowBonuses] = useState(false);
  const [bonusesAnimation, setBonusesAnimation] = useState(false);
  const bonuses = translations[language].quiz.bonusList;

  const t = translations[language].quiz;
  const currentQuestion = questions[currentStep];

  // Определяем ссылку для WhatsApp в зависимости от языка
  let whatsAppLink = t.completion.link;
  if (language !== 'ru' && language !== 'uk') {
    whatsAppLink = 'https://api.whatsapp.com/send/?phone=62895001976051&text=Get%20new%20catalog%20for%202025';
  }

  const utmRef = useRef(getUtmParams());

  useEffect(() => {
    if (completed) {
      setShowConfetti(true);
      setConfettiFade(false);
      const fadeTimer = setTimeout(() => setConfettiFade(true), 3500);
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => {
        clearTimeout(timer);
        clearTimeout(fadeTimer);
      };
    }
  }, [completed]);

  useEffect(() => {
    if (showBonuses) {
        setBonusesAnimation(true);
    } else {
      setTimeout(() => {
      setBonusesAnimation(false);
      }, 300);
    }
  }, [showBonuses]);

  const handleSingleChoice = (value: string) => {
    setAnswers((prev: Answers) => ({ ...prev, [currentStep]: value }));
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleMultipleChoice = (value: string) => {
    setAnswers((prev: Answers) => {
      const currentAnswers = (prev[currentStep] as string[]) || [];
      return {
        ...prev,
        [currentStep]: currentAnswers.includes(value)
          ? currentAnswers.filter(item => item !== value)
          : [...currentAnswers, value]
      };
    });
  };

  const handleRatingChange = (value: number) => {
    setAnswers((prev: Answers) => ({ ...prev, [currentStep]: value }));
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleImageChoice = (value: string) => {
    setAnswers((prev: Answers) => ({ ...prev, [currentStep]: value }));
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleRangeChange = (value: number) => {
    setAnswers((prev: Answers) => ({ ...prev, [currentStep]: value }));
  };

  const handleTextChange = (value: string) => {
    setAnswers((prev: Answers) => ({ ...prev, [currentStep]: value }));
  };

  const handleDateChange = (value: string) => {
    setAnswers((prev: Answers) => ({ ...prev, [currentStep]: value }));
  };

  const handleMatrixChange = (value: { [key: string]: string }) => {
    setAnswers((prev: Answers) => ({ ...prev, [currentStep]: value }));
  };

  const handlePriorityChange = (value: string[]) => {
    setAnswers((prev: Answers) => ({ ...prev, [currentStep]: value }));
  };

  const handleFileUpload = (files: File[]) => {
    setAnswers((prev: Answers) => ({ ...prev, [currentStep]: files }));
  };

  const handleMessengerChoice = (messenger: string) => {
    setSelectedMessenger(messenger);
    setAnswers((prev: Answers) => ({ ...prev, messenger }));
  };

  const handlePhoneInput = (text: string) => {
    const digitsOnly = text.replace(/\D/g, '');
    setAnswers((prev: Answers) => ({ 
      ...prev, 
      phone: digitsOnly,
      countryCode: selectedCountry.code 
    }));
  };

  const handleTelegramUsernameChange = (text: string) => {
    setTelegramUsername(text);
    setAnswers((prev: Answers) => ({
      ...prev,
      telegramUsername: text,
    }));
  };

  const handleNext = async () => {
    track('Next Question', {
      fromQuestion: currentStep
    });
    if (currentStep < questions.length - 1) {
      setTransitionDirection('left');
      setTimeout(() => setCurrentStep(currentStep + 1), 0);
    } else {
      setIsQuizExiting(true);
      setTimeout(async () => {
        setCompleted(true);
        await sendToTelegram({ ...answers, telegramUsername, ...utmRef.current, cookies: getAllCookies() }, language);
        
        // Отправляем событие Lead в Facebook Pixel
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Lead');
        }
        
        // Структурируем ответы для Make.com
        const questionsList = getQuestions(language);
        const structuredAnswers = questionsList.map((q, idx) => {
          const value = answers[idx];
          if (q.type === 'single' || q.type === 'multiple') {
            const opts = Array.isArray(q.options) ? q.options : [];
            const getLabel = (v: any) => {
              const opt = opts.find(o => (typeof o === 'object' && 'value' in o && o.value === v) || o === v);
              if (!opt) return v;
              if (typeof opt === 'string') return opt;
              return (opt as any).label || v;
            };
            if (Array.isArray(value)) {
              return {
                question: q.question,
                value: value,
                labels: value.map(getLabel)
              };
            } else {
              const label = getLabel(value);
              return { question: q.question, value, label };
            }
          }
          return { question: q.question, value };
        });

        const fullPhone = (answers.countryCode || '') + (answers.phone || '');
        const payload = {
          phone: fullPhone,
          answers: structuredAnswers,
          utm_source: utmRef.current?.utm_source || '',
          utm_medium: utmRef.current?.utm_medium || '',
          utm_campaign: utmRef.current?.utm_campaign || '',
          utm_term: utmRef.current?.utm_term || '',
          utm_content: utmRef.current?.utm_content || '',
          country: answers.countryCode || '',
          userCountry: answers.countryCode || '',
          messenger: answers.messenger || '',
          telegramUsername: answers.telegramUsername || '',
          language,
          page: typeof window !== 'undefined' ? window.location.href : ''
        };

        try {
          const resp = await fetch("https://hook.eu2.make.com/wf7f8mylk5iymiz49wllg7twyrgd14ci", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          const text = await resp.text();
          console.log('Make.com response:', resp.status, text);
        } catch (e) {
          console.error('Make.com fetch error', e);
        }

        track('Quiz Completed', {
          questionCount: questions.length,
          completedSteps: currentStep + 1
        });

        setIsQuizExiting(false);
      }, 600);
    }
  };

  const handleBack = () => {
    track('Previous Question', {
      fromQuestion: currentStep
    });
    if (currentStep > 0) {
      setTransitionDirection('right');
      setTimeout(() => setCurrentStep(currentStep - 1), 0);
    }
  };

  const isButtonActive = () => {
    if (!currentQuestion) return false;
    
    switch (currentQuestion.type) {
      case 'single':
        return answers[currentStep] !== undefined;
      case 'multiple':
        return answers[currentStep] !== undefined && (answers[currentStep] as string[])?.length > 0;
      case 'rating':
        return answers[currentStep] !== undefined;
      case 'image-choice':
        return answers[currentStep] !== undefined;
      case 'range':
        return answers[currentStep] !== undefined;
      case 'text':
        return answers[currentStep] && (answers[currentStep] as string).length > 0;
      case 'date':
        return answers[currentStep] !== undefined;
      case 'matrix':
        return Object.keys(answers[currentStep] as { [key: string]: string } || {}).length === currentQuestion.rows?.length;
      case 'priority':
        return (answers[currentStep] as string[] || []).length === (currentQuestion.options as Option[]).length;
      case 'file-upload':
        return (answers[currentStep] as File[] || []).length > 0;
      case 'contact':
        const baseContactValid = answers.messenger && answers.phone && answers.phone.length >= 9;
        if (selectedMessenger === 'Telegram') {
          return baseContactValid && !!answers.telegramUsername && answers.telegramUsername.startsWith('@') && answers.telegramUsername.length > 1;
        }
        return baseContactValid;
      default:
        return false;
    }
  };

  const handleCloseBonuses = () => {
    setBonusesAnimation(false);
    setTimeout(() => {
      setShowBonuses(false);
    }, 300);
  };

  const renderQuestion = () => (
    <div
      key={currentStep}
      className={`quiz-question-anim ${transitionDirection === 'right' ? 'quiz-slide-in-right' : 'quiz-slide-in-left'}`}
    >
      <div className="text-left mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-3 motion-reduce:animate-none" style={{ transform: 'translateY(0)', animation: 'bounce 2s ease-in-out infinite', animationName: 'customBounce' }}>
          {title}
        </div>
        <h2 className="text-2xl md:text-[1.75rem] font-bold text-foreground mb-2 slide-in-right">
          {currentQuestion.question}
        </h2>
        <p 
          className="text-foreground/80 slide-in-right [animation-delay:100ms]"
          dangerouslySetInnerHTML={{ __html: currentQuestion.description }}
        />
      </div>

      {currentStep < questions.length - 1 && (
        <div className="lg:hidden mb-3 scale-in">
          <ConsultantAvatar />
        </div>
      )}

      <div className="max-w-2xl mx-auto space-y-6">
        {currentQuestion.type === 'single' && (
          <div className="space-y-4">
            {(currentQuestion.options as QuestionOption[]).map((option, index) => (
              <QuizOption
                key={`${currentStep}-${option.value}-${index}`}
                option={option}
                selected={answers[currentStep] === option.value}
                onClick={() => handleSingleChoice(option.value)}
              />
            ))}
          </div>
        )}

        {currentQuestion.type === 'multiple' && (
          <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
            {(currentQuestion.options as QuestionOption[]).map((option, index) => (
              <QuizOption
                key={`${currentStep}-${option.value}-${index}`}
                option={option}
                selected={(answers[currentStep] as string[] || []).includes(option.value)}
                onClick={() => handleMultipleChoice(option.value)}
              />
            ))}
          </div>
        )}

        {currentQuestion.type === 'rating' && (
          <RatingInput
            value={answers[currentStep] as number || 0}
            onChange={handleRatingChange}
            max={currentQuestion.max || 5}
          />
        )}

        {currentQuestion.type === 'image-choice' && (
          <ImageChoice
            options={currentQuestion.options as ImageOption[]}
            selected={answers[currentStep] as string}
            onSelect={handleImageChoice}
          />
        )}

        {currentQuestion.type === 'range' && (
          <RangeInput
            value={answers[currentStep] as number || currentQuestion.min || 1}
            onChange={handleRangeChange}
            min={currentQuestion.min || 1}
            max={currentQuestion.max || 12}
            step={currentQuestion.step || 1}
          />
        )}

        {currentQuestion.type === 'text' && (
          <TextInput
            value={answers[currentStep] as string || ''}
            onChange={handleTextChange}
            placeholder={currentQuestion.placeholder}
          />
        )}

        {currentQuestion.type === 'date' && (
          <DateInput
            value={answers[currentStep] as string || ''}
            onChange={handleDateChange}
          />
        )}

        {currentQuestion.type === 'matrix' && (
          <MatrixInput
            rows={currentQuestion.rows || []}
            columns={currentQuestion.columns || []}
            value={answers[currentStep] as { [key: string]: string } || {}}
            onChange={handleMatrixChange}
          />
        )}

        {currentQuestion.type === 'priority' && (
          <PriorityInput
            options={currentQuestion.options as Option[]}
            value={answers[currentStep] as string[] || []}
            onChange={handlePriorityChange}
          />
        )}

        {currentQuestion.type === 'file-upload' && (
          <FileUpload
            value={answers[currentStep] as File[] || []}
            onChange={handleFileUpload}
            maxFiles={currentQuestion.maxFiles}
            acceptedFileTypes={currentQuestion.acceptedFileTypes}
          />
        )}

        {currentQuestion.type === 'contact' && (
          <div className="space-y-6">
            <MessengerSelect
              options={currentQuestion.options as string[]}
              selectedMessenger={selectedMessenger}
              onSelect={handleMessengerChoice}
            />
            {selectedMessenger && (
              <div className="space-y-4 fade-in-up">
                {selectedMessenger === 'Telegram' ? (
                  <>
                    <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-primary/10 rounded-lg border border-primary/20 gradient-border w-full">
                      <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      <p className="text-xs md:text-sm text-primary">
                        {t.phoneInput.contactInstruction}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 md:items-end">
                      <div className="w-full md:w-2/3">
                        <PhoneInput
                          selectedCountry={selectedCountry}
                          phone={answers.phone || ''}
                          onCountrySelect={setSelectedCountry}
                          onPhoneChange={handlePhoneInput}
                          showInfoBlock={false}
                        />
                      </div>
                      <div className="w-full md:w-1/3">
                        <input
                          type="text"
                          value={answers.telegramUsername || ''}
                          onChange={(e) => handleTelegramUsernameChange(e.target.value)}
                          placeholder={t.phoneInput.telegramUsernamePlaceholder}
                          className="w-full p-3 md:p-4 rounded-lg border transition-all duration-300 bg-white dark:bg-[rgb(21,20,24)] text-sm md:text-base dark:text-gray-200 dark:placeholder-gray-500 gradient-border border-border hover:border-accent focus:border-primary focus:shadow-md outline-none"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <PhoneInput
                    selectedCountry={selectedCountry}
                    phone={answers.phone || ''}
                    onCountrySelect={setSelectedCountry}
                    onPhoneChange={handlePhoneInput}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (completed) {
    return (
      <>
        {showConfetti && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 50,
              transition: 'opacity 0.5s',
              opacity: confettiFade ? 0 : 1,
            }}
          >
            <Confetti
              width={typeof window !== 'undefined' ? window.innerWidth : 1000}
              height={typeof window !== 'undefined' ? window.innerHeight : 800}
              numberOfPieces={350}
              recycle={false}
              gravity={0.22}
              initialVelocityY={12}
            />
          </div>
        )}
        <Card className="w-full h-[70vh] flex items-center justify-center p-6 md:p-8 bg-card text-card-foreground relative overflow-hidden quiz-thankyou-in shadow-2xl">
          <div className="quiz-gradient-bg" />
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t.completion.title}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t.completion.description}
            </p>
            
            <div className="w-full max-w-md h-px bg-border opacity-70 my-6"></div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t.completion.dontWantToWait}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t.completion.getSelectionNow}
              </p>
            </div>
            
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bolt-button group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                {t.completion.restart}
              </span>
            </a>
          </div>
        </Card>
      </>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  const title = currentStep === questions.length - 1
    ? t.lastStepTitle
    : `${t.question} ${currentStep + 1} ${t.of} ${questions.length}`;

  return (
    <Card className={`w-full p-4 md:p-6 lg:p-8 bg-card text-card-foreground animate-fadeIn relative overflow-hidden quiz-exit${isQuizExiting ? ' quiz-exit-active' : ''} shadow-2xl`}>
      <div className="quiz-gradient-bg" />
      <div className="relative z-10">
        <div className="mb-6 md:mb-8">
          <ProgressBar 
            currentStep={currentStep} 
            totalSteps={questions.length} 
          />
          {renderQuestion()}
        </div>

        <div className="max-w-2xl mx-auto w-full">
          <div className="flex items-center gap-2 md:gap-4 mt-4 md:mt-8 justify-between px-2 md:px-0">
            <button
              onClick={() => setShowBonuses(true)}
              className="bg-primary/10 backdrop-blur-2xl border-none rounded-xl px-3 h-10 md:w-auto md:h-12 flex items-center justify-center md:hidden gap-2"
              type="button"
              aria-label={t.guaranteedBonuses}
            >
              <span className="text-2xl animate-wiggle drop-shadow-[0_0_8px_rgba(252,73,73,0.3)]">🎁</span>
              <span className="text-sm font-medium">
                {language === 'uk' ? 'Бонуси' : language === 'en' ? 'Bonuses' : 'Бонусы'}
              </span>
            </button>

            <div className="flex items-center gap-2 md:gap-4 ml-auto">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="flex items-center justify-center px-2 py-1 md:px-4 md:py-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                >
                  <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" />
                </button>
              )}

              <button
                onClick={handleNext}
                disabled={!isButtonActive()}
                className="bolt-button group relative disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all duration-300 px-4 py-2 md:px-8 md:py-3 text-base md:text-lg"
                type="button"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {currentStep === questions.length - 1 ? t.complete : t.next}
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute -bottom-5 right-[-10px] w-14 h-14 opacity-0 animate-finger z-20">
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
              </button>
            </div>
          </div>
        </div>

        <div className="hidden lg:block text-center mt-8 pt-4 border-t border-border">
          <span className="text-primary text-sm font-medium">{translations[language].header.madeIn} </span>
          <span className="text-foreground text-sm font-bold">QuizDo</span>
        </div>

        {/* Bottom sheet для бонусов */}
        {showBonuses && (
          <div 
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
            style={{ opacity: bonusesAnimation ? 1 : 0, transition: 'opacity 0.3s ease-out' }}
            onClick={handleCloseBonuses}
          >
            <div
              className="w-full max-w-md bg-card/70 backdrop-blur-md rounded-t-2xl p-6 pb-10 shadow-lg relative"
              style={{ 
                transform: bonusesAnimation ? 'translateY(0)' : 'translateY(100%)', 
                opacity: bonusesAnimation ? 1 : 0,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onClick={e => e.stopPropagation()}
            >
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ borderRadius: '1rem 1rem 0 0' }}>
                <defs>
                  <linearGradient id="borderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(201, 146, 99, 0.2)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="none"
                  stroke="url(#borderGradient)"
                  strokeWidth="1"
                  rx="16"
                  ry="16"
                />
              </svg>
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-lg flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" /> {t.guaranteedBonuses}
                </span>
                <button 
                  onClick={handleCloseBonuses} 
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ul className="space-y-3">
                {bonuses.map((bonus, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm">{i + 1}</span>
                    </span>
                    <span className="text-[1.1rem] text-muted-foreground/60">{bonus}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}