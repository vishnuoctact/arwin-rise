import React, { useState } from 'react';
import { X, TrendingUp, ShieldCheck, ArrowRight, Calculator, Building2, Globe2, Sparkles } from 'lucide-react';

interface InvestorRoiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestInvestorBrief: () => void;
}

export const CORRIDOR_DATA = {
  'neopolis': {
    name: 'Neopolis Luxury Pinnacle',
    type: 'Ultra-Luxury High-Rise & Sky Mansions',
    cagr: 0.205, // 20.5%
    rentalYield: 0.045, // 4.5%
    desc: 'Hyderabad’s highest-value commercial & residential pinnacle with rapid capital growth.'
  },
  'kokapet': {
    name: 'Kokapet Golden Mile',
    type: 'Prime High-Rise Condos & Penthouses',
    cagr: 0.188, // 18.8%
    rentalYield: 0.042, // 4.2%
    desc: 'Direct ORR connectivity, top global MNC hubs, and high rental absorption.'
  },
  'kukatpally': {
    name: 'Kukatpally Metro Corridor',
    type: 'G+46 Iconic Landmark Towers & Condos',
    cagr: 0.175, // 17.5%
    rentalYield: 0.044, // 4.4%
    desc: 'High-density urban appreciation anchored by metro connectivity and mature social infra.'
  },
  'future-city': {
    name: 'Future City / Airport Hub',
    type: 'Megacity & Next-Gen Plotted Estates',
    cagr: 0.185, // 18.5%
    rentalYield: 0.035, // 3.5%
    desc: 'High-upside greenfield growth anchored by government mega-infrastructure.'
  },
  'mokila': {
    name: 'Mokila Luxury Villa Belt',
    type: 'Gated Triplex & Palatial Villas',
    cagr: 0.172, // 17.2%
    rentalYield: 0.038, // 3.8%
    desc: 'Preferred residential enclave for CXOs, offering large land-share appreciation.'
  },
  'financial-district': {
    name: 'Financial District Hub',
    type: 'Core Tech & Commercial District',
    cagr: 0.165, // 16.5%
    rentalYield: 0.048, // 4.8%
    desc: 'Maximum rental yields driven by 500,000+ tech and finance executives.'
  },
  'gachibowli': {
    name: 'Gachibowli Core IT Belt',
    type: 'Executive Gated Communities & Suites',
    cagr: 0.162, // 16.2%
    rentalYield: 0.046, // 4.6%
    desc: 'Established tech corridor with rock-solid tenant demand and resilient capital growth.'
  },
  'kollur': {
    name: 'Kollur / Tellapur Growth Zone',
    type: 'Integrated Townships & High-Rises',
    cagr: 0.160, // 16.0%
    rentalYield: 0.040, // 4.0%
    desc: 'Booming micro-market with expansive infrastructure and school proximity.'
  },
  'nanakramguda': {
    name: 'Nanakramguda Tech Center',
    type: 'Executive High-Rise Residences',
    cagr: 0.158, // 15.8%
    rentalYield: 0.046, // 4.6%
    desc: 'Zero vacancy zone with prime executive rental demand and stable appreciation.'
  },
  'shankarpally': {
    name: 'Shankarpally Eco Corridor',
    type: 'Palatial Mansions & Triplex Boutique Villas',
    cagr: 0.155, // 15.5%
    rentalYield: 0.036, // 3.6%
    desc: 'High land appreciation driven by regional masterplan expansions and greenfield estates.'
  },
  'rajendra-nagar': {
    name: 'Rajendra Nagar & Budvel Hub',
    type: 'Airport Expressway & Upcoming IT Hub',
    cagr: 0.170, // 17.0%
    rentalYield: 0.041, // 4.1%
    desc: 'Emerging luxury corridor adjacent to Budvel IT cluster and airport expressway.'
  },
  'miyapur': {
    name: 'Miyapur Metro Enclave',
    type: 'Transit-Connected High-Rise Condos',
    cagr: 0.150, // 15.0%
    rentalYield: 0.042, // 4.2%
    desc: 'Rapid rental turnaround and sustained capital upside along the red line metro corridor.'
  },
  'bangalore-highway': {
    name: 'Bangalore Highway Plotted Belt',
    type: 'High-Appreciation Plotted Estates',
    cagr: 0.168, // 16.8%
    rentalYield: 0.032, // 3.2%
    desc: 'Strategic commercial logistics and plotted growth with high land multiplier potential.'
  },
  'dubai': {
    name: 'Dubai Prime (Downtown & Palm)',
    type: 'Tax-Free International Luxury Assets',
    cagr: 0.145, // 14.5%
    rentalYield: 0.082, // 8.2%
    desc: 'Tax-free USD-pegged returns with world-leading net rental yields & Golden Visa eligibility.'
  }
};

type CorridorKey = keyof typeof CORRIDOR_DATA;

export const InvestorRoiModal: React.FC<InvestorRoiModalProps> = ({
  isOpen,
  onClose,
  onRequestInvestorBrief
}) => {
  const [initialInvestment, setInitialInvestment] = useState<number>(25000000); // 2.5 Cr
  const [corridor, setCorridor] = useState<CorridorKey>('neopolis');
  const [holdingYears, setHoldingYears] = useState<number>(5);

  if (!isOpen) return null;

  const currentCorridor = CORRIDOR_DATA[corridor];
  const cagr = currentCorridor.cagr;
  const rentalYieldRate = currentCorridor.rentalYield;

  const projectedFutureValue = Math.round(initialInvestment * Math.pow(1 + cagr, holdingYears));
  const estimatedCapitalGain = projectedFutureValue - initialInvestment;
  const annualRentalYield = Math.round(initialInvestment * rentalYieldRate);
  const totalCumulativeRental = annualRentalYield * holdingYears;
  const totalEstimatedReturns = estimatedCapitalGain + totalCumulativeRental;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#FAF7F2] border-2 border-[#C5A880]/60 shadow-2xl rounded-none overflow-hidden my-auto sm:my-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#C5A880] via-[#771722] to-[#C5A880]"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Investor Modal"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 text-neutral-500 hover:text-[#771722] hover:bg-[#EAE3DA]/50 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-4 sm:p-8 lg:p-10 space-y-4 sm:space-y-6 lg:space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-1.5 sm:space-y-2 pr-6 sm:pr-0">
            <h3 className="font-serif text-xl sm:text-3xl lg:text-4xl text-[#222222] font-normal tracking-tight">
              Corridor Appreciation & ROI Simulator
            </h3>
            <p className="text-[11.5px] sm:text-[13px] text-[#55504A] font-sans max-w-xl mx-auto leading-relaxed">
              Model real-time capital appreciation, rental yield cashflows, and total portfolio expansion across Hyderabad’s highest-growth corridors and international prime assets.
            </p>
          </div>

          {/* Interactive Calculator Controls (3 Controls Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            
            {/* Control 1: Corridor with Expanded Areas */}
            <div className="p-3 sm:p-4 bg-white border border-[#EAE3DA] space-y-1.5 shadow-2xs">
              <label className="text-[10.5px] font-sans font-bold uppercase text-[#771722] flex items-center justify-between">
                <span>1. Growth Corridor</span>
                <span className="text-[#C5A880] font-semibold">{(cagr * 100).toFixed(1)}% CAGR</span>
              </label>
              <select
                value={corridor}
                onChange={(e) => setCorridor(e.target.value as CorridorKey)}
                className="w-full p-2 sm:p-2.5 bg-[#FAF7F2] border border-[#EAE3DA] text-xs text-[#222222] font-semibold focus:outline-none focus:border-[#C5A880] cursor-pointer"
              >
                <option value="neopolis">Neopolis Luxury Pinnacle (20.5% CAGR · 4.5% Yield)</option>
                <option value="kokapet">Kokapet Golden Mile (18.8% CAGR · 4.2% Yield)</option>
                <option value="future-city">Future City Mega Corridor (18.5% CAGR · 3.5% Yield)</option>
                <option value="kukatpally">Kukatpally Metro Towers (17.5% CAGR · 4.4% Yield)</option>
                <option value="mokila">Mokila Luxury Villa Belt (17.2% CAGR · 3.8% Yield)</option>
                <option value="rajendra-nagar">Rajendra Nagar & Budvel Hub (17.0% CAGR · 4.1% Yield)</option>
                <option value="bangalore-highway">Bangalore Highway Plotted Belt (16.8% CAGR · 3.2% Yield)</option>
                <option value="financial-district">Financial District Hub (16.5% CAGR · 4.8% Yield)</option>
                <option value="gachibowli">Gachibowli Core IT Belt (16.2% CAGR · 4.6% Yield)</option>
                <option value="kollur">Kollur & Tellapur Growth Zone (16.0% CAGR · 4.0% Yield)</option>
                <option value="nanakramguda">Nanakramguda Tech Center (15.8% CAGR · 4.6% Yield)</option>
                <option value="shankarpally">Shankarpally Eco Corridor (15.5% CAGR · 3.6% Yield)</option>
                <option value="miyapur">Miyapur Metro Enclave (15.0% CAGR · 4.2% Yield)</option>
                <option value="dubai">Dubai Waterfront & Prime (14.5% CAGR · 8.2% Yield)</option>
              </select>
              <div className="text-[10px] text-[#777068] font-sans pt-0.5 line-clamp-1">
                {currentCorridor.type}
              </div>
            </div>

            {/* Control 2: Initial Investment Base */}
            <div className="p-3 sm:p-4 bg-white border border-[#EAE3DA] space-y-1.5 shadow-2xs">
              <label className="text-[10.5px] font-sans font-bold uppercase text-[#771722] block">
                2. Investment Capital
              </label>
              <select
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="w-full p-2 sm:p-2.5 bg-[#FAF7F2] border border-[#EAE3DA] text-xs text-[#222222] font-semibold focus:outline-none focus:border-[#C5A880] cursor-pointer"
              >
                <option value={15000000}>₹ 1.50 Crore (Signature Entry)</option>
                <option value={25000000}>₹ 2.50 Crore (Luxury Residence)</option>
                <option value={35000000}>₹ 3.50 Crore (Triplex Villa)</option>
                <option value={50000000}>₹ 5.00 Crore (Sky Mansion)</option>
                <option value={75000000}>₹ 7.50 Crore (Private Estate)</option>
                <option value={100000000}>₹ 10.00 Crore (HNWI Portfolio)</option>
                <option value={150000000}>₹ 15.00 Crore (Ultra-Luxury Asset)</option>
                <option value={250000000}>₹ 25.00 Crore+ (Institutional Allocation)</option>
              </select>
              <div className="text-[10px] text-[#777068] font-sans pt-0.5">
                Eligible for Grade-A RERA Verified Portfolios
              </div>
            </div>

            {/* Control 3: Time Horizon Slider */}
            <div className="p-3 sm:p-4 bg-white border border-[#EAE3DA] space-y-1.5 shadow-2xs flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <label className="text-[10.5px] font-sans font-bold uppercase text-[#771722]">
                  3. Holding Horizon
                </label>
                <span className="text-xs font-serif font-bold text-[#771722] bg-[#FAF7F2] px-2 py-0.5 border border-[#EAE3DA]">
                  {holdingYears} Years
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={10}
                step={1}
                value={holdingYears}
                onChange={(e) => setHoldingYears(Number(e.target.value))}
                className="w-full accent-[#771722] cursor-pointer my-1.5"
              />
              <div className="flex justify-between text-[9.5px] font-sans text-neutral-400">
                <span>3 Yrs</span>
                <span>5 Yrs</span>
                <span>7 Yrs</span>
                <span>10 Yrs</span>
              </div>
            </div>

          </div>

          {/* Results Display Panel: Royal Burgundy & Champagne Gold */}
          <div className="p-4 sm:p-8 bg-[#380E1C] text-white border border-[#C5A880]/40 shadow-xl space-y-3.5 sm:space-y-4">
            
            {/* Responsive Metrics Grid: 2-Col on mobile with top highlight, 3-Col on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-6 text-center">
              
              {/* Projected Asset Value (Full width on mobile, 1-col on desktop) */}
              <div className="col-span-2 sm:col-span-1 pb-3.5 sm:pb-0 border-b sm:border-b-0 sm:border-r border-[#C5A880]/20 sm:pr-4">
                <div className="text-[9.5px] sm:text-[10px] font-sans tracking-widest uppercase text-[#C5A880]">
                  Projected Asset Value
                </div>
                <div className="font-serif text-3xl sm:text-3xl lg:text-4xl font-normal text-white mt-1" style={{ fontVariantNumeric: 'lining-nums' }}>
                  ₹ {(projectedFutureValue / 10000000).toFixed(2)} Cr
                </div>
                <div className="text-[10px] sm:text-[10.5px] text-[#D5CDC5] mt-0.5 font-sans">
                  After {holdingYears} yrs at {(cagr * 100).toFixed(1)}% CAGR
                </div>
              </div>

              {/* Estimated Capital Gain */}
              <div className="sm:border-r border-[#C5A880]/20 sm:pr-4">
                <div className="text-[9px] sm:text-[10px] font-sans tracking-widest uppercase text-[#C5A880]">
                  Estimated Capital Gain
                </div>
                <div className="font-serif text-xl sm:text-3xl lg:text-4xl font-normal text-[#E5CCA8] mt-1" style={{ fontVariantNumeric: 'lining-nums' }}>
                  + ₹ {(estimatedCapitalGain / 10000000).toFixed(2)} Cr
                </div>
                <div className="text-[9.5px] sm:text-[10.5px] text-[#D5CDC5] mt-0.5 font-sans">
                  Net Asset Appreciation
                </div>
              </div>

              {/* Annual Rental Cashflow */}
              <div>
                <div className="text-[9px] sm:text-[10px] font-sans tracking-widest uppercase text-[#C5A880]">
                  Annual Rental Yield ({(rentalYieldRate * 100).toFixed(1)}%)
                </div>
                <div className="font-serif text-xl sm:text-3xl lg:text-4xl font-normal text-white mt-1" style={{ fontVariantNumeric: 'lining-nums' }}>
                  ₹ {(annualRentalYield / 100000).toFixed(1)} L
                </div>
                <div className="text-[9.5px] sm:text-[10.5px] text-[#D5CDC5] mt-0.5 font-sans">
                  Estimated Cashflow / Yr
                </div>
              </div>

            </div>

            {/* Corridor Narrative Insight */}
            <div className="pt-3 sm:pt-4 border-t border-[#C5A880]/20 text-center text-[11px] sm:text-xs text-[#D5CDC5] font-sans leading-relaxed">
              <span className="text-[#C5A880] font-semibold">{currentCorridor.name}:</span> {currentCorridor.desc}
            </div>
          </div>

          {/* Action & Trust Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-1">
            <div className="flex items-center gap-2 text-[10.5px] sm:text-xs text-[#55504A] font-sans text-center sm:text-left">
              <ShieldCheck className="w-4 h-4 text-[#771722] flex-shrink-0" />
              <span>Backed by 15+ years of verified Telangana RERA & market data</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onRequestInvestorBrief();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-white px-6 sm:px-7 py-3 sm:py-3.5 text-xs font-sans font-bold tracking-widest uppercase shadow-md transition-all cursor-pointer group"
            >
              <span>REQUEST INVESTOR ALLOCATION DECK</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
