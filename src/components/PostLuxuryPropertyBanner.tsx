import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

interface PostLuxuryPropertyBannerProps {
  onOpenListModal: () => void;
}

export const PostLuxuryPropertyBanner: React.FC<PostLuxuryPropertyBannerProps> = ({ onOpenListModal }) => {
  const { sellerDesk, settings } = useContent();

  if (sellerDesk && sellerDesk.isVisible === false) {
    return null;
  }

  const tag = sellerDesk?.tag || "PRIVATE SELLER DESK";
  const headlineMain = sellerDesk?.headlineMain || "List Your Property.";
  const headlineAccent = sellerDesk?.headlineAccent || "Private Representation.";
  const description = sellerDesk?.description || "Discreet off-market advisory and direct access to qualified Grade-A, Elite & Global NRI buyers for Hyderabad's luxury residences.";
  const stats = sellerDesk?.stats || [
    { value: '₹ 1.5 Cr+', label: 'Grade-A Standard' },
    { value: '100%', label: 'Off-Market Privacy' },
    { value: '4,500+', label: 'Elite & NRI Buyers' },
    { value: '48 Hrs', label: 'Buyer Matching' }
  ];
  const image = sellerDesk?.image || "/images/villa-triplex-interior.jpg";
  const quote = sellerDesk?.quote || "“Your luxury asset deserves an advisory-first presentation—commanding true valuation without public portal exposure.”";
  const primaryCtaText = sellerDesk?.primaryCtaText || "POST LUXURY PROPERTY";
  const whatsappCtaText = sellerDesk?.whatsappCtaText || "WHATSAPP SELLER DESK";
  const whatsappMessage = sellerDesk?.whatsappMessage || "Hello Arwin Rise Seller Desk, I would like to list my Grade-A luxury property for private advisory.";
  const footnote = sellerDesk?.footnote || "* Note: We only take up Grade-A luxury residences worth ₹1.5 Crore and above.";
  const whatsappPhone = settings?.whatsappPhone || "918464954321";

  return (
    <section id="post-property" className="py-14 sm:py-16 lg:py-20 bg-white border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Split Matching Leadership & Advisory Layout */}
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
                  {tag}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#222222] font-normal leading-[1.18] tracking-tight">
                {headlineMain}<br />
                {headlineAccent && <span className="text-[#771722]">{headlineAccent}</span>}
              </h2>
              <p className="text-sm sm:text-[14.5px] font-sans text-[#55504A] leading-relaxed pt-1">
                {description}
              </p>
            </div>

            {/* 4 Stats in horizontal row with vertical dividers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-2 pt-2 border-y border-[#EAE3DA] py-5">
              {stats.map((stat, idx) => (
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

          {/* Middle Column (4 Cols): Luxury Property Portrait Image */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 80px 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-4 flex justify-center items-center"
          >
            <div className="relative w-full max-w-[320px] aspect-[3/4] overflow-hidden bg-[#FAF7F2] shadow-xl border-2 border-[#EAE3DA] hover:border-[#C5A880] transition-colors group">
              <img
                src={image}
                alt="Luxury Residence Asset Representation"
                className="w-full h-full object-cover filter brightness-[1.01] contrast-[1.02] transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Right Column (3 Cols): Editorial Quote + Action Buttons */}
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
                {quote}
              </blockquote>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[#EAE3DA] space-y-3">
              <button
                onClick={onOpenListModal}
                className="w-full flex items-center justify-center gap-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-white py-3.5 px-5 text-xs font-sans font-bold tracking-widest uppercase transition-all shadow-md group cursor-pointer"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-[#FAF7F2] text-[#222222] border border-[#EAE3DA] hover:border-[#771722] py-2.5 px-4 text-xs font-sans font-semibold tracking-wider uppercase transition-colors cursor-pointer text-center"
              >
                <span>{whatsappCtaText}</span>
              </a>

              {footnote && (
                <div className="text-[11px] font-sans text-[#777068] text-center pt-0.5 font-medium">
                  {footnote}
                </div>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
