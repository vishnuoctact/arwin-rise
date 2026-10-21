import React from 'react';
import { PageHero } from '../components/PageHero';
import { STATS as DEFAULT_STATS } from '../data/properties';
import { ShieldCheck, Award, Building2, Compass, Leaf, ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

interface AboutPageProps {
  onRequestPreview: () => void;
  onNavigateHome: () => void;
}

const FALLBACK_PILLARS = [
  {
    id: 'p-1',
    title: 'Radical Transparency',
    desc: '100% RERA registered developments, unblemished 30+ year title ownership trails, and zero hidden escalation clauses.'
  },
  {
    id: 'p-2',
    title: 'Architectural Mastery',
    desc: 'Collaborations with award-winning international architects, double-height sky pavilions, and bespoke spatial layouts.'
  },
  {
    id: 'p-3',
    title: 'Sustainable Luxury',
    desc: 'IGBC Platinum pre-certified green structures, rainwater harvesting, solar integration, and low carbon-footprint concrete.'
  },
  {
    id: 'p-4',
    title: 'Lifelong Patron Care',
    desc: 'Dedicated post-possession concierge, bespoke interior execution services, and dedicated resale / rental asset support.'
  }
];

export const AboutPage: React.FC<AboutPageProps> = ({
  onRequestPreview,
  onNavigateHome
}) => {
  const { aboutPage, stats, settings } = useContent();

  const heroTag = aboutPage?.heroTag || "OUR HERITAGE & LEADERSHIP · LIFE STARTS HERE";
  const heroTitle = aboutPage?.heroTitle || "Built on Values. Driven by Relationships.";
  const heroSubtitle = aboutPage?.heroSubtitle || "For over a decade, ARWIN RISE has guided luxury homebuyers, HNIs, and global NRI investors with uncompromising fiduciary integrity and bespoke property advisory.";

  const founderName = aboutPage?.founderName || "Kamal Yellapragada";
  const founderTitle = aboutPage?.founderTitle || "FOUNDER & MANAGING DIRECTOR";
  const founderSubtitle = aboutPage?.founderSubtitle || "Property Expert & NRI Portfolio Manager · Business Coach";
  const founderImage = aboutPage?.founderImage || "/images/founder-pro.jpg";
  const founderQuote = aboutPage?.founderQuote || "“Real estate is not just about properties—it's about people, possibilities, and where your next chapter begins. Life Starts Here.”";
  const founderParagraphs = aboutPage?.founderParagraphs?.length ? aboutPage.founderParagraphs : [
    "When establishing ARWIN RISE, our core mandate was straightforward: to replace traditional broker friction with institutional-grade, fiduciary advisory. Every property we represent undergoes exhaustive 30+ year legal forensics, title verification, and valuation modeling before reaching our patrons.",
    "Whether curating ultra-luxury sky villas in Neopolis, bespoke farm retreats in Shankarpally, or strategic overseas allocations in Dubai, our commitment remains absolute: safeguarding our patrons' wealth and unlocking enduring generational appreciation."
  ];
  const founderDesk = aboutPage?.founderDesk || "FOUNDER'S DESK · HYDERABAD & DUBAI";

  const pillarsTag = aboutPage?.pillarsTag || "OUR FOUNDATION";
  const pillarsTitle = aboutPage?.pillarsTitle || "Four Pillars of Advisory Excellence";
  const pillars = aboutPage?.pillars?.length ? aboutPage.pillars : FALLBACK_PILLARS;
  const currentStats = stats?.length ? stats : DEFAULT_STATS;
  const whatsappPhone = settings?.whatsappPhone || "918464955321";

  const pillarIcons = [ShieldCheck, Compass, Leaf, Award];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Page Hero */}
      <PageHero
        tag={heroTag}
        title={heroTitle}
        subtitle={heroSubtitle}
        breadcrumbs={['About Us', 'Our Heritage & Leadership']}
        onNavigateHome={onNavigateHome}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 space-y-16 lg:space-y-20">
        
        {/* Milestone Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-[#EAE3DA] p-7 sm:p-10 shadow-sm">
          {currentStats.map((stat, idx) => (
            <div key={idx} className="space-y-1.5 border-r border-[#EAE3DA] last:border-r-0 pl-2 sm:pl-4">
              <div className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#771722] font-bold" style={{ fontVariantNumeric: 'lining-nums' }}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-[13px] font-sans font-semibold text-[#55504A] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================ */}
        {/* FOUNDER & LEADERSHIP SPOTLIGHT */}
        {/* ============================================================ */}
        <div className="bg-white border border-[#EAE3DA] p-8 sm:p-12 lg:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Founder Portrait with ARWIN RISE Stamp */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-sm aspect-[4/5] overflow-hidden bg-[#FAF7F2] shadow-2xl border-2 border-[#EAE3DA] group">
                <img
                  src={founderImage}
                  alt={`${founderName} - ${founderTitle}, ARWIN RISE`}
                  className="w-full h-full object-cover object-top filter brightness-[1.01] transition-transform duration-700 group-hover:scale-103"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/founder.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                
                {/* Discrete ARWIN RISE Stamp */}
                <div className="absolute bottom-3.5 left-3.5 bg-[#771722] text-[#FAF7F2] px-3.5 py-1 text-[10px] font-sans font-bold tracking-[0.2em] uppercase shadow-md">
                  ARWIN RISE
                </div>
              </div>
            </motion.div>

            {/* Right: Founder Profile & Philosophy Narrative */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Overline Badge */}
              <div className="flex items-center gap-2">
                <span className="w-5 h-[1.5px] bg-[#771722]" />
                <span className="text-[11.5px] font-sans font-bold tracking-[0.22em] text-[#771722] uppercase">
                  LEADERSHIP & FOUNDER PHILOSOPHY
                </span>
              </div>

              {/* Title & Role */}
              <div className="space-y-1">
                <h2 className="font-serif text-3xl sm:text-4xl text-[#141210] font-normal leading-tight">
                  {founderName}
                </h2>
                <div className="text-xs sm:text-[13px] font-sans font-bold text-[#771722] uppercase tracking-[0.16em]">
                  {founderTitle}
                </div>
                <div className="text-xs sm:text-[13px] font-sans text-neutral-500 font-light">
                  {founderSubtitle}
                </div>
              </div>

              {/* Quote */}
              <div className="p-4 bg-[#FAF7F2] border-l-2 border-[#C5A880]">
                <blockquote className="font-serif text-base sm:text-[17px] text-[#222222] italic font-normal leading-relaxed">
                  {founderQuote}
                </blockquote>
              </div>

              {/* Founder Narrative */}
              <div className="space-y-3.5 text-sm sm:text-[15px] text-[#55504A] font-sans leading-relaxed font-light">
                {founderParagraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Signature Block & Action CTAs */}
              <div className="pt-4 border-t border-[#EAE3DA] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="space-y-1">
                  <div className="font-signature text-3xl sm:text-4xl text-[#C5A880] font-normal leading-tight select-none">
                    {founderName}
                  </div>
                  <div className="text-[11px] font-sans text-neutral-400 uppercase tracking-widest">
                    {founderDesk}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={onRequestPreview}
                    className="inline-flex items-center gap-2 bg-[#771722] hover:bg-[#8E1E2C] text-white px-5 py-3 text-xs font-sans font-bold tracking-widest uppercase transition-colors shadow-md cursor-pointer"
                  >
                    <span>REQUEST ADVISORY</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                  </button>

                  <a
                    href={`https://wa.me/${whatsappPhone}?text=Hello%20${encodeURIComponent(founderName)}%2C%20I%20would%20like%20to%20request%20a%20private%20property%20advisory%20consultation.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-[#EAE3DA] hover:border-[#771722] text-[#222222] bg-white px-4 py-3 text-xs font-sans font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#771722]" />
                    <span>WHATSAPP DESK</span>
                  </a>
                </div>
              </div>

            </motion.div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* 4 CORE PILLARS OF ADVISORY EXCELLENCE */}
        {/* ============================================================ */}
        <div className="pt-8 border-t border-[#EAE3DA] space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#771722]/10 text-[#771722] text-[10px] font-sans font-bold tracking-[0.24em] uppercase">
              <span>{pillarsTag}</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#222222] font-normal">
              {pillarsTitle}
            </h3>
            <p className="text-xs sm:text-sm font-sans text-[#666058] leading-relaxed">
              Every portfolio recommendation and bespoke transaction is anchored in our four foundational pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const IconComp = pillarIcons[idx % pillarIcons.length];
              return (
                <div key={pillar.id || idx} className="bg-white border border-[#EAE3DA] hover:border-[#C5A880] p-7 space-y-4 transition-all duration-300 shadow-xs hover:shadow-lg">
                  <div className="w-14 h-14 bg-[#771722]/5 flex items-center justify-center border border-[#771722]/15">
                    <IconComp className="w-7 h-7 text-[#771722]" />
                  </div>
                  <h4 className="font-serif text-xl text-[#222222]">{pillar.title}</h4>
                  <p className="text-xs sm:text-[13.5px] text-[#55504A] font-sans leading-relaxed font-light">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* PRIVATE BRIEFING ADVISORY BANNER */}
        {/* ============================================================ */}
        <div className="bg-[#141210] text-[#FAF7F2] p-8 sm:p-12 border border-[#C5A880]/30 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <div className="text-[10px] font-sans font-bold tracking-[0.24em] text-[#C5A880] uppercase">
              CONFIDENTIAL PORTFOLIO REVIEW
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Schedule a 1-on-1 Consultation with Managing Leadership
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed">
              Discuss micro-market investment trends, off-market opportunities, or portfolio restructuring with absolute privacy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onRequestPreview}
              className="bg-[#C5A880] hover:bg-[#D4B993] text-[#141210] font-sans font-bold px-7 py-3.5 text-xs tracking-[0.16em] uppercase transition-all shadow-md cursor-pointer"
            >
              BOOK PRIVATE STRATEGY CALL
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
