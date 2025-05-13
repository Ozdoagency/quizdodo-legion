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
        className="h-full bg-primary progress-bar rounded-full relative animate-barber-pole shadow-[0_2px_12px_0_rgba(252,73,73,0.35)]"
        style={{ width: progressWidth }}
      />
    </div>
  );
};