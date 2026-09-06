import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Lock, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sendLeadEmail } from '../services/leadService';

interface QuickEnquiryBannerProps {
  onRequestPreview?: () => void;
}

export const QuickEnquiryBanner: React.FC<QuickEnquiryBannerProps> = ({ onRequestPreview }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    tier: 'signature',
    profileType: 'homebuyer'
  });

  const [submitted, setSubmitted] = useState(false);
  const [token, setToken] = useState('');

  const tiers = [
    { 
      id: 'signature', 
      badge: '01',
      title: 'Signature Residences', 
      pricing: '₹ 1.50 — 3.00 Cr',
      location: 'Kukatpally, Shankarpally, Mokila, Kollur, Miyapur, Rajendra Nagar'
    },
    { 
      id: 'luxury', 
      badge: '02',
      title: 'Luxury Residences', 
      pricing: '₹ 3.00 — 6.00 Cr',
      location: 'Kollur, Mokila, Future City, Financial District, Neopolis'
    },
    { 
      id: 'private', 
      badge: '03',
      title: 'Private Residences', 
      pricing: '₹ 6.00 — 35.00 Cr+',
      location: 'Shankarpally, Gachibowli, Nanakramguda, Neopolis'
    },
    { 
      id: 'dubai', 
      badge: 'INTL',
      title: 'Dubai Collection', 
      pricing: '₹ 4.5 Cr+ · AED 2M+',
      location: 'Downtown & Waterfront'
    },
  ];

  const profileTypes = [
    { id: 'homebuyer', label: 'Primary Family Residence', desc: 'Discerning Indian Homebuyers' },
    { id: 'nri', label: 'NRI Global Asset Allocation', desc: 'USA, UAE, UK, Singapore' },
    { id: 'portfolio', label: 'Capital Wealth Creation', desc: 'High Growth & Yield' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vipToken = 'ARW-VIP-' + Math.floor(100000 + Math.random() * 900000);
    setToken(vipToken);
    setSubmitted(true);

    // Dispatch lead email to kamalyellapragada@gmail.com
    sendLeadEmail({
      formType: 'Quick Advisory Callback',
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      tier: formData.tier,
      profileType: formData.profileType,
      vipPassNumber: vipToken
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#C5A880', '#7A1522', '#FAF7F2', '#E0C9A6']
      });
    } catch (e) {}
  };

  return (
    <section id="private-advisory" className="relative py-14 sm:py-16 lg:py-20 overflow-hidden bg-[#FAF7F2] border-t border-[#EAE3DA] scroll-mt-20">
      {/* Background Architectural Ambient Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#C5A880]/20 via-[#7A1522]/10 to-transparent blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {!submitted ? (
          <div className="relative bg-[#380E1C] text-white rounded-none p-5 sm:p-8 lg:p-12 shadow-[0_25px_60px_-15px_rgba(56,14,28,0.6)] border border-[#C5A880]/30 space-y-6 sm:space-y-8">
            
            {/* Header: Editorial & High-Prestige 10-Min Strategy Call */}
            <div className="text-center max-w-2xl mx-auto space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-transparent border border-[#C5A880] text-[#C5A880] text-[9px] sm:text-[9.5px] font-sans font-semibold tracking-[0.26em] uppercase">
                <span>10-MINUTE STRATEGY CALL · CONFIDENTIAL ADVISORY</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[36px] text-white font-normal leading-tight tracking-tight">
                Book a 10-Minute Private Strategy Call
              </h2>

              <p className="text-xs sm:text-[13.5px] font-sans font-light text-[#D5CDC5] leading-relaxed max-w-xl mx-auto">
                A focused 10-minute strategic briefing with Senior Advisory Leadership. <span className="text-[#C5A880] font-medium">Not a sales call, zero pressure</span> — just direct micro-market intelligence, off-market inventory clarity, and tailored guidance for your property goals.
              </p>
            </div>

            {/* Privilege Selection & Form */}
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
              
              {/* Step 1: Select Residential Caliber */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border border-[#C5A880] text-[#C5A880] text-[10px] font-sans font-bold flex items-center justify-center flex-shrink-0">
                    01
                  </span>
                  <label className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#C5A880] uppercase">
                    SELECT RESIDENTIAL CALIBER OF INTEREST
                  </label>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
                  {tiers.map((t) => {
                    const isSelected = formData.tier === t.id;
                    return (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setFormData({ ...formData, tier: t.id })}
                        className={`p-3 sm:p-4 text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[95px] sm:min-h-[105px] relative group outline-none focus:outline-none ${
                          isSelected
                            ? 'bg-[#2B0B16] border border-white/20 shadow-md'
                            : 'bg-[#2B0B16]/60 border border-white/10 hover:bg-[#2B0B16]'
                        }`}
                      >
                        {/* Category Badge */}
                        <div className="mb-1.5">
                          <span className={`inline-block text-[8.5px] sm:text-[9px] font-sans font-bold tracking-widest px-1.5 py-0.5 border ${
                            isSelected ? 'bg-[#C5A880] text-[#380E1C] border-[#C5A880]' : 'border-white/20 text-neutral-400'
                          }`}>
                            {t.badge}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-[12px] sm:text-[13px] font-serif font-normal text-white leading-tight">
                            {t.title}
                          </h4>
                          <div className="text-[11px] sm:text-[12px] font-sans font-semibold text-[#C5A880] tracking-wide mt-1" style={{ fontVariantNumeric: 'lining-nums' }}>
                            {t.pricing}
                          </div>
                          <div className="text-[9px] sm:text-[10px] font-sans text-neutral-400 mt-0.5">
                            {t.location}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Select Call Purpose */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border border-[#C5A880] text-[#C5A880] text-[10px] font-sans font-bold flex items-center justify-center flex-shrink-0">
                    02
                  </span>
                  <label className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#C5A880] uppercase">
                    PURPOSE OF YOUR 10-MINUTE STRATEGY CALL
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
                  {profileTypes.map((p) => {
                    const isSelected = formData.profileType === p.id;
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setFormData({ ...formData, profileType: p.id })}
                        className={`py-3 px-4 text-left border transition-all duration-200 cursor-pointer outline-none focus:outline-none ${
                          isSelected
                            ? 'bg-[#C5A880] text-[#222222] border-2 border-[#C5A880] shadow-md font-semibold'
                            : 'bg-[#2B0B16]/60 border border-white/10 text-neutral-300 hover:bg-[#2B0B16]'
                        }`}
                      >
                        <div className={`text-[11.5px] sm:text-[12px] font-sans font-bold ${isSelected ? 'text-[#222222]' : 'text-white'}`}>
                          {p.label}
                        </div>
                        <div className={`text-[9.5px] sm:text-[10px] mt-0.5 ${isSelected ? 'text-[#444444]' : 'text-neutral-400'}`}>
                          {p.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Direct Contact Credentials */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border border-[#C5A880] text-[#C5A880] text-[10px] font-sans font-bold flex items-center justify-center flex-shrink-0">
                    03
                  </span>
                  <label className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#C5A880] uppercase">
                    DIRECT CONTACT FOR APPOINTMENT CONFIRMATION
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
                  <div>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Full Name *"
                      className="w-full px-4 py-3 bg-[#1F0710]/90 border border-white/15 focus:border-[#C5A880] text-[16px] sm:text-xs text-white placeholder-neutral-400 focus:outline-none rounded-none appearance-none transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Mobile / WhatsApp Number *"
                      className="w-full px-4 py-3 bg-[#1F0710]/90 border border-white/15 focus:border-[#C5A880] text-[16px] sm:text-xs text-white placeholder-neutral-400 focus:outline-none rounded-none appearance-none transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Private Email Address *"
                      className="w-full px-4 py-3 bg-[#1F0710]/90 border border-white/15 focus:border-[#C5A880] text-[16px] sm:text-xs text-white placeholder-neutral-400 focus:outline-none rounded-none appearance-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Submission & Trust Bar */}
              <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15">
                <div className="flex items-center gap-2 text-[10.5px] sm:text-[11.5px] font-sans text-[#D5CDC5]">
                  <Lock className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0" />
                  <span>100% Confidential • Pure Advisory, Zero Sales Pressure • Direct Senior Leadership</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#C5A880] hover:bg-[#D4B993] text-[#222222] font-sans font-bold px-7 sm:px-9 py-3.5 sm:py-4 text-[11px] tracking-[0.18em] uppercase transition-all duration-300 shadow-xl outline-none cursor-pointer"
                >
                  <span>BOOK 10-MINUTE STRATEGY CALL</span>
                  <ArrowRight className="w-4 h-4 text-[#222222]" />
                </button>
              </div>

            </form>

          </div>
        ) : (
          /* Confirmation State */
          <div className="bg-[#380E1C] border-2 border-[#C5A880] p-8 sm:p-10 text-center space-y-4 max-w-xl mx-auto shadow-2xl text-white">
            <div className="w-12 h-12 bg-[#C5A880]/20 rounded-full flex items-center justify-center mx-auto border border-[#C5A880]/40">
              <CheckCircle2 className="w-6 h-6 text-[#C5A880]" />
            </div>

            <div className="space-y-1.5">
              <div className="text-[9.5px] font-sans font-bold tracking-[0.24em] text-[#C5A880] uppercase">
                10-MINUTE STRATEGY CALL RESERVED
              </div>
              <h3 className="font-serif text-2xl text-white">
                Thank You, {formData.fullName}
              </h3>
              <p className="text-[11.5px] text-neutral-300 font-sans leading-relaxed max-w-md mx-auto">
                Your appointment request has been prioritized with the Senior Advisory Leadership of ARWIN RISE. Our managing desk will confirm your scheduled 10-minute briefing via WhatsApp / Phone shortly.
              </p>
            </div>

            <div className="bg-black/40 border border-white/15 p-3 max-w-xs mx-auto">
              <span className="text-[9px] font-sans text-neutral-400 uppercase tracking-widest block">CONFIDENTIAL APPOINTMENT ID</span>
              <span className="font-mono text-sm font-bold text-[#C5A880] tracking-widest">{token}</span>
            </div>

            <button
              onClick={() => setSubmitted(false)}
              className="inline-block text-[11px] font-sans font-semibold text-[#C5A880] hover:text-white underline tracking-wider pt-1"
            >
              Book another 10-minute consultation
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
