import React from 'react';
import { 
  Home, 
  Search, 
  ArrowLeft, 
  ShieldAlert, 
  ShoppingBag, 
  Bitcoin, 
  HelpCircle, 
  FileText, 
  PhoneCall 
} from 'lucide-react';
import { PageView } from '../../types';
import { PAGE_ROUTES } from '../../utils/navigation';

interface NotFoundPageProps {
  onNavigate: (page: PageView) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <div className="min-h-[75vh] py-16 px-4 flex flex-col items-center justify-center text-center font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-2xl w-full mx-auto space-y-8 bg-[#111820]/90 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-md">
        
        {/* Glow Accent */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#00D632]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#F7931A]/10 rounded-full blur-3xl pointer-events-none" />

        {/* 404 Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Error 404 &bull; Page Not Found</span>
        </div>

        {/* Big Headline */}
        <div className="space-y-3">
          <h1 className="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 font-['Outfit',sans-serif] tracking-tight">
            404
          </h1>
          <h2 className="text-xl sm:text-3xl font-black text-white font-['Outfit',sans-serif]">
            The requested page does not exist.
          </h2>
          {currentPath && (
            <p className="text-xs font-mono text-slate-400 bg-black/40 py-1.5 px-3 rounded-lg border border-slate-800 inline-block max-w-full truncate">
              {currentPath}
            </p>
          )}
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            The link you followed may be broken, expired, or the page may have been moved to one of our verified account catalog routes.
          </p>
        </div>

        {/* Quick Route Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
          <a
            href={PAGE_ROUTES['all-accounts'].path}
            onClick={(e) => { e.preventDefault(); onNavigate('all-accounts'); }}
            className="p-4 rounded-2xl bg-black/40 border border-slate-800/80 hover:border-emerald-500/50 transition-all group flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <ShoppingBag className="w-5 h-5 text-[#00D632]" />
              <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Catalog</span>
            </div>
            <div>
              <div className="text-xs font-black text-white group-hover:text-emerald-400 transition-colors">All Accounts</div>
              <div className="text-[11px] text-slate-400">View all verified limits</div>
            </div>
          </a>

          <a
            href={PAGE_ROUTES['btc-accounts'].path}
            onClick={(e) => { e.preventDefault(); onNavigate('btc-accounts'); }}
            className="p-4 rounded-2xl bg-black/40 border border-slate-800/80 hover:border-amber-500/50 transition-all group flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <Bitcoin className="w-5 h-5 text-[#F7931A]" />
              <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Crypto</span>
            </div>
            <div>
              <div className="text-xs font-black text-white group-hover:text-amber-400 transition-colors">BTC Enabled</div>
              <div className="text-[11px] text-slate-400">On-chain crypto accounts</div>
            </div>
          </a>

          <a
            href={PAGE_ROUTES['faq'].path}
            onClick={(e) => { e.preventDefault(); onNavigate('faq'); }}
            className="p-4 rounded-2xl bg-black/40 border border-slate-800/80 hover:border-blue-500/50 transition-all group flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <HelpCircle className="w-5 h-5 text-blue-400" />
              <span className="text-[10px] font-bold uppercase text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">FAQ</span>
            </div>
            <div>
              <div className="text-xs font-black text-white group-hover:text-blue-400 transition-colors">Help &amp; FAQ</div>
              <div className="text-[11px] text-slate-400">Instant answers</div>
            </div>
          </a>
        </div>

        {/* Primary Return Button */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#00D632] hover:bg-[#00b82b] text-black font-black text-xs transition-all shadow-[0_0_25px_rgba(0,214,50,0.3)] cursor-pointer active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <a
            href={PAGE_ROUTES['contact'].path}
            onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-bold text-xs transition-all border border-slate-700 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-[#00D632]" />
            <span>Contact 24/7 Support</span>
          </a>
        </div>

      </div>
    </div>
  );
};
