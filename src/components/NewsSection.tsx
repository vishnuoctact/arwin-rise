import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles, FileText, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { NEWS_ARTICLES as DEFAULT_NEWS, NewsArticle } from '../data/news';

interface NewsSectionProps {
  onSelectArticle: (article: NewsArticle) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onSelectArticle }) => {
  const { newsArticles } = useContent();
  const articles = newsArticles && newsArticles.length > 0 ? newsArticles : DEFAULT_NEWS;
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = target.scrollWidth - target.clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(target.scrollLeft / maxScroll);
    }
  };

  return (
    <section id="news" className="py-14 sm:py-16 lg:py-20 bg-[#F5EFEB] border-t border-[#EAE3DA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 pb-6 border-b border-[#E0D7CD] gap-4">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-[1.5px] bg-[#771722]"></span>
              <span className="text-[11px] font-sans font-bold tracking-[0.28em] text-[#771722] uppercase">
                THE ARWIN INTELLIGENCE JOURNAL
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#222222] font-normal tracking-tight">
              Market Reports & Sector Insights
            </h2>

            <p className="text-xs sm:text-[13px] text-[#7A7369] font-sans leading-relaxed">
              Quarterly macroeconomic analyses, NRI cross-border frameworks, and infrastructure forecasts for West Hyderabad & Dubai.
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto">
            <div className="flex items-center gap-2 text-xs font-mono text-[#888075] bg-white px-3.5 py-1.5 border border-[#E0D7CD]">
              <FileText className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>QUARTERLY REPORT · Q3 2026</span>
            </div>
            <span className="lg:hidden text-[10.5px] font-sans font-semibold text-[#771722] flex items-center gap-0.5">
              <span>Swipe</span>
              <ChevronRight className="w-3 h-3 text-[#C5A880]" />
            </span>
          </div>
        </div>

        {/* Responsive Container: Swipeable Carousel on Mobile/Tablet, 4-Col Grid on Desktop */}
        <div 
          onScroll={handleScroll}
          className="flex overflow-x-auto pb-4 gap-4 sm:gap-6 lg:grid lg:grid-cols-4 lg:gap-7 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {articles.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 80px 0px" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
              onClick={() => onSelectArticle(article)}
              className="w-[82vw] sm:w-[320px] lg:w-auto shrink-0 snap-start snap-always bg-white border border-[#E0D7CD] hover:border-[#C5A880] flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div>
                {/* Image Cover */}
                <div className="relative aspect-[16/11] overflow-hidden bg-neutral-900">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[1.01]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#771722] text-[#C5A880] px-2 py-0.5 text-[8.5px] font-mono font-bold tracking-wider uppercase border border-[#C5A880]/30 shadow-xs">
                      {article.tag}
                    </span>
                  </div>

                  {/* Read Time */}
                  <div className="absolute bottom-2.5 right-3 text-[10.5px] font-sans font-medium text-white/90 flex items-center gap-1 bg-black/50 px-2 py-0.5 backdrop-blur-xs">
                    <Clock className="w-3 h-3 text-[#C5A880]" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 space-y-3">
                  {/* Index + Category + Date */}
                  <div className="flex items-center justify-between text-[10px] font-mono pb-1 border-b border-[#F2ECE4]">
                    <span className="font-bold text-[#771722]">
                      0{idx + 1}
                    </span>
                    <span className="text-[#888075] uppercase">
                      {article.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-[17px] sm:text-[18px] text-[#222222] font-normal leading-snug group-hover:text-[#771722] transition-colors line-clamp-2 sm:line-clamp-3">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[11.5px] text-[#666058] font-sans leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#F2ECE4] flex items-center justify-between">
                <span className="text-[10.5px] font-sans font-bold tracking-[0.16em] uppercase text-[#771722] group-hover:text-[#8E1E2C] flex items-center gap-1.5">
                  <span>READ BRIEFING</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[10px] font-sans text-neutral-400">
                  {article.category.split(' ')[0]}
                </span>
              </div>

            </motion.article>
          ))}
        </div>

        {/* Mobile Swipe Pagination Indicator */}
        <div className="flex lg:hidden items-center justify-center gap-1.5 pt-4">
          {articles.map((_, i) => {
            const activeIndex = Math.min(
              articles.length - 1,
              Math.floor(scrollProgress * (articles.length - 1) + 0.5)
            );
            return (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-6 bg-[#771722]' : 'w-2 bg-[#C5A880]/40'
                }`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};
