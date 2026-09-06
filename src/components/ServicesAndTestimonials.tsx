import React from 'react';
import { ArrowRight, Globe, TrendingUp, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServicesAndTestimonialsProps {
  onNriClick?: () => void;
  onInvestorClick?: () => void;
  onRequestPreview?: () => void;
}

export const ServicesAndTestimonials: React.FC<ServicesAndTestimonialsProps> = ({
  onNriClick,
  onInvestorClick,
  onRequestPreview
}) => {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-14 space-y-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-5 h-[1.5px] bg-[#771722]"></span>
            <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-[#771722] uppercase">
              BESPOKE ADVISORY & SERVICES
            </span>
            <span className="w-5 h-[1.5px] bg-[#771722]"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#222222] font-normal leading-tight">
            Tailored for Discerning Clients
          </h2>
        </div>

        {/* 3 Dedicated Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: NRI CONNECT */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 80px 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white border border-[#EAE3DA] hover:border-[#C5A880] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
          >
            {/* Top Image Banner */}
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 flex-shrink-0">
              <img
                src="/images/nri-exec.jpg"
                alt="NRI Connect"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Bottom Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-[1.5px] bg-[#771722]"></span>
                  <span className="text-[11.5px] font-sans font-bold tracking-[0.22em] text-[#771722] uppercase">
                    NRI CONNECT
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-[26px] text-[#222222] font-normal leading-snug">
                  Your Home.<br />Our Priority.
                </h3>
                <p className="text-xs text-[#666666] font-sans leading-relaxed pt-1">
                  Dedicated support for NRIs — from property advisory to legal guidance, documentation and seamless ownership, wherever you are in the world.
                </p>
              </div>

              <div>
                <button
                  onClick={onNriClick}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[#771722]/30 bg-white hover:bg-[#771722] text-[#222222] hover:text-white text-[11px] font-sans font-semibold tracking-[0.16em] uppercase transition-all duration-200 group-hover:border-[#771722]"
                >
                  <span>LEARN MORE</span>
                  <ArrowRight className="w-3 h-3 text-[#771722] group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 2: INVESTOR ADVISORY */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 80px 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="bg-white border border-[#EAE3DA] hover:border-[#771722] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
          >
            {/* Top Image Banner: Luxury High-Rise Asset */}
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 flex-shrink-0">
              <img
                src="/images/investor-advisory.jpg"
                alt="Investor Advisory High-Yield Assets"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Bottom Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-[1.5px] bg-[#771722]"></span>
                  <span className="text-[11.5px] font-sans font-bold tracking-[0.22em] text-[#771722] uppercase">
                    INVESTOR ADVISORY
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-[26px] text-[#222222] font-normal leading-snug">
                  Build <span className="text-[#771722] font-serif">W</span>ealth<br />With Confidence.
                </h3>
                <p className="text-xs text-[#666666] font-sans leading-relaxed pt-1">
                  Strategic guidance for high-growth opportunities across residential and commercial assets designed for long-term compounding.
                </p>
              </div>

              <div>
                <button
                  onClick={onInvestorClick}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[#771722]/30 bg-white hover:bg-[#771722] text-[#222222] hover:text-white text-[11px] font-sans font-semibold tracking-[0.16em] uppercase transition-all duration-200 group-hover:border-[#771722]"
                >
                  <span>LEARN MORE</span>
                  <ArrowRight className="w-3 h-3 text-[#771722] group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 3: PRIVATE PREVIEW */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 80px 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
            className="bg-white border border-[#EAE3DA] hover:border-[#771722] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
          >
            {/* Top Image Banner: Luxury Villa Estate */}
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 flex-shrink-0">
              <img
                src="/images/private-preview-card.jpg"
                alt="Private Preview Portal"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Bottom Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-[1.5px] bg-[#771722]"></span>
                  <span className="text-[11.5px] font-sans font-bold tracking-[0.22em] text-[#771722] uppercase">
                    PRIVATE PREVIEW
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-[26px] text-[#222222] font-normal leading-snug">
                  By Invitation.<br />Exclusively Yours.
                </h3>
                <p className="text-xs text-[#666666] font-sans leading-relaxed pt-1">
                  Access limited-edition residences, early releases, and off-market opportunities before public announcement.
                </p>
              </div>

              <div>
                <button
                  onClick={onRequestPreview}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[#771722]/30 bg-white hover:bg-[#771722] text-[#222222] hover:text-white text-[11px] font-sans font-semibold tracking-[0.16em] uppercase transition-all duration-200 group-hover:border-[#771722]"
                >
                  <span>REQUEST INVITATION</span>
                  <ArrowRight className="w-3 h-3 text-[#771722] group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
