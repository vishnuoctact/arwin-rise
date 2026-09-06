import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { HERO_SLIDES as DEFAULT_SLIDES } from '../data/properties';
import { Play, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  onExploreClick: () => void;
  onWatchStory: () => void;
  isLoaded?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onWatchStory, isLoaded = true }) => {
  const { heroSlides } = useContent();
  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : DEFAULT_SLIDES;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = slides.length;

  // Auto-playing carousel with pause on hover, only starts after preloader is done
  useEffect(() => {
    if (!isLoaded) {
      setCurrentSlide(0);
      return;
    }

    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 7500);

    return () => clearInterval(timer);
  }, [isLoaded, isPaused, totalSlides]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const slide = slides[currentSlide] || slides[0];

  return (
    <section 
      className="relative w-full min-h-[88vh] lg:h-[90vh] lg:max-h-[860px] flex items-center justify-start overflow-hidden pt-16 bg-[#FAF7F2]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* 100% Pure, Pristine, Clean Images */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={slide.titleLine1}
              className={`w-full h-full object-cover ${slide.imagePositionMobile || 'object-center'}`}
            />
            {/* Mobile-Only Partial Left-to-Right Gradient: Rich soft ivory foundation across the left 88% where text sits, fading smoothly on the right */}
            <div className="absolute inset-y-0 left-0 w-[88%] bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/90 via-60% to-transparent sm:hidden pointer-events-none" />
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Pure, Clean Hero Typography */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-16">
        <div className="max-w-lg lg:max-w-xl space-y-4">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${slide.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-4"
            >
              {/* Top Sub-Heading / Brand Descriptor */}
              <div className="flex items-center gap-2 mb-1">
                <span className="w-3.5 sm:w-5 h-[1.5px] bg-[#771722]"></span>
                <span className="text-[9px] sm:text-[11px] font-sans font-bold tracking-[0.20em] sm:tracking-[0.22em] text-[#771722] uppercase">
                  {slide.brandTag}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[48px] text-[#111111] font-normal leading-[1.24] sm:leading-[1.22] tracking-tight">
                {slide.titleLine1}<br />
                <span className="text-[#771722] font-medium">{slide.titleLine2}</span>
              </h1>

              {/* Golden Divider Line */}
              <div className="w-9 h-[1.5px] bg-[#C5A880]" />

              {/* Subheadline */}
              <p className="text-[13.5px] sm:text-[14px] font-sans font-medium text-[#1A1A1A] leading-relaxed max-w-md">
                {slide.subheadline}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                {/* Primary Action Button */}
                <button
                  onClick={onExploreClick}
                  className="group inline-flex items-center gap-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-white px-5 sm:px-6 py-3 text-[10.5px] font-sans font-semibold tracking-[0.16em] uppercase rounded-none shadow-md transition-all duration-200"
                >
                  <span>{slide.ctaPrimary}</span>
                  <ArrowRight className="w-3 h-3 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Secondary Action: Watch Story */}
                <button
                  onClick={onWatchStory}
                  className="group inline-flex items-center gap-2 bg-white/85 hover:bg-white text-[#222222] px-4 sm:px-5 py-3 text-[10.5px] font-sans font-semibold tracking-[0.16em] uppercase rounded-none border border-[#EAE3DA] hover:border-[#C5A880] shadow-xs transition-all duration-200"
                >
                  <div className="w-4 h-4 rounded-full border border-[#C5A880] flex items-center justify-center text-[#771722] group-hover:bg-[#771722] group-hover:text-white transition-colors">
                    <Play className="w-2 h-2 fill-current ml-0.5" />
                  </div>
                  <span>{slide.ctaSecondary}</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* Sleek, Minimal Floating Glass Slide Controller */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-20 flex items-center gap-1.5 sm:gap-2.5 bg-[#FAF7F2]/90 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 border border-[#EAE3DA] shadow-sm">
        
        {/* Slide Counter */}
        <div className="text-[10.5px] sm:text-[11px] font-sans font-bold text-[#771722] tracking-wider pr-1.5 sm:pr-2 border-r border-[#EAE3DA]" style={{ fontVariantNumeric: 'lining-nums' }}>
          <span>0{currentSlide + 1}</span>
          <span className="text-neutral-400 font-normal text-[9.5px] sm:text-[10px]"> / 0{totalSlides}</span>
        </div>

        {/* Minimal Chevrons */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={handlePrev}
            className="p-1 text-[#444444] hover:text-[#771722] transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNext}
            className="p-1 text-[#444444] hover:text-[#771722] transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </section>
  );
};
