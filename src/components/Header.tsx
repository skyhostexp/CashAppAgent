import React, { useState, useEffect } from 'react';
import { CashAppLogo } from './CashAppLogo';
import { CONTACT_INFO } from '../data/cryptoGateways';
import { 
  Send, 
  Phone, 
  Mail, 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  Zap,
  Flame,
  Lock,
  Headphones,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  cartTotal?: number;
  onOpenCart: () => void;
  onOpenOrderLookup: () => void;
  onSelectCategory: (category: 'all' | 'btc-enabled' | 'non-btc') => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal = 0,
  onOpenCart,
  onOpenOrderLookup,
  onSelectCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  const announcements = [
    { text: '⚡ Instant Auto-Delivery via Email in 5–15 Mins', highlight: '⚡ Fast Dispatch' },
    { text: '🛡️ 30-Day Full Replacement & Escrow Warranty', highlight: '🛡️ 100% Guaranteed' },
    { text: '🇺🇸 Sutton Bank Routing + Bitcoin On-Chain Clearance', highlight: '🇺🇸 US Verified' },
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

  const navLinks = [
    { label: 'Accounts', href: '#accounts', onClick: () => onSelectCategory('all') },
    { label: 'BTC Enabled', href: '#accounts', onClick: () => onSelectCategory('btc-enabled'), badge: 'Hot' },
    { label: 'Non-BTC', href: '#accounts', onClick: () => onSelectCategory('non-btc') },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled 
        ? 'backdrop-blur-2xl bg-[#090d11]/95 border-b border-emerald-500/20 shadow-[0_12px_32px_rgba(0,0,0,0.5)]' 
        : 'backdrop-blur-xl bg-[#0b0f14]/90 border-b border-emerald-950/50'
    }`}>
      {/* Top Ambient Glow Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00D632] to-transparent opacity-80" />

      {/* Top Utility & Live Dispatch Ticker Bar */}
      <div className="bg-gradient-to-r from-[#06140b] via-[#092212] to-[#06140b] text-xs py-1.5 px-3 sm:px-6 border-b border-emerald-800/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Live Dispatch Indicator & Rotating Announcements */}
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-[10px] font-extrabold text-[#00D632] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D632] animate-ping" />
              <span className="hidden xs:inline tracking-wider">LIVE</span>
            </div>

            <div className="text-slate-300 font-medium text-[11px] sm:text-xs truncate transition-all duration-500">
              <span className="text-[#00D632] font-semibold mr-1.5 hidden sm:inline">
                {announcements[tickerIndex].highlight}:
              </span>
              <span>{announcements[tickerIndex].text}</span>
            </div>
          </div>

          {/* Quick Direct Support Channels */}
          <div className="flex items-center gap-3 shrink-0 text-xs font-semibold">
            <a
              id="top-bar-telegram-link"
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-sky-950/50 hover:bg-sky-900/60 border border-sky-600/30 text-sky-300 hover:text-sky-200 transition-all text-[11px]"
            >
              <Send className="w-3 h-3 text-sky-400" />
              <span className="hidden sm:inline">Telegram:</span>
              <span>@CashappsAgent</span>
            </a>
            
            <a
              id="top-bar-whatsapp-link"
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-600/30 text-emerald-300 hover:text-emerald-200 transition-all text-[11px]"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{CONTACT_INFO.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo with Live Domain Badge */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <CashAppLogo size="md" />
          </a>
        </div>

        {/* Live Stock Pill Badge (Desktop Only) */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-emerald-950/40 border border-emerald-800/40 rounded-full text-xs font-semibold text-emerald-300 shadow-inner">
          <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>14 Accounts In Stock</span>
          <span className="w-1 h-1 rounded-full bg-emerald-400" />
          <span className="text-[11px] text-slate-400">Auto-Email Dispatch</span>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-900/60 border border-slate-800/80 rounded-2xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              href={link.href}
              onClick={link.onClick}
              className="relative px-3.5 py-2 text-xs xl:text-sm font-semibold text-slate-300 hover:text-white rounded-xl hover:bg-emerald-500/10 hover:text-emerald-300 transition-all flex items-center gap-1.5 group"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="bg-gradient-to-r from-amber-500 to-[#00D632] text-black text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase shadow-sm">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Action Controls (Support, Track Order, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Telegram Support Button (Desktop/Tablet) */}
          <a
            id="header-telegram-quick-btn"
            href={CONTACT_INFO.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-sky-300 bg-sky-950/40 hover:bg-sky-900/60 border border-sky-800/40 rounded-xl transition-all"
            title="Chat directly with our verified Telegram agent"
          >
            <Headphones className="w-3.5 h-3.5 text-sky-400" />
            <span>24/7 Agent</span>
          </a>

          {/* Order Tracking Radar Button */}
          <button
            id="header-track-order-btn"
            onClick={onOpenOrderLookup}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-700/40 rounded-xl transition-all active:scale-95"
            title="Track Order Status & Credentials"
          >
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            <span>Track Order</span>
          </button>

          {/* High-Tech Checkout / Cart Button */}
          <button
            id="header-cart-button"
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#00A827] via-[#00D632] to-[#00FF3D] hover:from-[#00B92B] hover:to-[#00FF50] text-black font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-[#00D632]/25 hover:shadow-[#00D632]/45 active:scale-95 transition-all cursor-pointer ring-1 ring-white/30"
          >
            <ShoppingBag className="w-4 h-4 text-black stroke-[2.5]" />
            <span>Checkout</span>
            {cartCount > 0 ? (
              <span className="bg-black text-[#00D632] text-xs font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                <span>{cartCount}</span>
                {cartTotal > 0 && <span className="text-[10px] text-slate-300 font-bold border-l border-slate-700 pl-1">${cartTotal}</span>}
              </span>
            ) : null}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c1117] border-b border-emerald-900/40 px-4 py-5 space-y-4 animate-in slide-in-from-top-2 shadow-2xl">
          {/* Mobile Stock & Dispatch Badge */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs font-semibold text-emerald-300">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>14 Accounts In Stock Ready</span>
            </div>
            <span className="text-[11px] text-[#00D632] font-bold">5-15 min dispatch</span>
          </div>

          {/* Mobile Fast Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenOrderLookup();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-950/60 border border-emerald-700/50 text-xs font-bold text-emerald-300 hover:bg-emerald-900/60 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Track Order</span>
            </button>
            <a
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-sky-950/60 border border-sky-700/50 text-xs font-bold text-sky-300 hover:bg-sky-900/60 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Telegram Chat</span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  if (link.onClick) link.onClick();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between p-3 rounded-xl text-slate-200 font-semibold text-sm hover:bg-slate-800/80 hover:text-emerald-300 transition-colors border border-transparent hover:border-slate-700"
              >
                <span>{link.label}</span>
                <div className="flex items-center gap-2">
                  {link.badge && (
                    <span className="bg-gradient-to-r from-amber-500 to-[#00D632] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              </a>
            ))}
          </div>

          {/* Verified Guarantee & Direct Contact Footer */}
          <div className="pt-3 border-t border-slate-800 space-y-2.5">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00D632]" />
              <span>Verified Escrow Support</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-800/30 text-xs text-emerald-300 font-semibold"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">WhatsApp: {CONTACT_INFO.whatsapp}</span>
              </a>
              <a
                href={CONTACT_INFO.emailUrl}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-semibold"
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

