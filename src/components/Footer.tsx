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
  Heart
} from 'lucide-react';

interface FooterProps {
  onSelectProduct: (product: AccountProduct) => void;
  onOpenOrderLookup: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectProduct, onOpenOrderLookup }) => {
  return (
    <footer className="bg-[#070b0e] border-t border-emerald-950/60 text-slate-400 text-xs">
      {/* Upper Crypto Gateway Banner */}
      <div className="border-b border-slate-800/80 py-8 bg-[#090e13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="text-sm font-black text-white flex items-center justify-center md:justify-start gap-2 font-['Outfit',sans-serif]">
                <Lock className="w-4 h-4 text-[#00D632]" />
                <span>Accepted 100% Secure Cryptocurrency Gateways</span>
              </div>
              <p className="text-xs text-slate-400">
                Zero processing fees, instant block confirmation, and privacy-first automated checkout.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {Object.keys(CRYPTO_GATEWAYS).map((cKey) => {
                const gw = CRYPTO_GATEWAYS[cKey as keyof typeof CRYPTO_GATEWAYS];
                return (
                  <span
                    key={cKey}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-black text-slate-200 flex items-center gap-1.5 shadow-sm"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: gw.iconColor }}
                    />
                    <span>{cKey}</span>
                  </span>
                );
              })}
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
              <strong className="text-white">CashappsAgent (cashappagent.com)</strong> is the premier vendor for aged, 100% identity-verified Cash App accounts with BTC withdrawal capabilities and limits up to $25,000. All accounts include primary email access and full identity documentation.
            </p>

            <div className="space-y-2 pt-2">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Official Support Lines:
              </div>
              <div className="flex flex-col gap-1.5">
                <a
                  href={CONTACT_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sky-400 hover:text-sky-300 font-semibold"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram: {CONTACT_INFO.telegram}</span>
                </a>
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp: {CONTACT_INFO.whatsapp}</span>
                </a>
                <a
                  href={CONTACT_INFO.emailUrl}
                  className="flex items-center gap-2 text-slate-300 hover:text-white font-semibold"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email: {CONTACT_INFO.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* BTC Accounts (1 col) */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white font-['Outfit',sans-serif] flex items-center gap-1.5">
              <Bitcoin className="w-4 h-4 text-[#F7931A]" />
              BTC Enabled Accounts
            </h4>
            <ul className="space-y-2">
              {ACCOUNT_PRODUCTS.filter(p => p.btcEnabled).map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onSelectProduct(p)}
                    className="text-left text-slate-400 hover:text-[#00D632] transition-colors flex items-center justify-between w-full"
                  >
                    <span>{p.name}</span>
                    <span className="text-[#00D632] font-bold">${p.price}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Non-BTC Accounts (1 col) */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white font-['Outfit',sans-serif] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00D632]" />
              Non-BTC USD Accounts
            </h4>
            <ul className="space-y-2">
              {ACCOUNT_PRODUCTS.filter(p => !p.btcEnabled).map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onSelectProduct(p)}
                    className="text-left text-slate-400 hover:text-[#00D632] transition-colors flex items-center justify-between w-full"
                  >
                    <span>{p.name}</span>
                    <span className="text-[#00D632] font-bold">${p.price}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation & Help (1 col) */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white font-['Outfit',sans-serif]">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#accounts" className="hover:text-white transition-colors">
                  Buy Verified Accounts
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Smart Limit Calculator
                </a>
              </li>
              <li>
                <a href="#inspector" className="hover:text-white transition-colors">
                  Virtual Account Demo
                </a>
              </li>
              <li>
                <a href="#crypto-converter" className="hover:text-white transition-colors">
                  Crypto Rate &amp; Gas Tool
                </a>
              </li>
              <li>
                <a href="#safety-guide" className="hover:text-white transition-colors">
                  Anti-Ban Warm-up Guide
                </a>
              </li>
              <li>
                <a href="#bulk" className="hover:text-white transition-colors">
                  Agency Bulk Bundles
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenOrderLookup}
                  className="text-emerald-400 hover:text-emerald-300 font-bold"
                >
                  Track Existing Order
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQs &amp; Guarantees
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Support 24/7
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Keywords Tag Cloud */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 space-y-3">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Popular SEO Tags &bull; CashappsAgent (cashappagent.com)
          </div>
          <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-500">
            <span className="bg-slate-900/80 px-2 py-1 rounded">Buy Verified Cash App Accounts</span>
            <span className="bg-slate-900/80 px-2 py-1 rounded">Buy BTC Enable Cash App Account</span>
            <span className="bg-slate-900/80 px-2 py-1 rounded">Verified Cash App Accounts for Sale</span>
            <span className="bg-slate-900/80 px-2 py-1 rounded">Buy 25k Limit Cash App</span>
            <span className="bg-slate-900/80 px-2 py-1 rounded">Buy 10k Limit Cash App</span>
            <span className="bg-slate-900/80 px-2 py-1 rounded">Buy 4k Limit Cash App</span>
            <span className="bg-slate-900/80 px-2 py-1 rounded">Non BTC Cash App Account</span>
            <span className="bg-slate-900/80 px-2 py-1 rounded">Cash App Bitcoin Withdrawal</span>
            <span className="bg-slate-900/80 px-2 py-1 rounded">Aged USA Cash App Account</span>
            <span className="bg-slate-900/80 px-2 py-1 rounded">Cash App with Full Documents</span>
            <span className="bg-slate-900/80 px-2 py-1 rounded">cashappagent.com</span>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-white">CashappsAgent</strong> (cashappagent.com). All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00D632]" />
              100% Encrypted &bull; 30-Day Guarantee
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
