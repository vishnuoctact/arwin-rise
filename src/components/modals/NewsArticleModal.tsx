import React from 'react';
import { X, Calendar, Clock, ArrowRight, ShieldCheck, Phone, CheckCircle2, Share2 } from 'lucide-react';
import { NewsArticle } from '../../data/news';

interface NewsArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  onRequestPreview: () => void;
}

export const NewsArticleModal: React.FC<NewsArticleModalProps> = ({
  article,
  onClose,
  onRequestPreview
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF7F2] w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-[#EAE3DA] shadow-2xl z-10 my-auto text-[#222222]">
        
        {/* Sticky Header Bar */}
        <div className="sticky top-0 bg-[#FAF7F2]/95 backdrop-blur-sm px-6 py-4 border-b border-[#EAE3DA] flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#C5A880] uppercase">
              {article.category}
            </span>
            <span className="text-neutral-400">•</span>
            <span className="text-[11px] font-mono text-neutral-500">
              {article.date}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close article"
            className="w-8 h-8 rounded-full bg-white border border-[#EAE3DA] hover:border-[#771722] text-neutral-600 hover:text-[#771722] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="bg-[#771722] text-[#C5A880] px-2.5 py-1 text-[9.5px] font-mono font-bold tracking-wider uppercase">
              {article.tag}
            </span>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-10 space-y-6">
          
          {/* Headline & Read Time */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-neutral-500 font-sans">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{article.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{article.readTime}</span>
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl text-[#222222] font-normal leading-snug">
              {article.title}
            </h1>

            {/* Author Byline */}
            <div className="pt-2 flex items-center gap-3 border-y border-[#EAE3DA] py-3">
              <div className="w-9 h-9 rounded-full bg-[#771722] text-[#C5A880] flex items-center justify-center font-serif text-xs font-bold">
                AR
              </div>
              <div>
                <div className="font-sans font-bold text-xs text-[#222222]">{article.author.name}</div>
                <div className="text-[11px] font-sans text-[#7A7369]">{article.author.role} · Neopolis, Hyderabad</div>
              </div>
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="bg-white border border-[#EAE3DA] p-5 sm:p-6 space-y-3">
            <div className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#C5A880] uppercase">
              EXECUTIVE SUMMARY & KEY TAKEAWAYS
            </div>
            <div className="space-y-2">
              {article.keyHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs font-sans text-[#444444]">
                  <CheckCircle2 className="w-4 h-4 text-[#771722] flex-shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Narrative Content */}
          <div className="space-y-4 pt-2">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="font-serif text-[15px] sm:text-base text-[#333333] leading-relaxed font-light">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Bottom Advisory Consultation Box */}
          <div className="mt-8 bg-white border border-[#EAE3DA] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-sans font-bold tracking-widest text-[#C5A880] uppercase">
                ARWIN PRIVATE PROPERTY ADVISORY
              </div>
              <div className="font-serif text-lg text-[#222222] font-semibold mt-0.5">
                Require personalized analysis for your acquisition?
              </div>
              <div className="text-xs text-neutral-500 font-sans mt-0.5">
                WhatsApp Advisory: <a href="https://wa.me/918464954321?text=Hello%20Arwin%20Rise,%20I%20would%20like%20to%20request%20an%20advisory%20briefing." target="_blank" rel="noopener noreferrer" className="font-bold text-[#771722] hover:underline">Chat on WhatsApp →</a> · Neopolis, Hyderabad
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onRequestPreview();
              }}
              className="bg-[#771722] hover:bg-[#8E1E2C] text-white py-2.5 px-5 text-xs font-sans font-bold tracking-wider uppercase transition-colors shadow-xs flex-shrink-0 cursor-pointer"
            >
              <span>REQUEST BRIEFING</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
