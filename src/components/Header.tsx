import React, { useState, useEffect } from 'react';
import { CashAppLogo } from './CashAppLogo';
import { CONTACT_INFO } from '../data/cryptoGateways';
import { PageView } from '../types';
import { PAGE_ROUTES } from '../utils/navigation';
import { 
  Send, 
  Phone, 
  Mail, 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  ChevronRight,
  Zap,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  cartTotal?: number;
  currentPage?: PageView;
  onNavigate: (page: PageView) => void;
  onOpenCart: () => void;
  onOpenOrderLookup: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal = 0,
  currentPage = 'home',
  onNavigate,
  onOpenCart,
  onOpenOrderLookup
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  const announcements = [
    { text: 'Instant Automated Email Delivery (5–15 Mins)', highlight: '⚡ Fast Dispatch' },
    { text: '30-Day Full Replacement & Escrow Warranty', highlight: '🛡️ 100% Guaranteed' },
    { text: 'Sutton Bank US Routing + Bitcoin On-Chain Clearance', highlight: '🇺🇸 US Verified' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  const navLinks: { label: string; page: PageView; badge?: string }[] = [
    { label: 'Home', page: 'home' },
    { label: 'All Accounts', page: 'all-accounts' },
    { label: 'BTC Enabled', page: 'btc-accounts', badge: 'Hot' },
    { label: 'Non-BTC', page: 'non-btc-accounts' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageView, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled 
        ? 'backdrop-blur-2xl bg-[#090d12]/95 border-b border-emerald-500/20 shadow-[0_12px_36px_rgba(0,0,0,0.6)]' 
        : 'backdrop-blur-xl bg-[#0b0f14]/90 border-b border-emerald-950/60'
    }`}>
      {/* Top Ambient Green Aura Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00D632] to-transparent opacity-80" />

      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#05130a] via-[#082011] to-[#05130a] text-xs py-1.5 px-3 sm:px-6 border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Live Dispatch Indicator & Rotating Announcements */}
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-[10px] font-extrabold text-[#00D632] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D632] animate-ping" />
              <span className="tracking-wider">LIVE</span>
            </div>

            <div className="text-slate-300 font-medium text-[11px] sm:text-xs truncate transition-all duration-500">
              <span className="text-[#00D632] font-semibold mr-1.5 hidden sm:inline">
                {announcements[tickerIndex].highlight}:
              </span>
              <span>{announcements[tickerIndex].text}</span>
            </div>
          </div>

          {/* Direct Support Badges & Track Order */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 text-xs font-semibold">
            {/* Top Header Track Order */}
            <button
              id="top-bar-track-order-btn"
              onClick={onOpenOrderLookup}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-500/40 text-emerald-300 hover:text-emerald-100 transition-all text-[11px] font-bold shadow-sm cursor-pointer active:scale-95"
              title="Track Order Status & Credentials"
            >
              <Search className="w-3 h-3 text-[#00D632]" />
              <span>Track Order</span>
            </button>

            <a
              id="top-bar-telegram-link"
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-sky-950/60 hover:bg-sky-900/80 border border-sky-500/30 text-sky-300 hover:text-sky-100 transition-all text-[11px] shadow-sm"
            >
              <Send className="w-3 h-3 text-sky-400" />
              <span className="hidden sm:inline">Telegram:</span>
              <span className="font-bold">{CONTACT_INFO.telegram}</span>
            </a>
            
            <a
              id="top-bar-whatsapp-link"
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 hover:text-emerald-100 transition-all text-[11px] shadow-sm"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{CONTACT_INFO.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo (Navigates to Home) */}
        <div className="flex items-center gap-3">
          <a
            id="brand-logo-btn"
            href={PAGE_ROUTES.home.path}
            data-full-url={PAGE_ROUTES.home.fullUrl}
            onClick={(e) => handleNavClick('home', e)}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
          >
            <CashAppLogo size="md" />
          </a>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-900/80 border border-emerald-900/40 rounded-2xl shadow-inner backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            const route = PAGE_ROUTES[link.page];
            return (
              <a
                key={link.label}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                href={route.path}
                data-full-url={route.fullUrl}
                onClick={(e) => handleNavClick(link.page, e)}
                className={`relative px-3 py-2 text-xs xl:text-sm font-semibold rounded-xl transition-all duration-200 flex items-center gap-1.5 group cursor-pointer ${
                  isActive
                    ? 'text-[#00D632] bg-[#00D632]/15 border border-[#00D632]/40 shadow-[0_0_15px_rgba(0,214,50,0.2)] font-bold'
                    : 'text-slate-300 hover:text-[#00D632] hover:bg-[#00D632]/10 hover:border-[#00D632]/30 border border-transparent hover:shadow-[0_0_15px_rgba(0,214,50,0.18)]'
                }`}
              >
                <span className="group-hover:drop-shadow-[0_0_8px_rgba(0,214,50,0.4)]">{link.label}</span>
                {link.badge && (
                  <span className="bg-gradient-to-r from-amber-400 via-[#00D632] to-[#00FF50] text-black text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase shadow-sm">
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls (Cart & Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* High-Tech Cart Button */}
          <button
            id="header-cart-button"
            onClick={onOpenCart}
            aria-label="View Shopping Cart"
            title="View Shopping Cart"
            className="relative flex items-center justify-center gap-2 px-3.5 py-2.5 bg-gradient-to-r from-[#00A827] via-[#00D632] to-[#00FF3D] hover:from-[#00B92B] hover:to-[#00FF50] text-black font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-[#00D632]/25 hover:shadow-[#00D632]/45 active:scale-95 transition-all cursor-pointer ring-1 ring-white/30"
          >
            <ShoppingBag className="w-4 h-4 text-black stroke-[2.5]" />
            {cartCount > 0 && (
              <span className="bg-black text-[#00D632] text-xs font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                <span>{cartCount}</span>
                {cartTotal > 0 && <span className="text-[10px] text-slate-300 font-bold border-l border-slate-700 pl-1">${cartTotal}</span>}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-[#00D632] hover:border-[#00D632]/40 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f14]/98 backdrop-blur-2xl border-b border-emerald-900/40 px-4 py-5 space-y-4 animate-in slide-in-from-top-2 shadow-2xl">
          {/* Mobile Fast Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenOrderLookup();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-950/60 border border-emerald-700/50 text-xs font-bold text-emerald-300 hover:bg-emerald-900/60 transition-colors"
            >
              <Search className="w-4 h-4 text-emerald-400" />
              <span>Track Order</span>
            </button>
            <a
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-sky-950/60 border border-sky-700/50 text-xs font-bold text-sky-300 hover:bg-sky-900/60 transition-colors"
            >
              <Send className="w-4 h-4 text-sky-400" />
              <span>Telegram Chat</span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1 pt-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              const route = PAGE_ROUTES[link.page];
              return (
                <a
                  key={link.label}
                  href={route.path}
                  data-full-url={route.fullUrl}
                  onClick={(e) => handleNavClick(link.page, e)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                    isActive
                      ? 'bg-[#00D632]/15 text-[#00D632] border-[#00D632]/40 font-bold'
                      : 'border-transparent text-slate-200 hover:bg-[#00D632]/10 hover:text-[#00D632] hover:border-[#00D632]/30'
                  } group`}
                >
                  <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  <div className="flex items-center gap-2">
                    {link.badge && (
                      <span className="bg-gradient-to-r from-amber-400 via-[#00D632] to-[#00FF50] text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                        {link.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#00D632] transition-colors" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Verified Guarantee & Direct Contact Footer */}
          <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00D632]" />
              <span>Verified Escrow Support</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-800/30 text-xs text-emerald-300 font-semibold hover:bg-emerald-900/40 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">WhatsApp: {CONTACT_INFO.whatsapp}</span>
              </a>
              <a
                href={CONTACT_INFO.emailUrl}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-semibold hover:bg-slate-800/80 transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">Email Support</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
