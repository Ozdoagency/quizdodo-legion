import { FC, useRef, useState } from 'react';
import { GripVertical } from 'lucide-react';
import { Option } from '../types/quiz';

type Props = {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
};

export const PriorityInput: FC<Props> = ({ options, value = [], onChange }) => {
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Initialize value if empty
  if (value.length === 0 && options.length > 0) {
    onChange(options.map(opt => opt.value));
  }

  const handleDragStart = (position: number) => {
    dragItem.current = position;
    setIsDragging(true);
  };

  const handleDragEnter = (position: number) => {
    dragOverItem.current = position;
  };

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;

    const newValue = [...value];
    const draggedItemValue = newValue[dragItem.current];
    newValue.splice(dragItem.current, 1);
    newValue.splice(dragOverItem.current, 0, draggedItemValue);
    
    onChange(newValue);
    setIsDragging(false);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const orderedOptions = options
    .filter(option => value.includes(option.value))
    .sort((a, b) => value.indexOf(a.value) - value.indexOf(b.value));

  return (
    <div className="space-y-2">
      {orderedOptions.map((option, index) => (
        <div
          key={option.value}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => e.preventDefault()}
          className={`
            flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-lg border 
            ${isDragging && dragItem.current === index 
              ? 'border-primary/50 opacity-50 scale-105' 
              : 'border-border'
            }
            ${!isDragging && 'hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5'}
            transition-all duration-300 cursor-move group
          `}
        >
          <div className="text-muted-foreground cursor-grab active:cursor-grabbing group-hover:text-primary/80">
            <GripVertical className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl text-primary">{option.label.split(' ')[0]}</span>
            <span className="text-foreground font-medium">
              {option.label.split(' ').slice(1).join(' ')}
            </span>
          </div>
          <div className="ml-auto flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-medium">
            {value.indexOf(option.value) + 1}
          </div>
        </div>
      ))}
    </div>
  );
};