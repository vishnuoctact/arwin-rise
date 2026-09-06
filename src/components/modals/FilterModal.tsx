import React from 'react';
import { SearchFilterState } from '../../types/property';
import { useCurrency } from '../../context/CurrencyContext';
import { X, SlidersHorizontal, Check, RefreshCw } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterState: SearchFilterState;
  onFilterChange: (newState: Partial<SearchFilterState>) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filterState,
  onFilterChange,
  onApplyFilters,
  onResetFilters
}) => {
  if (!isOpen) return null;

  const { formatPrice } = useCurrency();

  const MICRO_MARKETS = [
    'Neopolis',
    'Kokapet',
    'Jubilee Hills',
    'Banjara Hills',
    'Financial District',
    'Tellapur',
    'Gandipet'
  ];

  const PROPERTY_TYPES = [
    'Sky Villa',
    'Gated Villa',
    'Signature Penthouse',
    'Lakefront Estate',
    'Commercial Office',
    'Luxury Apartment'
  ];

  const BEDROOMS = ['3', '4', '5', '6+'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-arwin-gold/30 my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-arwin-navy-deep to-arwin-navy p-6 text-white relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-arwin-gold" />
            <h3 className="text-lg font-serif font-bold">Advanced Property Filters</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Micro Markets */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-arwin-navy mb-2.5">
              Micro-Market Location
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onFilterChange({ microMarket: '' })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterState.microMarket === ''
                    ? 'bg-arwin-navy text-arwin-gold shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Hyderabad
              </button>
              {MICRO_MARKETS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => onFilterChange({ microMarket: filterState.microMarket === loc ? '' : loc })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    filterState.microMarket === loc
                      ? 'bg-arwin-navy text-arwin-gold shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Property Types */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-arwin-navy mb-2.5">
              Property Typology
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PROPERTY_TYPES.map((pt) => {
                const isSelected = filterState.propertyType === pt;
                return (
                  <button
                    key={pt}
                    type="button"
                    onClick={() => onFilterChange({ propertyType: isSelected ? '' : pt })}
                    className={`p-2.5 rounded-xl text-xs text-left font-bold transition-all flex items-center justify-between border ${
                      isSelected
                        ? 'border-arwin-gold bg-arwin-navy text-arwin-gold shadow-sm'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{pt}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-arwin-navy mb-2.5">
              Bedrooms / Configuration
            </label>
            <div className="grid grid-cols-4 gap-2">
              {BEDROOMS.map((bed) => {
                const isSelected = filterState.bedrooms === bed;
                return (
                  <button
                    key={bed}
                    type="button"
                    onClick={() => onFilterChange({ bedrooms: isSelected ? '' : bed })}
                    className={`py-2 rounded-xl text-xs font-bold text-center transition-all ${
                      isSelected
                        ? 'bg-arwin-navy text-arwin-gold shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {bed} BHK
                  </button>
                );
              })}
            </div>
          </div>

          {/* Maximum Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-extrabold uppercase tracking-wider text-arwin-navy">Max Budget</span>
              <span className="font-serif font-bold text-base text-arwin-navy font-mono">
                Up to {formatPrice(filterState.maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min={20000000} // 2 Cr
              max={450000000} // 45 Cr
              step={10000000} // 1 Cr
              value={filterState.maxPrice}
              onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-arwin-navy"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
              <span>{formatPrice(20000000)}</span>
              <span>{formatPrice(450000000)}+</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-arwin-navy transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onApplyFilters();
              onClose();
            }}
            className="py-3 px-8 bg-arwin-navy hover:bg-arwin-navy-deep text-arwin-gold font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
