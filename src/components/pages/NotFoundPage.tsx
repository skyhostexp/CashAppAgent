import React from 'react';
import { PageView } from '../../types';
import { PAGE_ROUTES } from '../../utils/navigation';
import { 
  Home, 
  Search, 
  ArrowLeft, 
  ShieldAlert, 
  Bitcoin, 
  ShieldCheck, 
  HelpCircle, 
  BookOpen, 
  Package, 
  Headphones, 
  ArrowRight,
  Sparkles,
  Compass
} from 'lucide-react';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onNavigate: (page: PageView) => void;
  onOpenOrderLookup: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigateHome,
  onNavigate,
  onOpenOrderLookup,
}) => {
  const currentPath = typeof window !== 'undefined' 
    ? (window.location.pathname + window.location.hash || '/404')
    : '/404';

  const quickLinks = [
    {
      page: 'all-accounts' as PageView,
      title: 'All Verified Accounts',
      desc: 'Explore complete inventory of $4k–$25k limit Cash App accounts',
      icon: ShieldCheck,
      color: 'text-[#00D632]',
      bgColor: 'bg-[#00D632]/10',
      borderColor: 'border-[#00D632]/30',
      badge: 'Popular',
    },
    {
      page: 'btc-accounts' as PageView,
      title: 'BTC Enabled Accounts',
      desc: 'On-chain Bitcoin deposit & withdrawal unlocked accounts',
      icon: Bitcoin,
      color: 'text-[#F7931A]',
      bgColor: 'bg-[#F7931A]/10',
      borderColor: 'border-[#F7931A]/30',
      badge: 'Hot',
    },
    {
      page: 'non-btc-accounts' as PageView,
      title: 'Non-BTC USD Accounts',
      desc: 'Budget-friendly personal & business accounts for USD transfers',
      icon: Package,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
    },
    {
      page: 'safety-guide' as PageView,
      title: '7-Day Anti-Ban Blueprint',
      desc: 'Step-by-step IP proxy & warm-up guide to avoid account locks',
      icon: BookOpen,
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10',
      borderColor: 'border-sky-500/30',
      badge: 'Essential',
    },
    {
      page: 'faq' as PageView,
      title: 'FAQ & 30-Day Warranty',
      desc: 'Answers about crypto payments, verification, and escrow policy',
      icon: HelpCircle,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
    },
    {
      page: 'contact' as PageView,
      title: '24/7 Agent Support Desk',
      desc: 'Connect with our live dispatch agents via Telegram or WhatsApp',
      icon: Headphones,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12 animate-in fade-in duration-300">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <button
          id="not-found-back-home-top"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#00D632] transition-colors bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800 hover:border-[#00D632]/40 cursor-pointer shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-[#00D632]" />
          <span>Return to Home</span>
        </button>
        
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-mono font-bold">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>HTTP 404 &bull; Not Found</span>
        </div>
      </div>

      {/* Hero 404 Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#140b0e] via-[#0f0d14] to-[#090d10] border border-red-500/20 p-8 sm:p-14 text-center shadow-2xl space-y-6">
        {/* Background Ambient Glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00D632]/10 rounded-full blur-3xl pointer-events-none" />

        {/* 404 Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-xs font-black text-red-400 tracking-wider uppercase shadow-inner">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <span>Page Not Found</span>
        </div>

        {/* Massive 404 Display Heading */}
        <div className="space-y-2 relative">
          <div className="text-7xl sm:text-9xl font-black tracking-tighter font-['Outfit',sans-serif] text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-200 select-none drop-shadow-[0_10px_25px_rgba(239,68,68,0.25)]">
            404
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Oops! This page doesn't exist.
          </h1>
        </div>

        {/* Requested URL indicator & explanation */}
        <div className="max-w-xl mx-auto space-y-3">
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            The page at <code className="bg-black/60 text-red-300 font-mono px-2 py-0.5 rounded border border-red-900/50 text-xs sm:text-sm">{currentPath}</code> could not be found. It may have been moved, renamed, or you may have entered an incorrect URL.
          </p>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            id="not-found-home-cta"
            onClick={onNavigateHome}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00A827] via-[#00D632] to-[#00FF3D] hover:from-[#00B92B] hover:to-[#00FF50] text-black font-black text-sm rounded-xl shadow-lg shadow-[#00D632]/25 hover:shadow-[#00D632]/45 transition-all cursor-pointer active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </button>

          <button
            id="not-found-catalog-cta"
            onClick={() => onNavigate('all-accounts')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer active:scale-95"
          >
            <ShieldCheck className="w-4 h-4 text-[#00D632]" />
            <span>Browse Accounts</span>
          </button>

          <button
            id="not-found-track-order-cta"
            onClick={onOpenOrderLookup}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 font-bold text-sm shadow-md transition-all cursor-pointer active:scale-95"
          >
            <Search className="w-4 h-4 text-[#00D632]" />
            <span>Track Order</span>
          </button>
        </div>
      </div>

      {/* Suggested Destination Directory */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-black text-white font-['Outfit',sans-serif] uppercase tracking-wider">
            <Compass className="w-4 h-4 text-[#00D632]" />
            <span>Looking for something specific?</span>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Direct navigation links
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            const route = PAGE_ROUTES[link.page];
            return (
              <a
                key={link.page}
                id={`404-link-${link.page}`}
                href={route.path}
                data-full-url={route.fullUrl}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.page);
                }}
                className="flex flex-col justify-between p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/40 transition-all duration-200 group cursor-pointer shadow-lg hover:shadow-emerald-950/50 relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl ${link.bgColor} border ${link.borderColor}`}>
                      <Icon className={`w-5 h-5 ${link.color}`} />
                    </div>
                    {link.badge && (
                      <span className="bg-gradient-to-r from-emerald-500 to-[#00D632] text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase shadow-sm">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-[#00D632] transition-colors text-sm sm:text-base">
                      {link.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {link.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-white">
                  <span>Visit {route.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-[#00D632] group-hover:translate-x-1 transition-all" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Support Assistance Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-1.5">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-sm font-bold text-white">
            <Sparkles className="w-4 h-4 text-[#00D632]" />
            <span>Need help finding an order or custom request?</span>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Our 24/7 Telegram & WhatsApp support desks are online to help you track credentials, process custom wholesale orders, or answer technical questions.
          </p>
        </div>

        <button
          id="not-found-contact-btn"
          onClick={() => onNavigate('contact')}
          className="shrink-0 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs hover:text-[#00D632] transition-all cursor-pointer"
        >
          Contact 24/7 Desk
        </button>
      </div>
    </div>
  );
};
