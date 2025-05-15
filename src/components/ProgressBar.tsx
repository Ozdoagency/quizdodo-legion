"use client";
import type { FC } from 'react';
import '../styles/index.css';
import '../styles/quiz.css'; // Импорт стилей из quiz.css

type Props = {
  currentStep: number;
  totalSteps: number;
};

export const ProgressBar: FC<Props> = ({ currentStep, totalSteps }) => {
  const progressWidth = `${((currentStep + 1) / totalSteps) * 100}%`;

  return (
    <div className="w-full h-2 bg-secondary rounded-full mb-8 relative">
      <div
        className="h-full bg-primary progress-bar rounded-full relative animate-barber-pole"
        style={{
          width: progressWidth,
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 0 8px 1px hsl(var(--primary)/0.5)',
          transition: 'width .3s ease-out',
        }}
      />
    </div>
  );
};