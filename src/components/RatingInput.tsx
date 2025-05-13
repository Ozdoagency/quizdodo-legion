import { Star } from 'lucide-react';

type Props = {
  value: number;
  onChange: (value: number) => void;
  max: number;
};

export function RatingInput({ value = 0, onChange, max }: Props) {
  return (
    <div className="flex justify-center gap-4">
      {Array.from({ length: max }, (_, i) => i + 1).map((rating) => (
        <button
          key={rating}
          onClick={() => onChange(rating)}
          className="group relative"
        >
          <Star
            className={`w-12 h-12 transition-all duration-300 ${
              rating <= value
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200 group-hover:fill-yellow-200 group-hover:text-yellow-200'
            }`}
          />
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium text-gray-600">
            {rating}
          </span>
        </button>
      ))}
    </div>
  );
}