export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  location: string;
  avatar: string;
  rating: number;
  propertyPurchased: string;
  quote: string;
  investmentYear: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Srinivas G. Rao',
    designation: 'Managing Director, Silicon Valley Tech Ventures',
    location: 'San Francisco, USA / Hyderabad',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    propertyPurchased: 'Arwin The Luminary (5BHK Sky Mansion)',
    quote: 'As an NRI based in the Bay Area, acquiring a high-value asset in Hyderabad used to be a bureaucratic ordeal. Arwin’s VIP Concierge managed everything from Power of Attorney to 3D video walk-throughs and TS-RERA verification seamlessly. The capital appreciation in Neopolis has already exceeded 24%.',
    investmentYear: '2025'
  },
  {
    id: 'test-2',
    name: 'Dr. Radhika & Rajesh Kancherla',
    designation: 'Senior Consultant Surgeons',
    location: 'London, United Kingdom',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    propertyPurchased: 'Arwin One Aurelia (Lakefront Villa, Kokapet)',
    quote: 'We wanted a generational home overlooking the lake with world-class security and Foster + Partners architecture. Arwin delivered with white-glove precision. Their team is on par with luxury brokerages in Mayfair or Dubai.',
    investmentYear: '2025'
  },
  {
    id: 'test-3',
    name: 'Murali Krishna Varma',
    designation: 'Founder & Chairman, Global Pharma Logistics',
    location: 'Jubilee Hills, Hyderabad',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    propertyPurchased: 'The Crestwood Manor (Jubilee Hills)',
    quote: 'When dealing with properties north of ₹40 Crores, absolute confidentiality and legal due diligence are non-negotiable. Arwin’s private wealth team provided unparalleled discretion and bespoke advisory.',
    investmentYear: '2026'
  }
];

export const INDUSTRY_AWARDS = [
  {
    title: 'Best Ultra-Luxury Developer & Brokerage',
    organization: 'Telangana Real Estate Excellence Awards 2025',
    year: '2025'
  },
  {
    title: 'Highest NRI Volume & Transaction Value',
    organization: 'Global Indian Wealth & Property Forum',
    year: '2025'
  },
  {
    title: 'Pinnacle Architectural Achievement (The Luminary)',
    organization: 'South Asian High-Rise Design Summit',
    year: '2026'
  }
];
