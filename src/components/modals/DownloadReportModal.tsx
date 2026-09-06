import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DownloadReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (title: string, message: string, type: 'success' | 'error' | 'info') => void;
}

export const DownloadReportModal: React.FC<DownloadReportModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [investorCategory, setInvestorCategory] = useState('NRI / Global Investor');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      onShowToast('Incomplete Fields', 'Please provide your name and email.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
      onShowToast(
        'Brochure Download Initialized',
        `The Arwin 2026 Portfolio & Market Brochure has been dispatched to ${email}.`,
        'success'
      );
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E2DED6] my-8">
        <div className="bg-[#181615] p-6 text-white relative border-b border-[#332E2C]">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-[#C8BCA8] text-xs font-mono uppercase tracking-widest mb-1">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Exclusive Dossier</span>
          </div>

          <h3 className="text-xl font-serif font-bold text-white">
            Download Arwin Portfolio Brochure 2026
          </h3>
          <p className="text-xs text-[#8A837E] mt-1">
            Includes blueprints, pricing matrices, TS-RERA registrations, and micro-market growth analytics.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 text-left bg-white">
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#45403D] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. S. R. Varma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-[#F4F3F0] rounded-xl border border-[#E2DED6] text-xs font-semibold text-[#181615] outline-none focus:ring-2 focus:ring-[#6B1416]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#45403D] mb-1">
                Corporate / Personal Email *
              </label>
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-[#F4F3F0] rounded-xl border border-[#E2DED6] text-xs font-semibold text-[#181615] outline-none focus:ring-2 focus:ring-[#6B1416]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#45403D] mb-1">
                WhatsApp / Phone (Optional)
              </label>
              <input
                type="tel"
                placeholder="+91 / +1 / +971"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-[#F4F3F0] rounded-xl border border-[#E2DED6] text-xs font-semibold text-[#181615] outline-none focus:ring-2 focus:ring-[#6B1416]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#45403D] mb-1">
              Investor Profile
            </label>
            <select
              value={investorCategory}
              onChange={(e) => setInvestorCategory(e.target.value)}
              className="w-full p-2.5 bg-[#F4F3F0] rounded-xl border border-[#E2DED6] text-xs font-semibold text-[#181615] outline-none focus:ring-2 focus:ring-[#6B1416]"
            >
              <option value="NRI / Global Investor">NRI / Global Investor (US, UAE, UK, Singapore)</option>
              <option value="Resident UHNI / Corporate Executive">Resident UHNI / Corporate Executive</option>
              <option value="Institutional / Family Office">Institutional / Family Office</option>
              <option value="Homebuyer / Long-term Investor">Homebuyer / Long-term Investor</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-shine w-full py-3.5 bg-[#6B1416] hover:bg-[#570E10] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#A67547]/30"
            >
              <Download className="w-4 h-4 text-[#C8BCA8]" />
              <span>{isSubmitting ? 'Preparing Brochure...' : 'Download Full PDF Brochure (Free)'}</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#7A736E] text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6B1416]" />
            <span>Instant Direct Download • Strict Privacy NDA</span>
          </div>
        </form>
      </div>
    </div>
  );
};
