// Currency exchange rates relative to 1 INR (approx current baseline)
export const EXCHANGE_RATES = {
  INR: { code: 'INR', symbol: '₹', rate: 1, label: 'Indian Rupee (INR)' },
  USD: { code: 'USD', symbol: '$', rate: 0.0115, label: 'US Dollar (USD)' },
  AED: { code: 'AED', symbol: 'AED ', rate: 0.042, label: 'UAE Dirham (AED)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.0091, label: 'British Pound (GBP)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.0108, label: 'Euro (EUR)' },
  SGD: { code: 'SGD', symbol: 'S$', rate: 0.0155, label: 'Singapore Dollar (SGD)' },
};

/**
 * Formats price into Crores or Lakhs for INR, or standard currency notation for other currencies.
 * @param {number} priceInRupees - Price in absolute INR (e.g. 45000000 for 4.5 Cr)
 * @param {string} currencyCode - Current active currency (INR, USD, etc.)
 */
export function formatPrice(priceInRupees, currencyCode = 'INR') {
  if (!priceInRupees || isNaN(priceInRupees)) return 'Price on Request';

  if (currencyCode === 'INR') {
    if (priceInRupees >= 10000000) {
      const cr = priceInRupees / 10000000;
      return `₹${cr.toFixed(cr >= 10 ? 1 : 2)} Cr`;
    } else if (priceInRupees >= 100000) {
      const lk = priceInRupees / 100000;
      return `₹${lk.toFixed(1)} Lakhs`;
    }
    return `₹${priceInRupees.toLocaleString('en-IN')}`;
  }

  const rateInfo = EXCHANGE_RATES[currencyCode] || EXCHANGE_RATES.USD;
  const converted = priceInRupees * rateInfo.rate;

  if (converted >= 1000000) {
    return `${rateInfo.symbol}${(converted / 1000000).toFixed(2)}M`;
  } else if (converted >= 1000) {
    return `${rateInfo.symbol}${(converted / 1000).toFixed(0)}K`;
  }
  return `${rateInfo.symbol}${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

/**
 * Converts area between Hyderabad/Telangana land units
 */
export function convertArea(value, fromUnit, toUnit) {
  if (!value || isNaN(value)) return 0;
  
  // Base unit: Square Feet
  const toSqFtMultiplier = {
    sqft: 1,
    sqyd: 9,              // 1 Sq.Yard = 9 Sq.Ft (1 Gaj)
    guntha: 1089,         // 1 Guntha = 121 Sq.Yards = 1089 Sq.Ft
    acre: 43560,          // 1 Acre = 40 Gunthas = 4840 Sq.Yards = 43560 Sq.Ft
    cent: 435.6,          // 1 Cent = 48.4 Sq.Yards = 435.6 Sq.Ft
    sqm: 10.7639,         // 1 Sq.Meter = 10.7639 Sq.Ft
  };

  const sqft = value * (toSqFtMultiplier[fromUnit] || 1);
  const result = sqft / (toSqFtMultiplier[toUnit] || 1);
  return Number(result.toFixed(2));
}

/**
 * Calculates Monthly EMI for home loan in India
 * @param {number} principal - Loan amount in INR
 * @param {number} annualRate - Annual interest rate in % (e.g. 8.5)
 * @param {number} tenureYears - Loan tenure in years (e.g. 20)
 */
export function calculateEMI(principal, annualRate, tenureYears) {
  if (!principal || !annualRate || !tenureYears) {
    return { emi: 0, totalInterest: 0, totalPayment: 0 };
  }

  const monthlyRate = annualRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
              (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - principal;

  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
  };
}
