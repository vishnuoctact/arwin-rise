import React from 'react';
import { motion } from 'framer-motion';

export const TrustSection: React.FC = () => {
  return (
    <section id="leadership" className="py-16 sm:py-20 lg:py-24 bg-white border-y border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Luxury Leadership & Advisory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Column (5 Cols): Tag, Title, Advisory Narrative & 4 Stats Horizontal Row */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 80px 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              {/* Overline Tag */}
              <div className="flex items-center gap-2 mb-3.5">
                <span className="w-5 h-[1.5px] bg-[#771722]"></span>
                <span className="text-[11.5px] font-sans font-bold tracking-[0.22em] text-[#771722] uppercase">
                  LEADERSHIP & ADVISORY
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#141210] font-normal leading-[1.18] tracking-tight mb-4">
                Built on Values.<br />
                <span className="text-[#771722]">Driven by Relationships.</span>
              </h2>

              {/* Advisory Body */}
              <p className="text-sm sm:text-[14.5px] font-sans text-neutral-600 font-normal leading-relaxed mb-8 max-w-lg">
                Providing ultra-high-net-worth individuals, families, and international NRI investors with trusted due diligence, confidential allocations, and bespoke real estate portfolio management.
              </p>
            </div>

            {/* 4 Stats in horizontal row with clean vertical dividers */}
            <div className="pt-6 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0">
              {/* Stat 1 */}
              <div className="sm:pr-3.5 sm:border-r border-neutral-200">
                <div className="font-serif text-2xl sm:text-[27px] text-[#771722] font-semibold leading-none mb-1.5" style={{ fontVariantNumeric: 'lining-nums' }}>
                  300+
                </div>
                <div className="text-[11.5px] text-neutral-500 font-sans tracking-tight">
                  NRI Clients
                </div>
              </div>

              {/* Stat 2 */}
              <div className="sm:px-3.5 sm:border-r border-neutral-200">
                <div className="font-serif text-2xl sm:text-[27px] text-[#771722] font-semibold leading-none mb-1.5" style={{ fontVariantNumeric: 'lining-nums' }}>
                  ₹ 100 Cr+
                </div>
                <div className="text-[11.5px] text-neutral-500 font-sans tracking-tight">
                  Business Delivered
                </div>
              </div>

              {/* Stat 3 */}
              <div className="sm:px-3.5 sm:border-r border-neutral-200">
                <div className="font-serif text-2xl sm:text-[27px] text-[#771722] font-semibold leading-none mb-1.5" style={{ fontVariantNumeric: 'lining-nums' }}>
                  10+
                </div>
                <div className="text-[11.5px] text-neutral-500 font-sans tracking-tight">
                  Years Experience
                </div>
              </div>

              {/* Stat 4 */}
              <div className="sm:pl-3.5">
                <div className="font-serif text-2xl sm:text-[27px] text-[#771722] font-semibold leading-none mb-1.5" style={{ fontVariantNumeric: 'lining-nums' }}>
                  30+
                </div>
                <div className="text-[11.5px] text-neutral-500 font-sans tracking-tight">
                  Projects Advised
                </div>
              </div>
            </div>
          </motion.div>

          {/* Middle Column (4 Cols): Founder Portrait with ARWIN RISE Stamp */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 80px 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-4 flex justify-center items-center"
          >
            <div className="relative w-full max-w-[340px] aspect-[4/5] overflow-hidden bg-[#FAF7F2] shadow-2xl border border-neutral-200 group">
              <img
                src="/images/founder-pro.jpg"
                alt="Kamal Yellapragada - Founder & Managing Director, ARWIN RISE"
                className="w-full h-full object-cover object-top filter brightness-[1.01] transition-transform duration-700 group-hover:scale-103"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/founder.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              
              {/* Discrete ARWIN RISE Stamp */}
              <div className="absolute bottom-3.5 left-3.5 bg-[#771722] text-[#FAF7F2] px-3.5 py-1 text-[10px] font-sans font-bold tracking-[0.2em] uppercase shadow-md">
                ARWIN RISE
              </div>
            </div>
          </motion.div>

          {/* Right Column (3 Cols): Quote + Signature + Role */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 80px 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:col-span-3 flex flex-col justify-center space-y-4 lg:pl-2"
          >
            <div>
              {/* Elegant Gold Quote Mark */}
              <div className="text-4xl sm:text-5xl font-serif text-[#C5A880]/70 leading-none mb-1 select-none">
                “
              </div>
              <blockquote className="font-serif text-base sm:text-[17px] text-neutral-800 italic font-normal leading-relaxed">
                “Real estate is not just about properties—it's about people, possibilities, and where your next chapter begins. Life Starts Here.”
              </blockquote>
            </div>

            {/* Divider Line */}
            <div className="w-full h-[1px] bg-neutral-200 my-2" />

            {/* Signature & Title Block */}
            <div className="space-y-1">
              <div className="font-signature text-3xl sm:text-4xl text-[#C5A880] font-normal leading-tight select-none">
                Kamal Yellapragada
              </div>
              <div className="text-[12px] font-sans font-bold text-[#771722] uppercase tracking-[0.14em] pt-1">
                FOUNDER & MANAGING DIRECTOR
              </div>
              <div className="text-[11.5px] font-sans text-neutral-500 leading-snug">
                Property Expert & NRI Portfolio Manager · Business Coach
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
