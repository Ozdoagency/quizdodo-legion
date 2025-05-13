import { useState } from 'react';

type Props = {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
};

export function RangeInput({ value = 1, onChange, min, max, step }: Props) {
  const [isDragging, setIsDragging] = useState(false);

  const getBackgroundSize = () => {
    return {
      backgroundSize: `${((value - min) * 100) / (max - min)}% 100%`
    };
  };

  return (
    <div className="w-full px-4">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-[#fc4949]
          [&::-webkit-slider-thumb]:w-6 
          [&::-webkit-slider-thumb]:h-6 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:bg-[#fc4949] 
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:transition-transform
          [&::-webkit-slider-thumb]:duration-200
          [&::-webkit-slider-thumb]:hover:scale-110
          [&::-moz-range-thumb]:w-6 
          [&::-moz-range-thumb]:h-6 
          [&::-moz-range-thumb]:rounded-full 
          [&::-moz-range-thumb]:bg-[#fc4949]
          [&::-moz-range-thumb]:border-0
          [&::-moz-range-thumb]:transition-transform
          [&::-moz-range-thumb]:duration-200
          [&::-moz-range-thumb]:hover:scale-110"
        style={getBackgroundSize()}
      />
      <div className="mt-6 text-center">
        <span className={`text-2xl font-bold text-gray-900 transition-all duration-300 ${
          isDragging ? 'text-[#fc4949] scale-110' : ''
        }`}>
          {value} {value === 1 ? 'месяц' : value < 5 ? 'месяца' : 'месяцев'}
        </span>
      </div>
    </div>
  );
}