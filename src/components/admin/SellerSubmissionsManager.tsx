import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ShieldAlert, 
  Search, 
  Filter, 
  Eye, 
  ExternalLink, 
  Check, 
  X, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { PropertyListingSubmission, ListingSubmissionStatus } from '../../types/admin';

export const SellerSubmissionsManager: React.FC = () => {
  const { 
    listingSubmissions, 
    collectionTiers, 
    approveAndPublishListing, 
    updateListingSubmission, 
    rejectListingSubmission, 
    deleteListingSubmission 
  } = useContent();

  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'under_audit' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<PropertyListingSubmission | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  
  // Publish Config Form State
  const [publishTierId, setPublishTierId] = useState('tier-01');
  const [publishHeroImage, setPublishHeroImage] = useState('');
  const [publishProjectTitle, setPublishProjectTitle] = useState('');
  const [publishStartingPrice, setPublishStartingPrice] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics
  const totalCount = listingSubmissions.length;
  const pendingCount = listingSubmissions.filter(s => s.status === 'pending').length;
  const underAuditCount = listingSubmissions.filter(s => s.status === 'under_audit').length;
  const approvedCount = listingSubmissions.filter(s => s.status === 'approved').length;
  const rejectedCount = listingSubmissions.filter(s => s.status === 'rejected').length;

  // Filtered List
  const filteredSubmissions = listingSubmissions.filter(sub => {
    if (activeTab !== 'all' && sub.status !== activeTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        sub.id.toLowerCase().includes(q) ||
        sub.ownerName.toLowerCase().includes(q) ||
        sub.email.toLowerCase().includes(q) ||
        sub.propertyTitle.toLowerCase().includes(q) ||
        sub.location.toLowerCase().includes(q) ||
        sub.city.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleOpenDossier = (sub: PropertyListingSubmission) => {
    setSelectedSubmission(sub);
    setPublishTierId(sub.targetTierId || 'tier-01');
    setPublishHeroImage(sub.images[0] || '/images/hero-luxury-penthouse.jpg');
    setPublishProjectTitle(sub.propertyTitle);
    setPublishStartingPrice(sub.priceStartingFormatted || sub.expectedPrice);
    setShowRejectInput(false);
    setRejectionReason('');
    setIsPublishModalOpen(true);
  };

  const handleApproveAndPublish = (subId: string) => {
    const published = approveAndPublishListing(subId, {
      tierId: publishTierId,
      heroImage: publishHeroImage,
      projectName: publishProjectTitle,
      startingPrice: publishStartingPrice
    });

    if (published) {
      showToast(`✨ Successfully published "${published.name}" to Live Residences!`);
      setIsPublishModalOpen(false);
      setSelectedSubmission(null);
    }
  };

  const handleSetStatus = (subId: string, status: ListingSubmissionStatus) => {
    updateListingSubmission(subId, { status });
    showToast(`Status updated to ${status.replace('_', ' ').toUpperCase()}`);
    if (selectedSubmission && selectedSubmission.id === subId) {
      setSelectedSubmission(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleReject = (subId: string) => {
    if (!rejectionReason.trim()) {
      alert('Please enter an advisory rejection or clarification reason for the seller.');
      return;
    }
    rejectListingSubmission(subId, rejectionReason.trim());
    showToast(`Listing marked for clarification / rejection.`);
    setIsPublishModalOpen(false);
    setSelectedSubmission(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this listing submission dossier?')) {
      deleteListingSubmission(id);
      showToast('Submission removed.');
      if (selectedSubmission?.id === id) {
        setIsPublishModalOpen(false);
        setSelectedSubmission(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#141210] border border-[#C5A880] text-[#FAF7F2] shadow-2xl flex items-center gap-3 animate-fadeIn">
          <Sparkles className="w-5 h-5 text-[#C5A880]" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header & Quick Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#C5A880]" />
            Seller Submissions & Moderation Desk
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Review incoming property listings from verified patrons and 1-click publish them live to the residences portfolio.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search docket, owner, area..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A880]"
          />
        </div>
      </div>

      {/* Status Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => setActiveTab('all')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            activeTab === 'all'
              ? 'bg-[#C5A880]/15 border-[#C5A880] text-white'
              : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
          }`}
        >
          <div className="text-[10px] uppercase tracking-wider text-neutral-400">Total Docket</div>
          <div className="font-serif text-xl font-bold text-white mt-0.5">{totalCount}</div>
        </button>

        <button
          onClick={() => setActiveTab('pending')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            activeTab === 'pending'
              ? 'bg-amber-500/15 border-amber-500 text-white'
              : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
          }`}
        >
          <div className="text-[10px] uppercase tracking-wider text-amber-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Pending Review
          </div>
          <div className="font-serif text-xl font-bold text-amber-400 mt-0.5">{pendingCount}</div>
        </button>

        <button
          onClick={() => setActiveTab('under_audit')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            activeTab === 'under_audit'
              ? 'bg-blue-500/15 border-blue-500 text-white'
              : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
          }`}
        >
          <div className="text-[10px] uppercase tracking-wider text-blue-400 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Under Audit
          </div>
          <div className="font-serif text-xl font-bold text-blue-400 mt-0.5">{underAuditCount}</div>
        </button>

        <button
          onClick={() => setActiveTab('approved')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            activeTab === 'approved'
              ? 'bg-emerald-500/15 border-emerald-500 text-white'
              : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
          }`}
        >
          <div className="text-[10px] uppercase tracking-wider text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Approved & Live
          </div>
          <div className="font-serif text-xl font-bold text-emerald-400 mt-0.5">{approvedCount}</div>
        </button>

        <button
          onClick={() => setActiveTab('rejected')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            activeTab === 'rejected'
              ? 'bg-red-500/15 border-red-500 text-white'
              : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
          }`}
        >
          <div className="text-[10px] uppercase tracking-wider text-red-400 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" /> Action Needed
          </div>
          <div className="font-serif text-xl font-bold text-red-400 mt-0.5">{rejectedCount}</div>
        </button>
      </div>

      {/* Submissions Table / Cards */}
      {filteredSubmissions.length === 0 ? (
        <div className="p-12 rounded-xl bg-neutral-900/40 border border-neutral-800 text-center space-y-3">
          <Building2 className="w-10 h-10 text-neutral-600 mx-auto" />
          <h3 className="font-serif text-lg text-white">No submissions match the selected filter</h3>
          <p className="text-xs text-neutral-500">
            Switch tabs or clear the search query to view all property listing dockets.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSubmissions.map(submission => (
            <div
              key={submission.id}
              className="p-4 sm:p-5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-[#C5A880]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Info */}
              <div className="flex items-start gap-4">
                <div className="w-24 h-20 rounded-lg overflow-hidden bg-neutral-950 flex-shrink-0 border border-neutral-800 relative group cursor-pointer" onClick={() => handleOpenDossier(submission)}>
                  <img
                    src={submission.images[0] || '/images/hero-4k-1.jpg'}
                    alt={submission.propertyTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero-4k-1.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-medium">
                    Inspect
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[11px] font-bold text-[#C5A880] px-2 py-0.5 rounded bg-[#C5A880]/10 border border-[#C5A880]/20">
                      {submission.id}
                    </span>
                    <h3 className="font-serif text-base text-white font-medium">
                      {submission.propertyTitle}
                    </h3>
                    {submission.status === 'pending' && (
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        Pending Review
                      </span>
                    )}
                    {submission.status === 'under_audit' && (
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                        Under Diligence
                      </span>
                    )}
                    {submission.status === 'approved' && (
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        Approved & Live
                      </span>
                    )}
                    {submission.status === 'rejected' && (
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/30">
                        Action Required
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-neutral-400 flex-wrap">
                    <span className="flex items-center gap-1 text-white">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                      {submission.location}, {submission.city}
                    </span>
                    <span>•</span>
                    <span>{submission.propertyType}</span>
                    <span>•</span>
                    <span className="font-medium text-[#C5A880]">{submission.expectedPrice}</span>
                    <span>•</span>
                    <span>{submission.sizeSft} Sq.Ft.</span>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-neutral-400 pt-0.5">
                    <span className="text-neutral-300 font-medium">{submission.ownerName}</span>
                    <a href={`tel:${submission.phone}`} className="hover:text-[#C5A880] flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {submission.phone}
                    </a>
                    <a href={`mailto:${submission.email}`} className="hover:text-[#C5A880] flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {submission.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap self-end md:self-center">
                <button
                  type="button"
                  onClick={() => handleOpenDossier(submission)}
                  className="py-2 px-3.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Inspect Dossier</span>
                </button>

                {submission.status !== 'approved' ? (
                  <button
                    type="button"
                    onClick={() => handleOpenDossier(submission)}
                    className="py-2 px-3.5 rounded-lg bg-[#771722] hover:bg-[#8e1c2a] text-white text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-colors border border-[#C5A880]/30 shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Approve & Publish</span>
                  </button>
                ) : (
                  <a
                    href="/#residences"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-1.5 hover:bg-emerald-900/60 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Live</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(submission.id)}
                  className="p-2 rounded-lg bg-neutral-800 text-neutral-400 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                  title="Delete Submission"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inspect & Publish Dossier Modal */}
      {isPublishModalOpen && selectedSubmission && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center animate-fadeIn"
          onClick={() => setIsPublishModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-3xl bg-[#141210] border border-[#C5A880]/40 shadow-2xl rounded-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#FAF7F2]"
            onClick={e => e.stopPropagation()}
          >
            {/* Top Gold Bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#771722] via-[#C5A880] to-[#771722]" />

            {/* Close Button */}
            <button
              onClick={() => setIsPublishModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-[#771722] transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6">
              
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-[#C5A880] px-2 py-0.5 rounded bg-[#C5A880]/15 border border-[#C5A880]/30">
                    {selectedSubmission.id}
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Submitted on {new Date(selectedSubmission.submittedAt).toLocaleString('en-IN')}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-white">
                  {selectedSubmission.propertyTitle}
                </h2>
                <p className="text-xs text-[#C5A880] mt-0.5">
                  {selectedSubmission.location}, {selectedSubmission.city} • {selectedSubmission.propertyType}
                </p>
              </div>

              {/* Photo Gallery Grid */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                  Attached Photography Dossier ({selectedSubmission.images.length} photos)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedSubmission.images.map((img, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setPublishHeroImage(img)}
                      className={`relative aspect-video rounded-lg overflow-hidden border cursor-pointer group ${
                        publishHeroImage === img ? 'border-[#C5A880] ring-2 ring-[#C5A880]/50' : 'border-neutral-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt="" 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/hero-4k-1.jpg';
                        }}
                      />
                      {publishHeroImage === img && (
                        <span className="absolute top-1 right-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#C5A880] text-[#141210]">
                          HERO
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submitter Credentials */}
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" /> Submitter & Title Clearance
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Owner / Representative</span>
                    <strong className="text-white">{selectedSubmission.ownerName}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Contact Mobile</span>
                    <a href={`tel:${selectedSubmission.phone}`} className="text-[#C5A880] hover:underline font-medium">
                      {selectedSubmission.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Email Address</span>
                    <a href={`mailto:${selectedSubmission.email}`} className="text-[#C5A880] hover:underline font-medium">
                      {selectedSubmission.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Specifications Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs">
                <div>
                  <span className="text-neutral-500 block text-[10px]">Configuration</span>
                  <span className="text-white font-medium">{selectedSubmission.configuration}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">Super Built-Up Area</span>
                  <span className="text-white font-medium">{selectedSubmission.sizeSft} Sq.Ft.</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">Asking Valuation</span>
                  <span className="text-[#C5A880] font-bold">{selectedSubmission.expectedPrice}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">Jurisdiction</span>
                  <span className="text-white font-medium">{selectedSubmission.city}</span>
                </div>
              </div>

              {/* Highlights & Description */}
              {selectedSubmission.highlights && (
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs">
                  <span className="text-neutral-400 font-medium block text-[10px] uppercase tracking-wider mb-1">Key Highlights</span>
                  <p className="text-neutral-200">{selectedSubmission.highlights}</p>
                </div>
              )}

              {/* 1-Click Publishing Configuration Form */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-[#771722]/30 via-neutral-950 to-[#C5A880]/15 border border-[#C5A880]/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C5A880]" />
                    <h4 className="text-xs uppercase tracking-wider font-bold text-white">
                      Live Catalog Publishing Configuration
                    </h4>
                  </div>
                  <span className="text-[10px] text-[#C5A880]">1-Click Transformation</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                      Catalog Collection Tier
                    </label>
                    <select
                      value={publishTierId}
                      onChange={e => setPublishTierId(e.target.value)}
                      className="w-full p-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    >
                      {collectionTiers.map(tier => (
                        <option key={tier.id} value={tier.id}>
                          {tier.title} ({tier.priceRange})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                      Catalog Display Name
                    </label>
                    <input
                      type="text"
                      value={publishProjectTitle}
                      onChange={e => setPublishProjectTitle(e.target.value)}
                      className="w-full p-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                      Starting Price Tag
                    </label>
                    <input
                      type="text"
                      value={publishStartingPrice}
                      onChange={e => setPublishStartingPrice(e.target.value)}
                      className="w-full p-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleApproveAndPublish(selectedSubmission.id)}
                    className="w-full sm:flex-1 py-3 px-6 rounded-lg bg-[#771722] hover:bg-[#8e1c2a] text-white font-semibold text-xs tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-2 border border-[#C5A880]/40 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#C5A880]" />
                    <span>APPROVE & PUBLISH LIVE TO RESIDENCES</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSetStatus(selectedSubmission.id, 'under_audit')}
                    className="w-full sm:w-auto py-3 px-4 rounded-lg bg-blue-950/60 border border-blue-500/40 text-blue-300 hover:bg-blue-900/60 text-xs font-medium transition-colors"
                  >
                    Mark Under Title Audit
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowRejectInput(!showRejectInput)}
                    className="w-full sm:w-auto py-3 px-4 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 hover:bg-red-900/60 text-xs font-medium transition-colors"
                  >
                    Request Clarification / Reject
                  </button>
                </div>

                {/* Clarification / Rejection Input Box */}
                {showRejectInput && (
                  <div className="p-3 rounded-lg bg-black/60 border border-red-500/40 space-y-2 animate-fadeIn">
                    <label className="block text-[10px] uppercase tracking-wider text-red-300 font-medium">
                      Feedback / Reason for Clarification (Will be visible on seller's portal)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Valuation requires updated link document / DLD registration copy..."
                      value={rejectionReason}
                      onChange={e => setRejectionReason(e.target.value)}
                      className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-xs text-white focus:outline-none focus:border-red-400"
                    />
                    <button
                      type="button"
                      onClick={() => handleReject(selectedSubmission.id)}
                      className="py-1.5 px-4 rounded bg-red-700 hover:bg-red-800 text-white text-xs font-semibold tracking-wider uppercase"
                    >
                      Confirm Rejection & Send Feedback
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
