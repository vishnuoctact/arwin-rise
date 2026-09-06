import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ChevronDown,
  MapPin
} from 'lucide-react';
import { SearchFilterState } from '../../types/property';
import { useCurrency } from '../../context/CurrencyContext';

interface OmniSearchBarProps {
  filterState: SearchFilterState;
  onFilterChange: (newState: Partial<SearchFilterState>) => void;
  onExecuteSearch: () => void;
}

export const OmniSearchBar: React.FC<OmniSearchBarProps> = ({
  filterState,
  onFilterChange,
  onExecuteSearch
}) => {
  const { formatPrice } = useCurrency();
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showBedsDropdown, setShowBedsDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState(filterState.microMarket || '');

  const searchRef = useRef<HTMLDivElement>(null);
  const bedsRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  const POPULAR_LOCATIONS = [
    'Neopolis',
    'Kokapet',
    'Jubilee Hills',
    'Banjara Hills',
    'Financial District',
    'Tellapur',
    'Gandipet'
  ];

  const BED_OPTIONS = [
    { label: 'Any Beds', value: '' },
    { label: '1 Bed', value: '1' },
    { label: '2 Beds', value: '2' },
    { label: '3 Beds', value: '3' },
    { label: '4 Beds', value: '4' },
    { label: '5+ Beds', value: '5' },
  ];

  const PRICE_OPTIONS = [
    { label: 'Any Price', max: 450000000 },
    { label: `Under ${formatPrice(50000000)}`, max: 50000000 },
    { label: `Under ${formatPrice(100000000)}`, max: 100000000 },
    { label: `Under ${formatPrice(200000000)}`, max: 200000000 },
    { label: `Luxury ${formatPrice(400000000)}+`, max: 450000000 },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false);
      }
      if (bedsRef.current && !bedsRef.current.contains(event.target as Node)) {
        setShowBedsDropdown(false);
      }
      if (priceRef.current && !priceRef.current.contains(event.target as Node)) {
        setShowPriceDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLocation = (loc: string) => {
    setSearchInputValue(loc);
    onFilterChange({ microMarket: loc });
    setShowLocationSuggestions(false);
  };

  return (
    <div className="w-full text-left">
      {/* Main Single-Line Search Bar */}
      <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-1.5 sm:p-2 flex flex-col sm:flex-row items-stretch sm:items-center border border-[#E2DED6]">
        {/* Left: Search input */}
        <div className="relative flex-1 flex items-center px-4 py-2.5" ref={searchRef}>
          <Search className="w-4 h-4 text-[#6B1416] mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Area, project or community"
            value={searchInputValue}
            onFocus={() => setShowLocationSuggestions(true)}
            onChange={(e) => {
              setSearchInputValue(e.target.value);
              onFilterChange({ microMarket: e.target.value });
            }}
            className="w-full text-[13px] text-[#181615] placeholder:text-[#7A736E] outline-none bg-transparent font-normal"
          />

          {/* Suggestions Dropdown */}
          {showLocationSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-[#E2DED6] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1 text-[10px] uppercase font-bold text-[#6B1416] tracking-wider">
                Popular Hyderabad Locations
              </div>
              <button
                type="button"
                onClick={() => handleSelectLocation('')}
                className="w-full text-left px-3 py-2 text-xs text-[#45403D] hover:bg-[#F4F3F0] flex items-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-[#A67547]" />
                <span>All Hyderabad Areas</span>
              </button>
              {POPULAR_LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => handleSelectLocation(loc)}
                  className="w-full text-left px-3 py-2 text-xs text-[#45403D] hover:bg-[#F4F3F0] flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#A67547]" />
                  <span>{loc}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-6 w-px bg-[#E2DED6]" />

        {/* Middle 1: Beds Dropdown */}
        <div className="relative px-4 py-2 flex items-center" ref={bedsRef}>
          <button
            type="button"
            onClick={() => {
              setShowBedsDropdown(!showBedsDropdown);
              setShowPriceDropdown(false);
            }}
            className="flex items-center gap-2 text-[13px] text-[#45403D] hover:text-[#181615] font-normal whitespace-nowrap"
          >
            <span>{filterState.bedrooms ? `${filterState.bedrooms} Beds` : 'Beds'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#7A736E]" />
          </button>

          {showBedsDropdown && (
            <div className="absolute top-full left-0 mt-2 w-36 bg-white rounded-xl shadow-2xl border border-[#E2DED6] py-1.5 z-50">
              {BED_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onFilterChange({ bedrooms: opt.value });
                    setShowBedsDropdown(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-[#45403D] hover:bg-[#F4F3F0] transition-colors"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-6 w-px bg-[#E2DED6]" />

        {/* Middle 2: Price Range Dropdown */}
        <div className="relative px-4 py-2 flex items-center" ref={priceRef}>
          <button
            type="button"
            onClick={() => {
              setShowPriceDropdown(!showPriceDropdown);
              setShowBedsDropdown(false);
            }}
            className="flex items-center gap-2 text-[13px] text-[#45403D] hover:text-[#181615] font-normal whitespace-nowrap"
          >
            <span>
              {filterState.maxPrice < 450000000
                ? `< ${formatPrice(filterState.maxPrice)}`
                : 'Price Range'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#7A736E]" />
          </button>

          {showPriceDropdown && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-[#E2DED6] py-1.5 z-50">
              {PRICE_OPTIONS.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    onFilterChange({ maxPrice: opt.max });
                    setShowPriceDropdown(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-[#45403D] hover:bg-[#F4F3F0] transition-colors"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Deep Tuscan Chianti Search Button */}
        <button
          onClick={onExecuteSearch}
          className="btn-shine sm:ml-1 px-8 py-3 bg-[#6B1416] hover:bg-[#570E10] text-white font-medium text-[13px] rounded-lg transition-all shadow-md flex items-center justify-center cursor-pointer border border-[#A67547]/25"
        >
          Search
        </button>
      </div>
    </div>
  );
};
