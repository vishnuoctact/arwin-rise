import React from 'react';
import { useContent } from '../context/ContentContext';

interface ArwinLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  symbolOnly?: boolean;
}

export const ArwinLogo: React.FC<ArwinLogoProps> = ({ 
  variant = 'dark', 
  className = '',
  size = 'md',
  symbolOnly = false
}) => {
  let settings: any = null;
  try {
    const content = useContent();
    settings = content?.settings;
  } catch {
    // Fallback if rendered outside ContentProvider
  }

  const isLight = variant === 'light';

  // Explicit, valid responsive height classes tailored for the 2.05:1 aspect ratio Arwin Rise lockup
  const heightClasses = {
    sm: 'h-[40px] sm:h-[44px]',
    md: 'h-[54px] sm:h-[58px] lg:h-[62px]',
    lg: 'h-[72px] sm:h-[80px] lg:h-[88px]'
  };

  const defaultDark = '/images/arwin-rise-lockup.png';
  const defaultLight = '/images/arwin-rise-lockup-light.png';
  const defaultSymbol = '/images/arwin-rise-symbol.png';
  const defaultSymbolLight = '/images/arwin-rise-symbol-light.png';

  let src = '';
  if (symbolOnly) {
    src = isLight 
      ? (settings?.logoSymbolUrl || defaultSymbolLight)
      : (settings?.logoSymbolUrl || defaultSymbol);
  } else {
    src = isLight
      ? (settings?.logoLightUrl || defaultLight)
      : (settings?.logoDarkUrl || defaultDark);
  }

  const brandName = settings?.brandName || "ARWIN RISE";

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={src}
        alt={brandName}
        className={`${heightClasses[size]} w-auto max-h-full object-contain transition-transform duration-200`}
        onError={(e) => {
          // Fallback if custom URL fails
          if (isLight) {
            (e.target as HTMLImageElement).src = defaultLight;
          } else {
            (e.target as HTMLImageElement).src = defaultDark;
          }
        }}
      />
    </div>
  );
};
