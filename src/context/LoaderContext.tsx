// 'use client';

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useCallback,
//   useEffect,
// } from 'react';
// import { usePathname } from 'next/navigation';
// import { GlobalLoading } from '@/components/GlobalLoading/GlobalLoading';

// type LoaderContextType = {
//   showLoading: () => void;
//   hideLoading: () => void;
//   isLoading: boolean;
// };

// const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

// export const useLoader = () => {
//   const context = useContext(LoaderContext);
//   if (!context) throw new Error('useLoader must be used inside LoaderProvider');
//   return context;
// };

// export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [triggered, setTriggered] = useState(false);
//   const pathname = usePathname();

//   const showLoading = useCallback(() => {
//     setTriggered(true);
//     setIsLoading(true);
//   }, []);

//   const hideLoading = useCallback(() => {
//     setTriggered(false);
//     setIsLoading(false);
//   }, []);

//   // Когда маршрут изменился — прячем лоадер
//   useEffect(() => {
//     if (triggered) {
//       const timeout = setTimeout(() => {
//         hideLoading();
//       }, 300); // можно сделать 0 или чуть больше, если нужна плавность
//       return () => clearTimeout(timeout);
//     }
//   }, [pathname, triggered, hideLoading]);

//   return (
//     <LoaderContext.Provider value={{ showLoading, hideLoading, isLoading }}>
//       {children}

//       {isLoading && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
//           <GlobalLoading/>
//         </div>
//       )}
//     </LoaderContext.Provider>
//   );
// };
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { VideoText } from '@/components/magicui/video-text';

const LoaderContext = createContext<{
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
} | null>(null);

export const useLoader = () => {
  const ctx = useContext(LoaderContext);
  if (!ctx) throw new Error('useLoader must be used inside LoaderProvider');
  return ctx;
};

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Когда маршрут поменялся — скрываем загрузку
    setIsLoading(false);
  }, [pathname]);

  return (
    <LoaderContext.Provider value={{
      isLoading,
      showLoading: () => setIsLoading(true),
      hideLoading: () => setIsLoading(false),
    }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] bg-transparent flex items-center justify-center pointer-events-none">
          {/* <p className="text-xl animate-pulse">Загрузка...</p> */}
          <div className="w-[200px] h-[80px]">
           <VideoText src="https://cdn.magicui.design/ocean-small.webm">
                    ЗАГРУЗКА
                  </VideoText>
          </div>
        </div>
      )}
    </LoaderContext.Provider>
  );
};
