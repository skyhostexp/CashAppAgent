import React, { useState, useEffect, useMemo, useRef } from 'react';
import { PageView, AccountProduct } from '../types';
import { ACCOUNT_PRODUCTS } from '../data/products';
import { 
  Search, 
  X, 
  Compass, 
  FileQuestion, 
  ArrowRight, 
  Sparkles, 
  ExternalLink,
  Bitcoin,
  ShieldCheck,
  Package,
  BookOpen,
  HelpCircle,
  MessageSquare,
  ShieldAlert,
  SlidersHorizontal
} from 'lucide-react';

interface SiteSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageView) => void;
  onBuyNow: (product: AccountProduct) => void;
}

export const SiteSearchModal: React.FC<SiteSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onBuyNow
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global hotkey escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Site pages dictionary
  const sitePages: { title: string; page: PageView; path: string; description: string; tag: string; icon: any; color: string }[] = [
    {
      title: 'Home - CashappAgent Verified Store',
      page: 'home',
      path: '/',
      description: 'Explore full catalog, account calculator, interactive mockups, and client testimonials.',
      tag: 'Storefront',
      icon: Compass,
      color: '#00D632'
    },
    {
      title: 'Buy Verified Cash App Accounts (All Tiers)',
      page: 'all-accounts',
      path: '/buy-verified-cashapp-accounts',
      description: 'Full catalog of all $4,000 to $100,000 limit verified accounts with US banking routing.',
      tag: 'Catalog',
      icon: SlidersHorizontal,
      color: '#00D632'
    },
    {
      title: 'Buy BTC Enabled Cash App Accounts',
      page: 'btc-accounts',
      path: '/buy-btc-enabled-cashapp-accounts',
      description: 'Layer-1 on-chain Bitcoin send & receive + Lightning Network integration enabled accounts.',
      tag: 'Crypto BTC',
      icon: Bitcoin,
      color: '#F7931A'
    },
    {
      title: 'Buy Non-BTC Cash App Accounts',
      page: 'non-btc-accounts',
      path: '/buy-non-btc-cashapp-accounts',
      description: 'Domestic US personal and business accounts for P2P transfers and invoice settlements.',
      tag: 'Domestic USD',
      icon: ShieldCheck,
      color: '#10B981'
    },
    {
      title: '7-Day Anti-Ban Warmup Safety Blueprint',
      page: 'safety-guide',
      path: '/safety-guide',
      description: 'Essential operational security checklist to prevent fraud flags and maintain account longevity.',
      tag: 'Guide',
      icon: BookOpen,
      color: '#38BDF8'
    },
    {
      title: 'Agency Wholesale & Bulk Bundles',
      page: 'bulk-orders',
      path: '/bulk-orders',
      description: 'Wholesale tiered discounts up to 35% off for high-volume agencies and payment operators.',
      tag: 'Wholesale',
      icon: Package,
      color: '#A855F7'
    },
    {
      title: 'Frequently Asked Questions & 30-Day Warranty',
      page: 'faq',
      path: '/faq',
      description: 'Detailed answers on delivery speed, warranty terms, replacement escrow, and legal compliance.',
      tag: 'Help Desk',
      icon: HelpCircle,
      color: '#94A3B8'
    },
    {
      title: 'Official 24/7 Support Desk & Live Chat',
      page: 'contact',
      path: '/contact',
      description: 'Direct Telegram concierge and WhatsApp support with under 5-minute average response time.',
      tag: 'Support',
      icon: MessageSquare,
      color: '#00D632'
    },
    {
      title: 'Official CashappAgent Blog & Industry Guides',
      page: 'blog',
      path: '/blog',
      description: 'Technical analyses, fintech compliance updates, and bitcoin transactional guidelines.',
      tag: 'Articles',
      icon: BookOpen,
      color: '#F59E0B'
    }
  ];

  // Matching results
  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        pages: sitePages.slice(0, 5),
        products: ACCOUNT_PRODUCTS.filter(p => p.isPopular).slice(0, 3),
        isZeroResults: false
      };
    }

    const matchedPages = sitePages.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.path.toLowerCase().includes(q) ||
      p.tag.toLowerCase().includes(q)
    );

    const matchedProducts = ACCOUNT_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.limitDisplay.toLowerCase().includes(q) ||
      p.features.some(f => f.toLowerCase().includes(q))
    );

    const isZeroResults = matchedPages.length === 0 && matchedProducts.length === 0;

    return {
      pages: matchedPages,
      products: matchedProducts,
      isZeroResults
    };
  }, [query]);

  const handleSelectPage = (page: PageView) => {
    onNavigate(page);
    onClose();
  };

  const handleGoTo404 = () => {
    onNavigate('not-found');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="w-full max-w-3xl bg-[#0d1217] border border-emerald-500/30 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#090d12] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#00D632] shrink-0" />
          <input
            ref={inputRef}
            id="site-search-modal-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, verified accounts, BTC clearance, guides, FAQs..."
            className="w-full bg-transparent border-none text-white placeholder-slate-400 text-sm sm:text-base font-semibold focus:outline-none focus:ring-0"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800 text-xs font-bold px-2 cursor-pointer"
            >
              Clear
            </button>
          ) : (
            <span className="hidden sm:inline-block text-[10px] font-mono text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
              ESC
            </span>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-grow">
          
          {/* ZERO RESULTS: 404 Notice */}
          {searchResults.isZeroResults && (
            <div className="py-10 text-center space-y-5 rounded-2xl bg-gradient-to-b from-rose-950/20 to-transparent border border-rose-500/20 p-6">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto shadow-inner">
                <ShieldAlert className="w-8 h-8" />
              </div>

              <div className="space-y-1.5 max-w-md mx-auto">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-black tracking-wider uppercase font-mono">
                  404: NO_MATCHES_FOUND
                </div>
                <h3 className="text-lg font-black text-white font-['Outfit',sans-serif]">
                  No Page or Account Found for "{query}"
                </h3>
                <p className="text-xs text-slate-400">
                  We couldn't locate this page or product on <strong className="text-white">CashappAgent.com</strong>. It may be misspelled or not currently offered.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  id="search-zero-results-404-btn"
                  onClick={handleGoTo404}
                  className="px-4 py-2.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-200 text-xs font-black flex items-center gap-2 cursor-pointer transition-all"
                >
                  <FileQuestion className="w-4 h-4 text-rose-400" />
                  <span>Open 404 Error Page</span>
                </button>

                <button
                  onClick={() => handleSelectPage('all-accounts')}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00A827] via-[#00D632] to-[#00FF3D] text-black text-xs font-black flex items-center gap-2 cursor-pointer shadow-lg shadow-[#00D632]/20 transition-all hover:scale-105"
                >
                  <Compass className="w-4 h-4" />
                  <span>Browse All Verified Accounts</span>
                </button>
              </div>
            </div>
          )}

          {/* MATCHING PAGES */}
          {!searchResults.isZeroResults && searchResults.pages.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
                <span>{query ? `Pages Matching "${query}"` : 'Quick Navigation Pages'}</span>
                <span className="text-slate-500 font-mono text-[11px]">{searchResults.pages.length} Pages</span>
              </div>

              <div className="grid gap-2">
                {searchResults.pages.map((p) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.page}
                      onClick={() => handleSelectPage(p.page)}
                      className="w-full p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/40 text-left transition-all group flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div 
                          className="p-2.5 rounded-xl shrink-0" 
                          style={{ backgroundColor: `${p.color}15`, border: `1px solid ${p.color}35`, color: p.color }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#00D632] transition-colors truncate">
                            {p.title}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">
                            {p.description}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {p.tag}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#00D632] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* MATCHING PRODUCTS */}
          {!searchResults.isZeroResults && searchResults.products.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
                <span>{query ? `Verified Accounts Matching "${query}"` : 'Popular Verified Accounts'}</span>
                <span className="text-slate-500 font-mono text-[11px]">{searchResults.products.length} Items</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {searchResults.products.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-slate-700 flex items-center justify-between gap-3 shadow-md"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${prod.btcEnabled ? 'bg-amber-400 shadow-[0_0_6px_#f7931a]' : 'bg-emerald-400 shadow-[0_0_6px_#00d632]'}`} />
                        <span className="text-xs font-black text-white truncate">{prod.name}</span>
                      </div>
                      <div className="text-[11px] text-emerald-400 font-mono font-black">
                        ${prod.price} USD <span className="text-slate-500 font-normal">| {prod.limitDisplay} Limit</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onBuyNow(prod);
                        onClose();
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#00D632] hover:bg-[#00FF50] text-black font-black text-xs shrink-0 cursor-pointer shadow-md transition-all active:scale-95"
                    >
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="p-3.5 border-t border-slate-800/80 bg-[#080c10] flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">ESC</kbd> to exit</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Instant URL & page search</span>
          </div>

          <button
            onClick={handleGoTo404}
            className="text-[11px] font-bold text-slate-400 hover:text-rose-300 transition-colors"
          >
            Looking for 404 page?
          </button>
        </div>
      </div>
    </div>
  );
};
