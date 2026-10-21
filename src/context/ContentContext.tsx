import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CollectionTier, FeaturedProject, HeroSlide, StatItem, Testimonial } from '../types';
import { NewsArticle, NEWS_ARTICLES } from '../data/news';
import { COLLECTIONS, FEATURED_PROJECTS, HERO_SLIDES, REVIEWS_DATA as DEFAULT_TESTIMONIALS, STATS } from '../data/properties';
import { DEFAULT_MEDIA_GALLERY } from '../data/mediaGallery';
import { AboutPageData, AboutPillar, ContentState, CustomPage, InvestorCorridor, InvestorPillar, InvestorsPageData, LeadRecord, ListingSubmissionStatus, MediaItem, NavigationLink, NriPageData, NriStep, PageSectionBlock, PageSeoConfig, PartnerSectionData, PreloaderConfig, PreloaderMessage, PropertyListingSubmission, SellerDeskData, SeoSettings, SiteSettings, User } from '../types/admin';
import { compressImageFile } from '../utils/imageCompressor';

export const DEFAULT_SEO_SETTINGS: SeoSettings = {
  siteTitle: "ARWIN RISE",
  titleSeparator: " | ",
  siteDescription: "ARWIN RISE — Life Starts Here. Bespoke private luxury residences and property advisory in Hyderabad and Dubai for discerning Indian buyers and international NRI investors.",
  siteKeywords: "luxury real estate hyderabad, kokapet luxury apartments, jubilee hills villas, dubai luxury properties for indians, nri real estate advisory, neopolis hyderabad properties, financial district luxury flats",
  canonicalBaseUrl: "https://arwinrise.com",
  authorName: "ARWIN RISE Private Client Group",
  language: "en",

  ogSiteName: "ARWIN RISE Luxury Real Estate Advisory",
  ogDefaultImage: "/images/hero-luxury-penthouse.jpg",
  twitterHandle: "@arwinrise",
  twitterCardType: "summary_large_image",

  allowIndexing: true,
  allowFollow: true,
  customRobotsTxt: `User-agent: *
Allow: /
Disallow: /#admin
Disallow: /api/

Sitemap: https://arwinrise.com/sitemap.xml`,

  schemaEnabled: true,
  businessType: "RealEstateAgent",
  priceRange: "₹1.5 Cr – ₹35 Cr+",
  openingHours: "Mo-Sa 09:00-19:00",
  streetAddress: "Plot No 102, HMT Swarnapuri Colony, Miyapur, Ranga Reddy",
  addressLocality: "Miyapur, Hyderabad",
  addressRegion: "Telangana",
  postalCode: "500050",
  addressCountry: "IN",
  geoLatitude: "17.4375",
  geoLongitude: "78.3781",

  googleSearchConsoleTag: "",
  bingWebmasterTag: "",
  ga4MeasurementId: "",
  gtmContainerId: "",
  facebookPixelId: "",
  customHeadScripts: "",
  customBodyScripts: "",

  pageOverrides: {
    home: {
      title: "ARWIN RISE | Life Starts Here · Private Luxury Property Advisory",
      description: "Discover curated ultra-luxury residences, penthouses, and gated villa estates across Hyderabad's prime corridors (Kokapet, Neopolis, Financial District) and Dubai.",
      keywords: "luxury apartments hyderabad, kokapet high rise, neopolis luxury penthouses, arwin rise",
      ogImage: "/images/hero-luxury-penthouse.jpg",
      noIndex: false
    },
    about: {
      title: "About ARWIN RISE | Our Advisory Heritage & Leadership",
      description: "With over ₹4,500 Cr+ in advised luxury portfolio and 12+ years of fiduciary excellence, ARWIN RISE sets the benchmark for high-end real estate representation.",
      keywords: "arwin rise about, luxury real estate leadership, hyderabad real estate consultants, fiduciary property advisory",
      ogImage: "/images/by-invitation.jpg",
      noIndex: false
    },
    'she-rise': {
      title: "SHE RISE | Empowering Women in Wealth, Leadership & Real Estate Ownership",
      description: "An affirmative wealth creation and property advisory initiative by ARWIN RISE fostering independent real estate ownership and executive leadership for women.",
      keywords: "she rise, women empowerment real estate, women property buyers india, female real estate investors hyderabad",
      ogImage: "/images/she-rise-hero.jpg",
      noIndex: false
    },
    'golden-circle': {
      title: "The Golden Circle | Elite Investor Syndicate & Private Wealth Club",
      description: "An invitation-only alliance of High-Net-Worth Individuals, Family Offices, and Global NRI Visionaries gaining preferential access to institutional-grade luxury real estate opportunities.",
      keywords: "the golden circle, luxury real estate syndicate, hni property club india, private real estate allocations hyderabad, off-market penthouses",
      ogImage: "/images/golden-circle-hero.jpg",
      noIndex: false
    },
    residences: {
      title: "Curated Residences & Penthouses | ARWIN RISE",
      description: "Explore our handpicked portfolio of Grade-A luxury high-rises, sky villas, and signature estates starting from ₹1.5 Cr to ₹35 Cr+ in Hyderabad & Dubai.",
      keywords: "hyderabad luxury residences, kokapet sky villas, financial district 4bhk, jubilee hills estates, rera registered luxury homes",
      ogImage: "/images/curated-residences.jpg",
      noIndex: false
    },
    investors: {
      title: "Investor Advantage & Capital Growth Corridors | ARWIN RISE",
      description: "Institutional real estate investment advisory, corridor CAGR projections, and yield analytics across Hyderabad's highest appreciating micro-markets.",
      keywords: "hyderabad real estate investment, kokapet cagr, neopolis commercial growth, high yield residential assets india",
      ogImage: "/images/hero-luxury-penthouse.jpg",
      noIndex: false
    },
    nriConnect: {
      title: "NRI Connect & Cross-Border Wealth Advisory | ARWIN RISE",
      description: "Dedicated foreign exchange, FEMA compliance, power-of-attorney facilitation, and high-yield property curation for US, UK, UAE & Singapore NRI patrons.",
      keywords: "nri property buying hyderabad, fema compliance real estate, repatriation india property, nri wealth advisory dubai",
      ogImage: "/images/dubai-skyline.jpg",
      noIndex: false
    },
    contact: {
      title: "Private Client Concierge & Locations | ARWIN RISE",
      description: "Connect directly with our Private Client Desk in Hyderabad (Miyapur) or Dubai (Marina Plaza) for confidential consultations.",
      keywords: "contact arwin rise, luxury real estate hyderabad office, dubai marina property desk",
      ogImage: "/images/hero-luxury-penthouse.jpg",
      noIndex: false
    },
    news: {
      title: "Market Intelligence & Luxury Real Estate Reports | ARWIN RISE",
      description: "Exclusive quarterly macroeconomic briefs, infrastructure catalysts, and regulatory insights shaping Hyderabad and Dubai's prime property sectors.",
      keywords: "hyderabad property market reports, luxury real estate trends 2026, rera market intelligence",
      ogImage: "/images/hero-luxury-penthouse.jpg",
      noIndex: false
    }
  }
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brandName: "ARWIN RISE",
  tagline: "Life Starts Here · Private Property Advisory",
  primaryPhone: "+91 84649 55321",
  displayPhone: "+91 84649 55321",
  whatsappPhone: "918464955321",
  publicContactEmail: "concierge@arwinrise.com",
  leadTargetEmail: "kamalyellapragada@gmail.com",
  officeAddressHyderabad: "Plot No 102, HMT Swarnapuri Colony, Miyapur, Ranga Reddy, Telangana, 500050",
  officeAddressDubai: "Suite 2104, Marina Plaza, Dubai Marina, Dubai, UAE",
  companyDivision: "A division of ARWIN TRADERS PRIVATE LIMITED",
  gstNumber: "36AATCA2960K1Z6",
  reraNumberHyderabad: "P02400008192",
  reraNumberDubai: "ORN 29481",
  instagramUrl: "https://instagram.com",
  facebookUrl: "https://facebook.com",
  linkedinUrl: "https://linkedin.com",
  youtubeUrl: "https://youtube.com",
  metaTitle: "ARWIN RISE | Life Starts Here · Private Property Advisory",
  metaDescription: "ARWIN RISE — Life Starts Here. Bespoke private luxury residences and property advisory in Hyderabad and Dubai for discerning Indian buyers and international NRI investors.",
  
  // Brand Logos
  logoDarkUrl: "/images/arwin-rise-lockup.png",
  logoLightUrl: "/images/arwin-rise-lockup-light.png",
  logoSymbolUrl: "/images/arwin-rise-symbol.png",

  // Navigation Links & Header Action
  navLinks: [
    { id: 'nav-home', label: 'HOME', page: 'home', isVisible: true },
    { id: 'nav-about', label: 'ABOUT US', page: 'about', isVisible: true },
    { id: 'nav-residences', label: 'RESIDENCES', page: 'residences', isVisible: true },
    { id: 'nav-golden-circle', label: 'GOLDEN CIRCLE', page: 'golden-circle', isVisible: true },
    { id: 'nav-nri', label: 'NRI CONNECT', page: 'nri-connect', isVisible: true },
    { id: 'nav-contact', label: 'CONTACT', page: 'contact', isVisible: true }
  ],
  navCtaText: "POST PROPERTY"
};

export const DEFAULT_PARTNER_SECTION: PartnerSectionData = {
  tag: "CAREERS & STRATEGIC PARTNERSHIPS",
  badgeNote: "(Only serious professionals — Preferably freshers)",
  headlineMain: "Partner With Us.",
  headlineAccent: "For the Most Rewarding Real Estate Career.",
  description: "Represent ₹1.5 Cr – ₹35 Cr+ luxury portfolios with 1-on-1 executive mentorship and industry-leading transparent incentives.",
  whatsappCtaText: "APPLY VIA WHATSAPP",
  whatsappMessage: "Hello Arwin Rise Hiring Desk, I am a serious professional interested in the Real Estate Career opportunity.",
  modalCtaText: "SUBMIT RESUME",
  isVisible: true
};

export const DEFAULT_SELLER_DESK: SellerDeskData = {
  tag: "PRIVATE SELLER DESK",
  headlineMain: "List Your Property.",
  headlineAccent: "Private Representation.",
  description: "Discreet off-market advisory and direct access to qualified Grade-A, Elite & Global NRI buyers for Hyderabad's luxury residences.",
  stats: [
    { value: '₹ 1.5 Cr+', label: 'Grade-A Standard' },
    { value: '100%', label: 'Off-Market Privacy' },
    { value: '4,500+', label: 'Elite & NRI Buyers' },
    { value: '48 Hrs', label: 'Buyer Matching' }
  ],
  image: '/images/villa-triplex-interior.jpg',
  quote: "“Your luxury asset deserves an advisory-first presentation—commanding true valuation without public portal exposure.”",
  primaryCtaText: "POST LUXURY PROPERTY",
  whatsappCtaText: "WHATSAPP SELLER DESK",
  whatsappMessage: "Hello Arwin Rise Seller Desk, I would like to list my Grade-A luxury property for private advisory.",
  footnote: "* Note: We only take up Grade-A luxury residences worth ₹1.5 Crore and above.",
  isVisible: true
};

export const DEFAULT_PRELOADER_CONFIG: PreloaderConfig = {
  isEnabled: true,
  durationSeconds: 4.5,
  bottomBadge: "CONFIDENTIAL PRIVATE PORTFOLIO",
  messages: [
    {
      id: 'pre-1',
      tag: "PRIVATE PROPERTY ADVISORY",
      quote: "Exceptional residences. Carefully selected.",
      sub: "Curated for discerning homebuyers & global wealth creators."
    },
    {
      id: 'pre-2',
      tag: "OUR CORE PHILOSOPHY",
      quote: "Life Starts Here.",
      sub: "Where rare architectural addresses meet your family's next great chapter."
    }
  ]
};

export const DEFAULT_INVESTORS_PAGE: InvestorsPageData = {
  heroTag: "INVESTOR ADVANTAGE",
  heroTitle: "Today's Investments. Tomorrow's Legacy.",
  heroSubtitle: "Data-driven real estate wealth creation across Hyderabad's highest-appreciating luxury corridors, backed by institutional governance and verified title diligence.",
  
  simulatorTag: "PORTFOLIO SIMULATOR",
  simulatorTitle: "Corridor Capital Appreciation Estimator",
  simulatorSubtitle: "Dynamic projections based on 2018–2026 market benchmarks",
  
  corridorsTag: "MICRO-MARKET INTELLIGENCE",
  corridorsTitle: "High-Growth Investment Corridors",
  corridors: [
    {
      id: 'kokapet',
      name: 'Kokapet Golden Mile & Neopolis',
      subtitle: 'The epicenter of ultra-luxury high-rises and commercial expansion.',
      cagrRate: 0.188,
      rentalRate: 0.045,
      cagrLabel: '18.8% YoY',
      rentalYieldLabel: '4.5% - 5.2%',
      infraCatalyst: 'Upcoming 8-lane Trumpet Interchange, Metro Phase 2 Extension, 100M+ sq.ft Grade-A Commercial Parks',
      highlights: [
        'Highest land value appreciation in South India',
        'Zero traffic commute to IT campuses',
        'World-class 100-ft master-planned trunk infrastructure'
      ]
    },
    {
      id: 'financial-district',
      name: 'Financial District Core',
      subtitle: 'Hyderabad’s global financial hub with sustained high rental demand.',
      cagrRate: 0.165,
      rentalRate: 0.048,
      cagrLabel: '16.5% YoY',
      rentalYieldLabel: '4.8% - 5.5%',
      infraCatalyst: 'Direct ORR connectivity, Top Global MNC Hubs (Google, Apple, Microsoft, Amazon), Premium High-Rises',
      highlights: [
        '100% corporate occupancy rate',
        'Favored by CXOs, global founders, and high-net-worth individuals',
        'IGBC Platinum Pre-Certified sustainable high-rises'
      ]
    },
    {
      id: 'shankarpally',
      name: 'Shankarpally Eco Corridor',
      subtitle: 'Low-density gated villa communities nestled in nature.',
      cagrRate: 0.152,
      rentalRate: 0.038,
      cagrLabel: '15.2% YoY',
      rentalYieldLabel: '3.8% - 4.4%',
      infraCatalyst: 'Regional Ring Road (RRR) zone, low-density luxury villa estates, pristine nature sanctuaries',
      highlights: [
        'Proximity to Regional Ring Road (RRR)',
        'High capital upside for plotted & luxury villa developments',
        'Resort-style lifestyle with organic farm-to-table estates'
      ]
    }
  ],
  
  pillarsTag: "THE ARWIN ADVANTAGE",
  pillarsTitle: "Why Institutional Investors Trust Us",
  pillars: [
    {
      id: 'pillar-1',
      title: '100% RERA & Clear Title',
      description: 'Zero encumbrance, audited ownership trail, and pre-approved home loan status with tier-1 banks.'
    },
    {
      id: 'pillar-2',
      title: 'Strategic Corridors',
      description: 'Properties located strictly within master-planned high-density commercial & IT catchment zones.'
    },
    {
      id: 'pillar-3',
      title: 'Asset Quality & Finishes',
      description: 'Engineered with Italian marble, German fixtures, seismic-resistant RC structures, and IGBC standards.'
    },
    {
      id: 'pillar-4',
      title: 'Concierge Exit Support',
      description: 'Dedicated asset management team facilitating leasing, tenant management, and secondary market liquidation.'
    }
  ]
};

export const DEFAULT_NRI_PAGE: NriPageData = {
  heroTag: "GLOBAL NRI DESK",
  heroTitle: "Closer to Home. Always.",
  heroSubtitle: "Trusted by 300+ NRI patrons across North America, Europe, the Middle East, and Asia for effortless, transparent real estate investments in Hyderabad.",
  
  featureTag: "SEAMLESS CROSS-BORDER INVESTMENT",
  featureTitle: "Invest in India's #1 Real Estate Market from Anywhere in the World",
  featureDescription: "Hyderabad’s rapid infrastructure growth and stable currency appreciation make it the prime investment destination for global Indians. We eliminate the complexities of remote buying through verified legal compliance and timezone-dedicated advisors.",
  featureBullets: [
    "Zero Physical Travel Required",
    "100% Repatriable Capital Guidance",
    "Consular PoA Assistance",
    "24/7 Global NRI Concierge Desk"
  ],
  featureCtaText: "BOOK 1-ON-1 NRI CONSULTATION",
  featureImage: "/images/nri-exec.jpg",
  
  calculatorTag: "FINANCIAL TOOLS",
  calculatorTitle: "Global Currency Estimator",
  calculatorSubtitle: "Estimate your investment equivalent across major international currencies.",
  exchangeRates: {
    USD: 87.2,
    AED: 23.7,
    GBP: 110.5,
    EUR: 91.8,
    SGD: 64.8,
    CAD: 61.2
  },
  
  stepsTag: "STEP-BY-STEP PROCESS",
  stepsTitle: "How Remote Property Acquisition Works",
  steps: [
    {
      id: 'step-1',
      step: '01',
      title: 'Virtual 4K Site & Drone Tour',
      desc: 'Experience high-definition 360° architectural tours, live floor plan previews, and real-time sunset balcony view simulations with our senior architects.'
    },
    {
      id: 'step-2',
      step: '02',
      title: 'FEMA & Banking Structuring',
      desc: 'Seamless guidance on setting up NRE/NRO accounts, wire transfers in compliance with Reserve Bank of India (RBI) guidelines, and tax optimization.'
    },
    {
      id: 'step-3',
      step: '03',
      title: 'Digital Legal Diligence & PoA',
      desc: 'Complete transparent legal verification. Consular Power of Attorney (PoA) attestation and registration handled end-to-end without requiring physical travel.'
    },
    {
      id: 'step-4',
      step: '04',
      title: 'Turnkey Asset & Tenant Management',
      desc: 'From key handover to bespoke luxury interior fit-outs, tenant screening, rental collection, and maintenance—managed by your dedicated client partner.'
    }
  ],
  
  timezoneTag: "24/7 TIMEZONE-ALIGNED CONCIERGE",
  timezoneTitle: "Connect at your local business hours.",
  timezoneDescription: "Our NRI desk operates aligned with US (PST / EST), UK (GMT), Gulf (GST), and Singapore (SGT) hours for uninterrupted advisory.",
  timezoneCtaText: "SCHEDULE PRIVATE VIDEO CALL"
};

export const DEFAULT_ABOUT_PAGE: AboutPageData = {
  heroTag: "OUR HERITAGE & LEADERSHIP · LIFE STARTS HERE",
  heroTitle: "Built on Values. Driven by Relationships.",
  heroSubtitle: "For over a decade, ARWIN RISE has guided luxury homebuyers, HNIs, and global NRI investors with uncompromising fiduciary integrity and bespoke property advisory.",
  
  philosophyTag: "OUR ADVISORY PHILOSOPHY",
  philosophyHeadline: "“Real estate is not just about properties—it's about people, possibilities, and where your next chapter begins. Life Starts Here.”",
  philosophyParagraphs: [
    "When we established ARWIN RISE, our core commitment was simple: to create a trusted advisory standard that stands as an enduring pillar for homebuyers and wealth creators. Every transaction and portfolio we curate is guided by uncompromising due diligence and deep fiduciary commitment.",
    "With over ₹4,500 Cr+ in advised luxury portfolio, 12+ years of market mastery, and 350+ elite families guided across India and the UAE, ARWIN RISE delivers high appreciation assets and end-to-end peace of mind."
  ],
  philosophyImage: "/images/founder-pro.jpg",

  // Founder & Leadership Details
  founderName: "Kamal Yellapragada",
  founderTitle: "FOUNDER & MANAGING DIRECTOR",
  founderSubtitle: "Property Expert & NRI Portfolio Manager · Business Coach",
  founderImage: "/images/founder-pro.jpg",
  founderQuote: "“Real estate is not just about properties—it's about people, possibilities, and where your next chapter begins. Life Starts Here.”",
  founderParagraphs: [
    "When establishing ARWIN RISE, our core mandate was straightforward: to replace traditional broker friction with institutional-grade, fiduciary advisory. Every property we represent undergoes exhaustive 30+ year legal forensics, title verification, and valuation modeling before reaching our patrons.",
    "Whether curating ultra-luxury sky villas in Neopolis, bespoke farm retreats in Shankarpally, or strategic overseas allocations in Dubai, our commitment remains absolute: safeguarding our patrons' wealth and unlocking enduring generational appreciation."
  ],
  founderDesk: "FOUNDER'S DESK · HYDERABAD & DUBAI",
  
  advisoryName: "Arwin Advisory Desk",
  advisoryDesk: "PRIVATE CLIENT GROUP",
  advisoryLocation: "Neopolis, Hyderabad · International Wealth Desk",
  
  pillarsTag: "OUR FOUNDATION",
  pillarsTitle: "Four Pillars of Advisory Excellence",
  pillars: [
    {
      id: 'pillar-1',
      title: 'Radical Transparency',
      desc: '100% RERA registered developments, unblemished title ownership trails, and zero hidden escalation clauses.'
    },
    {
      id: 'pillar-2',
      title: 'Architectural Mastery',
      desc: 'Collaborations with award-winning international architects, double-height sky pavilions, and bespoke spatial layouts.'
    },
    {
      id: 'pillar-3',
      title: 'Sustainable Luxury',
      desc: 'IGBC Platinum pre-certified green structures, rainwater harvesting, solar integration, and low carbon-footprint concrete.'
    },
    {
      id: 'pillar-4',
      title: 'Lifelong Patron Care',
      desc: 'Dedicated post-possession concierge, bespoke interior execution services, and dedicated resale / rental asset support.'
    }
  ]
};

export const DEFAULT_CUSTOM_PAGES: CustomPage[] = [
  {
    id: 'page-legal-diligence',
    slug: 'legal-diligence',
    title: 'Legal Due Diligence & Fiduciary Title Desk',
    navLabel: 'LEGAL DILIGENCE',
    showInNav: false,
    showInFooter: true,
    isPublished: true,
    heroTag: 'FIDUCIARY GOVERNANCE',
    heroHeadline: 'Institutional Title Diligence & Legal Advisory',
    heroSubtitle: 'Every residence represented by ARWIN RISE undergoes rigorous 30-year title verification, RERA compliance audits, and structural certification.',
    heroImage: '/images/by-invitation.jpg',
    seoTitle: 'Legal Due Diligence & Title Verification | ARWIN RISE',
    seoDescription: 'Uncompromising legal and title due diligence for luxury real estate transactions in Hyderabad and Dubai.',
    seoKeywords: 'real estate legal diligence hyderabad, rera compliance check, property title verification',
    ogImage: '/images/by-invitation.jpg',
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-03-01T00:00:00.000Z',
    sections: [
      {
        id: 'sec-story-1',
        type: 'rich_text_media',
        title: 'Our Zero-Compromise Fiduciary Mandate',
        subtitle: 'Protecting your family’s wealth across generations',
        content: 'At ARWIN RISE, due diligence is not a post-agreement checklist—it is the non-negotiable prerequisite to representation. Before any project is offered to our patrons, our senior legal counsel conducts exhaustive title link searches spanning 30+ years, scrutinizes revenue records, municipal sanctions, and environmental clearances.\n\nWe ensure that our homebuyers step into their dream residences with total legal sanctity, zero litigation risk, and complete peace of mind.',
        image: '/images/villa-triplex-interior.jpg',
        imagePosition: 'right',
        quote: '“True luxury begins with absolute title certainty and legal peace of mind.”',
        isVisible: true,
        order: 1
      },
      {
        id: 'sec-pillars-1',
        type: 'feature_grid',
        title: 'Four Layers of Legal Diligence',
        subtitle: 'Comprehensive audits conducted on every single asset',
        items: [
          {
            id: 'item-1',
            title: '30-Year Title Search',
            description: 'Exhaustive title tracing across revenue records, encumbrance certificates, and registrar databases.',
            tag: 'Layer 01'
          },
          {
            id: 'item-2',
            title: 'RERA & Sanction Audits',
            description: 'Verification of GHMC/HMDA building permits, RERA bank escrow compliance, and commencement certificates.',
            tag: 'Layer 02'
          },
          {
            id: 'item-3',
            title: 'No-Litigation Due Diligence',
            description: 'Comprehensive screening across High Court, civil court registries, and DRT databases for zero active disputes.',
            tag: 'Layer 03'
          },
          {
            id: 'item-4',
            title: 'Bespoke Tripartite Contracts',
            description: 'Protection of patron interests with customized bilateral and tripartite agreements safeguarding milestones.',
            tag: 'Layer 04'
          }
        ],
        isVisible: true,
        order: 2
      },
      {
        id: 'sec-stats-1',
        type: 'stats_counter',
        title: 'Fiduciary Track Record',
        subtitle: 'Excellence built on flawless execution',
        stats: [
          { value: '100%', label: 'RERA & HMDA Sanctioned', sublabel: 'Zero deviation policy' },
          { value: '30+ Yrs', label: 'Title Trace Audits', sublabel: 'Clean ownership link' },
          { value: '₹4,500 Cr+', label: 'Protected Transactions', sublabel: 'Zero title disputes' },
          { value: '48 Hrs', label: 'Diligence Dossier Turnaround', sublabel: 'Prior to token advance' }
        ],
        isVisible: true,
        order: 3
      },
      {
        id: 'sec-faqs-1',
        type: 'faq_accordion',
        title: 'Frequently Asked Legal Questions',
        subtitle: 'Clarity on real estate documentation and due diligence',
        faqs: [
          {
            question: 'What documents are verified before presenting a property?',
            answer: 'We verify the registered sale deeds, parent title deeds dating back 30 years, encumbrance certificates (EC), HMDA/GHMC sanctioned layout & floor plans, RERA registration certificate, land conversion certificates (NA/NALA), and statutory pollution/environmental NOCs.'
          },
          {
            question: 'Can NRI patrons execute transactions without travelling to India?',
            answer: 'Yes. We facilitate end-to-end Power of Attorney (PoA) adjudication at the local Indian consulate / embassy, KYC documentation, and seamless remote registration support.'
          },
          {
            question: 'How do you ensure escrow compliance under RERA?',
            answer: 'We independently verify that the developer maintains a dedicated 70% project escrow account with scheduled bank audits, ensuring that funds are utilized strictly for project development.'
          }
        ],
        isVisible: true,
        order: 4
      },
      {
        id: 'sec-cta-1',
        type: 'cta_banner',
        title: 'Request a Private Legal Diligence Dossier',
        subtitle: 'Receive verified title reports and RERA diligence notes for your shortlisted luxury residences.',
        ctaText: 'SCHEDULE PRIVATE CONSULTATION',
        ctaLink: 'preview',
        ctaVariant: 'primary',
        secondaryCtaText: 'WHATSAPP LEGAL DESK',
        secondaryCtaLink: 'whatsapp',
        isVisible: true,
        order: 5
      }
    ]
  },
  {
    id: 'page-dubai-desk',
    slug: 'dubai-desk',
    title: 'Dubai International Wealth & Golden Visa Desk',
    navLabel: 'DUBAI DESK',
    showInNav: false,
    showInFooter: true,
    isPublished: true,
    heroTag: 'INTERNATIONAL DESK',
    heroHeadline: 'Cross-Border Real Estate & Dubai Golden Visa Advisory',
    heroSubtitle: 'Access high-yield prime Dubai penthouses, branded waterfront residences, and 10-year Golden Visa advisory with seamless INR / AED remittance compliance.',
    heroImage: '/images/dubai-skyline.jpg',
    seoTitle: 'Dubai Real Estate & Golden Visa Advisory | ARWIN RISE',
    seoDescription: 'Bespoke Dubai luxury property curation (Downtown, Marina, Palm Jumeirah) and 10-Year UAE Golden Visa facilitation for Indian patrons.',
    seoKeywords: 'dubai luxury real estate for indians, dubai golden visa property, palm jumeirah penthouses, dubai marina apartments',
    ogImage: '/images/dubai-skyline.jpg',
    createdAt: '2026-02-01T00:00:00.000Z',
    updatedAt: '2026-03-01T00:00:00.000Z',
    sections: [
      {
        id: 'sec-dubai-story',
        type: 'rich_text_media',
        title: 'Your Direct Gateway to Dubai Prime Portfolios',
        subtitle: 'Tax-free rental yields and 10-year Golden Visa residency for your family',
        content: 'ARWIN RISE maintains a dedicated Private Client Desk in Marina Plaza, Dubai Marina, catering to Indian high-net-worth families, enterprise founders, and investors seeking tax-efficient global wealth diversification.\n\nFrom off-plan luxury towers by master developers to ready waterfront mansions on Palm Jumeirah and Dubai Hills Estate, we handle property selection, DLD registration, escrow remittances (LRS compliance), and Golden Visa processing end-to-end.',
        image: '/images/dubai-skyline.jpg',
        imagePosition: 'left',
        quote: '“Dubai combines world-class infrastructure, zero capital gains tax, and high foreign currency rental yields.”',
        isVisible: true,
        order: 1
      },
      {
        id: 'sec-dubai-stats',
        type: 'stats_counter',
        title: 'The Dubai Investment Benchmark',
        subtitle: 'Key advantages for Indian property owners',
        stats: [
          { value: '7% - 9%', label: 'Gross Rental Yields', sublabel: 'High ROI in USD/AED' },
          { value: '0% Tax', label: 'Income & Capital Gains', sublabel: 'Complete tax exemption' },
          { value: 'AED 2M+', label: 'Golden Visa Threshold', sublabel: '10-year renewable residency' },
          { value: '100%', label: 'Freehold Ownership', sublabel: 'For foreign nationals' }
        ],
        isVisible: true,
        order: 2
      },
      {
        id: 'sec-dubai-cta',
        type: 'cta_banner',
        title: 'Explore Curated Dubai Prime Assets',
        subtitle: 'Speak with our Dubai Wealth Advisory Director for private off-market previews.',
        ctaText: 'REQUEST DUBAI PORTFOLIO',
        ctaLink: 'nri',
        ctaVariant: 'primary',
        secondaryCtaText: 'WHATSAPP DUBAI CONCIERGE',
        secondaryCtaLink: 'whatsapp',
        isVisible: true,
        order: 3
      }
    ]
  }
];

export const DEFAULT_LISTING_SUBMISSIONS: PropertyListingSubmission[] = [
  {
    id: 'ARW-LIST-982143',
    userId: 'usr-demo-seller',
    ownerName: 'Rajesh Patel',
    phone: '+91 98490 12345',
    email: 'rajesh.patel@horizon.com',
    propertyTitle: 'The Peak Sky Mansion & Private Pool',
    location: 'Kokapet, Neopolis Corridor',
    city: 'Hyderabad',
    propertyType: '4 & 5 BHK Sky Mansion',
    configuration: '5 BHK + Staff Quarters + Private Plunge Pool',
    sizeSft: '7,450',
    expectedPrice: '₹ 12.80 Cr',
    priceStartingFormatted: '₹12.80 Cr',
    priceNumCr: 12.8,
    targetTierId: 'tier-01',
    description: 'Ultra-exclusive double-height corner sky residence in Neopolis with private infinity pool, Italian marble finishes, 4 car parks, and 360-degree panoramic skyline views.',
    highlights: 'Double-Height Living Room, Private Heated Plunge Pool, 100% Vastu East Facing, 4 Reserved Basement Car Parks, TS RERA Approved',
    amenities: ['Private Elevator Access', 'Heated Sky Pool', 'Home Automation', 'Italian Marble', 'Staff Suite'],
    images: [
      '/images/hero-4k-1.jpg',
      '/images/villa-triplex-interior.jpg',
      '/images/feat-1.jpg'
    ],
    status: 'pending',
    submittedAt: '2026-03-05T14:20:00.000Z'
  },
  {
    id: 'ARW-LIST-731902',
    userId: 'usr-vikram-rao',
    ownerName: 'Vikramaditya Rao',
    phone: '+971 50 123 4567',
    email: 'vikram.rao@dubaiholding.ae',
    propertyTitle: 'Emaar Beachfront Panoramic Sky Penthouse',
    location: 'Dubai Marina & Beachfront',
    city: 'Dubai',
    propertyType: 'Ultra-Luxury Penthouse',
    configuration: '4 BHK Duplex Penthouse',
    sizeSft: '5,800',
    expectedPrice: 'AED 19.5M (₹ 44.5 Cr)',
    priceStartingFormatted: 'AED 19.5M',
    priceNumCr: 44.5,
    targetTierId: 'tier-03',
    description: 'Full-floor waterfront penthouse with direct Palm Jumeirah vistas, private yacht berth access, and eligibility for 10-Year UAE Golden Visa.',
    highlights: 'Direct Palm Jumeirah Views, Private Yacht Berth, 10-Year UAE Golden Visa Included, Zero Property Tax',
    images: [
      '/images/dubai-collection.jpg',
      '/images/hero-slide-4.jpg'
    ],
    status: 'under_audit',
    adminFeedback: 'Title deed and DLD registration dossier under verification with Dubai Land Department.',
    submittedAt: '2026-03-02T11:00:00.000Z',
    reviewedAt: '2026-03-03T16:30:00.000Z'
  },
  {
    id: 'ARW-LIST-410592',
    userId: 'usr-ananya-reddy',
    ownerName: 'Dr. Ananya Reddy',
    phone: '+91 99887 76655',
    email: 'ananya.reddy@apollohealth.org',
    propertyTitle: 'Jubilee Hills Signature Estate Villa',
    location: 'Road No. 36, Jubilee Hills',
    city: 'Hyderabad',
    propertyType: 'Triplex / Gated Villa',
    configuration: '6 BHK Palatial Triplex Estate',
    sizeSft: '9,200',
    expectedPrice: '₹ 28.50 Cr',
    priceStartingFormatted: '₹28.50 Cr',
    priceNumCr: 28.5,
    targetTierId: 'tier-01',
    description: 'Heritage architectural mansion nestled in prime Jubilee Hills with private landscaped zen courtyard, private spa, and smart-climate wine cellar.',
    highlights: '750 Sq.Yds Plot, 100% Clear Title Freehold, Custom Infinity Waterfalls, Private Elevator',
    images: [
      '/images/feat-2.jpg',
      '/images/breeze-courtyard.jpg',
      '/images/villa-triplex-interior.jpg'
    ],
    status: 'approved',
    approvedProjectId: 'jubilee-estate-signature',
    submittedAt: '2026-02-20T09:15:00.000Z',
    reviewedAt: '2026-02-21T18:00:00.000Z'
  }
];

export const DEMO_SELLER_USER: User = {
  id: 'usr-demo-seller',
  name: 'Rajesh Patel',
  email: 'rajesh.patel@horizon.com',
  phone: '+91 98490 12345',
  role: 'seller',
  createdAt: '2026-01-15T10:00:00.000Z'
};

const STORAGE_KEY = 'arwin_rise_dynamic_content_v1';
const AUTH_KEY = 'arwin_rise_admin_session';
const USER_KEY = 'arwin_rise_user_session';

interface ContentContextType {
  // State
  featuredProjects: FeaturedProject[];
  collectionTiers: CollectionTier[];
  heroSlides: HeroSlide[];
  newsArticles: NewsArticle[];
  testimonials: Testimonial[];
  stats: StatItem[];
  settings: SiteSettings;
  leads: LeadRecord[];
  mediaGallery: MediaItem[];
  partnerSection: PartnerSectionData;
  sellerDesk: SellerDeskData;
  preloaderConfig: PreloaderConfig;
  investorsPage: InvestorsPageData;
  nriPage: NriPageData;
  aboutPage: AboutPageData;
  seoSettings: SeoSettings;
  customPages: CustomPage[];
  listingSubmissions: PropertyListingSubmission[];

  // Patron / Seller User Auth
  currentUser: User | null;
  userLogin: (email: string, password?: string) => User | null;
  userSignup: (data: { name: string; email: string; phone: string; password?: string; role?: 'seller' | 'patron'; isEmailVerified?: boolean }) => User;
  userLogout: () => void;

  // Seller Listing Requests Actions
  submitPropertyListing: (data: Omit<PropertyListingSubmission, 'id' | 'status' | 'submittedAt'>) => PropertyListingSubmission;
  updateListingSubmission: (id: string, patch: Partial<PropertyListingSubmission>) => void;
  approveAndPublishListing: (submissionId: string, publishConfig?: { tierId?: string; heroImage?: string; projectName?: string; startingPrice?: string }) => FeaturedProject | null;
  rejectListingSubmission: (submissionId: string, reason: string) => void;
  deleteListingSubmission: (id: string) => void;
  
  // Admin Auth
  isAdminAuthenticated: boolean;
  adminLogin: (password: string) => boolean | Promise<boolean>;
  adminLogout: () => void;
  
  // Project Actions
  addProject: (project: FeaturedProject) => void;
  updateProject: (id: string, project: Partial<FeaturedProject>) => void;
  deleteProject: (id: string) => void;
  
  // Collection Actions
  updateCollectionTier: (id: string, tier: Partial<CollectionTier>) => void;
  
  // Hero Slide Actions
  addHeroSlide: (slide: HeroSlide) => void;
  updateHeroSlide: (id: string, slide: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: string) => void;
  
  // News Actions
  addNewsArticle: (article: NewsArticle) => void;
  updateNewsArticle: (id: string, article: Partial<NewsArticle>) => void;
  deleteNewsArticle: (id: string) => void;
  
  // Testimonial Actions
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  // Stats Actions
  updateStats: (stats: StatItem[]) => void;
  
  // Settings & Lead Actions
  updateSettings: (settings: Partial<SiteSettings>) => void;
  updateSeoSettings: (settings: Partial<SeoSettings>) => void;
  addLead: (lead: Omit<LeadRecord, 'id' | 'timestamp' | 'status'> & Partial<LeadRecord>) => void;
  updateLeadStatus: (id: string, status: LeadRecord['status'], notes?: string) => void;
  deleteLead: (id: string) => void;
  
  // Media Gallery Actions
  addMediaItem: (item: MediaItem) => void;
  deleteMediaItem: (id: string) => void;
  uploadImageFile: (file: File, category?: MediaItem['category']) => Promise<string>;

  // Section Actions
  updatePartnerSection: (data: Partial<PartnerSectionData>) => void;
  updateSellerDesk: (data: Partial<SellerDeskData>) => void;
  updatePreloaderConfig: (data: Partial<PreloaderConfig>) => void;
  updateInvestorsPage: (data: Partial<InvestorsPageData>) => void;
  updateNriPage: (data: Partial<NriPageData>) => void;
  updateAboutPage: (data: Partial<AboutPageData>) => void;

  // Custom Pages & Sections Actions
  addCustomPage: (page: CustomPage) => void;
  updateCustomPage: {
    (id: string, page: Partial<CustomPage>): void;
    (page: CustomPage): void;
  };
  deleteCustomPage: (id: string) => void;
  addPageSection: (pageId: string, section: PageSectionBlock) => void;
  updatePageSection: {
    (pageId: string, sectionId: string, section: Partial<PageSectionBlock>): void;
    (pageId: string, section: PageSectionBlock): void;
  };
  deletePageSection: (pageId: string, sectionId: string) => void;
  reorderPageSections: {
    (pageId: string, sections: PageSectionBlock[]): void;
    (pageId: string, fromIndex: number, toIndex: number): void;
  };

  // Utilities
  resetToDefaults: () => void;
  syncWithServer: () => Promise<void>;
  exportDataJson: () => string;
  importDataJson: (jsonData: string) => boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Initialize State with localStorage cache fallback or defaults
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>(() => {
    try {
      const cached = localStorage.getItem(`${STORAGE_KEY}_projects`);
      return cached ? JSON.parse(cached) : FEATURED_PROJECTS;
    } catch {
      return FEATURED_PROJECTS;
    }
  });

  const [collectionTiers, setCollectionTiers] = useState<CollectionTier[]>(() => {
    try {
      const cached = localStorage.getItem(`${STORAGE_KEY}_collections`);
      return cached ? JSON.parse(cached) : COLLECTIONS;
    } catch {
      return COLLECTIONS;
    }
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    try {
      const cached = localStorage.getItem(`${STORAGE_KEY}_hero`);
      return cached ? JSON.parse(cached) : HERO_SLIDES;
    } catch {
      return HERO_SLIDES;
    }
  });

  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(() => {
    try {
      const cached = localStorage.getItem(`${STORAGE_KEY}_news`);
      return cached ? JSON.parse(cached) : NEWS_ARTICLES;
    } catch {
      return NEWS_ARTICLES;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const cached = localStorage.getItem(`${STORAGE_KEY}_testimonials`);
      return cached ? JSON.parse(cached) : DEFAULT_TESTIMONIALS;
    } catch {
      return DEFAULT_TESTIMONIALS;
    }
  });

  const [stats, setStats] = useState<StatItem[]>(() => {
    try {
      const cached = localStorage.getItem(`${STORAGE_KEY}_stats`);
      return cached ? JSON.parse(cached) : STATS;
    } catch {
      return STATS;
    }
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const cached = localStorage.getItem(`${STORAGE_KEY}_settings`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.primaryPhone === "+91 84649 54321") parsed.primaryPhone = DEFAULT_SITE_SETTINGS.primaryPhone;
        if (parsed.displayPhone === "+91 84649 54321") parsed.displayPhone = DEFAULT_SITE_SETTINGS.displayPhone;
        if (parsed.whatsappPhone === "918464954321") parsed.whatsappPhone = DEFAULT_SITE_SETTINGS.whatsappPhone;
        if (parsed.officeAddressHyderabad && parsed.officeAddressHyderabad.includes("Galaxy Towers")) {
          parsed.officeAddressHyderabad = DEFAULT_SITE_SETTINGS.officeAddressHyderabad;
        }
        return { ...DEFAULT_SITE_SETTINGS, ...parsed };
      }
      return DEFAULT_SITE_SETTINGS;
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  });

  const [mediaGallery, setMediaGallery] = useState<MediaItem[]>(() => {
    try {
      const cached = localStorage.getItem(`${STORAGE_KEY}_media`);
      return cached ? JSON.parse(cached) : DEFAULT_MEDIA_GALLERY;
    } catch {
      return DEFAULT_MEDIA_GALLERY;
    }
  });

  const [partnerSection, setPartnerSection] = useState<PartnerSectionData>(() => {
    try {
      const cached = localStorage.getItem(`${STORAGE_KEY}_partner`);
      return cached ? { ...DEFAULT_PARTNER_SECTION, ...JSON.parse(cached) } : DEFAULT_PARTNER_SECTION;
    } catch {
      return DEFAULT_PARTNER_SECTION;
    }
  });

  const [sellerDesk, setSellerDesk] = useState<SellerDeskData>(() => {
    try {
      const cached = localStorage.getItem(`${STORAGE_KEY}_seller_desk`);
      return cached ? { ...DEFAULT_SELLER_DESK, ...JSON.parse(cached) } : DEFAULT_SELLER_DESK;
    } catch {
      return DEFAULT_SELLER_DESK;
    }
  });

  const [preloaderConfig, setPreloaderConfig] = useState<PreloaderConfig>(() => {
    try {
      const cached = localStorage.getItem(`${STORAGE_KEY}_preloader`);
      return cached ? { ...DEFAULT_PRELOADER_CONFIG, ...JSON.parse(cached) } : DEFAULT_PRELOADER_CONFIG;
    } catch {
      return DEFAULT_PRELOADER_CONFIG;
    }
  });

  const [investorsPage, setInvestorsPage] = useState<InvestorsPageData>(() => {
    try {
      const cached = localStorage.getItem(`${STORAGE_KEY}_investors_page`);
      return cached ? { ...DEFAULT_INVESTORS_PAGE, ...JSON.parse(cached) } : DEFAULT_INVESTORS_PAGE;
    } catch {
      return DEFAULT_INVESTORS_PAGE;
    }
  });

  const [nriPage, setNriPage] = useState<NriPageData>(() => {
    try {
      const cached = localStorage.getItem(`${STORAGE_KEY}_nri_page`);
      return cached ? { ...DEFAULT_NRI_PAGE, ...JSON.parse(cached) } : DEFAULT_NRI_PAGE;
    } catch {
      return DEFAULT_NRI_PAGE;
    }
  });

  const [aboutPage, setAboutPage] = useState<AboutPageData>(() => {
    try {
      const cached = localStorage.getItem(`${STORAGE_KEY}_about_page`);
      return cached ? { ...DEFAULT_ABOUT_PAGE, ...JSON.parse(cached) } : DEFAULT_ABOUT_PAGE;
    } catch {
      return DEFAULT_ABOUT_PAGE;
    }
  });

  const [seoSettings, setSeoSettings] = useState<SeoSettings>(() => {
    try {
      const cached = localStorage.getItem(`${STORAGE_KEY}_seo`);
      return cached ? { ...DEFAULT_SEO_SETTINGS, ...JSON.parse(cached) } : DEFAULT_SEO_SETTINGS;
    } catch {
      return DEFAULT_SEO_SETTINGS;
    }
  });

  const [customPages, setCustomPages] = useState<CustomPage[]>(() => {
    try {
      const cached = localStorage.getItem(`${STORAGE_KEY}_custom_pages`);
      return cached ? JSON.parse(cached) : DEFAULT_CUSTOM_PAGES;
    } catch {
      return DEFAULT_CUSTOM_PAGES;
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const cached = localStorage.getItem(USER_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const [listingSubmissions, setListingSubmissions] = useState<PropertyListingSubmission[]>(() => {
    const sanitizeSubmissionImages = (subs: PropertyListingSubmission[]) => {
      return subs.map(sub => {
        const cleanedImages = (sub.images || []).map(img => {
          if (!img || img === '/images/hero-luxury-penthouse.jpg') return '/images/hero-4k-1.jpg';
          if (img === '/images/hero-villa.jpg') return '/images/feat-2.jpg';
          return img;
        });
        return {
          ...sub,
          images: cleanedImages.length > 0 ? cleanedImages : ['/images/hero-4k-1.jpg']
        };
      });
    };

    try {
      const cached = localStorage.getItem(`${STORAGE_KEY}_listing_submissions`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return sanitizeSubmissionImages(parsed);
        }
      }
      return DEFAULT_LISTING_SUBMISSIONS;
    } catch {
      return DEFAULT_LISTING_SUBMISSIONS;
    }
  });

  const [leads, setLeads] = useState<LeadRecord[]>(() => {
    try {
      const cached = localStorage.getItem('arwin_rise_leads');
      if (cached) {
        const parsed = JSON.parse(cached);
        return parsed.map((item: any) => {
          if (item.data) {
            return {
              id: item.id || `LEAD-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
              timestamp: item.timestamp || new Date().toISOString(),
              formType: item.data.formType || 'General Inquiry',
              clientName: item.data.fullName || item.data.name || item.data.ownerName || 'Client',
              phone: item.data.phone || '',
              email: item.data.email || '',
              status: item.status || 'new',
              notes: item.notes || '',
              project: item.data.project || '',
              tier: item.data.tier || '',
              budget: item.data.budget || '',
              date: item.data.date || '',
              timeSlot: item.data.timeSlot || '',
              message: item.data.message || item.data.notes || '',
              additionalData: item.data
            };
          }
          return item;
        });
      }
      return [];
    } catch {
      return [];
    }
  });

  // Admin Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // 2. Persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(featuredProjects));
    } catch (e) { console.error('Failed to cache projects', e); }
  }, [featuredProjects]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_collections`, JSON.stringify(collectionTiers));
    } catch (e) { console.error('Failed to cache collections', e); }
  }, [collectionTiers]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_hero`, JSON.stringify(heroSlides));
    } catch (e) { console.error('Failed to cache hero slides', e); }
  }, [heroSlides]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_news`, JSON.stringify(newsArticles));
    } catch (e) { console.error('Failed to cache news', e); }
  }, [newsArticles]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_testimonials`, JSON.stringify(testimonials));
    } catch (e) { console.error('Failed to cache testimonials', e); }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_stats`, JSON.stringify(stats));
    } catch (e) { console.error('Failed to cache stats', e); }
  }, [stats]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(settings));
    } catch (e) { console.error('Failed to cache settings', e); }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_media`, JSON.stringify(mediaGallery));
    } catch (e) { console.error('Failed to cache media', e); }
  }, [mediaGallery]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_partner`, JSON.stringify(partnerSection));
    } catch (e) { console.error('Failed to cache partner section', e); }
  }, [partnerSection]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_seller_desk`, JSON.stringify(sellerDesk));
    } catch (e) { console.error('Failed to cache seller desk', e); }
  }, [sellerDesk]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_preloader`, JSON.stringify(preloaderConfig));
    } catch (e) { console.error('Failed to cache preloader config', e); }
  }, [preloaderConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_investors_page`, JSON.stringify(investorsPage));
    } catch (e) { console.error('Failed to cache investors page', e); }
  }, [investorsPage]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_nri_page`, JSON.stringify(nriPage));
    } catch (e) { console.error('Failed to cache NRI page', e); }
  }, [nriPage]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_about_page`, JSON.stringify(aboutPage));
    } catch (e) { console.error('Failed to cache About page', e); }
  }, [aboutPage]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_seo`, JSON.stringify(seoSettings));
    } catch (e) { console.error('Failed to cache SEO settings', e); }
  }, [seoSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_custom_pages`, JSON.stringify(customPages));
    } catch (e) { console.error('Failed to cache custom pages', e); }
  }, [customPages]);

  useEffect(() => {
    try {
      localStorage.setItem('arwin_rise_leads', JSON.stringify(leads));
    } catch (e) { console.error('Failed to cache leads', e); }
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_listing_submissions`, JSON.stringify(listingSubmissions));
    } catch (e) { console.error('Failed to cache listing submissions', e); }
  }, [listingSubmissions]);

  // 3. Optional Server Sync with Cloudflare Pages Functions / D1 API
  const syncWithServer = async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        if (data.featuredProjects) setFeaturedProjects(data.featuredProjects);
        if (data.collectionTiers) setCollectionTiers(data.collectionTiers);
        if (data.heroSlides) setHeroSlides(data.heroSlides);
        if (data.newsArticles) setNewsArticles(data.newsArticles);
        if (data.testimonials) setTestimonials(data.testimonials);
        if (data.stats) setStats(data.stats);
        if (data.settings) setSettings(prev => ({ ...prev, ...data.settings }));
        if (data.mediaGallery) setMediaGallery(data.mediaGallery);
        if (data.partnerSection) setPartnerSection(data.partnerSection);
        if (data.sellerDesk) setSellerDesk(data.sellerDesk);
        if (data.preloaderConfig) setPreloaderConfig(data.preloaderConfig);
        if (data.investorsPage) setInvestorsPage(data.investorsPage);
        if (data.nriPage) setNriPage(data.nriPage);
        if (data.aboutPage) setAboutPage(data.aboutPage);
        if (data.seoSettings) setSeoSettings(data.seoSettings);
        if (data.customPages) setCustomPages(data.customPages);
      }
    } catch {
      // Offline or local dev mode fallback to local state
    }
  };

  useEffect(() => {
    syncWithServer();
  }, []);

  const persistToServer = async (payload: Partial<ContentState>) => {
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch {}
  };

  // Auth Handlers
  const adminLogin = (password: string) => {
    const validPasswords = ['arwinrise2026', 'arwin2026', 'admin123'];
    if (validPasswords.includes(password.trim())) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  // Project Actions
  const addProject = (project: FeaturedProject) => {
    setFeaturedProjects(prev => {
      const next = [project, ...prev];
      persistToServer({ featuredProjects: next });
      return next;
    });
  };

  const updateProject = (id: string, updated: Partial<FeaturedProject>) => {
    setFeaturedProjects(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...updated } : p);
      persistToServer({ featuredProjects: next });
      return next;
    });
  };

  const deleteProject = (id: string) => {
    setFeaturedProjects(prev => {
      const next = prev.filter(p => p.id !== id);
      persistToServer({ featuredProjects: next });
      return next;
    });
  };

  // Collection Actions
  const updateCollectionTier = (id: string, updated: Partial<CollectionTier>) => {
    setCollectionTiers(prev => {
      const next = prev.map(c => c.id === id ? { ...c, ...updated } : c);
      persistToServer({ collectionTiers: next });
      return next;
    });
  };

  // Hero Slide Actions
  const addHeroSlide = (slide: HeroSlide) => {
    setHeroSlides(prev => {
      const next = [...prev, slide];
      persistToServer({ heroSlides: next });
      return next;
    });
  };

  const updateHeroSlide = (id: string, updated: Partial<HeroSlide>) => {
    setHeroSlides(prev => {
      const next = prev.map(s => s.id === id ? { ...s, ...updated } : s);
      persistToServer({ heroSlides: next });
      return next;
    });
  };

  const deleteHeroSlide = (id: string) => {
    setHeroSlides(prev => {
      const next = prev.filter(s => s.id !== id);
      persistToServer({ heroSlides: next });
      return next;
    });
  };

  // News Actions
  const addNewsArticle = (article: NewsArticle) => {
    setNewsArticles(prev => {
      const next = [article, ...prev];
      persistToServer({ newsArticles: next });
      return next;
    });
  };

  const updateNewsArticle = (id: string, updated: Partial<NewsArticle>) => {
    setNewsArticles(prev => {
      const next = prev.map(a => a.id === id ? { ...a, ...updated } : a);
      persistToServer({ newsArticles: next });
      return next;
    });
  };

  const deleteNewsArticle = (id: string) => {
    setNewsArticles(prev => {
      const next = prev.filter(a => a.id !== id);
      persistToServer({ newsArticles: next });
      return next;
    });
  };

  // Testimonial Actions
  const addTestimonial = (testimonial: Testimonial) => {
    setTestimonials(prev => {
      const next = [testimonial, ...prev];
      persistToServer({ testimonials: next });
      return next;
    });
  };

  const updateTestimonial = (id: string, updated: Partial<Testimonial>) => {
    setTestimonials(prev => {
      const next = prev.map(t => t.id === id ? { ...t, ...updated } : t);
      persistToServer({ testimonials: next });
      return next;
    });
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => {
      const next = prev.filter(t => t.id !== id);
      persistToServer({ testimonials: next });
      return next;
    });
  };

  // Stats Actions
  const updateStats = (newStats: StatItem[]) => {
    setStats(newStats);
    persistToServer({ stats: newStats });
  };

  // Settings Actions
  const updateSettings = (updated: Partial<SiteSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...updated };
      persistToServer({ settings: next });
      return next;
    });
  };

  const updateSeoSettings = (updated: Partial<SeoSettings>) => {
    setSeoSettings(prev => {
      const next: SeoSettings = {
        ...prev,
        ...updated,
        pageOverrides: {
          ...prev.pageOverrides,
          ...(updated.pageOverrides || {})
        }
      };
      persistToServer({ seoSettings: next });
      return next;
    });
  };

  // Partner Section Actions
  const updatePartnerSection = (data: Partial<PartnerSectionData>) => {
    setPartnerSection(prev => {
      const next = { ...prev, ...data };
      persistToServer({ partnerSection: next });
      return next;
    });
  };

  // Seller Desk Actions
  const updateSellerDesk = (data: Partial<SellerDeskData>) => {
    setSellerDesk(prev => {
      const next = { ...prev, ...data };
      persistToServer({ sellerDesk: next });
      return next;
    });
  };

  // Preloader Config Actions
  const updatePreloaderConfig = (data: Partial<PreloaderConfig>) => {
    setPreloaderConfig(prev => {
      const next = { ...prev, ...data };
      persistToServer({ preloaderConfig: next });
      return next;
    });
  };

  // Investors Page Actions
  const updateInvestorsPage = (data: Partial<InvestorsPageData>) => {
    setInvestorsPage(prev => {
      const next = { ...prev, ...data };
      persistToServer({ investorsPage: next });
      return next;
    });
  };

  // NRI Page Actions
  const updateNriPage = (data: Partial<NriPageData>) => {
    setNriPage(prev => {
      const next = { ...prev, ...data };
      persistToServer({ nriPage: next });
      return next;
    });
  };

  // About Page Actions
  const updateAboutPage = (data: Partial<AboutPageData>) => {
    setAboutPage(prev => {
      const next = { ...prev, ...data };
      persistToServer({ aboutPage: next });
      return next;
    });
  };

  // Lead Actions
  const addLead = (leadData: Omit<LeadRecord, 'id' | 'timestamp' | 'status'> & Partial<LeadRecord>) => {
    const newLead: LeadRecord = {
      id: leadData.id || `LEAD-${Date.now()}`,
      timestamp: leadData.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      formType: leadData.formType || 'General Inquiry',
      clientName: leadData.clientName || 'Client',
      phone: leadData.phone || 'Not provided',
      email: leadData.email || '',
      status: leadData.status || 'new',
      notes: leadData.notes || '',
      project: leadData.project,
      collection: leadData.collection,
      tier: leadData.tier,
      budget: leadData.budget,
      date: leadData.date,
      timeSlot: leadData.timeSlot,
      message: leadData.message,
      additionalData: leadData.additionalData
    };

    setLeads(prev => [newLead, ...prev]);

    try {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      }).catch(() => {});
    } catch {}
  };

  const updateLeadStatus = (id: string, status: LeadRecord['status'], notes?: string) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        return {
          ...lead,
          status,
          notes: notes !== undefined ? notes : lead.notes
        };
      }
      return lead;
    }));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  // Media Gallery Actions
  const addMediaItem = (item: MediaItem) => {
    setMediaGallery(prev => {
      const next = [item, ...prev];
      persistToServer({ mediaGallery: next });
      return next;
    });
  };

  const deleteMediaItem = (id: string) => {
    setMediaGallery(prev => {
      const next = prev.filter(m => m.id !== id);
      persistToServer({ mediaGallery: next });
      return next;
    });
  };

  const uploadImageFile = async (file: File, category: MediaItem['category'] = 'uploads'): Promise<string> => {
    const { url, sizeFormatted } = await compressImageFile(file);

    const newMedia: MediaItem = {
      id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: file.name.replace(/\.[^/.]+$/, ''),
      url,
      category,
      uploadedAt: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      size: sizeFormatted
    };

    addMediaItem(newMedia);
    return url;
  };

  // Custom Pages Actions
  const addCustomPage = (page: CustomPage) => {
    setCustomPages(prev => {
      const next = [...prev, page];
      persistToServer({ customPages: next });
      return next;
    });
  };

  const updateCustomPage = (idOrPage: string | CustomPage, patch?: Partial<CustomPage>) => {
    const id = typeof idOrPage === 'string' ? idOrPage : idOrPage.id;
    const updates = typeof idOrPage === 'string' ? (patch || {}) : idOrPage;
    setCustomPages(prev => {
      const next = prev.map(p => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p));
      persistToServer({ customPages: next });
      return next;
    });
  };

  const deleteCustomPage = (id: string) => {
    setCustomPages(prev => {
      const next = prev.filter(p => p.id !== id);
      persistToServer({ customPages: next });
      return next;
    });
  };

  const addPageSection = (pageId: string, section: PageSectionBlock) => {
    setCustomPages(prev => {
      const next = prev.map(p => {
        if (p.id === pageId) {
          const sections = [...(p.sections || []), { ...section, order: (p.sections || []).length + 1 }];
          return { ...p, sections, updatedAt: new Date().toISOString() };
        }
        return p;
      });
      persistToServer({ customPages: next });
      return next;
    });
  };

  const updatePageSection = (
    pageId: string,
    sectionOrId: string | PageSectionBlock,
    sectionPatch?: Partial<PageSectionBlock>
  ) => {
    const sectionId = typeof sectionOrId === 'string' ? sectionOrId : sectionOrId.id;
    const updates = typeof sectionOrId === 'string' ? (sectionPatch || {}) : sectionOrId;
    setCustomPages(prev => {
      const next = prev.map(p => {
        if (p.id === pageId) {
          const sections = (p.sections || []).map(s => (s.id === sectionId ? { ...s, ...updates } : s));
          return { ...p, sections, updatedAt: new Date().toISOString() };
        }
        return p;
      });
      persistToServer({ customPages: next });
      return next;
    });
  };

  const deletePageSection = (pageId: string, sectionId: string) => {
    setCustomPages(prev => {
      const next = prev.map(p => {
        if (p.id === pageId) {
          const sections = (p.sections || []).filter(s => s.id !== sectionId).map((s, idx) => ({ ...s, order: idx + 1 }));
          return { ...p, sections, updatedAt: new Date().toISOString() };
        }
        return p;
      });
      persistToServer({ customPages: next });
      return next;
    });
  };

  const reorderPageSections = (
    pageId: string,
    fromIndexOrSections: number | PageSectionBlock[],
    maybeToIndex?: number
  ) => {
    setCustomPages(prev => {
      const next = prev.map(p => {
        if (p.id === pageId) {
          if (Array.isArray(fromIndexOrSections)) {
            const sections = fromIndexOrSections.map((s, idx) => ({ ...s, order: idx + 1 }));
            return { ...p, sections, updatedAt: new Date().toISOString() };
          } else if (typeof fromIndexOrSections === 'number' && typeof maybeToIndex === 'number') {
            const fromIndex = fromIndexOrSections;
            const toIndex = maybeToIndex;
            const sections = [...(p.sections || [])];
            if (fromIndex >= 0 && fromIndex < sections.length && toIndex >= 0 && toIndex < sections.length) {
              const [moved] = sections.splice(fromIndex, 1);
              sections.splice(toIndex, 0, moved);
              const reordered = sections.map((s, idx) => ({ ...s, order: idx + 1 }));
              return { ...p, sections: reordered, updatedAt: new Date().toISOString() };
            }
          }
        }
        return p;
      });
      persistToServer({ customPages: next });
      return next;
    });
  };

  // Patron / Seller User Auth Handlers
  const userSignup = (data: { name: string; email: string; phone: string; password?: string; role?: 'seller' | 'patron'; isEmailVerified?: boolean }): User => {
    const user: User = {
      id: `usr-${Date.now().toString(36)}`,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      role: data.role || 'seller',
      isEmailVerified: data.isEmailVerified !== undefined ? data.isEmailVerified : true,
      createdAt: new Date().toISOString()
    };

    try {
      const existing = localStorage.getItem('arwin_rise_registered_users');
      const usersList = existing ? JSON.parse(existing) : [];
      const updatedList = usersList.filter((u: any) => u.email.toLowerCase() !== user.email);
      updatedList.push({ ...user, password: data.password || '' });
      localStorage.setItem('arwin_rise_registered_users', JSON.stringify(updatedList));
    } catch {}

    setCurrentUser(user);
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch {}
    return user;
  };

  const userLogin = (email: string, password?: string): User | null => {
    const trimmed = email.trim().toLowerCase();
    let matchedUser: User | null = null;

    try {
      const existing = localStorage.getItem('arwin_rise_registered_users');
      if (existing) {
        const usersList = JSON.parse(existing);
        const found = usersList.find((u: any) => u.email.toLowerCase() === trimmed || u.phone === trimmed);
        if (found) {
          if (password && found.password && found.password !== password) {
            throw new Error('Incorrect password. Please verify your credentials.');
          }
          matchedUser = {
            id: found.id,
            name: found.name,
            email: found.email,
            phone: found.phone,
            role: found.role,
            createdAt: found.createdAt
          };
        }
      }
    } catch (err: any) {
      if (err.message && err.message.includes('Incorrect password')) {
        throw err;
      }
    }

    if (!matchedUser) {
      const namePart = trimmed.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      matchedUser = {
        id: `usr-${Date.now().toString(36)}`,
        name: namePart || 'Verified Patron',
        email: trimmed.includes('@') ? trimmed : `${trimmed}@patron.arwinrise.com`,
        phone: !trimmed.includes('@') ? trimmed : '+91 98490 00000',
        role: 'seller',
        createdAt: new Date().toISOString()
      };
      try {
        const existing = localStorage.getItem('arwin_rise_registered_users');
        const usersList = existing ? JSON.parse(existing) : [];
        usersList.push({ ...matchedUser, password: password || '' });
        localStorage.setItem('arwin_rise_registered_users', JSON.stringify(usersList));
      } catch {}
    }

    setCurrentUser(matchedUser);
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(matchedUser));
    } catch {}
    return matchedUser;
  };

  const userLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(USER_KEY);
    } catch {}
  };

  // Property Listing Submissions Actions
  const submitPropertyListing = (
    data: Omit<PropertyListingSubmission, 'id' | 'status' | 'submittedAt'>
  ): PropertyListingSubmission => {
    const docketId = `ARW-LIST-${Math.floor(100000 + Math.random() * 900000)}`;
    const newSubmission: PropertyListingSubmission = {
      ...data,
      id: docketId,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    setListingSubmissions(prev => {
      const next = [newSubmission, ...prev];
      persistToServer({ listingSubmissions: next });
      return next;
    });

    // Also register an intake lead in CRM
    addLead({
      formType: 'Seller Property Listing Submission',
      clientName: data.ownerName,
      phone: data.phone,
      email: data.email,
      project: data.propertyTitle,
      tier: data.targetTierId || 'tier-01',
      budget: data.expectedPrice,
      message: `Seller Intake [${docketId}]: ${data.propertyType} in ${data.location}, ${data.city}. Specs: ${data.configuration}, ${data.sizeSft} sq.ft. Asking: ${data.expectedPrice}.`,
      notes: `Docket ID: ${docketId} | Status: Pending Title & Valuation Review`
    });

    return newSubmission;
  };

  const updateListingSubmission = (id: string, patch: Partial<PropertyListingSubmission>) => {
    setListingSubmissions(prev => {
      const next = prev.map(s => (s.id === id ? { ...s, ...patch, reviewedAt: new Date().toISOString() } : s));
      persistToServer({ listingSubmissions: next });
      return next;
    });
  };

  const approveAndPublishListing = (
    submissionId: string,
    publishConfig?: { tierId?: string; heroImage?: string; projectName?: string; startingPrice?: string }
  ): FeaturedProject | null => {
    const submission = listingSubmissions.find(s => s.id === submissionId);
    if (!submission) return null;

    const projectId = `proj-approved-${submission.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    const tierId = publishConfig?.tierId || submission.targetTierId || 'tier-01';
    const title = publishConfig?.projectName || submission.propertyTitle;
    const priceFormatted = publishConfig?.startingPrice || submission.priceStartingFormatted || submission.expectedPrice;
    const heroImage = publishConfig?.heroImage || submission.images[0] || '/images/hero-luxury-penthouse.jpg';

    const newProject: FeaturedProject = {
      id: projectId,
      name: title,
      tag: submission.propertyType ? submission.propertyType.toUpperCase() : 'EXCLUSIVE SIGNATURE RESIDENCE',
      location: `${submission.location}, ${submission.city}`,
      priceStarting: priceFormatted,
      image: heroImage,
      badge: 'VERIFIED SELLER ASSET',
      units: submission.configuration || 'Bespoke Configurations',
      carpetArea: submission.sizeSft ? `${submission.sizeSft} Sq.Ft.` : 'Palatial Layout',
      reraNumber: 'P02400008192 (Verified)',
      description: submission.description || `Exceptional ${submission.propertyType} presented exclusively by ARWIN RISE Private Advisory.`,
      amenities: submission.amenities && submission.amenities.length > 0
        ? submission.amenities
        : ['Private Elevator Access', 'Heated Sky Pool', 'Home Automation', 'Italian Marble Living Deck', 'Staff Suite'],
      floorPlans: [
        {
          type: submission.configuration || 'Signature Layout',
          area: submission.sizeSft ? `${submission.sizeSft} Sq.Ft.` : 'Bespoke',
          price: priceFormatted
        }
      ]
    };

    // Prepend to featured projects
    setFeaturedProjects(prev => {
      const next = [newProject, ...prev];
      persistToServer({ featuredProjects: next });
      return next;
    });

    // Update submission record
    setListingSubmissions(prev => {
      const next = prev.map(s =>
        s.id === submissionId
          ? {
              ...s,
              status: 'approved' as ListingSubmissionStatus,
              approvedProjectId: projectId,
              reviewedAt: new Date().toISOString(),
              adminFeedback: `Approved and published live to ${tierId === 'tier-01' ? 'The Billionaire Tier' : tierId === 'tier-02' ? 'The Sky Villa Tier' : 'Dubai Global Tier'} catalog.`
            }
          : s
      );
      persistToServer({ listingSubmissions: next });
      return next;
    });

    return newProject;
  };

  const rejectListingSubmission = (submissionId: string, reason: string) => {
    setListingSubmissions(prev => {
      const next = prev.map(s =>
        s.id === submissionId
          ? {
              ...s,
              status: 'rejected' as ListingSubmissionStatus,
              adminFeedback: reason,
              reviewedAt: new Date().toISOString()
            }
          : s
      );
      persistToServer({ listingSubmissions: next });
      return next;
    });
  };

  const deleteListingSubmission = (id: string) => {
    setListingSubmissions(prev => {
      const next = prev.filter(s => s.id !== id);
      persistToServer({ listingSubmissions: next });
      return next;
    });
  };

  // Reset to initial defaults
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all properties, hero slides, media, and settings back to original defaults?')) {
      setFeaturedProjects(FEATURED_PROJECTS);
      setCollectionTiers(COLLECTIONS);
      setHeroSlides(HERO_SLIDES);
      setNewsArticles(NEWS_ARTICLES);
      setTestimonials(DEFAULT_TESTIMONIALS);
      setStats(STATS);
      setSettings(DEFAULT_SITE_SETTINGS);
      setMediaGallery(DEFAULT_MEDIA_GALLERY);
      setPartnerSection(DEFAULT_PARTNER_SECTION);
      setSellerDesk(DEFAULT_SELLER_DESK);
      setPreloaderConfig(DEFAULT_PRELOADER_CONFIG);
      setInvestorsPage(DEFAULT_INVESTORS_PAGE);
      setNriPage(DEFAULT_NRI_PAGE);
      setAboutPage(DEFAULT_ABOUT_PAGE);
      setSeoSettings(DEFAULT_SEO_SETTINGS);
      setCustomPages(DEFAULT_CUSTOM_PAGES);
      setListingSubmissions(DEFAULT_LISTING_SUBMISSIONS);
      localStorage.clear();
      alert('Content reset to factory defaults.');
    }
  };

  const exportDataJson = () => {
    const fullBackup = {
      featuredProjects,
      collectionTiers,
      heroSlides,
      newsArticles,
      testimonials,
      stats,
      settings,
      mediaGallery,
      partnerSection,
      sellerDesk,
      preloaderConfig,
      investorsPage,
      nriPage,
      aboutPage,
      seoSettings,
      customPages,
      leads,
      listingSubmissions,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(fullBackup, null, 2);
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.featuredProjects) setFeaturedProjects(data.featuredProjects);
      if (data.collectionTiers) setCollectionTiers(data.collectionTiers);
      if (data.heroSlides) setHeroSlides(data.heroSlides);
      if (data.newsArticles) setNewsArticles(data.newsArticles);
      if (data.testimonials) setTestimonials(data.testimonials);
      if (data.stats) setStats(data.stats);
      if (data.settings) setSettings(data.settings);
      if (data.mediaGallery) setMediaGallery(data.mediaGallery);
      if (data.partnerSection) setPartnerSection(data.partnerSection);
      if (data.sellerDesk) setSellerDesk(data.sellerDesk);
      if (data.preloaderConfig) setPreloaderConfig(data.preloaderConfig);
      if (data.investorsPage) setInvestorsPage(data.investorsPage);
      if (data.nriPage) setNriPage(data.nriPage);
      if (data.aboutPage) setAboutPage(data.aboutPage);
      if (data.seoSettings) setSeoSettings(data.seoSettings);
      if (data.customPages) setCustomPages(data.customPages);
      if (data.leads) setLeads(data.leads);
      if (data.listingSubmissions) setListingSubmissions(data.listingSubmissions);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <ContentContext.Provider
      value={{
        featuredProjects,
        collectionTiers,
        heroSlides,
        newsArticles,
        testimonials,
        stats,
        settings,
        leads,
        mediaGallery,
        partnerSection,
        sellerDesk,
        preloaderConfig,
        investorsPage,
        nriPage,
        aboutPage,
        seoSettings,
        customPages,
        listingSubmissions,
        currentUser,
        userLogin,
        userSignup,
        userLogout,
        submitPropertyListing,
        updateListingSubmission,
        approveAndPublishListing,
        rejectListingSubmission,
        deleteListingSubmission,
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
        addLead,
        updateLeadStatus,
        deleteLead,
        addMediaItem,
        deleteMediaItem,
        uploadImageFile,
        resetToDefaults,
        syncWithServer,
        exportDataJson,
        importDataJson
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
