import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white max-w-md mx-auto overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
          </div>

          <div className="relative flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: -2 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                type: "spring",
                stiffness: 100 
              }}
              className="relative w-24 h-24 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center border border-indigo-50 mb-8"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-[2.2rem] blur opacity-20"></div>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-indigo-600 relative z-10">
                <rect x="4" y="16" width="16" height="4" rx="1.5" fill="currentColor" fillOpacity="0.2" />
                <rect x="5" y="11" width="15" height="4" rx="1.5" transform="rotate(2, 12.5, 13)" fill="currentColor" fillOpacity="0.6" />
                <rect x="4" y="6" width="14" height="4" rx="1.5" transform="rotate(-4, 11, 8)" fill="currentColor" />
              </svg>
            </motion.div>

            {/* Title Animation */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center"
            >
              <h1 className="title-font text-3xl font-[900] tracking-tighter text-gradient uppercase leading-tight mb-2">
                Güncel Sınav<br />Bilgileri
              </h1>
              
              {/* Slogan Animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex items-center justify-center space-x-3"
              >
                <div className="h-px w-6 bg-indigo-200"></div>
                <p className="text-[12px] font-black text-indigo-400 uppercase tracking-[0.3em]">
                  Öğretmen Rehberi
                </p>
                <div className="h-px w-6 bg-indigo-200"></div>
              </motion.div>
            </motion.div>
          </div>

          {/* Loading Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-16 flex flex-col items-center"
          >
            <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="w-full h-full bg-indigo-600"
              />
            </div>
            <p className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Yükleniyor...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
