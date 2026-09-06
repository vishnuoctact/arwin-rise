import React, { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { BookOpen, TrendingUp, Sparkles, ArrowRight, Calendar, User, Download, Mail } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { NEWS_ARTICLES as DEFAULT_ARTICLES } from '../data/news';

interface InsightsPageProps {
  onRequestPreview: () => void;
  onNavigateHome: () => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({
  onRequestPreview,
  onNavigateHome
}) => {
  const { newsArticles } = useContent();
  const allArticles = newsArticles && newsArticles.length > 0 ? newsArticles : DEFAULT_ARTICLES;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [emailSub, setEmailSub] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const categories = ['All', 'Market Intelligence', 'Market Reports', 'Architecture', 'Investor Guides', 'NRI Advisory', 'Bespoke Living'];

  const filteredArticles = selectedCategory === 'All' 
    ? allArticles 
    : allArticles.filter(a => a.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub) {
      setSubscribed(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Page Hero */}
      <PageHero
        tag="INTELLIGENCE & INSIGHTS"
        title="Market Analysis & Luxury Living Intelligence."
        subtitle="Exclusive research papers, corridor infrastructure reports, and architectural perspectives curated by ARWIN RISE's private research division."
        breadcrumbs={['Insights']}
        onNavigateHome={onNavigateHome}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-sans font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#771722] text-white shadow-sm'
                  : 'bg-white text-neutral-600 hover:text-[#771722] border border-[#EAE3DA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white border border-[#EAE3DA] hover:border-[#C5A880] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900">
                <img
                  src={art.image || '/images/feat-3.jpg'}
                  alt={art.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[1.01]"
                />
                <div className="absolute top-3 left-3 bg-[#771722] text-[#C5A880] px-2.5 py-1 text-[10px] font-sans font-bold tracking-wider uppercase">
                  {art.category}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-neutral-400 font-sans mb-2">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#C5A880]" /> {art.date}</span>
                    <span>•</span>
                    <span>{art.readTime || '5 min read'}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#222222] font-normal leading-snug group-hover:text-[#771722] transition-colors mb-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EBE1] flex items-center justify-between">
                  <span className="text-[11px] font-sans text-neutral-400">By {art.author?.name || 'Arwin Advisory Desk'}</span>
                  <button
                    onClick={onRequestPreview}
                    className="text-xs font-sans font-semibold text-[#771722] group-hover:text-[#7A213D] flex items-center gap-1 cursor-pointer"
                  >
                    <span>READ ARTICLE</span>
                    <ArrowRight className="w-3 h-3 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* VIP Newsletter Subscription Banner */}
        <div className="bg-[#771722] text-white p-8 sm:p-12 border border-[#C5A880]/40 shadow-xl text-center max-w-3xl mx-auto">
          <div className="text-[10px] font-sans font-semibold tracking-widest text-[#C5A880] uppercase mb-2">
            ARWIN PRIVATE DISPATCH
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
            Receive Quarterly Real Estate Intelligence
          </h3>
          <p className="text-xs text-neutral-300 font-sans max-w-md mx-auto mb-6">
            Join over 5,000 discerning investors who receive our private micro-market whitepapers and pre-launch briefs.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={emailSub}
                onChange={(e) => setEmailSub(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-white/10 border border-[#C5A880]/50 text-white placeholder-neutral-400 text-xs focus:outline-none focus:border-[#C5A880]"
              />
              <button
                type="submit"
                className="bg-[#C5A880] hover:bg-[#D4B993] text-[#2D1B22] px-6 py-3 text-xs font-sans font-bold tracking-wider uppercase rounded-sm transition-colors cursor-pointer"
              >
                SUBSCRIBE
              </button>
            </form>
          ) : (
            <div className="p-3 bg-white/10 border border-[#C5A880] text-xs text-[#C5A880] font-sans max-w-md mx-auto">
              ✓ Thank you for subscribing to the ARWIN Private Dispatch.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
