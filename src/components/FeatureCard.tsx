import React from 'react';

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
  delay: string;
}

const FeatureCard = React.memo(({ emoji, title, description, delay }: FeatureCardProps) => {
  return (
    <div 
      className="bolt-card group p-4 md:p-6 float-in min-w-[75%] flex-shrink-0 snap-start snap-always"
      style={{ opacity: 0, animationDelay: delay }}
    >
      <div className="bolt-glow" />
      <div className="flex items-start gap-4">
        <div className="!w-12 !h-12 aspect-square flex-shrink-0 rounded-xl flex items-center justify-center bg-primary/10 backdrop-blur-2xl">
          <span className="text-2xl">{emoji}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-base md:text-lg mb-1 md:mb-2">
            {title}
          </h3>
          <p className="text-sm md:text-xs lg:text-sm text-muted-foreground mb-2 md:mb-3 whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
});

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard; 