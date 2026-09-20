import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
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
    <section id="post-property" className="py-14 sm:py-16 lg:py-20 bg-[#FAF7F2] border-t border-[#EAE3DA] relative overflow-hidden">
      {/* Subtle architectural ambient accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-[#C5A880]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Bespoke Luxury Seller Lounge Card */}
        <div className="bg-white border border-[#EAE3DA] shadow-sm p-6 sm:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column (7 Cols): Editorial Narrative, Quote, & Action Suite */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 80px 0px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Overline Badge */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-[1.5px] bg-[#771722]"></span>
                  <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-[#771722] uppercase">
                    {tag}
                  </span>
                </div>

                {/* Main Headline */}
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#141210] font-normal leading-[1.15] tracking-tight">
                  {headlineMain}{' '}
                  {headlineAccent && <span className="text-[#771722] block sm:inline">{headlineAccent}</span>}
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-[15px] font-sans text-[#55504A] leading-relaxed max-w-xl">
                  {description}
                </p>
              </div>

              {/* Private Advisory Quote Callout */}
              <div className="p-4 sm:p-5 bg-[#FAF7F2] border-l-2 border-[#C5A880] relative">
                <blockquote className="font-serif text-base sm:text-[17px] text-[#222222] italic font-normal leading-relaxed">
                  {quote}
                </blockquote>
              </div>

              {/* Action Buttons & Footnote */}
              <div className="pt-2 space-y-3.5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={onOpenListModal}
                    className="inline-flex items-center justify-center gap-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-white py-3.5 px-6 text-xs font-sans font-bold tracking-widest uppercase transition-all shadow-md group cursor-pointer"
                  >
                    <span>{primaryCtaText}</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF7F2] text-[#222222] border border-[#EAE3DA] hover:border-[#771722] py-3.5 px-5 text-xs font-sans font-semibold tracking-wider uppercase transition-colors cursor-pointer text-center"
                  >
                    <span>{whatsappCtaText}</span>
                  </a>
                </div>

                {footnote && (
                  <div className="flex items-center gap-1.5 text-[11.5px] font-sans text-[#777068]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#771722] flex-shrink-0" />
                    <span>{footnote}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right Column (5 Cols): Showcase Visual + Integrated 2x2 Metric Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 80px 0px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="lg:col-span-5 space-y-4"
            >
              {/* Showcase Image with Architectural Frame */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden bg-[#FAF7F2] border border-[#EAE3DA] shadow-md group">
                <img
                  src={image}
                  alt="Luxury Residence Asset Representation"
                  className="w-full h-full object-cover filter brightness-[1.01] contrast-[1.02] transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                
                {/* Discrete Overlay Tag */}
                <div className="absolute bottom-3 left-3 bg-[#141210]/85 backdrop-blur-xs text-[#FAF7F2] px-3 py-1 text-[9.5px] font-sans font-semibold tracking-[0.2em] uppercase border border-white/15">
                  CONFIDENTIAL OFF-MARKET DESK
                </div>
              </div>

              {/* 2x2 Pillar Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 sm:p-4 bg-[#FAF7F2] border border-[#EAE3DA] hover:border-[#C5A880]/60 transition-colors"
                  >
                    <div className="font-serif text-xl sm:text-2xl text-[#771722] font-bold tracking-tight" style={{ fontVariantNumeric: 'lining-nums' }}>
                      {stat.value}
                    </div>
                    <div className="text-[11.5px] sm:text-xs font-sans font-medium text-[#666058] mt-0.5 leading-snug">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};
