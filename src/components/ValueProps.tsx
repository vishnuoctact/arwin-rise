import React from 'react';
import { motion } from 'framer-motion';

interface ValuePropsProps {
  onNriClick?: () => void;
  onInvestorClick?: () => void;
  onTrustClick?: () => void;
}

export const ValueProps: React.FC<ValuePropsProps> = ({
  onNriClick,
  onInvestorClick,
  onTrustClick
}) => {
  const items = [
    {
      id: "private-exclusive",
      title: "PRIVATE & EXCLUSIVE",
      description: "Limited Residences.\nBy Invitation Only.",
      action: undefined,
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-current fill-none stroke-[1.5]">
          <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      )
    },
    {
      id: "nri-connect",
      title: "NRI CONNECT",
      description: "End-to-end support\nfor NRIs worldwide.",
      action: onNriClick,
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-current fill-none stroke-[1.5]">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      )
    },
    {
      id: "investor-focused",
      title: "INVESTOR FOCUSED",
      description: "High appreciation assets.\nTrusted guidance.",
      action: onInvestorClick,
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-current fill-none stroke-[1.5]">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
          <polyline points="17 6 23 6 23 12"/>
        </svg>
      )
    },
    {
      id: "legacy-trust",
      title: "LEGACY OF TRUST",
      description: "RERA Compliant.\nTransparent. Reliable.",
      action: onTrustClick,
      svgIcon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-current fill-none stroke-[1.5]">
          <circle cx="12" cy="8" r="7"/>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
        </svg>
      )
    }
  ];

  return (
    <section className="bg-white border-t-2 border-t-[#771722] border-b border-[#EAE3DA] py-8 sm:py-9 relative z-20 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 80px 0px" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: idx * 0.05 }}
              onClick={item.action}
              className={`flex items-center gap-4 lg:px-6 xl:px-7 border-b sm:border-b-0 pb-4 sm:pb-0 border-[#EAE3DA]/80 ${
                idx < items.length - 1 ? 'lg:border-r lg:border-[#EAE3DA]' : ''
              } ${item.action ? 'cursor-pointer' : ''}`}
            >
              {/* Steady Burgundy Medallion Icon Badge */}
              <div className="w-12 h-12 rounded-full bg-[#771722]/8 text-[#771722] border border-[#771722]/20 flex items-center justify-center flex-shrink-0">
                {item.svgIcon}
              </div>

              {/* Text Block */}
              <div className="text-left flex-1 min-w-0">
                <h3 className="font-sans text-xs sm:text-[12.5px] font-bold tracking-[0.16em] text-[#1A1A1A] uppercase">
                  {item.title}
                </h3>

                <p className="text-[11px] sm:text-[11.5px] text-[#666666] font-sans mt-0.5 leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
