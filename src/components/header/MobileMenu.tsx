import React from 'react';
import { 
  X, 
  PhoneCall, 
  ChevronRight,
  Building2,
  Globe2,
  Briefcase,
  Layers,
  MessageCircle,
  Sparkles
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (category: string, filter?: string) => void;
  onOpenListProperty: () => void;
  onOpenValuation: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  if (!isOpen) return null;

  const handleLinkClick = (sectionId: string) => {
    onClose();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#171717] text-white p-6 overflow-y-auto border-l border-[#2E2E2E] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#2E2E2E]">
            <span className="font-sans font-bold text-2xl text-white tracking-tight">
              Arwin<span className="text-[#911925]">.</span>
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links (About, Projects, Services, NRI Connect, Contact) */}
          <div className="py-6 space-y-2">
            <button
              onClick={() => handleLinkClick('about')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 text-left text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#B89A5A]" />
                <span>About</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>

            <button
              onClick={() => handleLinkClick('signature-projects')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 text-left text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-[#B89A5A]" />
                <span>Projects</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>

            <button
              onClick={() => handleLinkClick('services-section')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 text-left text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-[#B89A5A]" />
                <span>Services</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>

            <button
              onClick={() => handleLinkClick('nri-desk')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 text-left text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe2 className="w-4 h-4 text-[#B89A5A]" />
                <span>NRI Connect</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#B89A5A]/20 text-[#B89A5A] border border-[#B89A5A]/40">Global</span>
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 text-left text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <PhoneCall className="w-4 h-4 text-[#B89A5A]" />
                <span>Contact</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-6 border-t border-[#2E2E2E] space-y-3">
          <a
            href="https://wa.me/918464954321?text=Hello%20Arwin%20Rise%20Concierge,%20I%20would%20like%20to%20connect%20with%20an%20Advisor."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-[#911925] hover:bg-[#7A131D] text-white font-semibold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Connect on WhatsApp</span>
          </a>
          <p className="text-[10px] text-gray-500 text-center">
            TS-RERA Reg. TS/RERA/AGT/2024/0984
          </p>
        </div>
      </div>
    </div>
  );
};
