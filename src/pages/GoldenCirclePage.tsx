import React, { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Users, 
  TrendingUp, 
  Lock,
  Crown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { sendLeadEmail } from '../services/leadService';

interface GoldenCirclePageProps {
  onRequestPreview: () => void;
  onNavigateHome: () => void;
}

export const GoldenCirclePage: React.FC<GoldenCirclePageProps> = ({
  onRequestPreview,
  onNavigateHome
}) => {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    allocationScale: '₹ 3 Cr – ₹ 10 Cr',
    investmentFocus: 'Pre-Launch Luxury Residences',
    city: 'Hyderabad',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Please fill in all required fields to submit.');
      return;
    }

    setSubmitting(true);
    setError('');
    const genId = 'GC-' + Math.floor(100000 + Math.random() * 900000);
    setApplicationId(genId);

    try {
      await sendLeadEmail({
        formType: 'Golden Circle Membership Application',
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        notes: `Application ID: ${genId} | Allocation Band: ${formData.allocationScale} | Focus: ${formData.investmentFocus} | City: ${formData.city} | Message: ${formData.message || 'None'}`
      });
      setSubmitted(true);
      setSubmitting(false);
    } catch {
      setSubmitted(true);
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById('golden-circle-apply-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Page Hero */}
      <PageHero
        tag="AN ARWIN RISE PRIVATE SYNDICATE · EXCLUSIVE MEMBERSHIP"
        title="The Golden Circle: The Elite Investor Syndicate & Private Wealth Club"
        subtitle="An invitation-only alliance of High-Net-Worth Individuals, Family Offices, and Global NRI Visionaries gaining preferential access to institutional-grade luxury real estate opportunities."
        breadcrumbs={['Golden Circle', 'Club Membership']}
        onNavigateHome={onNavigateHome}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-16 lg:space-y-24">
        
        {/* ============================================================ */}
        {/* SECTION 1: HERO SPOTLIGHT (The Syndicate & Mission Split) */}
        {/* ============================================================ */}
        <div className="bg-white border border-[#EAE3DA] p-8 sm:p-12 lg:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Narrative */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-[1.5px] bg-[#771722]" />
                <span className="text-[11.5px] font-sans font-bold tracking-[0.22em] text-[#771722] uppercase">
                  THE PRIVATE SYNDICATE
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#141210] font-normal leading-[1.18] tracking-tight">
                Privileged Access. Collective Scale. Institutional Due Diligence.
              </h2>

              <p className="text-sm sm:text-[15px] font-sans text-[#55504A] leading-relaxed font-light">
                <strong className="font-medium text-[#141210]">The Golden Circle</strong> is an ultra-exclusive membership club powered by ARWIN RISE, engineered specifically for sophisticated investors seeking extraordinary real estate returns without public market friction.
              </p>

              <p className="text-sm sm:text-[15px] font-sans text-[#55504A] leading-relaxed font-light">
                Members gain early-look privileges to developer insider tranches, off-market sovereign land parcels, and curated co-investment syndicates across Hyderabad’s most lucrative micro-markets (Neopolis, Financial District, Mokila, Shankarpally) and international hubs like Dubai.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] px-6 py-3 text-xs font-sans font-semibold tracking-[0.16em] uppercase shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <span>APPLY FOR MEMBERSHIP</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </button>
                <button
                  onClick={onRequestPreview}
                  className="inline-flex items-center gap-2 border border-[#C5A880] text-[#771722] hover:bg-[#C5A880]/10 px-5 py-3 text-xs font-sans font-semibold tracking-[0.16em] uppercase transition-all duration-200 cursor-pointer"
                >
                  <Crown className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>REQUEST SYNDICATE BRIEFING</span>
                </button>
              </div>
            </motion.div>

            {/* Right Hero Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-[4/3] overflow-hidden rounded-none shadow-2xl border-2 border-[#EAE3DA] group">
                <img
                  src="/images/golden-circle-hero.jpg"
                  alt="Golden Circle Elite Investor Boardroom"
                  className="w-full h-full object-cover object-center filter brightness-[1.01] transition-transform duration-700 group-hover:scale-103"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/villa-triplex-interior.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 bg-[#141210]/90 backdrop-blur-xs p-3 border border-[#C5A880]/40 text-white">
                  <div className="flex items-center gap-2 text-[#C5A880] text-[10px] font-sans font-bold tracking-[0.2em] uppercase">
                    <Crown className="w-3 h-3" />
                    <span>INVITATION ONLY · PRIVATE SYNDICATE</span>
                  </div>
                  <div className="text-xs font-serif text-neutral-200 mt-0.5">
                    Powered by ARWIN RISE Senior Advisory Desk
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 2: FOUR STRATEGIC ADVANTAGES */}
        {/* ============================================================ */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#771722]/10 text-[#771722] text-[10px] font-sans font-bold tracking-[0.24em] uppercase">
              <span>MEMBERSHIP PRIVILEGES</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] text-[#141210] font-normal leading-tight">
              Four Pillars of The Golden Circle Advantage
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#666058] leading-relaxed">
              Curated for discerning investors who demand alpha generation, rigorous safety, and privileged market timing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Advantage 1 */}
            <div className="bg-white border border-[#EAE3DA] p-6 sm:p-7 hover:border-[#C5A880] transition-colors space-y-4 shadow-xs">
              <div className="w-11 h-11 bg-[#FAF7F2] border border-[#EAE3DA] flex items-center justify-center text-[#771722]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#141210] font-normal">
                Off-Market Allocations
              </h3>
              <p className="text-xs sm:text-[13px] font-sans text-[#55504A] leading-relaxed font-light">
                First-look rights to pre-launch allocations, trophy penthouses, and developer insider tranches with institutional entry valuation advantages.
              </p>
            </div>

            {/* Advantage 2 */}
            <div className="bg-white border border-[#EAE3DA] p-6 sm:p-7 hover:border-[#C5A880] transition-colors space-y-4 shadow-xs">
              <div className="w-11 h-11 bg-[#FAF7F2] border border-[#EAE3DA] flex items-center justify-center text-[#771722]">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#141210] font-normal">
                Syndicated Scale & Land
              </h3>
              <p className="text-xs sm:text-[13px] font-sans text-[#55504A] leading-relaxed font-light">
                Co-invest alongside trusted HNIs and sovereign syndicates in high-yield commercial assets and strategic land parcels with high capital multipliers.
              </p>
            </div>

            {/* Advantage 3 */}
            <div className="bg-white border border-[#EAE3DA] p-6 sm:p-7 hover:border-[#C5A880] transition-colors space-y-4 shadow-xs">
              <div className="w-11 h-11 bg-[#FAF7F2] border border-[#EAE3DA] flex items-center justify-center text-[#771722]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#141210] font-normal">
                Forensic Due Diligence
              </h3>
              <p className="text-xs sm:text-[13px] font-sans text-[#55504A] leading-relaxed font-light">
                Every opportunity undergoes comprehensive 30+ year legal title searches, RERA audits, and developer financial health diagnostics.
              </p>
            </div>

            {/* Advantage 4 */}
            <div className="bg-white border border-[#EAE3DA] p-6 sm:p-7 hover:border-[#C5A880] transition-colors space-y-4 shadow-xs">
              <div className="w-11 h-11 bg-[#FAF7F2] border border-[#EAE3DA] flex items-center justify-center text-[#771722]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#141210] font-normal">
                Closed-Door Alpha Briefings
              </h3>
              <p className="text-xs sm:text-[13px] font-sans text-[#55504A] leading-relaxed font-light">
                Quarterly boardroom intelligence on micro-market infrastructure developments, zoning masterplans, and optimal exit timing windows.
              </p>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 3: SYNDICATE ROUNDTABLE & BENCHMARKS */}
        {/* ============================================================ */}
        <div className="bg-white border border-[#EAE3DA] p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Image */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] overflow-hidden rounded-none shadow-xl border-2 border-[#EAE3DA] group">
                <img
                  src="/images/golden-circle-syndicate.jpg"
                  alt="Golden Circle Private Syndicate Roundtable"
                  className="w-full h-full object-cover object-center filter brightness-[1.01] transition-transform duration-700 group-hover:scale-103"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/skyscape-hero.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 bg-[#771722] text-[#FAF7F2] px-3 py-1 text-[9.5px] font-sans font-bold tracking-[0.2em] uppercase">
                  CONFIDENTIAL SYNDICATE LOUNGE
                </div>
              </div>
            </div>

            {/* Right Syndicate Content */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-5 h-[1.5px] bg-[#771722]" />
                <span className="text-[11.5px] font-sans font-bold tracking-[0.22em] text-[#771722] uppercase">
                  INVESTMENT CRITERIA & SELECTION
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] text-[#141210] font-normal leading-tight">
                Disciplined Portfolio Construction for Serious Capital
              </h2>

              <p className="text-sm font-sans text-[#55504A] leading-relaxed font-light">
                Membership in The Golden Circle is by invitation or member nomination. We accept a restricted number of patrons each quarter to maintain high-touch advisory focus, absolute discretion, and direct access to Senior Managing Leadership.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#FAF7F2] border border-[#EAE3DA] space-y-1">
                  <div className="text-[11px] font-sans font-bold text-[#771722] uppercase tracking-wider">
                    Target IRR Benchmark
                  </div>
                  <div className="font-serif text-2xl text-[#141210]">
                    18% — 26% p.a.
                  </div>
                  <div className="text-[11px] font-sans text-[#777068]">
                    Blended capital appreciation & yield
                  </div>
                </div>

                <div className="p-4 bg-[#FAF7F2] border border-[#EAE3DA] space-y-1">
                  <div className="text-[11px] font-sans font-bold text-[#771722] uppercase tracking-wider">
                    Allocation Caliber
                  </div>
                  <div className="font-serif text-2xl text-[#141210]">
                    ₹ 1.5 Cr — ₹ 50 Cr+
                  </div>
                  <div className="text-[11px] font-sans text-[#777068]">
                    Individual or Syndicated tranches
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 4: APPLICATION FORM */}
        {/* ============================================================ */}
        <div id="golden-circle-apply-form" className="bg-[#141210] text-[#FAF7F2] p-8 sm:p-12 lg:p-14 border border-[#C5A880]/30 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Background Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-[#C5A880]/15 via-[#771722]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            {!submitted ? (
              <div className="space-y-8">
                
                {/* Form Header */}
                <div className="text-center space-y-2.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-transparent border border-[#C5A880] text-[#C5A880] text-[9.5px] font-sans font-semibold tracking-[0.24em] uppercase">
                    <Lock className="w-3 h-3 text-[#C5A880]" />
                    <span>CONFIDENTIAL MEMBERSHIP APPLICATION</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-[36px] text-white font-normal leading-tight">
                    Request Golden Circle Membership
                  </h2>

                  <p className="text-xs sm:text-sm font-sans text-neutral-300 leading-relaxed max-w-xl mx-auto font-light">
                    Submit your credentials below for review by our Senior Advisory Committee. Approved patrons will receive an invitation to an exclusive introductory briefing.
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-900/40 border border-red-500/50 text-red-200 text-xs text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    
                    {/* Full Name */}
                    <div>
                      <label className="block text-[10.5px] font-sans font-semibold tracking-wider text-[#C5A880] uppercase mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Vikramaditya Reddy"
                        className="w-full px-4 py-3 bg-white/5 border border-white/15 focus:border-[#C5A880] text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Private Email */}
                    <div>
                      <label className="block text-[10.5px] font-sans font-semibold tracking-wider text-[#C5A880] uppercase mb-1.5">
                        Private Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. vikram@familyoffice.com"
                        className="w-full px-4 py-3 bg-white/5 border border-white/15 focus:border-[#C5A880] text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Mobile / WhatsApp */}
                    <div>
                      <label className="block text-[10.5px] font-sans font-semibold tracking-wider text-[#C5A880] uppercase mb-1.5">
                        Mobile / WhatsApp (with Country Code) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210 / +1 415..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/15 focus:border-[#C5A880] text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* City / Country */}
                    <div>
                      <label className="block text-[10.5px] font-sans font-semibold tracking-wider text-[#C5A880] uppercase mb-1.5">
                        Current City & Base
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Hyderabad / Dubai / Bay Area"
                        className="w-full px-4 py-3 bg-white/5 border border-white/15 focus:border-[#C5A880] text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Allocation Scale */}
                    <div>
                      <label className="block text-[10.5px] font-sans font-semibold tracking-wider text-[#C5A880] uppercase mb-1.5">
                        Anticipated Capital Allocation Band
                      </label>
                      <select
                        value={formData.allocationScale}
                        onChange={(e) => setFormData({ ...formData, allocationScale: e.target.value })}
                        className="w-full px-4 py-3 bg-[#1F1C1A] border border-white/15 focus:border-[#C5A880] text-sm text-white focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="₹ 1.5 Cr – ₹ 3 Cr">₹ 1.5 Cr – ₹ 3 Cr (Signature Tier)</option>
                        <option value="₹ 3 Cr – ₹ 10 Cr">₹ 3 Cr – ₹ 10 Cr (Luxury & High Growth)</option>
                        <option value="₹ 10 Cr – ₹ 25 Cr">₹ 10 Cr – ₹ 25 Cr (Private Trophy Asset)</option>
                        <option value="₹ 25 Cr – ₹ 50 Cr+">₹ 25 Cr – ₹ 50 Cr+ (Institutional / Sovereign Scale)</option>
                      </select>
                    </div>

                    {/* Investment Focus */}
                    <div>
                      <label className="block text-[10.5px] font-sans font-semibold tracking-wider text-[#C5A880] uppercase mb-1.5">
                        Primary Asset Class Interest
                      </label>
                      <select
                        value={formData.investmentFocus}
                        onChange={(e) => setFormData({ ...formData, investmentFocus: e.target.value })}
                        className="w-full px-4 py-3 bg-[#1F1C1A] border border-white/15 focus:border-[#C5A880] text-sm text-white focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Pre-Launch Luxury Residences">Pre-Launch Luxury Residences (High Alpha)</option>
                        <option value="High-Yield Commercial / Retail">High-Yield Commercial & Office Suites</option>
                        <option value="Strategic Land Parcels & Farm Communities">Strategic Land Parcels & Gated Farm Communities</option>
                        <option value="Dubai / Global Marquee Portfolios">Dubai & International Marquee Portfolios</option>
                      </select>
                    </div>

                  </div>

                  {/* Optional Message */}
                  <div>
                    <label className="block text-[10.5px] font-sans font-semibold tracking-wider text-[#C5A880] uppercase mb-1.5">
                      Specific Advisory Objectives (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share any preferred corridors (Neopolis, Kollur, Mokila, Dubai) or specific timeline expectations..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/15 focus:border-[#C5A880] text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Submission Row */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-[11px] font-sans text-neutral-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>100% Confidential Fiduciary Review · Strict NDA Compliance</span>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#C5A880] hover:bg-[#D4B993] text-[#141210] font-sans font-bold px-8 py-3.5 text-xs tracking-[0.16em] uppercase transition-all shadow-md cursor-pointer disabled:opacity-50"
                    >
                      <span>{submitting ? 'PROCESSING APPLICATION...' : 'SUBMIT MEMBERSHIP APPLICATION'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#141210]" />
                    </button>
                  </div>
                </form>

              </div>
            ) : (
              /* Success Confirmation View */
              <div className="text-center py-8 space-y-5">
                <div className="w-14 h-14 bg-[#C5A880]/20 rounded-full flex items-center justify-center mx-auto border border-[#C5A880]/40 text-[#C5A880]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-sans font-bold tracking-[0.24em] text-[#C5A880] uppercase">
                    APPLICATION RECEIVED
                  </div>
                  <h3 className="font-serif text-3xl text-white">
                    Thank You, {formData.fullName}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed max-w-lg mx-auto font-light">
                    Your Golden Circle membership application has been prioritized with the ARWIN RISE Senior Advisory Committee. Our Managing Partner will contact you via WhatsApp / Phone to schedule your confidential introductory briefing.
                  </p>
                </div>

                <div className="bg-black/40 border border-white/15 p-3.5 max-w-xs mx-auto">
                  <span className="text-[9px] font-sans text-neutral-400 uppercase tracking-widest block">MEMBERSHIP DOSSIER NUMBER</span>
                  <span className="font-mono text-base font-bold text-[#C5A880] tracking-widest">{applicationId}</span>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-block text-xs font-sans font-semibold text-[#C5A880] hover:text-white underline tracking-wider pt-2"
                >
                  Submit another application
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 5: DIRECT SENIOR DESK CONTACT */}
        {/* ============================================================ */}
        <div className="bg-white border border-[#EAE3DA] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-[10.5px] font-sans font-bold text-[#771722] tracking-[0.2em] uppercase">
              DIRECT DESK ASSISTANCE
            </div>
            <h4 className="font-serif text-lg text-[#141210]">
              Need Immediate Strategy or Confidential Due Diligence?
            </h4>
            <p className="text-xs text-[#666058] font-sans">
              Connect directly with our Managing Desk via WhatsApp or telephone.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="https://wa.me/918464954321?text=Hello%20Arwin%20Rise%2C%20I%20would%20like%20to%20inquire%20about%20The%20Golden%20Circle%20Investor%20Syndicate."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#771722] hover:bg-[#8E1E2C] text-white px-5 py-3 text-xs font-sans font-bold tracking-wider uppercase transition-all shadow-xs cursor-pointer"
            >
              <span>WHATSAPP SELLER & INVESTOR DESK</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
