import React, { useState, useMemo } from 'react';
import { PageView, AccountProduct } from '../../types';
import { PAGE_ROUTES, SITE_ORIGIN } from '../../utils/navigation';
import { ACCOUNT_PRODUCTS } from '../../data/products';
import { BLOG_POSTS } from '../../data/blogPosts';
import {
  MapPin,
  Compass,
  FileCode2,
  ExternalLink,
  ShieldCheck,
  Bitcoin,
  Package,
  BookOpen,
  HelpCircle,
  Headphones,
  Search,
  ArrowRight,
  Layers,
  Sparkles,
  Calculator,
  Eye,
  Scale,
  DollarSign,
  FileText,
  Copy,
  Check,
  Globe,
  Database,
  ArrowUpRight
} from 'lucide-react';

interface SitemapItem {
  title: string;
  url: string;
  path: string;
  page?: PageView;
  changefreq: string;
  priority: string;
  description: string;
  badge?: string;
  price?: string;
  isExternalFile?: boolean;
  action?: string;
  productObj?: AccountProduct;
}

interface SitemapSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  items: SitemapItem[];
}

interface SitemapPageProps {
  onNavigate: (page: PageView) => void;
  onSelectProduct?: (product: AccountProduct) => void;
  onOpenOrderLookup: () => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({
  onNavigate,
  onSelectProduct,
  onOpenOrderLookup,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const sections: SitemapSection[] = useMemo(() => {
    return [
      {
        id: 'main-pages',
        title: 'Core Pages & Product Catalog',
        icon: Globe,
        color: 'text-[#00D632]',
        bgColor: 'bg-[#00D632]/10',
        borderColor: 'border-[#00D632]/30',
        items: [
          {
            title: 'Homepage & Official Portal',
            url: `${SITE_ORIGIN}/`,
            path: '/',
            page: 'home' as PageView,
            changefreq: 'Daily',
            priority: '1.0',
            description: 'Main verified Cash App storefront, instant crypto checkout, and live inventory status.',
          },
          {
            title: 'All Verified Accounts Catalog',
            url: `${SITE_ORIGIN}/buy-verified-cashapp-accounts`,
            path: '/buy-verified-cashapp-accounts',
            page: 'all-accounts' as PageView,
            changefreq: 'Daily',
            priority: '0.9',
            description: 'Complete listing of all $4k–$25k limit BTC enabled and Non-BTC Cash App accounts.',
          },
          {
            title: 'BTC Enabled Cash App Accounts',
            url: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts`,
            path: '/buy-btc-enabled-cashapp-accounts',
            page: 'btc-accounts' as PageView,
            changefreq: 'Daily',
            priority: '0.9',
            description: 'Accounts with on-chain Bitcoin buy, sell, deposit, and external wallet withdrawal unlocked.',
          },
          {
            title: 'Non-BTC Cash App Accounts (USD Only)',
            url: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts`,
            path: '/buy-non-btc-cashapp-accounts',
            page: 'non-btc-accounts' as PageView,
            changefreq: 'Daily',
            priority: '0.8',
            description: 'Budget-friendly personal and business verified accounts optimized for USD transfers.',
          },
          {
            title: 'Agency Wholesale & Bulk Bundles',
            url: `${SITE_ORIGIN}/bulk-orders`,
            path: '/bulk-orders',
            page: 'bulk-orders' as PageView,
            changefreq: 'Weekly',
            priority: '0.8',
            description: 'Volume discounts (15%–30% off) for e-commerce agencies, OTC traders, and media buyers.',
          },
        ],
      },
      {
        id: 'guides-support',
        title: 'Guides, Security & Support',
        icon: BookOpen,
        color: 'text-sky-400',
        bgColor: 'bg-sky-500/10',
        borderColor: 'border-sky-500/30',
        items: [
          {
            title: '7-Day Anti-Ban Warmup Blueprint',
            url: `${SITE_ORIGIN}/safety-guide`,
            path: '/safety-guide',
            page: 'safety-guide' as PageView,
            changefreq: 'Weekly',
            priority: '0.8',
            description: 'Step-by-step residential IP proxy setup, clean device fingerprinting, and warm-up schedule.',
          },
          {
            title: 'Frequently Asked Questions & 30-Day Warranty',
            url: `${SITE_ORIGIN}/faq`,
            path: '/faq',
            page: 'faq' as PageView,
            changefreq: 'Weekly',
            priority: '0.8',
            description: 'Escrow replacement guarantee policy, crypto payment confirmation, and delivery format FAQ.',
          },
          {
            title: 'Official Blog & Educational Articles',
            url: `${SITE_ORIGIN}/blog`,
            path: '/blog',
            page: 'blog' as PageView,
            changefreq: 'Weekly',
            priority: '0.8',
            description: 'In-depth research on account limits, Bitcoin mempool fees, and account security.',
          },
          {
            title: 'Official 24/7 Agent Support Desk',
            url: `${SITE_ORIGIN}/contact`,
            path: '/contact',
            page: 'contact' as PageView,
            changefreq: 'Monthly',
            priority: '0.7',
            description: 'Live Telegram VIP concierge and WhatsApp dispatch desk for instant customer support.',
          },
        ],
      },
      {
        id: 'products',
        title: 'Verified Account Inventory Items',
        icon: ShieldCheck,
        color: 'text-amber-400',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30',
        items: ACCOUNT_PRODUCTS.map((prod) => ({
          title: `${prod.name} (${prod.limitDisplay})`,
          url: `${SITE_ORIGIN}/${prod.btcEnabled ? 'buy-btc-enabled-cashapp-accounts' : 'buy-non-btc-cashapp-accounts'}#${prod.id}`,
          path: `/${prod.btcEnabled ? 'buy-btc-enabled-cashapp-accounts' : 'buy-non-btc-cashapp-accounts'}`,
          page: (prod.btcEnabled ? 'btc-accounts' : 'non-btc-accounts') as PageView,
          changefreq: 'Daily',
          priority: '0.85',
          price: `$${prod.price}`,
          badge: prod.tag || (prod.btcEnabled ? 'BTC Unlocked' : 'USD Only'),
          description: `${prod.shortDesc} Specs: ${prod.specs.weeklyLimit} weekly limit, ${prod.specs.btcWithdrawal}.`,
          productObj: prod,
        })),
      },
      {
        id: 'blog-posts',
        title: 'Blog Articles & Research Guides',
        icon: FileText,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/30',
        items: BLOG_POSTS.map((post) => ({
          title: post.title,
          url: `${SITE_ORIGIN}/blog#${post.slug}`,
          path: '/blog',
          page: 'blog' as PageView,
          changefreq: 'Monthly',
          priority: '0.7',
          badge: post.category,
          description: `${post.excerpt} (${post.readTime}, published ${post.publishDate}).`,
        })),
      },
      {
        id: 'interactive-tools',
        title: 'Interactive Tools & Utilities',
        icon: Calculator,
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/30',
        items: [
          {
            title: 'Account Volume & Cost Calculator',
            url: `${SITE_ORIGIN}/#calculator`,
            path: '/#calculator',
            page: 'home' as PageView,
            changefreq: 'Weekly',
            priority: '0.7',
            description: 'Estimate required accounts and limits based on monthly volume and Bitcoin withdrawal targets.',
          },
          {
            title: 'Virtual Cash Card & Routing Previewer',
            url: `${SITE_ORIGIN}/#virtual-preview`,
            path: '/#virtual-preview',
            page: 'home' as PageView,
            changefreq: 'Weekly',
            priority: '0.7',
            description: 'Live interactive demonstration of the delivered credential package, PIN, routing, and card info.',
          },
          {
            title: 'Multi-Tier Account Limit Comparison Matrix',
            url: `${SITE_ORIGIN}/#comparison`,
            path: '/#comparison',
            page: 'home' as PageView,
            changefreq: 'Weekly',
            priority: '0.7',
            description: 'Side-by-side feature comparison between $4k, $10k, and $25k limit accounts.',
          },
          {
            title: 'Live Crypto Currency Rate Calculator',
            url: `${SITE_ORIGIN}/#rates`,
            path: '/#rates',
            page: 'home' as PageView,
            changefreq: 'Daily',
            priority: '0.7',
            description: 'Real-time crypto rates for BTC, LTC, USDT-TRC20, and SOL payments with zero slippage.',
          },
          {
            title: 'Real-Time Order Lookup & Key Verification',
            url: `${SITE_ORIGIN}/#order-lookup`,
            path: '/#order-lookup',
            page: 'home' as PageView,
            action: 'order-lookup',
            changefreq: 'Daily',
            priority: '0.7',
            description: 'Instant credential lookup using your Order ID and Bitcoin transaction hash.',
          },
        ],
      },
      {
        id: 'machine-feeds',
        title: 'Search Engine Feeds & Machine Indexes',
        icon: Database,
        color: 'text-slate-300',
        bgColor: 'bg-slate-800/60',
        borderColor: 'border-slate-700',
        items: [
          {
            title: 'XML Sitemap Feed (sitemap.xml)',
            url: `${SITE_ORIGIN}/sitemap.xml`,
            path: '/sitemap.xml',
            isExternalFile: true,
            changefreq: 'Daily',
            priority: '1.0',
            description: 'Standard sitemap protocol XML format for Google Search Console, Bing Webmaster, and Yandex.',
          },
          {
            title: 'Robots Crawling Policy (robots.txt)',
            url: `${SITE_ORIGIN}/robots.txt`,
            path: '/robots.txt',
            isExternalFile: true,
            changefreq: 'Monthly',
            priority: '0.5',
            description: 'Crawl directives and index permissions for search engine bots and AI indexers.',
          },
        ],
      },
    ];
  }, []);

  // Filter items by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase();

    return sections
      .map((sec) => ({
        ...sec,
        items: sec.items.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.url.toLowerCase().includes(q)
        ),
      }))
      .filter((sec) => sec.items.length > 0);
  }, [sections, searchQuery]);

  const totalLinks = useMemo(() => {
    return sections.reduce((acc, sec) => acc + sec.items.length, 0);
  }, [sections]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12 animate-in fade-in duration-300">
      {/* Top Breadcrumb Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#00D632] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-white">Sitemap</span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-[#00D632]/50 text-slate-300 hover:text-[#00D632] transition-all font-mono"
          >
            <FileCode2 className="w-3.5 h-3.5 text-[#00D632]" />
            <span>Raw sitemap.xml</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
          <a
            href="/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-sky-500/50 text-slate-300 hover:text-sky-400 transition-all font-mono"
          >
            <span>robots.txt</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>

      {/* Hero Intro Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0a1410] via-[#0b1016] to-[#080d11] border border-emerald-500/20 p-8 sm:p-12 shadow-2xl space-y-6">
        <div className="absolute -top-24 right-0 w-96 h-96 bg-[#00D632]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-[#00D632]/30 text-xs font-bold text-[#00D632] uppercase tracking-wider shadow-inner">
          <Compass className="w-4 h-4 text-[#00D632]" />
          <span>Site Directory &amp; Navigation Index</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            CashappAgent Sitemap
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Welcome to the complete structural index of <strong className="text-white">CashappAgent</strong> (cashappagent.com). Explore verified Cash App account listings, Bitcoin withdrawal limits, anti-ban security blueprints, wholesale packages, and official documentation.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center sm:text-left">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">Indexed Endpoints</span>
            <span className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5 block">{totalLinks} Pages</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center sm:text-left">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">Domain Authority</span>
            <span className="text-xl sm:text-2xl font-black text-[#00D632] font-mono mt-0.5 block">100% Canonical</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center sm:text-left">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">Delivery SLA</span>
            <span className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5 block">5–15 Mins</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center sm:text-left">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">Warranty Status</span>
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-0.5 block">30-Day Escrow</span>
          </div>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="pt-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="sitemap-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sitemap links, categories, keywords, or limits..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D632] focus:ring-1 focus:ring-[#00D632] transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categorized Sections */}
      <div className="space-y-12">
        {filteredSections.map((sec) => {
          const Icon = sec.icon;
          return (
            <div key={sec.id} className="space-y-5">
              {/* Section Header */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className={`p-2 rounded-xl ${sec.bgColor} border ${sec.borderColor}`}>
                  <Icon className={`w-5 h-5 ${sec.color}`} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-white font-['Outfit',sans-serif]">
                    {sec.title}
                  </h2>
                  <span className="text-xs text-slate-400">
                    {sec.items.length} {sec.items.length === 1 ? 'entry' : 'entries'} indexed
                  </span>
                </div>
              </div>

              {/* Grid of Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sec.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-200 group flex flex-col justify-between space-y-4 shadow-sm hover:shadow-emerald-950/40"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bold text-white group-hover:text-[#00D632] transition-colors text-sm sm:text-base leading-snug">
                          {item.title}
                        </h3>
                        {item.badge && (
                          <span className="shrink-0 bg-slate-800 text-[#00D632] border border-[#00D632]/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                            {item.badge}
                          </span>
                        )}
                        {item.price && (
                          <span className="shrink-0 bg-[#00D632]/10 text-[#00D632] border border-[#00D632]/30 text-xs font-mono font-bold px-2 py-0.5 rounded-lg">
                            {item.price}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Metadata & Direct Link Action */}
                    <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
                        <span title="Crawl Frequency">Freq: {item.changefreq}</span>
                        <span>&bull;</span>
                        <span title="Sitemap Priority">Priority: {item.priority}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(item.url)}
                          title="Copy direct canonical URL"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedUrl === item.url ? (
                            <Check className="w-3.5 h-3.5 text-[#00D632]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {item.isExternalFile ? (
                          <a
                            href={item.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-[#00D632] text-slate-300 hover:text-black font-semibold text-xs transition-all"
                          >
                            <span>Open Raw</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        ) : item.action === 'order-lookup' ? (
                          <button
                            onClick={onOpenOrderLookup}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-[#00D632] text-emerald-300 hover:text-black border border-emerald-500/30 font-semibold text-xs transition-all cursor-pointer"
                          >
                            <span>Launch Lookup</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <a
                            href={item.path}
                            data-full-url={item.url}
                            onClick={(e) => {
                              e.preventDefault();
                              if (item.productObj && onSelectProduct) {
                                onSelectProduct(item.productObj);
                              } else if (item.page) {
                                onNavigate(item.page);
                              }
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 group-hover:bg-[#00D632] text-slate-300 group-hover:text-black font-bold text-xs transition-all cursor-pointer"
                          >
                            <span>Navigate</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredSections.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
            <Search className="w-10 h-10 text-slate-600 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">No sitemap entries found</h3>
              <p className="text-xs text-slate-400">
                No indexed URLs matched &quot;{searchQuery}&quot;. Try another search term or clear the filter.
              </p>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 text-xs font-semibold"
            >
              Clear Search Query
            </button>
          </div>
        )}
      </div>

      {/* SEO & Webmaster Information Footer Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Sparkles className="w-4 h-4 text-[#00D632]" />
          <span>Webmaster &amp; Search Engine Indexing Information</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          This sitemap conforms to the official <strong className="text-slate-300">Sitemaps.org protocol 0.9</strong> standard and is generated to facilitate indexation by Google, Bing, DuckDuckGo, and other search engines. For automated crawlers, please refer to our machine-readable <a href="/sitemap.xml" className="text-[#00D632] hover:underline font-mono">/sitemap.xml</a> and <a href="/robots.txt" className="text-[#00D632] hover:underline font-mono">/robots.txt</a> files.
        </p>
        <div className="pt-2 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80">
          <span>Canonical Domain: <code className="text-slate-400">https://cashappagent.com</code></span>
          <span>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
};
