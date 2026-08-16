import React, { useState } from 'react';
import { BANK_BRAND_DATA } from '../data/bankBrandData';

interface BankLogoProps {
  code: string;
  name?: string;
  logoUrl?: string;
  logoBg?: string;
  variant?: 'wide' | 'icon' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const BankLogo: React.FC<BankLogoProps> = ({
  code,
  name,
  logoUrl,
  logoBg,
  variant = 'wide',
  size = 'md',
  className = ''
}) => {
  const [imgError, setImgError] = useState(false);
  const normalizedCode = code ? code.toUpperCase().trim() : 'VCB';
  const brandInfo = BANK_BRAND_DATA[normalizedCode] || BANK_BRAND_DATA['VCB'];

  const resolvedUrl = logoUrl || brandInfo?.logoUrl || `https://api.vietqr.io/img/${normalizedCode}.png`;
  const resolvedBg = logoBg || brandInfo?.badgeBg || 'bg-blue-600';
  const resolvedName = name || brandInfo?.shortName || code;

  // 1. WIDE VARIANT: Shows the full crisp official logo in its natural rectangular aspect ratio
  if (variant === 'wide') {
    const wideSizeClasses = {
      sm: 'h-7 px-2 min-w-[70px] max-w-[100px]',
      md: 'h-8 px-2.5 min-w-[85px] max-w-[120px]',
      lg: 'h-10 px-3 min-w-[110px] max-w-[150px]',
      xl: 'h-12 px-4 min-w-[140px] max-w-[180px]'
    }[size];

    const imgHeight = {
      sm: 'max-h-5',
      md: 'max-h-6',
      lg: 'max-h-7',
      xl: 'max-h-9'
    }[size];

    if (imgError || !resolvedUrl) {
      return (
        <div
          className={`${wideSizeClasses} ${resolvedBg} rounded-xl text-white font-black text-xs flex items-center justify-center shadow-md select-none border border-white/20 ${className}`}
          title={resolvedName}
        >
          <span>{normalizedCode}</span>
        </div>
      );
    }

    return (
      <div
        className={`${wideSizeClasses} bg-white rounded-xl flex items-center justify-center shadow-md border border-slate-700/60 shrink-0 ${className}`}
        title={resolvedName}
      >
        <img
          src={resolvedUrl}
          alt={resolvedName}
          className={`w-full ${imgHeight} object-contain`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // 2. ICON VARIANT: Square format with high contrast
  const sizeClasses = {
    sm: 'w-8 h-8 p-1',
    md: 'w-10 h-10 p-1.5',
    lg: 'w-12 h-12 p-2',
    xl: 'w-16 h-16 p-2.5'
  }[size];

  const textSize = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm'
  }[size];

  if (imgError || !resolvedUrl) {
    return (
      <div 
        className={`${sizeClasses} ${resolvedBg} rounded-xl text-white font-black ${textSize} flex items-center justify-center shadow-md shrink-0 border border-white/20 select-none ${className}`}
        title={resolvedName}
      >
        {normalizedCode.slice(0, 4)}
      </div>
    );
  }

  return (
    <div 
      className={`${sizeClasses} rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0 border border-slate-700/60 overflow-hidden ${className}`}
      title={resolvedName}
    >
      <img
        src={resolvedUrl}
        alt={resolvedName}
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setImgError(true)}
      />
    </div>
  );
};
