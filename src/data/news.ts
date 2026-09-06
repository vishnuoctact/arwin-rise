export interface NewsArticle {
  id: string;
  category: string;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    role: string;
  };
  content: string[];
  keyHighlights: string[];
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "neopolis-market-surge-2026",
    category: "MARKET INTELLIGENCE",
    tag: "CAPITAL APPRECIATION",
    title: "Neopolis Skymansions Outpace Prime Micro-Markets with 18.8% Annual Appreciation",
    excerpt: "Record infrastructure capital expenditure and GCC enterprise influx propel Neopolis into South India's highest yielding luxury corridor.",
    date: "August 2026",
    readTime: "4 Min Read",
    image: "/images/collection-1.jpg",
    author: {
      name: "Arwin Research Desk",
      role: "Macro Real Estate Advisory"
    },
    keyHighlights: [
      "18.8% YoY capital appreciation recorded across Grade-A high-rises in Neopolis.",
      "Over 45 Global Capability Centers (GCCs) established within a 5 km radius.",
      "High demand for 3.5 & 4 BHK sky residences with lake-facing orientations."
    ],
    content: [
      "The West Hyderabad corridor—anchored by Neopolis and Kokapet—has solidified its reputation as India's fastest growing luxury residential landscape. Recent real estate index data indicates an unprecedented 18.8% year-on-year appreciation for ultra-luxury residential high-rises.",
      "Unlike speculative markets, this growth is supported by tangible institutional capital: over 45 fortune-500 Global Capability Centers (GCCs) have expanded into the Financial District corridor, driving an influx of C-suite executives and ultra-high-net-worth individuals.",
      "For property investors and discerning families seeking long-term legacy value, Neopolis offers rare planned infrastructure with 100-foot arterial roads, underground utility cabling, and proximity to international schools and healthcare."
    ]
  },
  {
    id: "shankarpally-triplex-villas",
    category: "ARCHITECTURE & LIFESTYLE",
    tag: "BESPOKE VILLAS",
    title: "The Rise of Triplex Boutique Villas in Shankarpally: Why UHNIs are Moving West",
    excerpt: "Discerning homebuyers are prioritizing private plunge pools, organic orchards, and low-density gated sanctuaries over congested urban cores.",
    date: "July 2026",
    readTime: "5 Min Read",
    image: "/images/villa-triplex-interior.jpg",
    author: {
      name: "Arwin Advisory Desk",
      role: "Private Property Research"
    },
    keyHighlights: [
      "Shankarpally emerging as Hyderabad's premier low-density luxury villa retreat.",
      "Demand shifting towards 3,800 to 5,000 sq.ft triplex boutique residences with private elevators.",
      "Direct 25-minute signal-free access via ORR and 4-lane Shankarpally express corridor."
    ],
    content: [
      "The luxury homeowner's definition of wealth has fundamentally transformed. While central penthouses offer skyline views, an increasing demographic of business leaders and NRI returnees are choosing the serenity of bespoke triplex villas in Shankarpally.",
      "With expansive 10 to 40 acre gated communities featuring private plunge pools, rooftop sun decks, private elevators, and landscaped organic trails, Shankarpally offers an uncompromised balance between lush nature and modern luxury.",
      "With ongoing infrastructure expansions connecting Shankarpally seamlessly to Neopolis and Financial District in under 25 minutes, capital appreciation in this green sanctuary is projected to sustain double-digit momentum through 2028."
    ]
  },
  {
    id: "nri-fema-property-guide",
    category: "NRI WEALTH DESK",
    tag: "CROSS-BORDER ADVISORY",
    title: "FEMA & Cross-Border Real Estate: Essential Advisory for US & UK NRI Homebuyers",
    excerpt: "Comprehensive roadmap on consular Power of Attorney, NRE/NRO banking repatriation compliance, and maximizing rental yields from abroad.",
    date: "June 2026",
    readTime: "6 Min Read",
    image: "/images/nri-exec.jpg",
    author: {
      name: "Arwin Global Advisory",
      role: "Cross-Border NRI Wealth Desk"
    },
    keyHighlights: [
      "100% remote purchase execution via consular Power of Attorney (PoA) attestation.",
      "Seamless NRE/NRO account funds repatriation under RBI Liberalised Remittance Scheme.",
      "Pre-vetted 100% TS-RERA title due diligence for transparent overseas transactions."
    ],
    content: [
      "For Non-Resident Indians living across the United States, United Kingdom, and the Middle East, acquiring premium real estate in India has never been more straightforward—provided legal protocols are rigorously observed.",
      "Arwin Rise's dedicated NRI advisory desk provides end-to-end support including consular PoA execution, title verification, builder escrow auditing, and complete MNC tenant leasing management upon handover.",
      "With favorable currency exchange rates and high rental yields in Hyderabad's tech corridors (averaging 4.5%–5.5% gross), real estate remains the premier asset class for overseas Indian wealth preservation."
    ]
  },
  {
    id: "dubai-golden-visa-wealth",
    category: "GLOBAL ASSET DESK",
    tag: "DUBAI ADVISORY",
    title: "Dubai Private Collection: Unlocking 10-Year UAE Golden Visa via Luxury Property",
    excerpt: "How Indian family offices are pairing Hyderabad real estate wealth with zero-tax Dubai waterfront sky residences and penthouses.",
    date: "May 2026",
    readTime: "4 Min Read",
    image: "/images/dubai-collection.jpg",
    author: {
      name: "Arwin Global Advisory",
      role: "International Wealth Desk"
    },
    keyHighlights: [
      "Property acquisitions above AED 2M (~₹4.5 Cr) qualify for 10-Year UAE Golden Visa.",
      "Zero personal income tax and zero capital gains tax on UAE residential assets.",
      "High net rental yields ranging from 7% to 9% in Downtown Dubai & Palm Jumeirah."
    ],
    content: [
      "Indian HNIs and entrepreneurs continue to represent the largest international buyer group in the United Arab Emirates. Through Arwin Rise's Dubai Private Collection, Indian investors gain direct access to curated residences in Downtown Dubai, Palm Jumeirah, and Dubai Marina.",
      "Beyond the coveted 10-Year UAE Golden Visa offering multi-entry family residency, Dubai real estate delivers 7% to 9% tax-free rental returns, backed by transparent escrow regulations and complete foreign ownership rights.",
      "Our international desk assists with complete cross-border transaction structuring, legal onboarding, and private developer allocations."
    ]
  }
];
