import { FC, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { ChevronDown, ChevronUp, Play } from 'lucide-react';
import { VideoModal } from './VideoModal';

export const ConsultantAvatar: FC = () => {
  const { language } = useLanguage();
  const t = translations[language].quiz.consultant;
  const [isExpanded, setIsExpanded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoError = () => {
    setVideoError(true);
  };

  const handlePlayClick = () => {
    setIsModalOpen(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <>
      <div className="bolt-card group p-4 md:p-6 float-in relative overflow-hidden rounded-xl border backdrop-blur-xl">
        <div className="bolt-glow md:group-hover:opacity-100 opacity-100 md:opacity-0"></div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm">
              {videoError ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-sm text-gray-500">Video not available</span>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
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
                </>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-background rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col xs:flex-row xs:items-center">
              <h3 className="font-semibold text-foreground">
                {t.name}
              </h3>
              <span className="mt-1 xs:mt-0 xs:ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary whitespace-nowrap w-fit xs:w-auto">
                {t.position}
              </span>
            </div>
            <p className={`text-sm text-gray-300 dark:text-gray-200 mt-1 ${isExpanded ? '' : 'truncate'}`}>
              {t.description}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center text-primary mt-1"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              <span className="ml-1 text-xs">{isExpanded ? t.collapse : t.expand}</span>
            </button>
          </div>
        </div>
      </div>

      <VideoModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        videoSrc="/videos/consultant.mp4"
      />
    </>
  );
};