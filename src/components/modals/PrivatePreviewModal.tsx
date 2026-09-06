import React, { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { ArwinLogo } from '../ArwinLogo';
import confetti from 'canvas-confetti';

import { sendLeadEmail } from '../../services/leadService';

interface PrivatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivatePreviewModal: React.FC<PrivatePreviewModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'India',
    collection: 'Signature Residences (₹1.5 Cr – ₹3 Cr)',
    date: '',
    timeSlot: 'Morning (10:00 AM - 1:00 PM)',
    conciergeNotes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [passNumber, setPassNumber] = useState('');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = 'ARW-VIP-' + Math.floor(100000 + Math.random() * 900000);
    setPassNumber(token);
    setSubmitted(true);

    // Dispatch lead email to kamalyellapragada@gmail.com
    sendLeadEmail({
      formType: 'Private Preview VIP Pass',
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      collection: formData.collection,
      preferredDate: formData.date || 'Earliest Available',
      timeSlot: formData.timeSlot,
      notes: formData.conciergeNotes || 'None',
      vipPassNumber: token
    });

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A880', '#7A1522', '#FFFFFF']
      });
    } catch (e) {}
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-3 sm:p-6 flex items-start sm:items-center justify-center"
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

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8 lg:p-10">
          {!submitted ? (
            <div>
              {/* Header */}
              <div className="text-center mb-6 sm:mb-8 pr-8 sm:pr-0">
                <div className="inline-flex items-center justify-center mb-2.5">
                  <ArwinLogo size="md" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#222222] font-normal leading-snug">
                  Request Private Preview
                </h2>
                <div className="w-10 h-[1.5px] bg-[#C5A880] mx-auto mt-2 mb-2"></div>
                <p className="text-xs text-neutral-600 font-sans max-w-md mx-auto">
                  Experience bespoke residences with a personal portfolio manager. Priority slots allocated for genuine buyers & investors.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[10px] sm:text-[10.5px] font-sans font-bold tracking-wider uppercase text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EAE3DA] text-xs focus:outline-none focus:border-[#C5A880] text-[#222222] placeholder-neutral-400 rounded-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[10.5px] font-sans font-bold tracking-wider uppercase text-neutral-700 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 84649 54321"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EAE3DA] text-xs focus:outline-none focus:border-[#C5A880] text-[#222222] placeholder-neutral-400 rounded-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[10px] sm:text-[10.5px] font-sans font-bold tracking-wider uppercase text-neutral-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EAE3DA] text-xs focus:outline-none focus:border-[#C5A880] text-[#222222] placeholder-neutral-400 rounded-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[10.5px] font-sans font-bold tracking-wider uppercase text-neutral-700 mb-1">
                      Residence Country / City
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. Hyderabad / Dubai / USA"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EAE3DA] text-xs focus:outline-none focus:border-[#C5A880] text-[#222222] placeholder-neutral-400 rounded-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[10.5px] font-sans font-bold tracking-wider uppercase text-neutral-700 mb-1">
                    Collection Tier Preference
                  </label>
                  <select
                    value={formData.collection}
                    onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#EAE3DA] text-xs focus:outline-none focus:border-[#C5A880] text-[#222222] rounded-none cursor-pointer"
                  >
                    <option value="01 | Signature Residences (₹1.5 Cr – ₹3 Cr)">01 | Signature Residences (₹1.5 Cr – ₹3 Cr)</option>
                    <option value="02 | Luxury Residences (₹3 Cr – ₹6 Cr)">02 | Luxury Residences (₹3 Cr – ₹6 Cr)</option>
                    <option value="03 | Private Residences (₹6 Cr – ₹35 Cr+)">03 | Private Residences (₹6 Cr – ₹35 Cr+)</option>
                    <option value="Sovereign Greens Plotted Development">Sovereign Greens Plotted Estates (Bangalore Highway)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[10px] sm:text-[10.5px] font-sans font-bold tracking-wider uppercase text-neutral-700 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white border border-[#EAE3DA] text-xs focus:outline-none focus:border-[#C5A880] text-[#222222] rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[10.5px] font-sans font-bold tracking-wider uppercase text-neutral-700 mb-1">
                      Time Slot
                    </label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EAE3DA] text-xs focus:outline-none focus:border-[#C5A880] text-[#222222] rounded-none cursor-pointer"
                    >
                      <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                      <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                      <option value="Evening Twilight (5:30 PM - 8:00 PM)">Evening Twilight (5:30 PM - 8:00 PM)</option>
                      <option value="Virtual Video Walkthrough (NRI Desk)">Virtual Video Walkthrough (NRI Desk)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full group bg-[#771722] hover:bg-[#8E1E2C] text-white py-3.5 px-6 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase rounded-none shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>CONFIRM PRIVATE PREVIEW</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10.5px] text-neutral-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Strictly confidential. No spam policy.</span>
                </div>
              </form>
            </div>
          ) : (
            /* VIP PASS CONFIRMATION */
            <div className="py-4 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#771722]/10 text-[#771722] mb-3">
                <Sparkles className="w-7 h-7 text-[#C5A880]" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#222222] font-medium">
                Private Preview Confirmed
              </h3>
              <p className="text-xs text-neutral-600 font-sans mt-1.5 max-w-md mx-auto">
                Welcome, <span className="font-semibold text-[#771722]">{formData.fullName}</span>. Your VIP consultation token has been generated. Our concierge will connect at {formData.phone}.
              </p>

              {/* VIP Pass Card */}
              <div className="my-6 max-w-md mx-auto bg-[#771722] text-white p-5 sm:p-6 rounded-none border border-[#C5A880] shadow-2xl relative text-left">
                <div className="flex justify-between items-start border-b border-[#C5A880]/30 pb-3 mb-3">
                  <div>
                    <div className="text-[9.5px] font-sans tracking-widest text-[#C5A880] uppercase">VIP ACCESS PASS</div>
                    <div className="mt-1">
                      <ArwinLogo size="sm" variant="light" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] text-neutral-400">ACCESS CODE</div>
                    <div className="text-xs font-mono font-bold text-[#C5A880]">{passNumber}</div>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-neutral-200">
                  <div><span className="text-[#C5A880]/80">Guest:</span> {formData.fullName}</div>
                  <div><span className="text-[#C5A880]/80">Tier:</span> {formData.collection}</div>
                  <div><span className="text-[#C5A880]/80">Slot:</span> {formData.timeSlot}</div>
                  <div><span className="text-[#C5A880]/80">Status:</span> Priority Allocated</div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#C5A880]/20 flex justify-between items-center text-[9.5px] text-neutral-400">
                  <span>TS RERA REGISTERED</span>
                  <span className="text-[#C5A880] font-medium">CONCIERGE ACCESS</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="bg-[#771722] text-white px-7 py-2.5 text-xs font-sans font-semibold tracking-wider uppercase rounded-none hover:bg-[#8E1E2C] transition-colors"
              >
                Close & Return
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
