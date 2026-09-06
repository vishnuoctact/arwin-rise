import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  tag: string;
  title: string;
  subtitle: string;
  breadcrumbs?: string[];
  onNavigateHome?: () => void;
}

export const PageHero: React.FC<PageHeroProps> = ({
  tag,
  title,
  subtitle,
  breadcrumbs = ['Home'],
  onNavigateHome
}) => {
  return (
    <section className="relative bg-[#FAF7F2] border-b border-[#EAE3DA] pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[11px] font-sans text-neutral-500 uppercase tracking-wider mb-4">
          <button 
            onClick={onNavigateHome}
            className="hover:text-[#771722] transition-colors"
          >
            HOME
          </button>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <span>/</span>
              <span className={idx === breadcrumbs.length - 1 ? 'text-[#771722] font-semibold' : ''}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Tag & Title */}
        <div className="max-w-3xl">
          <div className="text-[10px] font-sans font-semibold tracking-[0.25em] text-[#C5A880] uppercase mb-2">
            — {tag} —
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#222222] font-normal leading-tight tracking-wide mb-3">
            {title}
          </h1>
          <div className="w-10 h-[1.5px] bg-[#C5A880] mb-4"></div>
          <p className="text-xs sm:text-sm font-sans text-[#555555] leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};
