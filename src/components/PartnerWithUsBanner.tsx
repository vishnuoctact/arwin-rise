import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

interface PartnerWithUsBannerProps {
  onOpenCareerModal: () => void;
}

export const PartnerWithUsBanner: React.FC<PartnerWithUsBannerProps> = ({ onOpenCareerModal }) => {
  const { partnerSection, settings } = useContent();

  if (partnerSection && partnerSection.isVisible === false) {
    return null;
  }

  const tag = partnerSection?.tag || "CAREERS & STRATEGIC PARTNERSHIPS";
  const badgeNote = partnerSection?.badgeNote || "(Only serious professionals — Preferably freshers)";
  const headlineMain = partnerSection?.headlineMain || "Partner With Us.";
  const headlineAccent = partnerSection?.headlineAccent || "For the Most Rewarding Real Estate Career.";
  const description = partnerSection?.description || "Represent ₹1.5 Cr – ₹35 Cr+ luxury portfolios with 1-on-1 executive mentorship and industry-leading transparent incentives.";
  const whatsappCtaText = partnerSection?.whatsappCtaText || "APPLY VIA WHATSAPP";
  const whatsappMessage = partnerSection?.whatsappMessage || "Hello Arwin Rise Hiring Desk, I am a serious professional interested in the Real Estate Career opportunity.";
  const modalCtaText = partnerSection?.modalCtaText || "SUBMIT RESUME";
  const whatsappPhone = settings?.whatsappPhone || "918464955321";

  return (
    <section id="careers" className="py-12 sm:py-14 lg:py-16 bg-white border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Single-Card Executive Ribbon */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 60px 0px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#FAF7F2] border border-[#EAE3DA] hover:border-[#C5A880]/70 p-6 sm:p-8 lg:p-9 shadow-2xs transition-all duration-300"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
            
            {/* Left Content: Title + Inline Requirement + Punchy Subtext */}
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-[1.5px] bg-[#771722]"></span>
                  <span className="text-[11px] font-sans font-bold tracking-[0.22em] text-[#771722] uppercase">
                    {tag}
                  </span>
                </div>
                {badgeNote && (
                  <>
                    <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#D9D0C5]" />
                    <span className="text-[11px] sm:text-xs font-sans font-semibold text-[#771722]">
                      {badgeNote}
                    </span>
                  </>
                )}
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[32px] text-[#222222] font-normal leading-[1.2] tracking-tight">
                {headlineMain} {headlineAccent && <span className="text-[#771722]">{headlineAccent}</span>}
              </h2>

              <p className="text-xs sm:text-[13px] font-sans text-[#55504A] leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>

            {/* Right CTAs: Compact Twin Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 flex-shrink-0 w-full sm:w-auto lg:w-[250px]">
              <a
                href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#771722] hover:bg-[#8E1E2C] text-white py-2.5 px-4 text-[11px] font-sans font-bold tracking-widest uppercase transition-all shadow-xs cursor-pointer group"
              >
                <span>{whatsappCtaText}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenCareerModal}
                className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF7F2] text-[#222222] border border-[#EAE3DA] hover:border-[#771722] py-2 px-3 text-[11px] font-sans font-semibold tracking-wider uppercase transition-colors cursor-pointer text-center"
              >
                <span>{modalCtaText}</span>
              </button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
