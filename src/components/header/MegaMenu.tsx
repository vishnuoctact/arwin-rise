import React from 'react';
import { 
  Building2, 
  Home, 
  Layers, 
  Landmark, 
  Compass, 
  FileText, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  Calculator, 
  Key, 
  Briefcase 
} from 'lucide-react';

interface MegaMenuProps {
  activeMenu: string | null;
  onClose: () => void;
  onNavigate: (category: string, filter?: string) => void;
  onOpenValuation: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  activeMenu,
  onClose,
  onNavigate,
  onOpenValuation
}) => {
  if (!activeMenu) return null;

  return (
    <div 
      onMouseLeave={onClose}
      className="absolute top-full left-0 right-0 bg-arwin-navy-deep/98 backdrop-blur-2xl border-b border-arwin-gold/25 text-white shadow-2xl py-8 px-6 transition-all duration-300 animate-in fade-in slide-in-from-top-3 z-40"
    >
      <div className="max-w-7xl mx-auto">
        {/* BUY MEGA MENU */}
        {activeMenu === 'buy' && (
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-arwin-gold mb-4 flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> Properties by Type
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button 
                    onClick={() => { onNavigate('type', 'Sky Villa'); onClose(); }}
                    className="text-gray-300 hover:text-arwin-gold transition-colors flex items-center justify-between w-full text-left"
                  >
                    <span>Sky Mansions & Duplexes</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { onNavigate('type', 'Gated Villa'); onClose(); }}
                    className="text-gray-300 hover:text-arwin-gold transition-colors flex items-center justify-between w-full text-left"
                  >
                    <span>Gated Luxury Villas</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { onNavigate('type', 'Signature Penthouse'); onClose(); }}
                    className="text-gray-300 hover:text-arwin-gold transition-colors flex items-center justify-between w-full text-left"
                  >
                    <span>Signature Penthouses</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { onNavigate('type', 'Lakefront Estate'); onClose(); }}
                    className="text-gray-300 hover:text-arwin-gold transition-colors flex items-center justify-between w-full text-left"
                  >
                    <span>Lakefront Estates (Gandipet/Kokapet)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { onNavigate('type', 'Commercial Office'); onClose(); }}
                    className="text-gray-300 hover:text-arwin-gold transition-colors flex items-center justify-between w-full text-left"
                  >
                    <span>Commercial Grade-A Tech Suites</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-arwin-gold mb-4 flex items-center gap-1.5">
                <Compass className="w-4 h-4" /> Prime Micro-Markets
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button 
                    onClick={() => { onNavigate('location', 'Neopolis'); onClose(); }}
                    className="text-gray-300 hover:text-arwin-gold transition-colors flex items-center justify-between w-full text-left"
                  >
                    <span>Neopolis (65+ Storey Skyscrapers)</span>
                    <span className="text-[10px] text-emerald-400 font-mono">+21.5% YoY</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { onNavigate('location', 'Kokapet'); onClose(); }}
                    className="text-gray-300 hover:text-arwin-gold transition-colors flex items-center justify-between w-full text-left"
                  >
                    <span>Kokapet Golden Mile</span>
                    <span className="text-[10px] text-emerald-400 font-mono">+18.8% YoY</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { onNavigate('location', 'Jubilee Hills'); onClose(); }}
                    className="text-gray-300 hover:text-arwin-gold transition-colors flex items-center justify-between w-full text-left"
                  >
                    <span>Jubilee Hills & Banjara Hills</span>
                    <span className="text-[10px] text-gray-400">Legacy</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { onNavigate('location', 'Financial District'); onClose(); }}
                    className="text-gray-300 hover:text-arwin-gold transition-colors flex items-center justify-between w-full text-left"
                  >
                    <span>Financial District & Nanakramguda</span>
                    <span className="text-[10px] text-emerald-400 font-mono">6.4% Yield</span>
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-arwin-gold mb-4 flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Buyer Advisory
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="#mortgage-calculator" onClick={onClose} className="text-gray-300 hover:text-arwin-gold transition-colors block">
                    Telangana Home Loan & EMI Calculator
                  </a>
                </li>
                <li>
                  <a href="#nri-desk" onClick={onClose} className="text-gray-300 hover:text-arwin-gold transition-colors block">
                    Global NRI Investment & FEMA Desk
                  </a>
                </li>
                <li>
                  <a href="#market-sentiment" onClick={onClose} className="text-gray-300 hover:text-arwin-gold transition-colors block">
                    Hyderabad Real Estate Sentiment 2026
                  </a>
                </li>
                <li>
                  <button onClick={() => { onOpenValuation(); onClose(); }} className="text-gray-300 hover:text-arwin-gold transition-colors text-left">
                    Property Snagging & Valuation Request
                  </button>
                </li>
              </ul>
            </div>

            {/* Featured Card */}
            <div className="bg-gradient-to-br from-arwin-navy-card to-arwin-navy p-4 rounded-xl border border-arwin-gold/30 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-arwin-gold text-arwin-navy-deep rounded font-mono">
                  Signature Flagship
                </span>
                <h5 className="font-serif font-bold text-lg text-white mt-2">Arwin The Luminary</h5>
                <p className="text-xs text-gray-300 mt-1">
                  65-Storey Sky Mansions in Neopolis. Double height decks with private plunge pools.
                </p>
              </div>
              <button
                onClick={() => { onNavigate('property', 'arwin-the-luminary-neopolis'); onClose(); }}
                className="mt-3 w-full py-2 bg-arwin-gold hover:bg-arwin-gold-bright text-arwin-navy-deep font-bold text-xs rounded-lg transition-colors text-center"
              >
                Explore The Luminary
              </button>
            </div>
          </div>
        )}

        {/* PROJECTS MEGA MENU */}
        {activeMenu === 'projects' && (
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-arwin-gold mb-4 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Arwin Signature Collection
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="p-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer" onClick={() => { onNavigate('property', 'arwin-the-luminary-neopolis'); onClose(); }}>
                  <div className="font-semibold text-white">Arwin The Luminary</div>
                  <div className="text-xs text-gray-400">Neopolis • 65 Storeys • From ₹9.50 Cr</div>
                </li>
                <li className="p-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer" onClick={() => { onNavigate('property', 'arwin-one-aurelia-kokapet'); onClose(); }}>
                  <div className="font-semibold text-white">Arwin One Aurelia</div>
                  <div className="text-xs text-gray-400">Kokapet Golden Mile • Lakefront Villas • From ₹14.50 Cr</div>
                </li>
                <li className="p-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer" onClick={() => { onNavigate('property', 'arwin-sovereign-villas-tellapur'); onClose(); }}>
                  <div className="font-semibold text-white">Arwin Sovereign Enclave</div>
                  <div className="text-xs text-gray-400">Tellapur • Spanish Tuscan Villas • From ₹6.80 Cr</div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-arwin-gold mb-4 flex items-center gap-1.5">
                <Landmark className="w-4 h-4" /> Developer Partners
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-white/5 hover:bg-arwin-gold/20 transition-colors">My Home Group</div>
                <div className="p-2 rounded bg-white/5 hover:bg-arwin-gold/20 transition-colors">Aparna Constructions</div>
                <div className="p-2 rounded bg-white/5 hover:bg-arwin-gold/20 transition-colors">Jayabheri Properties</div>
                <div className="p-2 rounded bg-white/5 hover:bg-arwin-gold/20 transition-colors">Phoenix Group</div>
                <div className="p-2 rounded bg-white/5 hover:bg-arwin-gold/20 transition-colors">SAS Infra</div>
                <div className="p-2 rounded bg-white/5 hover:bg-arwin-gold/20 transition-colors">DSR Group</div>
              </div>
            </div>

            <div className="bg-arwin-gold/10 p-5 rounded-xl border border-arwin-gold/30 flex flex-col justify-between">
              <div>
                <h5 className="font-serif font-bold text-white text-base">Off-Plan VIP First Allocation</h5>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                  Gain exclusive early-stage access to pre-launch allocations in Neopolis & Kokapet with zero brokerage and bespoke payment schedules.
                </p>
              </div>
              <a
                href="#nri-desk"
                onClick={onClose}
                className="mt-4 inline-block text-center py-2 px-4 bg-arwin-gold text-arwin-navy-deep font-bold text-xs rounded-lg hover:bg-arwin-gold-bright transition-colors"
              >
                Inquire Off-Plan Allocations
              </a>
            </div>
          </div>
        )}

        {/* SERVICES MEGA MENU */}
        {activeMenu === 'services' && (
          <div className="grid grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => { onNavigate('section', 'nri-desk'); onClose(); }}>
              <Compass className="w-6 h-6 text-arwin-gold mb-3" />
              <h5 className="font-bold text-white text-sm">NRI Concierge Desk</h5>
              <p className="text-xs text-gray-400 mt-1">Dedicated advisory for USA, UAE, UK, Singapore Telugu diaspora.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => { onOpenValuation(); onClose(); }}>
              <Calculator className="w-6 h-6 text-arwin-gold mb-3" />
              <h5 className="font-bold text-white text-sm">Property Valuation</h5>
              <p className="text-xs text-gray-400 mt-1">Comprehensive micro-market benchmarking & asset valuation.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => { onNavigate('section', 'mortgage-calculator'); onClose(); }}>
              <Briefcase className="w-6 h-6 text-arwin-gold mb-3" />
              <h5 className="font-bold text-white text-sm">Mortgage & Home Loans</h5>
              <p className="text-xs text-gray-400 mt-1">Tailored SBI, HDFC, ICICI benchmark rates for Indian & NRI buyers.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => { onNavigate('section', 'faq'); onClose(); }}>
              <ShieldCheck className="w-6 h-6 text-arwin-gold mb-3" />
              <h5 className="font-bold text-white text-sm">TS-RERA Compliance</h5>
              <p className="text-xs text-gray-400 mt-1">100% legal verification, title clearance, and conveyance advisory.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
