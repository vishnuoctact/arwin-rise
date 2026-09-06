import React, { useState, useEffect } from 'react';
import { 
  Menu,
  PhoneCall
} from 'lucide-react';
import { MobileMenu } from './MobileMenu';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenListProperty: () => void;
  onOpenValuation: () => void;
  onNavigate: (category: string, filter?: string) => void;
  onOpenConnect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenListProperty,
  onOpenValuation,
  onNavigate,
  onOpenConnect
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#181615]/95 backdrop-blur-xl border-b border-[#332E2C] shadow-xl py-3' 
          : 'bg-gradient-to-b from-black/65 via-black/25 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - "Arwin." with Tuscan Sienese Ochre #A67547 dot */}
        <a href="#" className="flex items-center group">
          <span className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Arwin<span className="text-[#A67547]">.</span>
          </span>
        </a>

        {/* Desktop Nav Links: About, Projects, Services, NRI Connect, Contact */}
        <nav className="hidden lg:flex items-center space-x-8 text-[13px] font-medium text-white/90">
          <button 
            onClick={() => scrollToSection('about')}
            className="py-2 hover:text-[#A67547] transition-colors cursor-pointer"
          >
            About
          </button>

          <button
            onClick={() => scrollToSection('signature-projects')}
            className="py-2 hover:text-[#A67547] transition-colors cursor-pointer"
          >
            Projects
          </button>

          <button
            onClick={() => scrollToSection('services-section')}
            className="py-2 hover:text-[#A67547] transition-colors cursor-pointer"
          >
            Services
          </button>

          <button
            onClick={() => scrollToSection('nri-desk')}
            className="py-2 hover:text-[#A67547] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>NRI Connect</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#A67547] animate-pulse" />
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="py-2 hover:text-[#A67547] transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Right Action: "Connect Now" Button in Tuscan Chianti (#6B1416) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConnect}
            className="btn-shine px-5 py-2.5 bg-[#6B1416] hover:bg-[#570E10] text-white font-medium text-xs rounded-lg transition-all shadow-md flex items-center gap-1.5 cursor-pointer border border-[#A67547]/30"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#C8BCA8]" />
            <span>Connect Now</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-lg bg-white/10 text-white lg:hidden hover:bg-white/20 transition-colors ml-2"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={onNavigate}
        onOpenListProperty={onOpenListProperty}
        onOpenValuation={onOpenValuation}
      />
    </header>
  );
};
