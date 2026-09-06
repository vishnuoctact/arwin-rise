export interface MarketStat {
  label: string;
  value: string;
  subtext: string;
}

export const HYDERABAD_MARKET_REPORT = {
  title: 'Hyderabad Ultra-Luxury Real Estate Sentiment & Growth Report 2026',
  edition: 'Q1-Q2 2026 Comprehensive Intelligence Edition',
  overview: 'Hyderabad has cemented its position as India’s highest capital appreciation market for prime residential assets. Driven by Neopolis super-tall infrastructure, the expansion of the Financial District diplomatic corridor, and record NRI inflows from North America and the Middle East.',
  stats: [
    {
      label: 'Neopolis YoY Capital Growth',
      value: '+21.5%',
      subtext: 'Leading all Indian metropolitan prime micro-markets'
    },
    {
      label: 'NRI Capital Share in Luxury',
      value: '44.8%',
      subtext: 'Up from 32% in 2023, led by US & Gulf Telugu diaspora'
    },
    {
      label: 'Average Rental Yield in Financial Dist.',
      value: '6.4% p.a.',
      subtext: 'Highest among top 7 Indian tier-1 tech cities'
    },
    {
      label: 'Luxury Villa Supply Deficit',
      value: '-38%',
      subtext: 'Surging demand for 6,000+ sq ft gated villas in Kokapet & Tellapur'
    }
  ],
  keyTakeaways: [
    'Neopolis 65+ storey skyscraper cluster experiencing 94% pre-sales velocity before structure completion.',
    'Surge in demand for 5 BHK and duplex sky villas exceeding ₹10 Cr ticket sizes among IT founders and senior executives.',
    'Zero unapproved layout risks under stringent TS-RERA enforcement and HMDA master plan oversight.',
    'Airport Express Metro corridor completion driving accelerated commercial absorption in Nanakramguda.'
  ]
};
