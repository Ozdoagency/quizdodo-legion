"use client";

import { createContext, useContext, useState } from 'react';
import type { Answers } from '../types/quiz';

type QuizContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  answers: Answers;
  setAnswers: (answers: Answers | ((prev: Answers) => Answers)) => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  return (
    <QuizContext.Provider value={{ currentStep, setCurrentStep, answers, setAnswers }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
}