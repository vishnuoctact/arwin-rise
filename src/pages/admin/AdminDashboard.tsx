import React, { useState, useRef } from 'react';
import { useContent } from '../../context/ContentContext';
import { ArwinLogo } from '../../components/ArwinLogo';
import { FeaturedProject, CollectionTier, HeroSlide } from '../../types';
import { NewsArticle } from '../../data/news';
import { Testimonial } from '../../types';
import { LeadRecord, MediaItem } from '../../types/admin';
import { ImageInputWithPicker } from '../../components/admin/ImageInputWithPicker';
import { CustomPagesManager } from '../../components/admin/CustomPagesManager';
import { SellerSubmissionsManager } from '../../components/admin/SellerSubmissionsManager';
import {
  LayoutDashboard,
  Building2,
  Layers,
  Image as ImageIcon,
  Newspaper,
  MessageSquareQuote,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Search,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  Eye,
  Key,
  Copy,
  Check,
  Loader2,
  Handshake,
  ShieldCheck,
  Compass,
  Timer,
  Play,
  TrendingUp,
  BarChart3,
  Award,
  Globe,
  DollarSign,
  Clock,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Share2,
  Code2,
  FileCode,
  Smartphone,
  Monitor,
  Tag,
  Link as LinkIcon,
  Shield,
  Activity,
  ArrowUp,
  ArrowDown,
  HelpCircle,
  ListPlus,
  CheckSquare,
  FileText,
  Sliders,
  EyeOff,
  Grid,
  Code
} from 'lucide-react';
import {
  AboutPageData,
  AboutPillar,
  InvestorCorridor,
  InvestorPillar,
  InvestorsPageData,
  NavigationLink,
  NriPageData,
  NriStep,
  PageSeoConfig,
  PartnerSectionData,
  PreloaderConfig,
  PreloaderMessage,
  SellerDeskData,
  SeoSettings,
  CustomPage,
  PageSectionBlock,
  PageSectionType,
  PageSectionItem,
  PageSectionStat,
  PageSectionFaq
} from '../../types/admin';

export const AdminDashboard: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  const {
    featuredProjects,
    collectionTiers,
    heroSlides,
    newsArticles,
    testimonials,
    stats,
    settings,
    seoSettings,
    leads,
    mediaGallery,
    partnerSection,
    sellerDesk,
    preloaderConfig,
    investorsPage,
    nriPage,
    aboutPage,
    customPages,
    listingSubmissions,
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    addProject,
    updateProject,
    deleteProject,
    updateCollectionTier,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    addNewsArticle,
    updateNewsArticle,
    deleteNewsArticle,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    updateStats,
    updateSettings,
    updateSeoSettings,
    updatePartnerSection,
    updateSellerDesk,
    updatePreloaderConfig,
    updateInvestorsPage,
    updateNriPage,
    updateAboutPage,
    addCustomPage,
    updateCustomPage,
    deleteCustomPage,
    addPageSection,
    updatePageSection,
    deletePageSection,
    reorderPageSections,
    updateLeadStatus,
    deleteLead,
    deleteMediaItem,
    uploadImageFile,
    resetToDefaults,
    exportDataJson,
    importDataJson
  } = useContent();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'logos-nav' | 'preloader' | 'projects' | 'seller-submissions' | 'collections' | 'hero' | 'seller-desk' | 'partner' | 'investors-page' | 'nri-page' | 'about-page' | 'custom-pages' | 'news' | 'testimonials' | 'leads' | 'media' | 'settings' | 'seo'
  >('overview');

  // Custom Pages Studio State
  const [selectedPageIdForEditing, setSelectedPageIdForEditing] = useState<string | null>(null);
  const [isCreatingNewPage, setIsCreatingNewPage] = useState(false);
  const [editingPageMeta, setEditingPageMeta] = useState<CustomPage | null>(null);
  const [editingSection, setEditingSection] = useState<{ pageId: string; section: PageSectionBlock } | null>(null);
  const [isAddingSectionModal, setIsAddingSectionModal] = useState<{ pageId: string } | null>(null);
  const [previewCustomPageModal, setPreviewCustomPageModal] = useState<CustomPage | null>(null);
  const [customPageSearch, setCustomPageSearch] = useState('');

  // SEO Studio State
  const [seoForm, setSeoForm] = useState<SeoSettings>(seoSettings);
  React.useEffect(() => {
    if (seoSettings) setSeoForm(seoSettings);
  }, [seoSettings]);

  const [activeSeoSubTab, setActiveSeoSubTab] = useState<'simulator' | 'pages' | 'schema' | 'webmaster' | 'sitemap' | 'audit'>('simulator');
  const [activePageOverrideKey, setActivePageOverrideKey] = useState<string>('home');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedJsonLd, setCopiedJsonLd] = useState(false);
  const [copiedSitemap, setCopiedSitemap] = useState(false);
  const [copiedRobots, setCopiedRobots] = useState(false);

  // Logos & Nav Form State
  const [logoDark, setLogoDark] = useState(settings.logoDarkUrl || '/images/arwin-rise-lockup.png');
  const [logoLight, setLogoLight] = useState(settings.logoLightUrl || '/images/arwin-rise-lockup-light.png');
  const [logoSymbol, setLogoSymbol] = useState(settings.logoSymbolUrl || '/images/arwin-rise-symbol.png');
  const [navCta, setNavCta] = useState(settings.navCtaText || 'POST PROPERTY');
  const [navItems, setNavItems] = useState<NavigationLink[]>(
    settings.navLinks || [
      { id: 'nav-home', label: 'HOME', page: 'home', isVisible: true },
      { id: 'nav-about', label: 'ABOUT US', page: 'about', isVisible: true },
      { id: 'nav-residences', label: 'RESIDENCES', page: 'residences', isVisible: true },
      { id: 'nav-golden-circle', label: 'GOLDEN CIRCLE', page: 'golden-circle', isVisible: true },
      { id: 'nav-nri', label: 'NRI CONNECT', page: 'nri-connect', isVisible: true },
      { id: 'nav-contact', label: 'CONTACT', page: 'contact', isVisible: true }
    ]
  );

  React.useEffect(() => {
    if (settings) {
      if (settings.logoDarkUrl) setLogoDark(settings.logoDarkUrl);
      if (settings.logoLightUrl) setLogoLight(settings.logoLightUrl);
      if (settings.logoSymbolUrl) setLogoSymbol(settings.logoSymbolUrl);
      if (settings.navCtaText) setNavCta(settings.navCtaText);
      if (settings.navLinks) setNavItems(settings.navLinks);
    }
  }, [settings]);

  // Preloader Form State
  const [preloaderForm, setPreloaderForm] = useState<PreloaderConfig>(preloaderConfig);
  React.useEffect(() => {
    if (preloaderConfig) setPreloaderForm(preloaderConfig);
  }, [preloaderConfig]);

  // Preloader Live Simulator State
  const [simulatorActive, setSimulatorActive] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [simIndex, setSimIndex] = useState(0);

  const startSimulator = () => {
    setSimulatorActive(true);
    setSimProgress(0);
    setSimIndex(0);

    const msgs = preloaderForm.messages?.length ? preloaderForm.messages : [{ id: '1', tag: '', quote: '', sub: '' }];
    const totalMs = Math.max(1000, (preloaderForm.durationSeconds || 4.5) * 1000);
    const perSlide = totalMs / msgs.length;

    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const prog = Math.min(100, Math.floor((elapsed / totalMs) * 100));
      setSimProgress(prog);

      const idx = Math.min(msgs.length - 1, Math.floor(elapsed / perSlide));
      setSimIndex(idx);

      if (elapsed >= totalMs) {
        clearInterval(timer);
        setTimeout(() => setSimulatorActive(false), 800);
      }
    }, 30);
  };

  // Partner Form State
  const [partnerForm, setPartnerForm] = useState<PartnerSectionData>(partnerSection);
  React.useEffect(() => {
    if (partnerSection) setPartnerForm(partnerSection);
  }, [partnerSection]);

  // Seller Desk Form State
  const [sellerForm, setSellerForm] = useState<SellerDeskData>(sellerDesk);
  React.useEffect(() => {
    if (sellerDesk) setSellerForm(sellerDesk);
  }, [sellerDesk]);

  // Investors Page Form State
  const [investorsForm, setInvestorsForm] = useState<InvestorsPageData>(investorsPage);
  React.useEffect(() => {
    if (investorsPage) setInvestorsForm(investorsPage);
  }, [investorsPage]);

  // NRI Page Form State
  const [nriForm, setNriForm] = useState<NriPageData>(nriPage);
  React.useEffect(() => {
    if (nriPage) setNriForm(nriPage);
  }, [nriPage]);

  // About Page Form State
  const [aboutForm, setAboutForm] = useState<AboutPageData>(aboutPage);
  React.useEffect(() => {
    if (aboutPage) setAboutForm(aboutPage);
  }, [aboutPage]);

  // Auth form state
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Sidebar Menu & Submenu Navigation State
  const [menuSearchQuery, setMenuSearchQuery] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  // Modals & Editing states
  const [editingProject, setEditingProject] = useState<FeaturedProject | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingTier, setEditingTier] = useState<CollectionTier | null>(null);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isAddingSlide, setIsAddingSlide] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);

  // Media gallery tab state
  const [mediaCategory, setMediaCategory] = useState('all');
  const [mediaSearch, setMediaSearch] = useState('');
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [copiedMediaUrl, setCopiedMediaUrl] = useState<string | null>(null);
  const [previewMediaModal, setPreviewMediaModal] = useState<MediaItem | null>(null);
  const mediaFileInputRef = useRef<HTMLInputElement | null>(null);

  // Search & Filter in Leads
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');
  const [leadTypeFilter, setLeadTypeFilter] = useState<'all' | 'seller' | 'vip' | 'nri' | 'investor'>('all');

  // Status message notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(passcode);
    if (!success) {
      setAuthError('Invalid passcode. Please enter the authorized access key.');
    } else {
      setAuthError('');
      showToast('Welcome to ARWIN RISE Admin Portal');
    }
  };

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#141210] flex items-center justify-center p-4 selection:bg-[#771722] selection:text-[#C5A880]">
        <div className="max-w-md w-full bg-[#1F1C18] border border-[#C5A880]/30 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <ArwinLogo variant="light" size="md" />
            </div>
            <div className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#C5A880] uppercase">
              Admin & Content Portal
            </div>
            <p className="text-xs text-neutral-400 font-sans">
              Enter your master administrative key to manage residences, gallery photos, banners, market news, and client leads.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-sans font-medium text-neutral-300 mb-1.5">
                Passcode / Access Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full px-4 py-3 bg-[#141210] border border-neutral-700 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#C5A880] text-sm"
                  autoFocus
                />
                <Key className="w-4 h-4 text-neutral-500 absolute right-3.5 top-3.5" />
              </div>
              {authError && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-xl text-xs font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-[#771722]/30 flex items-center justify-center gap-2"
            >
              Authenticate & Enter
            </button>
          </form>

          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
            <span>Authorized Personnel Only</span>
            <button
              onClick={onNavigateHome}
              className="text-neutral-400 hover:text-[#C5A880] transition-colors flex items-center gap-1"
            >
              Back to Site <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // CSV Export for Leads
  // -------------------------------------------------------------
  const exportLeadsCsv = () => {
    const headers = ['ID', 'Timestamp', 'Form Type', 'Client Name', 'Phone', 'Email', 'Status', 'Project/Collection', 'Budget', 'Message'];
    const rows = leads.map(l => [
      l.id,
      `"${l.timestamp}"`,
      `"${l.formType}"`,
      `"${l.clientName}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.status}"`,
      `"${l.project || l.collection || l.tier || ''}"`,
      `"${l.budget || ''}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `arwin_rise_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads CSV exported successfully');
  };

  // -------------------------------------------------------------
  // JSON Backup Export / Import
  // -------------------------------------------------------------
  const handleExportBackup = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `arwin_rise_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Site backup exported');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importDataJson(content);
      if (success) {
        showToast('Site data imported successfully!');
      } else {
        alert('Failed to parse backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Media Library Upload Handlers
  const handleMediaUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploadingMedia(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          await uploadImageFile(file, 'uploads');
        }
      }
      showToast(`Uploaded ${files.length} photo(s) to Gallery`);
    } catch {
      alert('Error uploading photo.');
    } finally {
      setIsUploadingMedia(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#141210] text-[#FAF7F2] font-sans selection:bg-[#771722] selection:text-[#C5A880] flex flex-col">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#771722] text-[#FAF7F2] px-5 py-3 rounded-xl shadow-2xl border border-[#C5A880]/40 text-xs font-medium flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
          {toastMsg}
        </div>
      )}

      {/* Top Admin Navigation Header (Crisp White Luxury Header) */}
      <header className="bg-white border-b border-[#EAE3DA] sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <ArwinLogo variant="dark" size="sm" />
            <span className="hidden sm:inline-block text-[10px] uppercase font-mono font-bold tracking-[0.2em] px-2 py-0.5 rounded bg-[#771722]/8 text-[#771722] border border-[#771722]/20">
              CMS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onNavigateHome}
            className="px-3.5 py-1.5 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-lg text-xs font-sans font-semibold tracking-wider uppercase transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            title="View Live Public Site"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="hidden sm:inline">Live Website</span>
          </button>

          <button
            onClick={handleExportBackup}
            className="px-3 py-1.5 bg-white hover:bg-[#FAF7F2] text-[#4A453F] hover:text-[#222222] rounded-lg text-xs font-sans font-medium transition-all flex items-center gap-1.5 border border-[#EAE3DA] shadow-xs cursor-pointer"
            title="Download JSON Backup"
          >
            <Download className="w-3.5 h-3.5 text-[#771722]" />
            <span className="hidden md:inline">Backup</span>
          </button>

          <label
            className="px-3 py-1.5 bg-white hover:bg-[#FAF7F2] text-[#4A453F] hover:text-[#222222] rounded-lg text-xs font-sans font-medium transition-all flex items-center gap-1.5 border border-[#EAE3DA] shadow-xs cursor-pointer"
            title="Import JSON Backup"
          >
            <Upload className="w-3.5 h-3.5 text-[#771722]" />
            <span className="hidden md:inline">Restore</span>
            <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
          </label>

          <button
            onClick={() => {
              adminLogout();
              showToast('Signed out of Studio');
            }}
            className="px-3 py-1.5 bg-red-50/80 hover:bg-red-100 text-red-700 rounded-lg text-xs font-sans font-medium transition-all flex items-center gap-1.5 border border-red-200 cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Left Sidebar Tabs */}
        <aside className="w-full md:w-72 bg-[#100E0C] border-r border-[#24201C] p-4 shrink-0 flex flex-col justify-between">
          <div>
            {/* Quick Filter Search */}
            <div className="relative mb-4">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C827A]" />
              <input
                type="text"
                value={menuSearchQuery}
                onChange={(e) => setMenuSearchQuery(e.target.value)}
                placeholder="Search studio sections..."
                className="w-full pl-8 pr-7 py-1.5 bg-[#090807] border border-[#26201B] rounded-lg text-[11px] text-[#FAF7F2] placeholder-[#706860] focus:outline-none focus:border-[#C5A880]/60 transition-colors font-sans"
              />
              {menuSearchQuery && (
                <button
                  onClick={() => setMenuSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Menu Groups */}
            <nav className="space-y-4">
              {[
                {
                  id: 'core',
                  title: 'Overview & Leads',
                  icon: LayoutDashboard,
                  isTopLevel: true,
                  items: [
                    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard, badge: null },
                    { id: 'leads', label: 'Customer Inquiries', icon: Inbox, badge: leads.filter(l => l.status === 'new').length, badgeColor: 'bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/40' },
                    { id: 'media', label: 'Photo & Media Library', icon: ImageIcon, badge: mediaGallery.length }
                  ]
                },
                {
                  id: 'residences',
                  title: 'Properties & Projects',
                  icon: Building2,
                  items: [
                    { id: 'projects', label: 'All Projects', icon: Building2, badge: featuredProjects.length },
                    { 
                      id: 'seller-submissions', 
                      label: 'Seller Listings Moderation', 
                      icon: ShieldCheck, 
                      badge: (listingSubmissions || []).filter(s => s.status === 'pending').length > 0 
                        ? `${(listingSubmissions || []).filter(s => s.status === 'pending').length} New` 
                        : (listingSubmissions || []).length,
                      badgeColor: (listingSubmissions || []).filter(s => s.status === 'pending').length > 0
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                        : 'bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30'
                    },
                    { id: 'collections', label: 'Price Tiers (01, 02, 03)', icon: Layers, badge: collectionTiers.length }
                  ]
                },
                {
                  id: 'pages',
                  title: 'Website Pages',
                  icon: Globe,
                  items: [
                    { id: 'custom-pages', label: 'Custom Pages & Sections', icon: FileCode, badge: (customPages || []).length, badgeColor: 'bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/40' },
                    { id: 'about-page', label: 'About Us Page', icon: Award, badge: null },
                    { id: 'investors-page', label: 'Investors Page', icon: TrendingUp, badge: null },
                    { id: 'nri-page', label: 'NRI Connect Page', icon: Globe, badge: null },
                    { id: 'news', label: 'News & Articles', icon: Newspaper, badge: newsArticles.length },
                    { id: 'testimonials', label: 'Client Reviews', icon: MessageSquareQuote, badge: testimonials.length }
                  ]
                },
                {
                  id: 'marketing',
                  title: 'Banners & Promotions',
                  icon: Sparkles,
                  items: [
                    { id: 'hero', label: 'Top Banner Slides', icon: ImageIcon, badge: heroSlides.length },
                    { id: 'seller-desk', label: 'List Property Banner', icon: ShieldCheck, badge: null },
                    { id: 'partner', label: 'Careers / Partner With Us', icon: Handshake, badge: null }
                  ]
                },
                {
                  id: 'seo-group',
                  title: 'SEO & Search Visibility',
                  icon: Search,
                  isTopLevel: true,
                  items: [
                    { id: 'seo', label: 'SEO Control Center', icon: Search, badge: 'Live', badgeColor: 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40' }
                  ]
                },
                {
                  id: 'brand',
                  title: 'Settings & Config',
                  icon: Settings,
                  items: [
                    { id: 'logos-nav', label: 'Logos & Navigation Menu', icon: Compass, badge: null },
                    { id: 'preloader', label: 'Intro Animation & Timing', icon: Timer, badge: null },
                    { id: 'settings', label: 'Contact Info & Addresses', icon: Settings, badge: null }
                  ]
                }
              ].map(group => {
                const GroupIcon = group.icon;
                const filteredItems = group.items.filter(item => 
                  !menuSearchQuery.trim() || 
                  item.label.toLowerCase().includes(menuSearchQuery.toLowerCase()) ||
                  group.title.toLowerCase().includes(menuSearchQuery.toLowerCase())
                );

                if (filteredItems.length === 0) return null;

                const isGroupActive = group.items.some(i => i.id === activeTab);
                const isCollapsed = !menuSearchQuery && collapsedGroups[group.id] && !isGroupActive;

                return (
                  <div key={group.id} className="space-y-1">
                    {/* Menu Header / Category Title */}
                    {!group.isTopLevel ? (
                      <button
                        onClick={() => toggleGroup(group.id)}
                        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded text-left text-[#8C827A] hover:text-[#FAF7F2] hover:bg-[#1A1613] transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <GroupIcon className={`w-3.5 h-3.5 ${isGroupActive ? 'text-[#C5A880]' : 'text-[#8C827A]'}`} />
                          <span className={`text-[10px] uppercase font-mono font-semibold tracking-[0.16em] ${isGroupActive ? 'text-[#FAF7F2]' : 'text-[#8C827A]'}`}>
                            {group.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {isCollapsed ? (
                            <ChevronRight className="w-3 h-3 text-[#706860] group-hover:text-neutral-300" />
                          ) : (
                            <ChevronDown className="w-3 h-3 text-[#706860] group-hover:text-neutral-300" />
                          )}
                        </div>
                      </button>
                    ) : (
                      <div className="px-2.5 py-1 text-[9.5px] uppercase font-mono font-semibold tracking-[0.2em] text-[#706860]">
                        {group.title}
                      </div>
                    )}

                    {/* Submenu Items */}
                    {!isCollapsed && (
                      <div className={`space-y-0.5 ${!group.isTopLevel ? 'pl-2.5 ml-2 border-l border-[#24201C] my-1' : ''}`}>
                        {filteredItems.map(item => {
                          const Icon = item.icon;
                          const isActive = activeTab === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => setActiveTab(item.id as any)}
                              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                                isActive
                                  ? 'bg-[#771722]/90 text-[#FAF7F2] border-l-2 border-[#C5A880] shadow-md shadow-[#771722]/30 font-semibold'
                                  : 'text-[#9C9288] hover:text-[#FAF7F2] hover:bg-[#1A1613] font-normal'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#C5A880]' : 'text-[#7A7167]'}`} />
                                <span className="truncate">{item.label}</span>
                              </div>
                              {item.badge !== null && item.badge !== undefined && (typeof item.badge === 'number' ? item.badge > 0 : Boolean(item.badge)) && (
                                <span className={`text-[9.5px] px-1.5 py-0.2 rounded font-mono font-semibold ml-1.5 shrink-0 ${
                                  isActive
                                    ? 'bg-[#14110E] text-[#C5A880] border border-[#C5A880]/30'
                                    : (item as any).badgeColor || 'bg-[#1C1815] text-[#A39A90] border border-[#2E2822]'
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="mt-8 pt-4 border-t border-[#24201C] space-y-2">
            <button
              onClick={resetToDefaults}
              className="w-full px-3 py-2 rounded-lg text-xs text-[#7A7167] hover:text-red-400 hover:bg-red-950/10 transition-colors flex items-center gap-2 cursor-pointer font-sans"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Factory Defaults</span>
            </button>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 p-5 sm:p-7 lg:p-9 bg-[#0E0C0A] overflow-y-auto max-w-7xl">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-6xl">
              {/* 4 Architectural Metric Panels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Metric 1: Inquiries */}
                <div 
                  onClick={() => setActiveTab('leads')}
                  className="bg-[#14110E] border border-[#24201C] hover:border-[#C5A880]/50 border-t-2 border-t-[#C5A880] p-5 rounded-lg space-y-2 cursor-pointer transition-all hover:-translate-y-0.5 shadow-lg group"
                >
                  <div className="flex items-center justify-between text-[#8E857C]">
                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#C5A880]">01. Customer Inquiries</span>
                    <Inbox className="w-4 h-4 text-[#C5A880] group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-normal" style={{ fontVariantNumeric: 'lining-nums' }}>
                    {leads.filter(l => l.status === 'new').length}
                  </div>
                  <div className="text-[11px] text-[#8E857C] flex items-center justify-between">
                    <span>{leads.length} Total Inquiries Received</span>
                    <span className="text-[#C5A880] text-[10px] uppercase font-semibold">View &rarr;</span>
                  </div>
                </div>

                {/* Metric 2: Residences */}
                <div 
                  onClick={() => setActiveTab('projects')}
                  className="bg-[#14110E] border border-[#24201C] hover:border-[#C5A880]/50 border-t-2 border-t-[#771722] p-5 rounded-lg space-y-2 cursor-pointer transition-all hover:-translate-y-0.5 shadow-lg group"
                >
                  <div className="flex items-center justify-between text-[#8E857C]">
                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#C5A880]">02. Active Projects</span>
                    <Building2 className="w-4 h-4 text-[#C5A880] group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-normal" style={{ fontVariantNumeric: 'lining-nums' }}>
                    {featuredProjects.length}
                  </div>
                  <div className="text-[11px] text-[#8E857C] flex items-center justify-between">
                    <span>Hyderabad & Dubai Listings</span>
                    <span className="text-[#C5A880] text-[10px] uppercase font-semibold">Manage &rarr;</span>
                  </div>
                </div>

                {/* Metric 3: Media Gallery */}
                <div 
                  onClick={() => setActiveTab('media')}
                  className="bg-[#14110E] border border-[#24201C] hover:border-[#C5A880]/50 border-t-2 border-t-[#C5A880] p-5 rounded-lg space-y-2 cursor-pointer transition-all hover:-translate-y-0.5 shadow-lg group"
                >
                  <div className="flex items-center justify-between text-[#8E857C]">
                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#C5A880]">03. Uploaded Photos</span>
                    <ImageIcon className="w-4 h-4 text-[#C5A880] group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-normal" style={{ fontVariantNumeric: 'lining-nums' }}>
                    {mediaGallery.length}
                  </div>
                  <div className="text-[11px] text-[#8E857C] flex items-center justify-between">
                    <span>Images in Media Library</span>
                    <span className="text-[#C5A880] text-[10px] uppercase font-semibold">Upload &rarr;</span>
                  </div>
                </div>

                {/* Metric 4: Research Briefings */}
                <div 
                  onClick={() => setActiveTab('news')}
                  className="bg-[#14110E] border border-[#24201C] hover:border-[#C5A880]/50 border-t-2 border-t-[#771722] p-5 rounded-lg space-y-2 cursor-pointer transition-all hover:-translate-y-0.5 shadow-lg group"
                >
                  <div className="flex items-center justify-between text-[#8E857C]">
                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#C5A880]">04. Published Articles</span>
                    <Newspaper className="w-4 h-4 text-[#C5A880] group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-normal" style={{ fontVariantNumeric: 'lining-nums' }}>
                    {newsArticles.length}
                  </div>
                  <div className="text-[11px] text-[#8E857C] flex items-center justify-between">
                    <span>News & Market Reports</span>
                    <span className="text-[#C5A880] text-[10px] uppercase font-semibold">Publish &rarr;</span>
                  </div>
                </div>

              </div>

              {/* Quick Shortcuts */}
              <div className="bg-[#14110E] border border-[#24201C] p-6 rounded-xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-[#24201C]">
                  <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" /> Quick Shortcuts
                  </h2>
                  <span className="text-[11px] text-[#7A7167]">Fast one-click actions</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <button
                    onClick={() => {
                      setIsAddingProject(true);
                      setActiveTab('projects');
                    }}
                    className="p-3.5 bg-[#0A0908] hover:bg-[#1A1613] border border-[#26201B] hover:border-[#C5A880]/50 rounded-lg text-left transition-all space-y-1 group cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#C5A880] group-hover:rotate-90 transition-transform" />
                    <div className="font-medium text-[#FAF7F2] text-xs pt-1">Add New Project</div>
                    <div className="text-[10px] text-[#7A7167]">Add a new property listing</div>
                  </button>

                  <button
                    onClick={() => setActiveTab('investors-page')}
                    className="p-3.5 bg-[#0A0908] hover:bg-[#1A1613] border border-[#26201B] hover:border-[#C5A880]/50 rounded-lg text-left transition-all space-y-1 group cursor-pointer"
                  >
                    <TrendingUp className="w-4 h-4 text-[#C5A880] group-hover:scale-110 transition-transform" />
                    <div className="font-medium text-[#FAF7F2] text-xs pt-1">Investor Projections</div>
                    <div className="text-[10px] text-[#7A7167]">Update CAGR & rental yields</div>
                  </button>

                  <button
                    onClick={() => setActiveTab('nri-page')}
                    className="p-3.5 bg-[#0A0908] hover:bg-[#1A1613] border border-[#26201B] hover:border-[#C5A880]/50 rounded-lg text-left transition-all space-y-1 group cursor-pointer"
                  >
                    <Globe className="w-4 h-4 text-[#C5A880] group-hover:scale-110 transition-transform" />
                    <div className="font-medium text-[#FAF7F2] text-xs pt-1">NRI Currency Rates</div>
                    <div className="text-[10px] text-[#7A7167]">Update USD, AED exchange rates</div>
                  </button>

                  <button
                    onClick={() => setActiveTab('about-page')}
                    className="p-3.5 bg-[#0A0908] hover:bg-[#1A1613] border border-[#26201B] hover:border-[#C5A880]/50 rounded-lg text-left transition-all space-y-1 group cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-[#C5A880] group-hover:scale-110 transition-transform" />
                    <div className="font-medium text-[#FAF7F2] text-xs pt-1">About Us Story</div>
                    <div className="text-[10px] text-[#7A7167]">Edit company info & stats</div>
                  </button>
                </div>
              </div>

              {/* Recent Inquiries & Contact Channels */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Recent Inquiries (7 Cols) */}
                <div className="lg:col-span-7 bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-[#24201C]">
                    <div>
                      <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase">
                        Recent Inquiries
                      </h2>
                      <p className="text-[11px] text-[#7A7167] mt-0.5">Leads submitted through website forms</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="text-xs text-[#C5A880] hover:text-[#D4B993] font-medium transition-colors cursor-pointer"
                    >
                      View All ({leads.length}) &rarr;
                    </button>
                  </div>

                  {leads.length === 0 ? (
                    <div className="text-center py-10 space-y-2 border border-dashed border-[#24201C] rounded-lg">
                      <Inbox className="w-6 h-6 text-[#7A7167] mx-auto opacity-50" />
                      <div className="text-xs text-[#FAF7F2] font-medium">No inquiries received yet</div>
                      <div className="text-[11px] text-[#7A7167] max-w-xs mx-auto">
                        When visitors fill out a form or request a callback on the website, they will show up here.
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {leads.slice(0, 5).map(lead => (
                        <div
                          key={lead.id}
                          onClick={() => {
                            setSelectedLead(lead);
                            setActiveTab('leads');
                          }}
                          className="p-3 bg-[#0A0908] hover:bg-[#1A1613] rounded-lg border border-[#26201B] hover:border-[#C5A880]/40 cursor-pointer transition-all flex items-center justify-between"
                        >
                          <div className="space-y-0.5">
                            <div className="text-xs font-medium text-[#FAF7F2]">{lead.clientName}</div>
                            <div className="text-[11px] text-[#7A7167]">
                              {lead.formType} &bull; <span className="font-mono text-[#C5A880]">{lead.phone}</span>
                            </div>
                          </div>
                          <span className={`text-[9.5px] px-2 py-0.5 rounded font-mono font-semibold uppercase ${
                            lead.status === 'new'
                              ? 'bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/30'
                              : 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/30'
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Direct Channels & Notification Router (5 Cols) */}
                <div className="lg:col-span-5 bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#24201C]">
                      <div>
                        <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase">
                          Notification & Contact Info
                        </h2>
                        <p className="text-[11px] text-[#7A7167] mt-0.5">Where leads are delivered</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('settings')}
                        className="text-xs text-[#C5A880] hover:text-[#D4B993] font-medium transition-colors cursor-pointer"
                      >
                        Edit &rarr;
                      </button>
                    </div>
                    
                    <div className="space-y-2.5 text-xs">
                      <div className="p-3 bg-[#0A0908] rounded-lg border border-[#26201B] space-y-1">
                        <div className="text-[10px] font-mono uppercase text-[#7A7167]">Lead Alert Email</div>
                        <div className="font-mono text-[11.5px] text-[#FAF7F2] truncate">{settings.leadTargetEmail}</div>
                      </div>

                      <div className="p-3 bg-[#0A0908] rounded-lg border border-[#26201B] space-y-1">
                        <div className="text-[10px] font-mono uppercase text-[#7A7167]">WhatsApp Number</div>
                        <div className="font-mono text-[11.5px] text-[#C5A880]">{settings.whatsappPhone}</div>
                      </div>

                      <div className="p-3 bg-[#0A0908] rounded-lg border border-[#26201B] space-y-1">
                        <div className="text-[10px] font-mono uppercase text-[#7A7167]">Customer Hotline</div>
                        <div className="font-mono text-[11.5px] text-[#FAF7F2]">{settings.displayPhone}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#24201C] flex gap-2.5">
                    <button
                      onClick={() => setActiveTab('media')}
                      className="flex-1 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-lg text-xs font-sans font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#C5A880]" /> Photo Gallery
                    </button>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className="px-4 py-2.5 bg-[#1C1815] hover:bg-[#25201C] text-neutral-300 rounded-lg text-xs font-medium transition-colors border border-[#2E2822] cursor-pointer"
                    >
                      Settings
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB: LOGOS & NAVIGATION MENUS */}
          {activeTab === 'logos-nav' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#24201C]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">Logos & Navigation Menus</h1>
                  <p className="text-xs text-[#8E857C] font-sans mt-1">
                    Manage the brand lockups, favicons, navbar menu item labels, and header CTA button.
                  </p>
                </div>

                <button
                  onClick={() => {
                    updateSettings({
                      logoDarkUrl: logoDark,
                      logoLightUrl: logoLight,
                      logoSymbolUrl: logoSymbol,
                      navCtaText: navCta,
                      navLinks: navItems
                    });
                    showToast('Logos & Navigation menu saved!');
                  }}
                  className="px-5 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-lg text-xs font-sans font-semibold tracking-wider uppercase transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Logos & Nav
                </button>
              </div>

              {/* Real-time Navbar Header Preview */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#C5A880] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" /> Real-time Navbar Preview
                </div>

                <div className="bg-[#FAF7F2] text-[#222222] border border-[#EAE3DA] p-4 sm:p-5 rounded-xl shadow-sm space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    {/* Dark Logo Preview */}
                    <div className="h-10 flex items-center">
                      <img src={logoDark || '/images/arwin-rise-lockup.png'} alt="Logo Preview" className="h-8 w-auto object-contain" />
                    </div>

                    {/* Nav Links Preview */}
                    <div className="hidden md:flex items-center space-x-5 text-[11px] font-sans font-medium tracking-[0.16em] text-[#55504A]">
                      {navItems.filter(n => n.isVisible !== false).map((item) => (
                        <span key={item.id || item.page} className="hover:text-[#771722] cursor-default">{item.label}</span>
                      ))}
                    </div>

                    {/* CTA Button Preview */}
                    <div className="bg-[#771722] text-white px-4 py-2 text-[10px] font-bold tracking-wider uppercase rounded shadow-sm">
                      {navCta || 'PRIVATE PREVIEW'}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 1: BRAND LOGOS */}
              <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-5 text-xs shadow-xl">
                <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Brand Logos & Graphics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Primary Dark Logo */}
                  <div className="p-4 bg-[#090807] rounded-lg border border-[#24201C] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#FAF7F2]">Navbar & Light Background Logo</span>
                      <span className="text-[10px] text-[#7A7167] font-mono">Dark Letters</span>
                    </div>
                    <div className="p-3 bg-[#FAF7F2] rounded flex items-center justify-center h-16 border border-[#EAE3DA]">
                      <img src={logoDark} alt="Dark logo" className="max-h-12 w-auto object-contain" />
                    </div>
                    <ImageInputWithPicker
                      label="Logo Image URL (Dark Letters)"
                      value={logoDark}
                      onChange={setLogoDark}
                      helperText="Used on website navbar and light paper backgrounds."
                    />
                  </div>

                  {/* Inverted Light Logo */}
                  <div className="p-4 bg-[#090807] rounded-lg border border-[#24201C] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#FAF7F2]">Admin & Dark Background Logo</span>
                      <span className="text-[10px] text-[#7A7167] font-mono">White Letters</span>
                    </div>
                    <div className="p-3 bg-[#14110E] rounded flex items-center justify-center h-16 border border-[#26201B]">
                      <img src={logoLight} alt="Light logo" className="max-h-12 w-auto object-contain" />
                    </div>
                    <ImageInputWithPicker
                      label="Logo Image URL (White Letters)"
                      value={logoLight}
                      onChange={setLogoLight}
                      helperText="Used in Admin Portal header, preloader, and dark cards."
                    />
                  </div>

                  {/* Brand Crest / Symbol */}
                  <div className="p-4 bg-[#090807] rounded-lg border border-[#24201C] space-y-3 md:col-span-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#FAF7F2]">Brand Crest / Fan Symbol Icon</span>
                      <span className="text-[10px] text-[#7A7167] font-mono">Standalone Icon</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 p-2 bg-[#FAF7F2] rounded-lg flex items-center justify-center border border-[#EAE3DA]">
                        <img src={logoSymbol} alt="Symbol" className="max-h-12 w-auto object-contain" />
                      </div>
                      <div className="flex-1">
                        <ImageInputWithPicker
                          label="Symbol / Crest Icon Image URL"
                          value={logoSymbol}
                          onChange={setLogoSymbol}
                          helperText="Used for favicons, standalone seals, and mobile icons."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: NAVIGATION MENU ITEMS */}
              <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-5 text-xs shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                    <Compass className="w-4 h-4" /> Header Navigation Menu Items
                  </h2>
                  <span className="text-[11px] text-[#8E857C]">Rename labels or hide any menu link</span>
                </div>

                <div className="space-y-3">
                  {navItems.map((item, idx) => (
                    <div
                      key={item.id || item.page}
                      className="p-3 bg-[#090807] rounded-lg border border-[#24201C] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded bg-[#1C1815] text-[#C5A880] text-[10px] font-mono flex items-center justify-center border border-[#2E2822]">
                          0{idx + 1}
                        </span>
                        <div>
                          <div className="font-medium text-[#FAF7F2] text-xs">Destination: #{item.page}</div>
                          <div className="text-[10px] text-[#7A7167]">Links to {item.page} section</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Display Label Input */}
                        <div className="flex-1 sm:w-48">
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) => {
                              const updated = [...navItems];
                              updated[idx] = { ...updated[idx], label: e.target.value };
                              setNavItems(updated);
                            }}
                            placeholder="Menu display label..."
                            className="w-full px-3 py-1.5 bg-[#14110E] border border-[#26201B] rounded-lg text-[#FAF7F2] font-semibold uppercase tracking-wider text-xs focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        {/* Visibility Switch */}
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                          <input
                            type="checkbox"
                            checked={item.isVisible !== false}
                            onChange={(e) => {
                              const updated = [...navItems];
                              updated[idx] = { ...updated[idx], isVisible: e.target.checked };
                              setNavItems(updated);
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-[#1C1815] border border-[#2E2822] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#771722]"></div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Header CTA Button Label */}
                <div className="pt-4 border-t border-[#24201C]">
                  <label className="block text-[#FAF7F2] mb-1 font-medium">Header Right Action Button (CTA)</label>
                  <div className="max-w-xs">
                    <input
                      type="text"
                      value={navCta}
                      onChange={(e) => setNavCta(e.target.value)}
                      placeholder="e.g. PRIVATE PREVIEW"
                      className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] font-bold uppercase tracking-wider text-xs focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#24201C] flex justify-end">
                  <button
                    onClick={() => {
                      updateSettings({
                        logoDarkUrl: logoDark,
                        logoLightUrl: logoLight,
                        logoSymbolUrl: logoSymbol,
                        navCtaText: navCta,
                        navLinks: navItems
                      });
                      showToast('Logos & Navigation menu saved!');
                    }}
                    className="px-6 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-lg cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Save Logos & Nav
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: INTRO PRELOADER & TIMING */}
          {activeTab === 'preloader' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#24201C]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">Intro Preloader & Timing</h1>
                  <p className="text-xs text-[#8E857C] font-sans mt-1">
                    Control the cinematic brand preloader duration, enable/disable toggle, and sequential luxury quote messages.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={startSimulator}
                    className="px-4 py-2.5 bg-[#171412] hover:bg-[#201C18] text-[#C5A880] rounded-lg text-xs font-sans font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 border border-[#2E2822] shadow-sm cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Test Simulation
                  </button>

                  <button
                    onClick={() => {
                      updatePreloaderConfig(preloaderForm);
                      showToast('Preloader settings saved successfully!');
                    }}
                    className="px-5 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-lg text-xs font-sans font-bold tracking-wider uppercase transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Save Preloader
                  </button>
                </div>
              </div>

              {/* Interactive Live Simulator Screen */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#C5A880] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> Interactive Preloader Simulator
                  </span>
                  <span className="text-[10px] text-[#8E857C] font-mono">
                    Duration: {preloaderForm.durationSeconds}s · Status: {preloaderForm.isEnabled !== false ? 'Enabled' : 'Disabled'}
                  </span>
                </div>

                <div className="relative overflow-hidden bg-[#FAF7F2] text-[#222222] border border-[#EAE3DA] p-8 sm:p-12 rounded-xl shadow-sm min-h-[320px] flex flex-col justify-between items-center text-center">
                  
                  {/* Subtle Ambient glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-[#C5A880]/15 via-[#7A1522]/8 to-transparent rounded-full blur-2xl pointer-events-none"></div>

                  <div className="w-full" />

                  {/* Logo & Quote Carousel in Simulator */}
                  <div className="relative z-10 space-y-5 max-w-md">
                    <div className="flex justify-center">
                      <ArwinLogo variant="dark" size="md" />
                    </div>

                    <div className="min-h-[85px] flex flex-col items-center justify-center space-y-1.5">
                      {preloaderForm.messages && preloaderForm.messages[simIndex] ? (
                        <>
                          <div className="text-[9.5px] font-sans font-bold tracking-[0.28em] text-[#C5A880] uppercase">
                            {preloaderForm.messages[simIndex].tag}
                          </div>
                          <h3 className="font-serif text-xl sm:text-2xl text-[#222222] font-normal leading-snug">
                            “{preloaderForm.messages[simIndex].quote}”
                          </h3>
                          <p className="text-xs font-sans text-[#777777]">
                            {preloaderForm.messages[simIndex].sub}
                          </p>
                        </>
                      ) : (
                        <div className="text-xs text-neutral-400">No quotes configured.</div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-48 h-[1.5px] bg-[#EAE3DA] overflow-hidden mx-auto">
                      <div
                        className="h-full bg-gradient-to-r from-[#C5A880] to-[#7A1522] transition-all duration-75"
                        style={{ width: `${simulatorActive ? simProgress : 65}%` }}
                      />
                    </div>
                  </div>

                  {/* Simulator Bottom */}
                  <div className="relative z-10 space-y-1.5">
                    <div className="font-mono text-xs font-semibold tracking-widest text-[#771722]">
                      {simulatorActive ? `${simProgress.toString().padStart(2, '0')}%` : '65% (Preview)'}
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-[9.5px] font-sans text-neutral-400 uppercase tracking-widest">
                      <ShieldCheck className="w-3 h-3 text-[#C5A880]" />
                      <span>{preloaderForm.bottomBadge || 'CONFIDENTIAL PRIVATE PORTFOLIO'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TIMING & GENERAL CONTROLS */}
              <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-5 text-xs shadow-xl">
                <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                  <Timer className="w-4 h-4" /> Timing & Display Behavior
                </h2>

                {/* Enable Switch */}
                <div className="p-4 bg-[#090807] rounded-lg border border-[#24201C] flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#FAF7F2] text-sm">Intro Preloader Active</div>
                    <div className="text-[11px] text-[#8E857C]">Show the editorial brand introduction when visitors load the homepage.</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preloaderForm.isEnabled !== false}
                      onChange={(e) => setPreloaderForm({ ...preloaderForm, isEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#1C1815] border border-[#2E2822] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#771722]"></div>
                  </label>
                </div>

                {/* Duration Slider & Presets */}
                <div className="p-4 bg-[#090807] rounded-lg border border-[#24201C] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[#FAF7F2]">Preloader Display Duration</div>
                      <div className="text-[11px] text-[#8E857C]">Total seconds before the site smoothly fades in.</div>
                    </div>
                    <div className="px-3 py-1 bg-[#14110E] border border-[#26201B] rounded-lg font-mono text-sm font-bold text-[#C5A880]">
                      {preloaderForm.durationSeconds} Seconds
                    </div>
                  </div>

                  <div className="pt-2">
                    <input
                      type="range"
                      min="1.0"
                      max="10.0"
                      step="0.5"
                      value={preloaderForm.durationSeconds}
                      onChange={(e) => setPreloaderForm({ ...preloaderForm, durationSeconds: parseFloat(e.target.value) })}
                      className="w-full h-2 bg-[#1C1815] rounded-lg appearance-none cursor-pointer accent-[#771722]"
                    />
                  </div>

                  {/* Preset Speed Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] text-[#7A7167] uppercase font-mono font-semibold">Quick Presets:</span>
                    {[
                      { label: 'Snappy (2.5s)', val: 2.5 },
                      { label: 'Standard (4.0s)', val: 4.0 },
                      { label: 'Cinematic (6.0s)', val: 6.0 },
                      { label: 'Immersive (7.5s)', val: 7.5 }
                    ].map((preset) => (
                      <button
                        key={preset.val}
                        onClick={() => setPreloaderForm({ ...preloaderForm, durationSeconds: preset.val })}
                        className={`px-2.5 py-1 rounded text-[10px] font-mono font-semibold transition-colors cursor-pointer ${
                          preloaderForm.durationSeconds === preset.val
                            ? 'bg-[#771722] text-white'
                            : 'bg-[#14110E] text-[#8E857C] hover:bg-[#1C1815] border border-[#26201B]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Trust Badge */}
                <div>
                  <label className="block text-[#FAF7F2] mb-1 font-medium">Bottom Trust Guarantee Badge</label>
                  <input
                    type="text"
                    value={preloaderForm.bottomBadge}
                    onChange={(e) => setPreloaderForm({ ...preloaderForm, bottomBadge: e.target.value })}
                    placeholder="e.g. CONFIDENTIAL PRIVATE PORTFOLIO"
                    className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* SEQUENTIAL QUOTE MESSAGES MANAGER */}
              <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-5 text-xs shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                      <MessageSquareQuote className="w-4 h-4" /> Sequential Luxury Quotes & Messages
                    </h2>
                    <p className="text-[11px] text-[#8E857C] mt-0.5">
                      Messages transition automatically in order during the preloading duration.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newMsg: PreloaderMessage = {
                        id: `pre-${Date.now()}`,
                        tag: "NEW EDITORIAL SLIDE",
                        quote: "New brand statement or quote.",
                        sub: "Subtext or advisory explanation."
                      };
                      setPreloaderForm({
                        ...preloaderForm,
                        messages: [...(preloaderForm.messages || []), newMsg]
                      });
                    }}
                    className="px-3 py-1.5 bg-[#171412] hover:bg-[#201C18] text-[#C5A880] rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-[#2E2822] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Quote Slide
                  </button>
                </div>

                <div className="space-y-4">
                  {(preloaderForm.messages || []).map((msg, idx) => (
                    <div key={msg.id || idx} className="p-4 bg-[#090807] rounded-lg border border-[#24201C] space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#24201C]">
                        <span className="font-medium text-[#FAF7F2] flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-[#1C1815] text-[#C5A880] text-[10px] flex items-center justify-center font-mono border border-[#2E2822]">
                            0{idx + 1}
                          </span>
                          Message Slide #{idx + 1}
                        </span>

                        {(preloaderForm.messages || []).length > 1 && (
                          <button
                            onClick={() => {
                              const updated = preloaderForm.messages.filter((_, i) => i !== idx);
                              setPreloaderForm({ ...preloaderForm, messages: updated });
                            }}
                            className="text-red-400 hover:text-red-300 p-1 transition-colors cursor-pointer"
                            title="Delete slide"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-neutral-400 uppercase font-semibold mb-1">Tag / Category Label</label>
                          <input
                            type="text"
                            value={msg.tag}
                            onChange={(e) => {
                              const updated = [...preloaderForm.messages];
                              updated[idx] = { ...updated[idx], tag: e.target.value };
                              setPreloaderForm({ ...preloaderForm, messages: updated });
                            }}
                            className="w-full px-3 py-1.5 bg-[#1F1C18] border border-neutral-700 rounded-lg text-neutral-100 text-xs uppercase tracking-wider"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-neutral-400 uppercase font-semibold mb-1">Main Quote / Headline</label>
                          <input
                            type="text"
                            value={msg.quote}
                            onChange={(e) => {
                              const updated = [...preloaderForm.messages];
                              updated[idx] = { ...updated[idx], quote: e.target.value };
                              setPreloaderForm({ ...preloaderForm, messages: updated });
                            }}
                            className="w-full px-3 py-1.5 bg-[#1F1C18] border border-neutral-700 rounded-lg text-neutral-100 font-serif text-xs"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[10px] text-neutral-400 uppercase font-semibold mb-1">Subtext Narrative</label>
                          <input
                            type="text"
                            value={msg.sub}
                            onChange={(e) => {
                              const updated = [...preloaderForm.messages];
                              updated[idx] = { ...updated[idx], sub: e.target.value };
                              setPreloaderForm({ ...preloaderForm, messages: updated });
                            }}
                            className="w-full px-3 py-1.5 bg-[#1F1C18] border border-neutral-700 rounded-lg text-neutral-100 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-neutral-800 flex justify-end">
                  <button
                    onClick={() => {
                      updatePreloaderConfig(preloaderForm);
                      showToast('Preloader settings saved successfully!');
                    }}
                    className="px-6 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-lg"
                  >
                    <Save className="w-4 h-4" /> Save Preloader
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: MEDIA GALLERY (NEW) */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">Media & Photo Gallery</h1>
                  <p className="text-xs text-neutral-400 font-sans mt-1">
                    Upload and manage high-resolution luxury property photos, hero banners, and architecture assets.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <input
                    ref={mediaFileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleMediaUpload(e.target.files)}
                    className="hidden"
                  />
                  <button
                    onClick={() => mediaFileInputRef.current?.click()}
                    disabled={isUploadingMedia}
                    className="px-4 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-xl text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2 shadow-md disabled:opacity-50"
                  >
                    {isUploadingMedia ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Upload Photos</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Upload Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  handleMediaUpload(e.dataTransfer.files);
                }}
                onClick={() => mediaFileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${
                  dragOver
                    ? 'border-[#C5A880] bg-[#C5A880]/10'
                    : 'border-neutral-800 hover:border-neutral-700 bg-[#1F1C18]'
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-2 text-xs text-neutral-400">
                  <div className="p-3 bg-neutral-800/80 rounded-full text-[#C5A880]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="font-semibold text-neutral-200 text-sm">
                    Drag and drop your photos here, or <span className="text-[#C5A880] underline">browse files</span>
                  </div>
                  <span className="text-[11px] text-neutral-500">
                    Supports JPG, PNG, WEBP. Uploaded photos can be linked across Hero Slides, Residences, and Collections.
                  </span>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={mediaSearch}
                    onChange={(e) => setMediaSearch(e.target.value)}
                    placeholder="Search gallery by photo name..."
                    className="w-full pl-10 pr-4 py-2 bg-[#1F1C18] border border-neutral-800 rounded-xl text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  {[
                    { id: 'all', label: 'All Photos' },
                    { id: 'hero', label: 'Hero Banners' },
                    { id: 'residences', label: 'Residences' },
                    { id: 'collections', label: 'Collections' },
                    { id: 'uploads', label: 'Client Uploads' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setMediaCategory(cat.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${
                        mediaCategory === cat.id
                          ? 'bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/40'
                          : 'bg-[#1F1C18] text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mediaGallery
                  .filter(item => {
                    const matchCat = mediaCategory === 'all' || item.category === mediaCategory;
                    const matchQuery = item.name.toLowerCase().includes(mediaSearch.toLowerCase()) ||
                                       item.url.toLowerCase().includes(mediaSearch.toLowerCase());
                    return matchCat && matchQuery;
                  })
                  .map(item => (
                    <div
                      key={item.id}
                      className="group bg-[#1F1C18] border border-neutral-800 hover:border-[#C5A880]/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all"
                    >
                      {/* Image Thumbnail */}
                      <div
                        onClick={() => setPreviewMediaModal(item)}
                        className="relative aspect-[4/3] bg-neutral-900 overflow-hidden cursor-pointer"
                      >
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <span className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white">
                            <Eye className="w-4 h-4" />
                          </span>
                        </div>
                        {item.size && (
                          <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-[9px] font-mono text-neutral-300 px-1.5 py-0.5 rounded">
                            {item.size}
                          </span>
                        )}
                      </div>

                      {/* Card Details & Actions */}
                      <div className="p-3 space-y-2">
                        <div className="text-xs font-semibold text-neutral-200 truncate" title={item.name}>
                          {item.name}
                        </div>
                        <div className="text-[10px] text-neutral-500 truncate font-mono">
                          {item.url}
                        </div>

                        <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(item.url);
                              setCopiedMediaUrl(item.url);
                              showToast('Image URL copied to clipboard');
                              setTimeout(() => setCopiedMediaUrl(null), 2000);
                            }}
                            className="px-2 py-1 bg-neutral-800 hover:bg-[#771722] text-neutral-300 hover:text-white rounded-lg text-[10px] font-medium transition-colors flex items-center gap-1"
                            title="Copy Image Link"
                          >
                            {copiedMediaUrl === item.url ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Link</span>
                              </>
                            )}
                          </button>

                          {item.category === 'uploads' && (
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete ${item.name} from media library?`)) {
                                  deleteMediaItem(item.id);
                                  showToast('Deleted photo');
                                }
                              }}
                              className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-950/20"
                              title="Delete Photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* LIGHTBOX PREVIEW MODAL */}
          {previewMediaModal && (
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-[#1F1C18] border border-neutral-700 rounded-2xl max-w-3xl w-full p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h3 className="text-sm font-semibold text-neutral-200">{previewMediaModal.name}</h3>
                  <button onClick={() => setPreviewMediaModal(null)}>
                    <X className="w-5 h-5 text-neutral-400" />
                  </button>
                </div>
                <div className="max-h-[60vh] overflow-hidden rounded-xl bg-neutral-950 flex items-center justify-center">
                  <img src={previewMediaModal.url} alt={previewMediaModal.name} className="max-h-[60vh] w-auto object-contain" />
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-400 pt-2">
                  <span className="font-mono">{previewMediaModal.url}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(previewMediaModal.url);
                      showToast('Image URL copied to clipboard');
                    }}
                    className="px-3 py-1.5 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-lg flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy Image URL
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS & RESIDENCES */}
          {/* TAB 2: PROJECTS & RESIDENCES */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#24201C]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">Residences & Projects</h1>
                  <p className="text-xs text-[#8E857C] font-sans mt-1">
                    Add, edit, or remove featured property developments shown across the portal.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingProject({
                      id: `project-${Date.now()}`,
                      tag: 'NEW LAUNCH',
                      location: 'HITEC City, Hyderabad',
                      name: '',
                      priceStarting: '₹3.5 Cr Onwards',
                      image: '/images/hero-slide-2.jpg',
                      units: '4 & 5 BHK Sky Residences',
                      carpetArea: '3,800 – 5,400 sq.ft',
                      reraNumber: 'P02400008192',
                      description: '',
                      amenities: ['Private Sky Deck', 'Infinity Pool', 'Clubhouse'],
                      floorPlans: [
                        { type: '4 BHK Luxury Sky Residence', area: '3,850 sq.ft', price: '₹3.85 Cr' }
                      ]
                    });
                    setIsAddingProject(true);
                  }}
                  className="px-4 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" /> Add Residence
                </button>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map(proj => (
                  <div key={proj.id} className="bg-[#14110E] border border-[#24201C] rounded-xl overflow-hidden flex flex-col group shadow-lg">
                    <div className="relative h-44 w-full bg-neutral-900 overflow-hidden">
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-[#771722] text-[#FAF7F2] text-[10px] font-bold tracking-wider px-2 py-0.5 rounded">
                        {proj.tag}
                      </div>
                      <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-[#C5A880] text-xs font-bold px-2.5 py-1 rounded-md">
                        {proj.priceStarting}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1.5">
                        <div className="text-[11px] text-[#C5A880] flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {proj.location}
                        </div>
                        <h3 className="text-base font-serif text-[#FAF7F2] font-semibold">{proj.name}</h3>
                        <p className="text-xs text-[#8E857C] line-clamp-2">{proj.description}</p>
                      </div>

                      <div className="pt-3 border-t border-[#24201C] flex items-center justify-between">
                        <span className="text-[10px] text-[#7A7167]">RERA: {proj.reraNumber}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingProject(proj);
                              setIsAddingProject(false);
                            }}
                            className="p-2 bg-[#1C1815] hover:bg-[#771722] text-neutral-300 hover:text-white rounded-lg transition-colors cursor-pointer border border-[#2E2822]"
                            title="Edit Project"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${proj.name}?`)) {
                                deleteProject(proj.id);
                                showToast(`Deleted ${proj.name}`);
                              }
                            }}
                            className="p-2 bg-[#1C1815] hover:bg-red-900 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer border border-[#2E2822]"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECT EDIT / ADD MODAL WITH IMAGE PICKER */}
          {editingProject && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#14110E] border border-[#2E2822] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-[#24201C]">
                  <h2 className="text-lg font-serif text-[#FAF7F2]">
                    {isAddingProject ? 'Add New Residence' : `Edit: ${editingProject.name}`}
                  </h2>
                  <button onClick={() => setEditingProject(null)} className="text-neutral-400 hover:text-white cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Project Name</label>
                    <input
                      type="text"
                      value={editingProject.name}
                      onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#24201C] rounded-lg text-[#FAF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Badge Tag (e.g. ICONIC G+46 HIGH-RISE)</label>
                    <input
                      type="text"
                      value={editingProject.tag}
                      onChange={(e) => setEditingProject({ ...editingProject, tag: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#24201C] rounded-lg text-[#FAF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Location / Area</label>
                    <input
                      type="text"
                      value={editingProject.location}
                      onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#24201C] rounded-lg text-[#FAF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Starting Price</label>
                    <input
                      type="text"
                      value={editingProject.priceStarting}
                      onChange={(e) => setEditingProject({ ...editingProject, priceStarting: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#24201C] rounded-lg text-[#FAF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Units Typology</label>
                    <input
                      type="text"
                      value={editingProject.units}
                      onChange={(e) => setEditingProject({ ...editingProject, units: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#24201C] rounded-lg text-[#FAF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Carpet / Super Area</label>
                    <input
                      type="text"
                      value={editingProject.carpetArea}
                      onChange={(e) => setEditingProject({ ...editingProject, carpetArea: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#24201C] rounded-lg text-[#FAF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#FAF7F2] mb-1 font-medium">RERA Number</label>
                    <input
                      type="text"
                      value={editingProject.reraNumber}
                      onChange={(e) => setEditingProject({ ...editingProject, reraNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#24201C] rounded-lg text-[#FAF7F2]"
                    />
                  </div>

                  {/* Integrated Image Input With Gallery Picker */}
                  <div className="sm:col-span-2">
                    <ImageInputWithPicker
                      label="Residence Cover Photo"
                      value={editingProject.image}
                      onChange={(url) => setEditingProject({ ...editingProject, image: url })}
                      helperText="Choose high-resolution architecture photography from the gallery or upload your own."
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Description</label>
                    <textarea
                      rows={3}
                      value={editingProject.description}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-neutral-300 mb-1">Amenities (comma-separated)</label>
                    <input
                      type="text"
                      value={editingProject.amenities?.join(', ') || ''}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        amenities: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                  <button
                    onClick={() => setEditingProject(null)}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (isAddingProject) {
                        addProject(editingProject);
                        showToast(`Created project: ${editingProject.name}`);
                      } else {
                        updateProject(editingProject.id, editingProject);
                        showToast(`Updated project: ${editingProject.name}`);
                      }
                      setEditingProject(null);
                    }}
                    className="px-5 py-2 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" /> Save Residence
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SELLER LISTINGS MODERATION DESK */}
          {activeTab === 'seller-submissions' && (
            <SellerSubmissionsManager />
          )}

          {/* TAB 3: COLLECTIONS (01-03) */}
          {activeTab === 'collections' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">Collection Tiers</h1>
                <p className="text-xs text-neutral-400 font-sans mt-1">
                  Manage the 3 Core Investment Tiers: 01 Signature, 02 Luxury, and 03 Private Collection.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {collectionTiers.map(tier => (
                  <div key={tier.id} className="bg-[#1F1C18] border border-neutral-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#C5A880] px-2.5 py-1 rounded bg-[#C5A880]/10 border border-[#C5A880]/30">
                          TIER {tier.badgeNumber}
                        </span>
                        <span className="text-xs font-bold text-[#FAF7F2]">{tier.priceRange}</span>
                      </div>

                      <div className="aspect-[16/10] bg-neutral-900 rounded-xl overflow-hidden">
                        <img src={tier.image} alt={tier.title} className="w-full h-full object-cover" />
                      </div>

                      <h3 className="text-lg font-serif text-[#FAF7F2] font-semibold">{tier.title}</h3>
                      <p className="text-xs text-neutral-400">{tier.subtitle}</p>

                      <div className="pt-2 space-y-1.5 text-xs text-neutral-300">
                        <div><strong className="text-neutral-400">Typology:</strong> {tier.specs?.typology}</div>
                        <div><strong className="text-neutral-400">Size:</strong> {tier.specs?.size}</div>
                        <div><strong className="text-neutral-400">Possession:</strong> {tier.specs?.possession}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setEditingTier(tier)}
                      className="w-full py-2.5 bg-neutral-800 hover:bg-[#771722] text-neutral-200 hover:text-white rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit Tier {tier.badgeNumber}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDIT TIER MODAL WITH IMAGE PICKER */}
          {editingTier && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#1F1C18] border border-neutral-700 rounded-2xl max-w-xl w-full p-6 space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h2 className="text-base font-serif text-[#FAF7F2]">Edit Tier {editingTier.badgeNumber}</h2>
                  <button onClick={() => setEditingTier(null)}><X className="w-4 h-4 text-neutral-400" /></button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-neutral-300 mb-1">Title</label>
                    <input
                      type="text"
                      value={editingTier.title}
                      onChange={(e) => setEditingTier({ ...editingTier, title: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Price Range</label>
                    <input
                      type="text"
                      value={editingTier.priceRange}
                      onChange={(e) => setEditingTier({ ...editingTier, priceRange: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={editingTier.subtitle}
                      onChange={(e) => setEditingTier({ ...editingTier, subtitle: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Typology</label>
                    <input
                      type="text"
                      value={editingTier.specs?.typology || ''}
                      onChange={(e) => setEditingTier({
                        ...editingTier,
                        specs: { ...editingTier.specs, typology: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  {/* Image Picker */}
                  <ImageInputWithPicker
                    label="Collection Header Image"
                    value={editingTier.image}
                    onChange={(url) => setEditingTier({ ...editingTier, image: url })}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                  <button onClick={() => setEditingTier(null)} className="px-4 py-2 bg-neutral-800 rounded-xl">Cancel</button>
                  <button
                    onClick={() => {
                      updateCollectionTier(editingTier.id, editingTier);
                      showToast(`Updated Tier ${editingTier.badgeNumber}`);
                      setEditingTier(null);
                    }}
                    className="px-4 py-2 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-xl font-bold uppercase"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HERO BANNERS */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">Hero Slides & Banners</h1>
                  <p className="text-xs text-neutral-400 font-sans mt-1">
                    Customize the full-screen carousel headlines, CTAs, and background images on the homepage.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingSlide({
                      id: `slide-${Date.now()}`,
                      brandTag: 'EXCLUSIVE COLLECTION',
                      titleLine1: 'Luxury Skyline Living',
                      titleLine2: 'Privately Curated',
                      titleAccent: 'Privately Curated',
                      subheadline: 'Exclusive residences crafted for discerning buyers.',
                      ctaPrimary: 'EXPLORE RESIDENCES',
                      ctaSecondary: 'REQUEST DOSSIER',
                      image: '/images/hero-scene.jpg',
                      badge: 'NEW COLLECTION'
                    });
                    setIsAddingSlide(true);
                  }}
                  className="px-4 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-xl text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Slide
                </button>
              </div>

              <div className="space-y-4">
                {heroSlides.map((slide, idx) => (
                  <div key={slide.id} className="bg-[#1F1C18] border border-neutral-800 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full md:w-48 h-28 bg-neutral-900 rounded-xl overflow-hidden shrink-0 relative">
                      <img src={slide.image} alt={slide.titleLine1} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-black/80 text-[#C5A880] text-[10px] font-mono px-2 py-0.5 rounded">
                        Slide 0{idx + 1}
                      </span>
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="text-[10px] font-bold text-[#C5A880] tracking-widest uppercase">
                        {slide.brandTag}
                      </div>
                      <h3 className="text-base font-serif text-[#FAF7F2] font-semibold">
                        {slide.titleLine1} {slide.titleLine2}
                      </h3>
                      <p className="text-xs text-neutral-400 line-clamp-1">{slide.subheadline}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingSlide(slide);
                          setIsAddingSlide(false);
                        }}
                        className="p-2.5 bg-neutral-800 hover:bg-[#771722] text-neutral-300 hover:text-white rounded-xl transition-colors"
                        title="Edit Slide"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this slide?')) {
                            deleteHeroSlide(slide.id);
                            showToast('Deleted slide');
                          }
                        }}
                        className="p-2.5 bg-neutral-800 hover:bg-red-900 text-neutral-400 hover:text-white rounded-xl transition-colors"
                        title="Delete Slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDIT / ADD HERO SLIDE MODAL WITH IMAGE PICKER */}
          {editingSlide && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#1F1C18] border border-neutral-700 rounded-2xl max-w-xl w-full p-6 space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h2 className="text-base font-serif text-[#FAF7F2]">
                    {isAddingSlide ? 'Add Hero Slide' : 'Edit Hero Slide'}
                  </h2>
                  <button onClick={() => setEditingSlide(null)}><X className="w-4 h-4 text-neutral-400" /></button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-neutral-300 mb-1">Brand Tag / Sub-header</label>
                    <input
                      type="text"
                      value={editingSlide.brandTag}
                      onChange={(e) => setEditingSlide({ ...editingSlide, brandTag: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-neutral-300 mb-1">Headline Line 1</label>
                      <input
                        type="text"
                        value={editingSlide.titleLine1}
                        onChange={(e) => setEditingSlide({ ...editingSlide, titleLine1: e.target.value })}
                        className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-300 mb-1">Headline Line 2 (Accent)</label>
                      <input
                        type="text"
                        value={editingSlide.titleLine2}
                        onChange={(e) => setEditingSlide({ ...editingSlide, titleLine2: e.target.value })}
                        className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Subheadline</label>
                    <textarea
                      rows={2}
                      value={editingSlide.subheadline}
                      onChange={(e) => setEditingSlide({ ...editingSlide, subheadline: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  {/* Hero Image Picker with Browse Gallery & Upload */}
                  <ImageInputWithPicker
                    label="Hero Carousel Photo"
                    value={editingSlide.image}
                    onChange={(url) => setEditingSlide({ ...editingSlide, image: url })}
                    helperText="Select or upload luxury full-width architecture photo."
                  />

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-neutral-300 mb-1">Primary CTA Label</label>
                      <input
                        type="text"
                        value={editingSlide.ctaPrimary}
                        onChange={(e) => setEditingSlide({ ...editingSlide, ctaPrimary: e.target.value })}
                        className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-300 mb-1">Secondary CTA Label</label>
                      <input
                        type="text"
                        value={editingSlide.ctaSecondary}
                        onChange={(e) => setEditingSlide({ ...editingSlide, ctaSecondary: e.target.value })}
                        className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                  <button onClick={() => setEditingSlide(null)} className="px-4 py-2 bg-neutral-800 rounded-xl">Cancel</button>
                  <button
                    onClick={() => {
                      if (isAddingSlide) {
                        addHeroSlide(editingSlide);
                        showToast('Slide added');
                      } else {
                        updateHeroSlide(editingSlide.id, editingSlide);
                        showToast('Slide updated');
                      }
                      setEditingSlide(null);
                    }}
                    className="px-4 py-2 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-xl font-bold uppercase"
                  >
                    Save Slide
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PARTNER WITH US */}
          {activeTab === 'partner' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">Partner With Us / Careers</h1>
                  <p className="text-xs text-neutral-400 font-sans mt-1">
                    Manage the strategic partnership and career recruitment ribbon displayed directly above the website footer.
                  </p>
                </div>

                <button
                  onClick={() => {
                    updatePartnerSection(partnerForm);
                    showToast('Partner With Us section updated successfully!');
                  }}
                  className="px-5 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-xl text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2 shadow-md"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>

              {/* Live Preview Card */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#C5A880] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" /> Real-time Homepage Preview
                </div>

                <div className="bg-[#FAF7F2] text-[#222222] border border-[#EAE3DA] p-6 sm:p-7 rounded-2xl shadow-sm space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-[1.5px] bg-[#771722]"></span>
                          <span className="text-[11px] font-sans font-bold tracking-[0.22em] text-[#771722] uppercase">
                            {partnerForm.tag || 'CAREERS & STRATEGIC PARTNERSHIPS'}
                          </span>
                        </div>
                        {partnerForm.badgeNote && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-[#D9D0C5]" />
                            <span className="text-xs font-semibold text-[#771722]">
                              {partnerForm.badgeNote}
                            </span>
                          </>
                        )}
                      </div>

                      <h2 className="font-serif text-xl sm:text-2xl text-[#222222] font-normal leading-snug">
                        {partnerForm.headlineMain || 'Partner With Us.'}{' '}
                        <span className="text-[#771722]">{partnerForm.headlineAccent || 'For the Most Rewarding Real Estate Career.'}</span>
                      </h2>

                      <p className="text-xs text-[#55504A] leading-relaxed">
                        {partnerForm.description || 'Represent ₹1.5 Cr – ₹35 Cr+ luxury portfolios with 1-on-1 executive mentorship and industry-leading transparent incentives.'}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto lg:w-[220px]">
                      <div className="w-full bg-[#771722] text-white py-2.5 px-4 text-[11px] font-bold tracking-wider uppercase text-center rounded">
                        {partnerForm.whatsappCtaText || 'APPLY VIA WHATSAPP'}
                      </div>
                      <div className="w-full bg-white text-[#222222] border border-[#EAE3DA] py-2 px-3 text-[11px] font-semibold tracking-wider uppercase text-center rounded">
                        {partnerForm.modalCtaText || 'SUBMIT RESUME'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Controls */}
              <div className="bg-[#1F1C18] border border-neutral-800 rounded-2xl p-6 space-y-5 text-xs">
                
                {/* Visibility Toggle */}
                <div className="p-4 bg-[#141210] rounded-xl border border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-neutral-100 text-sm">Banner Visibility on Homepage</div>
                    <div className="text-[11px] text-neutral-400">Show or hide the Partner With Us section above the footer.</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={partnerForm.isVisible !== false}
                      onChange={(e) => setPartnerForm({ ...partnerForm, isVisible: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#771722]"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-300 mb-1">Section Tag (Top Ribbon)</label>
                    <input
                      type="text"
                      value={partnerForm.tag}
                      onChange={(e) => setPartnerForm({ ...partnerForm, tag: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Audience / Requirement Note</label>
                    <input
                      type="text"
                      value={partnerForm.badgeNote}
                      onChange={(e) => setPartnerForm({ ...partnerForm, badgeNote: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Headline (Main)</label>
                    <input
                      type="text"
                      value={partnerForm.headlineMain}
                      onChange={(e) => setPartnerForm({ ...partnerForm, headlineMain: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Headline (Accent in Burgundy)</label>
                    <input
                      type="text"
                      value={partnerForm.headlineAccent}
                      onChange={(e) => setPartnerForm({ ...partnerForm, headlineAccent: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100 text-[#C5A880]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-neutral-300 mb-1">Description / Value Proposition</label>
                    <textarea
                      rows={2}
                      value={partnerForm.description}
                      onChange={(e) => setPartnerForm({ ...partnerForm, description: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">WhatsApp Button Label</label>
                    <input
                      type="text"
                      value={partnerForm.whatsappCtaText}
                      onChange={(e) => setPartnerForm({ ...partnerForm, whatsappCtaText: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Resume Modal Button Label</label>
                    <input
                      type="text"
                      value={partnerForm.modalCtaText}
                      onChange={(e) => setPartnerForm({ ...partnerForm, modalCtaText: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-neutral-300 mb-1">Pre-filled WhatsApp Message for Candidates</label>
                    <input
                      type="text"
                      value={partnerForm.whatsappMessage}
                      onChange={(e) => setPartnerForm({ ...partnerForm, whatsappMessage: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100 font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800 flex justify-end">
                  <button
                    onClick={() => {
                      updatePartnerSection(partnerForm);
                      showToast('Partner With Us section saved!');
                    }}
                    className="px-6 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-lg"
                  >
                    <Save className="w-4 h-4" /> Save Partner Section
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SELLER DESK / LIST PROPERTY */}
          {activeTab === 'seller-desk' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">Private Seller Desk</h1>
                  <p className="text-xs text-neutral-400 font-sans mt-1">
                    Manage the "List Your Property / Private Representation" section, feature image, and off-market advisory metrics.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setLeadTypeFilter('seller');
                      setActiveTab('leads');
                    }}
                    className="px-4 py-2.5 bg-[#14110E] hover:bg-[#1C1815] text-[#C5A880] rounded-lg text-xs font-semibold border border-[#2E2822] flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Posted Properties ({leads.filter(l => l.formType === 'List Luxury Property').length})
                  </button>
                  <button
                    onClick={() => {
                      updateSellerDesk(sellerForm);
                      showToast('Private Seller Desk section updated successfully!');
                    }}
                    className="px-5 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-lg text-xs font-sans font-bold tracking-wider uppercase transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </div>

              {/* Real-time Preview */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#C5A880] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" /> Real-time Homepage Preview
                </div>

                <div className="bg-white text-[#222222] border border-[#EAE3DA] p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    
                    {/* Left: Headline + Stats */}
                    <div className="lg:col-span-5 space-y-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-[1.5px] bg-[#771722]"></span>
                        <span className="text-[10px] font-sans font-bold tracking-[0.24em] text-[#771722] uppercase">
                          {sellerForm.tag || 'PRIVATE SELLER DESK'}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#222222] leading-tight font-normal">
                        {sellerForm.headlineMain || 'List Your Property.'}<br />
                        <span className="text-[#771722]">{sellerForm.headlineAccent || 'Private Representation.'}</span>
                      </h3>
                      <p className="text-xs text-[#55504A] leading-relaxed">
                        {sellerForm.description || "Discreet off-market advisory and direct access to qualified Grade-A, Elite & Global NRI buyers for Hyderabad's luxury residences."}
                      </p>

                      <div className="grid grid-cols-4 gap-2 pt-2 border-y border-[#EAE3DA] py-3">
                        {(sellerForm.stats || []).map((s, i) => (
                          <div key={i} className="pr-1 border-r border-[#EAE3DA] last:border-r-0">
                            <div className="font-serif text-sm text-[#771722] font-bold">{s.value}</div>
                            <div className="text-[9px] text-[#666058] font-medium leading-tight">{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Middle: Portrait Image */}
                    <div className="lg:col-span-4 flex justify-center">
                      <div className="w-full max-w-[180px] aspect-[3/4] overflow-hidden rounded-xl bg-neutral-900 border border-[#EAE3DA] shadow-md">
                        <img src={sellerForm.image || '/images/villa-triplex-interior.jpg'} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    {/* Right: Quote & CTAs */}
                    <div className="lg:col-span-3 space-y-3">
                      <div className="text-[#771722]/30 text-3xl font-serif leading-none select-none">“</div>
                      <p className="font-serif text-xs italic text-[#222222] leading-relaxed -mt-2">
                        {sellerForm.quote || "“Your luxury asset deserves an advisory-first presentation—commanding true valuation without public portal exposure.”"}
                      </p>
                      <div className="space-y-2 pt-2 border-t border-[#EAE3DA]">
                        <div className="bg-[#771722] text-white py-2 px-3 text-[10px] font-bold tracking-wider uppercase text-center rounded shadow-sm">
                          {sellerForm.primaryCtaText || 'POST LUXURY PROPERTY'}
                        </div>
                        <div className="bg-white text-[#222222] border border-[#EAE3DA] py-1.5 px-3 text-[10px] font-semibold tracking-wider uppercase text-center rounded">
                          {sellerForm.whatsappCtaText || 'WHATSAPP SELLER DESK'}
                        </div>
                        <div className="text-[9px] text-neutral-500 text-center font-medium">
                          {sellerForm.footnote}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Form Controls */}
              <div className="bg-[#1F1C18] border border-neutral-800 rounded-2xl p-6 space-y-5 text-xs">
                
                {/* Visibility Switch */}
                <div className="p-4 bg-[#141210] rounded-xl border border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-neutral-100 text-sm">Banner Visibility on Homepage</div>
                    <div className="text-[11px] text-neutral-400">Show or hide the Private Seller Desk section on the homepage.</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sellerForm.isVisible !== false}
                      onChange={(e) => setSellerForm({ ...sellerForm, isVisible: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#771722]"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-300 mb-1">Section Tag (Top Ribbon)</label>
                    <input
                      type="text"
                      value={sellerForm.tag}
                      onChange={(e) => setSellerForm({ ...sellerForm, tag: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Main Headline</label>
                    <input
                      type="text"
                      value={sellerForm.headlineMain}
                      onChange={(e) => setSellerForm({ ...sellerForm, headlineMain: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Headline Accent (Burgundy)</label>
                    <input
                      type="text"
                      value={sellerForm.headlineAccent}
                      onChange={(e) => setSellerForm({ ...sellerForm, headlineAccent: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100 text-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Footnote / Advisory Disclaimer</label>
                    <input
                      type="text"
                      value={sellerForm.footnote}
                      onChange={(e) => setSellerForm({ ...sellerForm, footnote: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-neutral-300 mb-1">Advisory Narrative Description</label>
                    <textarea
                      rows={2}
                      value={sellerForm.description}
                      onChange={(e) => setSellerForm({ ...sellerForm, description: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-neutral-300 mb-1">Editorial Pull Quote</label>
                    <textarea
                      rows={2}
                      value={sellerForm.quote}
                      onChange={(e) => setSellerForm({ ...sellerForm, quote: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100 font-serif italic"
                    />
                  </div>

                  {/* Feature Image with Gallery Picker */}
                  <div className="sm:col-span-2">
                    <ImageInputWithPicker
                      label="Feature Showcase Photo (Portrait/Interior)"
                      value={sellerForm.image}
                      onChange={(url) => setSellerForm({ ...sellerForm, image: url })}
                      helperText="Choose an interior or villa portrait photo from gallery or upload new."
                    />
                  </div>

                  {/* 4 Stats Editor */}
                  <div className="sm:col-span-2 space-y-2 pt-2 border-t border-neutral-800">
                    <label className="block text-neutral-200 font-semibold">4 Seller Performance Metrics</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {(sellerForm.stats || []).map((st, idx) => (
                        <div key={idx} className="p-3 bg-[#141210] rounded-xl border border-neutral-800 space-y-2">
                          <div>
                            <label className="block text-[10px] text-neutral-500 uppercase">Value {idx + 1}</label>
                            <input
                              type="text"
                              value={st.value}
                              onChange={(e) => {
                                const newStats = [...(sellerForm.stats || [])];
                                newStats[idx] = { ...newStats[idx], value: e.target.value };
                                setSellerForm({ ...sellerForm, stats: newStats });
                              }}
                              className="w-full px-2 py-1 bg-[#1F1C18] border border-neutral-700 rounded text-neutral-100 font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-neutral-500 uppercase">Label {idx + 1}</label>
                            <input
                              type="text"
                              value={st.label}
                              onChange={(e) => {
                                const newStats = [...(sellerForm.stats || [])];
                                newStats[idx] = { ...newStats[idx], label: e.target.value };
                                setSellerForm({ ...sellerForm, stats: newStats });
                              }}
                              className="w-full px-2 py-1 bg-[#1F1C18] border border-neutral-700 rounded text-neutral-300 text-[11px]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Primary Button Label</label>
                    <input
                      type="text"
                      value={sellerForm.primaryCtaText}
                      onChange={(e) => setSellerForm({ ...sellerForm, primaryCtaText: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">WhatsApp Button Label</label>
                    <input
                      type="text"
                      value={sellerForm.whatsappCtaText}
                      onChange={(e) => setSellerForm({ ...sellerForm, whatsappCtaText: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-neutral-300 mb-1">Pre-filled WhatsApp Message for Sellers</label>
                    <input
                      type="text"
                      value={sellerForm.whatsappMessage}
                      onChange={(e) => setSellerForm({ ...sellerForm, whatsappMessage: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100 font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800 flex justify-end">
                  <button
                    onClick={() => {
                      updateSellerDesk(sellerForm);
                      showToast('Private Seller Desk saved!');
                    }}
                    className="px-6 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-lg"
                  >
                    <Save className="w-4 h-4" /> Save Seller Desk
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: INVESTORS PAGE */}
          {activeTab === 'investors-page' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#24201C]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">Investors Page Content</h1>
                  <p className="text-xs text-[#8E857C] font-sans mt-1">
                    Edit the main heading, investment growth corridors (Kokapet, Financial District, Shankarpally), and 4 trust points.
                  </p>
                </div>

                <button
                  onClick={() => {
                    updateInvestorsPage(investorsForm);
                    showToast('Investors page saved successfully!');
                  }}
                  className="px-5 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-lg text-xs font-sans font-bold tracking-wider uppercase transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Investors Page
                </button>
              </div>

              {/* SECTION 1: HERO HEADING */}
              <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-4 text-xs shadow-xl">
                <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> 1. Top Banner Headings
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Top Tag (Small text)</label>
                    <input
                      type="text"
                      value={investorsForm.heroTag}
                      onChange={(e) => setInvestorsForm({ ...investorsForm, heroTag: e.target.value })}
                      placeholder="e.g. INVESTOR ADVANTAGE"
                      className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Main Heading</label>
                    <input
                      type="text"
                      value={investorsForm.heroTitle}
                      onChange={(e) => setInvestorsForm({ ...investorsForm, heroTitle: e.target.value })}
                      placeholder="e.g. Today's Investments. Tomorrow's Legacy."
                      className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] font-serif text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Description Paragraph</label>
                    <textarea
                      rows={2}
                      value={investorsForm.heroSubtitle}
                      onChange={(e) => setInvestorsForm({ ...investorsForm, heroSubtitle: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: SIMULATOR HEADERS */}
              <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-4 text-xs shadow-xl">
                <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" /> 2. Calculator Section Headings
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Calculator Tag</label>
                    <input
                      type="text"
                      value={investorsForm.simulatorTag}
                      onChange={(e) => setInvestorsForm({ ...investorsForm, simulatorTag: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Calculator Heading</label>
                    <input
                      type="text"
                      value={investorsForm.simulatorTitle}
                      onChange={(e) => setInvestorsForm({ ...investorsForm, simulatorTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Calculator Note / Subtitle</label>
                    <input
                      type="text"
                      value={investorsForm.simulatorSubtitle}
                      onChange={(e) => setInvestorsForm({ ...investorsForm, simulatorSubtitle: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: INVESTMENT CORRIDORS */}
              <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-5 text-xs shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#24201C]">
                  <div>
                    <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                      <Building2 className="w-4 h-4" /> 3. Investment Corridors & Growth Rates
                    </h2>
                    <p className="text-[11px] text-[#8E857C] mt-0.5">
                      Sets the return percentages and information for each location.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newCorridor: InvestorCorridor = {
                        id: `corridor-${Date.now()}`,
                        name: "New Location",
                        subtitle: "High-growth luxury area.",
                        cagrRate: 0.16,
                        rentalRate: 0.045,
                        cagrLabel: "16.0% YoY",
                        rentalYieldLabel: "4.5% - 5.0%",
                        infraCatalyst: "Upcoming metro and highway connectivity.",
                        highlights: ["Grade-A construction", "High appreciation potential"]
                      };
                      setInvestorsForm({
                        ...investorsForm,
                        corridors: [...(investorsForm.corridors || []), newCorridor]
                      });
                    }}
                    className="px-3 py-1.5 bg-[#171412] hover:bg-[#201C18] text-[#C5A880] rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-[#2E2822] self-start sm:self-auto cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Location
                  </button>
                </div>

                <div className="space-y-4">
                  {(investorsForm.corridors || []).map((corridor, cIdx) => (
                    <div key={corridor.id || cIdx} className="p-4 bg-[#090807] rounded-lg border border-[#24201C] space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#24201C]">
                        <span className="font-medium text-[#FAF7F2] flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-[#1C1815] text-[#C5A880] text-[10px] flex items-center justify-center font-mono border border-[#2E2822]">
                            0{cIdx + 1}
                          </span>
                          {corridor.name}
                        </span>

                        {(investorsForm.corridors || []).length > 1 && (
                          <button
                            onClick={() => {
                              const updated = investorsForm.corridors.filter((_, i) => i !== cIdx);
                              setInvestorsForm({ ...investorsForm, corridors: updated });
                            }}
                            className="text-red-400 hover:text-red-300 p-1 transition-colors cursor-pointer"
                            title="Delete location"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] text-[#8E857C] uppercase font-semibold mb-1">Location Name</label>
                          <input
                            type="text"
                            value={corridor.name}
                            onChange={(e) => {
                              const updated = [...investorsForm.corridors];
                              updated[cIdx] = { ...updated[cIdx], name: e.target.value };
                              setInvestorsForm({ ...investorsForm, corridors: updated });
                            }}
                            className="w-full px-3 py-1.5 bg-[#14110E] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-semibold"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[10px] text-[#8E857C] uppercase font-semibold mb-1">Short Description</label>
                          <input
                            type="text"
                            value={corridor.subtitle}
                            onChange={(e) => {
                              const updated = [...investorsForm.corridors];
                              updated[cIdx] = { ...updated[cIdx], subtitle: e.target.value };
                              setInvestorsForm({ ...investorsForm, corridors: updated });
                            }}
                            className="w-full px-3 py-1.5 bg-[#14110E] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-[#8E857C] uppercase font-semibold mb-1">Yearly Growth % (e.g. 0.188 = 18.8%)</label>
                          <input
                            type="number"
                            step="0.001"
                            value={corridor.cagrRate}
                            onChange={(e) => {
                              const updated = [...investorsForm.corridors];
                              const val = parseFloat(e.target.value) || 0;
                              updated[cIdx] = { 
                                ...updated[cIdx], 
                                cagrRate: val,
                                cagrLabel: `${(val * 100).toFixed(1)}% YoY`
                              };
                              setInvestorsForm({ ...investorsForm, corridors: updated });
                            }}
                            className="w-full px-3 py-1.5 bg-[#14110E] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-[#8E857C] uppercase font-semibold mb-1">Growth Text (Shown to user)</label>
                          <input
                            type="text"
                            value={corridor.cagrLabel}
                            onChange={(e) => {
                              const updated = [...investorsForm.corridors];
                              updated[cIdx] = { ...updated[cIdx], cagrLabel: e.target.value };
                              setInvestorsForm({ ...investorsForm, corridors: updated });
                            }}
                            placeholder="e.g. 18.8% YoY"
                            className="w-full px-3 py-1.5 bg-[#14110E] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs text-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-[#8E857C] uppercase font-semibold mb-1">Rental Yield % (e.g. 0.045 = 4.5%)</label>
                          <input
                            type="number"
                            step="0.001"
                            value={corridor.rentalRate}
                            onChange={(e) => {
                              const updated = [...investorsForm.corridors];
                              updated[cIdx] = { ...updated[cIdx], rentalRate: parseFloat(e.target.value) || 0 };
                              setInvestorsForm({ ...investorsForm, corridors: updated });
                            }}
                            className="w-full px-3 py-1.5 bg-[#14110E] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-[#8E857C] uppercase font-semibold mb-1">Rental Yield Text (Shown to user)</label>
                          <input
                            type="text"
                            value={corridor.rentalYieldLabel}
                            onChange={(e) => {
                              const updated = [...investorsForm.corridors];
                              updated[cIdx] = { ...updated[cIdx], rentalYieldLabel: e.target.value };
                              setInvestorsForm({ ...investorsForm, corridors: updated });
                            }}
                            placeholder="e.g. 4.5% - 5.2%"
                            className="w-full px-3 py-1.5 bg-[#14110E] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs"
                          />
                        </div>

                        <div className="sm:col-span-2 lg:col-span-4">
                          <label className="block text-[10px] text-[#8E857C] uppercase font-semibold mb-1">Key Infrastructure / Nearby Highlights</label>
                          <input
                            type="text"
                            value={corridor.infraCatalyst}
                            onChange={(e) => {
                              const updated = [...investorsForm.corridors];
                              updated[cIdx] = { ...updated[cIdx], infraCatalyst: e.target.value };
                              setInvestorsForm({ ...investorsForm, corridors: updated });
                            }}
                            className="w-full px-3 py-1.5 bg-[#14110E] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs"
                          />
                        </div>

                        <div className="sm:col-span-2 lg:col-span-4">
                          <label className="block text-[10px] text-[#8E857C] uppercase font-semibold mb-1">Bullet Points (1 per line)</label>
                          <textarea
                            rows={3}
                            value={(corridor.highlights || []).join('\n')}
                            onChange={(e) => {
                              const updated = [...investorsForm.corridors];
                              updated[cIdx] = { 
                                ...updated[cIdx], 
                                highlights: e.target.value.split('\n').filter(Boolean) 
                              };
                              setInvestorsForm({ ...investorsForm, corridors: updated });
                            }}
                            placeholder="Bullet 1&#10;Bullet 2&#10;Bullet 3"
                            className="w-full px-3 py-1.5 bg-[#14110E] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 4: 4 TRUST PILLARS */}
              <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-4 text-xs shadow-xl">
                <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                  <Award className="w-4 h-4" /> 4. Four Trust Points / Features
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(investorsForm.pillars || []).map((pillar, pIdx) => (
                    <div key={pillar.id || pIdx} className="p-4 bg-[#090807] rounded-lg border border-[#24201C] space-y-2">
                      <div>
                        <label className="block text-[10px] text-[#8E857C] uppercase font-semibold mb-1">Point #{pIdx + 1} Title</label>
                        <input
                          type="text"
                          value={pillar.title}
                          onChange={(e) => {
                            const updated = [...investorsForm.pillars];
                            updated[pIdx] = { ...updated[pIdx], title: e.target.value };
                            setInvestorsForm({ ...investorsForm, pillars: updated });
                          }}
                          className="w-full px-3 py-1.5 bg-[#14110E] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[#8E857C] uppercase font-semibold mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={pillar.description}
                          onChange={(e) => {
                            const updated = [...investorsForm.pillars];
                            updated[pIdx] = { ...updated[pIdx], description: e.target.value };
                            setInvestorsForm({ ...investorsForm, pillars: updated });
                          }}
                          className="w-full px-3 py-1.5 bg-[#14110E] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#24201C] flex justify-end">
                  <button
                    onClick={() => {
                      updateInvestorsPage(investorsForm);
                      showToast('Investors page saved successfully!');
                    }}
                    className="px-6 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-lg cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Save Investors Page
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* TAB: NRI CONNECT PAGE CMS */}
          {activeTab === 'nri-page' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#24201C]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">NRI Connect Page</h1>
                  <p className="text-xs text-[#8E857C] font-sans mt-1">
                    Manage overseas buyer services, live currency converter rates (USD, AED, GBP, etc.), and the 4-step buying guide.
                  </p>
                </div>

                <button
                  onClick={() => {
                    updateNriPage(nriForm);
                    showToast('NRI Connect page saved successfully!');
                  }}
                  className="px-5 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-lg text-xs font-sans font-bold tracking-wider uppercase transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save NRI Page
                </button>
              </div>

              {/* SECTION 1: HERO HEADING */}
              <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-4 text-xs shadow-xl">
                <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                  <Globe className="w-4 h-4" /> 1. Top Banner Headings
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Top Tag</label>
                    <input
                      type="text"
                      value={nriForm.heroTag}
                      onChange={(e) => setNriForm({ ...nriForm, heroTag: e.target.value })}
                      placeholder="e.g. GLOBAL NRI DESK"
                      className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Main Heading</label>
                    <input
                      type="text"
                      value={nriForm.heroTitle}
                      onChange={(e) => setNriForm({ ...nriForm, heroTitle: e.target.value })}
                      placeholder="e.g. Closer to Home. Always."
                      className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] font-serif text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Description Paragraph</label>
                    <textarea
                      rows={2}
                      value={nriForm.heroSubtitle}
                      onChange={(e) => setNriForm({ ...nriForm, heroSubtitle: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: REMOTE BUYING FEATURE BANNER */}
              <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-4 text-xs shadow-xl">
                <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> 2. Remote Buying Services Banner
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Section Tag</label>
                    <input
                      type="text"
                      value={nriForm.featureTag}
                      onChange={(e) => setNriForm({ ...nriForm, featureTag: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Button Text</label>
                    <input
                      type="text"
                      value={nriForm.featureCtaText}
                      onChange={(e) => setNriForm({ ...nriForm, featureCtaText: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Headline</label>
                    <input
                      type="text"
                      value={nriForm.featureTitle}
                      onChange={(e) => setNriForm({ ...nriForm, featureTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] font-serif text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Description</label>
                    <textarea
                      rows={2}
                      value={nriForm.featureDescription}
                      onChange={(e) => setNriForm({ ...nriForm, featureDescription: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                    />
                  </div>

                  {/* Feature Image with Gallery Picker */}
                  <div className="sm:col-span-2">
                    <ImageInputWithPicker
                      label="Feature Photo (NRI Lifestyle/Executive)"
                      value={nriForm.featureImage}
                      onChange={(url) => setNriForm({ ...nriForm, featureImage: url })}
                      helperText="Pick or upload a high-resolution photo for the remote buying feature."
                    />
                  </div>

                  {/* 4 Bullet Highlights */}
                  <div className="sm:col-span-2 space-y-2 pt-2 border-t border-[#24201C]">
                    <label className="block text-[#FAF7F2] font-medium">4 Key Benefits</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(nriForm.featureBullets || []).map((bullet, bIdx) => (
                        <div key={bIdx}>
                          <label className="block text-[10px] text-[#8E857C] uppercase">Benefit #{bIdx + 1}</label>
                          <input
                            type="text"
                            value={bullet}
                            onChange={(e) => {
                              const updated = [...(nriForm.featureBullets || [])];
                              updated[bIdx] = e.target.value;
                              setNriForm({ ...nriForm, featureBullets: updated });
                            }}
                            className="w-full px-3 py-1.5 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: CURRENCY CONVERTER RATES */}
              <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-4 text-xs shadow-xl">
                <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> 3. Currency Rates (1 Foreign Currency = X Indian Rupees ₹)
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { key: 'USD', name: 'US Dollar ($)' },
                    { key: 'AED', name: 'UAE Dirham (AED)' },
                    { key: 'GBP', name: 'British Pound (£)' },
                    { key: 'EUR', name: 'Euro (€)' },
                    { key: 'SGD', name: 'Singapore Dollar ($)' },
                    { key: 'CAD', name: 'Canadian Dollar ($)' }
                  ].map((curr) => (
                    <div key={curr.key} className="p-3 bg-[#090807] rounded-lg border border-[#24201C] space-y-1">
                      <div className="font-semibold text-[#FAF7F2] text-xs">{curr.key}</div>
                      <div className="text-[9px] text-[#8E857C]">{curr.name}</div>
                      <div className="flex items-center gap-1 pt-1">
                        <span className="text-[#8E857C] text-xs">₹</span>
                        <input
                          type="number"
                          step="0.1"
                          value={nriForm.exchangeRates?.[curr.key] || 80}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 1;
                            setNriForm({
                              ...nriForm,
                              exchangeRates: {
                                ...(nriForm.exchangeRates || {}),
                                [curr.key]: val
                              }
                            });
                          }}
                          className="w-full px-2 py-1 bg-[#14110E] border border-[#26201B] rounded text-[#FAF7F2] text-xs font-mono font-bold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 4: 4-STEP REMOTE ACQUISITION JOURNEY */}
              <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-4 text-xs shadow-xl">
                <div className="flex items-center justify-between pb-2 border-b border-[#24201C]">
                  <div>
                    <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                      <Clock className="w-4 h-4" /> 4. Four-Step Buying Guide for Overseas Buyers
                    </h2>
                    <p className="text-[11px] text-[#8E857C] mt-0.5">
                      The step-by-step process shown on the website.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newStep: NriStep = {
                        id: `step-${Date.now()}`,
                        step: `0${(nriForm.steps || []).length + 1}`,
                        title: "New Process Step",
                        desc: "Step description and details."
                      };
                      setNriForm({
                        ...nriForm,
                        steps: [...(nriForm.steps || []), newStep]
                      });
                    }}
                    className="px-3 py-1.5 bg-[#171412] hover:bg-[#201C18] text-[#C5A880] rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-[#2E2822] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Step
                  </button>
                </div>

                <div className="space-y-4">
                  {(nriForm.steps || []).map((st, idx) => (
                    <div key={st.id || idx} className="p-4 bg-[#090807] rounded-lg border border-[#24201C] space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#24201C]">
                        <span className="font-medium text-[#FAF7F2] flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-[#1C1815] text-[#C5A880] text-[10px] flex items-center justify-center font-mono border border-[#2E2822]">
                            {st.step || `0${idx + 1}`}
                          </span>
                          {st.title}
                        </span>

                        {(nriForm.steps || []).length > 1 && (
                          <button
                            onClick={() => {
                              const updated = nriForm.steps.filter((_, i) => i !== idx);
                              setNriForm({ ...nriForm, steps: updated });
                            }}
                            className="text-red-400 hover:text-red-300 p-1 transition-colors cursor-pointer"
                            title="Delete step"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[10px] text-[#8E857C] uppercase font-semibold mb-1">Step Number</label>
                          <input
                            type="text"
                            value={st.step}
                            onChange={(e) => {
                              const updated = [...nriForm.steps];
                              updated[idx] = { ...updated[idx], step: e.target.value };
                              setNriForm({ ...nriForm, steps: updated });
                            }}
                            placeholder="01"
                            className="w-full px-3 py-1.5 bg-[#14110E] border border-[#26201B] rounded-lg text-[#FAF7F2] font-mono text-xs font-bold"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block text-[10px] text-[#8E857C] uppercase font-semibold mb-1">Step Title</label>
                          <input
                            type="text"
                            value={st.title}
                            onChange={(e) => {
                              const updated = [...nriForm.steps];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setNriForm({ ...nriForm, steps: updated });
                            }}
                            className="w-full px-3 py-1.5 bg-[#14110E] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-semibold"
                          />
                        </div>

                        <div className="sm:col-span-4">
                          <label className="block text-[10px] text-[#8E857C] uppercase font-semibold mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={st.desc}
                            onChange={(e) => {
                              const updated = [...nriForm.steps];
                              updated[idx] = { ...updated[idx], desc: e.target.value };
                              setNriForm({ ...nriForm, steps: updated });
                            }}
                            className="w-full px-3 py-1.5 bg-[#14110E] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 5: TIMEZONE SUPPORT BOX */}
              <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-4 text-xs shadow-xl">
                <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                  <Phone className="w-4 h-4" /> 5. Consultation & Advisory Callout Box
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Top Tag</label>
                    <input
                      type="text"
                      value={nriForm.timezoneTag}
                      onChange={(e) => setNriForm({ ...nriForm, timezoneTag: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Button Text</label>
                    <input
                      type="text"
                      value={nriForm.timezoneCtaText}
                      onChange={(e) => setNriForm({ ...nriForm, timezoneCtaText: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Headline</label>
                    <input
                      type="text"
                      value={nriForm.timezoneTitle}
                      onChange={(e) => setNriForm({ ...nriForm, timezoneTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] font-serif text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#FAF7F2] mb-1 font-medium">Description</label>
                    <textarea
                      rows={2}
                      value={nriForm.timezoneDescription}
                      onChange={(e) => setNriForm({ ...nriForm, timezoneDescription: e.target.value })}
                      className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#24201C] flex justify-end">
                  <button
                    onClick={() => {
                      updateNriPage(nriForm);
                      showToast('NRI Connect page saved successfully!');
                    }}
                    className="px-6 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-lg cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Save NRI Page
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ABOUT US PAGE CMS */}
          {activeTab === 'about-page' && (
            <div className="space-y-6 max-w-4xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#24201C]">
                    <div>
                      <h1 className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">About Us Page</h1>
                      <p className="text-xs text-[#8E857C] font-sans mt-1">
                        Manage company story, philosophy quote, key numbers/milestones, and the 4 pillars of excellence.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        updateAboutPage(aboutForm);
                        showToast('About Us page saved successfully!');
                      }}
                      className="px-5 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-lg text-xs font-sans font-bold tracking-wider uppercase transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <Save className="w-4 h-4" /> Save About Page
                    </button>
                  </div>

                  {/* SECTION 1: HERO & HEADER */}
                  <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-4 text-xs shadow-xl">
                    <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                      <Award className="w-4 h-4" /> 1. Top Banner Headings
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#FAF7F2] mb-1 font-medium">Top Tag</label>
                        <input
                          type="text"
                          value={aboutForm.heroTag}
                          onChange={(e) => setAboutForm({ ...aboutForm, heroTag: e.target.value })}
                          placeholder="e.g. OUR STORY & PHILOSOPHY"
                          className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#FAF7F2] mb-1 font-medium">Main Heading</label>
                        <input
                          type="text"
                          value={aboutForm.heroTitle}
                          onChange={(e) => setAboutForm({ ...aboutForm, heroTitle: e.target.value })}
                          placeholder="e.g. Built on Values. Driven by Relationships."
                          className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] font-serif text-sm"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[#FAF7F2] mb-1 font-medium">Description Paragraph</label>
                        <textarea
                          rows={2}
                          value={aboutForm.heroSubtitle}
                          onChange={(e) => setAboutForm({ ...aboutForm, heroSubtitle: e.target.value })}
                          className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: MILESTONE STATS */}
                  <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-4 text-xs shadow-xl">
                    <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" /> 2. Key Numbers & Achievements
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {(stats || []).map((stat, sIdx) => (
                        <div key={sIdx} className="p-3 bg-[#090807] rounded-lg border border-[#24201C] space-y-2">
                          <div>
                            <label className="block text-[10px] text-[#8E857C] uppercase font-semibold">Number / Metric</label>
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => {
                                const updated = [...stats];
                                updated[sIdx] = { ...updated[sIdx], value: e.target.value };
                                updateStats(updated);
                              }}
                              className="w-full px-2 py-1 bg-[#14110E] border border-[#26201B] rounded text-[#C5A880] font-serif text-sm font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-[#8E857C] uppercase font-semibold">Label</label>
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => {
                                const updated = [...stats];
                                updated[sIdx] = { ...updated[sIdx], label: e.target.value };
                                updateStats(updated);
                              }}
                              className="w-full px-2 py-1 bg-[#14110E] border border-[#26201B] rounded text-[#FAF7F2] text-xs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 3: PHILOSOPHY & STORY */}
                  <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-4 text-xs shadow-xl">
                    <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                      <Compass className="w-4 h-4" /> 3. Company Story & Philosophy Spotlight
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-[#FAF7F2] mb-1 font-medium">Tag</label>
                        <input
                          type="text"
                          value={aboutForm.philosophyTag}
                          onChange={(e) => setAboutForm({ ...aboutForm, philosophyTag: e.target.value })}
                          className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[#FAF7F2] mb-1 font-medium">Main Quote / Headline</label>
                        <textarea
                          rows={2}
                          value={aboutForm.philosophyHeadline}
                          onChange={(e) => setAboutForm({ ...aboutForm, philosophyHeadline: e.target.value })}
                          className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] font-serif text-sm"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[#FAF7F2] mb-1 font-medium">Story Text (Separate paragraphs with blank lines)</label>
                        <textarea
                          rows={4}
                          value={(aboutForm.philosophyParagraphs || []).join('\n\n')}
                          onChange={(e) => setAboutForm({ 
                            ...aboutForm, 
                            philosophyParagraphs: e.target.value.split('\n\n').filter(Boolean) 
                          })}
                          className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs leading-relaxed"
                        />
                      </div>

                      {/* Showcase Photo */}
                      <div className="sm:col-span-2">
                        <ImageInputWithPicker
                          label="Showcase Photo"
                          value={aboutForm.philosophyImage}
                          onChange={(url) => setAboutForm({ ...aboutForm, philosophyImage: url })}
                          helperText="Image for the company philosophy section."
                        />
                      </div>

                      <div>
                        <label className="block text-[#FAF7F2] mb-1 font-medium">Signoff Name / Authority</label>
                        <input
                          type="text"
                          value={aboutForm.advisoryName}
                          onChange={(e) => setAboutForm({ ...aboutForm, advisoryName: e.target.value })}
                          className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[#FAF7F2] mb-1 font-medium">Signoff Designation / Role</label>
                        <input
                          type="text"
                          value={aboutForm.advisoryDesk}
                          onChange={(e) => setAboutForm({ ...aboutForm, advisoryDesk: e.target.value })}
                          className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4: FOUNDER & LEADERSHIP SPOTLIGHT */}
                  <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-4 text-xs shadow-xl">
                    <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                      <Award className="w-4 h-4" /> 4. Founder & Leadership Spotlight
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#FAF7F2] mb-1 font-medium">Founder Full Name</label>
                        <input
                          type="text"
                          value={aboutForm.founderName || ''}
                          onChange={(e) => setAboutForm({ ...aboutForm, founderName: e.target.value })}
                          placeholder="e.g. Kamal Yellapragada"
                          className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] font-serif text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[#FAF7F2] mb-1 font-medium">Designation / Official Title</label>
                        <input
                          type="text"
                          value={aboutForm.founderTitle || ''}
                          onChange={(e) => setAboutForm({ ...aboutForm, founderTitle: e.target.value })}
                          placeholder="e.g. FOUNDER & MANAGING DIRECTOR"
                          className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] font-sans uppercase tracking-wider"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[#FAF7F2] mb-1 font-medium">Credentials & Expertise Tagline</label>
                        <input
                          type="text"
                          value={aboutForm.founderSubtitle || ''}
                          onChange={(e) => setAboutForm({ ...aboutForm, founderSubtitle: e.target.value })}
                          placeholder="e.g. Property Expert & NRI Portfolio Manager · Business Coach"
                          className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                        />
                      </div>

                      {/* Founder Portrait Photo */}
                      <div className="sm:col-span-2">
                        <ImageInputWithPicker
                          label="Founder Executive Portrait Photo"
                          value={aboutForm.founderImage || ''}
                          onChange={(url) => setAboutForm({ ...aboutForm, founderImage: url })}
                          helperText="High-resolution portrait photo for the Founder spotlight (recommended aspect ratio: 4:5)."
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[#FAF7F2] mb-1 font-medium">Founder Philosophy Quote</label>
                        <textarea
                          rows={2}
                          value={aboutForm.founderQuote || ''}
                          onChange={(e) => setAboutForm({ ...aboutForm, founderQuote: e.target.value })}
                          placeholder="“Real estate is not just about properties—it's about people, possibilities, and where your next chapter begins. Life Starts Here.”"
                          className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] font-serif text-sm"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[#FAF7F2] mb-1 font-medium">Founder Narrative (Separate paragraphs with blank lines)</label>
                        <textarea
                          rows={4}
                          value={(aboutForm.founderParagraphs || []).join('\n\n')}
                          onChange={(e) => setAboutForm({ 
                            ...aboutForm, 
                            founderParagraphs: e.target.value.split('\n\n').filter(Boolean) 
                          })}
                          placeholder="Detail the founding mission, fiduciary philosophy, and commitment to investors..."
                          className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs leading-relaxed"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[#FAF7F2] mb-1 font-medium">Founder Desk & Signature Location Tag</label>
                        <input
                          type="text"
                          value={aboutForm.founderDesk || ''}
                          onChange={(e) => setAboutForm({ ...aboutForm, founderDesk: e.target.value })}
                          placeholder="e.g. FOUNDER'S DESK · HYDERABAD & DUBAI"
                          className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] uppercase tracking-widest text-[11px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 5: 4 PILLARS OF EXCELLENCE */}
                  <div className="bg-[#14110E] border border-[#24201C] rounded-xl p-6 space-y-4 text-xs shadow-xl">
                    <h2 className="text-xs font-mono font-semibold tracking-[0.2em] text-[#C5A880] uppercase flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> 5. Four Core Pillars
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(aboutForm.pillars || []).map((pillar, pIdx) => (
                        <div key={pillar.id || pIdx} className="p-4 bg-[#090807] rounded-lg border border-[#24201C] space-y-2">
                          <div>
                            <label className="block text-[10px] text-[#8E857C] uppercase font-semibold mb-1">Pillar #{pIdx + 1} Title</label>
                            <input
                              type="text"
                              value={pillar.title}
                              onChange={(e) => {
                                const updated = [...aboutForm.pillars];
                                updated[pIdx] = { ...updated[pIdx], title: e.target.value };
                                setAboutForm({ ...aboutForm, pillars: updated });
                              }}
                              className="w-full px-3 py-1.5 bg-[#14110E] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-[#8E857C] uppercase font-semibold mb-1">Description</label>
                            <textarea
                              rows={2}
                              value={pillar.desc}
                              onChange={(e) => {
                                const updated = [...aboutForm.pillars];
                                updated[pIdx] = { ...updated[pIdx], desc: e.target.value };
                                setAboutForm({ ...aboutForm, pillars: updated });
                              }}
                              className="w-full px-3 py-1.5 bg-[#14110E] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-[#24201C] flex justify-end">
                      <button
                        onClick={() => {
                          updateAboutPage(aboutForm);
                          showToast('About Us page saved successfully!');
                        }}
                        className="px-6 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-lg cursor-pointer"
                      >
                        <Save className="w-4 h-4" /> Save About Page
                      </button>
                    </div>
                  </div>
                </div>
              )}

          {/* TAB: CUSTOM PAGES & MODULAR SECTIONS BUILDER */}
          {activeTab === 'custom-pages' && (
            <CustomPagesManager showToast={showToast} />
          )}

          {/* TAB 5: MARKET NEWS */}
          {activeTab === 'news' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">Market News & Insights</h1>
                  <p className="text-xs text-neutral-400 font-sans mt-1">
                    Publish updates on Hyderabad luxury trends, Dubai NRI wealth, and infrastructure milestones.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingArticle({
                      id: `article-${Date.now()}`,
                      title: '',
                      category: 'Market Intelligence',
                      tag: 'MARKET TRENDS',
                      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                      readTime: '4 min read',
                      excerpt: '',
                      content: [''],
                      keyHighlights: ['Strong investment potential'],
                      author: {
                        name: 'Arwin Advisory Desk',
                        role: 'Private Wealth Research'
                      },
                      image: '/images/hero-slide-3.jpg'
                    });
                    setIsAddingArticle(true);
                  }}
                  className="px-4 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-xl text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Article
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {newsArticles.map(article => (
                  <div key={article.id} className="bg-[#1F1C18] border border-neutral-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[#C5A880]">
                        <span className="font-bold uppercase tracking-wider">{article.category}</span>
                        <span>{article.date} &bull; {article.readTime}</span>
                      </div>
                      <h3 className="text-base font-serif text-[#FAF7F2] font-semibold">{article.title}</h3>
                      <p className="text-xs text-neutral-400 line-clamp-2">{article.excerpt}</p>
                    </div>

                    <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingArticle(article);
                          setIsAddingArticle(false);
                        }}
                        className="p-2 bg-neutral-800 hover:bg-[#771722] text-neutral-300 hover:text-white rounded-lg transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete article "${article.title}"?`)) {
                            deleteNewsArticle(article.id);
                            showToast('Deleted article');
                          }
                        }}
                        className="p-2 bg-neutral-800 hover:bg-red-900 text-neutral-400 hover:text-white rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDIT ARTICLE MODAL WITH IMAGE PICKER */}
          {editingArticle && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#1F1C18] border border-neutral-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h2 className="text-base font-serif text-[#FAF7F2]">
                    {isAddingArticle ? 'Add News Article' : `Edit: ${editingArticle.title}`}
                  </h2>
                  <button onClick={() => setEditingArticle(null)}><X className="w-4 h-4 text-neutral-400" /></button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-neutral-300 mb-1">Title</label>
                    <input
                      type="text"
                      value={editingArticle.title}
                      onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-neutral-300 mb-1">Category</label>
                      <input
                        type="text"
                        value={editingArticle.category}
                        onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                        className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-300 mb-1">Read Time (e.g. 5 min read)</label>
                      <input
                        type="text"
                        value={editingArticle.readTime}
                        onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                        className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Excerpt</label>
                    <textarea
                      rows={2}
                      value={editingArticle.excerpt}
                      onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  {/* Article Image Picker */}
                  <ImageInputWithPicker
                    label="Article Cover Photo"
                    value={editingArticle.image}
                    onChange={(url) => setEditingArticle({ ...editingArticle, image: url })}
                  />

                  <div>
                    <label className="block text-neutral-300 mb-1">Full Article Content (paragraphs separated by blank lines)</label>
                    <textarea
                      rows={6}
                      value={Array.isArray(editingArticle.content) ? editingArticle.content.join('\n\n') : (editingArticle.content || '')}
                      onChange={(e) => setEditingArticle({
                        ...editingArticle,
                        content: e.target.value.split('\n\n').map(p => p.trim()).filter(Boolean)
                      })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100 font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                  <button onClick={() => setEditingArticle(null)} className="px-4 py-2 bg-neutral-800 rounded-xl">Cancel</button>
                  <button
                    onClick={() => {
                      if (isAddingArticle) {
                        addNewsArticle(editingArticle);
                        showToast('Article published');
                      } else {
                        updateNewsArticle(editingArticle.id, editingArticle);
                        showToast('Article updated');
                      }
                      setEditingArticle(null);
                    }}
                    className="px-4 py-2 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-xl font-bold uppercase"
                  >
                    Save Article
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">Client Reviews & Testimonials</h1>
                  <p className="text-xs text-neutral-400 font-sans mt-1">
                    Manage client endorsements, purchase details, and investor reviews.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingTestimonial({
                      id: `test-${Date.now()}`,
                      category: 'highrise',
                      quote: '',
                      clientName: '',
                      designation: 'Managing Director',
                      location: 'Hyderabad',
                      propertyPurchased: '4 BHK Ultra Luxury Sky Villa',
                      rating: 5
                    });
                    setIsAddingTestimonial(true);
                  }}
                  className="px-4 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-xl text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Review
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map(t => (
                  <div key={t.id} className="bg-[#1F1C18] border border-neutral-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-amber-400 text-xs">
                        {'★'.repeat(t.rating)}
                      </div>
                      <p className="text-xs text-neutral-300 italic font-serif">"{t.quote}"</p>
                      <div className="pt-2 text-xs">
                        <div className="font-semibold text-[#FAF7F2]">{t.clientName}</div>
                        <div className="text-[11px] text-neutral-400">{t.designation} &bull; {t.location}</div>
                        <div className="text-[11px] text-[#C5A880] mt-0.5">{t.propertyPurchased}</div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingTestimonial(t);
                          setIsAddingTestimonial(false);
                        }}
                        className="p-2 bg-neutral-800 hover:bg-[#771722] text-neutral-300 hover:text-white rounded-lg transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this testimonial?')) {
                            deleteTestimonial(t.id);
                            showToast('Deleted testimonial');
                          }
                        }}
                        className="p-2 bg-neutral-800 hover:bg-red-900 text-neutral-400 hover:text-white rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDIT TESTIMONIAL MODAL */}
          {editingTestimonial && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#1F1C18] border border-neutral-700 rounded-2xl max-w-lg w-full p-6 space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h2 className="text-base font-serif text-[#FAF7F2]">
                    {isAddingTestimonial ? 'Add Review' : 'Edit Review'}
                  </h2>
                  <button onClick={() => setEditingTestimonial(null)}><X className="w-4 h-4 text-neutral-400" /></button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-neutral-300 mb-1">Client Name</label>
                    <input
                      type="text"
                      value={editingTestimonial.clientName}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientName: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-neutral-300 mb-1">Designation / Role</label>
                      <input
                        type="text"
                        value={editingTestimonial.designation}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, designation: e.target.value })}
                        className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-300 mb-1">Location</label>
                      <input
                        type="text"
                        value={editingTestimonial.location}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, location: e.target.value })}
                        className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Property Acquired</label>
                    <input
                      type="text"
                      value={editingTestimonial.propertyPurchased}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, propertyPurchased: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Client Quote</label>
                    <textarea
                      rows={3}
                      value={editingTestimonial.quote}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                  <button onClick={() => setEditingTestimonial(null)} className="px-4 py-2 bg-neutral-800 rounded-xl">Cancel</button>
                  <button
                    onClick={() => {
                      if (isAddingTestimonial) {
                        addTestimonial(editingTestimonial);
                        showToast('Review added');
                      } else {
                        updateTestimonial(editingTestimonial.id, editingTestimonial);
                        showToast('Review updated');
                      }
                      setEditingTestimonial(null);
                    }}
                    className="px-4 py-2 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-xl font-bold uppercase"
                  >
                    Save Review
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: LEADS INBOX */}
          {activeTab === 'leads' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#24201C]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">Customer Leads & Property Inquiries</h1>
                  <p className="text-xs text-[#8E857C] font-sans mt-1">
                    Manage incoming property seller listings, private viewing passes, NRI wealth consults, and investor dossiers.
                  </p>
                </div>

                <button
                  onClick={exportLeadsCsv}
                  disabled={leads.length === 0}
                  className="px-4 py-2.5 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/60 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4" /> Export CSV
                </button>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {[
                  { id: 'all', label: 'All Inquiries', count: leads.length },
                  { id: 'seller', label: '🏷️ Posted Properties to Sell', count: leads.filter(l => l.formType === 'List Luxury Property').length },
                  { id: 'vip', label: 'VIP Tour Passes', count: leads.filter(l => l.formType === 'Private Preview VIP Pass').length },
                  { id: 'nri', label: 'NRI Advisory', count: leads.filter(l => l.formType === 'NRI Wealth Advisory').length },
                  { id: 'investor', label: 'Investor ROI', count: leads.filter(l => l.formType === 'Investor ROI Dossier').length }
                ].map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => setLeadTypeFilter(chip.id as any)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                      leadTypeFilter === chip.id
                        ? 'bg-[#771722] text-white shadow-md shadow-[#771722]/30'
                        : 'bg-[#14110E] hover:bg-[#1C1815] text-[#8E857C] hover:text-[#FAF7F2] border border-[#24201C]'
                    }`}
                  >
                    <span>{chip.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      leadTypeFilter === chip.id
                        ? 'bg-black/30 text-[#FAF7F2]'
                        : 'bg-[#1F1C18] text-[#C5A880]'
                    }`}>
                      {chip.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#7A7167] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    placeholder="Search by client name, property title, phone, email, location..."
                    className="w-full pl-10 pr-4 py-2 bg-[#090807] border border-[#24201C] rounded-lg text-xs text-[#FAF7F2] placeholder-[#706860] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-[#090807] border border-[#24201C] rounded-lg text-xs text-[#FAF7F2] focus:outline-none cursor-pointer"
                >
                  <option value="all">All Statuses ({leads.length})</option>
                  <option value="new">New ({leads.filter(l => l.status === 'new').length})</option>
                  <option value="contacted">Contacted ({leads.filter(l => l.status === 'contacted').length})</option>
                  <option value="qualified">Qualified ({leads.filter(l => l.status === 'qualified').length})</option>
                  <option value="closed">Closed ({leads.filter(l => l.status === 'closed').length})</option>
                </select>
              </div>

              {/* Leads Table */}
              <div className="bg-[#14110E] border border-[#24201C] rounded-xl overflow-hidden shadow-xl">
                {leads.length === 0 ? (
                  <div className="text-center py-12 text-xs text-[#7A7167] space-y-2">
                    <Inbox className="w-8 h-8 mx-auto text-[#706860] mb-2 opacity-60" />
                    <div className="text-[#FAF7F2] font-medium">No leads received yet.</div>
                    <div className="text-[11px] text-[#7A7167]">Submissions from public website forms and property seller forms will appear here automatically.</div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#090807] border-b border-[#24201C] text-[#8E857C] uppercase tracking-wider text-[10px] font-mono">
                        <tr>
                          <th className="py-3.5 px-4">Client / Seller</th>
                          <th className="py-3.5 px-4">Inquiry Category</th>
                          <th className="py-3.5 px-4">Contact Info</th>
                          <th className="py-3.5 px-4">Property / Location</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4">Received</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#24201C]">
                        {leads
                          .filter(l => {
                            // Category filter
                            if (leadTypeFilter === 'seller' && l.formType !== 'List Luxury Property') return false;
                            if (leadTypeFilter === 'vip' && l.formType !== 'Private Preview VIP Pass') return false;
                            if (leadTypeFilter === 'nri' && l.formType !== 'NRI Wealth Advisory') return false;
                            if (leadTypeFilter === 'investor' && l.formType !== 'Investor ROI Dossier') return false;

                            // Text search
                            const matchSearch =
                              l.clientName.toLowerCase().includes(leadSearch.toLowerCase()) ||
                              l.phone.toLowerCase().includes(leadSearch.toLowerCase()) ||
                              l.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
                              (l.project || '').toLowerCase().includes(leadSearch.toLowerCase()) ||
                              (l.message || '').toLowerCase().includes(leadSearch.toLowerCase());
                            
                            // Status filter
                            const matchStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;
                            return matchSearch && matchStatus;
                          })
                          .map(lead => {
                            const isSellerLead = lead.formType === 'List Luxury Property';
                            return (
                              <tr key={lead.id} className="hover:bg-[#1A1613] transition-colors">
                                <td className="py-3.5 px-4">
                                  <div className="font-semibold text-[#FAF7F2]">{lead.clientName}</div>
                                  {isSellerLead && (
                                    <div className="text-[10px] text-[#C5A880] font-medium">Property Owner</div>
                                  )}
                                </td>
                                <td className="py-3.5 px-4">
                                  {isSellerLead ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30">
                                      🏷️ Sell Property
                                    </span>
                                  ) : (
                                    <span className="text-[#C5A880]">{lead.formType}</span>
                                  )}
                                </td>
                                <td className="py-3.5 px-4">
                                  <div className="text-[#FAF7F2] font-mono">{lead.phone}</div>
                                  {lead.email && <div className="text-[11px] text-[#7A7167]">{lead.email}</div>}
                                </td>
                                <td className="py-3.5 px-4 text-[#D8D0C5]">
                                  {lead.project || lead.collection || lead.tier || 'General Portfolio'}
                                  {lead.budget && (
                                    <div className="text-[10px] text-[#C5A880] font-semibold mt-0.5">
                                      {isSellerLead ? `Expected: ${lead.budget}` : `Budget: ${lead.budget}`}
                                    </div>
                                  )}
                                </td>
                                <td className="py-3.5 px-4">
                                  <select
                                    value={lead.status}
                                    onChange={(e) => {
                                      updateLeadStatus(lead.id, e.target.value as any);
                                      showToast('Status updated');
                                    }}
                                    className={`text-[10.5px] font-bold px-2 py-1 rounded border uppercase cursor-pointer ${
                                      lead.status === 'new'
                                        ? 'bg-amber-950/40 text-amber-300 border-amber-800/40'
                                        : lead.status === 'contacted'
                                        ? 'bg-blue-950/40 text-blue-300 border-blue-800/40'
                                        : lead.status === 'qualified'
                                        ? 'bg-purple-950/40 text-purple-300 border-purple-800/40'
                                        : 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40'
                                    }`}
                                  >
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="qualified">Qualified</option>
                                    <option value="closed">Closed</option>
                                  </select>
                                </td>
                                <td className="py-3.5 px-4 text-[11px] text-[#7A7167]">{lead.timestamp}</td>
                                <td className="py-3.5 px-4 text-right">
                                  <button
                                    onClick={() => setSelectedLead(lead)}
                                    className="p-1.5 bg-[#1C1815] hover:bg-[#771722] text-neutral-300 hover:text-white rounded-lg transition-colors mr-1.5 cursor-pointer border border-[#2E2822]"
                                    title="View Full Details"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (window.confirm('Delete this lead inquiry?')) {
                                        deleteLead(lead.id);
                                        showToast('Lead deleted');
                                      }
                                    }}
                                    className="p-1.5 bg-[#1C1815] hover:bg-red-900 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer border border-[#2E2822]"
                                    title="Delete Lead"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* LEAD DETAIL VIEW MODAL */}
          {selectedLead && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#14110E] border border-[#2E2822] rounded-2xl max-w-lg w-full p-6 space-y-5 text-xs shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-[#24201C]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#C5A880] tracking-wider font-mono">
                      {selectedLead.formType === 'List Luxury Property' ? '🏷️ Luxury Property Sale Listing' : 'Client Inquiry Record'}
                    </span>
                    <h2 className="text-base font-serif text-[#FAF7F2] font-semibold">{selectedLead.clientName}</h2>
                  </div>
                  <button onClick={() => setSelectedLead(null)} className="cursor-pointer p-1 text-neutral-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Seller-Specific Property Details Box */}
                {selectedLead.formType === 'List Luxury Property' && (
                  <div className="bg-[#1C1713] p-4 rounded-xl border border-[#C5A880]/30 space-y-2">
                    <div className="text-[10px] uppercase font-bold text-[#C5A880] tracking-wider">
                      Property Specifications
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div>
                        <span className="text-[#8E857C] block text-[10px]">Property Title:</span>
                        <span className="text-[#FAF7F2] font-semibold">{selectedLead.additionalData?.propertyTitle || selectedLead.project || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-[#8E857C] block text-[10px]">Location:</span>
                        <span className="text-[#FAF7F2] font-semibold">{selectedLead.additionalData?.location || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-[#8E857C] block text-[10px]">Property Type:</span>
                        <span className="text-[#FAF7F2]">{selectedLead.additionalData?.propertyType || selectedLead.collection || 'Sky Mansion'}</span>
                      </div>
                      <div>
                        <span className="text-[#8E857C] block text-[10px]">Size (Sq. Ft.):</span>
                        <span className="text-[#FAF7F2] font-mono">{selectedLead.additionalData?.sizeSft ? `${selectedLead.additionalData.sizeSft} sq.ft` : 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-[#8E857C] block text-[10px]">Expected Price:</span>
                        <span className="text-[#C5A880] font-bold font-serif text-sm">
                          {selectedLead.additionalData?.expectedPriceCr ? `₹ ${selectedLead.additionalData.expectedPriceCr} Cr` : (selectedLead.budget || 'N/A')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#8E857C] block text-[10px]">Photos Attached:</span>
                        <span className="text-[#FAF7F2]">{selectedLead.additionalData?.attachedFilesCount || 0} File(s)</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3 bg-[#090807] p-4 rounded-xl border border-[#24201C]">
                  <div className="flex justify-between">
                    <span className="text-[#8E857C]">Form Type:</span>
                    <span className="text-[#C5A880] font-semibold">{selectedLead.formType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8E857C]">Phone:</span>
                    <span className="text-[#FAF7F2] font-mono">{selectedLead.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8E857C]">Email:</span>
                    <span className="text-[#FAF7F2]">{selectedLead.email || 'N/A'}</span>
                  </div>
                  {selectedLead.project && (
                    <div className="flex justify-between">
                      <span className="text-[#8E857C]">Project / Asset:</span>
                      <span className="text-[#FAF7F2]">{selectedLead.project}</span>
                    </div>
                  )}
                  {selectedLead.budget && (
                    <div className="flex justify-between">
                      <span className="text-[#8E857C]">Budget / Valuation:</span>
                      <span className="text-[#C5A880] font-bold">{selectedLead.budget}</span>
                    </div>
                  )}
                  {selectedLead.date && (
                    <div className="flex justify-between">
                      <span className="text-[#8E857C]">Preferred Date/Slot:</span>
                      <span className="text-[#FAF7F2]">{selectedLead.date} {selectedLead.timeSlot}</span>
                    </div>
                  )}
                  {selectedLead.message && (
                    <div className="pt-2 border-t border-[#24201C]">
                      <span className="text-[#8E857C] block mb-1">Client Message / Notes:</span>
                      <p className="text-[#FAF7F2] bg-[#14110E] p-2.5 rounded-lg border border-[#26201B]">{selectedLead.message}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[#FAF7F2] mb-1 font-medium">Advisory Internal Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Add internal notes regarding this client conversation..."
                    value={selectedLead.notes || ''}
                    onChange={(e) => {
                      const updatedNotes = e.target.value;
                      setSelectedLead({ ...selectedLead, notes: updatedNotes });
                      updateLeadStatus(selectedLead.id, selectedLead.status, updatedNotes);
                    }}
                    className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2]"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedLead.clientName)},%20this%20is%20ARWIN%20RISE%20Private%20Property%20Advisory.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-black font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
                  >
                    <Phone className="w-3.5 h-3.5" /> WhatsApp Client
                  </a>

                  <button
                    onClick={() => setSelectedLead(null)}
                    className="px-5 py-2 bg-[#1C1815] hover:bg-[#25201C] text-neutral-200 rounded-lg cursor-pointer text-xs border border-[#2E2822]"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SEO & SEARCH VISIBILITY */}
          {activeTab === 'seo' && (() => {
            // Computed SEO Health Audit Checks
            const titleLength = (seoForm.siteTitle || '').length;
            const descLength = (seoForm.siteDescription || '').length;
            const hasKeywords = Boolean(seoForm.siteKeywords && seoForm.siteKeywords.trim().length > 0);
            const hasOgImage = Boolean(seoForm.ogDefaultImage && seoForm.ogDefaultImage.trim().length > 0);
            const isSchemaActive = Boolean(seoForm.schemaEnabled && seoForm.streetAddress && seoForm.addressLocality);
            const isIndexingAllowed = Boolean(seoForm.allowIndexing && seoForm.allowFollow);
            const hasCanonical = Boolean(seoForm.canonicalBaseUrl && seoForm.canonicalBaseUrl.startsWith('http'));
            const hasGsc = Boolean(seoForm.googleSearchConsoleTag && seoForm.googleSearchConsoleTag.trim().length > 0);
            const hasAnalytics = Boolean(seoForm.ga4MeasurementId || seoForm.gtmContainerId || seoForm.facebookPixelId);

            const checks = [
              { label: 'Site Meta Title Configured (Optimal 10-60 chars)', pass: titleLength >= 10 && titleLength <= 70, weight: 15, current: `${titleLength} chars` },
              { label: 'Meta Description Configured (Optimal 120-160 chars)', pass: descLength >= 80 && descLength <= 200, weight: 15, current: `${descLength} chars` },
              { label: 'Focus Keyphrases & Tags Specified', pass: hasKeywords, weight: 10, current: hasKeywords ? 'Configured' : 'Missing' },
              { label: 'Open Graph & Social Share Image Set', pass: hasOgImage, weight: 15, current: hasOgImage ? 'Set' : 'Default' },
              { label: 'Schema.org RealEstateAgent JSON-LD Active', pass: isSchemaActive, weight: 15, current: isSchemaActive ? 'Active' : 'Disabled' },
              { label: 'Canonical Base URL Configured', pass: hasCanonical, weight: 10, current: seoForm.canonicalBaseUrl || 'Not set' },
              { label: 'Search Engine Directives (Index/Follow)', pass: isIndexingAllowed, weight: 10, current: isIndexingAllowed ? 'Index/Follow' : 'Restricted' },
              { label: 'Google Search Console Verification Tag', pass: hasGsc, weight: 10, current: hasGsc ? 'Verified' : 'Pending' },
              { label: 'Web Analytics & Tracking Connected', pass: hasAnalytics, weight: 10, current: hasAnalytics ? 'Connected' : 'Pending' }
            ];

            const overallScore = checks.reduce((acc, c) => acc + (c.pass ? c.weight : 0), 0);

            const sitemapUrls = [
              { loc: `${(seoForm.canonicalBaseUrl || 'https://arwinrise.com').replace(/\/+$/, '')}/`, priority: '1.0', changefreq: 'daily', title: 'Home Page' },
              { loc: `${(seoForm.canonicalBaseUrl || 'https://arwinrise.com').replace(/\/+$/, '')}/#about`, priority: '0.8', changefreq: 'weekly', title: 'About Us' },
              { loc: `${(seoForm.canonicalBaseUrl || 'https://arwinrise.com').replace(/\/+$/, '')}/#residences`, priority: '0.9', changefreq: 'daily', title: 'Curated Residences' },
              { loc: `${(seoForm.canonicalBaseUrl || 'https://arwinrise.com').replace(/\/+$/, '')}/#investors`, priority: '0.8', changefreq: 'weekly', title: 'Investor Advantage' },
              { loc: `${(seoForm.canonicalBaseUrl || 'https://arwinrise.com').replace(/\/+$/, '')}/#nri-connect`, priority: '0.8', changefreq: 'weekly', title: 'NRI Connect' },
              { loc: `${(seoForm.canonicalBaseUrl || 'https://arwinrise.com').replace(/\/+$/, '')}/#contact`, priority: '0.7', changefreq: 'monthly', title: 'Private Client Concierge' },
              { loc: `${(seoForm.canonicalBaseUrl || 'https://arwinrise.com').replace(/\/+$/, '')}/#insights`, priority: '0.8', changefreq: 'weekly', title: 'Market Intelligence' },
              ...featuredProjects.map(p => ({
                loc: `${(seoForm.canonicalBaseUrl || 'https://arwinrise.com').replace(/\/+$/, '')}/#project-${p.id}`,
                priority: '0.8',
                changefreq: 'weekly',
                title: `${p.name} (${p.location})`
              }))
            ];

            const generateSitemapXml = () => {
              const today = new Date().toISOString().split('T')[0];
              const items = sitemapUrls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n');
              return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`;
            };

            const generateSchemaJsonLd = () => {
              const baseUrl = (seoForm.canonicalBaseUrl || 'https://arwinrise.com').replace(/\/+$/, '');
              const schema: any = {
                "@context": "https://schema.org",
                "@type": seoForm.businessType || "RealEstateAgent",
                "name": seoForm.siteTitle || "ARWIN RISE",
                "url": baseUrl,
                "logo": `${baseUrl}${settings.logoDarkUrl || '/images/arwin-rise-lockup.png'}`,
                "description": seoForm.siteDescription,
                "telephone": settings.primaryPhone || "+91 84649 54321",
                "email": settings.publicContactEmail || "concierge@arwinrise.com",
                "priceRange": seoForm.priceRange || "₹1.5 Cr – ₹35 Cr+",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": seoForm.streetAddress || "Level 14, Galaxy Towers, Knowledge City, HITEC City",
                  "addressLocality": seoForm.addressLocality || "Hyderabad",
                  "addressRegion": seoForm.addressRegion || "Telangana",
                  "postalCode": seoForm.postalCode || "500081",
                  "addressCountry": seoForm.addressCountry || "IN"
                },
                "openingHours": seoForm.openingHours || "Mo-Sa 09:00-19:00",
                "sameAs": [
                  settings.instagramUrl,
                  settings.linkedinUrl,
                  settings.youtubeUrl
                ].filter(Boolean)
              };
              if (seoForm.geoLatitude && seoForm.geoLongitude) {
                schema.geo = {
                  "@type": "GeoCoordinates",
                  "latitude": seoForm.geoLatitude,
                  "longitude": seoForm.geoLongitude
                };
              }
              return JSON.stringify(schema, null, 2);
            };

            const currentOverride = seoForm.pageOverrides?.[activePageOverrideKey] || {
              title: '',
              description: '',
              keywords: '',
              ogImage: '',
              noIndex: false
            };

            const updateOverride = (patch: Partial<PageSeoConfig>) => {
              const existing = seoForm.pageOverrides?.[activePageOverrideKey] || {
                title: '',
                description: '',
                keywords: '',
                ogImage: '',
                noIndex: false
              };
              setSeoForm({
                ...seoForm,
                pageOverrides: {
                  ...seoForm.pageOverrides,
                  [activePageOverrideKey]: {
                    ...existing,
                    ...patch
                  }
                }
              });
            };

            return (
              <div className="space-y-6 max-w-5xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#26201B]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30">
                        Search Engine Optimization Hub
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Dynamic Head Injection Active
                      </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">SEO & Search Engine Control Center</h1>
                    <p className="text-xs text-[#8C827A] font-sans mt-1">
                      Manage real-time Google search snippet previews, per-page metadata overrides, Schema.org JSON-LD structured data, XML sitemaps, robots.txt, and tracking verification.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        updateSeoSettings(seoForm);
                        showToast('SEO configurations saved & synchronized live!');
                      }}
                      className="px-5 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#771722]/30 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-[#C5A880]" />
                      <span>Save SEO Settings</span>
                    </button>
                  </div>
                </div>

                {/* SEO Sub-Navigation Tabs */}
                <div className="flex items-center gap-1.5 p-1.5 bg-[#141210] border border-[#26201B] rounded-xl overflow-x-auto scrollbar-none">
                  {[
                    { id: 'simulator', label: 'SERP & Social Previews', icon: Search },
                    { id: 'pages', label: 'Page-by-Page SEO', icon: Layers },
                    { id: 'schema', label: 'Schema.org JSON-LD', icon: Code2 },
                    { id: 'webmaster', label: 'Webmaster & Analytics', icon: Globe },
                    { id: 'sitemap', label: 'Sitemap & Robots.txt', icon: FileCode },
                    { id: 'audit', label: 'SEO Audit Scorecard', icon: Activity, badge: `${overallScore}%` }
                  ].map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeSeoSubTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveSeoSubTab(tab.id as any)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs whitespace-nowrap transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#771722] text-[#FAF7F2] font-semibold shadow-md'
                            : 'text-[#8C827A] hover:text-[#FAF7F2] hover:bg-[#1F1C18]'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A880]' : 'text-[#8C827A]'}`} />
                        <span>{tab.label}</span>
                        {tab.badge && (
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                            overallScore >= 80 ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                          }`}>
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* SUB-TAB 1: SERP & SOCIAL PREVIEWS */}
                {activeSeoSubTab === 'simulator' && (
                  <div className="space-y-6">
                    {/* Live SERP Simulator Box */}
                    <div className="bg-[#141210] border border-[#26201B] rounded-2xl p-5 sm:p-6 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-semibold text-[#FAF7F2] flex items-center gap-2">
                            <Search className="w-4 h-4 text-[#C5A880]" />
                            Live Google Search Snippet Simulator
                          </h3>
                          <p className="text-[11px] text-[#8C827A]">
                            Real-time rendering of how your website appears on Google search result pages.
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-[#1F1C18] border border-[#2E2822] rounded-lg p-1">
                          <button
                            onClick={() => setPreviewDevice('desktop')}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-colors ${
                              previewDevice === 'desktop' ? 'bg-[#771722] text-[#FAF7F2]' : 'text-[#8C827A] hover:text-[#FAF7F2]'
                            }`}
                          >
                            <Monitor className="w-3.5 h-3.5" /> Desktop
                          </button>
                          <button
                            onClick={() => setPreviewDevice('mobile')}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-colors ${
                              previewDevice === 'mobile' ? 'bg-[#771722] text-[#FAF7F2]' : 'text-[#8C827A] hover:text-[#FAF7F2]'
                            }`}
                          >
                            <Smartphone className="w-3.5 h-3.5" /> Mobile
                          </button>
                        </div>
                      </div>

                      {/* Google Result Box Container */}
                      <div className="p-4 sm:p-5 bg-white text-[#202124] rounded-xl font-sans shadow-inner border border-neutral-300">
                        <div className={previewDevice === 'mobile' ? 'max-w-md' : 'max-w-2xl'}>
                          {/* Breadcrumb / Favicon */}
                          <div className="flex items-center gap-2.5 mb-1.5 text-xs">
                            <div className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#EAE3DA] flex items-center justify-center overflow-hidden p-0.5 shadow-xs shrink-0">
                              <img
                                src={settings.logoSymbolUrl || '/images/arwin-rise-symbol.png'}
                                alt="ARWIN RISE"
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/images/arwin-rise-symbol.png';
                                }}
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[12px] text-[#202124] font-medium leading-none">{seoForm.siteTitle || 'ARWIN RISE'}</span>
                              <span className="text-[11px] text-[#4d5156] font-mono leading-none mt-0.5">
                                {(seoForm.canonicalBaseUrl || 'https://arwinrise.com').replace(/\/+$/, '')}
                              </span>
                            </div>
                          </div>

                          {/* Search Title */}
                          <h4 className="text-[18px] sm:text-[20px] text-[#1a0dab] hover:underline cursor-pointer font-normal leading-snug break-words mb-1">
                            {seoForm.siteTitle || 'ARWIN RISE'}{seoForm.titleSeparator || ' | '}{seoForm.pageOverrides?.home?.title?.replace(/.*?\|\s*/, '') || 'Life Starts Here · Private Luxury Property Advisory'}
                          </h4>

                          {/* Search Description */}
                          <p className="text-[13px] sm:text-[14px] text-[#4d5156] leading-relaxed break-words">
                            {seoForm.pageOverrides?.home?.description || seoForm.siteDescription || 'Bespoke luxury residences and private property advisory in Hyderabad and Dubai for discerning Indian buyers and international NRI investors.'}
                          </p>

                          {/* Sitelinks Mini Simulation */}
                          <div className="mt-3 pt-3 border-t border-neutral-200 grid grid-cols-2 gap-2 text-xs text-[#1a0dab]">
                            <div>
                              <span className="hover:underline cursor-pointer font-medium">Curated Residences</span>
                              <p className="text-[11px] text-[#5f6368] line-clamp-1">Kokapet, Neopolis & Jubilee Hills Sky Villas.</p>
                            </div>
                            <div>
                              <span className="hover:underline cursor-pointer font-medium">Investor Advantage</span>
                              <p className="text-[11px] text-[#5f6368] line-clamp-1">Data-driven capital growth and ROI projections.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Character Count Indicators */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="bg-[#1F1C18] border border-[#2E2822] rounded-xl p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[#8C827A]">Site Title Length</span>
                            <span className={`font-mono text-[11px] font-bold ${
                              titleLength >= 10 && titleLength <= 60 ? 'text-emerald-400' : titleLength > 60 ? 'text-amber-400' : 'text-neutral-400'
                            }`}>
                              {titleLength} / 60 chars {titleLength >= 10 && titleLength <= 60 ? '(Optimal)' : titleLength > 60 ? '(Too Long)' : '(Short)'}
                            </span>
                          </div>
                          <div className="w-full bg-[#090807] rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                titleLength >= 10 && titleLength <= 60 ? 'bg-emerald-500' : titleLength > 60 ? 'bg-amber-500' : 'bg-neutral-600'
                              }`}
                              style={{ width: `${Math.min(100, (titleLength / 60) * 100)}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="bg-[#1F1C18] border border-[#2E2822] rounded-xl p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[#8C827A]">Meta Description Length</span>
                            <span className={`font-mono text-[11px] font-bold ${
                              descLength >= 120 && descLength <= 160 ? 'text-emerald-400' : descLength > 160 ? 'text-amber-400' : 'text-neutral-400'
                            }`}>
                              {descLength} / 160 chars {descLength >= 120 && descLength <= 160 ? '(Optimal)' : descLength > 160 ? '(Truncated)' : '(Short)'}
                            </span>
                          </div>
                          <div className="w-full bg-[#090807] rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                descLength >= 120 && descLength <= 160 ? 'bg-emerald-500' : descLength > 160 ? 'bg-amber-500' : 'bg-neutral-600'
                              }`}
                              style={{ width: `${Math.min(100, (descLength / 160) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Social Media Share Previews */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Facebook / LinkedIn Preview Card */}
                      <div className="bg-[#141210] border border-[#26201B] rounded-2xl p-5 space-y-3 text-xs">
                        <div className="flex items-center gap-2">
                          <Share2 className="w-4 h-4 text-[#C5A880]" />
                          <h4 className="font-semibold text-[#FAF7F2]">OpenGraph / LinkedIn Share Card</h4>
                        </div>
                        <div className="bg-[#1F1C18] border border-[#2E2822] rounded-xl overflow-hidden shadow-md">
                          <div className="h-40 bg-[#090807] overflow-hidden relative flex items-center justify-center">
                            {seoForm.ogDefaultImage ? (
                              <img src={seoForm.ogDefaultImage} alt="OG Preview" className="w-full h-full object-cover" />
                            ) : (
                              <div className="text-neutral-500 flex flex-col items-center gap-1">
                                <ImageIcon className="w-6 h-6" />
                                <span>No Share Image Set</span>
                              </div>
                            )}
                          </div>
                          <div className="p-3 bg-[#191613] border-t border-[#26201B] space-y-1">
                            <span className="text-[10px] font-mono text-[#8C827A] uppercase tracking-wider block">
                              {(seoForm.canonicalBaseUrl || 'arwinrise.com').replace(/^https?:\/\//, '')}
                            </span>
                            <h5 className="font-medium text-[#FAF7F2] text-xs line-clamp-1">
                              {seoForm.siteTitle} — {seoForm.ogSiteName || 'Luxury Real Estate Advisory'}
                            </h5>
                            <p className="text-[11px] text-[#8C827A] line-clamp-2">
                              {seoForm.siteDescription}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Twitter Card Preview */}
                      <div className="bg-[#141210] border border-[#26201B] rounded-2xl p-5 space-y-3 text-xs">
                        <div className="flex items-center gap-2">
                          <Share2 className="w-4 h-4 text-[#C5A880]" />
                          <h4 className="font-semibold text-[#FAF7F2]">Twitter / X Card ({seoForm.twitterCardType || 'summary_large_image'})</h4>
                        </div>
                        <div className="bg-[#1F1C18] border border-[#2E2822] rounded-xl overflow-hidden shadow-md">
                          <div className="h-40 bg-[#090807] overflow-hidden relative flex items-center justify-center">
                            {seoForm.ogDefaultImage ? (
                              <img src={seoForm.ogDefaultImage} alt="Twitter Preview" className="w-full h-full object-cover" />
                            ) : (
                              <div className="text-neutral-500 flex flex-col items-center gap-1">
                                <ImageIcon className="w-6 h-6" />
                                <span>No Share Image Set</span>
                              </div>
                            )}
                          </div>
                          <div className="p-3 bg-[#191613] border-t border-[#26201B] space-y-1">
                            <span className="text-[10px] font-mono text-[#8C827A] block">
                              {seoForm.twitterHandle || '@arwinrise'} · {(seoForm.canonicalBaseUrl || 'arwinrise.com').replace(/^https?:\/\//, '')}
                            </span>
                            <h5 className="font-medium text-[#FAF7F2] text-xs line-clamp-1">
                              {seoForm.siteTitle} | {seoForm.pageOverrides?.home?.title || 'Private Property Advisory'}
                            </h5>
                            <p className="text-[11px] text-[#8C827A] line-clamp-2">
                              {seoForm.siteDescription}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Global SEO Settings Form */}
                    <div className="bg-[#141210] border border-[#26201B] rounded-2xl p-6 space-y-5 text-xs">
                      <h3 className="text-sm font-semibold text-[#FAF7F2] pb-3 border-b border-[#26201B] flex items-center gap-2">
                        <Settings className="w-4 h-4 text-[#C5A880]" />
                        Global Meta Configuration
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Global Brand / Site Title</label>
                          <input
                            type="text"
                            value={seoForm.siteTitle}
                            onChange={(e) => setSeoForm({ ...seoForm, siteTitle: e.target.value })}
                            placeholder="e.g. ARWIN RISE"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Title Separator</label>
                          <select
                            value={seoForm.titleSeparator}
                            onChange={(e) => setSeoForm({ ...seoForm, titleSeparator: e.target.value })}
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs focus:outline-none focus:border-[#C5A880]"
                          >
                            <option value=" | ">Pipe (" | ")</option>
                            <option value=" · ">Middle Dot (" · ")</option>
                            <option value=" — ">Em Dash (" — ")</option>
                            <option value=" - ">Hyphen (" - ")</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Global Default Meta Description</label>
                          <textarea
                            rows={3}
                            value={seoForm.siteDescription}
                            onChange={(e) => setSeoForm({ ...seoForm, siteDescription: e.target.value })}
                            placeholder="Concise 150-160 character summary of your brand and services for search engine indexing."
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Global Focus Keywords (Comma separated)</label>
                          <input
                            type="text"
                            value={seoForm.siteKeywords}
                            onChange={(e) => setSeoForm({ ...seoForm, siteKeywords: e.target.value })}
                            placeholder="e.g. luxury real estate hyderabad, kokapet penthouses, dubai property advisory"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Canonical Base Domain</label>
                          <input
                            type="url"
                            value={seoForm.canonicalBaseUrl}
                            onChange={(e) => setSeoForm({ ...seoForm, canonicalBaseUrl: e.target.value })}
                            placeholder="https://arwinrise.com"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-mono focus:outline-none focus:border-[#C5A880]"
                          />
                          <span className="text-[10px] text-[#706860] mt-1 block">Prevents duplicate content penalties across search engines.</span>
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Author / Publisher Name</label>
                          <input
                            type="text"
                            value={seoForm.authorName}
                            onChange={(e) => setSeoForm({ ...seoForm, authorName: e.target.value })}
                            placeholder="ARWIN RISE Private Client Group"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <ImageInputWithPicker
                            label="Default Social Share Image (OpenGraph / Twitter)"
                            value={seoForm.ogDefaultImage}
                            onChange={(url) => setSeoForm({ ...seoForm, ogDefaultImage: url })}
                            helperText="Recommended dimension: 1200 x 630 px. Displayed when sharing your website on WhatsApp, LinkedIn, iMessage, and Twitter."
                          />
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Twitter / X Handle</label>
                          <input
                            type="text"
                            value={seoForm.twitterHandle}
                            onChange={(e) => setSeoForm({ ...seoForm, twitterHandle: e.target.value })}
                            placeholder="@arwinrise"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Twitter Card Format</label>
                          <select
                            value={seoForm.twitterCardType}
                            onChange={(e) => setSeoForm({ ...seoForm, twitterCardType: e.target.value as any })}
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs focus:outline-none focus:border-[#C5A880]"
                          >
                            <option value="summary_large_image">Large Image Card (Recommended)</option>
                            <option value="summary">Small Thumbnail Card</option>
                          </select>
                        </div>
                      </div>

                      {/* Indexing Directives */}
                      <div className="pt-4 border-t border-[#26201B] space-y-3">
                        <span className="text-xs font-semibold text-[#FAF7F2] block">Search Engine Crawling & Indexing Rules</span>
                        <div className="flex flex-wrap items-center gap-6">
                          <label className="flex items-center gap-2.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={seoForm.allowIndexing}
                              onChange={(e) => setSeoForm({ ...seoForm, allowIndexing: e.target.checked })}
                              className="w-4 h-4 rounded border-neutral-700 text-[#771722] focus:ring-[#771722]"
                            />
                            <span className="text-xs text-[#FAF7F2]">Allow search engines to index this site (<code className="font-mono text-[#C5A880]">index</code>)</span>
                          </label>

                          <label className="flex items-center gap-2.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={seoForm.allowFollow}
                              onChange={(e) => setSeoForm({ ...seoForm, allowFollow: e.target.checked })}
                              className="w-4 h-4 rounded border-neutral-700 text-[#771722] focus:ring-[#771722]"
                            />
                            <span className="text-xs text-[#FAF7F2]">Allow crawlers to follow links (<code className="font-mono text-[#C5A880]">follow</code>)</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-TAB 2: PAGE-BY-PAGE SEO OVERRIDES */}
                {activeSeoSubTab === 'pages' && (
                  <div className="space-y-6">
                    {/* Page Selector Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#26201B]">
                      {[
                        { id: 'home', label: 'Home Page' },
                        { id: 'about', label: 'About Us' },
                        { id: 'she-rise', label: 'SHE RISE' },
                        { id: 'golden-circle', label: 'Golden Circle' },
                        { id: 'residences', label: 'Residences Portfolio' },
                        { id: 'investors', label: 'Investors Page' },
                        { id: 'nriConnect', label: 'NRI Connect' },
                        { id: 'contact', label: 'Contact Page' },
                        { id: 'news', label: 'News & Articles' }
                      ].map(p => (
                        <button
                          key={p.id}
                          onClick={() => setActivePageOverrideKey(p.id)}
                          className={`px-4 py-2 rounded-xl text-xs whitespace-nowrap transition-all cursor-pointer ${
                            activePageOverrideKey === p.id
                              ? 'bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/40 font-semibold'
                              : 'bg-[#141210] text-[#8C827A] border border-[#26201B] hover:text-[#FAF7F2]'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>

                    {/* Page Override Form */}
                    <div className="bg-[#141210] border border-[#26201B] rounded-2xl p-6 space-y-5 text-xs">
                      <div className="flex items-center justify-between pb-3 border-b border-[#26201B]">
                        <div>
                          <h3 className="text-sm font-semibold text-[#FAF7F2]">
                            SEO Settings for: <span className="text-[#C5A880] uppercase font-mono">{activePageOverrideKey}</span>
                          </h3>
                          <p className="text-[11px] text-[#8C827A]">
                            Custom title, description, and social share image for this specific page.
                          </p>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(currentOverride.noIndex)}
                            onChange={(e) => updateOverride({ noIndex: e.target.checked })}
                            className="w-4 h-4 rounded border-neutral-700 text-[#771722] focus:ring-[#771722]"
                          />
                          <span className="text-xs text-amber-300 font-medium">Prevent search indexing (noindex)</span>
                        </label>
                      </div>

                      {/* Live Mini Preview for this Page */}
                      <div className="p-4 bg-white text-[#202124] rounded-xl font-sans shadow-inner border border-neutral-300 space-y-1">
                        <div className="flex items-center gap-2 mb-1 text-xs">
                          <div className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-[#EAE3DA] flex items-center justify-center overflow-hidden p-0.5 shadow-xs shrink-0">
                            <img
                              src={settings.logoSymbolUrl || '/images/arwin-rise-symbol.png'}
                              alt="ARWIN RISE"
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/arwin-rise-symbol.png';
                              }}
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[11px] text-[#202124] font-medium leading-none">{seoForm.siteTitle || 'ARWIN RISE'}</span>
                            <span className="text-[10px] text-[#4d5156] font-mono leading-none mt-0.5">
                              {(seoForm.canonicalBaseUrl || 'https://arwinrise.com').replace(/\/+$/, '')}/#{activePageOverrideKey}
                            </span>
                          </div>
                        </div>
                        <h4 className="text-[17px] text-[#1a0dab] font-normal leading-snug break-words mb-1">
                          {currentOverride.title || `${seoForm.siteTitle} | ${activePageOverrideKey}`}
                        </h4>
                        <p className="text-[13px] text-[#4d5156] leading-relaxed break-words">
                          {currentOverride.description || seoForm.siteDescription}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[#FAF7F2] font-medium">Page Meta Title</label>
                            <span className="font-mono text-[10px] text-[#8C827A]">
                              {(currentOverride.title || '').length} chars
                            </span>
                          </div>
                          <input
                            type="text"
                            value={currentOverride.title || ''}
                            onChange={(e) => updateOverride({ title: e.target.value })}
                            placeholder="e.g. Curated Residences & Sky Villas | ARWIN RISE"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[#FAF7F2] font-medium">Page Meta Description</label>
                            <span className="font-mono text-[10px] text-[#8C827A]">
                              {(currentOverride.description || '').length} chars
                            </span>
                          </div>
                          <textarea
                            rows={3}
                            value={currentOverride.description || ''}
                            onChange={(e) => updateOverride({ description: e.target.value })}
                            placeholder="Detailed search snippet for this page..."
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Focus Keywords for this Page</label>
                          <input
                            type="text"
                            value={currentOverride.keywords || ''}
                            onChange={(e) => updateOverride({ keywords: e.target.value })}
                            placeholder="Comma-separated target keywords..."
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <ImageInputWithPicker
                            label="Custom Social Share Image for this Page"
                            value={currentOverride.ogImage || ''}
                            onChange={(url) => updateOverride({ ogImage: url })}
                            helperText="Leave empty to use the global default share image."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-TAB 3: SCHEMA.ORG JSON-LD */}
                {activeSeoSubTab === 'schema' && (
                  <div className="space-y-6">
                    <div className="bg-[#141210] border border-[#26201B] rounded-2xl p-6 space-y-5 text-xs">
                      <div className="flex items-center justify-between pb-3 border-b border-[#26201B]">
                        <div>
                          <h3 className="text-sm font-semibold text-[#FAF7F2] flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-[#C5A880]" />
                            Schema.org RealEstateAgent & Organization Structured Data
                          </h3>
                          <p className="text-[11px] text-[#8C827A]">
                            Provides Google with high-fidelity entity data to generate Knowledge Graph panels, rich cards, and local maps authority.
                          </p>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={seoForm.schemaEnabled}
                            onChange={(e) => setSeoForm({ ...seoForm, schemaEnabled: e.target.checked })}
                            className="w-4 h-4 rounded border-neutral-700 text-[#771722] focus:ring-[#771722]"
                          />
                          <span className="text-xs text-emerald-400 font-semibold">Enable JSON-LD</span>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Business / Entity Type</label>
                          <select
                            value={seoForm.businessType}
                            onChange={(e) => setSeoForm({ ...seoForm, businessType: e.target.value })}
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs focus:outline-none focus:border-[#C5A880]"
                          >
                            <option value="RealEstateAgent">RealEstateAgent (Recommended)</option>
                            <option value="RealEstateAgency">RealEstateAgency</option>
                            <option value="Organization">Organization</option>
                            <option value="LocalBusiness">LocalBusiness</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Price Range</label>
                          <input
                            type="text"
                            value={seoForm.priceRange}
                            onChange={(e) => setSeoForm({ ...seoForm, priceRange: e.target.value })}
                            placeholder="e.g. ₹1.5 Cr – ₹35 Cr+"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Operating Hours</label>
                          <input
                            type="text"
                            value={seoForm.openingHours}
                            onChange={(e) => setSeoForm({ ...seoForm, openingHours: e.target.value })}
                            placeholder="Mo-Sa 09:00-19:00"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-mono focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Street Address</label>
                          <input
                            type="text"
                            value={seoForm.streetAddress}
                            onChange={(e) => setSeoForm({ ...seoForm, streetAddress: e.target.value })}
                            placeholder="Level 14, Galaxy Towers, Knowledge City"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">City / Locality</label>
                          <input
                            type="text"
                            value={seoForm.addressLocality}
                            onChange={(e) => setSeoForm({ ...seoForm, addressLocality: e.target.value })}
                            placeholder="Hyderabad"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">State / Region</label>
                          <input
                            type="text"
                            value={seoForm.addressRegion}
                            onChange={(e) => setSeoForm({ ...seoForm, addressRegion: e.target.value })}
                            placeholder="Telangana"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Postal Code</label>
                          <input
                            type="text"
                            value={seoForm.postalCode}
                            onChange={(e) => setSeoForm({ ...seoForm, postalCode: e.target.value })}
                            placeholder="500081"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-mono focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Country Code</label>
                          <input
                            type="text"
                            value={seoForm.addressCountry}
                            onChange={(e) => setSeoForm({ ...seoForm, addressCountry: e.target.value })}
                            placeholder="IN"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-mono focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Geo Latitude (Google Maps)</label>
                          <input
                            type="text"
                            value={seoForm.geoLatitude || ''}
                            onChange={(e) => setSeoForm({ ...seoForm, geoLatitude: e.target.value })}
                            placeholder="17.4375"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-mono focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Geo Longitude (Google Maps)</label>
                          <input
                            type="text"
                            value={seoForm.geoLongitude || ''}
                            onChange={(e) => setSeoForm({ ...seoForm, geoLongitude: e.target.value })}
                            placeholder="78.3781"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-mono focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>
                      </div>

                      {/* Live JSON-LD Code Box */}
                      <div className="pt-4 border-t border-[#26201B] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#FAF7F2]">Generated JSON-LD Output</span>
                          <div className="flex items-center gap-2">
                            <a
                              href="https://search.google.com/test/rich-results"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 bg-[#1F1C18] hover:bg-[#26201B] border border-[#2E2822] text-[#C5A880] rounded-lg text-[11px] flex items-center gap-1 transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" /> Test in Google Rich Results
                            </a>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(generateSchemaJsonLd());
                                setCopiedJsonLd(true);
                                setTimeout(() => setCopiedJsonLd(false), 2000);
                                showToast('Schema.org JSON-LD copied to clipboard');
                              }}
                              className="px-3 py-1 bg-[#1F1C18] hover:bg-[#26201B] border border-[#2E2822] text-[#FAF7F2] rounded-lg text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              {copiedJsonLd ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-[#C5A880]" />}
                              <span>{copiedJsonLd ? 'Copied!' : 'Copy Code'}</span>
                            </button>
                          </div>
                        </div>

                        <pre className="p-4 bg-[#090807] border border-[#26201B] rounded-xl text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-72">
                          {generateSchemaJsonLd()}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-TAB 4: WEBMASTER & ANALYTICS */}
                {activeSeoSubTab === 'webmaster' && (
                  <div className="space-y-6">
                    <div className="bg-[#141210] border border-[#26201B] rounded-2xl p-6 space-y-5 text-xs">
                      <h3 className="text-sm font-semibold text-[#FAF7F2] pb-3 border-b border-[#26201B] flex items-center gap-2">
                        <Globe className="w-4 h-4 text-[#C5A880]" />
                        Search Console Verification & Webmaster Tokens
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Google Search Console Verification Tag</label>
                          <input
                            type="text"
                            value={seoForm.googleSearchConsoleTag}
                            onChange={(e) => setSeoForm({ ...seoForm, googleSearchConsoleTag: e.target.value })}
                            placeholder="e.g. google-site-verification=XXXXXXXXXXXXXXXX"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-mono focus:outline-none focus:border-[#C5A880]"
                          />
                          <span className="text-[10px] text-[#706860] mt-1 block">
                            Paste the content from your Google Search Console HTML tag verification method.
                          </span>
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Bing Webmaster Verification Tag</label>
                          <input
                            type="text"
                            value={seoForm.bingWebmasterTag}
                            onChange={(e) => setSeoForm({ ...seoForm, bingWebmasterTag: e.target.value })}
                            placeholder="e.g. msvalidate.01=XXXXXXXXXXXXXXXX"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-mono focus:outline-none focus:border-[#C5A880]"
                          />
                          <span className="text-[10px] text-[#706860] mt-1 block">
                            Enables indexing across Bing, Yahoo, and DuckDuckGo.
                          </span>
                        </div>
                      </div>

                      <h3 className="text-sm font-semibold text-[#FAF7F2] pt-4 pb-2 border-t border-[#26201B] flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#C5A880]" />
                        Analytics & Conversion Tracking IDs
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Google Analytics 4 (GA4) ID</label>
                          <input
                            type="text"
                            value={seoForm.ga4MeasurementId}
                            onChange={(e) => setSeoForm({ ...seoForm, ga4MeasurementId: e.target.value })}
                            placeholder="G-XXXXXXXXXX"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-mono focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Google Tag Manager (GTM) ID</label>
                          <input
                            type="text"
                            value={seoForm.gtmContainerId}
                            onChange={(e) => setSeoForm({ ...seoForm, gtmContainerId: e.target.value })}
                            placeholder="GTM-XXXXXXX"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-mono focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Meta / Facebook Pixel ID</label>
                          <input
                            type="text"
                            value={seoForm.facebookPixelId}
                            onChange={(e) => setSeoForm({ ...seoForm, facebookPixelId: e.target.value })}
                            placeholder="123456789012345"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-mono focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>
                      </div>

                      <h3 className="text-sm font-semibold text-[#FAF7F2] pt-4 pb-2 border-t border-[#26201B] flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-[#C5A880]" />
                        Custom Header & Footer Script Injections
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Custom &lt;head&gt; Code Injection</label>
                          <textarea
                            rows={3}
                            value={seoForm.customHeadScripts}
                            onChange={(e) => setSeoForm({ ...seoForm, customHeadScripts: e.target.value })}
                            placeholder="<!-- Paste custom tracking tags, heatmaps, or verification scripts here -->"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-mono focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#FAF7F2] mb-1 font-medium">Custom &lt;body&gt; Code Injection</label>
                          <textarea
                            rows={3}
                            value={seoForm.customBodyScripts}
                            onChange={(e) => setSeoForm({ ...seoForm, customBodyScripts: e.target.value })}
                            placeholder="<!-- Paste custom chat widget or body scripts here -->"
                            className="w-full px-3 py-2 bg-[#090807] border border-[#26201B] rounded-lg text-[#FAF7F2] text-xs font-mono focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-TAB 5: SITEMAP & ROBOTS.TXT */}
                {activeSeoSubTab === 'sitemap' && (
                  <div className="space-y-6">
                    {/* XML Sitemap Explorer */}
                    <div className="bg-[#141210] border border-[#26201B] rounded-2xl p-6 space-y-4 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#26201B]">
                        <div>
                          <h3 className="text-sm font-semibold text-[#FAF7F2] flex items-center gap-2">
                            <FileCode className="w-4 h-4 text-[#C5A880]" />
                            Dynamic XML Sitemap Generator ({sitemapUrls.length} Live URLs)
                          </h3>
                          <p className="text-[11px] text-[#8C827A]">
                            Automatically registers all active website pages and individual luxury residence projects.
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(generateSitemapXml());
                              setCopiedSitemap(true);
                              setTimeout(() => setCopiedSitemap(false), 2000);
                              showToast('XML sitemap copied to clipboard');
                            }}
                            className="px-3 py-1.5 bg-[#1F1C18] hover:bg-[#26201B] border border-[#2E2822] text-[#FAF7F2] rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            {copiedSitemap ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#C5A880]" />}
                            <span>{copiedSitemap ? 'Copied XML' : 'Copy Sitemap XML'}</span>
                          </button>
                          <button
                            onClick={() => {
                              const xml = generateSitemapXml();
                              const blob = new Blob([xml], { type: 'application/xml' });
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = 'sitemap.xml';
                              a.click();
                              URL.revokeObjectURL(url);
                              showToast('sitemap.xml downloaded');
                            }}
                            className="px-3 py-1.5 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download sitemap.xml</span>
                          </button>
                        </div>
                      </div>

                      {/* Sitemap URLs Table */}
                      <div className="overflow-x-auto border border-[#26201B] rounded-xl max-h-64">
                        <table className="w-full text-left">
                          <thead className="bg-[#090807] text-[#8C827A] uppercase text-[10px] font-mono border-b border-[#26201B]">
                            <tr>
                              <th className="px-4 py-2.5">Page / Route</th>
                              <th className="px-4 py-2.5">Canonical URL</th>
                              <th className="px-3 py-2.5 text-center">Priority</th>
                              <th className="px-3 py-2.5 text-center">Frequency</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#26201B] text-[11px]">
                            {sitemapUrls.map((u, i) => (
                              <tr key={i} className="hover:bg-[#1A1613]">
                                <td className="px-4 py-2 text-[#FAF7F2] font-medium">{u.title}</td>
                                <td className="px-4 py-2 text-emerald-300 font-mono text-[10px] truncate max-w-xs">{u.loc}</td>
                                <td className="px-3 py-2 text-center text-[#C5A880] font-mono">{u.priority}</td>
                                <td className="px-3 py-2 text-center text-[#8C827A] font-mono">{u.changefreq}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Robots.txt Manager */}
                    <div className="bg-[#141210] border border-[#26201B] rounded-2xl p-6 space-y-4 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#26201B]">
                        <div>
                          <h3 className="text-sm font-semibold text-[#FAF7F2] flex items-center gap-2">
                            <Shield className="w-4 h-4 text-[#C5A880]" />
                            Robots.txt Crawler Directives
                          </h3>
                          <p className="text-[11px] text-[#8C827A]">
                            Controls how search engine spiders, crawlers, and AI indexers navigate your site directories.
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button
                            onClick={() => {
                              setSeoForm({
                                ...seoForm,
                                customRobotsTxt: `User-agent: *\nAllow: /\nDisallow: /#admin\nDisallow: /api/\n\nSitemap: ${(seoForm.canonicalBaseUrl || 'https://arwinrise.com').replace(/\/+$/, '')}/sitemap.xml`
                              });
                              showToast('Preset applied: Standard Production');
                            }}
                            className="px-2.5 py-1 bg-[#1F1C18] hover:bg-[#26201B] border border-[#2E2822] text-[#8C827A] hover:text-[#FAF7F2] rounded text-[11px]"
                          >
                            Preset: Production
                          </button>
                          <button
                            onClick={() => {
                              setSeoForm({
                                ...seoForm,
                                customRobotsTxt: `User-agent: *\nDisallow: /`
                              });
                              showToast('Preset applied: Block All (Staging)');
                            }}
                            className="px-2.5 py-1 bg-[#1F1C18] hover:bg-[#26201B] border border-[#2E2822] text-[#8C827A] hover:text-[#FAF7F2] rounded text-[11px]"
                          >
                            Preset: Block All
                          </button>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(seoForm.customRobotsTxt);
                              setCopiedRobots(true);
                              setTimeout(() => setCopiedRobots(false), 2000);
                              showToast('robots.txt copied to clipboard');
                            }}
                            className="px-3 py-1 bg-[#1F1C18] hover:bg-[#26201B] border border-[#2E2822] text-[#FAF7F2] rounded text-[11px] flex items-center gap-1 cursor-pointer"
                          >
                            {copiedRobots ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-[#C5A880]" />}
                            <span>{copiedRobots ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>

                      <textarea
                        rows={7}
                        value={seoForm.customRobotsTxt}
                        onChange={(e) => setSeoForm({ ...seoForm, customRobotsTxt: e.target.value })}
                        className="w-full px-3 py-2.5 bg-[#090807] border border-[#26201B] rounded-xl text-emerald-300 font-mono text-xs focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>
                )}

                {/* SUB-TAB 6: SEO AUDIT SCORECARD */}
                {activeSeoSubTab === 'audit' && (
                  <div className="space-y-6">
                    {/* Big Health Banner */}
                    <div className="bg-[#141210] border border-[#26201B] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-5">
                        <div className="relative w-20 h-20 rounded-2xl bg-[#1F1C18] border border-[#2E2822] flex flex-col items-center justify-center shrink-0">
                          <span className={`text-2xl font-mono font-bold ${
                            overallScore >= 90 ? 'text-emerald-400' : overallScore >= 70 ? 'text-[#C5A880]' : 'text-amber-400'
                          }`}>
                            {overallScore}
                          </span>
                          <span className="text-[10px] font-mono text-[#8C827A] uppercase">Score / 100</span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                              overallScore >= 90
                                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                                : 'bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30'
                            }`}>
                              {overallScore >= 90 ? 'Grade A+ · Excellent' : overallScore >= 70 ? 'Grade B+ · Good' : 'Needs Optimization'}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-serif text-[#FAF7F2]">Search Visibility Readiness Score</h3>
                          <p className="text-xs text-[#8C827A] mt-0.5">
                            Automated audit measuring title tags, description snippets, OpenGraph, Schema structured data, and search directives.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          updateSeoSettings(seoForm);
                          showToast('Audits re-calculated & settings saved!');
                        }}
                        className="px-4 py-2 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 shrink-0"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-[#C5A880]" /> Re-run Audit
                      </button>
                    </div>

                    {/* Audit Items List */}
                    <div className="bg-[#141210] border border-[#26201B] rounded-2xl p-6 space-y-4 text-xs">
                      <h4 className="font-semibold text-[#FAF7F2] pb-2 border-b border-[#26201B]">
                        Automated SEO Checklist & Status
                      </h4>

                      <div className="divide-y divide-[#26201B]">
                        {checks.map((item, idx) => (
                          <div key={idx} className="py-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              {item.pass ? (
                                <div className="w-6 h-6 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 flex items-center justify-center shrink-0">
                                  <Check className="w-3.5 h-3.5" />
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-400 flex items-center justify-center shrink-0">
                                  <AlertCircle className="w-3.5 h-3.5" />
                                </div>
                              )}
                              <div>
                                <span className="font-medium text-[#FAF7F2] block">{item.label}</span>
                                <span className="text-[11px] text-[#8C827A]">Status: {item.current}</span>
                              </div>
                            </div>

                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                              item.pass ? 'bg-emerald-950/60 text-emerald-300' : 'bg-amber-950/60 text-amber-300'
                            }`}>
                              {item.pass ? `+${item.weight} pts` : `0 / ${item.weight} pts`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* TAB 8: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h1 className="text-xl sm:text-2xl font-serif text-[#FAF7F2]">General & Contact Settings</h1>
                <p className="text-xs text-neutral-400 font-sans mt-1">
                  Configure phone numbers, lead routing email, RERA registrations, and office addresses.
                </p>
              </div>

              <div className="bg-[#1F1C18] border border-neutral-800 rounded-2xl p-6 space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-300 mb-1">Brand Name</label>
                    <input
                      type="text"
                      value={settings.brandName}
                      onChange={(e) => updateSettings({ brandName: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={settings.tagline}
                      onChange={(e) => updateSettings({ tagline: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Public Official Contact Email (Website Display)</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={settings.publicContactEmail || 'concierge@arwinrise.com'}
                        onChange={(e) => updateSettings({ publicContactEmail: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100 font-mono text-xs focus:outline-none focus:border-[#C5A880]"
                      />
                      <Mail className="w-4 h-4 text-[#C5A880] absolute left-3 top-2.5" />
                    </div>
                    <span className="text-[10px] text-neutral-500 mt-1 block">Displayed on public Contact page and footer.</span>
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Lead Routing Notification Email (Internal Ingestion)</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={settings.leadTargetEmail}
                        onChange={(e) => updateSettings({ leadTargetEmail: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100 font-mono text-xs focus:outline-none focus:border-[#C5A880]"
                      />
                      <Mail className="w-4 h-4 text-emerald-400 absolute left-3 top-2.5" />
                    </div>
                    <span className="text-[10px] text-neutral-500 mt-1 block">All website form submissions route directly to this address.</span>
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">Display Hotline Phone</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={settings.displayPhone}
                        onChange={(e) => updateSettings({ displayPhone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100 text-xs focus:outline-none focus:border-[#C5A880]"
                      />
                      <Phone className="w-4 h-4 text-[#C5A880] absolute left-3 top-2.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">WhatsApp Concierge Phone (Numbers only)</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={settings.whatsappPhone}
                        onChange={(e) => updateSettings({ whatsappPhone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100 font-mono text-xs focus:outline-none focus:border-[#C5A880]"
                      />
                      <Phone className="w-4 h-4 text-[#25D366] absolute left-3 top-2.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">RERA Number (Hyderabad)</label>
                    <input
                      type="text"
                      value={settings.reraNumberHyderabad}
                      onChange={(e) => updateSettings({ reraNumberHyderabad: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1">RERA Number (Dubai Desk)</label>
                    <input
                      type="text"
                      value={settings.reraNumberDubai}
                      onChange={(e) => updateSettings({ reraNumberDubai: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-neutral-300 mb-1">Hyderabad Office Address</label>
                    <input
                      type="text"
                      value={settings.officeAddressHyderabad}
                      onChange={(e) => updateSettings({ officeAddressHyderabad: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-neutral-300 mb-1">Dubai Desk Address</label>
                    <input
                      type="text"
                      value={settings.officeAddressDubai}
                      onChange={(e) => updateSettings({ officeAddressDubai: e.target.value })}
                      className="w-full px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800 flex justify-end">
                  <button
                    onClick={() => showToast('Settings saved successfully')}
                    className="px-6 py-2.5 bg-[#771722] hover:bg-[#8E1E2C] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" /> Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
