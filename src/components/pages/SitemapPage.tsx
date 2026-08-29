import React, { useState, useMemo } from 'react';
import { PageView, AccountProduct } from '../../types';
import { PAGE_ROUTES, SITE_ORIGIN } from '../../utils/navigation';
import { ACCOUNT_PRODUCTS } from '../../data/products';
import { BLOG_POSTS } from '../../data/blogPosts';
import {
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
  FileText,
  Copy,
  Check,
  Globe,
  Database,
  ArrowUpRight,
  Code2,
  Share2,
  Cpu
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
  imagesCount?: number;
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
  const [activeTab, setActiveTab] = useState<'visual' | 'rankmath-xml'>('visual');
  const [selectedXmlFeed, setSelectedXmlFeed] = useState<'index' | 'products' | 'pages' | 'posts' | 'categories'>('index');

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const xmlFeeds = [
    {
      id: 'index' as const,
      name: 'sitemap_index.xml',
      title: 'Rank Math Primary Sitemap Index',
      url: `${SITE_ORIGIN}/sitemap_index.xml`,
      path: '/sitemap_index.xml',
      count: '4 sub-sitemaps',
      type: 'Index File',
      desc: 'Master Rank Math XML sitemap tree linking to all sub-sitemaps for Google Search Console & Bing.',
      priority: '1.0',
    },
    {
      id: 'products' as const,
      name: 'product-sitemap.xml',
      title: 'All Products & Accounts XML Sitemap',
      url: `${SITE_ORIGIN}/product-sitemap.xml`,
      path: '/product-sitemap.xml',
      count: `${ACCOUNT_PRODUCTS.length + 3} items`,
      type: 'Product URLs + Images',
      desc: 'Complete index of all $4k–$25k BTC enabled, Non-BTC, and wholesale accounts with Google Merchant image schemas.',
      priority: '0.95',
    },
    {
      id: 'pages' as const,
      name: 'page-sitemap.xml',
      title: 'Pages & Hubs XML Sitemap',
      url: `${SITE_ORIGIN}/page-sitemap.xml`,
      path: '/page-sitemap.xml',
      count: '10 pages',
      type: 'Core Landing URLs',
      desc: 'Canonical landing hubs, safety blueprints, warranty policies, and 24/7 support desks.',
      priority: '0.90',
    },
    {
      id: 'posts' as const,
      name: 'post-sitemap.xml',
      title: 'Blog Posts & Research XML Sitemap',
      url: `${SITE_ORIGIN}/post-sitemap.xml`,
      path: '/post-sitemap.xml',
      count: `${BLOG_POSTS.length} articles`,
      type: 'Editorial Articles',
      desc: 'Technical tutorials on account warm-up, Bitcoin withdrawal limits, and Sutton Bank ACH routing.',
      priority: '0.75',
    },
    {
      id: 'categories' as const,
      name: 'category-sitemap.xml',
      title: 'Categories & Taxonomy XML Sitemap',
      url: `${SITE_ORIGIN}/category-sitemap.xml`,
      path: '/category-sitemap.xml',
      count: '3 categories',
      type: 'Category Taxonomy',
      desc: 'Category archives for BTC Enabled, Non-BTC USD, and Wholesale Agency packages.',
      priority: '0.85',
    },
  ];

  const sections: SitemapSection[] = useMemo(() => {
    return [
      {
        id: 'products-catalog',
        title: 'All Products & Account Inventory (Indexed)',
        icon: ShieldCheck,
        color: 'text-amber-400',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30',
        items: [
          ...ACCOUNT_PRODUCTS.map((prod) => ({
            title: `${prod.name} (${prod.limitDisplay})`,
            url: `${SITE_ORIGIN}/${prod.btcEnabled ? 'buy-btc-enabled-cashapp-accounts' : 'buy-non-btc-cashapp-accounts'}#${prod.id}`,
            path: `/${prod.btcEnabled ? 'buy-btc-enabled-cashapp-accounts' : 'buy-non-btc-cashapp-accounts'}`,
            page: (prod.btcEnabled ? 'btc-accounts' : 'non-btc-accounts') as PageView,
            changefreq: 'Daily',
            priority: '0.95',
            price: `$${prod.price}`,
            badge: prod.tag || (prod.btcEnabled ? 'BTC Enabled' : 'USD Only'),
            description: `${prod.shortDesc} Specs: ${prod.specs.weeklyLimit} weekly limit, ${prod.specs.btcWithdrawal}, ${prod.specs.directDeposit}.`,
            productObj: prod,
            imagesCount: 1,
          })),
          {
            title: 'Agency Wholesale Starter Pack (3-5 Accounts)',
            url: `${SITE_ORIGIN}/bulk-orders#tier-starter`,
            path: '/bulk-orders',
            page: 'bulk-orders' as PageView,
            changefreq: 'Weekly',
            priority: '0.85',
            price: '15% Off',
            badge: 'Wholesale Tier 1',
            description: 'Custom batch package for small teams, starter agencies, and local cashout setups.',
            imagesCount: 1,
          },
          {
            title: 'Agency Growth & Scaling Bundle (6-10 Accounts)',
            url: `${SITE_ORIGIN}/bulk-orders#tier-scaling`,
            path: '/bulk-orders',
            page: 'bulk-orders' as PageView,
            changefreq: 'Weekly',
            priority: '0.85',
            price: '20% Off',
            badge: 'Wholesale Tier 2',
            description: 'Medium volume agency package with dedicated batch delivery and proxy safety guidelines.',
            imagesCount: 1,
          },
          {
            title: 'VIP Enterprise & Liquidity Provider Desk (11+ Accounts)',
            url: `${SITE_ORIGIN}/bulk-orders#tier-enterprise`,
            path: '/bulk-orders',
            page: 'bulk-orders' as PageView,
            changefreq: 'Weekly',
            priority: '0.85',
            price: '30% Off',
            badge: 'Enterprise VIP',
            description: 'Maximum discount tier for OTC desks and volume traders with 1-on-1 VIP concierge dispatch.',
            imagesCount: 1,
          },
        ],
      },
      {
        id: 'main-pages',
        title: 'Core Category Hubs & Landing Pages',
        icon: Globe,
        color: 'text-[#00D632]',
        bgColor: 'bg-[#00D632]/10',
        borderColor: 'border-[#00D632]/30',
        items: [
          {
            title: 'Homepage & Official Storefront Portal',
            url: `${SITE_ORIGIN}/`,
            path: '/',
            page: 'home' as PageView,
            changefreq: 'Daily',
            priority: '1.0',
            description: 'Main verified Cash App storefront, instant crypto checkout, and live inventory status.',
            imagesCount: 1,
          },
          {
            title: 'All Verified Accounts Catalog Hub',
            url: `${SITE_ORIGIN}/buy-verified-cashapp-accounts`,
            path: '/buy-verified-cashapp-accounts',
            page: 'all-accounts' as PageView,
            changefreq: 'Daily',
            priority: '0.95',
            description: 'Complete listing of all $4k–$25k limit BTC enabled and Non-BTC Cash App accounts.',
            imagesCount: 1,
          },
          {
            title: 'BTC Enabled Cash App Accounts Hub',
            url: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts`,
            path: '/buy-btc-enabled-cashapp-accounts',
            page: 'btc-accounts' as PageView,
            changefreq: 'Daily',
            priority: '0.90',
            description: 'Accounts with on-chain Bitcoin buy, sell, deposit, and external wallet withdrawal unlocked.',
            imagesCount: 1,
          },
          {
            title: 'Non-BTC Cash App Accounts (USD Only) Hub',
            url: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts`,
            path: '/buy-non-btc-cashapp-accounts',
            page: 'non-btc-accounts' as PageView,
            changefreq: 'Daily',
            priority: '0.85',
            description: 'Budget-friendly personal and business verified accounts optimized for USD transfers.',
            imagesCount: 1,
          },
          {
            title: 'Agency Wholesale & Bulk Orders Hub',
            url: `${SITE_ORIGIN}/bulk-orders`,
            path: '/bulk-orders',
            page: 'bulk-orders' as PageView,
            changefreq: 'Weekly',
            priority: '0.85',
            description: 'Volume discounts (15%–30% off) for e-commerce agencies, OTC traders, and media buyers.',
            imagesCount: 1,
          },
        ],
      },
      {
        id: 'guides-support',
        title: 'Guides, Security Blueprints & Support Desk',
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
            priority: '0.85',
            description: 'Step-by-step residential IP proxy setup, clean device fingerprinting, and warm-up schedule.',
            imagesCount: 1,
          },
          {
            title: 'Frequently Asked Questions & 30-Day Warranty',
            url: `${SITE_ORIGIN}/faq`,
            path: '/faq',
            page: 'faq' as PageView,
            changefreq: 'Weekly',
            priority: '0.80',
            description: 'Escrow replacement guarantee policy, crypto payment confirmation, and delivery format FAQ.',
            imagesCount: 1,
          },
          {
            title: 'Official Blog & Educational Articles Hub',
            url: `${SITE_ORIGIN}/blog`,
            path: '/blog',
            page: 'blog' as PageView,
            changefreq: 'Weekly',
            priority: '0.80',
            description: 'In-depth research on account limits, Bitcoin mempool fees, and account security.',
            imagesCount: 1,
          },
          {
            title: 'Official 24/7 Agent Support Desk & Concierge',
            url: `${SITE_ORIGIN}/contact`,
            path: '/contact',
            page: 'contact' as PageView,
            changefreq: 'Monthly',
            priority: '0.75',
            description: 'Live Telegram VIP concierge and WhatsApp dispatch desk for instant customer support.',
            imagesCount: 1,
          },
        ],
      },
      {
        id: 'blog-posts',
        title: 'Research Blog Articles (Post Sitemap Index)',
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
          priority: '0.75',
          badge: post.category,
          description: `${post.excerpt} (${post.readTime}, published ${post.publishDate}).`,
          imagesCount: 1,
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
            priority: '0.70',
            description: 'Estimate required accounts and limits based on monthly volume and Bitcoin withdrawal targets.',
          },
          {
            title: 'Virtual Cash Card & Routing Previewer',
            url: `${SITE_ORIGIN}/#virtual-preview`,
            path: '/#virtual-preview',
            page: 'home' as PageView,
            changefreq: 'Weekly',
            priority: '0.70',
            description: 'Live interactive demonstration of the delivered credential package, PIN, routing, and card info.',
          },
          {
            title: 'Multi-Tier Account Limit Comparison Matrix',
            url: `${SITE_ORIGIN}/#comparison`,
            path: '/#comparison',
            page: 'home' as PageView,
            changefreq: 'Weekly',
            priority: '0.70',
            description: 'Side-by-side feature comparison between $4k, $10k, and $25k limit accounts.',
          },
          {
            title: 'Live Crypto Currency Rate Calculator',
            url: `${SITE_ORIGIN}/#rates`,
            path: '/#rates',
            page: 'home' as PageView,
            changefreq: 'Daily',
            priority: '0.70',
            description: 'Real-time crypto rates for BTC, LTC, USDT-TRC20, and SOL payments with zero slippage.',
          },
          {
            title: 'Real-Time Order Lookup & Key Verification',
            url: `${SITE_ORIGIN}/#order-lookup`,
            path: '/#order-lookup',
            page: 'home' as PageView,
            action: 'order-lookup',
            changefreq: 'Daily',
            priority: '0.70',
            description: 'Instant credential lookup using your Order ID and Bitcoin transaction hash.',
          },
        ],
      },
      {
        id: 'machine-feeds',
        title: 'Rank Math XML Sitemap Feeds',
        icon: Database,
        color: 'text-slate-300',
        bgColor: 'bg-slate-800/60',
        borderColor: 'border-slate-700',
        items: xmlFeeds.map((feed) => ({
          title: feed.name,
          url: feed.url,
          path: feed.path,
          isExternalFile: true,
          changefreq: 'Daily',
          priority: feed.priority,
          badge: feed.type,
          description: `${feed.title}: ${feed.desc} (${feed.count}).`,
        })),
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
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10 animate-in fade-in duration-300">
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
          <span className="text-white">Sitemap Index</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <a
            href="/sitemap_index.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-[#00D632]/40 text-[#00D632] hover:bg-[#00D632] hover:text-black transition-all font-mono font-bold"
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>sitemap_index.xml</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
          <a
            href="/product-sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400/50 text-slate-300 hover:text-amber-400 transition-all font-mono"
          >
            <span>product-sitemap.xml</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
          <a
            href="/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-sky-500/50 text-slate-300 hover:text-sky-400 transition-all font-mono"
          >
            <span>robots.txt</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>

      {/* Hero Intro Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0a1510] via-[#0d1218] to-[#090d11] border border-emerald-500/20 p-8 sm:p-12 shadow-2xl space-y-6">
        <div className="absolute -top-24 right-0 w-96 h-96 bg-[#00D632]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-[#00D632]/40 text-xs font-black text-[#00D632] uppercase tracking-wider shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#00D632]" />
            <span>Rank Math SEO XML Sitemap Engine</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs text-slate-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#00D632] animate-pulse" />
            <span>All Products Indexed</span>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            CashappAgent Sitemap &amp; Product Index
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Full XML sitemap architecture generated following the <strong className="text-white">Rank Math SEO</strong> sitemap protocol. All verified Cash App accounts, Bitcoin withdrawal limits, safety guides, and blog articles are indexed with canonical priorities, image schemas, and instant search engine crawlers compatibility.
          </p>
        </div>

        {/* Rank Math Quick Feeds Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {xmlFeeds.slice(0, 3).map((feed) => (
            <div
              key={feed.id}
              className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#00D632]">{feed.name}</span>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">{feed.count}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{feed.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{feed.desc}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <button
                  onClick={() => handleCopy(feed.url)}
                  className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedUrl === feed.url ? (
                    <Check className="w-3 h-3 text-[#00D632]" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedUrl === feed.url ? 'Copied' : 'Copy URL'}</span>
                </button>

                <a
                  href={feed.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00D632] hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <span>Open XML</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveTab('visual')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'visual'
                  ? 'bg-[#00D632] text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Visual Sitemap Directory ({totalLinks})</span>
            </button>
            <button
              onClick={() => setActiveTab('rankmath-xml')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'rankmath-xml'
                  ? 'bg-[#00D632] text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Rank Math XML Feeds Inspector</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>Protocol:</span>
            <code className="text-[#00D632] bg-black/50 px-2 py-0.5 rounded border border-emerald-900/50">
              Sitemaps.org 0.9 + Image Schema
            </code>
          </div>
        </div>

        {/* Live Search & Filter Bar (in Visual Mode) */}
        {activeTab === 'visual' && (
          <div className="pt-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="sitemap-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, Bitcoin tiers, guides, wholesale packages, or URLs..."
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
        )}
      </div>

      {/* TAB 1: Visual Categorized Directory */}
      {activeTab === 'visual' && (
        <div className="space-y-12">
          {filteredSections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div key={sec.id} className="space-y-5">
                {/* Section Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
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

                  {sec.id === 'products-catalog' && (
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-[#00D632]/30 text-[11px] font-bold text-[#00D632]">
                      <Check className="w-3.5 h-3.5" />
                      100% In Stock &bull; Instant Delivery
                    </span>
                  )}
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
                          {item.imagesCount && (
                            <>
                              <span>&bull;</span>
                              <span className="text-sky-400">{item.imagesCount} Image</span>
                            </>
                          )}
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
                              <span>Open XML</span>
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
                          ) : item.productObj ? (
                            <div className="flex items-center gap-1.5">
                              <a
                                href={item.path}
                                data-full-url={item.url}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (item.page) onNavigate(item.page);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition-all cursor-pointer"
                              >
                                <span>Details</span>
                              </a>
                              <button
                                onClick={() => {
                                  if (onSelectProduct && item.productObj) {
                                    onSelectProduct(item.productObj);
                                  }
                                }}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00D632] hover:bg-[#00FF3D] text-black font-bold text-xs transition-all cursor-pointer shadow-sm"
                              >
                                <span>Buy Now</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <a
                              href={item.path}
                              data-full-url={item.url}
                              onClick={(e) => {
                                e.preventDefault();
                                if (item.page) onNavigate(item.page);
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
      )}

      {/* TAB 2: Rank Math XML Feeds & Architecture Inspector */}
      {activeTab === 'rankmath-xml' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Feed Selector Sidebar */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Select XML Sitemap Feed
              </h3>
              <div className="space-y-2">
                {xmlFeeds.map((feed) => (
                  <button
                    key={feed.id}
                    onClick={() => setSelectedXmlFeed(feed.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedXmlFeed === feed.id
                        ? 'bg-emerald-950/60 border-[#00D632] shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-white">{feed.name}</span>
                      <span className="text-[10px] bg-slate-800 text-[#00D632] px-2 py-0.5 rounded-full font-mono">
                        {feed.count}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{feed.title}</p>
                  </button>
                ))}
              </div>

              {/* Submission Guide Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-3 mt-6">
                <div className="flex items-center gap-2 text-xs font-bold text-white font-mono">
                  <Globe className="w-4 h-4 text-[#00D632]" />
                  <span>Google Search Console Submission</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Submit only the primary index URL below. Search engines will automatically discover all product and page sub-sitemaps:
                </p>
                <div className="p-2.5 rounded-xl bg-black/70 border border-slate-800 flex items-center justify-between gap-2">
                  <code className="text-[11px] text-[#00D632] font-mono select-all truncate">
                    https://cashappagent.com/sitemap_index.xml
                  </code>
                  <button
                    onClick={() => handleCopy('https://cashappagent.com/sitemap_index.xml')}
                    className="shrink-0 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    {copiedUrl === 'https://cashappagent.com/sitemap_index.xml' ? (
                      <Check className="w-3.5 h-3.5 text-[#00D632]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* XML Feed Details & Code Preview */}
            <div className="lg:col-span-2 space-y-5">
              {(() => {
                const currentFeed = xmlFeeds.find((f) => f.id === selectedXmlFeed)!;
                return (
                  <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#00D632] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">
                            {currentFeed.name}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {currentFeed.type}
                          </span>
                        </div>
                        <h2 className="text-xl font-black text-white mt-2 font-['Outfit',sans-serif]">
                          {currentFeed.title}
                        </h2>
                        <p className="text-xs text-slate-300 mt-1 max-w-xl">
                          {currentFeed.desc}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(currentFeed.url)}
                          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedUrl === currentFeed.url ? (
                            <Check className="w-3.5 h-3.5 text-[#00D632]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>Copy Feed URL</span>
                        </button>
                        <a
                          href={currentFeed.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-[#00D632] hover:bg-[#00FF3D] text-black font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <span>Open Live XML</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Feed Metadata Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-black/40 border border-slate-800/80 font-mono text-xs">
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Stylesheet</span>
                        <span className="text-slate-300 font-bold">main-sitemap.xsl</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Format</span>
                        <span className="text-slate-300 font-bold">XML Schema 0.9</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Image Tagging</span>
                        <span className="text-[#00D632] font-bold">Enabled</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Status</span>
                        <span className="text-emerald-400 font-bold">200 OK Live</span>
                      </div>
                    </div>

                    {/* Interactive XML Snippet Viewer */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                        <span>XML Structure Snippet:</span>
                        <span>{currentFeed.path}</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-black/80 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto max-h-80 leading-relaxed shadow-inner">
                        {selectedXmlFeed === 'index' && (
                          <pre className="text-emerald-400">
{`<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://cashappagent.com/page-sitemap.xml</loc>
    <lastmod>2026-08-29T01:40:00+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://cashappagent.com/product-sitemap.xml</loc>
    <lastmod>2026-08-29T01:40:00+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://cashappagent.com/post-sitemap.xml</loc>
    <lastmod>2026-08-29T01:40:00+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://cashappagent.com/category-sitemap.xml</loc>
    <lastmod>2026-08-29T01:40:00+00:00</lastmod>
  </sitemap>
</sitemapindex>`}
                          </pre>
                        )}
                        {selectedXmlFeed === 'products' && (
                          <pre className="text-amber-300">
{`<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- All Products Indexed with Specs & Images -->
  <url>
    <loc>https://cashappagent.com/buy-btc-enabled-cashapp-accounts#btc-4k</loc>
    <lastmod>2026-08-29T01:40:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
    <image:image>
      <image:loc>https://cashappagent.com/favicon.svg</image:loc>
      <image:title>BTC Enable 4k Cash App Account - $4,000 / Week Limit</image:title>
    </image:image>
  </url>
  <url>
    <loc>https://cashappagent.com/buy-btc-enabled-cashapp-accounts#btc-10k</loc>
    <lastmod>2026-08-29T01:40:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://cashappagent.com/buy-btc-enabled-cashapp-accounts#btc-25k</loc>
    <lastmod>2026-08-29T01:40:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://cashappagent.com/buy-non-btc-cashapp-accounts#non-btc-4k</loc>
    <lastmod>2026-08-29T01:40:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.90</priority>
  </url>
  <!-- ... Plus Non-BTC 10k, Non-BTC 15k, and Bulk Wholesale Tiers -->
</urlset>`}
                          </pre>
                        )}
                        {selectedXmlFeed === 'pages' && (
                          <pre className="text-sky-300">
{`<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://cashappagent.com/</loc>
    <lastmod>2026-08-29T01:40:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://cashappagent.com/buy-verified-cashapp-accounts</loc>
    <lastmod>2026-08-29T01:40:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://cashappagent.com/safety-guide</loc>
    <lastmod>2026-08-29T01:40:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
</urlset>`}
                          </pre>
                        )}
                        {selectedXmlFeed === 'posts' && (
                          <pre className="text-purple-300">
{`<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://cashappagent.com/blog#how-to-safely-warm-up-verified-cash-app-account</loc>
    <lastmod>2026-08-29T01:40:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  <url>
    <loc>https://cashappagent.com/blog#bitcoin-withdrawal-limits-cash-app-guide</loc>
    <lastmod>2026-08-29T01:40:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
</urlset>`}
                          </pre>
                        )}
                        {selectedXmlFeed === 'categories' && (
                          <pre className="text-emerald-300">
{`<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://cashappagent.com/buy-btc-enabled-cashapp-accounts</loc>
    <lastmod>2026-08-29T01:40:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>https://cashappagent.com/buy-non-btc-cashapp-accounts</loc>
    <lastmod>2026-08-29T01:40:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>
</urlset>`}
                          </pre>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* SEO & Webmaster Information Footer Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Sparkles className="w-4 h-4 text-[#00D632]" />
          <span>Rank Math SEO Protocol Verification &amp; Search Engine Indexing</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          This sitemap infrastructure is engineered to mirror the exact structure generated by <strong className="text-slate-200">Rank Math SEO</strong>. It supplies a structured XML index (<code className="text-slate-300 font-mono">/sitemap_index.xml</code>) pointing to distinct category sub-sitemaps for products (<code className="text-slate-300 font-mono">/product-sitemap.xml</code>), pages (<code className="text-slate-300 font-mono">/page-sitemap.xml</code>), posts (<code className="text-slate-300 font-mono">/post-sitemap.xml</code>), and taxonomy archives (<code className="text-slate-300 font-mono">/category-sitemap.xml</code>). Styled with <code className="text-slate-300 font-mono">main-sitemap.xsl</code> for browser inspection.
        </p>
        <div className="pt-2 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80">
          <span>Primary Index: <code className="text-emerald-400 font-mono">https://cashappagent.com/sitemap_index.xml</code></span>
          <span>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
};
