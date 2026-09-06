import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, ArrowRight, Phone, TrendingUp, Building, Globe, CheckCircle2, ChevronRight, Home, MapPin, Briefcase, FileText, ShieldCheck, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FEATURED_PROJECTS, COLLECTIONS } from '../data/properties';
import { CORRIDOR_DATA } from './modals/InvestorRoiModal';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  action?: {
    type: 'whatsapp' | 'preview' | 'roi' | 'nri' | 'project' | 'navigate' | 'career' | 'list';
    label: string;
    payload?: any;
  };
}

interface AiChatWidgetProps {
  onRequestPreview?: () => void;
  onOpenRoiModal?: () => void;
  onOpenNriModal?: () => void;
  onOpenListModal?: () => void;
  onOpenCareerModal?: () => void;
  onSelectProject?: (project: any) => void;
  onNavigatePage?: (page: string) => void;
}

const QUICK_PROMPTS = [
  { label: '🏢 Explore Projects', query: 'Show me an overview of all projects and villas' },
  { label: '💎 Signature Residences', query: 'Can you give me details on Signature Residences?' },
  { label: '🤝 Partner With Us', query: 'How does Partner With Us work and how can I join?' },
  { label: '📈 Check Corridor ROI', query: 'What is the ROI across Neopolis and Hyderabad corridors?' },
  { label: '🌴 Dubai Collection & Golden Visa', query: 'Tell me about the Dubai Private Collection and Golden Visa' },
  { label: '🏡 Villa Estates', query: 'What luxury villas do you have in Shankarpally?' },
  { label: '🌐 NRI Property Advisory', query: 'How does Arwin Rise support NRI buyers?' },
  { label: '📑 Booking & Payment Plans', query: 'What is the booking process and payment schedule?' },
  { label: '🏷️ Sell My Property', query: 'How can I list and sell my luxury property with you?' }
];

const FormattedBotMessage: React.FC<{ text: string }> = ({ text }) => {
  const paragraphs = text.split('\n\n');

  return (
    <div className="space-y-2.5">
      {paragraphs.map((p, pIdx) => {
        const lines = p.split('\n');
        const firstLine = lines[0].trim();

        // Check for Philosophy / Quote
        const isPhilosophy =
          firstLine.includes('Philosophy:') ||
          firstLine.startsWith('"') ||
          firstLine.includes('Advisory Philosophy:');

        if (isPhilosophy) {
          return (
            <div
              key={pIdx}
              className="border-l-2 border-[#C5A880] pl-3 py-1.5 bg-[#FAF7F2] rounded-r-xs my-2 text-[11.5px] font-serif italic text-neutral-700 leading-relaxed shadow-2xs"
            >
              {lines.map((l, lIdx) => (
                <div key={lIdx}>{l.replace(/^•\s*Philosophy:\s*/i, '').replace(/^✨\s*Advisory Philosophy:\s*/i, '').replace(/^✨\s*Philosophy:\s*/i, '')}</div>
              ))}
            </div>
          );
        }

        // Check if first line is a section header (starts with emoji)
        const isHeader = /^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(firstLine);

        return (
          <div key={pIdx} className="space-y-1">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return null;

              if (lIdx === 0 && isHeader) {
                return (
                  <div
                    key={lIdx}
                    className="font-serif font-semibold text-xs sm:text-[13px] text-[#771722] tracking-wide pb-1 border-b border-[#EAE3DA]/60 flex items-center gap-1.5"
                  >
                    {trimmed}
                  </div>
                );
              }

              if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 text-xs text-[#333333] leading-relaxed pl-1 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-1.5 flex-shrink-0" />
                    <span className="flex-1">{trimmed.replace(/^[•\-]\s*/, '')}</span>
                  </div>
                );
              }

              if (/^\d+\.\s/.test(trimmed)) {
                const num = trimmed.match(/^(\d+)\.\s/)?.[1];
                const content = trimmed.replace(/^\d+\.\s*/, '');
                return (
                  <div key={lIdx} className="flex items-start gap-2 text-xs text-[#333333] leading-relaxed pl-0.5 py-0.5">
                    <span className="text-[9.5px] font-mono font-bold text-[#771722] bg-[#FAF7F2] px-1.5 py-0.5 border border-[#EAE3DA] rounded-xs flex-shrink-0 shadow-2xs">
                      {num}
                    </span>
                    <span className="flex-1">{content}</span>
                  </div>
                );
              }

              return (
                <p key={lIdx} className="text-xs text-[#333333] leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export const AiChatWidget: React.FC<AiChatWidgetProps> = ({
  onRequestPreview,
  onOpenRoiModal,
  onOpenNriModal,
  onOpenListModal,
  onOpenCareerModal,
  onSelectProject,
  onNavigatePage
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Namaste & Welcome to ARWIN RISE Private Advisory. I am your 24/7 Private Luxury Property Concierge.',
      timestamp: 'Just now'
    },
    {
      id: 'welcome-2',
      sender: 'bot',
      text: 'How may I assist your property acquisition or investment portfolio today? You can inquire about our curated collections (Signature, Luxury, Private Estates), individual residences, corridor CAGR forecasts, booking procedures, or representation partnerships.',
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Fade in floating chat icon after the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 180) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Master Comprehensive Knowledge Engine
  const generateLocalResponse = (query: string): { text: string; action?: Message['action'] } => {
    const q = query.toLowerCase().trim();

    // -------------------------------------------------------------
    // 0. EXPLORE ALL PROJECTS / OVERVIEW OF PORTFOLIO
    // -------------------------------------------------------------
    if (
      q.includes('explore project') ||
      q.includes('all project') ||
      q.includes('projects and villa') ||
      q.includes('overview of all project') ||
      q.includes('list of project') ||
      q.includes('what project') ||
      q.includes('show all') ||
      (q.includes('project') && !q.includes('skyline') && !q.includes('courtyard') && !q.includes('westside') && !q.includes('sovereign') && !q.includes('signature residence'))
    ) {
      return {
        text: `🏛️ ARWIN RISE Portfolio — Signature Developments & Villas:\n\n1. 🏢 The Skyline Towers (Kukatpally):\n   • Iconic G+46 floor towers across 7.8 acres\n   • 3 & 4 BHK Luxury Suites (1,587–3,261 sft) from ₹ 1.98 Cr+\n   • 46th-Floor Sky Lounge, Lake views & TS-RERA approved.\n\n2. ✨ The Courtyard Residences (Neopolis):\n   • 3 & 3.5 BHK Sky Residences (1,850–2,600 sft) from ₹ 1.65 Cr+\n   • 7-Level Clubhouse, central water courtyard & infinity pool.\n\n3. 🏡 The Westside Triplex Villas (Shankarpally):\n   • 5 BHK Triplex Boutique Villas (3,800–4,800 sft) from ₹ 3.20 Cr+\n   • Private plunge pools, private elevators & rooftop terraces.\n\n4. 👑 The Sovereign Palatial Mansions (Shankarpally):\n   • 900 Sq.Yd. Palatial Estates (7,500–11,500 sft) from ₹ 6.50 Cr+\n   • 30,000 sq.ft Royal Clubhouse, private infinity pool across 42 acres.\n\n5. 🌴 Dubai Private Collection (Downtown & Palm Jumeirah):\n   • 2–5 BHK Waterfront Penthouses (AED 2M+/₹ 4.5 Cr+) with 10-Yr Golden Visa.\n\nWhich development or configuration matches your vision?`,
        action: {
          type: 'navigate',
          label: 'VIEW COMPLETE RESIDENCES DIRECTORY',
          payload: 'residences'
        }
      };
    }

    // -------------------------------------------------------------
    // 0.1 BUYER INTENT / PLANNING TO BUY PROPERTY
    // -------------------------------------------------------------
    if (
      q.includes('plan to buy') ||
      q.includes('planning to buy') ||
      q.includes('want to buy') ||
      q.includes('looking to buy') ||
      q.includes('buy property') ||
      q.includes('buying') ||
      q.includes('purchase') ||
      q.includes('interested to buy')
    ) {
      return {
        text: `✨ Planning Your Luxury Property Acquisition:\n\nOur advisory desk specializes in personalized, confidential representation across Hyderabad & Dubai:\n\n1. 🏢 Landmark Sky Residences: The Skyline Towers (Kukatpally G+46 from ₹ 1.98 Cr) & The Courtyard Residences (Neopolis from ₹ 1.65 Cr).\n2. 🏡 Boutique Triplex Villas: The Westside Triplex Villas (Shankarpally 5 BHK from ₹ 3.20 Cr).\n3. 👑 Palatial 900 Sq.Yd. Estates: The Sovereign Mansions (Shankarpally from ₹ 6.50 Cr).\n4. 🌴 Dubai Waterfront Penthouses: Tax-free 8–10% yields with 10-Year Golden Visa (from ₹ 4.5 Cr+).\n\nWhat is your preferred budget range or location preference?`,
        action: {
          type: 'preview',
          label: 'SCHEDULE PRIVATE PROPERTY CONSULTATION'
        }
      };
    }

    // -------------------------------------------------------------
    // 1. PARTNER WITH US / CAREERS / JOBS / FRESHERS
    // -------------------------------------------------------------
    if (
      q.includes('partner') ||
      q.includes('career') ||
      q.includes('job') ||
      q.includes('work with') ||
      q.includes('fresher') ||
      q.includes('hire') ||
      q.includes('hiring') ||
      q.includes('recruitment') ||
      q.includes('resume') ||
      q.includes('salary') ||
      q.includes('commission') ||
      q.includes('channel partner') ||
      q.includes('join')
    ) {
      return {
        text: `🤝 PARTNER WITH US — For the Most Rewarding Real Estate Career\n\n• Who We Are Looking For: Only serious professionals — Preferably ambitious freshers looking to build an exceptional career in high-ticket real estate advisory.\n• Executive Mentorship: 1-on-1 direct coaching under the Founder & Managing Leadership of ARWIN RISE.\n• High-Ticket Exposure: Representation of ₹1.5 Cr to ₹35 Cr+ ultra-luxury residences in Hyderabad & Dubai Waterfront penthouses.\n• Earnings & Growth: Industry-leading commission structures with uncapped upside on transactions.\n• Candidate Caliber: Strong communication, hunger to learn, high integrity, and executive presence.\n\nWould you like to submit your resume online or connect with our recruitment desk via WhatsApp?`,
        action: {
          type: 'career',
          label: 'SUBMIT APPLICATION & RESUME'
        }
      };
    }

    // -------------------------------------------------------------
    // 2. CURATED COLLECTIONS (01, 02, 03 & DUBAI)
    // -------------------------------------------------------------
    // Collection 01: Signature Residences
    if (
      q.includes('signature residence') ||
      q.includes('collection 1') ||
      q.includes('collection 01') ||
      q.includes('tier 1') ||
      q.includes('tier 01') ||
      q.includes('1.5 cr') ||
      q.includes('1.5cr') ||
      q.includes('1.5 - 3') ||
      q.includes('1.5 to 3') ||
      (q.includes('signature') && !q.includes('project') && !q.includes('overview') && !q.includes('all'))
    ) {
      return {
        text: `💎 01 | SIGNATURE RESIDENCES (₹ 1.5 Cr — ₹ 3 Cr)\n\n• Typology: 3 & 3.5 BHK Luxury Residences (1,587 – 2,450 Sq.Ft.)\n• Micro-Markets: Kukatpally, Shankarpally, Mokila, Kollur, Miyapur, Rajendra Nagar\n• Flagship Project: The Skyline Towers (G+46 iconic towers in Kukatpally with panoramic lake views)\n• Specifications: Italian marble flooring, 10-ft ceiling heights, energy-efficient glazing, EV fast-charging at every bay.\n• Clubhouse: 35,000+ sq.ft featuring temperature-controlled pool, squash courts, private theatre & co-working.\n• Compliance: 100% TS-RERA Approved.\n\nWould you like to explore available floor plans or book a private site visit?`,
        action: {
          type: 'navigate',
          label: 'EXPLORE SIGNATURE RESIDENCES IN DIRECTORY',
          payload: 'residences'
        }
      };
    }

    // Collection 02: Luxury Residences
    if (
      q.includes('luxury residence') ||
      q.includes('collection 2') ||
      q.includes('collection 02') ||
      q.includes('tier 2') ||
      q.includes('tier 02') ||
      q.includes('3 cr to 6 cr') ||
      q.includes('3-6 cr') ||
      q.includes('3 cr — 6 cr')
    ) {
      return {
        text: `✨ 02 | LUXURY RESIDENCES (₹ 3 Cr — ₹ 6 Cr)\n\n• Typology: 4 & 5 BHK Sky Mansions, Penthouses & Triplex Villas (3,212 – 5,400 Sq.Ft.)\n• Micro-Markets: Kollur, Mokila, Future City, Financial District, Neopolis\n• Key Projects: The Courtyard Residences (Neopolis) & The Westside Triplex Villas (Shankarpally)\n• Highlights: Private elevator access directly into living foyer, double-height sundecks, 50,000+ sq.ft resort clubhouse with infinity sky pool & spa, 24/7 biometric multi-tier security.\n\nWould you like to view detailed unit specifications or schedule a private consultation?`,
        action: {
          type: 'navigate',
          label: 'EXPLORE LUXURY RESIDENCES',
          payload: 'residences'
        }
      };
    }

    // Collection 03: Private Residences
    if (
      q.includes('private residence') ||
      q.includes('collection 3') ||
      q.includes('collection 03') ||
      q.includes('tier 3') ||
      q.includes('tier 03') ||
      q.includes('palatial') ||
      q.includes('6 cr') ||
      q.includes('35 cr') ||
      q.includes('mansion') ||
      q.includes('sovereign')
    ) {
      return {
        text: `👑 03 | PRIVATE RESIDENCES (₹ 6 Cr — ₹ 35 Cr+)\n\n• Typology: 5 & 6 BHK Palatial Estates & Ultra-Luxury Sky Penthouses (7,500 – 11,500 Sq.Ft.)\n• Micro-Markets: Shankarpally, Gachibowli, Nanakramguda, Neopolis\n• Key Project: The Sovereign Palatial Mansions (900 sq.yd private plots set across 42 acres in Shankarpally)\n• Highlights: Grand double-height living pavilions, private infinity temperature-controlled pools, private elevators, 30,000 sq.ft royal clubhouse, tennis arena, organic orchard trails, and dedicated estate concierge. By private allocation only.`,
        action: {
          type: 'preview',
          label: 'REQUEST PRIVATE ALLOCATION DOSSIER'
        }
      };
    }

    // Dubai Collection
    if (
      q.includes('dubai') ||
      q.includes('golden visa') ||
      q.includes('uae') ||
      q.includes('international') ||
      q.includes('palm jumeirah') ||
      q.includes('downtown dubai') ||
      q.includes('marina')
    ) {
      return {
        text: `🌴 DUBAI PRIVATE COLLECTION (AED 2M — 25M+ / ₹ 4.5 Cr — 55 Cr+)\n\n• Typology: 2 to 5 BHK Waterfront Penthouses & Sky Villas (1,800 – 8,500 Sq.Ft.)\n• Prime Addresses: Downtown Dubai (Burj Khalifa views), Palm Jumeirah, and Dubai Marina\n• Investment Highlights:\n  ✓ 8% to 10% Tax-Free Net Rental Yields\n  ✓ Eligible for 10-Year UAE Golden Visa for investor and immediate family\n  ✓ 0% Personal Income & Capital Gains Tax\n  ✓ Complete NRI asset management, tenant onboarding & USD-pegged repatriation\n  ✓ VIP allocations with zero foreign buyer restrictions.`,
        action: {
          type: 'whatsapp',
          label: 'CONNECT WITH DUBAI DESK ON WHATSAPP',
          payload: 'https://wa.me/918464954321?text=Hello%20Arwin%20Rise,%20I%20am%20interested%20in%20the%20Dubai%20Private%20Collection%20and%20UAE%20Golden%20Visa%20advisory.'
        }
      };
    }

    // -------------------------------------------------------------
    // 3. SPECIFIC FEATURED PROJECTS (FULL SPECS)
    // -------------------------------------------------------------
    // The Skyline Towers
    if (q.includes('skyline') || q.includes('kukatpally') || q.includes('g+46') || q.includes('kphb')) {
      const proj = FEATURED_PROJECTS.find(p => p.id === 'skyline-towers-kphb');
      return {
        text: `🏢 THE SKYLINE TOWERS (Kukatpally, Hyderabad)\n\n• Land Area & Scale: 7.8 Acres, Iconic G+46 Floor High-Rise Towers\n• Typologies & Pricing:\n  - 3 BHK Luxe (1,587 – 1,899 Sq.Ft.) — ₹ 1.98 Cr onwards\n  - 3 BHK Grande (1,992 – 2,214 Sq.Ft.) — ₹ 2.50 Cr onwards\n  - 4 BHK Luxury Suite (3,212 – 3,261 Sq.Ft.) — ₹ 3.98 Cr onwards\n• Amenities: 46th-Floor Rooftop Sky Lounge, Panoramic Lake Views, Temperature-Controlled Pool, Squash & Badminton Courts, Private Mini Theatre, EV Fast Charging at Every Bay.\n• Status: 100% TS-RERA Approved (P02200010981).`,
        action: {
          type: 'project',
          label: 'INSPECT THE SKYLINE TOWERS',
          payload: proj
        }
      };
    }

    // The Courtyard Residences
    if (q.includes('courtyard') || (q.includes('neopolis') && (q.includes('residence') || q.includes('flat') || q.includes('apartment') || q.includes('condo')))) {
      const proj = FEATURED_PROJECTS.find(p => p.id === 'courtyard-residences-mokila');
      return {
        text: `✨ THE COURTYARD RESIDENCES (Neopolis, Hyderabad)\n\n• Typology: 3 & 3.5 BHK Sky Residences (1,850 – 2,600 Sq.Ft.)\n• Pricing:\n  - 3 BHK Grand Courtyard (1,850 Sq.Ft.) — ₹ 1.65 Cr\n  - 3.5 BHK Luxury Suite (2,250 Sq.Ft.) — ₹ 2.10 Cr\n  - 4 BHK Penthouse (2,600 Sq.Ft.) — ₹ 2.65 Cr\n• Highlights: Built around an exquisite 7-level clubhouse, central water courtyard, temperature-controlled pool, sky lounge & co-working, banquet hall, squash court.\n• Status: TS RERA Approved (P02400009123).`,
        action: {
          type: 'project',
          label: 'VIEW COURTYARD RESIDENCES',
          payload: proj
        }
      };
    }

    // The Westside Triplex Villas
    if (q.includes('westside') || (q.includes('triplex') && (q.includes('villa') || q.includes('house'))) || (q.includes('shankarpally') && q.includes('3.2'))) {
      const proj = FEATURED_PROJECTS.find(p => p.id === 'westside-triplex-villas');
      return {
        text: `🏡 THE WESTSIDE TRIPLEX VILLAS (Shankarpally, Hyderabad)\n\n• Land Area: 10-Acre Bespoke Gated Community\n• Typology: 5 BHK Triplex Boutique Villas (3,800 – 4,800 Sq.Ft.)\n• Unit Sizes & Pricing:\n  - 5 BHK Triplex (250 Sq.Yd / 3,800 sft) — ₹ 3.20 Cr\n  - 5 BHK Triplex (300 Sq.Yd / 4,400 sft) — ₹ 3.85 Cr\n  - 5 BHK Corner Villa (350 Sq.Yd / 4,800 sft) — ₹ 4.40 Cr\n• Features: Private plunge pool & sun deck, private elevator provision, landscaped rooftop party deck, underground smart cabling, yoga pavilion.\n• Status: TS RERA Approved (P02400007892).`,
        action: {
          type: 'project',
          label: 'EXPLORE WESTSIDE VILLAS',
          payload: proj
        }
      };
    }

    // The Sovereign Palatial Mansions
    if (q.includes('sovereign') || q.includes('palatial') || (q.includes('mansion') && q.includes('shankarpally')) || q.includes('900 sq')) {
      const proj = FEATURED_PROJECTS.find(p => p.id === 'sovereign-palatial-mansions');
      return {
        text: `👑 THE SOVEREIGN PALATIAL MANSIONS (Shankarpally, Hyderabad)\n\n• Land Scale: 900 Sq.Yd. Palatial Estates set across a 42-Acre Masterplan\n• Typologies & Pricing:\n  - 5 BHK Royal Palace (7,500 Sq.Ft.) — ₹ 6.50 Cr\n  - 6 BHK Imperial Estate (9,200 Sq.Ft.) — ₹ 7.80 Cr\n  - 6 BHK Sovereign Mansion (11,500 Sq.Ft.) — ₹ 8.90 Cr\n• Amenities: 30,000 sq.ft Royal Clubhouse, private infinity pools, tennis & squash arena, organic orchard trails, 24/7 dedicated estate manager.\n• Status: TS RERA Approved (P02400008812).`,
        action: {
          type: 'project',
          label: 'VIEW SOVEREIGN MANSIONS',
          payload: proj
        }
      };
    }

    // -------------------------------------------------------------
    // 4. TYPOLOGIES & ROOM SEARCH (3 BHK, 4 BHK, 5 BHK, VILLAS, PLOTS)
    // -------------------------------------------------------------
    if (q.includes('3 bhk') || q.includes('3bhk') || q.includes('3.5 bhk') || q.includes('3 bedroom')) {
      return {
        text: `🏢 3 & 3.5 BHK Luxury Residences in ARWIN Portfolio:\n\n1. The Skyline Towers (Kukatpally): 1,587 – 2,214 sft (₹ 1.98 Cr – ₹ 2.50 Cr) — Lake views, G+46 Iconic Towers\n2. The Courtyard Residences (Neopolis): 1,850 – 2,250 sft (₹ 1.65 Cr – ₹ 2.10 Cr) — 7-level clubhouse\n3. Curated Signature Residences across Mokila, Kollur & Rajendra Nagar (₹ 1.5 Cr – ₹ 3 Cr)\n\nWhich location or price point aligns best with your requirement?`,
        action: {
          type: 'navigate',
          label: 'VIEW 3 BHK RESIDENCES',
          payload: 'residences'
        }
      };
    }

    if (q.includes('4 bhk') || q.includes('4bhk') || q.includes('5 bhk') || q.includes('5bhk') || q.includes('penthouse') || q.includes('sky mansion')) {
      return {
        text: `✨ 4 & 5 BHK Luxury Suites, Mansions & Penthouses:\n\n1. The Skyline Towers (Kukatpally): 4 BHK Penthouse Suite 3,261 sft (₹ 3.98 Cr)\n2. The Westside Triplex Villas (Shankarpally): 5 BHK Triplex 3,800–4,800 sft (₹ 3.20 Cr – ₹ 4.40 Cr)\n3. The Sovereign Palatial Mansions (Shankarpally): 5 & 6 BHK 7,500–11,500 sft (₹ 6.50 Cr – ₹ 8.90 Cr)\n4. Dubai Waterfront Penthouses (Downtown / Palm): 2–5 BHK (₹ 4.5 Cr – ₹ 55 Cr+)\n\nWould you like a detailed comparative floor plan dossier?`,
        action: {
          type: 'preview',
          label: 'REQUEST 4 & 5 BHK DOSSIER'
        }
      };
    }

    if (q.includes('villa') || q.includes('villas') || q.includes('gated community') || q.includes('independent house')) {
      return {
        text: `🏡 Luxury Villa Communities in ARWIN Portfolio:\n\n1. The Westside Triplex Villas (Shankarpally): 5 BHK (3,800–4,800 sft) with private plunge pool & elevator from ₹ 3.20 Cr+\n2. The Sovereign Palatial Mansions (Shankarpally): 900 Sq.Yd Palatial Estates (7,500–11,500 sft) from ₹ 6.50 Cr+\n3. Mokila & Kollur Luxury Villa Belt: Gated triplex communities from ₹ 3.0 Cr onwards.\n\nAll villa projects are TS-RERA verified with 100% clear legal titles and private compound walls.`,
        action: {
          type: 'whatsapp',
          label: 'SCHEDULE PRIVATE VILLA TOUR',
          payload: 'https://wa.me/918464954321?text=Hello%20Arwin%20Rise,%20I%20would%20like%20to%20schedule%20a%20private%20tour%20for%20your%20villa%20projects.'
        }
      };
    }

    if (q.includes('plot') || q.includes('land') || q.includes('bangalore highway') || q.includes('farmland') || q.includes('acres')) {
      return {
        text: `🌱 Plotted Developments & Highway Strategic Land:\n\n• Bangalore Highway Corridor: High-appreciation plotted estates (16.8% CAGR · 3.2% yield)\n• Future City Innovation Megacity: Next-gen masterplanned plotted assets (18.5% CAGR)\n• Shankarpally Eco Belt: Farmland estates & large land-share holdings (15.5% CAGR).\n\nWould you like to speak to our land wealth advisory team for off-market parcels?`,
        action: {
          type: 'whatsapp',
          label: 'CHAT WITH LAND ADVISORY DESK',
          payload: 'https://wa.me/918464954321?text=Hello%20Arwin%20Rise,%20I%20am%20interested%20in%20plotted%20developments%20and%20land%20assets.'
        }
      };
    }

    // -------------------------------------------------------------
    // 5. LOCATION & MICRO-MARKET SPECIFIC PROPERTY SEARCH
    // -------------------------------------------------------------
    // Kollur & Tellapur
    if (q.includes('kollur') || q.includes('tellapur')) {
      return {
        text: `🏢 Luxury Residences in Kollur & Tellapur Corridor:\n\n• Typology: 3 & 3.5 BHK Signature Suites (1,650 – 2,450 Sq.Ft.) and Gated Triplex Villas.\n• Price Range: ₹ 1.50 Cr — ₹ 3.50 Cr\n• Corridor Highlights: Direct ORR Exit 2 connectivity, 15-minute commute to Financial District, adjacent to top international schools (Gaudium, Samashti).\n• Appreciation & Yield: 16.0% Verified YoY CAGR with strong 4.0% rental yield from IT leadership.\n• Compliance: 100% TS-RERA approved with clear legal titles.\n\nWould you like to review available units and floor plans in Kollur / Tellapur?`,
        action: {
          type: 'navigate',
          label: 'EXPLORE KOLLUR & TELLAPUR PROPERTIES',
          payload: 'residences'
        }
      };
    }

    // Mokila
    if (q.includes('mokila')) {
      return {
        text: `🏡 Luxury Villas & Residences in Mokila:\n\n• Typology: 4 & 5 BHK Gated Triplex Villas (3,500 – 4,800 Sq.Ft.) and Signature High-Rises.\n• Price Range: ₹ 2.20 Cr — ₹ 4.50 Cr\n• Highlights: Serene green corridor along Shankarpally road, premium gated villa enclaves, resort clubhouse amenities.\n• Appreciation & Yield: 17.2% CAGR with high capital growth.\n• Compliance: 100% TS-RERA verified.\n\nWould you like to schedule a private site preview in Mokila?`,
        action: {
          type: 'navigate',
          label: 'EXPLORE MOKILA PROPERTIES',
          payload: 'residences'
        }
      };
    }

    // Neopolis & Kokapet
    if (q.includes('neopolis') || q.includes('kokapet')) {
      const proj = FEATURED_PROJECTS.find(p => p.id === 'courtyard-residences-mokila');
      return {
        text: `✨ Ultra-Luxury Residences in Neopolis & Kokapet (Golden Mile):\n\n• Featured Project: The Courtyard Residences (3 & 3.5 BHK from ₹ 1.65 Cr+ with 7-level clubhouse) & 02 | Luxury Sky Mansions (₹ 3 Cr — ₹ 6 Cr).\n• Highlights: Hyderabad's pinnacle commercial & residential skyline, Trump corridor, high-speed trumpet interchange.\n• Appreciation & Yield: 20.5% CAGR in Neopolis (Rank #1 in Hyderabad) & 18.8% CAGR in Kokapet with 4.5% net rental yields.\n• Compliance: TS-RERA approved.\n\nWould you like to inspect available sky suites in Neopolis?`,
        action: {
          type: 'project',
          label: 'INSPECT NEOPOLIS SKY RESIDENCES',
          payload: proj
        }
      };
    }

    // Gachibowli, Financial District & Nanakramguda
    if (q.includes('gachibowli') || q.includes('financial district') || q.includes('nanakramguda') || q.includes('hitec')) {
      return {
        text: `🏢 Prime Residences in Financial District, Gachibowli & Nanakramguda:\n\n• Typologies: 3, 4 & 5 BHK Ultra-Luxury Residences (₹ 2.50 Cr — ₹ 8.0 Cr+).\n• Highlights: Heart of Hyderabad's global tech corridor, walking proximity to Microsoft, Google, Amazon campuses.\n• Investment Profile: 16.2% – 16.5% CAGR with peak 4.8% net rental yields.\n• Status: Grade-A TS-RERA approved developments.\n\nWould you like our advisory team to share curated high-floor units?`,
        action: {
          type: 'navigate',
          label: 'VIEW FINANCIAL DISTRICT RESIDENCES',
          payload: 'residences'
        }
      };
    }

    // Rajendra Nagar & Budvel
    if (q.includes('rajendra nagar') || q.includes('budvel') || q.includes('airport')) {
      return {
        text: `✈️ High-Growth Residences in Rajendra Nagar & Airport Corridor:\n\n• Typologies: 3 & 3.5 BHK Signature High-Rise Suites (₹ 1.50 Cr — ₹ 3.0 Cr).\n• Highlights: Direct connectivity via PVNR Expressway, proposed Metro Phase 2 Airport Express, Budvel IT cluster expansion.\n• Growth & Yield: 17.0% CAGR with strong capital upside.\n• Status: 100% TS-RERA approved.\n\nWould you like a comparative pricing sheet for Rajendra Nagar?`,
        action: {
          type: 'navigate',
          label: 'EXPLORE RAJENDRA NAGAR RESIDENCES',
          payload: 'residences'
        }
      };
    }

    // -------------------------------------------------------------
    // 6. ALL 14 CORRIDORS & FINANCIAL ROI SIMULATOR
    // -------------------------------------------------------------
    if (
      q.includes('roi') ||
      q.includes('return') ||
      q.includes('growth') ||
      q.includes('cagr') ||
      q.includes('appreciation') ||
      q.includes('yield') ||
      q.includes('rental yield') ||
      q.includes('invest') ||
      q.includes('simulator') ||
      q.includes('calculator') ||
      q.includes('corridor')
    ) {
      return {
        text: `📈 Verified Corridor CAGR & Rental Yield Benchmarks:\n\n• Neopolis Luxury Pinnacle: 20.5% CAGR · 4.5% Net Yield\n• Kokapet Golden Mile: 18.8% CAGR · 4.2% Net Yield\n• Future City Megacity: 18.5% CAGR · 3.5% Net Yield\n• Kukatpally Metro Corridor: 17.5% CAGR · 4.4% Net Yield\n• Mokila Villa Belt: 17.2% CAGR · 3.8% Net Yield\n• Rajendra Nagar / Budvel Hub: 17.0% CAGR · 4.1% Net Yield\n• Bangalore Highway Belt: 16.8% CAGR · 3.2% Net Yield\n• Financial District Hub: 16.5% CAGR · 4.8% Net Yield\n• Gachibowli IT Belt: 16.2% CAGR · 4.6% Net Yield\n• Kollur & Tellapur Corridor: 16.0% CAGR · 4.0% Net Yield\n• Nanakramguda Tech Center: 15.8% CAGR · 4.6% Net Yield\n• Shankarpally Eco Corridor: 15.5% CAGR · 3.6% Net Yield\n• Miyapur Metro Enclave: 15.0% CAGR · 4.2% Net Yield\n• Dubai Prime Waterfront: 14.5% CAGR · 8.2% Net Yield\n\nClick below to calculate multi-year wealth compounding on our interactive simulator:`,
        action: {
          type: 'roi',
          label: 'OPEN 14-CORRIDOR ROI SIMULATOR'
        }
      };
    }

    // -------------------------------------------------------------
    // 6. BOOKING PROCESS, PAYMENT PLANS & STAMP DUTY
    // -------------------------------------------------------------
    if (
      q.includes('booking') ||
      q.includes('payment') ||
      q.includes('schedule') ||
      q.includes('milestone') ||
      q.includes('loan') ||
      q.includes('stamp duty') ||
      q.includes('registration') ||
      q.includes('bank') ||
      q.includes('process') ||
      q.includes('how to buy')
    ) {
      return {
        text: `📑 Booking & Acquisition Process:\n\n1. Expression of Interest (EOI): 10% booking token to lock unit & price.\n2. Agreement of Sale (AOS): Executed within 30 days upon 20% milestone payment.\n3. Construction-Linked Plan (CLP): Transparent milestone payments tied to slab completion & finishes.\n4. Stamp Duty & Registration: In Telangana, standard charges are 7.5% (Stamp Duty 5.5% + Transfer 1.5% + Registration 0.5%).\n5. Home Loan Support: Pre-approved tie-ups with HDFC, ICICI, SBI, Axis & HSBC for Indian & NRI applicants.\n6. Escrow Protection: 100% payments routed through TS-RERA designated project escrow accounts.`,
        action: {
          type: 'preview',
          label: 'REQUEST PAYMENT SCHEDULE DOSSIER'
        }
      };
    }

    // -------------------------------------------------------------
    // 7. NRI ADVISORY, FEMA, POA & BANKING
    // -------------------------------------------------------------
    if (
      q.includes('nri') ||
      q.includes('overseas') ||
      q.includes('usa') ||
      q.includes('uk') ||
      q.includes('power of attorney') ||
      q.includes('poa') ||
      q.includes('remittance') ||
      q.includes('rera') ||
      q.includes('legal') ||
      q.includes('tax') ||
      q.includes('repatriation') ||
      q.includes('fema') ||
      q.includes('nre') ||
      q.includes('nro')
    ) {
      return {
        text: `🌐 ARWIN NRI Client Services (Over 300+ NRI Families Advised):\n\n✓ Virtual 3D & 4K Walkthroughs: Remote live property inspections from USA, UK, UAE & Singapore.\n✓ Legal Title Audit: 100% encumbrance-free verification & TS-RERA compliance.\n✓ Consular PoA Facilitation: Seamless power-of-attorney drafting & embassy attestation support without travel.\n✓ NRE/NRO Banking: FEMA compliant remittance coordination and tax-efficient repatriation.\n✓ Complete Asset Management: Tenant vetting, digital lease execution & rental collection.`,
        action: {
          type: 'nri',
          label: 'RESERVE NRI ADVISORY SESSION'
        }
      };
    }

    // -------------------------------------------------------------
    // 8. SELLER / LISTING DESK
    // -------------------------------------------------------------
    if (q.includes('sell') || q.includes('list') || q.includes('owner') || q.includes('post property') || q.includes('resale')) {
      return {
        text: `🏷️ Private Seller Representation (₹ 1.5 Cr+ Grade-A Assets):\n\n• Exclusive Network: Direct access to 4,500+ pre-vetted Grade-A, Elite & NRI buyers.\n• Complete Discretion: Confidential off-market marketing with zero spam calls.\n• 48-Hour Launch: Professional 4K architectural photography & cinematic video walkthrough.\n• Legal & Valuation Audit: Comprehensive civil structural review and fair market benchmarking.`,
        action: {
          type: 'list',
          label: 'SUBMIT PROPERTY FOR REPRESENTATION'
        }
      };
    }

    // -------------------------------------------------------------
    // 9. LEADERSHIP, FIRM BACKGROUND & TRACK RECORD
    // -------------------------------------------------------------
    if (q.includes('founder') || q.includes('director') || q.includes('who is') || q.includes('about') || q.includes('experience') || q.includes('track record') || q.includes('team') || q.includes('management') || q.includes('company')) {
      return {
        text: `🏛️ ARWIN RISE — Executive Advisory & Heritage\n\nFounded on discretion, market mastery, and fiduciary excellence, ARWIN RISE is a premier luxury real estate advisory firm serving High-Net-Worth Individuals, Family Offices, and Global NRIs across Hyderabad & Dubai.\n\n🏆 Proven Institutional Track Record:\n• 10+ Years of Private Luxury Real Estate Mastery\n• 300+ NRI & HNW Global Families Advised\n• ₹100 Cr+ Cumulative Transaction Volume\n• 30+ Landmark Tier-1 Projects Represented\n\n✨ Advisory Philosophy:\n"Real estate is not merely an asset — it is legacy, certainty, and where your next life chapter begins. Life Starts Here."`,
        action: {
          type: 'navigate',
          label: 'EXPLORE OUR FIRM & SERVICES',
          payload: 'about'
        }
      };
    }

    if (q.includes('office') || q.includes('location') || q.includes('address') || q.includes('visit') || q.includes('where') || q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('whatsapp') || q.includes('email')) {
      return {
        text: `📍 ARWIN RISE Private Advisory Office:\n\n• Address: Neopolis, Hyderabad, Telangana, India\n• Office Hours: Monday – Sunday: 10:00 AM – 7:30 PM (IST)\n• Advisory Hotline: +91 84649 54321\n• Global WhatsApp Desk: +91 84649 54321\n• Official Email: concierge@arwinrise.com\n\nWould you like to schedule an in-person meeting or request a direct callback?`,
        action: {
          type: 'whatsapp',
          label: 'SCHEDULE ADVISORY OFFICE VISIT',
          payload: 'https://wa.me/918464954321?text=Hello%20Arwin%20Rise,%20I%20would%20like%20to%20schedule%20an%20in-person%20meeting%20at%20your%20Neopolis%20office.'
        }
      };
    }

    // -------------------------------------------------------------
    // 10. CLIENT REVIEWS & TESTIMONIALS
    // -------------------------------------------------------------
    if (q.includes('review') || q.includes('testimonial') || q.includes('ratings') || q.includes('feedback') || q.includes('trust')) {
      return {
        text: `🌟 Verified Client Endorsements:\n\n• 300+ NRI Clients Advised across Silicon Valley, London, Dubai, Sydney, Dallas & Singapore.\n• 100% 5-Star Ratings on verified transactions.\n• Specializations: High-floor corner suites at The Skyline Towers, Triplex villas in Shankarpally, Neopolis sky mansions, and Dubai tax-free penthouses.`,
        action: {
          type: 'navigate',
          label: 'VIEW VERIFIED CLIENT REVIEWS',
          payload: 'home'
        }
      };
    }

    // -------------------------------------------------------------
    // 11. NEWS, ARTICLES & MARKET INTELLIGENCE
    // -------------------------------------------------------------
    if (q.includes('news') || q.includes('article') || q.includes('market trend') || q.includes('metro phase 2') || q.includes('rbi')) {
      return {
        text: `📰 Market Intelligence Briefings:\n\n1. Neopolis Infrastructure: Trump corridor drives 20.5% YoY capital growth.\n2. Shankarpally Expansion: Gated eco-villas emerge as prime HNWI weekend homes.\n3. Dubai Golden Visa Surge: Indian HNWIs channel record capital into Dubai penthouses.\n4. Hyderabad Metro Phase 2: Airport express and Kokapet connectivity boost absorption.`,
        action: {
          type: 'navigate',
          label: 'READ MARKET BRIEFINGS',
          payload: 'news'
        }
      };
    }

    // -------------------------------------------------------------
    // 12. CONVERSATIONAL GREETINGS
    // -------------------------------------------------------------
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('good morning') || q.includes('good afternoon') || q.includes('good evening') || q.includes('namaste')) {
      return {
        text: `Namaste! How can I assist your luxury property search today?\n\n• Explore Curated Collections (₹ 1.5 Cr — ₹ 35 Cr+)\n• Check Corridor ROI & Capital Growth (14 Corridors)\n• View Shankarpally Triplex Villas & Palatial Mansions\n• Explore The Skyline Towers G+46 in Kukatpally\n• Partner With Us (Advisory Career Opportunities)\n• Invest in Dubai Waterfront Assets (10-Yr Golden Visa)`,
        action: {
          type: 'preview',
          label: 'REQUEST CONFIDENTIAL CONSULTATION'
        }
      };
    }

    // -------------------------------------------------------------
    // 13. SMART CONTEXTUAL FALLBACK
    // -------------------------------------------------------------
    return {
      text: `Regarding "${query}": Our advisory desk specializes in high-ticket residences across Hyderabad (Neopolis, Kokapet, Kukatpally, Shankarpally, Mokila, Financial District), Dubai Waterfront penthouses, and strategic career partnerships.\n\nWould you like us to share curated brochures, floor plans, or connect you directly with Senior Managing Leadership?`,
      action: {
        type: 'whatsapp',
        label: 'CONNECT ON WHATSAPP (+91 84649 54321)',
        payload: `https://wa.me/918464954321?text=Hello%20Arwin%20Rise%20Advisory,%20I%20would%20like%20specific%20details%20regarding:%20${encodeURIComponent(query)}`
      }
    };
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Try Cloudflare Workers AI Endpoint first if deployed, fallback to comprehensive local NLP engine
    let botResponseText = '';
    let botAction: Message['action'] | undefined = undefined;

    try {
      const apiPromise = fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      // Timeout after 2.5s to keep chat snappy
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 2500));
      const res = await Promise.race([apiPromise, timeoutPromise]) as Response;

      if (res && res.ok) {
        const data = await res.json();
        if (data && data.response && !data.fallback) {
          botResponseText = data.response;
        }
      }
    } catch (e) {
      // Local fallback
    }

    if (!botResponseText) {
      const local = generateLocalResponse(query);
      botResponseText = local.text;
      botAction = local.action;
    } else {
      const local = generateLocalResponse(query);
      botAction = local.action;
    }

    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        timestamp: 'Just now',
        action: botAction
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 300);
  };

  const handleActionClick = (action: Message['action']) => {
    if (!action) return;

    switch (action.type) {
      case 'whatsapp':
        if (action.payload) {
          window.open(action.payload, '_blank');
        } else {
          window.open('https://wa.me/918464954321?text=Hello%20Arwin%20Rise%20Advisory%20Desk,%20I%20am%20interested%20in%20your%20luxury%20properties.', '_blank');
        }
        break;
      case 'preview':
        if (onRequestPreview) onRequestPreview();
        break;
      case 'roi':
        if (onOpenRoiModal) onOpenRoiModal();
        break;
      case 'nri':
        if (onOpenNriModal) onOpenNriModal();
        break;
      case 'list':
        if (onOpenListModal) onOpenListModal();
        break;
      case 'career':
        if (onOpenCareerModal) onOpenCareerModal();
        break;
      case 'project':
        if (onSelectProject && action.payload) {
          onSelectProject(action.payload);
          setIsOpen(false);
        }
        break;
      case 'navigate':
        if (onNavigatePage && action.payload) {
          onNavigatePage(action.payload);
          setIsOpen(false);
        }
        break;
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Fades in smoothly after user scrolls down) */}
      <AnimatePresence>
        {(isVisible || isOpen) && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-40"
          >
            <motion.button
              onClick={() => setIsOpen(prev => !prev)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="relative group w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#771722] hover:bg-[#8E1E2C] text-white flex items-center justify-center shadow-xl hover:shadow-2xl border-2 border-[#C5A880]/70 transition-all cursor-pointer"
              aria-label="Open Private Concierge Chat"
            >
              {/* Subtle Radiant Gold Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#FAF7F2] group-hover:text-white stroke-[2.2] group-hover:scale-105 transition-all" />

              {/* Active Online Indicator */}
              <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#FAF7F2] shadow-xs animate-pulse" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 right-3 sm:bottom-24 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[570px] max-h-[84vh] bg-[#FAF7F2] border-2 border-[#C5A880]/60 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Window Top Accent Bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#C5A880] via-[#771722] to-[#C5A880]" />

            {/* Window Header with Full High-Contrast ARWIN RISE Logo Lockup */}
            <div className="bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between border-b border-[#EAE3DA] flex-shrink-0 shadow-2xs">
              <div className="flex items-center gap-3">
                <img 
                  src="/images/arwin-rise-lockup.png" 
                  alt="ARWIN RISE" 
                  className="h-8 sm:h-9 w-auto object-contain max-w-[130px] sm:max-w-[155px]" 
                />
                <div className="h-6 w-px bg-[#EAE3DA]" />
                <div>
                  <div className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#771722] uppercase leading-tight">
                    PRIVATE CONCIERGE
                  </div>
                  <div className="text-[9px] sm:text-[9.5px] font-sans text-neutral-500 tracking-wider flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>24/7 Advisory</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-[#771722] hover:bg-[#FAF7F2] rounded-full transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Chips Ribbon */}
            <div className="bg-white border-b border-[#EAE3DA] px-3 py-2 overflow-x-auto flex items-center gap-1.5 flex-shrink-0 no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {QUICK_PROMPTS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip.query)}
                  className="whitespace-nowrap bg-[#FAF7F2] hover:bg-[#771722] text-[#55504A] hover:text-white border border-[#EAE3DA] hover:border-[#771722] px-2.5 py-1 text-[10px] sm:text-[10.5px] font-sans font-medium transition-colors cursor-pointer flex-shrink-0"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Messages Scroll Container */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#C5A880]/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [scrollbar-width:thin] [scrollbar-color:#C5A880_transparent]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start items-start gap-2'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-white border border-[#C5A880]/50 p-1 flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                      <img src="/images/arwin-rise-symbol.png" alt="ARWIN" className="w-full h-full object-contain" />
                    </div>
                  )}

                  <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[86%]`}>
                    <div
                      className={`p-3.5 text-xs font-sans leading-relaxed rounded-xs ${
                        msg.sender === 'user'
                          ? 'bg-[#771722] text-white shadow-xs'
                          : 'bg-white text-[#222222] border border-[#EAE3DA] shadow-xs'
                      }`}
                    >
                      {msg.sender === 'user' ? (
                        <p className="whitespace-pre-line">{msg.text}</p>
                      ) : (
                        <FormattedBotMessage text={msg.text} />
                      )}
                      
                      {/* Interactive Embedded Action Button */}
                      {msg.action && (
                        <div className="mt-3 pt-2.5 border-t border-[#EAE3DA]">
                          <button
                            onClick={() => handleActionClick(msg.action)}
                            className="w-full inline-flex items-center justify-center gap-2 bg-[#771722] hover:bg-[#8E1E2C] text-white py-2 px-3 text-[10px] sm:text-[10.5px] font-sans font-bold tracking-wider uppercase transition-all shadow-xs cursor-pointer group"
                          >
                            <span>{msg.action.label}</span>
                            <ArrowRight className="w-3 h-3 text-[#C5A880] group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-neutral-400 font-sans mt-0.5 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-white border border-[#C5A880]/50 p-1 flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                    <img src="/images/arwin-rise-symbol.png" alt="ARWIN" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex items-center gap-1.5 bg-white border border-[#EAE3DA] p-2.5 text-neutral-400 text-xs w-16">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#771722] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* WhatsApp Quick Direct Bridge Ribbon */}
            <div className="px-3 py-1.5 bg-[#FAF7F2] border-t border-[#EAE3DA] flex items-center justify-between text-[10.5px] font-sans text-neutral-500 flex-shrink-0">
              <span className="text-[10px] sm:text-[10.5px] text-[#777068]">Need human advisory?</span>
              <a
                href="https://wa.me/918464954321?text=Hello%20Arwin%20Rise%20Advisory%20Desk,%20I%20would%20like%20to%20connect%20with%20a%20Senior%20Advisor."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#771722] hover:text-[#8E1E2C] font-bold text-[10px] sm:text-[10.5px] tracking-wide inline-flex items-center gap-1"
              >
                <span>WhatsApp Desk (+91 84649 54321)</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>

            {/* Input Footer */}
            <div className="p-2.5 sm:p-3 bg-white border-t border-[#EAE3DA] flex-shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about properties, ROI, Dubai, booking, careers..."
                  className="flex-1 px-3 py-2 sm:py-2.5 bg-[#FAF7F2] border border-[#EAE3DA] text-xs text-[#222222] placeholder:text-neutral-400 focus:outline-none focus:border-[#C5A880]"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-[#771722] hover:bg-[#8E1E2C] disabled:opacity-40 text-white p-2 sm:p-2.5 transition-colors cursor-pointer"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A880]" />
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
