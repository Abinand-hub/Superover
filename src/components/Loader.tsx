import React from 'react';
import { Zap } from 'lucide-react';

export const LogoLoader = ({ size = 'md', text }: { size?: 'sm' | 'md' | 'lg' | 'xl', text?: string }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-12 h-12 rounded-xl',
    lg: 'w-16 h-16 rounded-2xl',
    xl: 'w-24 h-24 rounded-3xl'
  };
  const innerSizeClasses = {
    sm: 'rounded-md',
    md: 'rounded-[10px]',
    lg: 'rounded-[14px]',
    xl: 'rounded-[20px]'
  };
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };
  const textSizes = {
    sm: 'text-[7px]',
    md: 'text-[9px]',
    lg: 'text-[12px]',
    xl: 'text-[16px]'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`relative ${sizeClasses[size]} bg-gradient-to-br from-[#FF6B00] via-[#FF8800] to-[#FFAA00] p-[2px] shadow-[0_0_20px_rgba(255,107,0,0.4)] flex items-center justify-center animate-pulse`}>
        <div className={`w-full h-full bg-[#050816] ${innerSizeClasses[size]} flex items-center justify-center relative overflow-hidden`}>
          <Zap className={`${iconSizes[size]} fill-[#FF6B00] text-[#FF6B00] animate-bounce`} style={{ animationDuration: '1.5s' }} />
          <div className={`absolute -bottom-1 -right-1 ${textSizes[size]} font-black text-[#FF6B00]/40`}>6</div>
        </div>
      </div>
      {text && <p className="text-[#FF6B00] font-medium text-sm animate-pulse tracking-wide">{text}</p>}
    </div>
  );
};
