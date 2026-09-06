import React, { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { TrendingUp, BarChart3, ShieldCheck, Download, ArrowRight, Building, Award, CheckCircle2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface InvestorsPageProps {
  onRequestPreview: () => void;
  onOpenRoiModal: () => void;
  onNavigateHome: () => void;
}

const FALLBACK_CORRIDORS = [
  {
    id: 'kokapet',
    name: 'Kokapet Golden Mile & Neopolis',
    subtitle: 'The epicenter of ultra-luxury high-rises and commercial expansion.',
    cagrRate: 0.188,
    rentalRate: 0.045,
    cagrLabel: '18.8% YoY',
    rentalYieldLabel: '4.5% - 5.2%',
    infraCatalyst: 'Upcoming 8-lane Trumpet Interchange, Metro Phase 2 Extension, 100M+ sq.ft Grade-A Commercial Parks',
    highlights: [
      'Highest land value appreciation in South India',
      'Zero traffic commute to IT campuses',
      'World-class 100-ft master-planned trunk infrastructure'
    ]
  },
  {
    id: 'financial-district',
    name: 'Financial District Core',
    subtitle: 'Hyderabad’s global financial hub with sustained high rental demand.',
    cagrRate: 0.165,
    rentalRate: 0.048,
    cagrLabel: '16.5% YoY',
    rentalYieldLabel: '4.8% - 5.5%',
    infraCatalyst: 'Direct ORR connectivity, Top Global MNC Hubs (Google, Apple, Microsoft, Amazon), Premium High-Rises',
    highlights: [
      '100% corporate occupancy rate',
      'Favored by CXOs, global founders, and high-net-worth individuals',
      'IGBC Platinum Pre-Certified sustainable high-rises'
    ]
  },
  {
    id: 'shankarpally',
    name: 'Shankarpally Eco Corridor',
    subtitle: 'Low-density gated villa communities nestled in nature.',
    cagrRate: 0.152,
    rentalRate: 0.038,
    cagrLabel: '15.2% YoY',
    rentalYieldLabel: '3.8% - 4.4%',
    infraCatalyst: 'Regional Ring Road (RRR) zone, low-density luxury villa estates, pristine nature sanctuaries',
    highlights: [
      'Proximity to Regional Ring Road (RRR)',
      'High capital upside for plotted & luxury villa developments',
      'Resort-style lifestyle with organic farm-to-table estates'
    ]
  }
];

const FALLBACK_PILLARS = [
  {
    id: 'pillar-1',
    title: '100% RERA & Clear Title',
    description: 'Zero encumbrance, audited ownership trail, and pre-approved home loan status with tier-1 banks.'
  },
  {
    id: 'pillar-2',
    title: 'Strategic Corridors',
    description: 'Properties located strictly within master-planned high-density commercial & IT catchment zones.'
  },
  {
    id: 'pillar-3',
    title: 'Asset Quality & Finishes',
    description: 'Engineered with Italian marble, German fixtures, seismic-resistant RC structures, and IGBC standards.'
  },
  {
    id: 'pillar-4',
    title: 'Concierge Exit Support',
    description: 'Dedicated asset management team facilitating leasing, tenant management, and secondary market liquidation.'
  }
];

export const InvestorsPage: React.FC<InvestorsPageProps> = ({
  onRequestPreview,
  onOpenRoiModal,
  onNavigateHome
}) => {
  const { investorsPage } = useContent();

  const heroTag = investorsPage?.heroTag || "INVESTOR ADVANTAGE";
  const heroTitle = investorsPage?.heroTitle || "Today's Investments. Tomorrow's Legacy.";
  const heroSubtitle = investorsPage?.heroSubtitle || "Data-driven real estate wealth creation across Hyderabad's highest-appreciating luxury corridors, backed by institutional governance and verified title diligence.";

  const simulatorTag = investorsPage?.simulatorTag || "PORTFOLIO SIMULATOR";
  const simulatorTitle = investorsPage?.simulatorTitle || "Corridor Capital Appreciation Estimator";
  const simulatorSubtitle = investorsPage?.simulatorSubtitle || "Dynamic projections based on 2018–2026 market benchmarks";

  const corridorsTag = investorsPage?.corridorsTag || "MICRO-MARKET INTELLIGENCE";
  const corridorsTitle = investorsPage?.corridorsTitle || "High-Growth Investment Corridors";
  const corridors = investorsPage?.corridors?.length ? investorsPage.corridors : FALLBACK_CORRIDORS;

  const pillarsTag = investorsPage?.pillarsTag || "THE ARWIN ADVANTAGE";
  const pillarsTitle = investorsPage?.pillarsTitle || "Why Institutional Investors Trust Us";
  const pillars = investorsPage?.pillars?.length ? investorsPage.pillars : FALLBACK_PILLARS;

  const [initialInvestment, setInitialInvestment] = useState<number>(25000000); // 2.5 Cr
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>(corridors[0]?.id || 'kokapet');
  const [horizonYears, setHorizonYears] = useState<number>(5);

  const currentCorridor = corridors.find(c => c.id === selectedCorridorId) || corridors[0] || FALLBACK_CORRIDORS[0];
  const projectedFutureVal = Math.round(initialInvestment * Math.pow(1 + (currentCorridor.cagrRate || 0.18), horizonYears));
  const estimatedGain = projectedFutureVal - initialInvestment;
  const annualRental = Math.round(initialInvestment * (currentCorridor.rentalRate || 0.045));

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Page Hero */}
      <PageHero
        tag={heroTag}
        title={heroTitle}
        subtitle={heroSubtitle}
        breadcrumbs={['Investors']}
        onNavigateHome={onNavigateHome}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 space-y-16 lg:space-y-20">
        
        {/* Interactive Capital Growth Simulator */}
        <div 
          className="bg-white border border-[#EAE3DA] shadow-md p-6 sm:p-10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#EAE3DA] gap-4">
            <div>
              <div className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#C5A880] uppercase mb-1">
                {simulatorTag}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#222222] font-normal">
                {simulatorTitle}
              </h2>
            </div>
            <div className="text-xs text-neutral-500 font-sans">
              {simulatorSubtitle}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls */}
            <div className="lg:col-span-5 space-y-6">
              
              <div>
                <label className="text-[10.5px] font-sans font-bold uppercase text-neutral-600 block mb-1.5">
                  1. Select Growth Corridor
                </label>
                <select
                  value={selectedCorridorId}
                  onChange={(e) => setSelectedCorridorId(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EAE3DA] text-xs font-sans text-[#222222] p-3 focus:outline-none focus:border-[#C5A880] cursor-pointer"
                >
                  {corridors.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({(c.cagrRate * 100).toFixed(1)}% CAGR)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10.5px] font-sans font-bold uppercase text-neutral-600">
                    2. Capital Allocation:
                  </label>
                  <span className="font-serif text-sm font-bold text-[#771722]">
                    ₹ {(initialInvestment / 10000000).toFixed(2)} Cr
                  </span>
                </div>
                <input
                  type="range"
                  min="10000000"
                  max="150000000"
                  step="5000000"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="w-full accent-[#771722] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-sans text-neutral-400 mt-1">
                  <span>₹ 1.0 Cr</span>
                  <span>₹ 7.5 Cr</span>
                  <span>₹ 15.0 Cr</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10.5px] font-sans font-bold uppercase text-neutral-600">
                    3. Investment Horizon:
                  </label>
                  <span className="font-serif text-sm font-bold text-[#771722]">
                    {horizonYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="10"
                  step="1"
                  value={horizonYears}
                  onChange={(e) => setHorizonYears(Number(e.target.value))}
                  className="w-full accent-[#771722] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-sans text-neutral-400 mt-1">
                  <span>3 Yrs</span>
                  <span>5 Yrs</span>
                  <span>10 Yrs</span>
                </div>
              </div>

              {currentCorridor.infraCatalyst && (
                <div className="p-3 bg-[#FAF7F2] border border-[#EAE3DA] text-[11px] font-sans text-neutral-600">
                  <strong className="text-[#771722] block mb-0.5">Corridor Infrastructure Catalyst:</strong>
                  {currentCorridor.infraCatalyst}
                </div>
              )}

            </div>

            {/* Right Projected Results */}
            <div className="lg:col-span-7 bg-[#240A12] text-white p-6 sm:p-8 space-y-6 border border-[#C5A880]/30 shadow-xl">
              
              <div className="border-b border-white/15 pb-4">
                <span className="text-[9.5px] font-sans font-bold uppercase tracking-widest text-[#C5A880] block mb-1">
                  PROJECTED PORTFOLIO OUTCOME ({horizonYears} YEARS)
                </span>
                <div className="font-serif text-3xl sm:text-4xl text-white font-bold tracking-tight">
                  ₹ {(projectedFutureVal / 10000000).toFixed(2)} Cr
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-3.5 bg-white/5 border border-white/10">
                  <span className="text-white/60 text-[10px] uppercase block mb-0.5">Est. Capital Gain</span>
                  <strong className="text-xl text-[#C5A880] font-serif font-bold">
                    +₹ {(estimatedGain / 10000000).toFixed(2)} Cr
                  </strong>
                </div>

                <div className="p-3.5 bg-white/5 border border-white/10">
                  <span className="text-white/60 text-[10px] uppercase block mb-0.5">Est. Annual Rental</span>
                  <strong className="text-xl text-white font-serif font-bold">
                    ₹ {(annualRental / 100000).toFixed(2)} L/yr
                  </strong>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onRequestPreview}
                  className="flex-1 bg-[#C5A880] hover:bg-[#D4B993] text-[#240A12] py-3 px-4 text-xs font-sans font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>REQUEST CONFIDENTIAL DOSSIER</span>
                  <ArrowRight className="w-4 h-4 text-[#240A12]" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Corridor Analysis Cards */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#C5A880] uppercase mb-1">
              {corridorsTag}
            </div>
            <h2 className="font-serif text-3xl text-[#222222] font-normal">
              {corridorsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corridors.map((c, idx) => (
              <div
                key={c.id || idx}
                className="bg-white border border-[#EAE3DA] hover:border-[#C5A880] p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-serif font-bold text-[#771722]">
                      {c.cagrLabel || `${(c.cagrRate * 100).toFixed(1)}% YoY`}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-sans uppercase">
                      Yield: {c.rentalYieldLabel || `${(c.rentalRate * 100).toFixed(1)}%`}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-normal text-[#222222] mb-2">{c.name}</h3>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed mb-4">{c.subtitle}</p>
                  
                  {c.highlights && c.highlights.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {c.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-[#555555] font-sans leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-4 border-t border-[#F0EBE1]">
                  <button
                    onClick={onRequestPreview}
                    className="inline-flex items-center gap-1.5 text-[10.5px] font-sans font-bold tracking-wider uppercase text-[#771722] hover:text-[#7A213D] cursor-pointer"
                  >
                    <span>EXPLORE OPPORTUNITIES</span>
                    <ArrowRight className="w-3 h-3 text-[#C5A880]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Invest with Arwin - 4 Pillars */}
        <div className="bg-white border border-[#EAE3DA] p-8 sm:p-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#C5A880] uppercase mb-1">
              {pillarsTag}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#222222] font-normal">
              {pillarsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, pIdx) => {
              const icons = [ShieldCheck, TrendingUp, Building, Award];
              const IconComp = icons[pIdx % icons.length];

              return (
                <div key={pillar.id || pIdx} className="p-4 bg-[#FAF7F2] border border-[#EAE3DA]">
                  <IconComp className="w-6 h-6 text-[#771722] mb-2" />
                  <h4 className="text-xs font-bold font-sans text-[#222222] uppercase mb-1">{pillar.title}</h4>
                  <p className="text-[11px] text-neutral-500 font-sans">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
