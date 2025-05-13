"use client";

import { X, Loader2 } from 'lucide-react';
import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
};

export function VideoModal({ isOpen, onClose, videoSrc }: Props) {
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useRef(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [videoAspectRatio, setVideoAspectRatio] = useState(16/9);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined') {
        scrollPosition.current = window.scrollY;
      }
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = '100%';
    }

    return () => {
      if (isOpen) {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        if (typeof window !== 'undefined') {
          window.scrollTo(0, scrollPosition.current);
        }
        setTimeout(() => setIsVisible(false), 300);
      }
    };
  }, [isOpen]);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.target === overlayRef.current) {
      e.preventDefault();
    }
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = false;
      modalVideoRef.current.play();
      
      // Получаем реальные размеры видео
      const videoWidth = modalVideoRef.current.videoWidth;
      const videoHeight = modalVideoRef.current.videoHeight;
      if (videoWidth && videoHeight) {
        setVideoAspectRatio(videoWidth / videoHeight);
      }
    }
  };

  const modalContent = (
    <div
      ref={overlayRef}
      className={`fixed inset-0 flex items-center justify-center bg-black/75 z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchMove={handleTouchMove}
      style={{
        touchAction: 'none',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'none'
      }}
    >
      <div 
        className={`quiz-video-modal-container transition-transform duration-300 ${
          isVisible ? 'scale-100' : 'scale-95'
        }`}
        onTouchMove={(e) => e.preventDefault()}
        style={{
          aspectRatio: typeof window !== 'undefined' && window.innerWidth >= 768 ? videoAspectRatio : '9/16',
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 32px)'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 text-white z-10 hover:opacity-75 transition-opacity p-1.5 md:p-2 rounded-full bg-black/20 backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Loader2 className="w-6 h-6 md:w-8 md:h-8 text-white animate-spin" />
          </div>
        )}

        <video
          ref={modalVideoRef}
          src={videoSrc}
          poster="/previews/consultant-prewiew.jpeg"
          className={`quiz-video-modal transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          autoPlay
          loop
          playsInline
          disablePictureInPicture
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          muted
          onCanPlay={handleVideoLoad}
          onLoadStart={() => setIsLoading(true)}
        />
      </div>
    </div>
  );

  return isOpen ? createPortal(modalContent, document.body) : null;
} 