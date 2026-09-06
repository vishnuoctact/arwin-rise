import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { ImageInputWithPicker } from './ImageInputWithPicker';
import { CustomDynamicPage } from '../../pages/CustomDynamicPage';
import {
  CustomPage,
  PageSectionBlock,
  PageSectionType,
  PageSectionItem,
  PageSectionStat,
  PageSectionFaq
} from '../../types/admin';
import {
  FileCode,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  Check,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Search,
  ExternalLink,
  Layers,
  HelpCircle,
  BarChart3,
  Image as ImageIcon,
  Code2,
  CheckCircle2,
  X,
  Sliders,
  ShieldCheck,
  Building2,
  Globe,
  Award,
  Star,
  Key,
  Compass,
  FileText
} from 'lucide-react';

interface CustomPagesManagerProps {
  showToast: (msg: string) => void;
}

export const CustomPagesManager: React.FC<CustomPagesManagerProps> = ({ showToast }) => {
  const {
    customPages,
    addCustomPage,
    updateCustomPage,
    deleteCustomPage,
    addPageSection,
    updatePageSection,
    deletePageSection,
    reorderPageSections
  } = useContent();

  // Navigation / Active View State
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals State
  const [isCreatingPage, setIsCreatingPage] = useState(false);
  const [editingPageMeta, setEditingPageMeta] = useState<CustomPage | null>(null);
  const [editingSection, setEditingSection] = useState<{ pageId: string; section: PageSectionBlock } | null>(null);
  const [isAddingSectionModal, setIsAddingSectionModal] = useState<{ pageId: string } | null>(null);
  const [previewPage, setPreviewPage] = useState<CustomPage | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Active page if in Section Builder mode
  const activePage = (customPages || []).find(p => p.id === selectedPageId) || null;

  // Filtered pages list
  const filteredPages = (customPages || []).filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  });

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}/#page-${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    showToast(`Page URL copied to clipboard: /#page-${slug}`);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  const handleDuplicatePage = (page: CustomPage) => {
    const newSlug = `${page.slug}-copy-${Math.floor(Math.random() * 1000)}`;
    const clonedPage: CustomPage = {
      ...page,
      id: `page-${Date.now()}`,
      slug: newSlug,
      title: `${page.title} (Copy)`,
      isPublished: false,
      sections: page.sections.map((s, idx) => ({
        ...s,
        id: `section-${Date.now()}-${idx}`
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    addCustomPage(clonedPage);
    showToast(`Page duplicated as "${clonedPage.title}"`);
  };

  // -------------------------------------------------------------
  // SECTION BUILDER TEMPLATE CATALOG
  // -------------------------------------------------------------
  const SECTION_TEMPLATES: {
    type: PageSectionType;
    title: string;
    description: string;
    icon: React.ElementType;
    badge: string;
    defaultData: Partial<PageSectionBlock>;
  }[] = [
    {
      type: 'story-split',
      title: 'Editorial Story & Media',
      description: 'Split-column editorial narrative with paragraphs, pull quote, author credit, and luxury side photography.',
      icon: FileText,
      badge: 'Editorial',
      defaultData: {
        title: 'The Philosophy of Rare Living',
        subtitle: 'Heritage & Craftsmanship',
        badge: 'Curated Heritage',
        bgTheme: 'light',
        storyContent: {
          paragraphs: [
            'At ARWIN RISE, every square foot is conceived not merely as high-value real estate, but as an enduring sanctuary designed for generational prestige.',
            'Our architectural lineage bridges uncompromising bespoke engineering with the serene privacy demanded by the global diaspora.'
          ],
          image: '/images/hero-luxury-penthouse.jpg',
          imagePosition: 'right',
          quote: 'True luxury is silent, enduring, and meticulously detailed.',
          quoteAuthor: 'Arwin Advisory Council'
        }
      }
    },
    {
      type: 'feature-grid',
      title: 'Feature & Pillar Grid',
      description: 'Multi-column cards grid (2, 3, or 4 columns) showcasing benefits, certifications, or property highlights.',
      icon: Layers,
      badge: 'Grid Cards',
      defaultData: {
        title: 'Institutional Standards & Benefits',
        subtitle: 'Why Discerning Buyers Choose Us',
        badge: 'Core Pillars',
        bgTheme: 'warm',
        gridColumns: 3,
        items: [
          {
            id: 'feat-1',
            icon: 'ShieldCheck',
            title: '100% Clear Title Guarantee',
            description: 'Triple-tier legal verification conducted by senior High Court advocates.',
            badge: 'Verified'
          },
          {
            id: 'feat-2',
            icon: 'Globe',
            title: 'Cross-Border NRI Escrow',
            description: 'RBI-compliant NRE/NRO remittance conduits with zero currency friction.',
            badge: 'FEMA Ready'
          },
          {
            id: 'feat-3',
            icon: 'Sparkles',
            title: 'White-Glove Asset Management',
            description: 'Full tenancy curation, quarterly asset audits, and private concierge.',
            badge: 'VIP Service'
          }
        ]
      }
    },
    {
      type: 'stats-counter',
      title: 'Stats & Milestone Showcase',
      description: 'Architectural metric counters highlighting asset values, footprint, ROI track record, or client count.',
      icon: BarChart3,
      badge: 'Metrics',
      defaultData: {
        title: 'Our Track Record in Numbers',
        subtitle: 'Proven Performance Across Corridors',
        badge: 'Portfolio Scale',
        bgTheme: 'dark',
        stats: [
          { id: 'stat-1', value: '₹4,200 Cr+', label: 'Asset Value Advised', subtext: 'Across Prime Corridors' },
          { id: 'stat-2', value: '18.4%', label: 'Average 3-Yr CAGR', subtext: 'Neopolis & Financial Dist' },
          { id: 'stat-3', value: '100%', label: 'RERA Compliance', subtext: 'Unconditional Approvals' },
          { id: 'stat-4', value: '1,200+', label: 'Global Families', subtext: 'USA, UAE, Singapore' }
        ]
      }
    },
    {
      type: 'faq-accordion',
      title: 'Interactive FAQ Accordion',
      description: 'Collapsible accordion questions and answers for legal diligence, buyer queries, or onboarding guides.',
      icon: HelpCircle,
      badge: 'Q&A',
      defaultData: {
        title: 'Frequently Asked Questions',
        subtitle: 'Clear Answers for Discerning Buyers',
        badge: 'Knowledge Base',
        bgTheme: 'light',
        faqs: [
          {
            id: 'faq-1',
            question: 'How does ARWIN RISE verify property title clearances?',
            answer: 'Every property in our curated collection undergoes a 30-year revenue title search, Encumbrance Certificate verification, TS-RERA approval check, and dual-advocate title certification.',
            category: 'Legal'
          },
          {
            id: 'faq-2',
            question: 'Can non-resident Indians (NRIs) purchase properties remotely?',
            answer: 'Yes. We facilitate fully digital documentation, Power of Attorney (PoA) authentication via Indian Consulates, and direct NRE/NRO bank remittance channels.',
            category: 'NRI Desk'
          }
        ]
      }
    },
    {
      type: 'cta-banner',
      title: 'High-Conversion CTA Banner',
      description: 'Full-width luxury callout with VIP consultation triggers, WhatsApp concierge, or private preview bookings.',
      icon: ShieldCheck,
      badge: 'Call to Action',
      defaultData: {
        title: 'Request a Private Consultation',
        subtitle: 'Speak with our Senior Property Advisors for an exclusive portfolio presentation.',
        badge: 'Exclusive Access',
        bgTheme: 'dark',
        ctaButtonText: 'REQUEST PRIVATE ACCESS',
        ctaAction: 'preview-modal',
        ctaBgImage: '/images/hero-villa.jpg',
        ctaWhatsappMsg: 'Hello, I would like to schedule a private portfolio consultation.'
      }
    },
    {
      type: 'gallery-grid',
      title: 'Photo & Media Showcase',
      description: 'Curated high-resolution imagery grid (2-col, 3-col, or masonry) with captions and photography credits.',
      icon: ImageIcon,
      badge: 'Photography',
      defaultData: {
        title: 'Architectural Photography & Spaces',
        subtitle: 'Immerse in the Craftsmanship',
        badge: 'Visual Showcase',
        bgTheme: 'light',
        galleryLayout: 'grid-3',
        galleryImages: [
          { id: 'img-1', image: '/images/hero-luxury-penthouse.jpg', title: 'Grand Double-Height Living', description: 'Italian statuario marble and panoramic skyline views' },
          { id: 'img-2', image: '/images/hero-penthouse.jpg', title: 'Private Sky Deck', description: 'Infinity plunge pool overlooking Hyderabad greenery' },
          { id: 'img-3', image: '/images/hero-villa.jpg', title: 'Curated Landscaped Courtyard', description: 'Zen water features and tranquil outdoor sanctuaries' }
        ]
      }
    },
    {
      type: 'custom-html',
      title: 'Custom HTML / Embed Block',
      description: 'Embed interactive Google Maps, Matterport 3D virtual walkthroughs, YouTube/Vimeo embeds, or custom HTML.',
      icon: Code2,
      badge: 'Code Embed',
      defaultData: {
        title: 'Location & Interactive Showcase',
        subtitle: 'Explore the Prime Corridor',
        badge: 'Interactive',
        bgTheme: 'light',
        customHtml: '<div style="width: 100%; height: 350px; background: #1F1C18; display: flex; align-items: center; justify-content: center; color: #C5A880; font-family: sans-serif; border: 1px dashed #C5A880; border-radius: 8px;">\n  <p style="text-align:center;"><strong>Interactive Map / 3D Virtual Tour Embed Placeholder</strong><br/><span style="font-size: 12px; color: #8C827A;">Replace with your Google Maps iFrame or Matterport 3D Tour Embed Code</span></p>\n</div>'
      }
    }
  ];

  // =============================================================
  // RENDER: SECTION BUILDER FOR SELECTED PAGE
  // =============================================================
  if (selectedPageId && activePage) {
    return (
      <div className="space-y-6 max-w-6xl">
        
        {/* Top Header & Breadcrumb */}
        <div className="bg-[#14110E] border border-[#24201C] p-5 rounded-xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedPageId(null)}
                className="text-xs text-[#C5A880] hover:text-[#E0C9A6] font-mono flex items-center gap-1 cursor-pointer"
              >
                &larr; All Custom Pages
              </button>
              <span className="text-neutral-600">/</span>
              <span className="text-xs text-neutral-400 font-mono">Page Builder</span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] font-semibold">
                {activePage.title}
              </h1>
              <span className={`text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded ${
                activePage.isPublished 
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40' 
                  : 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
              }`}>
                {activePage.isPublished ? '● Published' : '○ Draft'}
              </span>
              {activePage.showInNav && (
                <span className="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded bg-[#771722]/30 text-[#C5A880] border border-[#771722]/50">
                  Nav Menu
                </span>
              )}
              {activePage.showInFooter && (
                <span className="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                  Footer
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-[#8C827A] font-mono">
              <span>Public Route:</span>
              <code className="text-[#C5A880] bg-[#0A0908] px-2 py-0.5 rounded border border-[#26201B]">
                /#page-{activePage.slug}
              </code>
              <button
                onClick={() => handleCopyLink(activePage.slug)}
                className="hover:text-white transition-colors cursor-pointer"
                title="Copy URL"
              >
                {copiedSlug === activePage.slug ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setEditingPageMeta(activePage)}
              className="px-3.5 py-2 bg-[#1A1613] hover:bg-[#26201B] text-[#FAF7F2] border border-[#38312B] rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Page & Hero Settings</span>
            </button>

            <button
              onClick={() => setPreviewPage(activePage)}
              className="px-3.5 py-2 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Live Preview</span>
            </button>
          </div>
        </div>

        {/* Modular Sections Stack */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#24201C]">
            <div>
              <h2 className="text-sm font-mono uppercase font-semibold text-[#FAF7F2] tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C5A880]" />
                <span>Page Sections ({activePage.sections?.length || 0})</span>
              </h2>
              <p className="text-xs text-[#8C827A] font-sans mt-0.5">
                Sections render vertically on the page in the order shown below. Drag or use arrows to reorder.
              </p>
            </div>

            <button
              onClick={() => setIsAddingSectionModal({ pageId: activePage.id })}
              className="px-3 py-1.5 bg-[#C5A880] hover:bg-[#D4BC96] text-[#141210] font-semibold rounded-lg text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Section
            </button>
          </div>

          {/* Sections List */}
          {(!activePage.sections || activePage.sections.length === 0) ? (
            <div className="bg-[#14110E] border border-dashed border-[#38312B] rounded-xl p-10 text-center space-y-3">
              <Layers className="w-10 h-10 text-[#554D45] mx-auto" />
              <div className="text-sm text-[#FAF7F2] font-serif">No Sections Added Yet</div>
              <p className="text-xs text-[#8C827A] max-w-md mx-auto">
                This page currently only displays the Hero banner. Choose from our 7 luxury block templates below to build rich interactive content.
              </p>
              <button
                onClick={() => setIsAddingSectionModal({ pageId: activePage.id })}
                className="px-4 py-2 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#C5A880]" /> Add Your First Section
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {activePage.sections.map((sec, index) => {
                const template = SECTION_TEMPLATES.find(t => t.type === sec.type);
                const Icon = template?.icon || Layers;

                return (
                  <div
                    key={sec.id}
                    className={`bg-[#14110E] border rounded-xl p-4 sm:p-5 transition-all shadow-md group ${
                      sec.isHidden ? 'border-neutral-800 opacity-60' : 'border-[#26201B] hover:border-[#C5A880]/40'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      
                      {/* Left: Type badge & Details */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-8 h-8 rounded-lg bg-[#1F1C18] border border-[#38312B] flex items-center justify-center text-[#C5A880] shrink-0 font-mono text-xs font-bold">
                          {String(index + 1).padStart(2, '0')}
                        </div>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded bg-[#771722]/30 text-[#C5A880] border border-[#771722]/50 flex items-center gap-1">
                              <Icon className="w-3 h-3" />
                              {template?.title || sec.type}
                            </span>
                            <span className="text-[10px] font-mono text-[#706860]">
                              Theme: {sec.bgTheme || 'light'}
                            </span>
                            {sec.isHidden && (
                              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                                Hidden
                              </span>
                            )}
                          </div>

                          <h3 className="text-sm sm:text-base font-serif text-[#FAF7F2] font-semibold">
                            {sec.title || 'Untitled Section'}
                          </h3>
                          {sec.subtitle && (
                            <p className="text-xs text-[#8C827A] font-sans">
                              {sec.subtitle}
                            </p>
                          )}

                          {/* Quick Summary Counts */}
                          <div className="text-[11px] text-[#A39A90] font-sans pt-1 flex items-center gap-3">
                            {sec.type === 'feature-grid' && (
                              <span>🏛️ {sec.items?.length || 0} Feature Cards &bull; {sec.gridColumns || 3} Columns</span>
                            )}
                            {sec.type === 'stats-counter' && (
                              <span>📊 {sec.stats?.length || 0} Metrics Displayed</span>
                            )}
                            {sec.type === 'faq-accordion' && (
                              <span>❓ {sec.faqs?.length || 0} Questions & Answers</span>
                            )}
                            {sec.type === 'gallery-grid' && (
                              <span>🖼️ {sec.galleryImages?.length || 0} Showcase Photos</span>
                            )}
                            {sec.type === 'story-split' && (
                              <span>📝 {sec.storyContent?.paragraphs?.length || 0} Paragraphs &bull; Photo on {sec.storyContent?.imagePosition || 'right'}</span>
                            )}
                            {sec.type === 'cta-banner' && (
                              <span>🛎️ Action: {sec.ctaAction || 'Modal'} &bull; Button: &quot;{sec.ctaButtonText || 'CTA'}&quot;</span>
                            )}
                            {sec.type === 'custom-html' && (
                              <span>💻 Custom HTML / iFrame Embed</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions (Reorder, Visibility, Edit, Delete) */}
                      <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#26201B] w-full sm:w-auto justify-end">
                        {/* Move Up */}
                        <button
                          onClick={() => reorderPageSections(activePage.id, index, index - 1)}
                          disabled={index === 0}
                          className="p-1.5 rounded-lg bg-[#1A1613] hover:bg-[#26201B] text-neutral-300 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>

                        {/* Move Down */}
                        <button
                          onClick={() => reorderPageSections(activePage.id, index, index + 1)}
                          disabled={index === activePage.sections.length - 1}
                          className="p-1.5 rounded-lg bg-[#1A1613] hover:bg-[#26201B] text-neutral-300 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        {/* Visibility Toggle */}
                        <button
                          onClick={() => {
                            updatePageSection(activePage.id, {
                              ...sec,
                              isHidden: !sec.isHidden
                            });
                            showToast(sec.isHidden ? 'Section is now visible' : 'Section hidden');
                          }}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            sec.isHidden ? 'bg-neutral-800 text-neutral-500' : 'bg-[#1A1613] text-[#C5A880] hover:bg-[#26201B]'
                          }`}
                          title={sec.isHidden ? 'Make Section Visible' : 'Hide Section'}
                        >
                          {sec.isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>

                        {/* Edit Section */}
                        <button
                          onClick={() => setEditingSection({ pageId: activePage.id, section: sec })}
                          className="px-3 py-1.5 rounded-lg bg-[#771722]/80 hover:bg-[#771722] text-white text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                          title="Edit Section Content"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        {/* Delete Section */}
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${sec.title || 'this section'}"?`)) {
                              deletePageSection(activePage.id, sec.id);
                              showToast('Section removed');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-950/80 text-red-400 border border-red-900/40 transition-colors cursor-pointer"
                          title="Delete Section"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick Add Template Grid at Bottom */}
          <div className="pt-6 border-t border-[#24201C] space-y-3">
            <h3 className="text-xs font-mono uppercase font-semibold text-[#C5A880] tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Available Section Templates (Click to Add)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SECTION_TEMPLATES.map((tmpl) => {
                const Icon = tmpl.icon;
                return (
                  <button
                    key={tmpl.type}
                    onClick={() => {
                      const newBlock: PageSectionBlock = {
                        id: `sec-${Date.now()}`,
                        type: tmpl.type,
                        title: tmpl.defaultData.title || '',
                        subtitle: tmpl.defaultData.subtitle,
                        badge: tmpl.defaultData.badge,
                        bgTheme: tmpl.defaultData.bgTheme || 'light',
                        storyContent: tmpl.defaultData.storyContent,
                        gridColumns: tmpl.defaultData.gridColumns,
                        items: tmpl.defaultData.items,
                        stats: tmpl.defaultData.stats,
                        faqs: tmpl.defaultData.faqs,
                        ctaButtonText: tmpl.defaultData.ctaButtonText,
                        ctaAction: tmpl.defaultData.ctaAction,
                        ctaBgImage: tmpl.defaultData.ctaBgImage,
                        ctaWhatsappMsg: tmpl.defaultData.ctaWhatsappMsg,
                        galleryLayout: tmpl.defaultData.galleryLayout,
                        galleryImages: tmpl.defaultData.galleryImages,
                        customHtml: tmpl.defaultData.customHtml
                      };
                      addPageSection(activePage.id, newBlock);
                      showToast(`Added "${tmpl.title}" section`);
                    }}
                    className="p-4 bg-[#14110E] hover:bg-[#1C1814] border border-[#26201B] hover:border-[#C5A880]/60 rounded-xl text-left transition-all space-y-2 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-7 h-7 rounded-lg bg-[#1F1C18] border border-[#38312B] flex items-center justify-center text-[#C5A880] group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-[#C5A880] uppercase">
                        + Add
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-serif font-bold text-[#FAF7F2] group-hover:text-[#C5A880] transition-colors">
                        {tmpl.title}
                      </div>
                      <p className="text-[11px] text-[#8C827A] font-sans mt-0.5 line-clamp-2">
                        {tmpl.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modals for Section Editing & Page Settings */}
        {renderModals()}
      </div>
    );
  }

  // =============================================================
  // RENDER: ALL CUSTOM PAGES OVERVIEW (DEFAULT VIEW)
  // =============================================================
  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Top Header & Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] flex items-center gap-2.5">
            <FileCode className="w-6 h-6 text-[#C5A880]" />
            <span>Custom Pages & Modular Sections CMS</span>
          </h1>
          <p className="text-xs text-neutral-400 font-sans mt-1">
            Create brand-new luxury pages, customize hero imagery, manage header/footer navigation inclusion, and build dynamic multi-block sections.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingPage(true)}
          className="px-4 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg hover:shadow-[#771722]/30 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C5A880]" />
          <span>Create New Page</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#14110E] border border-[#24201C] p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C827A]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, slug, or category..."
            className="w-full pl-9 pr-4 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2] placeholder-[#706860] focus:outline-none focus:border-[#C5A880]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="text-xs text-[#8C827A] font-mono self-end sm:self-center">
          Showing {filteredPages.length} of {(customPages || []).length} Custom Pages
        </div>
      </div>

      {/* Custom Pages Grid / Table */}
      {filteredPages.length === 0 ? (
        <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-12 text-center space-y-3">
          <FileCode className="w-10 h-10 text-[#554D45] mx-auto" />
          <div className="text-base text-[#FAF7F2] font-serif">No Custom Pages Found</div>
          <p className="text-xs text-[#8C827A] max-w-md mx-auto">
            {searchQuery 
              ? `No pages match your search term "${searchQuery}".` 
              : 'You have not created any custom pages yet. Click the button below to get started.'}
          </p>
          <button
            onClick={() => setIsCreatingPage(true)}
            className="px-4 py-2 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#C5A880]" /> Create Page
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPages.map((page) => (
            <div
              key={page.id}
              className="bg-[#14110E] border border-[#24201C] hover:border-[#C5A880]/50 rounded-xl p-5 space-y-4 transition-all shadow-lg flex flex-col justify-between"
            >
              {/* Top info */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded bg-[#771722]/20 text-[#C5A880] border border-[#771722]/40">
                    {page.category || 'Custom Page'}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded ${
                      page.isPublished 
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40' 
                        : 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                    }`}>
                      {page.isPublished ? '● Live' : '○ Draft'}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-serif font-bold text-[#FAF7F2] line-clamp-1">
                    {page.title}
                  </h3>
                  {page.heroSubtitle && (
                    <p className="text-xs text-[#8C827A] font-sans mt-0.5 line-clamp-2">
                      {page.heroSubtitle}
                    </p>
                  )}
                </div>

                {/* Slug & Visibility Badges */}
                <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#C5A880] bg-[#0A0908] px-2.5 py-1 rounded border border-[#26201B]">
                    <span>/#page-{page.slug}</span>
                    <button
                      onClick={() => handleCopyLink(page.slug)}
                      className="hover:text-white transition-colors cursor-pointer"
                      title="Copy Public URL"
                    >
                      {copiedSlug === page.slug ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>

                  <span className="text-[10px] font-mono text-[#8C827A] px-2 py-1 rounded bg-[#1A1613] border border-[#26201B]">
                    {page.sections?.length || 0} Sections
                  </span>

                  {page.showInNav && (
                    <span className="text-[10px] font-mono text-neutral-300 px-2 py-1 rounded bg-[#1A1613] border border-[#26201B]" title="Visible in top navigation menu">
                      In Navbar
                    </span>
                  )}

                  {page.showInFooter && (
                    <span className="text-[10px] font-mono text-neutral-300 px-2 py-1 rounded bg-[#1A1613] border border-[#26201B]" title="Visible in footer menu">
                      In Footer
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#24201C] flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedPageId(page.id)}
                  className="px-3.5 py-2 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Manage Sections ({page.sections?.length || 0})</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPreviewPage(page)}
                    className="p-2 bg-[#1A1613] hover:bg-[#26201B] text-neutral-300 rounded-lg transition-colors cursor-pointer"
                    title="Live Preview"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                  </button>

                  <button
                    onClick={() => setEditingPageMeta(page)}
                    className="p-2 bg-[#1A1613] hover:bg-[#26201B] text-neutral-300 rounded-lg transition-colors cursor-pointer"
                    title="Edit Page Settings"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDuplicatePage(page)}
                    className="p-2 bg-[#1A1613] hover:bg-[#26201B] text-neutral-300 rounded-lg transition-colors cursor-pointer"
                    title="Duplicate Page"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete page "${page.title}" and all its sections?`)) {
                        deleteCustomPage(page.id);
                        showToast(`Deleted page "${page.title}"`);
                      }
                    }}
                    className="p-2 bg-red-950/30 hover:bg-red-950/80 text-red-400 border border-red-900/40 rounded-lg transition-colors cursor-pointer"
                    title="Delete Page"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Render all modal dialogs */}
      {renderModals()}
    </div>
  );

  // =============================================================
  // MODAL DIALOGS HELPER
  // =============================================================
  function renderModals() {
    return (
      <>
        {/* 1. CREATE PAGE MODAL */}
        {isCreatingPage && (
          <PageMetaModal
            isOpen={isCreatingPage}
            initialData={null}
            onClose={() => setIsCreatingPage(false)}
            onSave={(newPage) => {
              addCustomPage(newPage);
              setIsCreatingPage(false);
              setSelectedPageId(newPage.id);
              showToast(`Created new page "${newPage.title}"`);
            }}
          />
        )}

        {/* 2. EDIT PAGE META MODAL */}
        {editingPageMeta && (
          <PageMetaModal
            isOpen={!!editingPageMeta}
            initialData={editingPageMeta}
            onClose={() => setEditingPageMeta(null)}
            onSave={(updatedPage) => {
              updateCustomPage(updatedPage);
              setEditingPageMeta(null);
              showToast(`Updated settings for "${updatedPage.title}"`);
            }}
          />
        )}

        {/* 3. SECTION EDIT MODAL */}
        {editingSection && (
          <SectionEditorModal
            isOpen={!!editingSection}
            section={editingSection.section}
            onClose={() => setEditingSection(null)}
            onSave={(updatedSec) => {
              updatePageSection(editingSection.pageId, updatedSec);
              setEditingSection(null);
              showToast(`Saved changes to "${updatedSec.title || 'Section'}"`);
            }}
          />
        )}

        {/* 4. LIVE PREVIEW MODAL */}
        {previewPage && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-2 sm:p-6 overflow-hidden animate-in fade-in duration-200">
            <div className="bg-[#FAF7F2] text-[#222222] rounded-2xl flex-1 flex flex-col overflow-hidden shadow-2xl border border-[#C5A880]/40">
              
              {/* Preview Top bar */}
              <div className="bg-[#141210] text-[#FAF7F2] px-6 py-3.5 flex items-center justify-between border-b border-[#24201C]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold uppercase text-[#C5A880] tracking-widest">
                    LIVE PREVIEW
                  </span>
                  <span className="text-neutral-600">|</span>
                  <span className="text-sm font-serif font-bold text-[#FAF7F2]">
                    {previewPage.title}
                  </span>
                  <code className="text-xs text-[#C5A880] bg-[#1F1C18] px-2 py-0.5 rounded font-mono hidden md:inline">
                    /#page-{previewPage.slug}
                  </code>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`/#page-${previewPage.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-[#1F1C18] hover:bg-[#2A2621] text-xs text-[#FAF7F2] rounded flex items-center gap-1.5 transition-colors border border-[#38312B]"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink className="w-3 h-3 text-[#C5A880]" />
                  </a>

                  <button
                    onClick={() => setPreviewPage(null)}
                    className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Preview Body */}
              <div className="flex-1 overflow-y-auto bg-[#FAF7F2]">
                <CustomDynamicPage
                  page={previewPage}
                  onNavigateHome={() => setPreviewPage(null)}
                  onOpenPreview={() => alert('Private Preview Modal would trigger here')}
                  onNavigate={(page) => alert(`Navigation triggered to: ${page}`)}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
};

// =============================================================
// SUB-MODAL 1: PAGE META & HERO SETTINGS MODAL
// =============================================================
interface PageMetaModalProps {
  isOpen: boolean;
  initialData: CustomPage | null;
  onClose: () => void;
  onSave: (page: CustomPage) => void;
}

const PageMetaModal: React.FC<PageMetaModalProps> = ({
  initialData,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [category, setCategory] = useState(initialData?.category || 'Advisory & Diligence');
  const [heroTitle, setHeroTitle] = useState(initialData?.heroTitle || '');
  const [heroSubtitle, setHeroSubtitle] = useState(initialData?.heroSubtitle || '');
  const [heroImage, setHeroImage] = useState(initialData?.heroImage || '/images/hero-luxury-penthouse.jpg');
  const [heroCtaText, setHeroCtaText] = useState(initialData?.heroCtaText || 'REQUEST PRIVATE PREVIEW');
  const [isPublished, setIsPublished] = useState(initialData?.isPublished ?? true);
  const [showInNav, setShowInNav] = useState(initialData?.showInNav ?? false);
  const [showInFooter, setShowInFooter] = useState(initialData?.showInFooter ?? true);
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || '');

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialData) {
      // Auto-generate slug for new pages
      const genSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(genSlug);
      if (!heroTitle) setHeroTitle(val);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      alert('Please provide a Page Title and URL Slug.');
      return;
    }

    const cleanSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const pageData: CustomPage = {
      id: initialData?.id || `page-${Date.now()}`,
      slug: cleanSlug,
      title: title.trim(),
      category: category.trim(),
      heroTitle: heroTitle.trim() || title.trim(),
      heroSubtitle: heroSubtitle.trim(),
      heroImage: heroImage.trim(),
      heroCtaText: heroCtaText.trim(),
      isPublished,
      showInNav,
      showInFooter,
      seoTitle: seoTitle.trim(),
      seoDescription: seoDescription.trim(),
      sections: initialData?.sections || [],
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(pageData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#14110E] border border-[#C5A880]/40 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 text-[#FAF7F2] my-8 font-sans">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#24201C]">
          <div>
            <h2 className="text-lg sm:text-xl font-serif text-[#FAF7F2] font-semibold">
              {initialData ? `Edit Page: ${initialData.title}` : 'Create New Custom Page'}
            </h2>
            <p className="text-xs text-[#8C827A] mt-0.5">
              Configure general information, hero banner presentation, and SEO metadata.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#1F1C18]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Section 1: Basic Identifiers */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#C5A880] font-semibold">
              1. General Page Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Page Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Legal Diligence & Title Audit"
                  className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  URL Slug * (Route: /#page-{slug || 'slug'})
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. legal-diligence"
                  className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#C5A880] font-mono focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Category Tag / Header Badge
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Institutional Diligence · Advisory"
                  className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Hero Banner */}
          <div className="space-y-4 pt-3 border-t border-[#24201C]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#C5A880] font-semibold">
              2. Hero Header Presentation
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Hero Main Heading
                </label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  placeholder="e.g. Institutional Due Diligence & 30-Year Title Assurance"
                  className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2] font-serif focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Hero Subtitle / Description
                </label>
                <textarea
                  rows={2}
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  placeholder="e.g. Transparent, advocate-verified property documentation engineered for global NRI investors and family offices."
                  className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <ImageInputWithPicker
                label="Hero Background Photography"
                value={heroImage}
                onChange={setHeroImage}
              />

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Hero CTA Button Label
                </label>
                <input
                  type="text"
                  value={heroCtaText}
                  onChange={(e) => setHeroCtaText(e.target.value)}
                  placeholder="REQUEST PRIVATE PREVIEW"
                  className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Publishing & Visibility */}
          <div className="space-y-4 pt-3 border-t border-[#24201C]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#C5A880] font-semibold">
              3. Navigation & Publishing Controls
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0A0908] p-3.5 rounded-xl border border-[#26201B]">
              <label className="flex items-center gap-2 text-xs text-neutral-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="rounded text-[#771722] focus:ring-0"
                />
                <span>Published (Public Live)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-neutral-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showInNav}
                  onChange={(e) => setShowInNav(e.target.checked)}
                  className="rounded text-[#771722] focus:ring-0"
                />
                <span>Show in Header Nav</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-neutral-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showInFooter}
                  onChange={(e) => setShowInFooter(e.target.checked)}
                  className="rounded text-[#771722] focus:ring-0"
                />
                <span>Show in Footer</span>
              </label>
            </div>
          </div>

          {/* Section 4: SEO Metadata */}
          <div className="space-y-4 pt-3 border-t border-[#24201C]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#C5A880] font-semibold">
              4. Search Engine Optimization (SEO)
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Custom Meta Title
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder={`${title || 'Page Title'} | ARWIN RISE`}
                  className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Custom Meta Description
                </label>
                <textarea
                  rows={2}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Summary snippet for Google search listings and social media cards..."
                  className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-[#24201C] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#1A1613] hover:bg-[#26201B] text-neutral-300 rounded-lg text-xs font-medium transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all shadow-lg"
            >
              {initialData ? 'Save Page Settings' : 'Create & Open Builder'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

// =============================================================
// SUB-MODAL 2: SECTION BLOCK CONTENT EDITOR MODAL
// =============================================================
interface SectionEditorModalProps {
  isOpen: boolean;
  section: PageSectionBlock;
  onClose: () => void;
  onSave: (section: PageSectionBlock) => void;
}

const SectionEditorModal: React.FC<SectionEditorModalProps> = ({
  section,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<PageSectionBlock>({ ...section });

  const handleTextChange = (field: keyof PageSectionBlock, val: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-[#14110E] border border-[#C5A880]/40 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-6 text-[#FAF7F2] my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#24201C] shrink-0">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-[#C5A880] tracking-widest">
              Section Editor &bull; {formData.type.toUpperCase()}
            </span>
            <h2 className="text-lg sm:text-xl font-serif text-[#FAF7F2] font-semibold">
              {formData.title || 'Configure Section Content'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#1F1C18]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto pr-1 space-y-5">
          
          {/* 1. Header & Styling Controls */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#C5A880] font-semibold">
              1. Section Header & Theme
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Section Headline / Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTextChange('title', e.target.value)}
                  placeholder="e.g. Institutional Standards & Due Diligence"
                  className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Section Subtitle / Tagline
                </label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => handleTextChange('subtitle', e.target.value)}
                  placeholder="e.g. Uncompromising Legal & Structural Assurance"
                  className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Category Badge
                </label>
                <input
                  type="text"
                  value={formData.badge || ''}
                  onChange={(e) => handleTextChange('badge', e.target.value)}
                  placeholder="e.g. Verified Compliance"
                  className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Background Visual Theme
                </label>
                <select
                  value={formData.bgTheme || 'light'}
                  onChange={(e) => handleTextChange('bgTheme', e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="light">Ivory Cream (#FAF7F2)</option>
                  <option value="warm">Subtle Warm Sand (#F0EBE1)</option>
                  <option value="dark">Dark Obsidian (#141210)</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. Type-Specific Form Builders */}
          <div className="pt-4 border-t border-[#24201C] space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#C5A880] font-semibold">
              2. Content Configuration ({formData.type})
            </h3>

            {/* A. STORY SPLIT */}
            {formData.type === 'story-split' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Editorial Story Paragraphs (Separate paragraphs with a blank line)
                  </label>
                  <textarea
                    rows={6}
                    value={(formData.storyContent?.paragraphs || []).join('\n\n')}
                    onChange={(e) => {
                      const paras = e.target.value.split('\n\n').filter(p => p.trim());
                      setFormData(prev => ({
                        ...prev,
                        storyContent: {
                          ...prev.storyContent,
                          paragraphs: paras
                        }
                      }));
                    }}
                    placeholder="Enter editorial story paragraphs here..."
                    className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2] font-sans leading-relaxed focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ImageInputWithPicker
                    label="Side Feature Photograph"
                    value={formData.storyContent?.image || ''}
                    onChange={(url) => {
                      setFormData(prev => ({
                        ...prev,
                        storyContent: {
                          ...prev.storyContent,
                          image: url
                        }
                      }));
                    }}
                  />

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Photo Alignment Position
                    </label>
                    <select
                      value={formData.storyContent?.imagePosition || 'right'}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          storyContent: {
                            ...prev.storyContent,
                            imagePosition: e.target.value as 'left' | 'right'
                          }
                        }));
                      }}
                      className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="right">Image on Right / Story on Left</option>
                      <option value="left">Image on Left / Story on Right</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Pull Quote Text
                    </label>
                    <input
                      type="text"
                      value={formData.storyContent?.quote || ''}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          storyContent: {
                            ...prev.storyContent,
                            quote: e.target.value
                          }
                        }));
                      }}
                      placeholder="e.g. True luxury is silent, enduring, and meticulously detailed."
                      className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Pull Quote Author / Citation
                    </label>
                    <input
                      type="text"
                      value={formData.storyContent?.quoteAuthor || ''}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          storyContent: {
                            ...prev.storyContent,
                            quoteAuthor: e.target.value
                          }
                        }));
                      }}
                      placeholder="e.g. Arwin Advisory Council"
                      className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* B. FEATURE GRID */}
            {formData.type === 'feature-grid' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-neutral-300">Columns Layout:</label>
                    <div className="flex gap-2">
                      {[2, 3, 4].map(num => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, gridColumns: num as 2 | 3 | 4 }))}
                          className={`px-3 py-1 rounded text-xs font-mono ${
                            formData.gridColumns === num
                              ? 'bg-[#771722] text-white font-bold'
                              : 'bg-[#1A1613] text-neutral-400 hover:text-white'
                          }`}
                        >
                          {num} Columns
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newItems = [...(formData.items || [])];
                      newItems.push({
                        id: `feat-${Date.now()}`,
                        icon: 'ShieldCheck',
                        title: 'New Feature Highlight',
                        description: 'Describe the key benefit or institutional standard here.',
                        badge: 'Verified'
                      });
                      setFormData(prev => ({ ...prev, items: newItems }));
                    }}
                    className="px-3 py-1.5 bg-[#C5A880] hover:bg-[#D4BC96] text-[#141210] font-semibold rounded text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Card
                  </button>
                </div>

                {/* Items list */}
                <div className="space-y-3">
                  {(formData.items || []).map((item, idx) => (
                    <div key={item.id} className="bg-[#0A0908] border border-[#26201B] p-3.5 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#C5A880]">Card #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newItems = formData.items?.filter((_, i) => i !== idx);
                            setFormData(prev => ({ ...prev, items: newItems }));
                          }}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const newItems = [...(formData.items || [])];
                              newItems[idx].title = e.target.value;
                              setFormData(prev => ({ ...prev, items: newItems }));
                            }}
                            className="w-full px-2.5 py-1.5 bg-[#141210] border border-[#38312B] rounded text-xs text-[#FAF7F2]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Icon Type</label>
                          <select
                            value={item.icon || 'ShieldCheck'}
                            onChange={(e) => {
                              const newItems = [...(formData.items || [])];
                              newItems[idx].icon = e.target.value;
                              setFormData(prev => ({ ...prev, items: newItems }));
                            }}
                            className="w-full px-2.5 py-1.5 bg-[#141210] border border-[#38312B] rounded text-xs text-[#FAF7F2]"
                          >
                            <option value="ShieldCheck">Shield / Verified</option>
                            <option value="Building2">Building / Residence</option>
                            <option value="Globe">Globe / NRI Worldwide</option>
                            <option value="Sparkles">Sparkles / Luxury</option>
                            <option value="Award">Award / Heritage</option>
                            <option value="Star">Star / Excellence</option>
                            <option value="Key">Key / Possession</option>
                            <option value="Compass">Compass / Location</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Badge (Optional)</label>
                          <input
                            type="text"
                            value={item.badge || ''}
                            onChange={(e) => {
                              const newItems = [...(formData.items || [])];
                              newItems[idx].badge = e.target.value;
                              setFormData(prev => ({ ...prev, items: newItems }));
                            }}
                            className="w-full px-2.5 py-1.5 bg-[#141210] border border-[#38312B] rounded text-xs text-[#FAF7F2]"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block text-[11px] text-neutral-400 mb-1">Description</label>
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => {
                              const newItems = [...(formData.items || [])];
                              newItems[idx].description = e.target.value;
                              setFormData(prev => ({ ...prev, items: newItems }));
                            }}
                            className="w-full px-2.5 py-1.5 bg-[#141210] border border-[#38312B] rounded text-xs text-[#FAF7F2]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* C. STATS COUNTER */}
            {formData.type === 'stats-counter' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-300">Metric Counters List</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newStats = [...(formData.stats || [])];
                      newStats.push({
                        id: `stat-${Date.now()}`,
                        value: '₹1,000 Cr+',
                        label: 'Metric Label',
                        subtext: 'Description note'
                      });
                      setFormData(prev => ({ ...prev, stats: newStats }));
                    }}
                    className="px-3 py-1.5 bg-[#C5A880] hover:bg-[#D4BC96] text-[#141210] font-semibold rounded text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Metric
                  </button>
                </div>

                <div className="space-y-3">
                  {(formData.stats || []).map((stat, idx) => (
                    <div key={stat.id} className="bg-[#0A0908] border border-[#26201B] p-3.5 rounded-xl flex items-center gap-3">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[10px] text-neutral-400 mb-1">Number / Stat Value</label>
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => {
                              const newStats = [...(formData.stats || [])];
                              newStats[idx].value = e.target.value;
                              setFormData(prev => ({ ...prev, stats: newStats }));
                            }}
                            placeholder="e.g. ₹4,200 Cr+"
                            className="w-full px-2.5 py-1.5 bg-[#141210] border border-[#38312B] rounded text-xs text-[#C5A880] font-mono font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-neutral-400 mb-1">Primary Label</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => {
                              const newStats = [...(formData.stats || [])];
                              newStats[idx].label = e.target.value;
                              setFormData(prev => ({ ...prev, stats: newStats }));
                            }}
                            placeholder="e.g. Asset Value Advised"
                            className="w-full px-2.5 py-1.5 bg-[#141210] border border-[#38312B] rounded text-xs text-[#FAF7F2]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-neutral-400 mb-1">Subtext / Corridor</label>
                          <input
                            type="text"
                            value={stat.subtext || ''}
                            onChange={(e) => {
                              const newStats = [...(formData.stats || [])];
                              newStats[idx].subtext = e.target.value;
                              setFormData(prev => ({ ...prev, stats: newStats }));
                            }}
                            placeholder="e.g. Across Neopolis & Financial Dist"
                            className="w-full px-2.5 py-1.5 bg-[#141210] border border-[#38312B] rounded text-xs text-[#FAF7F2]"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const newStats = formData.stats?.filter((_, i) => i !== idx);
                          setFormData(prev => ({ ...prev, stats: newStats }));
                        }}
                        className="text-red-400 hover:text-red-300 p-1.5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* D. FAQ ACCORDION */}
            {formData.type === 'faq-accordion' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-300">Frequently Asked Questions</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newFaqs = [...(formData.faqs || [])];
                      newFaqs.push({
                        id: `faq-${Date.now()}`,
                        question: 'New Question Title?',
                        answer: 'Detailed and clear explanation answering the question.',
                        category: 'General'
                      });
                      setFormData(prev => ({ ...prev, faqs: newFaqs }));
                    }}
                    className="px-3 py-1.5 bg-[#C5A880] hover:bg-[#D4BC96] text-[#141210] font-semibold rounded text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Q&A
                  </button>
                </div>

                <div className="space-y-3">
                  {(formData.faqs || []).map((faq, idx) => (
                    <div key={faq.id} className="bg-[#0A0908] border border-[#26201B] p-3.5 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#C5A880]">FAQ #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newFaqs = formData.faqs?.filter((_, i) => i !== idx);
                            setFormData(prev => ({ ...prev, faqs: newFaqs }));
                          }}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                          <div className="sm:col-span-3">
                            <label className="block text-[10px] text-neutral-400 mb-1">Question</label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => {
                                const newFaqs = [...(formData.faqs || [])];
                                newFaqs[idx].question = e.target.value;
                                setFormData(prev => ({ ...prev, faqs: newFaqs }));
                              }}
                              className="w-full px-2.5 py-1.5 bg-[#141210] border border-[#38312B] rounded text-xs text-[#FAF7F2] font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-neutral-400 mb-1">Topic / Category</label>
                            <input
                              type="text"
                              value={faq.category || ''}
                              onChange={(e) => {
                                const newFaqs = [...(formData.faqs || [])];
                                newFaqs[idx].category = e.target.value;
                                setFormData(prev => ({ ...prev, faqs: newFaqs }));
                              }}
                              placeholder="e.g. Legal"
                              className="w-full px-2.5 py-1.5 bg-[#141210] border border-[#38312B] rounded text-xs text-[#FAF7F2]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] text-neutral-400 mb-1">Answer</label>
                          <textarea
                            rows={3}
                            value={faq.answer}
                            onChange={(e) => {
                              const newFaqs = [...(formData.faqs || [])];
                              newFaqs[idx].answer = e.target.value;
                              setFormData(prev => ({ ...prev, faqs: newFaqs }));
                            }}
                            className="w-full px-2.5 py-1.5 bg-[#141210] border border-[#38312B] rounded text-xs text-[#FAF7F2] leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* E. CTA BANNER */}
            {formData.type === 'cta-banner' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Button Action Type
                    </label>
                    <select
                      value={formData.ctaAction || 'preview-modal'}
                      onChange={(e) => handleTextChange('ctaAction', e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2]"
                    >
                      <option value="preview-modal">Open Private Preview Booking Modal</option>
                      <option value="whatsapp">Open WhatsApp Concierge Direct</option>
                      <option value="link">Navigate to URL or Contact Page</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={formData.ctaButtonText || 'REQUEST PRIVATE ACCESS'}
                      onChange={(e) => handleTextChange('ctaButtonText', e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <ImageInputWithPicker
                      label="Background Banner Image"
                      value={formData.ctaBgImage || ''}
                      onChange={(url) => handleTextChange('ctaBgImage', url)}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      WhatsApp Greeting Preset (If action is WhatsApp)
                    </label>
                    <input
                      type="text"
                      value={formData.ctaWhatsappMsg || ''}
                      onChange={(e) => handleTextChange('ctaWhatsappMsg', e.target.value)}
                      placeholder="Hello Arwin Rise Concierge, I would like to schedule a private advisory consultation."
                      className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#FAF7F2]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* F. GALLERY GRID */}
            {formData.type === 'gallery-grid' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-neutral-300">Layout Style:</label>
                    <select
                      value={formData.galleryLayout || 'grid-3'}
                      onChange={(e) => handleTextChange('galleryLayout', e.target.value)}
                      className="px-2.5 py-1 bg-[#0A0908] border border-[#26201B] rounded text-xs text-[#FAF7F2]"
                    >
                      <option value="grid-3">3 Columns Uniform</option>
                      <option value="grid-2">2 Columns Large</option>
                      <option value="masonry">Editorial Masonry</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newImgs = [...(formData.galleryImages || [])];
                      newImgs.push({
                        id: `img-${Date.now()}`,
                        image: '/images/hero-luxury-penthouse.jpg',
                        title: 'Living Spaces',
                        description: 'Architectural details'
                      });
                      setFormData(prev => ({ ...prev, galleryImages: newImgs }));
                    }}
                    className="px-3 py-1.5 bg-[#C5A880] hover:bg-[#D4BC96] text-[#141210] font-semibold rounded text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Photo
                  </button>
                </div>

                <div className="space-y-3">
                  {(formData.galleryImages || []).map((img, idx) => (
                    <div key={img.id} className="bg-[#0A0908] border border-[#26201B] p-3.5 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#C5A880]">Photo #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newImgs = formData.galleryImages?.filter((_, i) => i !== idx);
                            setFormData(prev => ({ ...prev, galleryImages: newImgs }));
                          }}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <ImageInputWithPicker
                        label="Image URL"
                        value={img.image}
                        onChange={(url) => {
                          const newImgs = [...(formData.galleryImages || [])];
                          newImgs[idx].image = url;
                          setFormData(prev => ({ ...prev, galleryImages: newImgs }));
                        }}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-neutral-400 mb-1">Caption Title</label>
                          <input
                            type="text"
                            value={img.title || ''}
                            onChange={(e) => {
                              const newImgs = [...(formData.galleryImages || [])];
                              newImgs[idx].title = e.target.value;
                              setFormData(prev => ({ ...prev, galleryImages: newImgs }));
                            }}
                            className="w-full px-2.5 py-1.5 bg-[#141210] border border-[#38312B] rounded text-xs text-[#FAF7F2]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-neutral-400 mb-1">Caption Description</label>
                          <input
                            type="text"
                            value={img.description || ''}
                            onChange={(e) => {
                              const newImgs = [...(formData.galleryImages || [])];
                              newImgs[idx].description = e.target.value;
                              setFormData(prev => ({ ...prev, galleryImages: newImgs }));
                            }}
                            className="w-full px-2.5 py-1.5 bg-[#141210] border border-[#38312B] rounded text-xs text-[#FAF7F2]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* G. CUSTOM HTML */}
            {formData.type === 'custom-html' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    HTML / iFrame / Map Embed Code
                  </label>
                  <textarea
                    rows={8}
                    value={formData.customHtml || ''}
                    onChange={(e) => handleTextChange('customHtml', e.target.value)}
                    placeholder="<iframe src='...' width='100%' height='400'></iframe>"
                    className="w-full px-3.5 py-2 bg-[#0A0908] border border-[#26201B] rounded-lg text-xs text-[#C5A880] font-mono leading-relaxed focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="p-3 bg-[#0A0908] border border-[#26201B] rounded-xl space-y-2">
                  <span className="text-[10px] uppercase font-mono text-[#706860]">Live Render Preview</span>
                  <div
                    className="overflow-hidden rounded"
                    dangerouslySetInnerHTML={{ __html: formData.customHtml || '<p style="color:#666; font-size:12px;">No code entered.</p>' }}
                  />
                </div>
              </div>
            )}

          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#24201C] flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#1A1613] hover:bg-[#26201B] text-neutral-300 rounded-lg text-xs font-medium transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all shadow-lg"
            >
              Save Section Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
