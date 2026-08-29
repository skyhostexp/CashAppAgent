import React, { useState } from 'react';
import { 
  FileCode2, 
  ExternalLink, 
  Layers, 
  ShoppingBag, 
  FileText, 
  ArrowLeft, 
  CheckCircle2, 
  Copy,
  Zap,
  Globe,
  Search,
  Sparkles,
  ShieldCheck,
  Check,
  PlusCircle,
  HelpCircle,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { PageView } from '../../types';

interface SitemapViewerPageProps {
  onNavigate: (page: PageView) => void;
}

interface SubSitemap {
  id: string;
  name: string;
  url: string;
  lastmod: string;
  itemsCount: number;
  description: string;
}

const SUB_SITEMAPS: SubSitemap[] = [
  {
    id: 'product',
    name: 'product-sitemap.xml',
    url: 'https://cashappagent.com/product-sitemap.xml',
    lastmod: '2026-08-28T12:00:00+00:00',
    itemsCount: 6,
    description: 'All 6 BTC & Non-BTC verified Cash App account tiers with image tags & pricing'
  },
  {
    id: 'page',
    name: 'page-sitemap.xml',
    url: 'https://cashappagent.com/page-sitemap.xml',
    lastmod: '2026-08-28T12:00:00+00:00',
    itemsCount: 8,
    description: 'Core landing pages, catalog, safety blueprint, FAQ, bulk orders & contact desk'
  },
  {
    id: 'post',
    name: 'post-sitemap.xml',
    url: 'https://cashappagent.com/post-sitemap.xml',
    lastmod: '2026-08-28T12:00:00+00:00',
    itemsCount: 5,
    description: 'Guides on safe login, crypto checkout, limit warm-up & account longevity'
  }
];

interface SitemapUrlEntry {
  url: string;
  title: string;
  category: 'product' | 'page' | 'post';
  images: number;
  changefreq: string;
  priority: string;
  lastmod: string;
}

const ALL_URLS: SitemapUrlEntry[] = [
  // Products
  {
    url: 'https://cashappagent.com/buy-btc-enabled-cashapp-accounts#btc-4k',
    title: 'BTC Enable 4k Cash App Account ($249)',
    category: 'product',
    images: 1,
    changefreq: 'daily',
    priority: '0.9',
    lastmod: '2026-08-28T12:00:00+00:00'
  },
  {
    url: 'https://cashappagent.com/buy-btc-enabled-cashapp-accounts#btc-10k',
    title: 'BTC Enable 10k Cash App Account ($349)',
    category: 'product',
    images: 1,
    changefreq: 'daily',
    priority: '0.9',
    lastmod: '2026-08-28T12:00:00+00:00'
  },
  {
    url: 'https://cashappagent.com/buy-btc-enabled-cashapp-accounts#btc-25k',
    title: 'BTC Enable 25k Cash App Account ($499)',
    category: 'product',
    images: 1,
    changefreq: 'daily',
    priority: '0.9',
    lastmod: '2026-08-28T12:00:00+00:00'
  },
  {
    url: 'https://cashappagent.com/buy-non-btc-cashapp-accounts#non-btc-4k',
    title: 'Non BTC Enable 4k Cash App Account ($189)',
    category: 'product',
    images: 1,
    changefreq: 'daily',
    priority: '0.9',
    lastmod: '2026-08-28T12:00:00+00:00'
  },
  {
    url: 'https://cashappagent.com/buy-non-btc-cashapp-accounts#non-btc-10k',
    title: 'Non BTC Enable 10k Cash App Account ($229)',
    category: 'product',
    images: 1,
    changefreq: 'daily',
    priority: '0.9',
    lastmod: '2026-08-28T12:00:00+00:00'
  },
  {
    url: 'https://cashappagent.com/buy-non-btc-cashapp-accounts#non-btc-15k',
    title: 'Non BTC Enable 15k Cash App Account ($259)',
    category: 'product',
    images: 1,
    changefreq: 'daily',
    priority: '0.9',
    lastmod: '2026-08-28T12:00:00+00:00'
  },

  // Pages
  {
    url: 'https://cashappagent.com/',
    title: 'CashappAgent Homepage - Buy 100% Verified Cash App Accounts',
    category: 'page',
    images: 1,
    changefreq: 'daily',
    priority: '1.0',
    lastmod: '2026-08-28T12:00:00+00:00'
  },
  {
    url: 'https://cashappagent.com/buy-verified-cashapp-accounts',
    title: 'Buy Verified Cash App Accounts - Full Catalog',
    category: 'page',
    images: 1,
    changefreq: 'daily',
    priority: '0.9',
    lastmod: '2026-08-28T12:00:00+00:00'
  },
  {
    url: 'https://cashappagent.com/buy-btc-enabled-cashapp-accounts',
    title: 'Buy BTC Enabled Cash App Accounts with On-Chain Withdrawal',
    category: 'page',
    images: 1,
    changefreq: 'daily',
    priority: '0.9',
    lastmod: '2026-08-28T12:00:00+00:00'
  },
  {
    url: 'https://cashappagent.com/buy-non-btc-cashapp-accounts',
    title: 'Buy Non-BTC Cash App Accounts - High Limit USD Transfers',
    category: 'page',
    images: 1,
    changefreq: 'daily',
    priority: '0.9',
    lastmod: '2026-08-28T12:00:00+00:00'
  },
  {
    url: 'https://cashappagent.com/bulk-orders',
    title: 'Bulk & Wholesale Verified Cash App Accounts',
    category: 'page',
    images: 0,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: '2026-08-28T12:00:00+00:00'
  },
  {
    url: 'https://cashappagent.com/safety-guide',
    title: 'Cash App Account Safety & Long-Term Longevity Guide',
    category: 'page',
    images: 0,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: '2026-08-28T12:00:00+00:00'
  },
  {
    url: 'https://cashappagent.com/faq',
    title: 'Frequently Asked Questions & Support Rules',
    category: 'page',
    images: 0,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: '2026-08-28T12:00:00+00:00'
  },
  {
    url: 'https://cashappagent.com/contact',
    title: 'Official 24/7 Telegram & WhatsApp Support Desk',
    category: 'page',
    images: 0,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: '2026-08-28T12:00:00+00:00'
  },

  // Posts
  {
    url: 'https://cashappagent.com/blog',
    title: 'CashappAgent Official Insights & Knowledge Base',
    category: 'post',
    images: 1,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: '2026-08-28T12:00:00+00:00'
  },
  {
    url: 'https://cashappagent.com/blog#guide-safe-buying',
    title: 'How to Buy Verified Cash App Accounts Safely in 2026',
    category: 'post',
    images: 1,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: '2026-08-28T12:00:00+00:00'
  },
  {
    url: 'https://cashappagent.com/blog#guide-btc-vs-non-btc',
    title: 'BTC Enabled vs Non-BTC Cash App Accounts Comparison',
    category: 'post',
    images: 1,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: '2026-08-28T12:00:00+00:00'
  },
  {
    url: 'https://cashappagent.com/blog#guide-avoid-closing',
    title: 'How to Avoid Cash App Account Closings & Flagging',
    category: 'post',
    images: 1,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: '2026-08-28T12:00:00+00:00'
  },
  {
    url: 'https://cashappagent.com/blog#guide-crypto-checkout',
    title: 'Crypto Payment Checkout Guide for Instant Account Delivery',
    category: 'post',
    images: 1,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: '2026-08-28T12:00:00+00:00'
  }
];

export const SitemapViewerPage: React.FC<SitemapViewerPageProps> = ({ onNavigate }) => {
  const [selectedView, setSelectedView] = useState<'index' | 'products' | 'pages' | 'posts' | 'all'>('index');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [pinged, setPinged] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handlePingGoogle = () => {
    const pingUrl = 'https://www.google.com/ping?sitemap=https://cashappagent.com/sitemap_index.xml';
    window.open(pingUrl, '_blank', 'noopener,noreferrer');
    setPinged(true);
    setTimeout(() => setPinged(false), 5000);
  };

  const getFilteredUrls = () => {
    if (selectedView === 'products') return ALL_URLS.filter(u => u.category === 'product');
    if (selectedView === 'pages') return ALL_URLS.filter(u => u.category === 'page');
    if (selectedView === 'posts') return ALL_URLS.filter(u => u.category === 'post');
    return ALL_URLS;
  };

  return (
    <div className="min-h-screen py-10 px-3 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif] bg-[#0b0f14]">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Top Breadcrumb & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3.5 py-2 rounded-xl border border-slate-700 transition-all cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-[#00D632]" />
            <span>Back to CashappAgent Catalog</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy('https://cashappagent.com/sitemap_index.xml')}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              {copiedUrl === 'https://cashappagent.com/sitemap_index.xml' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Index URL!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Sitemap URL</span>
                </>
              )}
            </button>

            <button
              onClick={handlePingGoogle}
              className="inline-flex items-center gap-1.5 text-xs font-black px-3.5 py-2 rounded-xl bg-[#00D632] hover:bg-[#00c02d] text-black transition-all cursor-pointer shadow-lg shadow-[#00D632]/20 active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-black" />
              <span>{pinged ? 'Googlebot Pinged!' : 'Ping Googlebot'}</span>
            </button>
          </div>
        </div>

        {/* EXACT RANK MATH THEME CARD CONTAINER */}
        <div className="bg-[#ffffff] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
          
          {/* Rank Math Dark Top Banner */}
          <div className="bg-[#141d2e] p-6 sm:p-8 text-white">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-2xl sm:text-3xl font-black font-['Outfit',sans-serif] tracking-tight text-white">
                XML Sitemap Index
              </h1>
              <span className="bg-[#2563eb] text-white text-[11px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider shadow-sm">
                RANK MATH SEO
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl font-normal">
              Generated by Rank Math SEO standard schema for <a href="https://cashappagent.com/" className="text-[#38bdf8] font-bold hover:underline">CashappAgent.com</a> to index all verified Cash App (BTC &amp; Non-BTC) accounts.
            </p>
          </div>

          {/* Subheader Toolbar Bar */}
          <div className="bg-[#f0f4f9] border-y border-slate-200 px-6 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="font-semibold text-slate-600">
              Sitemaps in this index: <strong className="text-slate-900 font-bold">{SUB_SITEMAPS.length}</strong>
            </div>

            {/* Quick Links Menu */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold text-[#2563eb]">
              <button
                onClick={() => setSelectedView('index')}
                className={`hover:underline cursor-pointer ${selectedView === 'index' ? 'text-slate-900 font-black' : ''}`}
              >
                Index XML
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => setSelectedView('products')}
                className={`hover:underline cursor-pointer ${selectedView === 'products' ? 'text-slate-900 font-black' : ''}`}
              >
                Products XML
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => setSelectedView('pages')}
                className={`hover:underline cursor-pointer ${selectedView === 'pages' ? 'text-slate-900 font-black' : ''}`}
              >
                Pages XML
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => setSelectedView('posts')}
                className={`hover:underline cursor-pointer ${selectedView === 'posts' ? 'text-slate-900 font-black' : ''}`}
              >
                Posts XML
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => setSelectedView('all')}
                className={`hover:underline cursor-pointer ${selectedView === 'all' ? 'text-slate-900 font-black' : ''}`}
              >
                HTML Sitemap
              </button>
            </div>
          </div>

          {/* Table Content Area */}
          <div className="p-4 sm:p-8">
            
            {/* VIEW 1: Master Index Table */}
            {selectedView === 'index' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200 text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4 w-12 text-slate-400">#</th>
                      <th className="py-3 px-4">SITEMAP</th>
                      <th className="py-3 px-4 text-right sm:text-left">LAST MODIFIED</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {SUB_SITEMAPS.map((sitemap, idx) => (
                      <tr 
                        key={sitemap.id} 
                        className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                        onClick={() => {
                          if (sitemap.id === 'product') setSelectedView('products');
                          else if (sitemap.id === 'page') setSelectedView('pages');
                          else setSelectedView('posts');
                        }}
                      >
                        <td className="py-3.5 px-4 text-slate-400 font-semibold">{idx + 1}</td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                            <span className="font-bold text-slate-900 group-hover:text-[#2563eb] transition-colors">
                              {sitemap.url}
                            </span>
                            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100 w-fit">
                              {sitemap.itemsCount} URLs
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {sitemap.description}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs text-slate-500 whitespace-nowrap">
                          {sitemap.lastmod}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* VIEW 2: Sub-Sitemap Detailed URL List */}
            {selectedView !== 'index' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Showing <strong className="text-slate-900">{getFilteredUrls().length} URLs</strong> in this sitemap view
                  </div>
                  <button
                    onClick={() => setSelectedView('index')}
                    className="text-xs font-bold text-[#2563eb] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    &larr; Return to Sitemaps Index
                  </button>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        <th className="py-3 px-4">URL</th>
                        <th className="py-3 px-3">Type</th>
                        <th className="py-3 px-2 text-center">Images</th>
                        <th className="py-3 px-3">Changefreq</th>
                        <th className="py-3 px-3">Priority</th>
                        <th className="py-3 px-4">Last Modified</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {getFilteredUrls().map((entry, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 max-w-xs sm:max-w-md">
                            <div className="font-bold text-slate-900 truncate">
                              {entry.title}
                            </div>
                            <div className="text-[11px] text-blue-600 font-mono truncate hover:underline">
                              <a href={entry.url} target="_blank" rel="noopener noreferrer">
                                {entry.url}
                              </a>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              entry.category === 'product' ? 'bg-amber-100 text-amber-800' :
                              entry.category === 'page' ? 'bg-emerald-100 text-emerald-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {entry.category}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-center font-mono text-slate-600 font-bold">
                            {entry.images}
                          </td>
                          <td className="py-3 px-3 font-mono text-slate-500">
                            {entry.changefreq}
                          </td>
                          <td className="py-3 px-3 font-mono text-slate-900 font-bold">
                            {entry.priority}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                            {entry.lastmod}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Card Footer */}
          <div className="bg-[#f8fafc] border-t border-slate-200 px-6 py-4 text-center text-xs text-slate-500">
            CashappAgent.com &bull; 100% Verified Cash App Accounts (BTC &amp; Non-BTC) &bull; Sitemaps.org Protocol 0.9 Compliant
          </div>

        </div>

        {/* STEP-BY-STEP GOOGLE SEARCH CONSOLE SETUP & VERIFICATION ASSISTANT */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#111822] border border-blue-900/40 text-slate-300 space-y-6 shadow-2xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <Search className="w-5 h-5" />
                </span>
                <h2 className="text-xl font-bold text-white font-['Outfit',sans-serif]">
                  Google Search Console Setup &amp; Indexation Guide
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                Follow these 3 simple steps to add <strong className="text-white">CashappAgent.com</strong> to Google Search Console and start ranking on Google.
              </p>
            </div>

            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black shadow-lg shadow-blue-500/20 transition-all cursor-pointer self-start sm:self-auto shrink-0"
            >
              <span>Open Google Search Console</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* 3 Step Interactive Walkthrough */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Step 1
                </span>
                <span className="text-xs text-slate-500 font-bold">Add Property</span>
              </div>
              <h3 className="text-sm font-bold text-white">Add Website Property</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                In Google Search Console, select <strong>URL prefix</strong> and enter your full website address:
              </p>
              <div className="p-2.5 rounded-xl bg-black/60 border border-slate-700/60 flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-emerald-400 truncate">https://cashappagent.com</span>
                <button
                  onClick={() => handleCopy('https://cashappagent.com')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy URL"
                >
                  {copiedUrl === 'https://cashappagent.com' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Step 2
                </span>
                <span className="text-xs text-slate-500 font-bold">Verify</span>
              </div>
              <h3 className="text-sm font-bold text-white">Verify Ownership</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose <strong>HTML Tag</strong> verification method. The meta tag is pre-embedded in the website header:
              </p>
              <div className="p-2.5 rounded-xl bg-black/60 border border-slate-700/60 flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-blue-400 truncate">&lt;meta name="google-site-verification"...&gt;</span>
                <button
                  onClick={() => handleCopy('<meta name="google-site-verification" content="google-site-verification-cashappagent-2026" />')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy Meta Tag"
                >
                  {copiedUrl === '<meta name="google-site-verification" content="google-site-verification-cashappagent-2026" />' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Step 3
                </span>
                <span className="text-xs text-slate-500 font-bold">Submit Sitemap</span>
              </div>
              <h3 className="text-sm font-bold text-white">Submit XML Sitemaps</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Click <strong>Sitemaps</strong> in the left sidebar of Google Search Console and enter:
              </p>
              <div className="p-2.5 rounded-xl bg-black/60 border border-slate-700/60 flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-[#00D632] truncate">sitemap_index.xml</span>
                <button
                  onClick={() => handleCopy('sitemap_index.xml')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy Sitemap Filename"
                >
                  {copiedUrl === 'sitemap_index.xml' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Direct Actions & Quick Links */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All 19 product, post &amp; page URLs are ready for Googlebot indexing.</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://www.bing.com/webmasters"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
              >
                <span>Bing Webmaster Tools</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={handlePingGoogle}
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-500/30 transition-colors cursor-pointer font-bold"
              >
                <Zap className="w-3 h-3" />
                <span>Instant Googlebot Ping</span>
              </button>
            </div>
          </div>

        </div>

        {/* GOOGLE #1 RANK & SEARCH ENGINE INDEXATION SUITE */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-emerald-900/40 text-slate-300 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#00D632]/10 border border-[#00D632]/30">
              <Globe className="w-5 h-5 text-[#00D632]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                Googlebot Fast-Indexation &amp; Top SERP Ranking Protocol
              </h2>
              <p className="text-xs text-slate-400">
                Automated protocols embedded into CashappAgent to ensure top #1 rankings for key search terms.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Rank Math Schema.org Graph</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full JSON-LD structured data with 6 verified product schemas, AggregateRatings (4.9/5.0), ItemList, and FAQPage rich snippets.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>XML Sitemaps Protocol 0.9</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated index with product-sitemap, page-sitemap, and post-sitemap with Google Image tags and priority weighting up to 1.0.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Robots.txt &amp; Meta Robots</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full crawl allowance with zero crawl-delay for Googlebot, Bingbot, Yandex, and Applebot with max-snippet &amp; max-image-preview.
              </p>
            </div>
          </div>

          {/* Targeted High-Intent SERP Keywords */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Targeted Top-Ranking Google Keywords:
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'Buy Verified Cash App Accounts',
                'Buy BTC Enabled Cash App Accounts',
                'Verified Cash App Accounts for Sale',
                'Cash App 4k limit account',
                'Cash App 10k limit account',
                'Cash App 25k limit account',
                'Non-BTC Cash App Accounts',
                'Buy Aged Cash App Accounts',
                'Instant Bitcoin Withdrawal Cash App',
                'CashappAgent.com'
              ].map((kw, i) => (
                <span 
                  key={i} 
                  className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-medium text-[11px]"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
