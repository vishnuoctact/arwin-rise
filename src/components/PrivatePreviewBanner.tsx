import React from 'react';
import { Key, ArrowRight } from 'lucide-react';

interface PrivatePreviewBannerProps {
  onRequestPreview: () => void;
}

export const PrivatePreviewBanner: React.FC<PrivatePreviewBannerProps> = ({ onRequestPreview }) => {
  return (
    <section className="bg-[#771722] text-white py-7 lg:py-8 border-t border-[#C5A880]/30 shadow-md relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left Title with Key Emblem */}
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full border border-[#C5A880]/60 bg-[#3B0E1B] flex items-center justify-center flex-shrink-0">
              <Key className="w-5 h-5 text-[#C5A880] -rotate-45" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal leading-snug">
                Private Previews. <br />
                Exceptional Access.
              </h3>
            </div>
          </div>

          {/* Middle Explanatory Text */}
          <div className="lg:border-l lg:border-white/20 lg:pl-6 max-w-md text-center lg:text-left">
            <p className="text-[11px] sm:text-xs text-white/85 font-sans leading-relaxed">
              Be among the first to experience our upcoming launches, exclusive inventories and special investor sessions.
            </p>
          </div>

          {/* Right Action Button in Champagne Gold */}
          <div className="flex-shrink-0">
            <button
              onClick={onRequestPreview}
              className="group inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#D4B993] text-[#2D1B22] px-5 py-2.5 text-[10.5px] font-sans font-bold tracking-[0.14em] uppercase rounded-sm shadow-sm transition-all duration-200"
            >
              <span>REQUEST PRIVATE PREVIEW</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#771722] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
