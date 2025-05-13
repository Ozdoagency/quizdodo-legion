import type { FC } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const TextInput: FC<Props> = ({ value = '', onChange, placeholder }) => {
  return (
    <div className="w-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-[120px] p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200 resize-y dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500"
      />
    </div>
  );
};