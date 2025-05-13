import type { FC } from 'react';
import { MessageCircle, MessageSquare, Phone } from 'lucide-react';

type Props = {
  options: string[];
  selectedMessenger: string | null;
  onSelect: (messenger: string) => void;
};

const messengerIcons: { [key: string]: JSX.Element } = {
  WhatsApp: <MessageCircle className="w-5 h-5 text-accent" />,
  Telegram: <MessageSquare className="w-5 h-5 text-primary" />,
  Viber: <Phone className="w-5 h-5 text-accent" />
};

export const MessengerSelect: FC<Props> = ({ options, selectedMessenger, onSelect }) => {
  return (
    <div className="flex justify-center gap-2 md:gap-3 lg:gap-6">
      {options.map((name, index) => (
        <button
          key={name}
          onClick={() => onSelect(name)}
          className={`
            group min-w-[90px] p-3.5 md:p-4 lg:p-5 rounded-xl transition-all duration-300 gradient-border
            ${selectedMessenger === name 
              ? 'bg-primary/10 border border-primary shadow-lg shadow-primary/10 scale-105 dark:border dark:border-[1px] dark:border-primary/60' 
              : 'bg-card/50 border border-border hover:bg-card/80 hover:border-primary/20 hover:shadow-md hover:-translate-y-1 dark:border dark:border-[1px] dark:border-border/60'}
          `}
          style={{
            animation: `fadeInScale 0.5s ease-out ${index * 0.1}s both`
          }}
        >
          <div className="flex flex-col items-center gap-2 md:gap-3">
            <div className={`transform transition-transform duration-500 ${
              selectedMessenger === name ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {messengerIcons[name]}
            </div>
            <span className={`text-sm md:text-base transform transition-transform duration-500 ${
              selectedMessenger === name ? 'text-primary dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {name}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};