import { CollectionTier, FeaturedProject, HeroSlide, StatItem, Testimonial } from './index';
import { NewsArticle } from '../data/news';

export interface NavigationLink {
  id: string;
  label: string;
  page: string;
  isVisible: boolean;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  primaryPhone: string;
  displayPhone: string;
  whatsappPhone: string;
  publicContactEmail: string;
  leadTargetEmail: string;
  officeAddressHyderabad: string;
  officeAddressDubai: string;
  reraNumberHyderabad: string;
  reraNumberDubai: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  metaTitle: string;
  metaDescription: string;
  
  // Brand & Logos
  logoDarkUrl?: string;
  logoLightUrl?: string;
  logoSymbolUrl?: string;

  // Navigation Menus & CTA
  navLinks?: NavigationLink[];
  navCtaText?: string;
}

export interface LeadRecord {
  id: string;
  timestamp: string;
  formType: string;
  clientName: string;
  phone: string;
  email: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  notes?: string;
  project?: string;
  collection?: string;
  tier?: string;
  budget?: string;
  date?: string;
  timeSlot?: string;
  message?: string;
  additionalData?: Record<string, any>;
}

export interface AdminUser {
  username: string;
  role: 'superadmin' | 'editor';
  token?: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  category: 'hero' | 'residences' | 'collections' | 'general' | 'uploads';
  uploadedAt: string;
  size?: string;
}

export interface PartnerSectionData {
  tag: string;
  badgeNote: string;
  headlineMain: string;
  headlineAccent: string;
  description: string;
  whatsappCtaText: string;
  whatsappMessage: string;
  modalCtaText: string;
  isVisible: boolean;
}

export interface SellerDeskStat {
  value: string;
  label: string;
}

export interface SellerDeskData {
  tag: string;
  headlineMain: string;
  headlineAccent: string;
  description: string;
  stats: SellerDeskStat[];
  image: string;
  quote: string;
  primaryCtaText: string;
  whatsappCtaText: string;
  whatsappMessage: string;
  footnote: string;
  isVisible: boolean;
}

export interface PreloaderMessage {
  id: string;
  tag: string;
  quote: string;
  sub: string;
}

export interface PreloaderConfig {
  isEnabled: boolean;
  durationSeconds: number;
  bottomBadge: string;
  messages: PreloaderMessage[];
}

export interface InvestorCorridor {
  id: string;
  name: string;
  subtitle: string;
  cagrRate: number; // e.g. 0.188 for 18.8%
  rentalRate: number; // e.g. 0.045 for 4.5%
  cagrLabel: string;
  rentalYieldLabel: string;
  infraCatalyst: string;
  highlights: string[];
}

export interface InvestorPillar {
  id: string;
  title: string;
  description: string;
}

export interface InvestorsPageData {
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  
  simulatorTag: string;
  simulatorTitle: string;
  simulatorSubtitle: string;
  
  corridorsTag: string;
  corridorsTitle: string;
  corridors: InvestorCorridor[];
  
  pillarsTag: string;
  pillarsTitle: string;
  pillars: InvestorPillar[];
}

export interface NriStep {
  id: string;
  step: string;
  title: string;
  desc: string;
}

export interface NriPageData {
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  
  featureTag: string;
  featureTitle: string;
  featureDescription: string;
  featureBullets: string[];
  featureCtaText: string;
  featureImage: string;
  
  calculatorTag: string;
  calculatorTitle: string;
  calculatorSubtitle: string;
  exchangeRates: Record<string, number>;
  
  stepsTag: string;
  stepsTitle: string;
  steps: NriStep[];
  
  timezoneTag: string;
  timezoneTitle: string;
  timezoneDescription: string;
  timezoneCtaText: string;
}

export interface AboutPillar {
  id: string;
  title: string;
  desc: string;
}

export interface AboutPageData {
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  
  philosophyTag: string;
  philosophyHeadline: string;
  philosophyParagraphs: string[];
  philosophyImage: string;
  
  advisoryName: string;
  advisoryDesk: string;
  advisoryLocation: string;
  
  pillarsTag: string;
  pillarsTitle: string;
  pillars: AboutPillar[];
}

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface SeoSettings {
  // Global Meta Defaults
  siteTitle: string;
  titleSeparator: string; // e.g. " | " or " · "
  siteDescription: string;
  siteKeywords: string;
  canonicalBaseUrl: string; // e.g. "https://arwinrise.com"
  authorName: string;
  language: string; // e.g. "en"
  
  // Open Graph & Social Cards
  ogSiteName: string;
  ogDefaultImage: string;
  twitterHandle: string;
  twitterCardType: 'summary' | 'summary_large_image';

  // Search Engine Directives & Robots
  allowIndexing: boolean;
  allowFollow: boolean;
  customRobotsTxt: string;
  
  // Structured Data / Schema.org (JSON-LD)
  schemaEnabled: boolean;
  businessType: string;
  priceRange: string;
  openingHours: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  geoLatitude?: string;
  geoLongitude?: string;

  // Webmaster Verification & Tracking Codes
  googleSearchConsoleTag: string;
  bingWebmasterTag: string;
  ga4MeasurementId: string;
  gtmContainerId: string;
  facebookPixelId: string;
  customHeadScripts: string;
  customBodyScripts: string;

  // Granular Page-by-Page SEO Overrides
  pageOverrides: {
    home?: PageSeoConfig;
    about?: PageSeoConfig;
    residences?: PageSeoConfig;
    investors?: PageSeoConfig;
    nriConnect?: PageSeoConfig;
    contact?: PageSeoConfig;
    news?: PageSeoConfig;
    [key: string]: PageSeoConfig | undefined;
  };
}

export type PageSectionType = 
  | 'story-split'
  | 'feature-grid'
  | 'stats-counter'
  | 'faq-accordion'
  | 'cta-banner'
  | 'gallery-grid'
  | 'custom-html'
  | 'rich_text_media'
  | 'feature_grid'
  | 'stats_counter'
  | 'faq_accordion'
  | 'cta_banner'
  | 'hero_banner'
  | 'gallery_slider'
  | 'embed_code';

export interface PageSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  image?: string;
  badge?: string;
  tag?: string;
  linkText?: string;
  linkUrl?: string;
  link?: string;
}

export interface PageSectionStat {
  id?: string;
  value: string;
  label: string;
  subtext?: string;
  sublabel?: string;
}

export interface PageSectionFaq {
  id?: string;
  question: string;
  answer: string;
  category?: string;
}

export interface PageSectionStoryContent {
  paragraphs?: string[];
  image?: string;
  imagePosition?: 'left' | 'right';
  quote?: string;
  quoteAuthor?: string;
}

export interface PageSectionGalleryImage {
  id: string;
  image: string;
  title?: string;
  description?: string;
}

export interface PageSectionBlock {
  id: string;
  type: PageSectionType;
  title: string;
  subtitle?: string;
  badge?: string;
  tag?: string;
  bgTheme?: 'light' | 'warm' | 'dark';
  isHidden?: boolean;
  isVisible?: boolean;
  order?: number;

  // Specific block payloads
  storyContent?: PageSectionStoryContent;
  content?: string;
  image?: string;
  imagePosition?: 'left' | 'right' | 'full' | 'center';
  quote?: string;
  quoteAuthor?: string;

  gridColumns?: 2 | 3 | 4;
  items?: PageSectionItem[];

  stats?: PageSectionStat[];

  faqs?: PageSectionFaq[];

  ctaButtonText?: string;
  ctaAction?: 'preview-modal' | 'whatsapp' | 'link';
  ctaBgImage?: string;
  ctaWhatsappMsg?: string;
  ctaText?: string;
  ctaLink?: string;
  ctaVariant?: 'primary' | 'whatsapp' | 'outline';
  secondaryCtaText?: string;
  secondaryCtaLink?: string;

  galleryLayout?: 'grid-3' | 'grid-2' | 'masonry';
  galleryImages?: PageSectionGalleryImage[];
  images?: string[];

  customHtml?: string;
}

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  category?: string;
  navLabel?: string;
  showInNav: boolean;
  showInFooter: boolean;
  isPublished: boolean;
  heroTitle?: string;
  heroHeadline?: string;
  heroSubtitle?: string;
  heroTag?: string;
  heroImage?: string;
  heroCtaText?: string;
  sections: PageSectionBlock[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'seller' | 'patron' | 'investor';
  avatarUrl?: string;
  isEmailVerified?: boolean;
  createdAt: string;
}

export type ListingSubmissionStatus = 'pending' | 'under_audit' | 'approved' | 'rejected';

export interface PropertyListingSubmission {
  id: string; // e.g. "ARW-LIST-849201"
  userId: string;
  ownerName: string;
  phone: string;
  email: string;
  propertyTitle: string; // Project / Community name
  location: string; // e.g. "Kokapet, Neopolis", "Dubai Marina"
  city: 'Hyderabad' | 'Dubai' | 'Other';
  propertyType: string; // "3 & 3.5 BHK Sky Residence", "4 & 5 BHK Sky Mansion", "Triplex / Gated Villa", "Ultra-Luxury Penthouse", etc.
  configuration: string; // e.g. "4 BHK + Maid Room"
  sizeSft: string; // e.g. "6,800"
  expectedPrice: string; // e.g. "₹ 8.50 Cr"
  priceStartingFormatted?: string; // e.g. "₹8.50 Cr"
  priceNumCr?: number; // for tier sorting / filtering
  targetTierId?: string; // e.g. "tier-01", "tier-02", "tier-03", "tier-dubai"
  description: string;
  highlights?: string;
  amenities?: string[];
  images: string[]; // array of photo URLs
  floorPlanUrl?: string;
  status: ListingSubmissionStatus;
  adminFeedback?: string;
  rejectionReason?: string;
  approvedProjectId?: string; // if approved, reference to created FeaturedProject
  submittedAt: string;
  reviewedAt?: string;
}

export interface ContentState {
  featuredProjects: FeaturedProject[];
  collectionTiers: CollectionTier[];
  heroSlides: HeroSlide[];
  newsArticles: NewsArticle[];
  testimonials: Testimonial[];
  stats: StatItem[];
  settings: SiteSettings;
  leads: LeadRecord[];
  mediaGallery?: MediaItem[];
  partnerSection?: PartnerSectionData;
  sellerDesk?: SellerDeskData;
  preloaderConfig?: PreloaderConfig;
  investorsPage?: InvestorsPageData;
  nriPage?: NriPageData;
  aboutPage?: AboutPageData;
  seoSettings?: SeoSettings;
  customPages?: CustomPage[];
  listingSubmissions?: PropertyListingSubmission[];
}


