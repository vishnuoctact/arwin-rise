import React from 'react';
import { useContent } from '../context/ContentContext';
import { COLLECTIONS as DEFAULT_COLLECTIONS } from '../data/properties';
import { CollectionTier } from '../types';
import { ArrowRight, Globe, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface CollectionSectionProps {
  onSelectCollection: (collection: CollectionTier) => void;
  onExploreAll: () => void;
  onOpenRoiModal?: () => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  onSelectCollection,
  onExploreAll,
  onOpenRoiModal
}) => {
  const { collectionTiers } = useContent();
  const tiers = collectionTiers && collectionTiers.length > 0 ? collectionTiers : DEFAULT_COLLECTIONS;
  const domesticCollections = tiers.filter(c => c.id !== 'dubai-private-collection');
  const dubaiCollection = tiers.find(c => c.id === 'dubai-private-collection');

  return (
    <section id="collections" className="pt-12 sm:pt-14 lg:pt-16 pb-20 sm:pb-24 lg:pb-28 bg-[#FAF7F2] border-b border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: EXPLORE BY VALUE */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-3 justify-center">
            <span className="w-6 h-[1.5px] bg-[#771722]"></span>
            <span className="text-[11px] font-sans font-bold tracking-[0.26em] text-[#771722] uppercase">
              EXPLORE BY VALUE
            </span>
            <span className="w-6 h-[1.5px] bg-[#771722]"></span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#222222] font-normal tracking-normal leading-tight">
            Curated Residential Collections
          </h2>

          <p className="text-xs sm:text-[13px] text-[#7A7369] font-sans max-w-md mx-auto leading-relaxed pt-1">
            Carefully structured by value and exclusivity — helping discerning buyers immediately identify their ideal residential caliber.
          </p>
        </div>

        {/* 3 Core Value Tiers (Signature -> Luxury -> Private) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {domesticCollections.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 80px 0px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
              onClick={() => onSelectCollection(tier)}
              className="bg-white border border-[#EAE3DA] hover:border-[#C5A880] transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between group cursor-pointer overflow-hidden p-5 sm:p-6"
            >
              <div>
                {/* 1. Classic Framed Photographic Canvas */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 mb-5">
                  <img
                    src={tier.image}
                    alt={tier.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[1.01] contrast-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none"></div>

                  {/* Classic Tier Tag */}
                  <div className="absolute top-3 left-3 bg-[#771722] text-[#C5A880] px-2.5 py-1 text-[9.5px] font-sans font-bold tracking-[0.2em] uppercase shadow-sm">
                    {tier.badgeNumber}
                  </div>

                  {/* Discreet RERA Badge */}
                  <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-xs text-white/80 px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase border border-white/10">
                    TS RERA
                  </div>
                </div>

                {/* 2. Pure Classical Editorial Body */}
                <div className="space-y-4 text-center">
                  
                  {/* Category Identifier & Main Architectural Title */}
                  <div className="space-y-1">
                    <div className="text-[9.5px] font-sans font-bold tracking-[0.26em] text-[#C5A880] uppercase">
                      {tier.badgeNumber} · {idx === 0 ? 'SIGNATURE' : idx === 1 ? 'LUXURY' : 'PRIVATE'}
                    </div>
                    <h3 className="font-serif text-[21px] sm:text-[23px] text-[#222222] font-normal leading-tight group-hover:text-[#771722] transition-colors uppercase tracking-wide">
                      {tier.title}
                    </h3>
                  </div>

                  {/* Classical Architectural Spec Matrix */}
                  <div className="border-y border-[#EAE3DA] py-3 my-2.5 space-y-2.5">
                    
                    {/* Top Row: Typology & Carpet Area */}
                    <div className="grid grid-cols-2 divide-x divide-[#EAE3DA] text-center">
                      <div className="px-2">
                        <span className="block text-[8.5px] font-sans font-bold uppercase tracking-[0.2em] text-[#999285] mb-0.5">
                          TYPOLOGY
                        </span>
                        <span className="font-sans font-semibold text-xs text-[#222222] leading-tight block">
                          {tier.specs.typology}
                        </span>
                      </div>
                      <div className="px-2">
                        <span className="block text-[8.5px] font-sans font-bold uppercase tracking-[0.2em] text-[#999285] mb-0.5">
                          UNIT SIZE
                        </span>
                        <span className="font-mono font-medium text-xs text-[#666058] leading-tight block">
                          {tier.specs.size}
                        </span>
                      </div>
                    </div>

                    {/* Micro-Market Corridors as Elegant Tags */}
                    <div className="pt-2 border-t border-[#F0EBE1]">
                      <div className="flex flex-wrap items-center justify-center gap-1.5">
                        {tier.specs.locations.map((loc) => (
                          <span
                            key={loc}
                            className="px-2 py-0.5 bg-[#FAF7F2] border border-[#E8E1D7] text-[10px] font-sans font-medium text-[#55504A]"
                          >
                            {loc}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Timeless Price Line with Clean Modern Numerals */}
                  <div className="pt-2">
                    <div className="text-[9px] font-sans font-bold uppercase tracking-[0.22em] text-[#999285]">
                      VALUE SPECTRUM
                    </div>
                    <div className="font-sans font-bold text-xl sm:text-[22px] text-[#771722] mt-0.5 tracking-tight" style={{ fontVariantNumeric: 'lining-nums' }}>
                      {tier.priceRange}
                    </div>
                  </div>

                </div>
              </div>

              {/* 3. Highlighted Brand Color CTA Button with Radiant Gold Text */}
              <div className="pt-5 mt-1">
                <button
                  className="w-full bg-[#771722] group-hover:bg-[#8E1E2C] text-white py-3 px-3 sm:px-4 text-[10.5px] sm:text-[11px] font-sans font-bold tracking-[0.16em] sm:tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 border border-[#C5A880]/30 shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <span className="whitespace-nowrap">DISCOVER RESIDENCES</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:translate-x-1.5 transition-all duration-300 shrink-0" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4. International Feature: DUBAI PRIVATE COLLECTION */}
        {dubaiCollection && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 80px 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            onClick={() => onSelectCollection(dubaiCollection)}
            className="mt-12 bg-white border border-[#EAE3DA] hover:border-[#C5A880] p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Photo */}
              <div className="lg:col-span-5 relative aspect-[16/10] overflow-hidden bg-neutral-900 shadow-xs">
                <img
                  src={dubaiCollection.image}
                  alt={dubaiCollection.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[1.01]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none"></div>

                {/* Classic Tier Tag */}
                <div className="absolute top-3 left-3 bg-[#771722] text-[#C5A880] px-2.5 py-1 text-[9.5px] font-sans font-bold tracking-[0.2em] uppercase shadow-sm">
                  04 · INTERNATIONAL
                </div>

                {/* International Advisory Badge */}
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-xs text-white/80 px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase border border-white/10">
                  DLD APPROVED
                </div>
              </div>

              {/* Right Details */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Category Identifier */}
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-sans font-semibold tracking-[0.24em] text-[#C5A880] uppercase flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>GLOBAL ASSET ALLOCATION · DUBAI</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 text-[11px] font-sans text-[#7A7369]">
                    <span className="flex items-center gap-1 font-medium text-[#771722]">
                      <Sparkles className="w-3 h-3 text-[#C5A880]" />
                      <span>8–10% Tax-Free Yield</span>
                    </span>
                    <span>•</span>
                    <span>10-Yr Golden Visa</span>
                  </div>
                </div>

                {/* Main Title & Tagline */}
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#222222] font-normal group-hover:text-[#771722] transition-colors uppercase tracking-wide">
                    {dubaiCollection.title}
                  </h3>
                  <p className="font-serif italic text-sm text-[#55504A]">
                    “{dubaiCollection.subtitle}”
                  </p>
                </div>

                {/* Typology & Locations */}
                <div className="text-xs text-[#55504A] font-sans space-y-0.5 pt-1">
                  <div className="font-semibold text-[#222222]">
                    Waterfront Penthouses & Sky Villas
                  </div>
                  <div className="text-[11px] text-[#7A7369] font-mono">
                    1,800 – 8,500 sft • Downtown Dubai, Palm Jumeirah & Marina
                  </div>
                </div>

                {/* Value Spectrum Line with INR Main & AED Sub */}
                <div className="pt-3 border-t border-[#F0EBE1] flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <div className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#999285]">
                      VALUE SPECTRUM
                    </div>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-sans font-bold text-lg sm:text-[20px] text-[#771722] tracking-wide" style={{ fontVariantNumeric: 'lining-nums' }}>
                        ₹ 4.5 Cr — ₹ 55 Cr+
                      </span>
                      <span className="text-xs font-sans font-medium text-[#777066]" style={{ fontVariantNumeric: 'lining-nums' }}>
                        (AED 2M — 25M+)
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] font-sans text-neutral-400 italic hidden md:block">
                    NRI repatriation & consular advisory included
                  </div>
                </div>

                {/* Action CTA Button styled in Rich Gold (Hover Tone) with Subtle Shine Animation */}
                <div className="pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCollection(dubaiCollection);
                    }}
                    className="relative overflow-hidden w-full bg-gradient-to-r from-[#B8986D] via-[#CBAE88] to-[#B8986D] hover:from-[#A8885D] hover:to-[#BBA078] text-[#2D050B] py-3 sm:py-3.5 px-3 sm:px-5 text-[10px] min-[380px]:text-[10.5px] sm:text-xs font-sans font-bold tracking-[0.12em] min-[380px]:tracking-[0.16em] sm:tracking-[0.22em] uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-sm border border-[#B8986D] cursor-pointer group/btn whitespace-nowrap"
                  >
                    {/* Subtle, Gentle Radiant Shine Sweep */}
                    <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-shimmer" />
                    
                    <span className="relative z-10 font-bold whitespace-nowrap">EXPLORE DUBAI COLLECTION</span>
                    <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#2D050B] group-hover/btn:translate-x-1.5 transition-transform duration-300 relative z-10 shrink-0" />
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* Dual Actions: ROI Calculator & Complete Residences Directory */}
        <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          
          {/* Action 1: Corridor ROI Calculator */}
          {onOpenRoiModal && (
            <button
              onClick={onOpenRoiModal}
              className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-[0.18em] uppercase text-[#771722] hover:text-[#8E1E2C] border-b border-[#771722]/30 hover:border-[#771722] pb-1 transition-all cursor-pointer group"
            >
              <span>CORRIDOR ROI CALCULATOR</span>
              <TrendingUp className="w-3.5 h-3.5 text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}

          {/* Subtle Hairline Divider (Desktop) */}
          {onOpenRoiModal && (
            <span className="hidden sm:inline-block w-px h-4 bg-[#D9D0C5]" />
          )}

          {/* Action 2: View Complete Residences Directory */}
          <button
            onClick={onExploreAll}
            className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-[0.18em] uppercase text-[#771722] hover:text-[#8E1E2C] border-b border-[#771722]/30 hover:border-[#771722] pb-1 transition-all cursor-pointer group"
          >
            <span>VIEW COMPLETE RESIDENCES DIRECTORY</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
          </button>

        </div>

      </div>
    </section>
  );
};

