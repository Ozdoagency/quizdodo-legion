import type { FC } from 'react';
import { Check } from 'lucide-react';

type ImageOption = {
  label: string;
  value: string;
  imageUrl: string;
  description?: string;
};

type Props = {
  options: ImageOption[];
  selected: string | null;
  onSelect: (value: string) => void;
};

export const ImageChoice: FC<Props> = ({ options, selected, onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 md:max-w-[70%] md:mx-auto">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={`group relative rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 border border-white/10 ${
            selected === option.value
              ? 'ring-2 ring-primary ring-offset-1 scale-[1.01]'
              : 'hover:ring-1 hover:ring-accent hover:ring-offset-1'
          }`}
        >
          <div className="aspect-[16/9] relative">
            <img
              src={option.imageUrl}
              alt={option.label}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 transition-all duration-300 ${
              selected === option.value
                ? 'bg-primary/20'
                : 'group-hover:bg-accent/10'
            }`} />
            {selected === option.value && (
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center scale-in">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          <div className={`p-2 md:p-3 transition-colors ${
            selected === option.value
              ? 'bg-secondary/90 backdrop-blur-sm'
              : 'bg-card/90 backdrop-blur-sm group-hover:bg-muted/90'
          }`}>
            <h3 className={`text-xs md:text-sm font-medium mb-0.5 ${
              selected === option.value ? 'text-primary' : 'text-white'
            }`}>
              {option.label}
            </h3>
            {option.description && (
              <p className="text-[10px] md:text-xs text-white/80">
                {option.description}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};