import React, { useEffect } from 'react';
import { NewsArticle, NEWS_ARTICLES } from '../data/news';
import { ArrowLeft, Calendar, Clock, ArrowRight, Share2, CheckCircle2, Phone, Mail, Building2, Sparkles, FileText, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface NewsArticlePageProps {
  article: NewsArticle;
  onNavigateHome: () => void;
  onSelectArticle: (article: NewsArticle) => void;
  onRequestPreview: () => void;
}

export const NewsArticlePage: React.FC<NewsArticlePageProps> = ({
  article,
  onNavigateHome,
  onSelectArticle,
  onRequestPreview
}) => {
  // Scroll to top when opening an article
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  const relatedArticles = NEWS_ARTICLES.filter(a => a.id !== article.id).slice(0, 3);

  return (
    <div className="bg-[#FAF7F2] min-h-screen pt-24 sm:pt-28 pb-20">
      
      {/* Top Breadcrumbs & Back Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between py-3 border-b border-[#EAE3DA]">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-wider text-[#771722] hover:text-[#8E1E2C] uppercase transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A880] group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO HOME</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] font-mono text-[#888075]">
            <span className="hidden sm:inline">THE ARWIN JOURNAL</span>
            <span>•</span>
            <span className="text-[#C5A880] font-bold">{article.tag}</span>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Block */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="bg-[#771722] text-[#C5A880] px-2.5 py-1 text-[9.5px] font-mono font-bold tracking-wider uppercase border border-[#C5A880]/30 shadow-xs">
              {article.category}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#222222] font-normal leading-tight tracking-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[#666058] font-serif italic leading-relaxed">
            {article.excerpt}
          </p>

          {/* Author Byline & Timestamp */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EAE3DA] text-xs font-sans text-[#7A7369]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#771722] text-[#C5A880] flex items-center justify-center font-serif text-xs font-bold shadow-xs">
                AR
              </div>
              <div>
                <div className="font-bold text-[#222222] text-sm">{article.author.name}</div>
                <div className="text-[11px] text-[#888075]">{article.author.role} · Neopolis, Hyderabad</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-[#888075]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{article.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{article.readTime}</span>
              </span>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900 border border-[#EAE3DA] shadow-md">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover filter brightness-[1.01]"
          />
          <div className="absolute bottom-3 right-4 bg-black/60 backdrop-blur-xs text-white/90 text-[10px] font-mono px-2.5 py-1">
            ARWIN ADVISORY RESEARCH
          </div>
        </div>

        {/* Executive Summary & Key Highlights Card */}
        <div className="bg-white border border-[#EAE3DA] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            <h3 className="text-xs font-sans font-bold tracking-[0.2em] text-[#C5A880] uppercase">
              EXECUTIVE SUMMARY & KEY TAKEAWAYS
            </h3>
          </div>

          <div className="space-y-2.5">
            {article.keyHighlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-[13px] font-sans text-[#333333] leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#771722] flex-shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Full Narrative Content */}
        <div className="space-y-6 pt-2">
          {article.content.map((paragraph, idx) => (
            <p key={idx} className="font-serif text-[16px] sm:text-[18px] text-[#333333] leading-relaxed font-light">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Direct Advisory Contact Strip */}
        <div className="bg-white border border-[#EAE3DA] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="text-[10px] font-sans font-bold tracking-widest text-[#C5A880] uppercase flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#771722]" />
              <span>PRIVATE CLIENT BRIEFING</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#222222] font-normal">
              Require tailored micro-market forecasts for your next acquisition?
            </h3>
            <p className="text-xs text-neutral-500 font-sans">
              WhatsApp Advisory: <a href="https://wa.me/918464955321?text=Hello%20Arwin%20Rise,%20I%20would%20like%20to%20request%20an%20advisory%20briefing." target="_blank" rel="noopener noreferrer" className="font-bold text-[#771722] hover:underline">Chat on WhatsApp →</a> · Hyderabad
            </p>
          </div>

          <button
            onClick={onRequestPreview}
            className="bg-[#771722] hover:bg-[#8E1E2C] text-white py-3.5 px-6 text-xs font-sans font-bold tracking-wider uppercase transition-colors shadow-sm flex-shrink-0 cursor-pointer flex items-center gap-2 border border-[#C5A880]/30"
          >
            <span>REQUEST PRIVATE BRIEFING</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
          </button>
        </div>

        {/* Related Intelligence Briefings */}
        <div className="pt-12 border-t border-[#EAE3DA] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl text-[#222222] font-normal">
              Related Market Briefings
            </h3>
            <button
              onClick={onNavigateHome}
              className="text-xs font-sans font-bold text-[#771722] hover:underline uppercase tracking-wider"
            >
              View All Articles →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel)}
                className="bg-white border border-[#EAE3DA] hover:border-[#C5A880] p-4 flex flex-col justify-between group cursor-pointer shadow-xs transition-all"
              >
                <div className="space-y-2.5">
                  <div className="aspect-[16/10] overflow-hidden bg-neutral-900">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-[9.5px] font-mono text-[#C5A880] font-bold uppercase">
                    {rel.category}
                  </div>
                  <h4 className="font-serif text-sm text-[#222222] group-hover:text-[#771722] line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>
                </div>

                <div className="pt-3 mt-3 border-t border-[#F0EBE1] flex items-center justify-between text-[10px] text-[#888075] font-sans">
                  <span>{rel.readTime}</span>
                  <span className="font-bold text-[#771722] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    READ →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </article>
    </div>
  );
};
