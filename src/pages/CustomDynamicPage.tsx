import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomPage, PageSectionBlock } from '../types/admin';
import { useContent } from '../context/ContentContext';
import { 
  ChevronDown, 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  Layers,
  Award,
  Building2,
  Globe,
  Star,
  Key,
  Compass
} from 'lucide-react';

interface CustomDynamicPageProps {
  page: CustomPage;
  onOpenPreview: () => void;
  onNavigate: (page: string) => void;
  onNavigateHome?: () => void;
  onOpenNriModal?: () => void;
  onOpenInvestorModal?: () => void;
  onOpenCareerModal?: () => void;
  onOpenListModal?: () => void;
}

export const CustomDynamicPage: React.FC<CustomDynamicPageProps> = ({
  page,
  onOpenPreview,
  onNavigate,
  onNavigateHome,
  onOpenNriModal,
  onOpenInvestorModal,
  onOpenCareerModal,
  onOpenListModal
}) => {
  const { settings } = useContent();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleCtaClick = (link?: string, action?: string) => {
    if (action === 'preview-modal') {
      onOpenPreview();
      return;
    }
    if (action === 'whatsapp') {
      window.open(
        `https://wa.me/${settings.whatsappPhone || '918464955321'}?text=Hello%20ARWIN%20RISE,%20I%20am%20inquiring%20about%20${encodeURIComponent(page.title)}.`,
        '_blank'
      );
      return;
    }

    if (!link) {
      onOpenPreview();
      return;
    }

    const clean = link.toLowerCase().trim();
    if (clean === 'preview' || clean === 'private-preview') {
      onOpenPreview();
    } else if (clean === 'nri' || clean === 'nri-connect') {
      if (onOpenNriModal) onOpenNriModal();
      else onNavigate('nri-connect');
    } else if (clean === 'roi' || clean === 'investor' || clean === 'investors') {
      if (onOpenInvestorModal) onOpenInvestorModal();
      else onNavigate('investors');
    } else if (clean === 'career' || clean === 'partner') {
      if (onOpenCareerModal) onOpenCareerModal();
      else onNavigate('contact');
    } else if (clean === 'list' || clean === 'seller' || clean === 'seller-desk') {
      if (onOpenListModal) onOpenListModal();
      else onNavigate('contact');
    } else if (clean === 'whatsapp') {
      window.open(
        `https://wa.me/${settings.whatsappPhone || '918464955321'}?text=Hello%20ARWIN%20RISE,%20I%20am%20inquiring%20about%20${encodeURIComponent(page.title)}.`,
        '_blank'
      );
    } else if (clean.startsWith('http')) {
      window.open(clean, '_blank');
    } else {
      onNavigate(clean.replace(/^#/, ''));
    }
  };

  const getFeatureIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Building2': return Building2;
      case 'Globe': return Globe;
      case 'Sparkles': return Sparkles;
      case 'Award': return Award;
      case 'Star': return Star;
      case 'Key': return Key;
      case 'Compass': return Compass;
      case 'ShieldCheck':
      default:
        return ShieldCheck;
    }
  };

  const sortedSections = [...(page.sections || [])]
    .filter(s => !s.isHidden && s.isVisible !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div className="pt-24 pb-20 bg-[#FAF7F2] text-[#222222] min-h-screen selection:bg-[#771722] selection:text-[#C5A880]">
      
      {/* 1. Page Hero Banner */}
      <section className="relative bg-[#141210] text-[#FAF7F2] py-20 sm:py-28 overflow-hidden">
        {page.heroImage && (
          <div className="absolute inset-0 z-0">
            <img 
              src={page.heroImage} 
              alt={page.title} 
              className="w-full h-full object-cover opacity-25 scale-105 transform motion-safe:animate-pulse duration-[10000ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/70 to-transparent" />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] tracking-wider uppercase">
            <button 
              onClick={() => (onNavigateHome ? onNavigateHome() : onNavigate('home'))}
              className="hover:text-white transition-colors cursor-pointer"
            >
              HOME
            </button>
            <span>/</span>
            <span className="text-[#8C827A]">{page.category || page.navLabel || 'CUSTOM PAGE'}</span>
          </div>

          <div className="max-w-4xl space-y-4">
            {page.heroTag && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#771722]/30 border border-[#C5A880]/30 rounded-none text-[11px] font-mono tracking-[0.2em] text-[#C5A880] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{page.heroTag}</span>
              </div>
            )}

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#FAF7F2] leading-tight font-normal">
              {page.heroHeadline || page.heroTitle || page.title}
            </h1>

            {page.heroSubtitle && (
              <p className="text-sm sm:text-base lg:text-lg text-[#C8BFB5] font-sans font-light leading-relaxed max-w-3xl">
                {page.heroSubtitle}
              </p>
            )}

            {/* Quick Consultation Trigger */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenPreview()}
                className="group inline-flex items-center gap-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-white px-7 py-3.5 text-xs font-sans font-semibold tracking-[0.16em] uppercase transition-all duration-200 shadow-xl cursor-pointer"
              >
                <span>{page.heroCtaText || 'REQUEST PRIVATE PREVIEW'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`https://wa.me/${settings.whatsappPhone || '918464955321'}?text=Hello%20ARWIN%20RISE,%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(page.title)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white border border-[#C5A880]/40 px-6 py-3.5 text-xs font-sans font-medium tracking-[0.14em] uppercase transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Dynamic Stack of Visual Sections */}
      <div className="space-y-16 sm:space-y-24">
        {sortedSections.map((section, secIdx) => {
          const bgThemeClass = 
            section.bgTheme === 'dark' 
              ? 'bg-[#141210] text-[#FAF7F2]' 
              : section.bgTheme === 'warm' 
                ? 'bg-[#F0EBE1] text-[#222222]' 
                : 'bg-[#FAF7F2] text-[#222222]';

          return (
            <section 
              key={section.id || secIdx} 
              className={`py-12 sm:py-16 ${bgThemeClass} border-b border-[#EAE3DA]/60 last:border-b-0`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* ------------------------------------------------------------- */}
                {/* BLOCK A: STORY & RICH MEDIA (story-split / rich_text_media)   */}
                {/* ------------------------------------------------------------- */}
                {(section.type === 'story-split' || section.type === 'rich_text_media') && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* Story Copy */}
                    <div className={`space-y-5 ${
                      (section.storyContent?.image || section.image) ? 'lg:col-span-7' : 'lg:col-span-10 lg:col-start-2'
                    } ${
                      (section.storyContent?.imagePosition === 'left' || section.imagePosition === 'left') ? 'lg:order-2' : 'lg:order-1'
                    }`}>
                      
                      {section.badge && (
                        <span className="text-[10px] font-mono tracking-[0.24em] text-[#771722] uppercase font-bold block">
                          {section.badge}
                        </span>
                      )}

                      {section.title && (
                        <h2 className="text-2xl sm:text-4xl font-serif leading-tight">
                          {section.title}
                        </h2>
                      )}

                      {section.subtitle && (
                        <div className="text-xs sm:text-sm font-sans font-medium text-[#C5A880] tracking-wider uppercase">
                          {section.subtitle}
                        </div>
                      )}

                      {/* Paragraphs */}
                      {section.storyContent?.paragraphs && section.storyContent.paragraphs.length > 0 ? (
                        <div className="space-y-4 text-xs sm:text-sm font-sans leading-relaxed text-[#55504A]">
                          {section.storyContent.paragraphs.map((p, pIdx) => (
                            <p key={pIdx}>{p}</p>
                          ))}
                        </div>
                      ) : section.content ? (
                        <div className="space-y-4 text-xs sm:text-sm font-sans leading-relaxed text-[#55504A] whitespace-pre-line">
                          <p>{section.content}</p>
                        </div>
                      ) : null}

                      {/* Pull Quote */}
                      {(section.storyContent?.quote || section.quote) && (
                        <div className="border-l-2 border-[#C5A880] pl-5 py-2 space-y-1">
                          <blockquote className="font-serif italic text-sm sm:text-base text-[#141210]">
                            &ldquo;{section.storyContent?.quote || section.quote}&rdquo;
                          </blockquote>
                          {(section.storyContent?.quoteAuthor || section.quoteAuthor) && (
                            <cite className="block text-[11px] font-mono text-[#8C827A] not-italic">
                              &mdash; {section.storyContent?.quoteAuthor || section.quoteAuthor}
                            </cite>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Side Photo */}
                    {(section.storyContent?.image || section.image) && (
                      <div className={`lg:col-span-5 ${
                        (section.storyContent?.imagePosition === 'left' || section.imagePosition === 'left') ? 'lg:order-1' : 'lg:order-2'
                      }`}>
                        <div className="relative overflow-hidden shadow-2xl border border-[#EAE3DA]">
                          <img 
                            src={section.storyContent?.image || section.image} 
                            alt={section.title || page.title} 
                            className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* BLOCK B: FEATURE & PILLAR GRID (feature-grid / feature_grid) */}
                {/* ------------------------------------------------------------- */}
                {(section.type === 'feature-grid' || section.type === 'feature_grid') && (
                  <div className="space-y-10">
                    <div className="text-center max-w-3xl mx-auto space-y-2">
                      {section.badge && (
                        <span className="text-[10px] font-mono tracking-[0.24em] text-[#771722] uppercase font-bold block">
                          {section.badge}
                        </span>
                      )}
                      {section.title && (
                        <h2 className="text-2xl sm:text-4xl font-serif">
                          {section.title}
                        </h2>
                      )}
                      {section.subtitle && (
                        <p className="text-xs sm:text-sm text-[#706860] font-sans">
                          {section.subtitle}
                        </p>
                      )}
                    </div>

                    <div className={`grid grid-cols-1 md:grid-cols-2 ${
                      section.gridColumns === 2 
                        ? 'lg:grid-cols-2' 
                        : section.gridColumns === 4 
                          ? 'lg:grid-cols-4' 
                          : 'lg:grid-cols-3'
                    } gap-6`}>
                      {(section.items || []).map((item, idx) => {
                        const Icon = getFeatureIcon(item.icon);
                        return (
                          <div 
                            key={item.id || idx}
                            className="p-6 bg-white border border-[#EAE3DA] rounded-none hover:shadow-xl transition-all duration-300 space-y-3 relative group"
                          >
                            <div className="flex items-center justify-between">
                              <div className="w-8 h-8 rounded bg-[#FAF7F2] border border-[#EAE3DA] flex items-center justify-center text-[#771722] group-hover:bg-[#771722] group-hover:text-white transition-colors">
                                <Icon className="w-4 h-4" />
                              </div>

                              {(item.badge || item.tag) && (
                                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A880] font-bold">
                                  {item.badge || item.tag}
                                </span>
                              )}
                            </div>

                            <h3 className="text-base sm:text-lg font-serif text-[#222222] group-hover:text-[#771722] transition-colors pt-1">
                              {item.title}
                            </h3>

                            {item.description && (
                              <p className="text-xs text-[#666058] font-sans leading-relaxed">
                                {item.description}
                              </p>
                            )}

                            {(item.linkText || item.link) && (
                              <button
                                onClick={() => handleCtaClick(item.linkUrl || item.link)}
                                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#771722] hover:text-[#8E1E2C] pt-2"
                              >
                                <span>{item.linkText || 'Learn More'}</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* BLOCK C: STATS COUNTERS (stats-counter / stats_counter)       */}
                {/* ------------------------------------------------------------- */}
                {(section.type === 'stats-counter' || section.type === 'stats_counter') && (
                  <div className="bg-[#141210] text-[#FAF7F2] p-8 sm:p-12 border border-[#2E2822] shadow-2xl">
                    <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
                      {section.badge && (
                        <span className="text-[10px] font-mono tracking-[0.24em] text-[#C5A880] uppercase font-semibold block">
                          {section.badge}
                        </span>
                      )}
                      {section.title && (
                        <h2 className="text-xl sm:text-3xl font-serif text-[#FAF7F2]">
                          {section.title}
                        </h2>
                      )}
                      {section.subtitle && (
                        <p className="text-xs text-[#8C827A] font-sans">
                          {section.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                      {(section.stats || []).map((stat, idx) => (
                        <div key={idx} className="p-5 border border-[#2E2822] bg-[#191613]">
                          <div className="text-2xl sm:text-4xl font-serif font-bold text-[#C5A880] mb-1">
                            {stat.value}
                          </div>
                          <div className="text-xs font-sans font-semibold text-[#FAF7F2] uppercase tracking-wider">
                            {stat.label}
                          </div>
                          {(stat.subtext || stat.sublabel) && (
                            <div className="text-[10px] font-mono text-[#8C827A] mt-1">
                              {stat.subtext || stat.sublabel}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* BLOCK D: FAQ ACCORDION (faq-accordion / faq_accordion)        */}
                {/* ------------------------------------------------------------- */}
                {(section.type === 'faq-accordion' || section.type === 'faq_accordion') && (
                  <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                      {section.badge && (
                        <span className="text-[10px] font-mono tracking-[0.24em] text-[#771722] uppercase font-bold block">
                          {section.badge}
                        </span>
                      )}
                      {section.title && (
                        <h2 className="text-2xl sm:text-3xl font-serif">
                          {section.title}
                        </h2>
                      )}
                      {section.subtitle && (
                        <p className="text-xs sm:text-sm text-[#706860]">
                          {section.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      {(section.faqs || []).map((faq, idx) => {
                        const isOpen = openFaqIndex === idx;
                        return (
                          <div 
                            key={idx}
                            className="bg-white border border-[#EAE3DA] overflow-hidden transition-all shadow-xs"
                          >
                            <button
                              onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-serif text-sm sm:text-base text-[#222222] hover:text-[#771722] transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                {faq.category && (
                                  <span className="text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded bg-[#FAF7F2] text-[#771722] border border-[#EAE3DA] hidden sm:inline">
                                    {faq.category}
                                  </span>
                                )}
                                <span className="font-medium">{faq.question}</span>
                              </div>
                              <ChevronDown className={`w-4 h-4 text-[#C5A880] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                >
                                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#55504A] font-sans leading-relaxed border-t border-[#F2EDE4] pt-3">
                                    {faq.answer}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* BLOCK E: CALL TO ACTION BANNER (cta-banner / cta_banner)      */}
                {/* ------------------------------------------------------------- */}
                {(section.type === 'cta-banner' || section.type === 'cta_banner') && (
                  <div className="bg-[#191613] text-[#FAF7F2] p-8 sm:p-14 border-t-2 border-[#C5A880] shadow-2xl relative overflow-hidden">
                    {section.ctaBgImage && (
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={section.ctaBgImage} 
                          alt="Banner background" 
                          className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-[#191613]/80" />
                      </div>
                    )}

                    <div className="max-w-3xl space-y-4 relative z-10">
                      {section.badge && (
                        <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase block">
                          {section.badge}
                        </span>
                      )}
                      {section.title && (
                        <h2 className="text-2xl sm:text-4xl font-serif text-[#FAF7F2]">
                          {section.title}
                        </h2>
                      )}
                      {section.subtitle && (
                        <p className="text-xs sm:text-sm text-[#C8BFB5] font-sans leading-relaxed">
                          {section.subtitle}
                        </p>
                      )}

                      <div className="pt-4 flex flex-wrap items-center gap-4">
                        <button
                          onClick={() => handleCtaClick(section.ctaLink, section.ctaAction)}
                          className="inline-flex items-center gap-2 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] px-6 py-3.5 text-xs font-sans font-semibold tracking-wider uppercase transition-colors shadow-lg cursor-pointer"
                        >
                          <span>{section.ctaButtonText || section.ctaText || 'REQUEST ACCESS'}</span>
                          <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                        </button>

                        <button
                          onClick={() => {
                            const msg = section.ctaWhatsappMsg || `Hello Arwin Rise Concierge, I am inquiring about ${page.title}.`;
                            window.open(
                              `https://wa.me/${settings.whatsappPhone || '918464955321'}?text=${encodeURIComponent(msg)}`,
                              '_blank'
                            );
                          }}
                          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#22BE5C] text-black px-5 py-3.5 text-xs font-sans font-bold tracking-wider uppercase transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp Desk</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* BLOCK F: PHOTO GALLERY (gallery-grid / gallery_slider)        */}
                {/* ------------------------------------------------------------- */}
                {(section.type === 'gallery-grid' || section.type === 'gallery_slider') && (
                  <div className="space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-1">
                      {section.badge && (
                        <span className="text-[10px] font-mono tracking-[0.24em] text-[#771722] uppercase font-bold block">
                          {section.badge}
                        </span>
                      )}
                      {section.title && <h2 className="text-2xl sm:text-3xl font-serif">{section.title}</h2>}
                      {section.subtitle && <p className="text-xs text-[#706860] font-sans">{section.subtitle}</p>}
                    </div>

                    <div className={`grid grid-cols-1 sm:grid-cols-2 ${
                      section.galleryLayout === 'grid-2' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
                    } gap-5`}>
                      {section.galleryImages && section.galleryImages.length > 0 ? (
                        section.galleryImages.map((img, idx) => (
                          <div key={img.id || idx} className="overflow-hidden border border-[#EAE3DA] shadow-md group bg-white">
                            <div className="h-64 sm:h-72 overflow-hidden">
                              <img 
                                src={img.image} 
                                alt={img.title || `Showcase ${idx + 1}`} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                              />
                            </div>
                            {(img.title || img.description) && (
                              <div className="p-4 space-y-1">
                                {img.title && <div className="text-xs font-serif font-bold text-[#222222]">{img.title}</div>}
                                {img.description && <div className="text-[11px] text-[#706860] font-sans">{img.description}</div>}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        (section.images || []).map((imgUrl, idx) => (
                          <div key={idx} className="h-64 overflow-hidden border border-[#EAE3DA] shadow-sm">
                            <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* BLOCK G: CUSTOM EMBED / HTML (custom-html / embed_code)       */}
                {/* ------------------------------------------------------------- */}
                {(section.type === 'custom-html' || section.type === 'embed_code') && (
                  <div className="max-w-5xl mx-auto space-y-4">
                    {section.title && (
                      <div className="text-center space-y-1">
                        <h2 className="text-xl sm:text-2xl font-serif">{section.title}</h2>
                        {section.subtitle && <p className="text-xs text-[#706860] font-sans">{section.subtitle}</p>}
                      </div>
                    )}
                    <div 
                      className="overflow-hidden rounded shadow-md"
                      dangerouslySetInnerHTML={{ __html: section.customHtml || section.content || '' }} 
                    />
                  </div>
                )}

              </div>
            </section>
          );
        })}
      </div>

    </div>
  );
};
