import React from 'react';

interface CashAppLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const CashAppLogo: React.FC<CashAppLogoProps> = ({ 
  className = '', 
  showText = true,
  size = 'md' 
}) => {
  const iconSizes = {
    sm: 'w-7 h-7 text-sm',
    md: 'w-9 h-9 text-lg',
    lg: 'w-11 h-11 text-xl'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Cash App Signature Green Icon with Stylized Dollar Symbol */}
      <div className={`relative ${iconSizes[size]} bg-gradient-to-tr from-[#00A827] via-[#00D632] to-[#00FF3D] rounded-xl flex items-center justify-center shadow-lg shadow-[#00D632]/25 font-black text-black tracking-tighter transform hover:scale-105 transition-transform duration-200`}>
        <span className="font-extrabold -rotate-6 transform scale-110 leading-none drop-shadow-sm font-['Outfit',sans-serif]">
          $
        </span>
        <div className="absolute inset-0 rounded-xl ring-1 ring-white/30 pointer-events-none" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-black tracking-tight ${textSizes[size]} text-white font-['Outfit',sans-serif]`}>
              Cashapps<span className="text-[#00D632]">Agent</span>
            </span>
            <span className="bg-[#00D632]/15 text-[#00D632] border border-[#00D632]/30 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
              Verified
            </span>
          </div>
          <span className="text-[10px] font-medium text-slate-400 tracking-wider">
            cashappagent.com
          </span>
        </div>
      )}
    </div>
  );
};
