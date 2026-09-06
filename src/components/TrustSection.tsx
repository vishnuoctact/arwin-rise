import React from 'react';
import { LEADERSHIP, STATS } from '../data/properties';
import { motion } from 'framer-motion';

export const TrustSection: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-16 lg:py-20 bg-white border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Split Matching Reference Design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (5 Cols): Tag, Title, Advisory Narrative & 4 Stats Horizontal Row */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 80px 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-[1.5px] bg-[#771722]"></span>
                <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-[#771722] uppercase">
                  {LEADERSHIP.tag}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#222222] font-normal leading-[1.18] tracking-tight">
                Built on Values.<br />
                <span className="text-[#771722]">Driven by Relationships.</span>
              </h2>
              <p className="text-sm sm:text-[14.5px] font-sans text-[#55504A] leading-relaxed pt-1">
                Providing ultra-high-net-worth individuals, families, and international NRI investors with trusted due diligence, confidential allocations, and bespoke real estate portfolio management.
              </p>
            </div>

            {/* 4 Stats in horizontal row with vertical dividers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-2 pt-2 border-y border-[#EAE3DA] py-5">
              {STATS.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="pr-2 border-r border-[#EAE3DA] last:border-r-0"
                >
                  <div className="font-serif text-2xl sm:text-[25px] lg:text-[27px] text-[#771722] font-bold tracking-tight" style={{ fontVariantNumeric: 'lining-nums' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-[12px] font-sans font-semibold text-[#666058] mt-1 leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Middle Column (4 Cols): Founder Portrait */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 80px 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-4 flex justify-center items-center"
          >
            <div className="relative w-full max-w-[320px] aspect-[3/4] overflow-hidden bg-[#FAF7F2] shadow-xl border-2 border-[#EAE3DA] hover:border-[#C5A880] transition-colors group">
              <img
                src={LEADERSHIP.image}
                alt={LEADERSHIP.name}
                className="w-full h-full object-cover object-top filter brightness-[1.01] contrast-[1.02] transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#7A1522]/25 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Discreet Brand Stamp */}
              <div className="absolute bottom-3 left-3 bg-[#771722] text-[#C5A880] px-3.5 py-1 text-[10px] font-sans font-bold tracking-widest uppercase shadow-md">
                ARWIN RISE
              </div>
            </div>
          </motion.div>

          {/* Right Column (3 Cols): Quote + Signature + Title */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 80px 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:col-span-3 space-y-5 lg:pl-2"
          >
            <div className="relative">
              {/* Burgundy Quotation Mark */}
              <div className="text-[#771722]/25 text-6xl font-serif leading-none -mb-4 select-none">
                “
              </div>
              <blockquote className="font-serif text-xl sm:text-[21px] text-[#222222] italic font-normal leading-relaxed mb-4">
                {LEADERSHIP.quote}
              </blockquote>
            </div>

            {/* Signature & Multi-Disciplinary Role */}
            <div className="pt-3 border-t border-[#EAE3DA] space-y-1.5">
              <div className="font-signature text-3xl sm:text-4xl text-[#C5A880] font-normal leading-tight">
                {LEADERSHIP.name}
              </div>
              <div className="text-sm font-sans font-bold text-[#771722] uppercase tracking-wider">
                {LEADERSHIP.role}
              </div>
              <div className="text-xs sm:text-[13px] font-sans font-semibold text-[#55504A] leading-normal">
                {LEADERSHIP.designationLine}
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
