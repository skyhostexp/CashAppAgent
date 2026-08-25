import React, { useState } from 'react';
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
  ExternalLink
} from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrderLookup: () => void;
  onSelectCategory: (category: 'all' | 'btc-enabled' | 'non-btc') => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenOrderLookup,
  onSelectCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Accounts', href: '#accounts', onClick: () => onSelectCategory('all') },
    { label: 'BTC Enabled', href: '#accounts', onClick: () => onSelectCategory('btc-enabled'), badge: 'Hot' },
    { label: 'Non-BTC', href: '#accounts', onClick: () => onSelectCategory('non-btc') },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0b0f12]/90 border-b border-emerald-950/40">
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#072412] to-emerald-950 text-xs py-2 px-4 border-b border-emerald-800/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-emerald-300 font-medium">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00D632] text-black animate-pulse">
              LIVE
            </span>
            <span className="hidden sm:inline">⚡ 100% Fully Verified Cash App Accounts (BTC & Non-BTC)</span>
            <span className="sm:hidden">⚡ Instant Cash App Accounts Ready</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300 hidden md:inline">Instant Auto-Delivery (5-15 mins)</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <a
              id="top-bar-telegram-link"
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{CONTACT_INFO.telegram}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              id="top-bar-whatsapp-link"
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{CONTACT_INFO.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <CashAppLogo size="md" />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              href={link.href}
              onClick={link.onClick}
              className="relative px-3 py-2 text-sm font-semibold text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all flex items-center gap-1.5"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="bg-[#00D632] text-black text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Action Controls (Track Order, Contact Dropdown, Cart) */}
        <div className="flex items-center gap-3">
          {/* Order Tracking Button */}
          <button
            id="header-track-order-btn"
            onClick={onOpenOrderLookup}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-400 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-700/40 rounded-xl transition-all"
            title="Track Order Status"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track Order</span>
          </button>

          {/* Cart Icon Button */}
          <button
            id="header-cart-button"
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#00A827] to-[#00D632] hover:from-[#00B92B] hover:to-[#00FF3D] text-black font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-[#00D632]/20 hover:shadow-[#00D632]/35 active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-black stroke-[2.5]" />
            <span className="hidden sm:inline">Checkout</span>
            {cartCount > 0 && (
              <span className="bg-black text-[#00D632] text-xs font-black w-5 h-5 rounded-full flex items-center justify-center -mr-1">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e141a] border-b border-slate-800 px-4 py-6 space-y-4 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => {
                onOpenOrderLookup();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-950/60 border border-emerald-700/50 text-xs font-bold text-emerald-300"
            >
              <Search className="w-4 h-4" />
              <span>Track Order</span>
            </button>
            <a
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-sky-950/60 border border-sky-700/50 text-xs font-bold text-sky-300"
            >
              <Send className="w-4 h-4" />
              <span>Telegram Chat</span>
            </a>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  if (link.onClick) link.onClick();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between p-3 rounded-xl text-slate-200 font-semibold text-sm hover:bg-slate-800/80 transition-colors"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="bg-[#00D632] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 font-medium">Contact Support 24/7</div>
            <div className="flex flex-col gap-2">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-emerald-400 font-semibold"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp: {CONTACT_INFO.whatsapp}</span>
              </a>
              <a
                href={CONTACT_INFO.emailUrl}
                className="flex items-center gap-2 text-xs text-slate-400 font-semibold"
              >
                <Mail className="w-4 h-4" />
                <span>Email: {CONTACT_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
