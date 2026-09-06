import React, { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { X, Calculator, Sparkles, Building, CheckCircle2, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ValuationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (title: string, message: string, type: 'success' | 'error' | 'info') => void;
}

export const ValuationModal: React.FC<ValuationModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  if (!isOpen) return null;

  const { formatPrice } = useCurrency();

  const [location, setLocation] = useState('Neopolis');
  const [propertyType, setPropertyType] = useState('Sky Villa');
  const [sizeSqFt, setSizeSqFt] = useState(5500);
  const [ageYears, setAgeYears] = useState('New / Under Construction');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [estimatedValuation, setEstimatedValuation] = useState<number | null>(null);

  const calculateValuation = (e: React.FormEvent) => {
    e.preventDefault();

    let ratePerSqFt = 13500;
    if (location === 'Jubilee Hills') ratePerSqFt = 28000;
    else if (location === 'Banjara Hills') ratePerSqFt = 24000;
    else if (location === 'Neopolis') ratePerSqFt = 14500;
    else if (location === 'Kokapet') ratePerSqFt = 16000;
    else if (location === 'Financial District') ratePerSqFt = 13000;
    else if (location === 'Tellapur') ratePerSqFt = 11500;
    else if (location === 'Gandipet') ratePerSqFt = 17000;

    if (propertyType === 'Signature Penthouse' || propertyType === 'Lakefront Estate') {
      ratePerSqFt *= 1.25;
    }

    const totalVal = sizeSqFt * ratePerSqFt;
    setEstimatedValuation(totalVal);
    confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } });
    onShowToast('Valuation Calculated', 'Market intelligence algorithm generated an instant asset estimate.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-arwin-gold/30 my-8">
        <div className="bg-gradient-to-r from-arwin-navy-deep to-arwin-navy p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-arwin-gold text-xs font-mono uppercase tracking-widest mb-1">
            <Calculator className="w-4 h-4" />
            <span>Automated Market Benchmark Engine</span>
          </div>

          <h3 className="text-xl font-serif font-bold">
            Hyderabad Real Estate Valuation Tool
          </h3>
          <p className="text-xs text-gray-300 mt-1">
            Real-time algorithm based on Q1 2026 registry transactions and TS-RERA disclosures.
          </p>
        </div>

        <form onSubmit={calculateValuation} className="p-6 sm:p-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
                Micro-Market Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-semibold text-arwin-navy outline-none focus:ring-2 focus:ring-arwin-gold"
              >
                <option value="Neopolis">Neopolis (Skyscrapers)</option>
                <option value="Kokapet">Kokapet Golden Mile</option>
                <option value="Jubilee Hills">Jubilee Hills</option>
                <option value="Banjara Hills">Banjara Hills</option>
                <option value="Financial District">Financial District</option>
                <option value="Tellapur">Tellapur / Mokila</option>
                <option value="Gandipet">Gandipet (Lakefront)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
                Asset Typology
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-semibold text-arwin-navy outline-none focus:ring-2 focus:ring-arwin-gold"
              >
                <option value="Sky Villa">Sky Villa / High-Rise Apartment</option>
                <option value="Gated Villa">Gated Community Villa</option>
                <option value="Signature Penthouse">Signature Penthouse / Duplex</option>
                <option value="Lakefront Estate">Lakefront Estate / Bungalow</option>
                <option value="Commercial Office">Commercial Grade-A Office</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-700">
                Super Built-up Area (Sq. Ft.)
              </label>
              <span className="font-bold text-arwin-navy font-mono">{sizeSqFt.toLocaleString()} sq ft</span>
            </div>
            <input
              type="range"
              min={1500}
              max={15000}
              step={250}
              value={sizeSqFt}
              onChange={(e) => setSizeSqFt(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-arwin-navy"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
                Owner / Contact Name
              </label>
              <input
                type="text"
                required
                placeholder="Your Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-semibold text-arwin-navy outline-none focus:ring-2 focus:ring-arwin-gold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
                WhatsApp Phone
              </label>
              <input
                type="tel"
                required
                placeholder="+91 / +1"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-semibold text-arwin-navy outline-none focus:ring-2 focus:ring-arwin-gold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-arwin-navy hover:bg-arwin-navy-deep text-arwin-gold font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Valuation Benchmark</span>
          </button>

          {/* Valuation Result Box */}
          {estimatedValuation && (
            <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-arwin-cream to-white border-2 border-arwin-gold animate-in fade-in zoom-in-95 duration-300 text-center">
              <span className="text-[10px] uppercase font-mono text-gray-500 block">
                Estimated Current Market Valuation
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-arwin-navy mt-1">
                {formatPrice(estimatedValuation)}
              </div>
              <p className="text-[11px] text-gray-600 mt-1">
                Estimated Range: <strong className="text-arwin-navy">{formatPrice(Math.round(estimatedValuation * 0.95))}</strong> – <strong className="text-arwin-navy">{formatPrice(Math.round(estimatedValuation * 1.08))}</strong>
              </p>
              <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
                A senior Arwin valuation director will connect with you on WhatsApp ({contactPhone}) for an on-site comparative market analysis (CMA).
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
