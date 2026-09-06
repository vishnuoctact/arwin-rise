import React, { useState } from 'react';
import { FeaturedProject } from '../types';
import { 
  MapPin, 
  ShieldCheck, 
  Building, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Download, 
  Play, 
  Layers, 
  Maximize, 
  Calendar, 
  Compass,
  Sparkles,
  Share2,
  MessageCircle,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sendLeadEmail } from '../services/leadService';

interface ProjectLandingPageProps {
  project: FeaturedProject;
  onNavigateHome: () => void;
  onNavigateResidences: () => void;
  onRequestPreview: () => void;
  onWatchVideo?: () => void;
}

export const ProjectLandingPage: React.FC<ProjectLandingPageProps> = ({
  project,
  onNavigateHome,
  onNavigateResidences,
  onRequestPreview,
  onWatchVideo
}) => {
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    selectedUnit: project.floorPlans?.[0]?.type || 'Standard Unit',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [token, setToken] = useState('');

  const currentPlan = project.floorPlans?.[selectedPlanIdx] || {
    type: project.units,
    area: project.carpetArea,
    price: project.priceStarting
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vipToken = 'ARW-PRJ-' + Math.floor(100000 + Math.random() * 900000);
    setToken(vipToken);
    setSubmitted(true);

    // Dispatch lead email to kamalyellapragada@gmail.com
    sendLeadEmail({
      formType: 'Project Site Visit & Brochure',
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      project: project.name,
      location: project.location,
      selectedUnit: formData.selectedUnit,
      notes: formData.notes || 'None',
      vipPassNumber: vipToken
    });

    try {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#C5A880', '#7A1522', '#FAF7F2']
      });
    } catch (e) {}
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#222222]">
      
      {/* 1. Full-Bleed Panoramic Hero */}
      <section className="relative min-h-[640px] sm:min-h-[600px] lg:h-[82vh] lg:max-h-[780px] w-full overflow-hidden flex flex-col justify-end pt-24 sm:pt-28 pb-8 sm:pb-12">
        <div className="absolute inset-0 z-0">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120408] via-[#120408]/70 to-[#120408]/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#120408]/85 via-transparent to-[#120408]/50"></div>
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[10.5px] sm:text-[11px] font-sans text-white/70 uppercase tracking-wider mb-2.5 sm:mb-3">
            <button onClick={onNavigateHome} className="hover:text-[#C5A880] transition-colors">HOME</button>
            <span>/</span>
            <button onClick={onNavigateResidences} className="hover:text-[#C5A880] transition-colors">RESIDENCES</button>
            <span>/</span>
            <span className="text-[#C5A880] font-semibold">{project.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-8">
            <div className="max-w-3xl space-y-2.5 sm:space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#771722] border border-[#C5A880]/40 px-3 py-1 text-[10.5px] sm:text-xs font-sans font-bold tracking-widest text-[#C5A880] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{project.tag}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight leading-tight">
                {project.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/80 font-sans pt-0.5">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A880]" />
                  <span>{project.location}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A880]" />
                  <span>TS RERA: <strong className="text-white font-mono">{project.reraNumber}</strong></span>
                </span>
              </div>
            </div>

            {/* Right Hero Pricing Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-6 text-white min-w-[280px] space-y-2.5 sm:space-y-3 flex-shrink-0">
              <div className="text-[9.5px] sm:text-[10px] font-sans tracking-widest text-[#C5A880] uppercase">
                EXCLUSIVE INVITATION PRICING
              </div>
              <div className="font-sans font-bold text-2xl sm:text-4xl text-white">
                {project.priceStarting}
              </div>
              <div className="text-xs text-white/80 font-sans">
                {project.units} • Ready for Allocation
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={onRequestPreview}
                  className="w-full bg-[#C5A880] hover:bg-[#D4B993] text-[#240A12] py-2.5 sm:py-3 px-5 text-xs font-sans font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>REQUEST VIP VIEWING</span>
                  <ArrowRight className="w-4 h-4 text-[#240A12]" />
                </button>
                
                <button
                  onClick={onRequestPreview}
                  className="w-full border border-white/40 hover:bg-white/10 text-white py-2.5 px-4 text-xs font-sans font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>DIGITAL DOSSIER & PLANS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Specs Bar */}
      <section className="bg-white border-y border-[#EAE3DA] py-6 relative z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-[#EAE3DA]">
            <div className="md:px-6 first:pl-0 space-y-1">
              <div className="text-[10px] font-sans font-bold tracking-widest text-[#C5A880] uppercase">TYPOLOGIES</div>
              <div className="font-serif text-lg text-[#222222] font-semibold">{project.units}</div>
              <div className="text-[11px] text-neutral-500 font-sans">Vastu Compliant</div>
            </div>

            <div className="pt-4 md:pt-0 md:px-6 space-y-1">
              <div className="text-[10px] font-sans font-bold tracking-widest text-[#C5A880] uppercase">CARPET / BUILT-UP</div>
              <div className="font-serif text-lg text-[#222222] font-semibold">{project.carpetArea}</div>
              <div className="text-[11px] text-neutral-500 font-sans">Spacious Layouts</div>
            </div>

            <div className="pt-4 md:pt-0 md:px-6 space-y-1">
              <div className="text-[10px] font-sans font-bold tracking-widest text-[#C5A880] uppercase">LOCATION CORRIDOR</div>
              <div className="font-serif text-lg text-[#222222] font-semibold">{project.location.split(',')[0]}</div>
              <div className="text-[11px] text-neutral-500 font-sans">Prime Connectivity</div>
            </div>

            <div className="pt-4 md:pt-0 md:px-6 space-y-1">
              <div className="text-[10px] font-sans font-bold tracking-widest text-[#C5A880] uppercase">REGULATORY STATUS</div>
              <div className="font-serif text-lg text-[#222222] font-semibold">100% RERA Approved</div>
              <div className="text-[11px] text-neutral-500 font-sans">Clear Title Property</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Narrative & Floor Plans */}
      <section className="py-14 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left 8 Cols: Overview, Amenities & Floor Plans */}
          <div className="lg:col-span-8 space-y-14">
            
            {/* Overview */}
            <div className="space-y-4">
              <div className="text-[10px] font-sans font-semibold tracking-[0.24em] text-[#C5A880] uppercase">
                THE RESIDENTIAL EXPERIENCE
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#222222] font-normal">
                Architectural Distinction & Lifestyle
              </h2>
              <p className="text-base text-neutral-700 leading-relaxed font-sans font-light">
                {project.description}
              </p>
            </div>

            {/* Curated Amenities */}
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-[#222222] font-normal border-b border-[#EAE3DA] pb-3">
                Signature Amenities & Privileges
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-white border border-[#EAE3DA]">
                    <CheckCircle2 className="w-5 h-5 text-[#C5A880] flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-sans font-medium text-[#333333]">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Floor Plans */}
            {project.floorPlans && project.floorPlans.length > 0 && (
              <div className="space-y-6 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE3DA] pb-3">
                  <h3 className="font-serif text-2xl text-[#222222] font-normal">
                    Curated Floor Plans & Configurations
                  </h3>
                  <span className="text-xs text-neutral-500 font-sans">Select layout to inspect pricing</span>
                </div>

                {/* Plan Selector Tabs */}
                <div className="flex flex-wrap gap-2">
                  {project.floorPlans.map((plan, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPlanIdx(idx)}
                      className={`px-4 py-2.5 text-xs font-sans font-semibold tracking-wider transition-all ${
                        selectedPlanIdx === idx
                          ? 'bg-[#771722] text-[#C5A880] shadow-sm'
                          : 'bg-white border border-[#EAE3DA] text-neutral-600 hover:bg-[#FAF7F2]'
                      }`}
                    >
                      {plan.type}
                    </button>
                  ))}
                </div>

                {/* Selected Plan Details Card */}
                <div className="bg-white border border-[#EAE3DA] p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0EBE1] pb-6">
                    <div>
                      <div className="text-[10px] font-sans uppercase text-[#C5A880] font-bold tracking-widest">SELECTED CONFIGURATION</div>
                      <h4 className="font-serif text-2xl text-[#222222] font-semibold mt-0.5">{currentPlan.type}</h4>
                      <p className="text-xs text-neutral-500 font-sans mt-0.5">Carpet / Built-up Area: <strong className="text-neutral-800 font-mono">{currentPlan.area}</strong></p>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="text-[10px] font-sans uppercase text-neutral-400 font-bold tracking-widest">STARTING INVITATION</div>
                      <div className="font-serif text-2xl font-bold text-[#771722] mt-0.5">{currentPlan.price}</div>
                    </div>
                  </div>

                  {/* Floor Plan Blueprint Diagram */}
                  <div className="aspect-[16/9] w-full bg-[#FAF7F2] border border-dashed border-[#C5A880]/40 flex flex-col items-center justify-center p-6 text-center space-y-2">
                    <Layers className="w-10 h-10 text-[#C5A880]/60" />
                    <div className="font-serif text-lg text-[#222222]">Architectural Blueprint & Layout Map</div>
                    <p className="text-xs text-neutral-500 max-w-sm">
                      Detailed high-resolution CAD schematics and structural dimensions are available exclusively upon private registration.
                    </p>
                    <button
                      onClick={onRequestPreview}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-sans font-bold tracking-widest text-[#771722] hover:text-[#7A213D] uppercase border-b border-[#771722] pb-0.5"
                    >
                      <Download className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>DOWNLOAD HIGH-RES SCHEMATICS (PDF)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right 4 Cols: VIP Booking / Consultation Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white border border-[#EAE3DA] p-6 sm:p-8 shadow-md space-y-6">
              
              <div className="border-b border-[#F0EBE1] pb-4">
                <div className="text-[10px] font-sans font-bold tracking-[0.24em] text-[#C5A880] uppercase">
                  CONFIDENTIAL INQUIRY
                </div>
                <h3 className="font-serif text-2xl text-[#222222] font-normal mt-1">
                  Schedule Private Viewing
                </h3>
                <p className="text-xs text-neutral-600 font-sans mt-1">
                  Direct consultation with ARWIN RISE Senior Managing Director.
                </p>
              </div>

              {submitted ? (
                <div className="bg-[#FAF7F2] border border-[#C5A880]/50 p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl text-[#222222]">Viewing Request Confirmed</h4>
                  <p className="text-xs text-neutral-600 font-sans">
                    Your confidential token is: <strong className="font-mono text-[#771722]">{token}</strong>. Our Private Advisory Desk will reach out within 2 hours.
                  </p>
                  <a
                    href="https://wa.me/918464954321"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 px-4 text-xs font-sans font-bold tracking-wider uppercase transition-colors"
                  >
                    CHAT ON WHATSAPP (+91 84649 54321)
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-sans uppercase font-bold text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3DA] text-xs font-sans text-[#222222] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans uppercase font-bold text-neutral-700 mb-1">
                      Phone Number (with country code) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 84649 54321"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3DA] text-xs font-sans text-[#222222] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans uppercase font-bold text-neutral-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3DA] text-xs font-sans text-[#222222] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans uppercase font-bold text-neutral-700 mb-1">
                      Preferred Configuration
                    </label>
                    <select
                      value={formData.selectedUnit}
                      onChange={(e) => setFormData({ ...formData, selectedUnit: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3DA] text-xs font-sans text-[#222222] focus:outline-none focus:border-[#C5A880]"
                    >
                      {project.floorPlans?.map((p, i) => (
                        <option key={i} value={p.type}>{p.type} ({p.price})</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#771722] hover:bg-[#8E1E2C] text-white py-3.5 px-6 text-xs font-sans font-bold tracking-widest uppercase transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>CONFIRM PRIVATE VIEWING</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                  </button>

                  <div className="pt-2 text-center text-[10px] text-neutral-500 font-sans flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Strict Client Confidentiality Guaranteed</span>
                  </div>
                </form>
              )}

              {/* Direct Hotline */}
              <div className="pt-4 border-t border-[#F0EBE1] text-xs text-neutral-600 font-sans space-y-2">
                <a 
                  href="https://wa.me/918464954321?text=Hello%20Arwin%20Rise,%20I%20would%20like%20to%20inquire%20about%20a%20private%20residence%20viewing."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#771722] transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span>WhatsApp Advisory: <span className="font-bold text-[#771722] underline">Chat on WhatsApp</span></span>
                </a>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                  <span>Email: <a href="mailto:concierge@arwinrise.com" className="font-bold text-[#771722] hover:underline">concierge@arwinrise.com</a></span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
