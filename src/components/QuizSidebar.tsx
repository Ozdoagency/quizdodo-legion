import { Gift, Lightbulb, Play } from 'lucide-react';
import { useQuizContext } from '../context/QuizContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { getQuestions } from '../data/questions';
import { useRef, useState } from 'react';
import { VideoModal } from './VideoModal';

export function QuizSidebar() {
  const { currentStep } = useQuizContext();
  const { language } = useLanguage();
  const t = translations[language].quiz;
  const questions = getQuestions(language);
  const currentQuestion = questions[currentStep];
  const avatarVideoRef = useRef<HTMLVideoElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoError = () => {
    console.error('Error loading video');
  };

  const handlePlayClick = () => {
    setIsModalOpen(true);
    if (avatarVideoRef.current) {
      avatarVideoRef.current.pause();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (avatarVideoRef.current) {
      avatarVideoRef.current.play();
    }
  };

  return (
    <div className="space-y-4">
      {/* Consultant */}
      <div className="bg-card/90 backdrop-blur-xl rounded-xl p-4 md:p-6 shadow-sm border border-border/80 gradient-border">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-3 md:mb-4 border-2 border-primary/20 gradient-border">
            <video
              ref={avatarVideoRef}
              src="/videos/consultant.mp4"
              className="w-full h-full object-cover rounded-full"
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              onError={handleVideoError}
              controls={false}
              controlsList="nodownload nofullscreen noremoteplayback"
            />
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full"
            >
              <Play className="w-8 h-8 text-white opacity-75" />
            </button>
          </div>
          <h3 className="font-semibold text-foreground">{t.consultant.name}</h3>
          <p className="text-sm text-primary mb-3 md:mb-4">{t.consultant.position}</p>
          <p className="text-sm text-gray-300 dark:text-gray-200">{t.consultant.description}</p>
        </div>
      </div>

      <VideoModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        videoSrc="/videos/consultant.mp4"
      />

      {/* Current Question Tip */}
      {currentQuestion && currentQuestion.tip && (
        <div className="bg-primary/10 rounded-xl p-4 md:p-6 border border-primary/20 gradient-border">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-foreground mb-2">{t.tip}</h4>
              <p className="text-sm text-gray-400 dark:text-gray-300">
                {currentQuestion.tip}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Guaranteed Bonuses */}
      <div className="bg-secondary/50 dark:bg-[#18171b]/80 backdrop-blur-xl rounded-xl p-4 md:p-6 shadow-sm border border-border gradient-border">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 bg-primary/5 gradient-border">
            <Gift className="w-5 h-5 text-primary animate-pulse-subtle inline-block" />
            <span className="text-sm font-medium text-primary">
              {t.guaranteedBonuses}
            </span>
          </div>
        </div>
        <ul className="space-y-3">
          {t.bonusList.map((bonus, index) => (
            <li key={index} className="flex items-start gap-2 group">
              <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors group-hover:bg-primary/20">
                <span className="text-primary text-sm">{index + 1}</span>
              </span>
              <span className="text-sm text-gray-400 dark:text-gray-300 transition-colors group-hover:text-foreground">
                {bonus}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}