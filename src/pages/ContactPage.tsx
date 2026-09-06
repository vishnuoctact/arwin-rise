import React, { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useContent } from '../context/ContentContext';
import { sendLeadEmail } from '../services/leadService';

interface ContactPageProps {
  onNavigateHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome }) => {
  const { settings } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '₹3 Cr – ₹6 Cr (Private Residences)',
    message: '',
    preferredContact: 'phone'
  });

  const [submitted, setSubmitted] = useState(false);
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vipToken = 'ARW-CON-' + Math.floor(100000 + Math.random() * 900000);
    setToken(vipToken);
    setSubmitted(true);

    // Dispatch lead email to kamalyellapragada@gmail.com
    sendLeadEmail({
      formType: 'Contact Concierge Desk',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      budget: formData.budget,
      preferredContactMethod: formData.preferredContact,
      message: formData.message || 'Direct enquiry from Contact page',
      vipPassNumber: vipToken
    });

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#C5A880', '#7A1522', '#FAF7F2']
      });
    } catch (e) {}
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Page Hero */}
      <PageHero
        tag="PRIVATE CLIENT DESK"
        title="Direct Access to Leadership & Advisory"
        subtitle="Connect with our managing partners and wealth advisors for private viewings, NRI documentation, and off-market inventory."
        breadcrumbs={['Contact']}
        onNavigateHome={onNavigateHome}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column (5 Cols): Direct Channels & Advisory Office */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white border border-[#EAE3DA] p-6 sm:p-8 lg:p-9 shadow-sm relative flex-1 flex flex-col justify-between">
              <div className="h-1 bg-[#771722] absolute top-0 left-0 right-0"></div>

              <div>
                {/* Header */}
                <div className="mb-6 space-y-1">
                  <div className="text-[10px] font-sans font-semibold tracking-[0.24em] text-[#C5A880] uppercase">
                    DIRECT COMMUNICATIONS
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#222222] font-normal">
                    Advisory Concierge
                  </h2>
                  <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                    Direct access to our managing partners, wealth advisors, and private viewing desk.
                  </p>
                </div>

                {/* Direct Contact Channels List */}
                <div className="divide-y divide-[#EAE3DA]">
                  
                  {/* Phone Hotline */}
                  <a 
                    href={`tel:${settings.displayPhone || '+918464954321'}`}
                    className="py-4 flex items-start gap-3.5 group transition-colors block"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#771722]/10 text-[#771722] group-hover:bg-[#771722] group-hover:text-white flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                      <Phone className="w-4 h-4 text-[#C5A880] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-[9.5px] font-sans font-bold tracking-widest text-[#C5A880] uppercase">
                        DIRECT ADVISORY HOTLINE
                      </div>
                      <div className="font-serif text-lg text-[#222222] group-hover:text-[#771722] transition-colors leading-tight mt-0.5">
                        {settings.displayPhone || '+91 84649 54321'}
                      </div>
                      <div className="text-[11px] text-neutral-500 font-sans mt-0.5">
                        Direct Access to Senior Concierge & Advisory Desk
                      </div>
                    </div>
                  </a>

                  {/* WhatsApp Channel */}
                  <a 
                    href={`https://wa.me/${settings.whatsappPhone || '918464954321'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 flex items-start gap-3.5 group transition-colors block"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#771722]/10 group-hover:bg-[#771722] flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                      <MessageSquare className="w-4 h-4 text-[#C5A880] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-[9.5px] font-sans font-bold tracking-widest text-[#C5A880] uppercase">
                        GLOBAL WHATSAPP DESK
                      </div>
                      <div className="font-serif text-lg text-[#222222] group-hover:text-[#771722] transition-colors leading-tight mt-0.5">
                        +{settings.whatsappPhone || '91 84649 54321'}
                      </div>
                      <div className="text-[11px] text-neutral-500 font-sans mt-0.5">
                        Instant portfolio brochures & 4K video walkthroughs
                      </div>
                    </div>
                  </a>

                  {/* Email Channel */}
                  <a 
                    href={`mailto:${settings.publicContactEmail || 'concierge@arwinrise.com'}`}
                    className="py-4 flex items-start gap-3.5 group transition-colors block"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#771722]/10 text-[#771722] group-hover:bg-[#771722] group-hover:text-white flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                      <Mail className="w-4 h-4 text-[#C5A880] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-[9.5px] font-sans font-bold tracking-widest text-[#C5A880] uppercase">
                        OFFICIAL CORRESPONDENCE
                      </div>
                      <div className="font-serif text-base text-[#222222] group-hover:text-[#771722] transition-colors leading-tight mt-0.5">
                        {settings.publicContactEmail || 'concierge@arwinrise.com'}
                      </div>
                      <div className="text-[11px] text-neutral-500 font-sans mt-0.5">
                        For institutional partnerships & private briefs
                      </div>
                    </div>
                  </a>

                </div>
              </div>

              {/* Physical Location Footer within Card */}
              <div className="mt-6 pt-4 border-t border-[#EAE3DA] bg-[#FAF7F2] p-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-[#771722]">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Advisory Office</span>
                </div>
                <div className="font-serif text-sm text-[#222222] font-normal leading-snug">
                  {settings.officeAddressHyderabad || 'Neopolis, HITEC City, Hyderabad'}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-sans pt-0.5">
                  <Clock className="w-3 h-3 text-[#C5A880]" />
                  <span>Monday – Sunday: 10:00 AM – 7:30 PM (IST)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (7 Cols): Confidential Consultation Form */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white border border-[#EAE3DA] p-6 sm:p-8 lg:p-9 shadow-sm relative flex-1 flex flex-col justify-between">
              <div className="h-1 bg-[#771722] absolute top-0 left-0 right-0"></div>

              {!submitted ? (
                <div>
                  <div className="mb-6 space-y-1">
                    <div className="text-[10px] font-sans font-semibold tracking-[0.24em] text-[#C5A880] uppercase">
                      CONFIDENTIAL INQUIRY
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#222222] font-normal">
                      Reserve a Private Consultation
                    </h3>
                    <p className="text-xs text-neutral-500 font-sans">
                      All communications are protected under non-disclosure protocols.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10.5px] font-sans font-bold tracking-wider uppercase text-neutral-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Vikramaditya Reddy"
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3DA] text-xs text-[#222222] focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10.5px] font-sans font-bold tracking-wider uppercase text-neutral-700 mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 84649 54321"
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3DA] text-xs text-[#222222] focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10.5px] font-sans font-bold tracking-wider uppercase text-neutral-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="vikram@domain.com"
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3DA] text-xs text-[#222222] focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10.5px] font-sans font-bold tracking-wider uppercase text-neutral-700 mb-1">
                          Target Investment Range
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3DA] text-xs text-[#222222] focus:outline-none focus:border-[#C5A880] cursor-pointer"
                        >
                          <option value="₹1.5 Cr – ₹3 Cr (Premium High-Rise Condos)">01 | Premium High-Rise Condos (₹1.5 Cr – ₹3 Cr)</option>
                          <option value="₹3 Cr – ₹6 Cr (Triplex Villas & 4 BHK Suites)">02 | Triplex Villas & 4 BHK Suites (₹3 Cr – ₹6 Cr)</option>
                          <option value="₹6 Cr – ₹35 Cr+ (Palatial Estates & Mansions)">03 | Palatial Estates & Mansions (₹6 Cr – ₹35 Cr+)</option>
                          <option value="Dubai Private Collection (₹4.5 Cr – ₹55 Cr+)">04 | Dubai Private Collection (₹4.5 Cr – ₹55 Cr+)</option>
                          <option value="Bangalore Highway Plotted Development">Plotted Estates (Bangalore Highway)</option>
                          <option value="Commercial & Institutional Assets">Commercial & High-Yield Assets</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10.5px] font-sans font-bold tracking-wider uppercase text-neutral-700 mb-1">
                        Specific Requirements / Questions
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please share preferred location, timeline, or NRI documentation requirements..."
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3DA] text-xs text-[#222222] focus:outline-none focus:border-[#C5A880]"
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-[#771722] text-white py-3.5 px-6 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#8E1E2C] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>SUBMIT CONFIDENTIAL INQUIRY</span>
                        <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 pt-1">
                      <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                      <span>Direct connection with ARWIN Managing Leadership.</span>
                    </div>
                  </form>
                </div>
              ) : (
                /* Success State */
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-[#771722]/10 text-[#771722] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-[#C5A880]" />
                  </div>

                  <h3 className="font-serif text-3xl text-[#222222]">
                    Inquiry Confirmed
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-[#771722]">{formData.name}</span>. Your private brief has been transmitted to our managing director's desk.
                  </p>

                  <div className="p-4 bg-[#FAF7F2] border border-[#EAE3DA] max-w-sm mx-auto text-xs font-mono text-[#771722]">
                    Reference Token: <strong>{token}</strong>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-[#771722] text-white px-6 py-2.5 text-xs uppercase tracking-wider font-semibold"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
