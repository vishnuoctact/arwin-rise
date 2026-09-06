import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/properties';
import { FeaturedProject } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface FeaturedCarouselProps {
  onSelectProject: (project: FeaturedProject) => void;
  onViewAll: () => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  onSelectProject,
  onViewAll
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? FEATURED_PROJECTS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === FEATURED_PROJECTS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="insights" className="py-14 sm:py-16 lg:py-20 bg-[#FAF7F2] border-t border-[#EAE3DA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-[1.5px] bg-[#771722]"></span>
              <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-[#771722] uppercase">
                FEATURED RESIDENCES
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onViewAll}
              className="hidden sm:inline-flex items-center gap-1.5 text-[10.5px] font-sans font-semibold tracking-[0.14em] uppercase text-[#222222] hover:text-[#771722] transition-colors group mr-2"
            >
              <span>VIEW ALL PROJECTS</span>
              <ArrowRight className="w-3 h-3 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                aria-label="Previous property"
                className="w-8 h-8 rounded-full border border-[#EAE3DA] bg-white hover:bg-[#771722] text-neutral-600 hover:text-white hover:border-[#771722] flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next property"
                className="w-8 h-8 rounded-full border border-[#EAE3DA] bg-white hover:bg-[#771722] text-neutral-600 hover:text-white hover:border-[#771722] flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel / Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED_PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 80px 0px" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: idx * 0.06 }}
              onClick={() => onSelectProject(proj)}
              className="group cursor-pointer flex flex-col bg-white border border-[#EAE3DA] hover:border-[#C5A880] transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/11] overflow-hidden bg-neutral-900">
                <img
                  src={proj.image}
                  alt={proj.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-[1.02] contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1 bg-white text-[#771722] text-[10px] font-sans font-bold tracking-widest uppercase rounded-sm shadow-md flex items-center gap-1">
                    <Eye className="w-3 h-3 text-[#C5A880]" />
                    QUICK VIEW
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-3.5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-[10px] font-sans font-bold tracking-[0.14em] uppercase text-[#222222] group-hover:text-[#771722] transition-colors">
                    {proj.tag}
                  </h3>
                  <div className="text-[10px] text-[#777777] font-sans mt-0.5">
                    {proj.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
