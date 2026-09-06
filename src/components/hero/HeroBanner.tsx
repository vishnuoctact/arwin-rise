import React from 'react';
import { OmniSearchBar } from './OmniSearchBar';
import { SearchFilterState } from '../../types/property';
import { motion } from 'framer-motion';

interface HeroBannerProps {
  filterState: SearchFilterState;
  onFilterChange: (newState: Partial<SearchFilterState>) => void;
  onExecuteSearch: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  filterState,
  onFilterChange,
  onExecuteSearch
}) => {
  return (
    <div className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center justify-start pt-28 pb-20 px-6 sm:px-12 lg:px-24 overflow-hidden">
      {/* Living Cinematic Balcony Sunset Background Engine */}
      <div className="absolute inset-0 z-0 bg-[#12161f] overflow-hidden">
        {/* Continuous Slow Cinematic Pan & Breathing Zoom */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            x: ['0%', '-1.5%', '0%'],
            y: ['0%', '-0.8%', '0%']
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          className="w-full h-full absolute inset-0"
        >
          <img
            src="/hyderabad-hero.jpg"
            alt="Luxury Balcony Sunset View overlooking Hyderabad"
            className="w-full h-full object-cover object-right sm:object-center filter brightness-[0.98] contrast-[1.02]"
          />
        </motion.div>

        {/* Ambient Golden Sunset Breathing Light Glow */}
        <motion.div
          animate={{
            opacity: [0.15, 0.28, 0.15]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-orange-400/10 to-transparent pointer-events-none mix-blend-soft-light"
        />

        {/* Cinematic Multi-Layer Gradient Overlays for Sharp Left-Aligned Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/35 pointer-events-none" />
      </div>

      {/* Main Left-Aligned Hero Content with Staggered Entrance */}
      <div className="relative z-10 max-w-2xl w-full">
        {/* Headline with Staggered Fade Up */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl lg:text-[72px] font-serif font-bold text-white tracking-tight leading-[1.08] mb-8 text-left drop-shadow-xl"
        >
          Find your home in<br />
          Hyderabad.
        </motion.h1>

        {/* Floating Search Bar with Smooth Fade Up */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <OmniSearchBar
            filterState={filterState}
            onFilterChange={onFilterChange}
            onExecuteSearch={onExecuteSearch}
          />
        </motion.div>
      </div>
    </div>
  );
};
