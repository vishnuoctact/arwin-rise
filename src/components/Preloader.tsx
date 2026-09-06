import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArwinLogo } from './ArwinLogo';
import { ShieldCheck } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const { preloaderConfig } = useContent();

  const isEnabled = preloaderConfig?.isEnabled !== false;
  const durationSeconds = preloaderConfig?.durationSeconds || 4.5;
  const totalDuration = Math.max(1000, durationSeconds * 1000);
  const bottomBadge = preloaderConfig?.bottomBadge || "CONFIDENTIAL PRIVATE PORTFOLIO";
  
  const messages = preloaderConfig?.messages?.length ? preloaderConfig.messages : [
    {
      id: 'pre-1',
      tag: "PRIVATE PROPERTY ADVISORY",
      quote: "Exceptional residences. Carefully selected.",
      sub: "Curated for discerning homebuyers & global wealth creators."
    }
  ];

  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  // If preloader is disabled, finish immediately
  useEffect(() => {
    if (!isEnabled) {
      onComplete();
    }
  }, [isEnabled, onComplete]);

  // Message Cycling across the duration
  useEffect(() => {
    if (!isEnabled || messages.length <= 1) return;

    const intervalTime = totalDuration / messages.length;
    const timers: NodeJS.Timeout[] = [];

    for (let i = 1; i < messages.length; i++) {
      const t = setTimeout(() => {
        setLineIndex(i);
      }, intervalTime * i);
      timers.push(t);
    }

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, [isEnabled, totalDuration, messages.length]);

  // Measured, smooth luxury progress counter
  useEffect(() => {
    if (!isEnabled) return;

    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / totalDuration) * 100));

      setProgress(rawProgress);

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isEnabled, totalDuration, onComplete]);

  if (!isEnabled) return null;

  const currentLine = messages[lineIndex] || messages[0];

  return (
    <AnimatePresence>
      <motion.div
        key="luxury-experience-preloader"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0, 
          scale: 1.015,
          filter: "blur(4px)",
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
        }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-between py-12 lg:py-16 px-6 bg-[#FAF7F2] text-[#222222] select-none overflow-hidden"
      >
        {/* Luminous Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#C5A880]/15 via-[#7A1522]/8 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Spacer for Clean Balanced Vertical Centering */}
        <div className="w-full" />

        {/* Centerpiece: Logo + Magnetic Luxury Quotes Carousel */}
        <div className="relative z-10 flex flex-col items-center space-y-8 text-center max-w-xl">
          
          {/* Logo Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex flex-col items-center py-2"
          >
            <ArwinLogo variant="dark" size="lg" className="scale-115 sm:scale-130 transition-transform origin-center" />
          </motion.div>

          {/* Magnetic Editorial Carousel */}
          <div className="min-h-[110px] flex flex-col items-center justify-center space-y-2.5">
            <AnimatePresence mode="wait">
              <motion.div
                key={lineIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="space-y-2"
              >
                {currentLine.tag && (
                  <div className="text-[10.5px] font-sans font-bold tracking-[0.28em] text-[#C5A880] uppercase">
                    {currentLine.tag}
                  </div>
                )}

                {currentLine.quote && (
                  <h2 className="font-serif text-2xl sm:text-[28px] text-[#222222] font-normal leading-tight">
                    “{currentLine.quote}”
                  </h2>
                )}

                {currentLine.sub && (
                  <p className="text-xs sm:text-[13px] font-sans text-[#777777] max-w-md mx-auto">
                    {currentLine.sub}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtle Progress Bar */}
          <div className="w-56 h-[1.5px] bg-[#EAE3DA] overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-[#C5A880] to-[#7A1522]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

        </div>

        {/* Bottom Percentage Counter & Trust Guarantee */}
        <div className="relative z-10 flex flex-col items-center space-y-2">
          <div className="font-mono text-xs font-semibold tracking-widest text-[#771722]">
            {progress.toString().padStart(2, '0')}%
          </div>

          {bottomBadge && (
            <div className="flex items-center gap-1.5 text-[10px] font-sans text-neutral-400 uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3 text-[#C5A880]" />
              <span>{bottomBadge}</span>
            </div>
          )}
        </div>

      </motion.div>
    </AnimatePresence>
  );
};
