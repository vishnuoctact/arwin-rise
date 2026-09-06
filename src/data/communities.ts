import { Community } from '../types/property';

export const COMMUNITIES: Community[] = [
  {
    id: 'neopolis',
    name: 'Neopolis (Kokapet)',
    tagline: "The Manhattan of South India — Hyderabad's 60+ Storey Skyward Zone",
    description: 'Neopolis is India’s most ambitious high-rise luxury enclave, featuring multi-tiered green transit zones, ultra-tall residential towers reaching 65+ storeys, and seamless access to ORR Trumpet Interchange.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    avgPricePerSqFtInr: 13800,
    yoyAppreciation: '+21.5%',
    totalListingsCount: 38,
    topHighlights: [
      '60 to 70 Storey Super-tall luxury towers',
      'Underground utility tunnels & automated waste management',
      'Direct Trumpet Flyover to Outer Ring Road (ORR)'
    ],
    keyConnectivity: [
      { destination: 'Financial District', duration: '5 Mins' },
      { destination: 'RGIA Airport', duration: '20 Mins' },
      { destination: 'HITEC City', duration: '12 Mins' }
    ],
    lifestyleVibe: 'Futuristic Ultra-Luxury High-Rises & Sky Mansions'
  },
  {
    id: 'kokapet',
    name: 'Kokapet Golden Mile',
    tagline: "Hyderabad's Billionaires' Belt & Waterfront Lake Enclaves",
    description: 'Spanning alongside the Outer Ring Road and Gandipet foothills, the Golden Mile is home to private lakefront villas, expansive gated communities, and high-end retail hubs.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80',
    avgPricePerSqFtInr: 15200,
    yoyAppreciation: '+18.8%',
    totalListingsCount: 45,
    topHighlights: [
      'Frontage along scenic Osman Sagar lake breezes',
      'Home to top international schools (Oakridge, Rockwell)',
      'Lowest density per acre among urban residential corridors'
    ],
    keyConnectivity: [
      { destination: 'US Consulate', duration: '6 Mins' },
      { destination: 'Wipro Circle', duration: '7 Mins' },
      { destination: 'Airport Express Metro', duration: '3 Mins' }
    ],
    lifestyleVibe: 'Private Lakefront Mansions & Gated Enclaves'
  },
  {
    id: 'jubilee-hills',
    name: 'Jubilee Hills & Banjara Hills',
    tagline: 'Legacy Wealth, Heritage Estates & VIP Political Corridors',
    description: 'The historic epicentre of Hyderabad’s old-money elite, film industry luminaries, and corporate titans. Home to Michelin-level fine dining, KBR National Park, and sprawling palatial estates.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
    avgPricePerSqFtInr: 28500,
    yoyAppreciation: '+14.2%',
    totalListingsCount: 22,
    topHighlights: [
      'Prestigious Road 36 & Road 45 luxury lifestyle corridors',
      'Exclusive membership clubs: Jubilee Hills International Club',
      'Freehold land plots commanding highest price per sq. yard in Telangana'
    ],
    keyConnectivity: [
      { destination: 'KBR Park', duration: '2 Mins' },
      { destination: 'Apollo Hospitals', duration: '5 Mins' },
      { destination: 'HITEC City Metro', duration: '8 Mins' }
    ],
    lifestyleVibe: 'Generational Prestige, Exclusive Clubs & High Fashion'
  },
  {
    id: 'financial-district',
    name: 'Financial District (Nanakramguda)',
    tagline: 'Global Corporate Powerhouse & C-Suite High-Rise Living',
    description: 'The engine room of Hyderabad’s IT and finance boom. Home to the world’s largest corporate campuses (Google, Microsoft, Amazon), the US Consulate, and sleek luxury serviced residences.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    avgPricePerSqFtInr: 12500,
    yoyAppreciation: '+16.5%',
    totalListingsCount: 52,
    topHighlights: [
      'Highest rental yields in Hyderabad (5.8% - 7.2%)',
      'US Consulate General and diplomatic enclave',
      'Walk-to-work culture for global executives'
    ],
    keyConnectivity: [
      { destination: 'Google Campus', duration: '2 Mins' },
      { destination: 'Continental Hospital', duration: '3 Mins' },
      { destination: 'Airport Express Tollway', duration: '18 Mins' }
    ],
    lifestyleVibe: 'Cosmopolitan High-Density Executive Living'
  },
  {
    id: 'tellapur',
    name: 'Tellapur & Mokila',
    tagline: 'Eco-Luxury Villa Sanctuaries & Sprawling Gated Enclaves',
    description: 'The green suburban sanctuary for executives seeking tranquil, low-rise gated community living with world-class clubhouses, equestrian centers, and pristine air quality.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    avgPricePerSqFtInr: 11200,
    yoyAppreciation: '+19.2%',
    totalListingsCount: 29,
    topHighlights: [
      'Spacious 4BHK and 5BHK Tuscan & Mediterranean villas',
      'Cleanest Air Quality Index (AQI) in Western Hyderabad',
      'Rapidly appreciating micro-market due to Radial Road 7 expansion'
    ],
    keyConnectivity: [
      { destination: 'Financial District', duration: '10 Mins' },
      { destination: 'Sancta Maria School', duration: '4 Mins' },
      { destination: 'Lingampally Hub', duration: '8 Mins' }
    ],
    lifestyleVibe: 'Serene Gated Villa Living & Sports Enclaves'
  },
  {
    id: 'gandipet',
    name: 'Gandipet & Osman Sagar',
    tagline: 'Private Waterfront Sanctuaries & Forest Edge Estates',
    description: 'Nestled on the serene banks of Osman Sagar reservoir, Gandipet offers unmatched tranquility, permanent lake view guarantees, and elite weekend farmhouse conversions.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
    avgPricePerSqFtInr: 17500,
    yoyAppreciation: '+17.4%',
    totalListingsCount: 16,
    topHighlights: [
      'Protected lakefront catchment buffer guaranteeing lifelong views',
      'Elite weekend retreats, equestrian clubs, and private boat jetties',
      '15 minutes drive to the Financial District'
    ],
    keyConnectivity: [
      { destination: 'Neopolis', duration: '7 Mins' },
      { destination: 'CBIT & MGIT', duration: '5 Mins' },
      { destination: 'Airport via ORR', duration: '20 Mins' }
    ],
    lifestyleVibe: 'Exclusive Lakeside Mansions & Private Sanctuaries'
  }
];
