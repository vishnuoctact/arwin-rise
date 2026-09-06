import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { CollectionTier, FeaturedProject } from '../../types';

interface PropertyDetailModalProps {
  isOpen: boolean;
  collectionData: CollectionTier | null;
  projectData: FeaturedProject | null;
  onClose: () => void;
  onBookPreview: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  isOpen,
  collectionData,
  projectData,
  onClose,
  onBookPreview
}) => {
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);

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

  if (!isOpen || (!collectionData && !projectData)) return null;

  const title = projectData ? projectData.name : collectionData?.title;
  const subtitle = projectData ? projectData.location : collectionData?.subtitle;
  const price = projectData ? projectData.priceStarting : collectionData?.priceRange;
  const image = projectData ? projectData.image : collectionData?.image;
  const amenitiesList = projectData ? projectData.amenities : (collectionData?.amenities || []);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-3 sm:p-6 flex items-start sm:items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-[#FAF7F2] border border-[#C5A880]/50 shadow-2xl rounded-none overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#C5A880] via-[#7A1522] to-[#C5A880] flex-shrink-0"></div>

        {/* Floating High-Contrast Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-white/95 text-[#771722] hover:bg-[#771722] hover:text-white border border-[#EAE3DA] shadow-md flex items-center justify-center transition-all z-30 active:scale-95"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Banner */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-neutral-900">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover filter brightness-[1.01]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 text-white">
              <div className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#C5A880] uppercase">
                {subtitle}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight mt-0.5">
                {title}
              </h2>
              <div className="text-sm sm:text-base font-serif text-[#C5A880] font-semibold mt-1">
                {price}
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8 space-y-6">
            {/* Project Overview */}
            {projectData && (
              <div className="space-y-2">
                <h4 className="text-xs font-sans font-bold tracking-wider uppercase text-neutral-800">
                  Architectural Overview
                </h4>
                <p className="text-xs sm:text-[13px] text-neutral-600 font-sans leading-relaxed">
                  {projectData.description}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-[#771722] font-semibold pt-1">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>TS RERA Registration: {projectData.reraNumber}</span>
                </div>
              </div>
            )}

            {/* Collection Specs Highlights */}
            {collectionData?.highlights && (
              <div className="space-y-3">
                <h4 className="text-xs font-sans font-bold tracking-wider uppercase text-neutral-800">
                  Signature Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {collectionData.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-600 bg-white p-3 border border-[#EAE3DA]">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Collection Micro-Market Locations */}
            {collectionData?.specs?.locations && (
              <div className="space-y-2.5">
                <h4 className="text-xs font-sans font-bold tracking-wider uppercase text-neutral-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#771722]" />
                  <span>Prime Micro-Market Locations</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {collectionData.specs.locations.map((loc, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#EAE3DA] text-xs font-medium text-neutral-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#771722]"></span>
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Collection Key Specs */}
            {collectionData?.specs && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="bg-white p-3 border border-[#EAE3DA]">
                  <div className="text-[10px] font-sans font-semibold tracking-wider text-neutral-400 uppercase">TYPOLOGY</div>
                  <div className="text-xs font-bold text-neutral-800 mt-0.5">{collectionData.specs.typology}</div>
                </div>
                <div className="bg-white p-3 border border-[#EAE3DA]">
                  <div className="text-[10px] font-sans font-semibold tracking-wider text-neutral-400 uppercase">UNIT SIZES</div>
                  <div className="text-xs font-bold text-neutral-800 mt-0.5">{collectionData.specs.size}</div>
                </div>
                <div className="bg-white p-3 border border-[#EAE3DA]">
                  <div className="text-[10px] font-sans font-semibold tracking-wider text-neutral-400 uppercase">STATUS / RERA</div>
                  <div className="text-xs font-bold text-[#771722] mt-0.5">{collectionData.specs.possession}</div>
                </div>
              </div>
            )}

            {/* Floor Plans Switcher (If Project Data) */}
            {projectData?.floorPlans && (
              <div className="space-y-3">
                <h4 className="text-xs font-sans font-bold tracking-wider uppercase text-neutral-800">
                  Curated Configurations & Floor Plans
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {projectData.floorPlans.map((plan, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPlanIdx(idx)}
                      className={`p-3 text-left border rounded-none transition-all ${
                        selectedPlanIdx === idx
                          ? 'border-[#771722] bg-[#771722]/5 shadow-xs'
                          : 'border-[#EAE3DA] bg-white hover:border-[#C5A880]'
                      }`}
                    >
                      <div className="text-xs font-semibold text-[#222222]">{plan.type}</div>
                      <div className="text-[11px] text-neutral-500 font-sans mt-0.5">{plan.area}</div>
                      <div className="text-xs font-serif text-[#771722] font-bold mt-1">{plan.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities Grid */}
            {amenitiesList.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-sans font-bold tracking-wider uppercase text-neutral-800">
                  World-Class Amenities & Privileges
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {amenitiesList.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-white border border-[#EAE3DA] text-xs text-neutral-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></div>
                      <span className="truncate">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#EAE3DA] flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="text-xs text-neutral-500 text-center sm:text-left">
                Strictly confidential allocation. Private preview by appointment.
              </div>
              <button
                onClick={onBookPreview}
                className="w-full sm:w-auto bg-[#771722] hover:bg-[#8E1E2C] text-white px-6 py-3 text-xs font-sans font-semibold tracking-[0.18em] uppercase rounded-none shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>REQUEST PRIVATE PREVIEW</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
