import React from 'react';
import { ArwinLogo } from './ArwinLogo';
import { Heart, MessageCircle, Lock } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenPreview: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate,
  onOpenPreview
}) => {
  const { settings, customPages } = useContent();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact-footer" className="bg-[#FAF8F5] text-arwin-charcoal border-t border-arwin-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Left Column for Brand & Contact, Right Grid for Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-arwin-border/80">
          
          {/* Brand, Division, Address, GST, Contact & Socials Column */}
          <div className="lg:col-span-4 space-y-3.5 text-left">
            <button onClick={() => onNavigate('home')} className="text-left inline-block">
              <ArwinLogo size="md" />
            </button>

            <div>
              <div className="text-[11px] font-sans font-bold tracking-[0.22em] text-[#C5A880] uppercase">
                {settings.tagline?.toUpperCase() || 'LIFE STARTS HERE.'}
              </div>
              <div className="text-xs text-neutral-600 font-sans mt-1">
                A division of <strong className="font-bold text-neutral-900 tracking-tight">{settings.companyDivision || 'ARWIN TRADERS PRIVATE LIMITED'}</strong>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-[#55504A] font-sans leading-relaxed">
              Bespoke private luxury residences & property advisory.
            </p>

            <div className="w-full h-[1px] bg-arwin-border my-4" />

            <div className="space-y-2 pt-1 text-xs font-sans">
              <div>
                <div className="font-bold tracking-[0.14em] text-neutral-900 uppercase text-[11px] mb-1">
                  ADDRESS
                </div>
                <div className="text-neutral-600 leading-relaxed max-w-sm">
                  {settings.officeAddressHyderabad || 'Plot No 102, HMT Swarnapuri Colony, Miyapur, Ranga Reddy, Telangana, 500050'}
                </div>
              </div>

              <div className="pt-1 text-neutral-700">
                <span className="font-bold text-neutral-900">GST:</span>{' '}
                <span className="font-mono text-neutral-800">{settings.gstNumber || '36AATCA2960K1Z6'}</span>
              </div>

              <div className="pt-0.5 text-neutral-700">
                <span className="font-bold text-neutral-900">Contact:</span>{' '}
                <a 
                  href={`tel:${(settings.displayPhone || '+91 84649 55321').replace(/\s+/g, '')}`} 
                  className="text-[#771722] font-bold hover:underline tracking-wide"
                >
                  {settings.displayPhone || '+91 84649 55321'}
                </a>
              </div>
            </div>
            
            {/* Social Media Icons: Instagram, Facebook, LinkedIn, YouTube */}
            <div className="flex items-center gap-3 pt-3">
              <a 
                href={settings.instagramUrl || "https://instagram.com"} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-neutral-300 hover:border-[#771722] hover:text-[#771722] flex items-center justify-center text-neutral-800 transition-colors bg-white/60 shadow-2xs"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href={settings.facebookUrl || "https://facebook.com"} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-neutral-300 hover:border-[#771722] hover:text-[#771722] flex items-center justify-center text-neutral-800 transition-colors bg-white/60 shadow-2xs"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href={settings.linkedinUrl || "https://linkedin.com"} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-neutral-300 hover:border-[#771722] hover:text-[#771722] flex items-center justify-center text-neutral-800 transition-colors bg-white/60 shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
              <a 
                href={settings.youtubeUrl || "https://youtube.com"} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border border-neutral-300 hover:border-[#771722] hover:text-[#771722] flex items-center justify-center text-neutral-800 transition-colors bg-white/60 shadow-2xs"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">

          {/* Column 1: RESIDENCES */}
          <div className="space-y-4">
            <h4 className="text-xs font-sans font-bold tracking-[0.2em] text-arwin-charcoal uppercase">
              RESIDENCES
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600 font-sans">
              <li><button onClick={() => onNavigate('residences')} className="hover:text-arwin-burgundy transition-colors text-left">High-Rise Projects</button></li>
              <li><button onClick={() => onNavigate('residences')} className="hover:text-arwin-burgundy transition-colors text-left">Villa Communities</button></li>
              <li><button onClick={() => onNavigate('residences')} className="hover:text-arwin-burgundy transition-colors text-left">Ongoing Projects</button></li>
              <li><button onClick={() => onNavigate('residences')} className="hover:text-arwin-burgundy transition-colors text-left">Upcoming Projects</button></li>
            </ul>
          </div>

          {/* Column 2: GOLDEN CIRCLE */}
          <div className="space-y-4">
            <h4 className="text-xs font-sans font-bold tracking-[0.2em] text-arwin-charcoal uppercase">
              GOLDEN CIRCLE
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600 font-sans">
              <li><button onClick={() => onNavigate('golden-circle')} className="hover:text-arwin-burgundy transition-colors text-left font-semibold text-[#771722]">The Golden Circle Club</button></li>
              <li><button onClick={() => onNavigate('investors')} className="hover:text-arwin-burgundy transition-colors text-left">Strategic Investors Desk</button></li>
              <li><button onClick={() => onNavigate('investors')} className="hover:text-arwin-burgundy transition-colors text-left">Investment Opportunities</button></li>
              <li><button onClick={() => onNavigate('investors')} className="hover:text-arwin-burgundy transition-colors text-left">Market Insights & ROI</button></li>
            </ul>
          </div>

          {/* Column 3: NRI CONNECT */}
          <div className="space-y-4">
            <h4 className="text-xs font-sans font-bold tracking-[0.2em] text-arwin-charcoal uppercase">
              NRI CONNECT
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600 font-sans">
              <li><button onClick={() => onNavigate('nri-connect')} className="hover:text-arwin-burgundy transition-colors text-left">NRI Services</button></li>
              <li><button onClick={() => onNavigate('nri-connect')} className="hover:text-arwin-burgundy transition-colors text-left">FAQs</button></li>
              <li><button onClick={() => onNavigate('nri-connect')} className="hover:text-arwin-burgundy transition-colors text-left">FEMA & Tax Resources</button></li>
              <li><button onClick={() => onNavigate('nri-connect')} className="hover:text-arwin-burgundy transition-colors text-left font-semibold text-arwin-burgundy">Contact NRI Desk</button></li>
            </ul>
          </div>

          {/* Column 4: COMPANY */}
          <div className="space-y-4">
            <h4 className="text-xs font-sans font-bold tracking-[0.2em] text-arwin-charcoal uppercase">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600 font-sans">
              <li><button onClick={() => onNavigate('about')} className="hover:text-arwin-burgundy transition-colors text-left">About Us</button></li>
              <li><button onClick={() => onNavigate('she-rise')} className="hover:text-arwin-burgundy transition-colors text-left font-semibold text-[#771722] flex items-center gap-1"><span>SHE RISE Initiative</span></button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-arwin-burgundy transition-colors text-left">Our Vision & Values</button></li>
              <li><button onClick={() => { onNavigate('home'); setTimeout(() => { const el = document.getElementById('reviews'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 150); }} className="hover:text-arwin-burgundy transition-colors text-left">Client Reviews</button></li>
              <li><button onClick={() => { onNavigate('home'); setTimeout(() => { const el = document.getElementById('news'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 150); }} className="hover:text-arwin-burgundy transition-colors text-left">Market News & Insights</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-arwin-burgundy transition-colors text-left">Contact & Careers</button></li>
            </ul>
          </div>

          {/* Column 5: LEGAL & ADVISORY */}
          <div className="space-y-4">
            <h4 className="text-xs font-sans font-bold tracking-[0.2em] text-arwin-charcoal uppercase">
              LEGAL & ADVISORY
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600 font-sans">
              <li><a href="#rera" onClick={(e) => { e.preventDefault(); alert("All ARWIN RISE properties are 100% TS RERA approved."); }} className="hover:text-arwin-burgundy transition-colors">RERA Compliance</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms & Conditions of ARWIN RISE."); }} className="hover:text-arwin-burgundy transition-colors">Terms & Conditions</a></li>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: Your data is protected with utmost confidentiality."); }} className="hover:text-arwin-burgundy transition-colors">Privacy Policy</a></li>
              {customPages && customPages.filter(p => p.isPublished && p.showInFooter).map(cp => (
                <li key={cp.id}>
                  <button onClick={() => onNavigate(`page-${cp.slug}`)} className="hover:text-arwin-burgundy transition-colors text-left font-medium text-[#771722]">
                    {cp.title}
                  </button>
                </li>
              ))}
              <li><button onClick={() => onNavigate('contact')} className="hover:text-arwin-burgundy transition-colors text-left">Private Consultations</button></li>
              <li><button onClick={() => onNavigate('admin')} className="text-neutral-400 hover:text-arwin-burgundy transition-colors text-left inline-flex items-center gap-1"><Lock className="w-2.5 h-2.5" /> CMS Admin Portal</button></li>
            </ul>
          </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 font-sans gap-4">
          <div className="flex items-center gap-3">
            <span>© {currentYear} ARWIN RISE. All Rights Reserved.</span>
            <span>&bull;</span>
            <button onClick={() => onNavigate('admin')} className="text-neutral-400 hover:text-[#771722] transition-colors flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" /> Admin
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#771722] fill-[#771722]" />
            <span>
              by{' '}
              <a
                href="https://primeproportion.art/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-neutral-800 hover:text-[#771722] transition-colors underline underline-offset-2"
              >
                Prime Proportion
              </a>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
