import { useEffect } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005EB8] via-[#0077D4] to-[#0091EA] flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* Bupa Logo */}
        <motion.div 
          className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-2xl"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12h4l3 9 4-18 3 9h4" stroke="#005EB8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        {/* Brand Name */}
        <motion.h1 
          className="text-white text-4xl mb-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Bupa Arabia
        </motion.h1>

        {/* Tagline */}
        <motion.p 
          className="text-white/90 text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Your Health, Connected.
        </motion.p>
      </motion.div>

      {/* Loading Indicator */}
      <motion.div
        className="mt-16 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-white rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
