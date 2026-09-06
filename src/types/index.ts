export interface HeroSlide {
  id: string;
  brandTag: string;
  titleLine1: string;
  titleLine2: string;
  titleAccent?: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  image: string;
  badge?: string;
  imagePositionMobile?: string;
}

export interface CollectionTier {
  id: string;
  badgeNumber: string;
  priceRange: string;
  title: string;
  subtitle: string;
  image: string;
  features: string[];
  specs: {
    typology: string;
    size: string;
    possession: string;
    locations: string[];
  };
  highlights: string[];
  amenities?: string[];
}

export interface FeaturedProject {
  id: string;
  tag: string;
  location: string;
  name: string;
  priceStarting: string;
  image: string;
  badge?: string;
  units: string;
  carpetArea: string;
  reraNumber: string;
  description: string;
  amenities: string[];
  floorPlans: {
    type: string;
    area: string;
    price: string;
  }[];
}

export interface Testimonial {
  id: string;
  category: 'nri' | 'villa' | 'highrise' | 'investor';
  quote: string;
  clientName: string;
  designation: string;
  location: string;
  propertyPurchased: string;
  rating: number;
  date?: string;
  avatar?: string;
}

export interface StatItem {
  value: string;
  label: string;
}
