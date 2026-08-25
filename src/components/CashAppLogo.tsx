import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

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
    md: 'w-10 h-10 text-xl',
    lg: 'w-12 h-12 text-2xl'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Cash App Signature Green Icon with 3D Bevel & Radial Green Aura */}
      <div className="relative group/logo">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00D632] to-[#00FF50] rounded-2xl blur-sm opacity-40 group-hover/logo:opacity-75 transition duration-300" />
        
        <div className={`relative ${iconSizes[size]} bg-gradient-to-tr from-[#00A827] via-[#00D632] to-[#00FF3D] rounded-xl flex items-center justify-center shadow-lg shadow-[#00D632]/30 font-black text-black tracking-tighter transform group-hover/logo:scale-105 transition-all duration-200 ring-1 ring-white/40`}>
          <span className="font-black -rotate-6 transform scale-110 leading-none drop-shadow-md font-['Outfit',sans-serif]">
            $
          </span>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 via-transparent to-white/30 pointer-events-none" />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 leading-none">
            <span className={`font-black tracking-tight ${textSizes[size]} text-white font-['Outfit',sans-serif]`}>
              Cashapps<span className="text-[#00D632] drop-shadow-[0_0_12px_rgba(0,214,50,0.4)]">Agent</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-950/80 text-[#00D632] border border-[#00D632]/40 text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
              <ShieldCheck className="w-2.5 h-2.5 text-[#00D632]" />
              Verified
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[11px] font-semibold text-slate-400 tracking-wider">
              cashappagent.com
            </span>
            <span className="inline-flex items-center gap-0.5 text-[9px] text-emerald-400/90 font-mono font-bold">
              <Lock className="w-2.5 h-2.5 text-emerald-400" />
              SSL
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

