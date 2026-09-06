import React, { useState } from 'react';
import { X, Globe, ShieldCheck, ArrowRight, DollarSign, Calculator, CheckCircle2 } from 'lucide-react';
import { ArwinLogo } from '../ArwinLogo';

interface NriConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookPass: () => void;
}

export const NriConsultModal: React.FC<NriConsultModalProps> = ({ isOpen, onClose, onBookPass }) => {
  const [currency, setCurrency] = useState<'USD' | 'AED' | 'GBP' | 'SGD'>('USD');
  const [amountInr, setAmountInr] = useState<number>(25000000); // 2.5 Cr

  if (!isOpen) return null;

  const rates: Record<string, { rate: number; symbol: string }> = {
    USD: { rate: 86.8, symbol: '$' },
    AED: { rate: 23.6, symbol: 'AED ' },
    GBP: { rate: 109.5, symbol: '£' },
    SGD: { rate: 64.2, symbol: 'S$' }
  };

  const convertedValue = Math.round(amountInr / rates[currency].rate);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#C5A880]/50 shadow-2xl rounded-none overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#C5A880] via-[#7A1522] to-[#C5A880] flex-shrink-0"></div>

        {/* High-Visibility Sticky Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-white/95 text-[#771722] hover:bg-[#771722] hover:text-white border border-[#EAE3DA] shadow-md flex items-center justify-center transition-all z-30 active:scale-95"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center mb-2">
              <Globe className="w-6 h-6 text-[#C5A880]" />
            </div>
            <div className="text-[10px] font-sans font-semibold tracking-[0.24em] text-[#C5A880] uppercase">
              GLOBAL NRI WEALTH DESK
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#222222] font-normal mt-1">
              End-to-End International Advisory
            </h2>
            <p className="text-xs text-neutral-600 font-sans mt-1 max-w-md mx-auto">
              FEMA Compliance, NRE/NRO Account Setup, Virtual Video Inspections & Power of Attorney (PoA) Management.
            </p>
          </div>

          {/* Quick Currency Converter */}
          <div className="bg-white border border-[#EAE3DA] p-5 mb-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#771722] uppercase">
                <Calculator className="w-4 h-4 text-[#C5A880]" />
                <span>Live Currency Estimator</span>
              </div>
              <div className="flex gap-1">
                {(['USD', 'AED', 'GBP', 'SGD'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-2.5 py-1 text-[11px] font-mono font-semibold transition-colors ${
                      currency === curr 
                        ? 'bg-[#771722] text-[#C5A880]' 
                        : 'bg-[#FAF7F2] text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-[10px] font-sans uppercase text-neutral-500 mb-1">
                  Target Property Value (INR)
                </label>
                <select
                  value={amountInr}
                  onChange={(e) => setAmountInr(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3DA] text-xs font-sans text-[#222222] focus:outline-none focus:border-[#C5A880]"
                >
                  <option value={19800000}>₹ 1.98 Cr (The Skyline Towers / Courtyard Residences)</option>
                  <option value={25000000}>₹ 2.50 Cr (The Courtyard 3 BHK Grande)</option>
                  <option value={32000000}>₹ 3.20 Cr (The Westside 5 BHK Triplex Villa)</option>
                  <option value={39800000}>₹ 3.98 Cr (The Skyline 4 BHK Luxury Suite)</option>
                  <option value={65000000}>₹ 6.50 Cr (The Sovereign 900 Sq. Yd. Palatial Mansion)</option>
                </select>
              </div>

              <div className="p-3 bg-[#FAF7F2] border border-[#EAE3DA] text-right">
                <div className="text-[10px] font-sans uppercase text-neutral-500">Approx. Foreign Capital</div>
                <div className="font-serif text-2xl font-bold text-[#771722] mt-0.5">
                  {rates[currency].symbol}{convertedValue.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* 4 NRI Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="p-3.5 bg-white border border-[#EAE3DA] space-y-1">
              <div className="text-xs font-bold text-[#771722]">1. FEMA & RBI Legal Desk</div>
              <p className="text-[11px] text-neutral-600">Full repatriation guidance and seamless NRE/NRO inward wire coordination.</p>
            </div>

            <div className="p-3.5 bg-white border border-[#EAE3DA] space-y-1">
              <div className="text-xs font-bold text-[#771722]">2. Remote PoA Execution</div>
              <p className="text-[11px] text-neutral-600">Embassy attestation and consular Power of Attorney processing without travel.</p>
            </div>

            <div className="p-3.5 bg-white border border-[#EAE3DA] space-y-1">
              <div className="text-xs font-bold text-[#771722]">3. 4K Drone & Video Tours</div>
              <p className="text-[11px] text-neutral-600">Live 1-on-1 virtual walkthroughs with project engineering directors.</p>
            </div>

            <div className="p-3.5 bg-white border border-[#EAE3DA] space-y-1">
              <div className="text-xs font-bold text-[#771722]">4. Asset Handover & Leasing</div>
              <p className="text-[11px] text-neutral-600">Complete property management, key handover, and MNC tenant leasing services.</p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="space-y-3">
            <button
              onClick={() => {
                onClose();
                onBookPass();
              }}
              className="w-full bg-[#771722] hover:bg-[#8E1E2C] text-white py-3.5 px-6 text-xs font-sans font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span>CONNECT WITH GLOBAL NRI DESK</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880]" />
            </button>

            <div className="flex items-center justify-between text-xs text-neutral-500 px-1 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Confidential Global Advisory</span>
              </span>
              <span>
                <a 
                  href="https://wa.me/918464954321?text=Hello%20Arwin%20Rise%20NRI%20Desk,%20I%20am%20interested%20in%20NRI%20investment%20advisory." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-bold text-[#771722] hover:underline"
                >
                  WhatsApp NRI Desk →
                </a>
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
