import type { FC } from 'react';
import type { QuestionOption } from '../types/quiz';
import { Check } from 'lucide-react';

type Props = {
  option: QuestionOption;
  selected: boolean;
  onClick: () => void;
};

export const QuizOption: FC<Props> = ({ option, selected, onClick }) => {
  const label = option.label || '';
  const [emoji, ...textParts] = label.split(' ');
  const text = textParts.join(' ');

  return (
    <button
      onClick={onClick}
      className={`
        w-full p-3 md:p-4 rounded-xl transition-all duration-300 gradient-border
        ${selected 
          ? 'bg-primary/10 border border-primary shadow-lg shadow-primary/10 scale-[1.02] dark:border dark:border-[1px] dark:border-primary/60' 
          : 'bg-card/50 border border-border hover:bg-card/80 hover:border-primary/20 hover:shadow-md hover:-translate-y-1 dark:border dark:border-[1px] dark:border-border/60'}
      `}
    >
      <div className="flex items-center justify-between gap-2 md:gap-3">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-lg md:text-xl text-primary">{emoji}</span>
          <span className="text-sm md:text-base text-foreground font-medium">
            {text}
          </span>
        </div>
        {selected && (
          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary flex items-center justify-center animate-in fade-in duration-300">
            <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-foreground" />
          </div>
        )}
      </div>
    </button>
  );
};