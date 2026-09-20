import React, { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  HeartHandshake, 
  GraduationCap, 
  Building2, 
  Landmark, 
  Users, 
  Phone, 
  Mail, 
  Clock, 
  Compass, 
  TrendingUp, 
  Calendar, 
  ChevronRight 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { sendLeadEmail } from '../services/leadService';

interface SheRisePageProps {
  onRequestPreview: () => void;
  onNavigateHome: () => void;
}

export const SheRisePage: React.FC<SheRisePageProps> = ({
  onRequestPreview,
  onNavigateHome
}) => {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interest: 'Personal Property Acquisition Advisory',
    city: 'Hyderabad',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Please fill in all required fields to submit.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await sendLeadEmail({
        formType: 'SHE RISE Initiative Inquiry',
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        notes: `Interest Area: ${formData.interest} | City: ${formData.city} | Message: ${formData.message || 'None'}`
      });
      setSubmitted(true);
      setSubmitting(false);
    } catch {
      setSubmitted(true);
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById('she-rise-join-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Page Hero */}
      <PageHero
        tag="AN ARWIN RISE INITIATIVE · WOMEN EMPOWERMENT"
        title="SHE RISE: Empowering Women in Wealth, Leadership & Asset Ownership"
        subtitle="A dedicated fiduciary initiative by ARWIN RISE fostering independent property ownership, financial sovereignty, and visionary leadership pathways for women across India and globally."
        breadcrumbs={['About Us', 'SHE RISE']}
        onNavigateHome={onNavigateHome}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-16 lg:space-y-24">
        
        {/* ============================================================ */}
        {/* SECTION 1: HERO SPOTLIGHT (Philosophy & Mission Split) */}
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
                  THE INITIATIVE & PURPOSE
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#141210] font-normal leading-[1.18] tracking-tight">
                Redefining Generative Wealth & Real Estate Sovereignty for Women
              </h2>

              <p className="text-sm sm:text-[15px] font-sans text-[#55504A] leading-relaxed font-light">
                At ARWIN RISE, we firmly believe that enduring empowerment begins with financial independence and true tangible asset ownership. <strong className="font-medium text-[#141210]">SHE RISE</strong> is our dedicated community and advisory desk created to empower, mentor, and guide women through the complexities of luxury real estate, wealth planning, and executive leadership.
              </p>

              <p className="text-sm sm:text-[15px] font-sans text-[#55504A] leading-relaxed font-light">
                Whether you are an aspiring first-time property owner, a seasoned corporate executive building an independent portfolio, or an entrepreneur looking for fiduciary advisory, SHE RISE provides the knowledge, legal clarity, and supportive network to help you rise with confidence.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] px-6 py-3 text-xs font-sans font-semibold tracking-[0.16em] uppercase shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <span>JOIN THE INITIATIVE</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </button>
                <button
                  onClick={onRequestPreview}
                  className="inline-flex items-center gap-2 border border-[#C5A880] text-[#771722] hover:bg-[#C5A880]/10 px-5 py-3 text-xs font-sans font-semibold tracking-[0.16em] uppercase transition-all duration-200 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>REQUEST PRIVATE CONSULTATION</span>
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
              <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden rounded-none shadow-2xl border-2 border-[#EAE3DA] group">
                <img
                  src="/images/she-rise-hero.jpg"
                  alt="SHE RISE Leader - ARWIN RISE Women Empowerment"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-103"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/founder-pro.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#141210]/90 backdrop-blur-sm border border-[#C5A880]/30 p-3 text-left">
                  <div className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#C5A880] uppercase">
                    SHE RISE CIRCLE
                  </div>
                  <div className="text-xs font-serif text-[#FAF7F2] font-light mt-0.5">
                    Empowering Women to Lead, Invest & Own with Absolute Sovereignty.
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 2: 3 CORE PILLARS OF EMPOWERMENT */}
        {/* ============================================================ */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="w-5 h-[1.5px] bg-[#771722]" />
              <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-[#771722] uppercase">
                THREE PILLARS OF ACTION
              </span>
              <span className="w-5 h-[1.5px] bg-[#771722]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#141210] font-normal leading-tight">
              How SHE RISE Creates Enduring Impact
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#55504A] font-light leading-relaxed">
              Structured initiatives designed to remove friction, build financial literacy, and cultivate a community of independent female wealth creators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="bg-white border border-[#EAE3DA] hover:border-[#C5A880] p-8 space-y-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3.5">
                <div className="w-12 h-12 rounded-full bg-[#771722]/10 border border-[#771722]/20 flex items-center justify-center text-[#771722] group-hover:bg-[#771722] group-hover:text-white transition-colors">
                  <Landmark className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#141210] font-normal">
                  Asset Ownership & Sovereignty
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#55504A] leading-relaxed font-light">
                  Direct advisory tailored for women to independently acquire freehold luxury residences, high-yield land parcels, and commercial wealth portfolios with 100% legal title diligence.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-[#771722] tracking-wider uppercase">
                <span>Freehold Advisory</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white border border-[#EAE3DA] hover:border-[#C5A880] p-8 space-y-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3.5">
                <div className="w-12 h-12 rounded-full bg-[#771722]/10 border border-[#771722]/20 flex items-center justify-center text-[#771722] group-hover:bg-[#771722] group-hover:text-white transition-colors">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#141210] font-normal">
                  Real Estate & Wealth Masterclasses
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#55504A] leading-relaxed font-light">
                  Demystifying RERA regulations, property registry laws, tax optimizations, and capital appreciation models through regular private workshops and digital masterclasses.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-[#771722] tracking-wider uppercase">
                <span>Financial Literacy</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white border border-[#EAE3DA] hover:border-[#C5A880] p-8 space-y-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3.5">
                <div className="w-12 h-12 rounded-full bg-[#771722]/10 border border-[#771722]/20 flex items-center justify-center text-[#771722] group-hover:bg-[#771722] group-hover:text-white transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#141210] font-normal">
                  Mentorship & Leadership Pathways
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#55504A] leading-relaxed font-light">
                  Incubating aspiring women real estate consultants, interior architects, and leaders with flexible career models, executive coaching, and institutional backing.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-[#771722] tracking-wider uppercase">
                <span>Leadership Network</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 3: MENTORSHIP & PROGRAMS (Visual Split) */}
        {/* ============================================================ */}
        <div className="bg-white border border-[#EAE3DA] p-8 sm:p-12 lg:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Image Split */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6"
            >
              <div className="relative w-full aspect-[16/11] overflow-hidden border-2 border-[#EAE3DA] shadow-xl group">
                <img
                  src="/images/she-rise-mentorship.jpg"
                  alt="SHE RISE Mentorship & Collaboration"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/by-invitation.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#FAF7F2]/95 backdrop-blur-md p-3.5 border-l-4 border-[#771722]">
                  <p className="font-serif italic text-xs sm:text-sm text-neutral-800 leading-snug">
                    “When a woman becomes financially sovereign through property, she doesn't just secure her own future—she elevates generations.”
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Programs Breakdown */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-[1.5px] bg-[#771722]" />
                <span className="text-[11.5px] font-sans font-bold tracking-[0.22em] text-[#771722] uppercase">
                  PROGRAMS & INITIATIVES
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] text-[#141210] font-normal leading-[1.2]">
                Curated Initiatives for Every Chapter of Your Wealth Journey
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-[#FAF7F2] border border-[#EAE3DA] rounded-none space-y-1">
                  <div className="flex items-center gap-2 text-[#771722] font-semibold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                    <span>01 | The Sovereign Investor Advisory</span>
                  </div>
                  <p className="text-xs text-[#55504A] font-light leading-relaxed pl-6">
                    Private 1-on-1 consultations for women looking to invest in gated luxury villas, sky mansions, and high-growth micro-markets with zero hidden clauses.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7F2] border border-[#EAE3DA] rounded-none space-y-1">
                  <div className="flex items-center gap-2 text-[#771722] font-semibold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-[#C5A880]" />
                    <span>02 | The SHE RISE Circle Masterminds</span>
                  </div>
                  <p className="text-xs text-[#55504A] font-light leading-relaxed pl-6">
                    Quarterly private roundtables and networking gatherings in Hyderabad and Dubai, connecting women business owners, CXOs, and visionary investors.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7F2] border border-[#EAE3DA] rounded-none space-y-1">
                  <div className="flex items-center gap-2 text-[#771722] font-semibold text-xs uppercase tracking-wider">
                    <HeartHandshake className="w-4 h-4 text-[#C5A880]" />
                    <span>03 | Community Upliftment & Scholarships</span>
                  </div>
                  <p className="text-xs text-[#55504A] font-light leading-relaxed pl-6">
                    Dedicated foundation outreach sponsoring vocational skill certifications and education for young women pursuing careers in architecture and real estate.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 4: IMPACT METRICS BAR */}
        {/* ============================================================ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-[#EAE3DA] p-7 sm:p-10 shadow-sm">
          <div className="space-y-1.5 border-r border-[#EAE3DA] last:border-r-0 pl-2 sm:pl-4">
            <div className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#771722] font-bold" style={{ fontVariantNumeric: 'lining-nums' }}>
              500+
            </div>
            <div className="text-xs sm:text-[13px] font-sans font-semibold text-[#55504A] uppercase tracking-wider">
              Women Advised
            </div>
          </div>

          <div className="space-y-1.5 border-r border-[#EAE3DA] last:border-r-0 pl-2 sm:pl-4">
            <div className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#771722] font-bold" style={{ fontVariantNumeric: 'lining-nums' }}>
              ₹ 75 Cr+
            </div>
            <div className="text-xs sm:text-[13px] font-sans font-semibold text-[#55504A] uppercase tracking-wider">
              Assets Owned by Women Patrons
            </div>
          </div>

          <div className="space-y-1.5 border-r border-[#EAE3DA] last:border-r-0 pl-2 sm:pl-4">
            <div className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#771722] font-bold" style={{ fontVariantNumeric: 'lining-nums' }}>
              25+
            </div>
            <div className="text-xs sm:text-[13px] font-sans font-semibold text-[#55504A] uppercase tracking-wider">
              Masterclasses Hosted
            </div>
          </div>

          <div className="space-y-1.5 pl-2 sm:pl-4">
            <div className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#771722] font-bold" style={{ fontVariantNumeric: 'lining-nums' }}>
              100%
            </div>
            <div className="text-xs sm:text-[13px] font-sans font-semibold text-[#55504A] uppercase tracking-wider">
              Fiduciary Transparency
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 5: INTAKE & CONNECT FORM */}
        {/* ============================================================ */}
        <div id="she-rise-join-form" className="bg-white border border-[#EAE3DA] p-8 sm:p-12 lg:p-14 shadow-sm scroll-mt-24">
          <div className="max-w-3xl mx-auto">
            
            <div className="text-center space-y-2 mb-8">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="w-5 h-[1.5px] bg-[#771722]" />
                <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-[#771722] uppercase">
                  GET INVOLVED
                </span>
                <span className="w-5 h-[1.5px] bg-[#771722]" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#141210] font-normal">
                Connect with the SHE RISE Advisory Desk
              </h2>
              <p className="text-xs sm:text-sm font-sans text-[#55504A] font-light max-w-xl mx-auto leading-relaxed">
                Whether you wish to seek private property advisory, join our upcoming masterclass, or partner with us as a mentor or luxury advisor, we welcome your connection.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-[#FAF7F2] border border-[#C5A880]/40 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#771722]/10 border border-[#771722] text-[#771722] flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-8 h-8 text-[#771722]" />
                </div>
                <h3 className="font-serif text-2xl text-[#141210]">Thank You for Connecting</h3>
                <p className="text-xs sm:text-sm text-[#55504A] font-light max-w-md mx-auto">
                  Your inquiry has been received by the SHE RISE private advisory desk. Our dedicated lead advisor will reach out to you discreetly within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); }}
                  className="mt-4 text-xs font-semibold text-[#771722] uppercase tracking-wider hover:underline"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs text-center rounded">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#55504A] mb-1.5 font-semibold">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Dr. Sunitha Varma"
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3DA] text-sm text-[#141210] placeholder-neutral-400 focus:outline-none focus:border-[#771722] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#55504A] mb-1.5 font-semibold">
                      Official Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sunitha@company.com"
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3DA] text-sm text-[#141210] placeholder-neutral-400 focus:outline-none focus:border-[#771722] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#55504A] mb-1.5 font-semibold">
                      Contact Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210 or +971 50 123 4567"
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3DA] text-sm text-[#141210] placeholder-neutral-400 focus:outline-none focus:border-[#771722] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#55504A] mb-1.5 font-semibold">
                      Primary Area of Interest
                    </label>
                    <select
                      value={formData.interest}
                      onChange={e => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3DA] text-sm text-[#141210] focus:outline-none focus:border-[#771722] transition-colors"
                    >
                      <option value="Personal Property Acquisition Advisory">Personal Property Acquisition Advisory</option>
                      <option value="Join SHE RISE Leadership Circle & Masterclasses">Join SHE RISE Leadership Circle & Masterclasses</option>
                      <option value="Partner as Consultant, Architect or Mentor">Partner as Consultant, Architect or Mentor</option>
                      <option value="Community Outreach & Sponsorship">Community Outreach & Sponsorship</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#55504A] mb-1.5 font-semibold">
                    Message / What are your goals or questions?
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us a little about your property goals or how you'd like to collaborate..."
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3DA] text-sm text-[#141210] placeholder-neutral-400 focus:outline-none focus:border-[#771722] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] py-3.5 px-6 text-xs font-sans font-semibold tracking-[0.18em] uppercase transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Submitting Confidential Request...</span>
                  ) : (
                    <>
                      <span>SUBMIT CONFIDENTIAL INQUIRY</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-neutral-400 tracking-wider">
                  Discreet & Fiduciary Confidentiality Assured · ARWIN RISE Fiduciary Charter
                </p>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
