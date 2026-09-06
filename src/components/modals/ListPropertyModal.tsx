import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, Upload, ShieldCheck, Sparkles, User as UserIcon, Building2, Lock, Eye, LogOut, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sendLeadEmail } from '../../services/leadService';
import { useContent } from '../../context/ContentContext';
import { AuthModal } from './AuthModal';

interface ListPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDashboard?: () => void;
  onShowToast?: (title: string, message: string, type: 'success' | 'error' | 'info') => void;
}

export const ListPropertyModal: React.FC<ListPropertyModalProps> = ({
  isOpen,
  onClose,
  onOpenDashboard
}) => {
  const { currentUser, userLogout, userSignup, submitPropertyListing } = useContent();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [formData, setFormData] = useState<{
    ownerName: string;
    phone: string;
    email: string;
    propertyTitle: string;
    location: string;
    city: 'Hyderabad' | 'Dubai' | 'Other';
    propertyType: string;
    targetTierId: string;
    configuration: string;
    sizeSft: string;
    expectedPriceCr: string;
    description: string;
    highlights: string;
    titleDeclared: boolean;
  }>({
    ownerName: '',
    phone: '',
    email: '',
    propertyTitle: '',
    location: '',
    city: 'Hyderabad',
    propertyType: '4 & 5 BHK Sky Mansion',
    targetTierId: 'tier-01',
    configuration: '4 BHK + Staff Quarters + Plunge Pool',
    sizeSft: '6,200',
    expectedPriceCr: '₹ 12.50 Cr',
    description: '',
    highlights: 'Double-Height Living Room, Private Plunge Pool, 100% Vastu East Facing, 4 Reserved Car Parks',
    titleDeclared: true
  });

  const [selectedFiles, setSelectedFiles] = useState<{ name: string; size: number; url: string }[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [listingDocketId, setListingDocketId] = useState('');

  // Sync currentUser with form
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        ownerName: currentUser.name || prev.ownerName,
        email: currentUser.email || prev.email,
        phone: currentUser.phone || prev.phone
      }));
    }
  }, [currentUser]);

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
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setSelectedFiles(prev => [
              ...prev,
              {
                name: file.name,
                size: file.size,
                url: event.target!.result as string
              }
            ]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let activeUser = currentUser;
    if (!activeUser) {
      if (!formData.ownerName.trim() || !formData.email.trim() || !formData.phone.trim()) {
        alert('Please provide your name, email, and contact number so our advisory desk can reach you regarding this property.');
        return;
      }
      activeUser = userSignup({
        name: formData.ownerName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        role: 'seller'
      });
    }

    const priceNum = parseFloat(formData.expectedPriceCr.replace(/[^0-9.]/g, '')) || 10;
    const uploadedImages = selectedFiles.map(f => f.url);
    const resolvedOwnerName = formData.ownerName || activeUser?.name || 'Verified Owner';
    const resolvedPhone = formData.phone || activeUser?.phone || '';
    const resolvedEmail = formData.email || activeUser?.email || '';
    const resolvedUserId = activeUser?.id || `usr-${Date.now().toString(36)}`;

    const submission = submitPropertyListing({
      userId: resolvedUserId,
      ownerName: resolvedOwnerName,
      phone: resolvedPhone,
      email: resolvedEmail,
      propertyTitle: formData.propertyTitle,
      location: formData.location,
      city: formData.city,
      propertyType: formData.propertyType,
      configuration: formData.configuration,
      sizeSft: formData.sizeSft,
      expectedPrice: formData.expectedPriceCr,
      priceStartingFormatted: formData.expectedPriceCr,
      priceNumCr: priceNum,
      targetTierId: formData.targetTierId,
      description: formData.description || `Exceptional luxury residence in ${formData.location}. Highly curated finishes and palatial architectural layouts.`,
      highlights: formData.highlights,
      amenities: ['Private Elevator Access', 'Heated Sky Pool', 'Home Automation', 'Italian Marble Deck', 'Staff Suite'],
      images: uploadedImages.length > 0 ? uploadedImages : ['/images/hero-luxury-penthouse.jpg']
    });

    setListingDocketId(submission.id);
    setSubmitted(true);

    // Dispatch lead email notification to kamalyellapragada@gmail.com
    sendLeadEmail({
      formType: 'Seller Property Listing Submission',
      ownerName: resolvedOwnerName,
      phone: resolvedPhone,
      email: resolvedEmail,
      propertyTitle: formData.propertyTitle,
      location: formData.location,
      propertyType: formData.propertyType,
      attachedFilesCount: selectedFiles.length,
      notes: `Target Tier: ${formData.targetTierId} | Specs: ${formData.configuration} | Highlights: ${formData.highlights}`,
      listingDocketId: submission.id
    });

    try {
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#C5A880', '#771722', '#D4AF37']
      });
    } catch {}
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center animate-fadeIn"
        onClick={handleReset}
      >
        <div 
          className="relative w-full max-w-2xl bg-[#141210] border border-[#C5A880]/40 shadow-2xl rounded-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#FAF7F2]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Gold Accent Bar */}
          <div className="h-1.5 bg-gradient-to-r from-[#771722] via-[#C5A880] to-[#771722] flex-shrink-0" />

          {/* Close Button */}
          <button
            onClick={handleReset}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 text-[#FAF7F2] hover:bg-[#771722] hover:text-white border border-white/10 shadow-md flex items-center justify-center transition-all z-30 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="overflow-y-auto flex-1 p-6 sm:p-8">
            
            {!submitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2] font-normal tracking-wide">
                    Post Your Luxury Residence
                  </h2>
                  <p className="mt-1 text-xs text-[#FAF7F2]/60 font-light">
                    Discreet off-market curation for Grade-A residences worth ₹1.5 Cr – ₹35 Cr+ in Hyderabad & Dubai.
                  </p>
                </div>

                {/* Logged in User Bar if authenticated */}
                {currentUser ? (
                  <div className="mb-6 p-3.5 rounded-xl bg-[#1d1916] border border-[#C5A880]/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#C5A880]/20 border border-[#C5A880] text-[#C5A880] flex items-center justify-center font-bold text-xs">
                        {currentUser.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-[#FAF7F2]">
                          <span>{currentUser.name}</span>
                          <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/30">
                            Verified {currentUser.role}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#FAF7F2]/50">{currentUser.email} • {currentUser.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {onOpenDashboard && (
                        <button
                          type="button"
                          onClick={() => { onClose(); onOpenDashboard(); }}
                          className="text-[11px] text-[#C5A880] hover:underline flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span className="hidden sm:inline">My Listings</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={userLogout}
                        className="p-1.5 rounded text-[#FAF7F2]/40 hover:text-[#FAF7F2] hover:bg-white/5"
                        title="Sign Out"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 text-right">
                    <button
                      type="button"
                      onClick={() => setIsAuthOpen(true)}
                      className="text-[11px] text-[#C5A880] hover:underline inline-flex items-center gap-1"
                    >
                      <UserIcon className="w-3 h-3" />
                      <span>Already have an account? Sign In</span>
                    </button>
                  </div>
                )}

                {/* Listing Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Owner Credentials (shown directly when not logged in) */}
                  {!currentUser && (
                    <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-3">
                      <div className="text-[10px] uppercase tracking-wider text-[#C5A880] font-semibold flex items-center gap-1.5">
                        <UserIcon className="w-3.5 h-3.5" /> Owner / Authorized Representative Details
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1 font-medium">
                            Full Legal Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Your Full Name"
                            value={formData.ownerName}
                            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1 font-medium">
                            Phone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1 font-medium">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="yourname@domain.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Property Title & Target Collection Tier */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1 font-medium">
                        Property / Residence Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. The Peak Sky Mansion & Terrace"
                        value={formData.propertyTitle}
                        onChange={(e) => setFormData({ ...formData, propertyTitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1 font-medium">
                        Target Collection Tier *
                      </label>
                      <select
                        value={formData.targetTierId}
                        onChange={(e) => setFormData({ ...formData, targetTierId: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C5A880] cursor-pointer"
                      >
                        <option value="tier-01">The Billionaire Tier (₹12 Cr – ₹35 Cr+)</option>
                        <option value="tier-02">The Sky Villa Tier (₹4 Cr – ₹12 Cr)</option>
                        <option value="tier-03">Dubai Global Tier (AED 2M – 25M+)</option>
                        <option value="tier-04">Executive Luxury (₹1.5 Cr – ₹4 Cr)</option>
                      </select>
                    </div>
                  </div>

                  {/* Location & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1 font-medium">
                        Prime Micro-Market / Corridor *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kokapet Neopolis / Road 36 Jubilee Hills"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1 font-medium">
                        City & Jurisdiction *
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value as 'Hyderabad' | 'Dubai' | 'Other' })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C5A880] cursor-pointer"
                      >
                        <option value="Hyderabad">Hyderabad, Telangana (India)</option>
                        <option value="Dubai">Dubai, UAE (International)</option>
                      </select>
                    </div>
                  </div>

                  {/* Typology & Configuration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1 font-medium">
                        Asset Typology *
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C5A880] cursor-pointer"
                      >
                        <option value="4 & 5 BHK Sky Mansion">4 & 5 BHK Sky Mansion</option>
                        <option value="3 & 3.5 BHK Sky Residence">3 & 3.5 BHK Sky Residence</option>
                        <option value="Triplex / Gated Villa">Triplex / Gated Villa Estate</option>
                        <option value="Ultra-Luxury Penthouse">Ultra-Luxury Sky Penthouse</option>
                        <option value="Dubai Waterfront Penthouse">Dubai Waterfront Penthouse</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1 font-medium">
                        Configuration Breakdown *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 5 BHK + Staff Suite + Private Deck"
                        value={formData.configuration}
                        onChange={(e) => setFormData({ ...formData, configuration: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  {/* Size & Expected Price */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1 font-medium">
                        Super Built-Up Area (Sq.Ft.) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 6,450"
                        value={formData.sizeSft}
                        onChange={(e) => setFormData({ ...formData, sizeSft: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1 font-medium">
                        Expected Valuation (₹ / AED) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. ₹ 12.80 Cr or AED 18.5M"
                        value={formData.expectedPriceCr}
                        onChange={(e) => setFormData({ ...formData, expectedPriceCr: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  {/* Property Photos & Document Attachments */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] uppercase tracking-wider text-[#FAF7F2]/70 font-medium">
                        Upload Property Photography & Floor Plans (Optional)
                      </label>
                      {selectedFiles.length > 0 && (
                        <span className="text-[10px] text-[#C5A880] font-medium">
                          {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} attached
                        </span>
                      )}
                    </div>

                    <label className="flex flex-col items-center justify-center gap-1.5 bg-black/40 border border-dashed border-[#C5A880]/50 hover:border-[#C5A880] p-4 rounded-xl cursor-pointer hover:bg-black/60 transition-all text-xs text-[#FAF7F2]/70 group">
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-[#C5A880] group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-[#FAF7F2]">
                          {selectedFiles.length > 0 ? '+ Add More Photos / Documents' : 'Attach Property Photos or Floor Plans'}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#FAF7F2]/40">
                        Select multiple images (PNG, JPG, WEBP) or architectural PDFs
                      </span>
                      <input 
                        type="file" 
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.webp" 
                        onChange={handleFileChange} 
                        className="hidden" 
                      />
                    </label>

                    {/* Attached Files List & Previews */}
                    {selectedFiles.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2.5 max-h-28 overflow-y-auto p-2 bg-black/30 border border-white/10 rounded-lg">
                        {selectedFiles.map((file, idx) => (
                          <div 
                            key={idx}
                            className="inline-flex items-center gap-2 bg-neutral-900 border border-[#C5A880]/30 px-2.5 py-1 rounded text-[11px] text-[#FAF7F2] shadow-sm"
                          >
                            <span className="truncate max-w-[140px] sm:max-w-[200px]">{file.name}</span>
                            <span className="text-[9px] text-[#FAF7F2]/40">({(file.size / 1024).toFixed(0)} KB)</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(idx)}
                              className="text-[#C5A880] hover:text-red-400 font-bold text-xs ml-1 cursor-pointer"
                              title="Remove file"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Highlights & Description */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1 font-medium">
                      Key Highlights & Architectural Specs
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Double-Height Living Room, Private Plunge Pool, 100% Vastu East Facing"
                      value={formData.highlights}
                      onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  {/* Legal Title Declaration Checkbox */}
                  <label className="flex items-start gap-2.5 p-3 rounded-lg bg-black/30 border border-white/10 cursor-pointer hover:border-white/20">
                    <input
                      type="checkbox"
                      checked={formData.titleDeclared}
                      onChange={e => setFormData({ ...formData, titleDeclared: e.target.checked })}
                      className="mt-0.5 rounded text-[#771722] focus:ring-[#C5A880] accent-[#771722]"
                      required
                    />
                    <span className="text-[11px] text-[#FAF7F2]/70 leading-relaxed font-light">
                      I declare that I am the legal titleholder or authorized fiduciary representative of this residence. I request confidential valuation and admin verification for placement on ARWIN RISE.
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] py-3.5 rounded-lg text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-lg flex items-center justify-center gap-2 border border-[#C5A880]/30 cursor-pointer"
                  >
                    <span>SUBMIT ASSET FOR ADMIN REVIEW</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                  </button>
                </form>
              </>
            ) : (
              /* Success View */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center mx-auto text-[#C5A880]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-sans font-bold tracking-[0.22em] text-[#C5A880] uppercase">
                    DOSSIER SUBMITTED FOR MODERATION
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2]">
                    Property Sent for Title Audit
                  </h3>
                </div>

                {/* Token Card */}
                <div className="bg-black/50 border border-[#C5A880]/40 p-4 max-w-sm mx-auto rounded-xl shadow-md space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[#FAF7F2]/50">
                    Listing Intake Docket ID
                  </div>
                  <div className="font-mono text-2xl font-bold text-[#C5A880] tracking-wider">
                    {listingDocketId}
                  </div>
                  <div className="text-[11px] text-[#FAF7F2]/70 pt-1">
                    Status: <span className="text-amber-400 font-medium">Pending Admin Review & Title Audit</span>
                  </div>
                </div>

                <p className="text-xs text-[#FAF7F2]/70 max-w-md mx-auto leading-relaxed">
                  Your property dossier has been logged into the ARWIN RISE Admin Moderation Queue. Upon senior advisory verification, this listing will be approved and published live to our luxury residences catalog.
                </p>

                {/* Action Buttons */}
                <div className="pt-3 max-w-sm mx-auto space-y-2.5">
                  {onOpenDashboard && (
                    <button
                      type="button"
                      onClick={() => { onClose(); onOpenDashboard(); }}
                      className="w-full flex items-center justify-center gap-2 bg-[#C5A880] hover:bg-[#b0936b] text-[#141210] py-3 px-4 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all shadow-md"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Track In My Submissions Portal</span>
                    </button>
                  )}

                  <a
                    href={`https://wa.me/918464954321?text=Hello%20Arwin%20Rise%20Asset%20Desk,%20I%20have%20submitted%20my%20luxury%20property%20for%20review%20(Docket:%20${listingDocketId}).%20Property:%20${encodeURIComponent(formData.propertyTitle)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#771722] hover:bg-[#8E1E2C] text-white py-3 px-4 rounded-lg text-xs font-semibold tracking-widest uppercase transition-colors shadow-sm"
                  >
                    <span>FAST-TRACK VIA WHATSAPP</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full py-2 text-xs font-medium text-[#FAF7F2]/50 hover:text-[#FAF7F2] transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Embedded Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        title="Sign In to Post Property"
        subtitle="Authenticate as a verified property owner or representative to submit your residence."
      />
    </>
  );
};
