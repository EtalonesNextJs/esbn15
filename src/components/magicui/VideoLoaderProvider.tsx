'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { VideoText } from '@/components/magicui/video-text';

type LoaderContextType = {
  show: () => void;
  hide: () => void;
};

const VideoLoaderContext = createContext<LoaderContextType | null>(null);

export const useVideoLoader = () => {
  const ctx = useContext(VideoLoaderContext);
  if (!ctx) throw new Error('useVideoLoader must be used within VideoLoaderProvider');
  return ctx;
};

export const VideoLoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <VideoLoaderContext.Provider value={{ show, hide }}>
      {children}
      <div
        className={`fixed bottom-4 right-4 z-[9999] transition-opacity duration-300 pointer-events-none`}
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div className="w-[200px] h-[80px]">
          <VideoText src="https://cdn.magicui.design/ocean-small.webm">
            ЗАГРУЗКА
          </VideoText>
        </div>
      </div>
    </VideoLoaderContext.Provider>
  );
};
