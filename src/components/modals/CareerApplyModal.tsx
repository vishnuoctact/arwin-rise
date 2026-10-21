import React, { useState, useEffect } from 'react';
import { X, Briefcase, Award, CheckCircle2, ArrowRight, Upload, Sparkles } from 'lucide-react';
import { ArwinLogo } from '../ArwinLogo';
import confetti from 'canvas-confetti';
import { sendLeadEmail } from '../../services/leadService';

interface CareerApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CareerApplyModal: React.FC<CareerApplyModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    experienceLevel: 'Fresher / Entry-Level (Preferred)',
    qualification: '',
    portfolioLink: '',
    notes: ''
  });

  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  // Lock body scroll when modal is open
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

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = 'ARW-CAR-' + Math.floor(100000 + Math.random() * 900000);
    setAppId(token);
    setSubmitted(true);

    // Dispatch lead email to kamalyellapragada@gmail.com
    sendLeadEmail({
      formType: 'Career Application',
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      experienceLevel: formData.experienceLevel,
      qualification: formData.qualification,
      portfolioLink: formData.portfolioLink || 'None',
      resumeFileName: fileName || 'Not attached',
      notes: formData.notes || 'None',
      applicationId: token
    });

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A880', '#771722', '#1A1A1A']
      });
    } catch (err) {}
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      experienceLevel: 'Fresher / Entry-Level (Preferred)',
      qualification: '',
      portfolioLink: '',
      notes: ''
    });
    setFileName('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center"
      onClick={handleReset}
    >
      <div 
        className="relative w-full max-w-xl bg-[#FAF7F2] border border-[#C5A880]/50 shadow-2xl rounded-none overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#C5A880] via-[#771722] to-[#C5A880] flex-shrink-0"></div>

        {/* Close Button */}
        <button
          onClick={handleReset}
          aria-label="Close modal"
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-white/95 text-[#771722] hover:bg-[#771722] hover:text-white border border-[#EAE3DA] shadow-md flex items-center justify-center transition-all z-30 cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          
          {!submitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#222222] font-normal">
                  Join Our Advisory Team
                </h2>
                <p className="text-xs text-[#666058] font-sans mt-1.5 max-w-md mx-auto leading-relaxed">
                  Fast-track your career in high-ticket luxury real estate advisory. Only serious professionals — Preferably freshers.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-[10.5px] font-sans font-bold tracking-wider uppercase text-[#222222] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#EAE3DA] text-xs focus:outline-none focus:border-[#771722] text-[#222222] rounded-none shadow-xs"
                  />
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[10.5px] font-sans font-bold tracking-wider uppercase text-[#222222] mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EAE3DA] text-xs focus:outline-none focus:border-[#771722] text-[#222222] rounded-none shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-sans font-bold tracking-wider uppercase text-[#222222] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EAE3DA] text-xs focus:outline-none focus:border-[#771722] text-[#222222] rounded-none shadow-xs"
                    />
                  </div>
                </div>

                {/* Experience Level & Qualification */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[10.5px] font-sans font-bold tracking-wider uppercase text-[#222222] mb-1">
                      Experience Profile *
                    </label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EAE3DA] text-xs focus:outline-none focus:border-[#771722] text-[#222222] rounded-none cursor-pointer"
                    >
                      <option value="Fresher / Entry-Level (Preferred)">Fresher / Graduate (Preferred)</option>
                      <option value="1–2 Years Sales / Corporate Exp">1–2 Years Corporate / Sales Exp</option>
                      <option value="3+ Years Luxury Real Estate">3+ Years Luxury Real Estate</option>
                      <option value="Entrepreneur / Channel Partner">Channel Partner / Strategic Associate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-sans font-bold tracking-wider uppercase text-[#222222] mb-1">
                      Education / Degree
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. BBA / MBA / B.Tech / B.Com"
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EAE3DA] text-xs focus:outline-none focus:border-[#771722] text-[#222222] rounded-none shadow-xs"
                    />
                  </div>
                </div>

                {/* Resume Upload / Link */}
                <div>
                  <label className="block text-[10.5px] font-sans font-bold tracking-wider uppercase text-[#222222] mb-1">
                    Upload Resume or LinkedIn Profile
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <label className="flex items-center justify-center gap-2 bg-white border border-dashed border-[#C5A880] p-2.5 cursor-pointer hover:bg-[#FAF7F2] transition-colors text-xs text-[#55504A]">
                      <Upload className="w-3.5 h-3.5 text-[#771722]" />
                      <span className="truncate max-w-[140px]">{fileName || 'Choose File (PDF/Doc)'}</span>
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        onChange={handleFileChange} 
                        className="hidden" 
                      />
                    </label>

                    <input
                      type="url"
                      placeholder="Or paste LinkedIn profile URL"
                      value={formData.portfolioLink}
                      onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EAE3DA] text-xs focus:outline-none focus:border-[#771722] text-[#222222] rounded-none shadow-xs"
                    />
                  </div>
                </div>

                {/* Cover Note */}
                <div>
                  <label className="block text-[10.5px] font-sans font-bold tracking-wider uppercase text-[#222222] mb-1">
                    Brief Introduction / Why Arwin Rise?
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us briefly about your ambition and motivation..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-[#EAE3DA] text-xs focus:outline-none focus:border-[#771722] text-[#222222] rounded-none resize-none shadow-xs"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#771722] hover:bg-[#8E1E2C] text-white py-3.5 text-xs font-sans font-bold tracking-[0.2em] uppercase transition-colors shadow-md flex items-center justify-center gap-2 rounded-none cursor-pointer mt-2"
                >
                  <span>SUBMIT APPLICATION</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                </button>

                <p className="text-[10px] text-center text-[#888075] font-sans">
                  WhatsApp Hiring Desk: <a href="https://wa.me/918464955321?text=Hello%20Arwin%20Rise%20Hiring%20Desk,%20I%20have%20a%20question%20regarding%20career%20opportunities." target="_blank" rel="noopener noreferrer" className="text-[#771722] font-bold hover:underline">Chat on WhatsApp →</a>
                </p>
              </form>
            </>
          ) : (
            /* Success View */
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#771722]/10 border border-[#771722]/20 flex items-center justify-center mx-auto text-[#771722]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <div className="text-xs font-sans font-bold tracking-[0.22em] text-[#C5A880] uppercase">
                  APPLICATION RECEIVED
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#222222]">
                  Welcome to the Candidate Pool
                </h3>
              </div>

              {/* Token Card */}
              <div className="bg-white border border-[#EAE3DA] p-4 max-w-sm mx-auto shadow-sm space-y-1">
                <div className="text-[10px] font-mono uppercase text-neutral-500">
                  Application Tracking ID
                </div>
                <div className="font-mono text-xl font-bold text-[#771722] tracking-wider">
                  {appId}
                </div>
                <div className="text-[11px] text-neutral-600 font-sans pt-1">
                  Applicant: <strong className="text-[#222222]">{formData.fullName}</strong>
                </div>
              </div>

              <p className="text-xs text-neutral-600 font-sans max-w-md mx-auto leading-relaxed">
                Thank you for applying to ARWIN RISE. Our hiring advisory desk will review your profile and reach out within 24–48 hours for preliminary discussions.
              </p>

              {/* Fast Track on WhatsApp */}
              <div className="pt-2 max-w-sm mx-auto space-y-2.5">
                <a
                  href={`https://wa.me/918464955321?text=Hello%20Arwin%20Rise%20Hiring%20Desk,%20I%20have%20submitted%20my%20career%20application%20(Ref:%20${appId}).%20Name:%20${encodeURIComponent(formData.fullName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#771722] hover:bg-[#8E1E2C] text-white py-3 px-4 text-xs font-sans font-bold tracking-widest uppercase transition-colors shadow-sm"
                >
                  <span>FAST-TRACK VIA WHATSAPP</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </a>

                <button
                  onClick={handleReset}
                  className="w-full py-2 text-xs font-sans font-semibold text-neutral-500 hover:text-[#222222] transition-colors"
                >
                  Close Window
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
