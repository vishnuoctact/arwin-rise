import React, { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { COLLECTIONS, FEATURED_PROJECTS } from '../data/properties';
import { CollectionTier, FeaturedProject } from '../types';
import { ArrowRight, ShieldCheck, MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResidencesPageProps {
  onSelectCollection: (c: CollectionTier) => void;
  onSelectProject: (p: FeaturedProject) => void;
  onRequestPreview: () => void;
  onNavigateHome: () => void;
}

export const ResidencesPage: React.FC<ResidencesPageProps> = ({
  onSelectCollection,
  onSelectProject,
  onRequestPreview,
  onNavigateHome
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'signature' | 'luxury' | 'private' | 'international'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Portfolios' },
    { id: 'signature', label: '01 Signature (₹1.5 – ₹3 Cr)' },
    { id: 'luxury', label: '02 Luxury (₹3 – ₹6 Cr)' },
    { id: 'private', label: '03 Private (₹6 – ₹35 Cr+)' },
    { id: 'international', label: 'International (Dubai Collection)' },
  ];

  const filteredProjects = FEATURED_PROJECTS.filter((proj) => {
    const matchesSearch = proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.units.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = selectedLocation === 'all' || proj.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Page Hero */}
      <PageHero
        tag="ARWIN RISE · RESIDENCES"
        title="Curated by Value & Exclusivity"
        subtitle="Exceptional residences. Carefully selected. Privately advised for discerning buyers and global NRI investors."
        breadcrumbs={['Residences']}
        onNavigateHome={onNavigateHome}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 space-y-16 lg:space-y-20">
        
        {/* Tier Overview Navigation Cards */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="w-5 h-[1.5px] bg-[#771722]"></span>
              <span className="text-[11px] font-sans font-bold tracking-[0.26em] text-[#771722] uppercase">
                EXPLORE BY VALUE
              </span>
              <span className="w-5 h-[1.5px] bg-[#771722]"></span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#222222] font-normal">
              Progressive Exclusivity Tiers
            </h2>
            <p className="text-xs text-neutral-600 font-sans">
              Discover where you fit without sounding like a standard listing portal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLLECTIONS.map((tier) => (
              <div
                key={tier.id}
                onClick={() => onSelectCollection(tier)}
                className="bg-white border border-[#EAE3DA] hover:border-[#C5A880] p-4 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <img 
                      src={tier.image} 
                      alt={tier.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[1.01]"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#771722] text-[#C5A880] px-2.5 py-0.5 text-[9.5px] font-sans font-bold tracking-wider shadow-md">
                      {tier.badgeNumber}
                    </div>
                  </div>

                  <div className="text-[9.5px] font-sans font-bold tracking-widest text-[#C5A880] uppercase pt-1">
                    {tier.priceRange}
                  </div>
                  <h3 className="font-serif text-lg text-[#222222] uppercase group-hover:text-[#771722] transition-colors leading-snug">
                    {tier.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-serif italic line-clamp-2">
                    “{tier.subtitle}”
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0EBE1] mt-4 flex items-center justify-between">
                  <span className="text-[10.5px] font-sans font-bold tracking-wider uppercase text-[#771722] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>DISCOVER</span>
                    <ArrowRight className="w-3 h-3 text-[#C5A880]" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Location Filter Bar */}
        <div className="bg-white border border-[#EAE3DA] p-4 sm:p-6 mb-12 shadow-xs">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by residence or corridor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3DA] text-xs font-sans text-[#222222] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            {/* Location Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-sans font-semibold text-neutral-500 mr-1">Corridor:</span>
              {['all', 'Neopolis', 'Financial District', 'Nanakramguda', 'Gachibowli', 'Future City', 'Kollur', 'Mokila', 'Kukatpally', 'Shankarpally', 'Miyapur', 'Rajendra Nagar'].map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={`px-3 py-1.5 text-xs font-sans transition-colors ${
                    selectedLocation === loc
                      ? 'bg-[#771722] text-[#C5A880] font-semibold'
                      : 'bg-[#FAF7F2] border border-[#EAE3DA] text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {loc === 'all' ? 'All Locations' : loc}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Featured Projects Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#EAE3DA] pb-4">
            <div>
              <h3 className="font-serif text-2xl text-[#222222]">Curated Private Allocations</h3>
              <p className="text-xs text-neutral-500 font-sans mt-0.5">Showing {filteredProjects.length} confidential residential opportunities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className="bg-white border border-[#EAE3DA] hover:border-[#C5A880] shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <img
                      src={proj.image}
                      alt={proj.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[1.01]"
                    />
                    <div className="absolute top-3 left-3 bg-[#771722] text-[#C5A880] px-3 py-1 text-[10px] font-sans font-bold tracking-widest uppercase">
                      {proj.tag}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white px-3 py-1 text-xs font-bold">
                      {proj.priceStarting}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-[#C5A880] font-sans">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{proj.location}</span>
                      </div>
                      <h4 className="font-serif text-xl sm:text-2xl text-[#222222] font-normal group-hover:text-[#771722] transition-colors">
                        {proj.name}
                      </h4>
                    </div>

                    <p className="text-xs text-neutral-600 font-sans line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F0EBE1] text-xs font-sans text-neutral-600">
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase block">Configurations</span>
                        <strong className="text-neutral-800">{proj.units}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase block">Carpet / Built-Up</span>
                        <strong className="text-[#771722] font-mono">{proj.carpetArea}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
                  <div className="pt-3 sm:pt-4 border-t border-[#F0EBE1] flex flex-wrap items-center justify-between gap-y-2 gap-x-3">
                    <span className="text-xs font-sans font-bold tracking-wider sm:tracking-widest uppercase text-[#771722] group-hover:text-[#8E1E2C] transition-colors inline-flex items-center gap-1.5">
                      <span>EXPLORE SPECS & PLANS</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-sans text-neutral-400">
                      <ShieldCheck className="w-3 h-3 text-[#C5A880]" />
                      <span>RERA: <strong className="font-mono text-neutral-600 font-normal">{proj.reraNumber}</strong></span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
