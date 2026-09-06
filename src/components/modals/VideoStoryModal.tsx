import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { HERO_DATA } from '../../data/properties';

interface VideoStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoStoryModal: React.FC<VideoStoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const isYouTube = HERO_DATA.videoUrl.includes('youtube.com') || HERO_DATA.videoUrl.includes('youtu.be');

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-black border border-[#C5A880]/50 shadow-2xl rounded-none overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* High-Contrast Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-white/95 text-[#771722] hover:bg-[#771722] hover:text-white border border-[#EAE3DA] shadow-md flex items-center justify-center transition-all z-30 active:scale-95"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          {isYouTube ? (
            <iframe
              src={HERO_DATA.videoUrl}
              title="ARWIN RISE Luxury Residences - Walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <video
              autoPlay
              controls
              playsInline
              src={HERO_DATA.videoUrl}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#120408] border-t border-[#C5A880]/20 flex items-center justify-between text-white/90">
          <div>
            <h4 className="font-serif text-lg text-white font-normal">ARWIN RISE Curated Residences</h4>
            <p className="text-xs text-neutral-400 font-sans">Hyderabad Prime Living & Architecture</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#C5A880]">
            <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
            <span>Private Preview</span>
          </div>
        </div>

      </div>
    </div>
  );
};
