import React from 'react';

interface FloatingRoiButtonProps {
  onClick: () => void;
}

export const FloatingRoiButton: React.FC<FloatingRoiButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-[999] pointer-events-auto flex items-center justify-center">
      <button
        onClick={onClick}
        type="button"
        aria-label="Open ROI Calculator"
        className="flex items-center justify-center bg-[#771722] active:bg-[#5C111A] hover:bg-[#8E1E2C] text-white border border-[#C5A880] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.35)] active:scale-95 hover:scale-105 transition-transform duration-150 cursor-pointer select-none outline-none focus:outline-none"
      >
        <span className="font-sans font-bold text-[10.5px] sm:text-[11px] tracking-[0.14em] uppercase text-white whitespace-nowrap">
          ROI CALCULATOR
        </span>
      </button>
    </div>
  );
};
