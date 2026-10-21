import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FooterProps {
  onNavigate: (category: string, filter?: string) => void;
  onOpenListProperty: () => void;
  onOpenValuation: () => void;
  onShowToast: (title: string, message: string, type: 'success' | 'error' | 'info') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenListProperty,
  onOpenValuation,
  onShowToast
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.8 } });
    onShowToast(
      'Subscribed to Market Briefings',
      `You will receive the monthly Arwin Hyderabad Ultra-Luxury Real Estate Index at ${newsletterEmail}.`,
      'success'
    );
    setNewsletterEmail('');
  };

  return (
    <footer id="contact" className="bg-[#181615] text-white border-t border-[#332E2C] pt-16 pb-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#6B1416]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Newsletter & Advisory Row */}
        <div className="pb-12 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 text-left">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Receive Hyderabad Real Estate Market Intelligence
            </h3>
            <p className="text-xs text-[#8A837E] mt-1 font-light">
              Curated off-plan launches, Neopolis price trends, and private UHNI listings delivered monthly.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your corporate or personal email..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-white/10 rounded-xl text-xs text-white border border-white/10 focus:ring-2 focus:ring-[#A67547] outline-none placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#6B1416] hover:bg-[#570E10] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5 flex-shrink-0 cursor-pointer border border-[#A67547]/30"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C8BCA8]" />
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Directory Grid */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs text-left">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-sans font-bold text-2xl tracking-tight text-white">
                Arwin<span className="text-[#A67547]">.</span>
              </span>
            </div>

            <p className="text-[#8A837E] leading-relaxed font-light text-xs max-w-sm">
              Hyderabad’s benchmark for ultra-luxury residential towers, private waterfront mansions, and institutional commercial spaces. Serving high-net-worth families and the global Telugu diaspora since 2012.
            </p>

            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-white/5 hover:bg-[#6B1416] hover:text-white transition-colors text-gray-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 rounded-full bg-white/5 hover:bg-[#6B1416] hover:text-white transition-colors text-gray-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Micro-Market Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#A67547] mb-3">
              Prime Locations
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button onClick={() => onNavigate('location', 'Neopolis')} className="hover:text-[#C8BCA8] transition-colors">
                  Neopolis Skymansions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('location', 'Kokapet')} className="hover:text-[#C8BCA8] transition-colors">
                  Kokapet Golden Mile
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('location', 'Jubilee Hills')} className="hover:text-[#C8BCA8] transition-colors">
                  Jubilee Hills &amp; Banjara Hills
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('location', 'Financial District')} className="hover:text-[#C8BCA8] transition-colors">
                  Financial District
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('location', 'Tellapur')} className="hover:text-[#C8BCA8] transition-colors">
                  Tellapur &amp; Mokila Villas
                </button>
              </li>
            </ul>
          </div>

          {/* Developer Portfolio & Services */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#A67547] mb-3">
              Advisory Services
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#nri-desk" className="hover:text-[#C8BCA8] transition-colors block">
                  NRI Global Concierge
                </a>
              </li>
              <li>
                <a href="#mortgage-calculator" className="hover:text-[#C8BCA8] transition-colors block">
                  Home Loan EMI Calculator
                </a>
              </li>
              <li>
                <button onClick={onOpenValuation} className="hover:text-[#C8BCA8] transition-colors text-left">
                  Property Valuation Engine
                </button>
              </li>
              <li>
                <button onClick={onOpenListProperty} className="hover:text-[#C8BCA8] transition-colors text-left">
                  List Your Property with Arwin
                </button>
              </li>
            </ul>
          </div>

          {/* Hyderabad Office Locations & Direct Contacts */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#A67547] mb-3">
              Hyderabad Headquarters
            </h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#A67547] flex-shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Plot No 102, HMT Swarnapuri Colony, Miyapur, Ranga Reddy, Telangana, 500050
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#A67547] flex-shrink-0" />
                <a 
                  href="https://wa.me/918464955321?text=Hello%20Arwin%20Rise%20Concierge,%20I%20would%20like%20to%20connect%20with%20an%20Advisor." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Advisory Desk
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#A67547] flex-shrink-0" />
                <span>concierge@arwinrealty.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* TS-RERA & Legal Disclaimer Bottom Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#8A837E]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#A67547]" />
            <span>Telangana Real Estate Regulatory Authority (TS-RERA) Registered Developer &amp; Brokerage: <strong>TS/RERA/AGT/2024/0984</strong></span>
          </div>

          <div className="flex items-center gap-4 text-[#8A837E]">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Terms of Representation</a>
            <span>•</span>
            <span>© {new Date().getFullYear()} Arwin Realty Pvt. Ltd.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
