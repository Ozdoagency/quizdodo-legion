import { FC, useState } from 'react';
import { X, Check } from 'lucide-react';

type Props = {
  value: string[];
  onChange: (colors: string[]) => void;
  presetColors?: string[];
  maxColors?: number;
};

export const ColorPicker: FC<Props> = ({ 
  value = [], 
  onChange,
  presetColors = ['#fc4949', '#ff6f6f', '#ffeaea', '#ffd6d6', '#b91c1c'],
  maxColors = 3
}) => {
  const [customColor, setCustomColor] = useState('#000000');

  const handleColorSelect = (color: string) => {
    if (value.includes(color)) {
      onChange(value.filter(c => c !== color));
    } else if (value.length < maxColors) {
      onChange([...value, color]);
    }
  };

  const handleCustomColorAdd = () => {
    if (value.length < maxColors) {
      onChange([...value, customColor]);
    }
  };

  const handleRemoveColor = (colorToRemove: string) => {
    onChange(value.filter(color => color !== colorToRemove));
  };

  return (
    <div className="space-y-6">
      {/* Selected Colors */}
      <div className="flex flex-wrap gap-3">
        {value.map((color) => (
          <div 
            key={color}
            className="relative group"
          >
            <div
              className="w-12 h-12 rounded-lg shadow-md cursor-pointer"
              style={{ backgroundColor: color }}
            />
            <button
              onClick={() => handleRemoveColor(color)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-card rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>

      {/* Preset Colors */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Готовые цвета</h4>
        <div className="flex flex-wrap gap-3">
          {presetColors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorSelect(color)}
              className="relative w-10 h-10 rounded-lg transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
            >
              {value.includes(color) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Color Picker */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Свой цвет</h4>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="w-10 h-10 rounded cursor-pointer"
          />
          <button
            onClick={handleCustomColorAdd}
            disabled={value.length >= maxColors}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Добавить цвет
          </button>
        </div>
      </div>

      {value.length >= maxColors && (
        <p className="text-sm text-gray-500">
          Достигнуто максимальное количество цветов ({maxColors})
        </p>
      )}
    </div>
  );
};