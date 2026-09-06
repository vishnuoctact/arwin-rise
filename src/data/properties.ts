import { CollectionTier, FeaturedProject, StatItem, HeroSlide, Testimonial } from '../types';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "flagship-private-living",
    brandTag: "PRIVATE PROPERTY ADVISORY",
    titleLine1: "Exceptional Residences.",
    titleLine2: "Privately Advised.",
    titleAccent: "Privately Advised.",
    subheadline: "Curated for discerning homebuyers & global wealth creators.",
    ctaPrimary: "EXPLORE BY VALUE",
    ctaSecondary: "WATCH OUR STORY",
    image: "/images/hero-scene.jpg",
    badge: "FLAGSHIP ADVISORY",
    imagePositionMobile: "object-[70%_center] sm:object-center"
  },
  {
    id: "signature-villas-slide",
    brandTag: "PRIVATE VILLA ESTATES",
    titleLine1: "Curated Villa Estates.",
    titleLine2: "Shankarpally, Hyderabad.",
    titleAccent: "Shankarpally, Hyderabad.",
    subheadline: "4 & 5 BHK boutique villas with private pools and landscaped decks.",
    ctaPrimary: "EXPLORE VILLA ESTATES",
    ctaSecondary: "REQUEST DOSSIER",
    image: "/images/hero-slide-2.jpg",
    badge: "₹3.2 CR ONWARDS",
    imagePositionMobile: "object-[56%_center] sm:object-center"
  },
  {
    id: "skyline-landmarks-slide",
    brandTag: "ICONIC SKY RESIDENCES",
    titleLine1: "Architectural Landmarks.",
    titleLine2: "Neopolis & Kukatpally.",
    titleAccent: "Neopolis & Kukatpally.",
    subheadline: "G+46 iconic towers offering private sky decks, infinity pools & panoramic lake views.",
    ctaPrimary: "EXPLORE SKY RESIDENCES",
    ctaSecondary: "PRIVATE PREVIEW",
    image: "/images/hero-slide-3.jpg",
    badge: "G+46 ICONIC TOWERS",
    imagePositionMobile: "object-[68%_center] sm:object-[95%_center] lg:object-[92%_center]"
  },
  {
    id: "dubai-waterfront-slide",
    brandTag: "GLOBAL ASSET DESK",
    titleLine1: "Dubai Private Collection.",
    titleLine2: "Waterfront Penthouses.",
    titleAccent: "Waterfront Penthouses.",
    subheadline: "Tax-free 8–10% rental yields & 10-Year UAE Golden Visa for Indian investors.",
    ctaPrimary: "EXPLORE DUBAI ASSETS",
    ctaSecondary: "NRI CONSULTATION",
    image: "/images/hero-slide-4.jpg",
    badge: "AED 2M ONWARDS",
    imagePositionMobile: "object-[65%_center] sm:object-center"
  }
];

export const HERO_DATA = {
  brandTag: "PRIVATE PROPERTY ADVISORY",
  headline: "Exceptional Residences.\nPrivately Advised.",
  subheadline: "Curated for discerning homebuyers & global wealth creators.",
  ctaPrimary: "EXPLORE BY VALUE",
  ctaSecondary: "WATCH OUR STORY",
  videoUrl: "/videos/hero-luxury.mp4",
  youtubeId: "",
  heroImage: "/images/hero-scene.jpg"
};

export const VALUE_PROPS = [
  {
    id: "private-exclusive",
    icon: "ShieldCheck",
    title: "PRIVATE & EXCLUSIVE",
    description: "Limited Residences.\nBy Invitation Only.",
    image: "/images/by-invitation.jpg"
  },
  {
    id: "nri-connect",
    icon: "Globe",
    title: "NRI CONNECT",
    description: "End-to-end support\nfor NRIs worldwide.",
    image: "/images/nri-exec.jpg"
  },
  {
    id: "investor-focused",
    icon: "TrendingUp",
    title: "INVESTOR FOCUSED",
    description: "High appreciation assets.\nTrusted guidance.",
    image: "/images/investor-advisory.jpg"
  },
  {
    id: "legacy-trust",
    icon: "Award",
    title: "LEGACY OF TRUST",
    description: "RERA Compliant.\nTransparent. Reliable.",
    image: "/images/founder.jpg"
  }
];

export const COLLECTIONS: CollectionTier[] = [
  {
    id: "signature-residences",
    badgeNumber: "01",
    priceRange: "₹ 1.5 Cr — ₹ 3 Cr",
    title: "SIGNATURE RESIDENCES",
    subtitle: "Exceptional homes. Exceptional addresses.",
    image: "/images/collection-1.jpg",
    features: [
      "Kukatpally · Shankarpally · Mokila · Kollur · Miyapur · Rajendra Nagar",
      "3 & 3.5 BHK (1,587 – 2,450 Sq.Ft.)",
      "Gated Communities & Landmark High-Rises"
    ],
    specs: {
      typology: "3 & 3.5 BHK Units",
      size: "1,587 – 2,450 sft",
      possession: "TS RERA Approved",
      locations: ["Kukatpally", "Shankarpally", "Mokila", "Kollur", "Miyapur", "Rajendra Nagar"]
    },
    highlights: [
      "Projected 18%–24% 3-year capital appreciation driven by major IT expansion and metro connectivity corridors",
      "Low-density master planning ensuring high green cover, privacy, and expansive open-sky views",
      "Curated exclusively from Grade-A builders with zero-litigation records and verifiable delivery timelines",
      "High tenant demand from tech leadership and corporate executives ensuring strong rental liquidity"
    ],
    amenities: [
      "25,000+ Sft Grand Clubhouse",
      "Temperature-Controlled Swimming Pool",
      "Landscaped Podium Gardens",
      "State-of-the-Art Fitness Arena",
      "Multipurpose Sports Courts",
      "24/7 Multi-Tier Gated Security"
    ]
  },
  {
    id: "luxury-residences",
    badgeNumber: "02",
    priceRange: "₹ 3 Cr — ₹ 6 Cr",
    title: "LUXURY RESIDENCES",
    subtitle: "Elevated living, thoughtfully curated.",
    image: "/images/collection-2.jpg",
    features: [
      "Kollur · Mokila · Future City · Financial District · Neopolis",
      "4 & 5 BHK (3,212 – 5,400 Sq.Ft.)",
      "Sky Mansions, Penthouses & Triplex Villas"
    ],
    specs: {
      typology: "4 & 5 BHK Mansions",
      size: "3,212 – 5,400 sft",
      possession: "TS RERA Approved",
      locations: ["Neopolis", "Financial District", "Future City", "Kollur", "Mokila"]
    },
    highlights: [
      "Palatial 11-foot clear ceiling heights, imported marble living pavilions, and private elevator foyers",
      "Strategically situated in Hyderabad's premier luxury epicenters with immediate access to ORR and Financial District",
      "Limited residences per floor designed for C-suite executives, senior founders, and distinguished families",
      "Dedicated interior architectural consultation with priority customization options before final possession"
    ],
    amenities: [
      "50,000 Sft Resort-Style Clubhouse",
      "Infinity Sky Pool & Cabanas",
      "Private Elevator Access Pavilions",
      "Exclusive Spa & Wellness Deck",
      "Indoor Squash & Badminton Arena",
      "24/7 Concierge & Biometric Security"
    ]
  },
  {
    id: "private-residences",
    badgeNumber: "03",
    priceRange: "₹ 6 Cr — ₹ 35 Cr+",
    title: "PRIVATE RESIDENCES",
    subtitle: "Rare homes for discerning buyers.",
    image: "/images/collection-3.jpg",
    features: [
      "Shankarpally · Gachibowli · Nanakramguda · Neopolis",
      "5 & 6 BHK (7,500 – 11,500 Sq.Ft.)",
      "Palatial Estates & Ultra-Luxury Sky Penthouses"
    ],
    specs: {
      typology: "5 & 6 BHK Estates",
      size: "7,500 – 11,500 sft",
      possession: "Limited Allocation",
      locations: ["Neopolis", "Nanakramguda", "Gachibowli", "Shankarpally"]
    },
    highlights: [
      "Strictly off-market inventory allocation protected by NDAs — accessible only by invitation or verified referral",
      "Up to 900+ Sq.Yd private land parcels with bespoke multi-car private garages and private infinity pools",
      "Trophy residential holdings situated in high-barrier-to-entry corridors designed for enduring multi-generational wealth",
      "End-to-end bespoke family office representation including legal title diligence, structural audits, and asset governance"
    ],
    amenities: [
      "Private Temperature-Controlled Pools",
      "30,000 Sft Ultra-Luxury Clubhouse",
      "Private Screening Room & Cine-Lounge",
      "Dedicated Estate Management Desk",
      "Underground Smart Grid & EV Hubs",
      "Zen Gardens & Landscaped Forest Decks"
    ]
  },
  {
    id: "dubai-private-collection",
    badgeNumber: "INTL",
    priceRange: "AED 2M — 25M+ (₹ 4.5 Cr — 55 Cr+)",
    title: "DUBAI PRIVATE COLLECTION",
    subtitle: "Curated Dubai residences for Indian buyers and investors.",
    image: "/images/dubai-collection.jpg",
    features: [
      "Downtown Dubai, Palm Jumeirah & Marina",
      "2 to 5 BHK Penthouses & Waterfront Sky Villas",
      "High Tax-Free Rental Yields & UAE Golden Visa"
    ],
    specs: {
      typology: "Waterfront Penthouses & Sky Villas",
      size: "1,800 – 8,500 sft",
      possession: "International Advisory",
      locations: ["Downtown Dubai", "Palm Jumeirah", "Marina"]
    },
    highlights: [
      "8%–10% net tax-free rental yields supported by dedicated international tenant placement and asset management",
      "Direct investor qualification for 10-Year UAE Golden Visa residency for the entire family",
      "100% freehold foreign ownership with zero capital gains tax, zero property tax, and global currency diversification",
      "First-access private launch allocations directly with Tier-1 master developers in Downtown, Palm, and Marina"
    ],
    amenities: [
      "Private Waterfront Infinity Pools",
      "Direct Private Beach & Marina Access",
      "High-Floor Sky Decks With Burj Views",
      "Valet Parking & 24/7 Global Concierge",
      "10-Year UAE Golden Visa Assistance",
      "Tax-Free 8–10% Net Rental Yield Desk"
    ]
  }
];

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "skyline-towers-kphb",
    tag: "ICONIC G+46 HIGH-RISE",
    location: "Kukatpally, Hyderabad",
    name: "The Skyline Towers",
    priceStarting: "₹ 1.98 Cr onwards",
    image: "/images/collection-1.jpg",
    units: "3 BHK Luxe, 3 BHK Grande & 4 BHK",
    carpetArea: "1,587 - 3,261 Sq.Ft.",
    reraNumber: "P02200010981",
    description: "Rising majestically across 7.8 acres in Kukatpally, The Skyline Towers features iconic G+46 floor towers with panoramic lake views, offering 3 BHK Luxe, 3 BHK Grande, and 4 BHK luxury residences.",
    amenities: ["Grand Clubhouse", "Rooftop Sky Lounge on 46th Floor", "Temperature Controlled Pool", "Squash & Badminton Courts", "Private Mini Theatre", "EV Fast Charging at Every Bay"],
    floorPlans: [
      { type: "3 BHK Luxe", area: "1,587 – 1,899 Sq.Ft.", price: "₹ 1.98 Cr onwards" },
      { type: "3 BHK Grande", area: "1,992 – 2,214 Sq.Ft.", price: "₹ 2.50 Cr onwards" },
      { type: "4 BHK Luxury Suite", area: "3,212 – 3,261 Sq.Ft.", price: "₹ 3.98 Cr onwards" }
    ]
  },
  {
    id: "courtyard-residences-mokila",
    tag: "SIGNATURE COURTYARD LIVING",
    location: "Neopolis, Hyderabad",
    name: "The Courtyard Residences",
    priceStarting: "₹ 1.65 Cr onwards",
    image: "/images/breeze-courtyard.jpg",
    units: "3 & 3.5 BHK Sky Residences",
    carpetArea: "1,850 - 2,600 Sq.Ft.",
    reraNumber: "P02400009123",
    description: "A landmark luxury community in Neopolis wrapping around a 7-level clubhouse, temperature-controlled pool, and central water courtyard.",
    amenities: ["7-Level Grand Clubhouse", "Central Water Courtyard", "Temperature Controlled Pool", "Sky Lounge & Co-Working", "Banquet Hall & Squash Court", "100% Power Backup"],
    floorPlans: [
      { type: "3 BHK Grand Courtyard", area: "1,850 Sq.Ft.", price: "₹ 1.65 Cr" },
      { type: "3.5 BHK Luxury Suite", area: "2,250 Sq.Ft.", price: "₹ 2.10 Cr" },
      { type: "4 BHK Penthouse", area: "2,600 Sq.Ft.", price: "₹ 2.65 Cr" }
    ]
  },
  {
    id: "westside-triplex-villas",
    tag: "5 BHK TRIPLEX BOUTIQUE VILLAS",
    location: "Shankarpally, Hyderabad",
    name: "The Westside Triplex Villas",
    priceStarting: "₹ 3.20 Cr onwards",
    image: "/images/villa-triplex-interior.jpg",
    units: "5 BHK Triplex Boutique Villas",
    carpetArea: "3,800 - 4,800 Sq.Ft.",
    reraNumber: "P02400007892",
    description: "An exclusive 10-acre gated community of bespoke 5 BHK triplex boutique villas in Shankarpally offering private plunge pools, elevators, and landscaped terrace lounges.",
    amenities: ["Private Plunge Pool & Deck", "Private Elevator Provision", "Rooftop Party Deck", "Clubhouse & Gym", "Yoga & Zen Pavilion", "Underground Cabling"],
    floorPlans: [
      { type: "5 BHK Triplex (250 Sq.Yd)", area: "3,800 Sq.Ft.", price: "₹ 3.20 Cr" },
      { type: "5 BHK Triplex (300 Sq.Yd)", area: "4,400 Sq.Ft.", price: "₹ 3.85 Cr" },
      { type: "5 BHK Corner Villa (350 Sq.Yd)", area: "4,800 Sq.Ft.", price: "₹ 4.40 Cr" }
    ]
  },
  {
    id: "sovereign-palatial-mansions",
    tag: "PALATIAL 900 SQ.YD. MANSIONS",
    location: "Shankarpally, Hyderabad",
    name: "The Sovereign Palatial Mansions",
    priceStarting: "₹ 6.50 Cr onwards",
    image: "/images/collection-3.jpg",
    units: "5 & 6 BHK Grand Mansions",
    carpetArea: "7,500 - 11,500 Sq.Ft.",
    reraNumber: "P02400008812",
    description: "An ultra-luxury sanctuary of 900 sq.yd palatial mansions set across 42 acres in Shankarpally, featuring a 30,000 sq.ft royal clubhouse and private infinity pools.",
    amenities: ["30,000 sq.ft Royal Clubhouse", "Private Infinity Pools", "Tennis & Squash Arena", "Organic Orchard Trails", "24/7 Concierge & Security", "EV Fast Charging Bays"],
    floorPlans: [
      { type: "5 BHK Royal Palace", area: "7,500 Sq.Ft.", price: "₹ 6.50 Cr" },
      { type: "6 BHK Imperial Estate", area: "9,200 Sq.Ft.", price: "₹ 7.80 Cr" },
      { type: "6 BHK Sovereign Mansion", area: "11,500 Sq.Ft.", price: "₹ 8.90 Cr" }
    ]
  }
];

export const STATS: StatItem[] = [
  { value: "300+", label: "NRI Clients" },
  { value: "₹ 100 Cr+", label: "Business Delivered" },
  { value: "10+", label: "Years Experience" },
  { value: "30+", label: "Projects Advised" }
];

export const LEADERSHIP = {
  tag: "LEADERSHIP & ADVISORY",
  title: "Built on Values. Driven by Relationships.",
  quote: "“Real estate is not just about properties—it's about people, possibilities, and where your next chapter begins. Life Starts Here.”",
  name: "Kamal Yellapragada",
  role: "Founder & Managing Director",
  designationLine: "Property Expert & NRI Portfolio Manager · Business Coach",
  image: "/images/founder.jpg"
};

export const REVIEWS_DATA: Testimonial[] = [
  {
    id: "rev-1",
    category: "nri",
    rating: 5,
    quote: "Acquiring our triplex villa in Shankarpally while living in San Jose seemed daunting until we engaged the Arwin Rise advisory team. From remote 3D walkthroughs, consular Power of Attorney execution, to flawless legal title clearance, they managed every single detail with absolute integrity.",
    clientName: "Dr. Rajesh & Sunitha Varma",
    designation: "Principal AI Scientist & Healthcare Director",
    location: "Silicon Valley, California, USA",
    propertyPurchased: "The Westside Triplex Villas · Shankarpally",
    date: "Aug 2026"
  },
  {
    id: "rev-2",
    category: "highrise",
    rating: 5,
    quote: "Our 4 BHK sky residence at The Courtyard Residences in Neopolis is everything we envisioned. The double-height balcony views, central water courtyard, and seamless commute to Financial District make it an incredible lifestyle upgrade for our family.",
    clientName: "Priya & Vivek Srinivasan",
    designation: "Senior Vice President & Tech Leader",
    location: "Hyderabad, India",
    propertyPurchased: "The Courtyard Residences · Neopolis",
    date: "Jul 2026"
  },
  {
    id: "rev-3",
    category: "nri",
    rating: 5,
    quote: "Being based in London, transparency and honest unbiased advice are paramount. Arwin Rise didn't push projects; they audited our family's lifestyle needs and steered us towards a high-floor corner residence at The Skyline Towers in Kukatpally. The entire cross-border banking process was seamless.",
    clientName: "Siddharth K. Nair",
    designation: "Managing Director (Private Equity)",
    location: "Mayfair, London, UK",
    propertyPurchased: "The Skyline Towers · Kukatpally",
    date: "Jun 2026"
  },
  {
    id: "rev-4",
    category: "villa",
    rating: 5,
    quote: "We wanted a private sanctuary away from the city's congestion for our multi-generational family. The Westside Triplex Villas exceeded our highest architectural expectations. Arwin's bespoke concierge assisted with custom layout modifications and pre-possession inspections.",
    clientName: "Ananya & Vikramaditya Reddy",
    designation: "Founding Partners & Entrepreneurs",
    location: "Jubilee Hills, Hyderabad",
    propertyPurchased: "The Westside Triplex Villas · Shankarpally",
    date: "May 2026"
  },
  {
    id: "rev-5",
    category: "investor",
    rating: 5,
    quote: "Arwin Rise's data-driven micro-market forecasts for Neopolis delivered exceptional 18.8% YoY capital growth. We subsequently diversified into their Dubai Private Collection with complete consular advisory, tax structuring, and 10-year UAE Golden Visa facilitation.",
    clientName: "Amitabh & Ritu Sen",
    designation: "Venture Capitalist & Angel Investor",
    location: "Downtown Dubai & Singapore",
    propertyPurchased: "Dubai Private Collection & Neopolis Assets",
    date: "Apr 2026"
  },
  {
    id: "rev-6",
    category: "villa",
    rating: 5,
    quote: "The level of exclusivity, organic orchard trails, and palatial scale at Shankarpally is unmatched in Hyderabad. Arwin Rise provided full title documentation and verified civil structural audits before we signed. Outstanding professionalism.",
    clientName: "Karthik Chandrasekhar",
    designation: "Enterprise Cloud Architect",
    location: "Dallas, Texas, USA",
    propertyPurchased: "The Sovereign Palatial Mansions · Shankarpally",
    date: "Mar 2026"
  },
  {
    id: "rev-7",
    category: "highrise",
    rating: 5,
    quote: "The level of structural engineering and panoramic lake views at The Skyline Towers in Kukatpally is benchmark setting. The Arwin advisory team secured early-stage allocation with prime Vastu compliance and custom layout configurations.",
    clientName: "Harsha Vardhan Raju",
    designation: "Industrialist & Infrastructure Board Member",
    location: "Banjara Hills, Hyderabad",
    propertyPurchased: "The Skyline Towers · Kukatpally",
    date: "Feb 2026"
  },
  {
    id: "rev-8",
    category: "nri",
    rating: 5,
    quote: "Buying property in Hyderabad while living in Sydney was effortless with Arwin Rise. Their legal desk executed 100% RERA audit, digital documentation, and escrow coordination without us having to take a single international flight.",
    clientName: "Divya & Rohit Malhotra",
    designation: "Management Consulting Partner",
    location: "Sydney, Australia",
    propertyPurchased: "The Courtyard Residences · Neopolis",
    date: "Jan 2026"
  },
  {
    id: "rev-9",
    category: "villa",
    rating: 5,
    quote: "We evaluated over 15 gated villa projects across West Hyderabad. Arwin Rise provided objective comparative matrices on carpet area efficiency, water sustainability, and construction milestones. Their unbiased guidance was invaluable.",
    clientName: "Venkatraman & Lakshmi Iyer",
    designation: "Senior Director (Semiconductors)",
    location: "Austin, Texas, USA",
    propertyPurchased: "The Westside Triplex Villas · Shankarpally",
    date: "Dec 2025"
  },
  {
    id: "rev-10",
    category: "investor",
    rating: 5,
    quote: "Arwin Rise delivered seamless global asset diversification. From acquiring high-yield waterfront units in Downtown Dubai to complete repatriation structuring and UAE Golden Visa issuance, their execution was flawless.",
    clientName: "Meera & Aditya Singhania",
    designation: "Chief Investment Officer & FinTech Founder",
    location: "Marina Bay, Singapore",
    propertyPurchased: "Dubai Private Collection · Downtown Dubai",
    date: "Nov 2025"
  },
  {
    id: "rev-11",
    category: "villa",
    rating: 5,
    quote: "The Sovereign Palatial Mansions represent the pinnacle of luxury estate living. Arwin Rise ensured 100% encumbrance-free title clearance and assisted our family through tailored bespoke interior planning.",
    clientName: "Dr. Arvind & Shobha Nambiar",
    designation: "Chief of Surgery & Medical Director",
    location: "Chicago, Illinois, USA",
    propertyPurchased: "The Sovereign Palatial Mansions · Shankarpally",
    date: "Oct 2025"
  },
  {
    id: "rev-12",
    category: "investor",
    rating: 5,
    quote: "Having invested in Hyderabad real estate for over 25 years, I rarely find an advisory firm with the analytical rigor and ethical transparency of Arwin Rise. They are our family's trusted lifetime property partners.",
    clientName: "Suresh & Vandana Kothari",
    designation: "Promoter & Family Office Investor",
    location: "Hyderabad, India",
    propertyPurchased: "The Skyline Towers & Neopolis Portfolio",
    date: "Sep 2025"
  }
];


