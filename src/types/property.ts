export type CurrencyCode = 'INR' | 'USD' | 'AED' | 'GBP' | 'EUR' | 'SGD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to INR (1 INR = x units of currency)
  label: string;
  flag: string;
  format: (amountInInr: number) => string;
}

export type PropertyType = 
  | 'Sky Villa'
  | 'Luxury Apartment'
  | 'Gated Villa'
  | 'Signature Penthouse'
  | 'Commercial Office'
  | 'Lakefront Estate'
  | 'Plot / Land';

export type ListingStatus = 
  | 'For Sale'
  | 'Off-Plan Launch'
  | 'Ready to Move'
  | 'Under Construction'
  | 'Signature Collection'
  | 'For Rent';

export interface FloorPlan {
  title: string;
  type: string;
  sizeSqFt: number;
  carpetSqFt: number;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  facing: 'East' | 'West' | 'North' | 'North-East' | 'Corner';
  priceInr: number;
  image: string;
}

export interface Amenity {
  name: string;
  iconName: string;
  category: 'Wellness & Leisure' | 'Exclusive Services' | 'Security & Tech' | 'Sports & Outdoors';
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  priceInr: number;
  pricePerSqFtInr: number;
  location: string;
  microMarket: 'Neopolis' | 'Kokapet' | 'Jubilee Hills' | 'Banjara Hills' | 'Financial District' | 'Tellapur' | 'Gandipet' | 'Gachibowli' | 'Nanakramguda' | 'Mokila';
  propertyType: PropertyType;
  status: ListingStatus;
  isFeatured: boolean;
  isOffPlan: boolean;
  isSignatureArwin: boolean;
  developerName: string;
  reraNumber: string;
  handoverDate: string; // e.g. "Dec 2026", "Ready to Move"
  totalFloors: number;
  totalUnits: number;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  carpetAreaSqFt: number;
  images: string[];
  videoUrl?: string;
  description: string;
  highlights: string[];
  amenities: Amenity[];
  floorPlans: FloorPlan[];
  distanceHighlights: { place: string; time: string }[];
  coordinates: { lat: number; lng: number };
  agent: {
    name: string;
    role: string;
    phone: string;
    whatsapp: string;
    email: string;
    avatar: string;
  };
}

export interface Community {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  avgPricePerSqFtInr: number;
  yoyAppreciation: string; // e.g. "+19.4%"
  totalListingsCount: number;
  topHighlights: string[];
  keyConnectivity: { destination: string; duration: string }[];
  lifestyleVibe: string;
}

export interface DeveloperPartner {
  id: string;
  name: string;
  logo: string;
  establishedYear: number;
  deliveredSqFt: string;
  activeProjectsCount: number;
  signatureProject: string;
  overview: string;
}

export interface SearchFilterState {
  tab: 'all' | 'buy' | 'off-plan' | 'rent' | 'commercial';
  microMarket: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  handover: string;
  searchQuery: string;
}
