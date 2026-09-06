import React from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface HighlightCardsProps {
  onNriConnect: () => void;
  onExploreOpportunities: () => void;
}

export const HighlightCards: React.FC<HighlightCardsProps> = ({
  onNriConnect,
  onExploreOpportunities
}) => {
  const nriChecklist = [
    "Virtual Property Tours & 3D Walkthroughs",
    "End-to-End Documentation & Power of Attorney",
    "Legal Due Diligence & RERA Verification",
    "Post-Purchase Asset & Rental Management"
  ];

  const investorChecklist = [
    "High Capital Appreciation Corridors",
    "Institutional Data & Market Intelligence",
    "8–10% Tax-Free Rental Yield Strategy",
    "Confidential Portfolio Advisory"
  ];

  return (
    <section id="nri-connect" className="py-14 sm:py-16 lg:py-20 bg-[#FAF7F2] border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Card 1: NRI CONNECT */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 80px 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white border border-[#EAE3DA] hover:border-[#C5A880] transition-all duration-300 shadow-sm hover:shadow-xl rounded-none overflow-hidden flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900">
                <img
                  src="/images/nri-exec.jpg"
                  alt="NRI Advisory & Global Connect"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[1.01]"
                />
                <div className="absolute top-3.5 left-3.5 bg-[#771722] text-[#C5A880] px-3 py-1 text-[10px] font-sans font-bold tracking-widest uppercase shadow-sm">
                  GLOBAL NRI CONNECT
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <div className="text-[10px] font-sans font-semibold tracking-[0.24em] text-[#C5A880] uppercase mb-1">
                    SEAMLESS CROSS-BORDER OWNERSHIP
                  </div>
                  <h3 className="font-serif text-2xl sm:text-[26px] text-[#222222] font-normal leading-tight group-hover:text-[#771722] transition-colors">
                    Closer to Home. Always.
                  </h3>
                </div>

                <p className="text-xs text-[#666666] font-sans leading-relaxed">
                  Dedicated private concierge managing every phase of luxury property acquisition for NRIs across USA, UK, UAE, and Singapore.
                </p>

                {/* Checklist with Burgundy & Gold Accents */}
                <ul className="space-y-2.5 pt-2 border-t border-[#F0EBE1]">
                  {nriChecklist.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-[#333333] font-sans">
                      <ShieldCheck className="w-4 h-4 text-[#771722] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0">
              <button
                onClick={onNriConnect}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-white py-3.5 px-6 text-[11px] font-sans font-bold tracking-[0.18em] uppercase transition-all duration-200 shadow-sm"
              >
                <span>SCHEDULE NRI CONSULTATION</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: INVESTOR ADVANTAGE & WEALTH ADVISORY */}
          <motion.div 
            id="investors"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 80px 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="bg-white border border-[#EAE3DA] hover:border-[#C5A880] transition-all duration-300 shadow-sm hover:shadow-xl rounded-none overflow-hidden flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900">
                <img
                  src="/images/investor-advisory.jpg"
                  alt="Investor Wealth Advisory"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[1.01]"
                />
                <div className="absolute top-3.5 left-3.5 bg-[#771722] text-[#C5A880] px-3 py-1 text-[10px] font-sans font-bold tracking-widest uppercase shadow-sm">
                  PORTFOLIO ADVISORY
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <div className="text-[10px] font-sans font-semibold tracking-[0.24em] text-[#C5A880] uppercase mb-1">
                    HIGH-GROWTH REAL ESTATE ASSETS
                  </div>
                  <h3 className="font-serif text-2xl sm:text-[26px] text-[#222222] font-normal leading-tight group-hover:text-[#771722] transition-colors">
                    Today's Investments. Tomorrow's Legacy.
                  </h3>
                </div>

                <p className="text-xs text-[#666666] font-sans leading-relaxed">
                  Curated allocation in micro-markets with institutional-grade capital growth metrics across Hyderabad and international high-yield corridors.
                </p>

                {/* Checklist with Burgundy & Gold Accents */}
                <ul className="space-y-2.5 pt-2 border-t border-[#F0EBE1]">
                  {investorChecklist.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-[#333333] font-sans">
                      <TrendingUp className="w-4 h-4 text-[#771722] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0">
              <button
                onClick={onExploreOpportunities}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-white py-3.5 px-6 text-[11px] font-sans font-bold tracking-[0.18em] uppercase transition-all duration-200 shadow-sm"
              >
                <span>EXPLORE INVESTOR PORTFOLIOS</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
