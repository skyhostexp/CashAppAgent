import React, { useState, useMemo } from 'react';
import { AccountProduct, PageView } from '../../types';
import { ACCOUNT_PRODUCTS } from '../../data/products';
import { PAGE_ROUTES } from '../../utils/navigation';
import { ProductCard } from '../ProductCard';
import { 
  Search, 
  Home, 
  ArrowLeft, 
  ShieldAlert, 
  FileQuestion, 
  Compass, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  BookOpen,
  HelpCircle,
  Package,
  Bitcoin,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: PageView) => void;
  onBuyNow: (product: AccountProduct) => void;
  onAddToCart: (product: AccountProduct) => void;
  searchedQuery?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigate,
  onBuyNow,
  onAddToCart,
  searchedQuery = ''
}) => {
  const [searchTerm, setSearchTerm] = useState(searchedQuery);
  const [currentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.search + window.location.hash;
    }
    return '/unknown-page';
  });

  // Site pages database for search
  const sitePages: { title: string; page: PageView; path: string; description: string; tag: string }[] = [
    {
      title: 'Home - CashappAgent Verified Store',
      page: 'home',
      path: '/',
      description: 'Explore full catalog, account calculator, interactive mockups, and client testimonials.',
      tag: 'Main Store'
    },
    {
      title: 'Buy Verified Cash App Accounts (All Tiers)',
      page: 'all-accounts',
      path: '/buy-verified-cashapp-accounts',
      description: 'Full catalog of all $4,000 to $100,000 limit verified accounts with US banking routing.',
      tag: 'All Accounts'
    },
    {
      title: 'Buy BTC Enabled Cash App Accounts',
      page: 'btc-accounts',
      path: '/buy-btc-enabled-cashapp-accounts',
      description: 'Layer-1 on-chain Bitcoin send & receive + Lightning Network integration enabled accounts.',
      tag: 'BTC Enabled'
    },
    {
      title: 'Buy Non-BTC Cash App Accounts',
      page: 'non-btc-accounts',
      path: '/buy-non-btc-cashapp-accounts',
      description: 'Domestic US personal and business accounts for P2P transfers and invoice settlements.',
      tag: 'Non-BTC USD'
    },
    {
      title: '7-Day Anti-Ban Warmup Safety Blueprint',
      page: 'safety-guide',
      path: '/safety-guide',
      description: 'Essential operational security checklist to prevent fraud flags and maintain account longevity.',
      tag: 'Safety Guide'
    },
    {
      title: 'Agency Wholesale & Bulk Bundles',
      page: 'bulk-orders',
      path: '/bulk-orders',
      description: 'Wholesale tiered discounts up to 35% off for high-volume agencies and payment operators.',
      tag: 'Bulk Orders'
    },
    {
      title: 'Frequently Asked Questions & 30-Day Warranty',
      page: 'faq',
      path: '/faq',
      description: 'Detailed answers on delivery speed, warranty terms, replacement escrow, and legal compliance.',
      tag: 'FAQ'
    },
    {
      title: 'Official 24/7 Support Desk & Live Chat',
      page: 'contact',
      path: '/contact',
      description: 'Direct Telegram concierge and WhatsApp support with under 5-minute average response time.',
      tag: 'Support'
    },
    {
      title: 'Official CashappAgent Blog & Industry Guides',
      page: 'blog',
      path: '/blog',
      description: 'Technical analyses, fintech compliance updates, and bitcoin transactional guidelines.',
      tag: 'Blog'
    }
  ];

  // Real-time matching pages and products
  const matchingResults = useMemo(() => {
    if (!searchTerm.trim()) return { pages: [], products: [] };
    const q = searchTerm.toLowerCase().trim();

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

    return { pages: matchedPages, products: matchedProducts };
  }, [searchTerm]);

  const popularProducts = useMemo(() => {
    return ACCOUNT_PRODUCTS.filter(p => p.isPopular || p.price >= 249).slice(0, 3);
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb & Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <button
          id="not-found-back-home-btn"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-[#00D632] transition-colors bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 hover:border-emerald-500/40 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-rose-400 bg-rose-950/40 border border-rose-500/30 px-3 py-1.5 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span>HTTP 404: RESOURCE_NOT_FOUND</span>
        </div>
      </div>

      {/* Hero 404 Cyber Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12080a] via-[#0d0a10] to-[#070b0e] border border-rose-500/25 p-8 sm:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-center">
        {/* Glow ambient spots */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#00D632]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-black uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>404 Error - Page Not Found</span>
          </div>

          {/* Big Graphic 404 */}
          <div className="relative">
            <h1 className="text-7xl sm:text-9xl font-black font-['Outfit',sans-serif] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-rose-500 select-none drop-shadow-[0_0_35px_rgba(244,63,94,0.3)]">
              404
            </h1>
            <p className="text-xl sm:text-2xl font-black text-white font-['Outfit',sans-serif] mt-2">
              The Page You Searched For Is Not On Our Website
            </p>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            The URL <span className="font-mono text-amber-300 bg-black/50 px-2 py-0.5 rounded border border-amber-500/30 break-all">{currentPath}</span> does not match any valid document or directory on <strong className="text-white">CashappAgent.com</strong>.
          </p>

          {/* Interactive Live Search Box */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="relative">
              <input
                id="404-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search verified accounts, BTC tiers, guides, FAQs..."
                className="w-full pl-12 pr-10 py-4 bg-slate-900/90 border-2 border-emerald-500/40 focus:border-[#00D632] rounded-2xl text-sm font-semibold text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#00D632]/20 shadow-2xl transition-all"
              />
              <Search className="w-5 h-5 text-[#00D632] absolute left-4 top-1/2 -translate-y-1/2" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Live Search Instant Results Box */}
            {searchTerm.trim().length > 0 && (
              <div className="mt-3 bg-slate-900/95 border border-emerald-500/30 rounded-2xl p-4 text-left shadow-2xl space-y-4 animate-in fade-in duration-200">
                <div className="text-xs font-bold text-slate-400 flex items-center justify-between">
                  <span>Search results for "{searchTerm}":</span>
                  <span className="text-[#00D632] font-mono">
                    {matchingResults.pages.length + matchingResults.products.length} match(es)
                  </span>
                </div>

                {matchingResults.pages.length === 0 && matchingResults.products.length === 0 ? (
                  <div className="py-6 text-center space-y-2">
                    <FileQuestion className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-sm font-bold text-rose-300">
                      404: No pages or accounts found matching "{searchTerm}"
                    </p>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Please check your spelling or browse through our official site directory below.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Matching Pages */}
                    {matchingResults.pages.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                          Pages & Guides ({matchingResults.pages.length})
                        </span>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {matchingResults.pages.map((p) => (
                            <button
                              key={p.page}
                              onClick={() => onNavigate(p.page)}
                              className="w-full text-left p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition-all group flex items-start justify-between gap-2 cursor-pointer"
                            >
                              <div className="space-y-0.5 min-w-0">
                                <div className="text-xs font-bold text-white group-hover:text-[#00D632] transition-colors truncate">
                                  {p.title}
                                </div>
                                <div className="text-[11px] text-slate-400 line-clamp-1">
                                  {p.description}
                                </div>
                              </div>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 shrink-0">
                                {p.tag}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Matching Products */}
                    {matchingResults.products.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-slate-800">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                          Verified Accounts ({matchingResults.products.length})
                        </span>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {matchingResults.products.map((prod) => (
                            <div
                              key={prod.id}
                              className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-2"
                            >
                              <div className="min-w-0">
                                <div className="text-xs font-black text-white truncate">
                                  {prod.name}
                                </div>
                                <div className="text-[11px] text-emerald-400 font-mono font-bold">
                                  ${prod.price} USD • {prod.limitDisplay} Limit
                                </div>
                              </div>
                              <button
                                onClick={() => onBuyNow(prod)}
                                className="px-3 py-1.5 rounded-lg bg-[#00D632] hover:bg-[#00FF50] text-black font-black text-xs shrink-0 cursor-pointer shadow"
                              >
                                Buy
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              id="404-btn-all-accounts"
              onClick={() => onNavigate('all-accounts')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00A827] via-[#00D632] to-[#00FF3D] hover:from-[#00B92B] hover:to-[#00FF50] text-black font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#00D632]/20 cursor-pointer transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4" />
              <span>Browse All Verified Accounts</span>
            </button>

            <button
              id="404-btn-home"
              onClick={() => onNavigate('home')}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all"
            >
              <Home className="w-4 h-4 text-emerald-400" />
              <span>Return Home</span>
            </button>

            <button
              id="404-btn-support"
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all"
            >
              <MessageSquare className="w-4 h-4 text-sky-400" />
              <span>Need Help? Contact Support</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official Directory & Category Portals */}
      <div className="space-y-6">
        <div className="text-center space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit',sans-serif]">
            Explore Official CashappAgent Pages
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Quickly navigate to any verified section of our official platform:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: BTC Accounts */}
          <button
            onClick={() => onNavigate('btc-accounts')}
            className="p-5 rounded-2xl bg-gradient-to-b from-[#12161f] to-[#0c1017] border border-amber-500/30 hover:border-amber-400/70 text-left transition-all hover:-translate-y-1 shadow-lg group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[#F7931A]">
                <Bitcoin className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                Layer-1 & Lightning
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
              BTC Enabled Cash App Accounts
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Full crypto clearance for on-chain bitcoin withdrawals, deposits, and Lightning payments.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-400">
              <span>View BTC Accounts ($249–$499)</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 2: Non-BTC Accounts */}
          <button
            onClick={() => onNavigate('non-btc-accounts')}
            className="p-5 rounded-2xl bg-gradient-to-b from-[#12161f] to-[#0c1017] border border-emerald-500/30 hover:border-emerald-400/70 text-left transition-all hover:-translate-y-1 shadow-lg group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[#00D632]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                Domestic USD
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#00D632] transition-colors">
              Non-BTC Cash App Accounts
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Verified with SSN + Sutton Bank US routing for P2P sending, debit card, and direct deposit.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#00D632]">
              <span>View USD Accounts ($149–$299)</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 3: Bulk Orders */}
          <button
            onClick={() => onNavigate('bulk-orders')}
            className="p-5 rounded-2xl bg-gradient-to-b from-[#12161f] to-[#0c1017] border border-purple-500/30 hover:border-purple-400/70 text-left transition-all hover:-translate-y-1 shadow-lg group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/30">
                Up to 35% Off
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
              Agency Wholesale & Bulk Bundles
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Volume discounts on 5, 10, and 20 account packages with priority replacement warranty.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-purple-400">
              <span>Configure Bulk Package</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 4: Safety Blueprint */}
          <button
            onClick={() => onNavigate('safety-guide')}
            className="p-5 rounded-2xl bg-gradient-to-b from-[#12161f] to-[#0c1017] border border-sky-500/30 hover:border-sky-400/70 text-left transition-all hover:-translate-y-1 shadow-lg group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-500/30">
                7-Day Blueprint
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">
              Anti-Ban Warmup Safety Guide
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Step-by-step device proxy setup, residential IP practices, and safe transaction pacing.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-sky-400">
              <span>Read Safety Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 5: FAQ & Warranty */}
          <button
            onClick={() => onNavigate('faq')}
            className="p-5 rounded-2xl bg-gradient-to-b from-[#12161f] to-[#0c1017] border border-slate-700 hover:border-slate-500 text-left transition-all hover:-translate-y-1 shadow-lg group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                30-Day Escrow
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#00D632] transition-colors">
              FAQ & 30-Day Warranty Policy
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Complete details on delivery speed, crypto payments, replacement guarantees, and limits.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-slate-300 group-hover:text-[#00D632]">
              <span>Read Frequently Asked Questions</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 6: Contact Support */}
          <button
            onClick={() => onNavigate('contact')}
            className="p-5 rounded-2xl bg-gradient-to-b from-[#12161f] to-[#0c1017] border border-slate-700 hover:border-slate-500 text-left transition-all hover:-translate-y-1 shadow-lg group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                24/7 Online
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#00D632] transition-colors">
              Live Support & Order Desk
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Need assistance finding a specific limit tier? Message our certified human desk anytime.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-slate-300 group-hover:text-[#00D632]">
              <span>Contact Support Desk</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Featured Accounts Direct Buy Section */}
      <div className="space-y-6 pt-6 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit',sans-serif] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00D632]" />
              <span>Recommended Verified Accounts</span>
            </h2>
            <p className="text-xs text-slate-400">
              Ready for immediate automated dispatch (5–15 min email delivery)
            </p>
          </div>

          <button
            onClick={() => onNavigate('all-accounts')}
            className="text-xs font-bold text-[#00D632] hover:text-[#00FF50] flex items-center gap-1"
          >
            <span>View all 8 accounts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onBuyNow={onBuyNow}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
