import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode, CurrencyConfig } from '../types/property';

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: {
    code: 'INR',
    symbol: '₹',
    rate: 1,
    label: 'Indian Rupee',
    flag: '🇮🇳',
    format: (inrAmount: number) => {
      if (inrAmount >= 10000000) {
        const cr = inrAmount / 10000000;
        return `₹ ${cr.toFixed(2)} Cr`;
      } else if (inrAmount >= 100000) {
        const l = inrAmount / 100000;
        return `₹ ${l.toFixed(1)} L`;
      }
      return `₹ ${inrAmount.toLocaleString('en-IN')}`;
    }
  },
  USD: {
    code: 'USD',
    symbol: '$',
    rate: 1 / 86.5,
    label: 'US Dollar',
    flag: '🇺🇸',
    format: (inrAmount: number) => {
      const val = inrAmount / 86.5;
      if (val >= 1000000) {
        return `$ ${(val / 1000000).toFixed(2)} M`;
      } else if (val >= 1000) {
        return `$ ${(val / 1000).toFixed(0)} K`;
      }
      return `$ ${Math.round(val).toLocaleString('en-US')}`;
    }
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    rate: 1 / 23.55,
    label: 'UAE Dirham',
    flag: '🇦🇪',
    format: (inrAmount: number) => {
      const val = inrAmount / 23.55;
      if (val >= 1000000) {
        return `AED ${(val / 1000000).toFixed(2)} M`;
      } else if (val >= 1000) {
        return `AED ${(val / 1000).toFixed(0)} K`;
      }
      return `AED ${Math.round(val).toLocaleString()}`;
    }
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rate: 1 / 109.5,
    label: 'British Pound',
    flag: '🇬🇧',
    format: (inrAmount: number) => {
      const val = inrAmount / 109.5;
      if (val >= 1000000) {
        return `£ ${(val / 1000000).toFixed(2)} M`;
      } else if (val >= 1000) {
        return `£ ${(val / 1000).toFixed(0)} K`;
      }
      return `£ ${Math.round(val).toLocaleString()}`;
    }
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rate: 1 / 93.8,
    label: 'Euro',
    flag: '🇪🇺',
    format: (inrAmount: number) => {
      const val = inrAmount / 93.8;
      if (val >= 1000000) {
        return `€ ${(val / 1000000).toFixed(2)} M`;
      } else if (val >= 1000) {
        return `€ ${(val / 1000).toFixed(0)} K`;
      }
      return `€ ${Math.round(val).toLocaleString()}`;
    }
  },
  SGD: {
    code: 'SGD',
    symbol: 'S$',
    rate: 1 / 64.2,
    label: 'Singapore Dollar',
    flag: '🇸🇬',
    format: (inrAmount: number) => {
      const val = inrAmount / 64.2;
      if (val >= 1000000) {
        return `S$ ${(val / 1000000).toFixed(2)} M`;
      } else if (val >= 1000) {
        return `S$ ${(val / 1000).toFixed(0)} K`;
      }
      return `S$ ${Math.round(val).toLocaleString()}`;
    }
  }
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  currencies: Record<CurrencyCode, CurrencyConfig>;
  currentConfig: CurrencyConfig;
  formatPrice: (inrAmount: number) => string;
  convertPrice: (inrAmount: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  useEffect(() => {
    const saved = localStorage.getItem('arwin_currency') as CurrencyCode;
    if (saved && CURRENCIES[saved]) {
      setCurrency(saved);
    }
  }, []);

  const handleSetCurrency = (code: CurrencyCode) => {
    setCurrency(code);
    localStorage.setItem('arwin_currency', code);
  };

  const currentConfig = CURRENCIES[currency];

  const formatPrice = (inrAmount: number) => {
    return currentConfig.format(inrAmount);
  };

  const convertPrice = (inrAmount: number) => {
    return Math.round(inrAmount * currentConfig.rate);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency: handleSetCurrency,
        currencies: CURRENCIES,
        currentConfig,
        formatPrice,
        convertPrice
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
