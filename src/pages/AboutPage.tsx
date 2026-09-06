import React from 'react';
import { PageHero } from '../components/PageHero';
import { STATS as DEFAULT_STATS } from '../data/properties';
import { ShieldCheck, Award, Heart, CheckCircle2, Sparkles, Building2, Compass, Leaf, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface AboutPageProps {
  onRequestPreview: () => void;
  onNavigateHome: () => void;
}

const FALLBACK_PILLARS = [
  {
    id: 'p-1',
    title: 'Radical Transparency',
    desc: '100% RERA registered developments, unblemished title ownership trails, and zero hidden escalation clauses.'
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
  const { aboutPage, stats } = useContent();

  const heroTag = aboutPage?.heroTag || "OUR STORY & PHILOSOPHY · LIFE STARTS HERE";
  const heroTitle = aboutPage?.heroTitle || "Built on Values. Driven by Relationships.";
  const heroSubtitle = aboutPage?.heroSubtitle || "For over a decade, ARWIN RISE has guided luxury homebuyers and global NRI investors with uncompromising integrity and bespoke property advisory.";

  const philosophyTag = aboutPage?.philosophyTag || "OUR ADVISORY PHILOSOPHY";
  const philosophyHeadline = aboutPage?.philosophyHeadline || "“Real estate is not just about properties—it's about people, possibilities, and where your next chapter begins. Life Starts Here.”";
  const philosophyParagraphs = aboutPage?.philosophyParagraphs || [
    "When we established ARWIN RISE, our core commitment was simple: to create a trusted advisory standard that stands as an enduring pillar for homebuyers and wealth creators. Every transaction and portfolio we curate is guided by uncompromising due diligence and deep fiduciary commitment.",
    "With over ₹4,500 Cr+ in advised luxury portfolio, 12+ years of market mastery, and 350+ elite families guided across India and the UAE, ARWIN RISE delivers high appreciation assets and end-to-end peace of mind."
  ];
  const philosophyImage = aboutPage?.philosophyImage || "/images/by-invitation.jpg";

  const advisoryName = aboutPage?.advisoryName || "Arwin Advisory Desk";
  const advisoryDesk = aboutPage?.advisoryDesk || "PRIVATE CLIENT GROUP";
  const advisoryLocation = aboutPage?.advisoryLocation || "Neopolis, Hyderabad · International Wealth Desk";

  const pillarsTag = aboutPage?.pillarsTag || "OUR FOUNDATION";
  const pillarsTitle = aboutPage?.pillarsTitle || "Four Pillars of Advisory Excellence";
  const pillars = aboutPage?.pillars?.length ? aboutPage.pillars : FALLBACK_PILLARS;
  const currentStats = stats?.length ? stats : DEFAULT_STATS;

  const pillarIcons = [ShieldCheck, Compass, Leaf, Award];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Page Hero */}
      <PageHero
        tag={heroTag}
        title={heroTitle}
        subtitle={heroSubtitle}
        breadcrumbs={['About Us']}
        onNavigateHome={onNavigateHome}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 space-y-16 lg:space-y-20">
        
        {/* Milestone Stats Bar in Royal Burgundy */}
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

        {/* Corporate Advisory Heritage & Vision Spotlight */}
        <div className="bg-white border border-[#EAE3DA] p-8 sm:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Brand Architectural Cover */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative max-w-sm w-full overflow-hidden border-2 border-[#EAE3DA] shadow-xl group">
                <img
                  src={philosophyImage}
                  alt="Arwin Rise Private Living"
                  className="w-full aspect-[3/4] object-cover object-center filter brightness-[1.01] contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#7A1522]/35 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-3.5 left-3.5 bg-[#771722] text-[#C5A880] px-4 py-1.5 text-[11px] font-sans font-bold tracking-widest uppercase shadow-md">
                  PRIVATE PROPERTY ADVISORY
                </div>
              </div>
            </div>

            {/* Vision Message */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-sans font-bold tracking-[0.24em] text-[#C5A880] uppercase">
                {philosophyTag}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#222222] font-normal leading-snug">
                {philosophyHeadline}
              </h2>
              <div className="w-14 h-[2px] bg-[#C5A880]"></div>
              
              <div className="space-y-4 text-sm sm:text-[15px] text-[#55504A] font-sans leading-relaxed">
                {philosophyParagraphs.map((para, pIndex) => (
                  <p key={pIndex}>{para}</p>
                ))}
              </div>

              {/* Advisory Board Signoff */}
              <div className="pt-5 border-t border-[#EAE3DA] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="space-y-1">
                  <div className="font-serif text-2xl text-[#222222] font-medium">
                    {advisoryName}
                  </div>
                  <div className="text-xs font-sans font-bold text-[#771722] uppercase tracking-wider">
                    {advisoryDesk}
                  </div>
                  <div className="text-xs sm:text-[13px] font-sans text-[#55504A]">
                    {advisoryLocation}
                  </div>
                </div>

                <button
                  onClick={onRequestPreview}
                  className="inline-flex items-center gap-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-white px-6 py-3.5 text-xs font-sans font-bold tracking-widest uppercase transition-colors shadow-md self-start sm:self-auto cursor-pointer"
                >
                  <span>REQUEST ADVISORY</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="pt-16 sm:pt-24 border-t border-[#EAE3DA] space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <div className="text-xs font-sans font-bold tracking-[0.24em] text-[#C5A880] uppercase">
              {pillarsTag}
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#222222] font-normal">
              {pillarsTitle}
            </h3>
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
                  <p className="text-xs sm:text-[13.5px] text-[#55504A] font-sans leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
