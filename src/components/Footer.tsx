import React from 'react';
import { CashAppLogo } from './CashAppLogo';
import { CONTACT_INFO, CRYPTO_GATEWAYS } from '../data/cryptoGateways';
import { ACCOUNT_PRODUCTS } from '../data/products';
import { AccountProduct } from '../types';
import { 
  Send, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Lock, 
  Bitcoin, 
  ExternalLink,
  CheckCircle2,
  Zap,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  Search
} from 'lucide-react';

interface FooterProps {
  onSelectProduct: (product: AccountProduct) => void;
  onOpenOrderLookup: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectProduct, onOpenOrderLookup }) => {
  return (
    <footer className="bg-[#060a0d] border-t border-emerald-950/80 text-slate-400 text-xs relative overflow-hidden">
      {/* Top Ambient Glow Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D632]/50 to-transparent" />

      {/* Upper Crypto Gateway Showcase Bar */}
      <div className="border-b border-slate-800/80 py-8 bg-[#080d12]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            <div className="space-y-1.5 text-center lg:text-left">
              <div className="text-sm font-black text-white flex items-center justify-center lg:justify-start gap-2 font-['Outfit',sans-serif]">
                <div className="p-1 rounded-lg bg-[#00D632]/10 border border-[#00D632]/30">
                  <Lock className="w-4 h-4 text-[#00D632]" />
                </div>
                <span>Accepted 100% Encrypted Crypto Gateways</span>
              </div>
              <p className="text-xs text-slate-400 max-w-lg">
                Zero merchant processing fees, instant on-chain block confirmation, and privacy-first automated credential dispatch.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {Object.keys(CRYPTO_GATEWAYS).map((cKey) => {
                const gw = CRYPTO_GATEWAYS[cKey as keyof typeof CRYPTO_GATEWAYS];
                return (
                  <div
                    key={cKey}
                    className="px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-xs font-black text-slate-200 flex items-center gap-2 shadow-sm transition-all hover:bg-slate-800/80 group"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full ring-2 ring-black/50 shadow-[0_0_8px_currentColor]"
                      style={{ backgroundColor: gw.iconColor, color: gw.iconColor }}
                    />
                    <span className="font-mono text-[11px] tracking-wide">{cKey}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Highlights Strip */}
      <div className="border-b border-slate-900 bg-[#070b0f] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <Zap className="w-4 h-4 text-[#00D632] shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="font-bold text-white block">5–15 Min Delivery</span>
                <span className="text-slate-500 text-[10px]">Instant Auto-Dispatch</span>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="font-bold text-white block">30-Day Guarantee</span>
                <span className="text-slate-500 text-[10px]">Full Replacement Escrow</span>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="font-bold text-white block">100% US Verified</span>
                <span className="text-slate-500 text-[10px]">Sutton Bank + SSN ID</span>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <Bitcoin className="w-4 h-4 text-[#F7931A] shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="font-bold text-white block">BTC On-Chain Ready</span>
                <span className="text-slate-500 text-[10px]">Full Crypto Withdrawal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <CashAppLogo size="lg" />
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              <strong className="text-white">CashappsAgent (cashappagent.com)</strong> is the premier verified vendor for aged, 100% identity-verified Cash App accounts with Bitcoin withdrawal capabilities and limits up to $25,000. All accounts include primary email access and full identity documentation.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00D632] animate-pulse" />
                <span>24/7 Verified Support Channels:</span>
              </div>
              
              <div className="flex flex-col gap-2">
                <a
                  href={CONTACT_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-sky-950/30 hover:bg-sky-950/60 border border-sky-600/30 text-sky-300 hover:text-sky-100 font-semibold transition-all group max-w-xs"
                >
                  <Send className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-xs">Telegram Support</span>
                    <span className="text-[10px] text-sky-400/80 font-normal">@CashappsAgent (Live)</span>
                  </div>
                </a>

                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-950/30 hover:bg-emerald-950/60 border border-emerald-600/30 text-emerald-300 hover:text-emerald-100 font-semibold transition-all group max-w-xs"
                >
                  <Phone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-xs">WhatsApp Direct</span>
                    <span className="text-[10px] text-emerald-400/80 font-normal">{CONTACT_INFO.whatsapp}</span>
                  </div>
                </a>

                <a
                  href={CONTACT_INFO.emailUrl}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-semibold transition-all group max-w-xs"
                >
                  <Mail className="w-4 h-4 text-slate-400 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-xs">Email Desk</span>
                    <span className="text-[10px] text-slate-400 font-normal">{CONTACT_INFO.email}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* BTC Accounts (1 col) */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white font-['Outfit',sans-serif] flex items-center gap-1.5 pb-1 border-b border-slate-800">
              <Bitcoin className="w-4 h-4 text-[#F7931A]" />
              BTC Enabled Tiers
            </h4>
            <ul className="space-y-2.5">
              {ACCOUNT_PRODUCTS.filter(p => p.btcEnabled).map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onSelectProduct(p)}
                    className="text-left text-slate-400 hover:text-[#00D632] transition-all flex items-center justify-between w-full p-1.5 rounded-lg hover:bg-white/5 group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{p.name}</span>
                    <span className="text-[#00D632] font-mono font-bold bg-[#00D632]/10 px-1.5 py-0.5 rounded text-[11px]">
                      ${p.price}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Non-BTC Accounts (1 col) */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white font-['Outfit',sans-serif] flex items-center gap-1.5 pb-1 border-b border-slate-800">
              <ShieldCheck className="w-4 h-4 text-[#00D632]" />
              Non-BTC USD Tiers
            </h4>
            <ul className="space-y-2.5">
              {ACCOUNT_PRODUCTS.filter(p => !p.btcEnabled).map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onSelectProduct(p)}
                    className="text-left text-slate-400 hover:text-[#00D632] transition-all flex items-center justify-between w-full p-1.5 rounded-lg hover:bg-white/5 group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{p.name}</span>
                    <span className="text-[#00D632] font-mono font-bold bg-[#00D632]/10 px-1.5 py-0.5 rounded text-[11px]">
                      ${p.price}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation & Tools (1 col) */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white font-['Outfit',sans-serif] pb-1 border-b border-slate-800">
              Tools &amp; Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#accounts" className="hover:text-[#00D632] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>Buy Verified Accounts</span>
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#00D632] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>Smart Limit Calculator</span>
                </a>
              </li>
              <li>
                <a href="#inspector" className="hover:text-[#00D632] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>Virtual Account Demo</span>
                </a>
              </li>
              <li>
                <a href="#crypto-converter" className="hover:text-[#00D632] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>Crypto Gas &amp; Rate Tool</span>
                </a>
              </li>
              <li>
                <a href="#safety-guide" className="hover:text-[#00D632] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>7-Day Anti-Ban Blueprint</span>
                </a>
              </li>
              <li>
                <a href="#bulk" className="hover:text-[#00D632] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>Agency Bulk Bundles</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenOrderLookup}
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Search className="w-3 h-3 text-emerald-400" />
                  <span>Track Existing Order</span>
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#00D632] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>FAQs &amp; Guarantees</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#00D632] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>Contact 24/7 Desk</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Keywords Tag Cloud */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 space-y-3">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#00D632]" />
            <span>Popular Verified Tags &bull; CashappsAgent (cashappagent.com)</span>
          </div>
          <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-400">
            <span className="bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/40 px-2.5 py-1 rounded-lg transition-colors">Buy Verified Cash App Accounts</span>
            <span className="bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/40 px-2.5 py-1 rounded-lg transition-colors">Buy BTC Enable Cash App Account</span>
            <span className="bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/40 px-2.5 py-1 rounded-lg transition-colors">Verified Cash App Accounts for Sale</span>
            <span className="bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/40 px-2.5 py-1 rounded-lg transition-colors">Buy 25k Limit Cash App</span>
            <span className="bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/40 px-2.5 py-1 rounded-lg transition-colors">Buy 10k Limit Cash App</span>
            <span className="bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/40 px-2.5 py-1 rounded-lg transition-colors">Buy 4k Limit Cash App</span>
            <span className="bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/40 px-2.5 py-1 rounded-lg transition-colors">Non BTC Cash App Account</span>
            <span className="bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/40 px-2.5 py-1 rounded-lg transition-colors">Cash App Bitcoin Withdrawal</span>
            <span className="bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/40 px-2.5 py-1 rounded-lg transition-colors">Aged USA Cash App Account</span>
            <span className="bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/40 px-2.5 py-1 rounded-lg transition-colors">Cash App with Full Documents</span>
            <span className="bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/40 px-2.5 py-1 rounded-lg transition-colors">cashappagent.com</span>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-white">CashappsAgent</strong> (cashappagent.com). All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00D632]" />
              100% Encrypted &bull; 30-Day Guarantee
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
