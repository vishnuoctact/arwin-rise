import React from 'react';
import { X, Building2, Plus, Clock, CheckCircle2, AlertCircle, ShieldAlert, ArrowUpRight, LogOut, User as UserIcon } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { PropertyListingSubmission } from '../../types/admin';

interface SellerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSubmitModal: () => void;
  onViewLiveProperty?: (projectId?: string) => void;
}

export const SellerDashboardModal: React.FC<SellerDashboardModalProps> = ({
  isOpen,
  onClose,
  onOpenSubmitModal,
  onViewLiveProperty
}) => {
  const { currentUser, userLogout, listingSubmissions } = useContent();

  if (!isOpen) return null;

  const userSubmissions = currentUser
    ? listingSubmissions.filter(
        s => s.userId === currentUser.id || s.email?.toLowerCase() === currentUser.email?.toLowerCase()
      )
    : [];

  const getStatusBadge = (status: PropertyListingSubmission['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Approved & Live
          </span>
        );
      case 'under_audit':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-blue-500/15 text-blue-300 border border-blue-500/30">
            <Clock className="w-3 h-3 text-blue-400 animate-spin" />
            Under Title Diligence
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-red-500/15 text-red-300 border border-red-500/30">
            <ShieldAlert className="w-3 h-3 text-red-400" />
            Action Required
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <AlertCircle className="w-3 h-3 text-amber-400" />
            Pending Admin Review
          </span>
        );
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-[#141210] border border-[#C5A880]/40 shadow-2xl rounded-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#FAF7F2]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#771722] via-[#C5A880] to-[#771722] flex-shrink-0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 text-[#FAF7F2] hover:bg-[#771722] hover:text-white border border-white/10 shadow-md flex items-center justify-center transition-all z-30 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & User Profile */}
        <div className="p-6 sm:p-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#771722] to-[#C5A880] p-0.5 shadow-lg">
              <div className="w-full h-full bg-[#141210] rounded-[14px] flex items-center justify-center font-serif text-lg font-bold text-[#C5A880]">
                {currentUser ? currentUser.name.slice(0, 2).toUpperCase() : 'AR'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl text-[#FAF7F2]">
                  {currentUser ? currentUser.name : 'Patron Dashboard'}
                </h2>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/30 font-medium">
                  Verified Asset Owner
                </span>
              </div>
              <p className="text-xs text-[#FAF7F2]/60 mt-0.5">
                {currentUser?.email} • {currentUser?.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => { onClose(); onOpenSubmitModal(); }}
              className="flex-1 sm:flex-initial py-2.5 px-4 rounded-lg bg-[#771722] hover:bg-[#8e1c2a] text-[#FAF7F2] font-medium text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 border border-[#C5A880]/30 shadow-md"
            >
              <Plus className="w-4 h-4 text-[#C5A880]" />
              <span>Post New Property</span>
            </button>
            <button
              type="button"
              onClick={() => { userLogout(); onClose(); }}
              className="p-2.5 rounded-lg bg-black/40 border border-white/15 text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:border-white/30 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Submissions List */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A880]">
              My Property Submissions ({userSubmissions.length})
            </h3>
            <span className="text-[11px] text-[#FAF7F2]/40">
              Live moderation status & catalog links
            </span>
          </div>

          {userSubmissions.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-xl bg-black/30 border border-white/10 space-y-3">
              <Building2 className="w-10 h-10 text-[#C5A880]/50 mx-auto" />
              <h4 className="font-serif text-lg text-[#FAF7F2]">No Properties Submitted Yet</h4>
              <p className="text-xs text-[#FAF7F2]/60 max-w-sm mx-auto">
                Submit your Grade-A luxury residence or penthouses to receive discreet valuation and buyer placement.
              </p>
              <button
                type="button"
                onClick={() => { onClose(); onOpenSubmitModal(); }}
                className="mt-2 py-2 px-5 rounded-lg bg-[#C5A880] hover:bg-[#b0936b] text-[#141210] font-semibold text-xs tracking-wider uppercase transition-all"
              >
                Post Your First Property
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {userSubmissions.map((submission) => (
                <div 
                  key={submission.id}
                  className="p-4 rounded-xl bg-black/40 border border-white/10 hover:border-[#C5A880]/40 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-20 h-16 rounded-lg overflow-hidden bg-neutral-900 flex-shrink-0 border border-white/10">
                        <img 
                          src={submission.images[0] || '/images/hero-4k-1.jpg'} 
                          alt={submission.propertyTitle}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/hero-4k-1.jpg';
                          }}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-serif text-base text-[#FAF7F2] font-normal">
                            {submission.propertyTitle}
                          </h4>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#FAF7F2]/60 border border-white/10">
                            {submission.id}
                          </span>
                        </div>
                        <p className="text-xs text-[#FAF7F2]/60 mt-0.5">
                          {submission.location}, {submission.city} • {submission.propertyType}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-[#C5A880] font-medium mt-1">
                          <span>{submission.expectedPrice}</span>
                          <span className="text-[#FAF7F2]/30">•</span>
                          <span className="text-[#FAF7F2]/70">{submission.sizeSft} Sq.Ft.</span>
                          <span className="text-[#FAF7F2]/30">•</span>
                          <span className="text-[#FAF7F2]/70">{submission.configuration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-2">
                      {getStatusBadge(submission.status)}
                      <span className="text-[10px] text-[#FAF7F2]/40">
                        {new Date(submission.submittedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Admin Feedback Box if present */}
                  {submission.adminFeedback && (
                    <div className="p-2.5 rounded-lg bg-[#771722]/15 border border-[#771722]/30 text-xs text-[#FAF7F2]/80">
                      <strong className="text-[#C5A880]">Advisory Feedback: </strong>
                      {submission.adminFeedback}
                    </div>
                  )}

                  {/* If Approved, show Live link */}
                  {submission.status === 'approved' && (
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Live on ARWIN RISE Catalog
                      </span>
                      <a
                        href="/#residences"
                        onClick={() => {
                          onClose();
                          if (onViewLiveProperty) onViewLiveProperty(submission.approvedProjectId);
                        }}
                        className="text-[#C5A880] hover:underline flex items-center gap-1 font-medium"
                      >
                        <span>View Live Listing</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
