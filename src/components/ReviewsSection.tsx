import React, { useState, useEffect, useRef } from 'react';
import { Star, ShieldCheck, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, MapPin, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { REVIEWS_DATA as DEFAULT_REVIEWS } from '../data/properties';

interface ReviewsSectionProps {
  onRequestPreview: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onRequestPreview }) => {
  const { testimonials } = useContent();
  const reviews = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_REVIEWS;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeReview = reviews[selectedIndex] || reviews[0];

  // Scroll ONLY the internal container without affecting the main page window
  useEffect(() => {
    const container = scrollContainerRef.current;
    const targetItem = itemRefs.current[selectedIndex];
    if (container && targetItem) {
      const targetOffset = targetItem.offsetTop - container.offsetTop;
      container.scrollTo({
        top: Math.max(0, targetOffset - 20),
        behavior: 'smooth'
      });
    }
  }, [selectedIndex]);

  // Turn off background timer auto-play so it never triggers unexpected jumps while scrolling other sections
  // User can navigate seamlessly via arrow buttons or story cards.

  const handleSelect = (index: number) => {
    setIsAutoPlay(false);
    setSelectedIndex(index);
  };

  const handlePrev = () => {
    setIsAutoPlay(false);
    setSelectedIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setSelectedIndex((prev) => (prev + 1) % reviews.length);
  };

  // Helper to extract initials for monogram
  const getInitials = (name: string) => {
    const parts = name.replace(/Dr\.|Mr\.|Mrs\./g, '').trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return parts[0] ? parts[0].slice(0, 2).toUpperCase() : 'AR';
  };

  return (
    <section id="reviews" className="py-14 sm:py-16 lg:py-20 bg-[#FAF7F2] border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-14 space-y-3">
          <div className="inline-flex items-center gap-3 justify-center">
            <span className="w-6 h-[1.5px] bg-[#771722]"></span>
            <span className="text-[11px] font-sans font-bold tracking-[0.26em] text-[#771722] uppercase">
              CLIENT PERSPECTIVES
            </span>
            <span className="w-6 h-[1.5px] bg-[#771722]"></span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#222222] font-normal tracking-tight">
            Endorsements of Trust.
          </h2>

          <div className="flex items-center justify-center gap-3 text-xs text-[#7A7369] font-sans pt-1">
            <div className="flex text-[#C5A880]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-[#222222]">4.9 / 5.0 Rating</span>
            <span>•</span>
            <span>300+ Verified NRI & Private Clients</span>
          </div>
        </div>

        {/* Editorial Split Layout Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Main Featured Testimonial Spotlight (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-[#EAE3DA] hover:border-[#C5A880] p-7 sm:p-10 shadow-xs transition-all duration-300 relative">
            
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent" />

            <div>
              {/* Star Rating & Verified Shield */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F0EBE1]">
                <div className="flex items-center gap-1 text-[#C5A880]">
                  {[...Array(activeReview.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <div className="inline-flex items-center gap-1.5 text-[9.5px] font-sans font-bold tracking-wider text-[#771722] bg-[#FAF7F2] px-2.5 py-1 border border-[#EAE3DA] uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#771722]" />
                  <span>VERIFIED HOMEOWNER</span>
                </div>
              </div>

              {/* Animated Main Quote Body */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReview.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  <div className="text-[#771722]/20 font-serif text-5xl leading-none select-none -mb-3">
                    “
                  </div>
                  <blockquote className="font-serif text-lg sm:text-[21px] text-[#222222] italic font-normal leading-relaxed">
                    {activeReview.quote}
                  </blockquote>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Client Profile Footer & Navigation */}
            <div className="pt-6 mt-8 border-t border-[#F0EBE1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Author & Monogram */}
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#771722] text-[#C5A880] flex items-center justify-center font-serif text-sm font-bold border border-[#C5A880]/40 flex-shrink-0 shadow-xs">
                  {getInitials(activeReview.clientName)}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-sm text-[#222222]">
                    {activeReview.clientName}
                  </h3>
                  <div className="text-xs text-[#7A7369] font-sans">
                    {activeReview.designation}
                  </div>
                  <div className="text-[10.5px] text-[#888075] font-sans flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#C5A880]" />
                    <span>{activeReview.location}</span>
                  </div>
                </div>
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={handlePrev}
                  aria-label="Previous story"
                  className="w-8 h-8 rounded-full border border-[#EAE3DA] bg-white text-neutral-600 hover:text-[#771722] hover:border-[#771722] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-[#888075] px-1">
                  {selectedIndex + 1} / {reviews.length}
                </span>
                <button
                  onClick={handleNext}
                  aria-label="Next story"
                  className="w-8 h-8 rounded-full border border-[#EAE3DA] bg-white text-neutral-600 hover:text-[#771722] hover:border-[#771722] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Right Selector Column: All Client Stories (5 Cols) with Smooth Scrolling - Hidden on mobile/tablet */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-start space-y-3">
            <div className="flex items-center justify-between px-1 pb-1">
              <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#888075] uppercase">
                SELECT CLIENT STORY ({reviews.length})
              </span>
              <span className="text-[10px] font-sans text-[#C5A880] flex items-center gap-1 font-medium">
                <span>Scroll for more</span>
                <ChevronRight className="w-3 h-3 rotate-90" />
              </span>
            </div>

            {/* Scrollable Container with Custom Thin Luxury Scrollbar */}
            <div 
              ref={scrollContainerRef}
              className="space-y-2.5 max-h-[380px] sm:max-h-[440px] lg:max-h-[470px] overflow-y-auto pr-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#C5A880]/60 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-[#EAE3DA]/40 scroll-smooth"
            >
              {reviews.map((review, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <button
                    key={review.id}
                    ref={(el) => { itemRefs.current[idx] = el; }}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left p-4 sm:p-4.5 border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-white border-[#C5A880] shadow-sm pl-5 border-l-4 border-l-[#771722]'
                        : 'bg-white/60 hover:bg-white border-[#EAE3DA] hover:border-[#C5A880]/60'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-sans text-xs font-bold ${isSelected ? 'text-[#771722]' : 'text-[#222222]'}`}>
                          {review.clientName}
                        </span>
                        <span className="text-[10px] text-[#888075] font-sans">
                          • {review.location.split(',')[0]}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#666058] font-sans line-clamp-1 italic">
                        "{review.quote.slice(0, 75)}..."
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'text-[#771722]' : 'text-neutral-300'
                    }`}>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
