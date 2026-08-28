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
  Table,
  Check,
  Zap
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
}

const SUB_SITEMAPS: SubSitemap[] = [
  {
    id: 'product',
    name: 'product-sitemap.xml',
    url: 'https://cashappagent.com/product-sitemap.xml',
    lastmod: '2026-08-28T12:00:00+00:00',
    itemsCount: 6
  },
  {
    id: 'page',
    name: 'page-sitemap.xml',
    url: 'https://cashappagent.com/page-sitemap.xml',
    lastmod: '2026-08-28T12:00:00+00:00',
    itemsCount: 8
  },
  {
    id: 'post',
    name: 'post-sitemap.xml',
    url: 'https://cashappagent.com/post-sitemap.xml',
    lastmod: '2026-08-28T12:00:00+00:00',
    itemsCount: 5
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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const getFilteredUrls = () => {
    if (selectedView === 'products') return ALL_URLS.filter(u => u.category === 'product');
    if (selectedView === 'pages') return ALL_URLS.filter(u => u.category === 'page');
    if (selectedView === 'posts') return ALL_URLS.filter(u => u.category === 'post');
    return ALL_URLS;
  };

  return (
    <div className="min-h-screen py-10 px-3 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif] bg-slate-900/60">
      <div className="max-w-4xl mx-auto space-y-4">

        {/* Back Link */}
        <div className="flex items-center justify-between px-1">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#00D632]" />
            <span>Back to CashappAgent.com</span>
          </button>
          <span className="text-[11px] text-slate-500 font-mono">
            Googlebot Sitemaps Protocol 0.9
          </span>
        </div>

        {/* Exact Rank Math Theme Card Container */}
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
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal">
              Generated by Rank Math SEO standard schema for <a href="https://cashappagent.com/" className="text-[#38bdf8] font-bold hover:underline">CashappAgent.com</a> to index all verified Cash App (BTC &amp; Non-BTC) accounts.
            </p>
          </div>

          {/* Subheader Toolbar Bar */}
          <div className="bg-[#f0f4f9] border-y border-slate-200 px-6 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="font-semibold text-slate-600">
              Sitemaps in this index: <strong className="text-slate-900 font-bold">{SUB_SITEMAPS.length}</strong>
            </div>

            {/* Quick Links Menu */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs font-bold text-[#2563eb]">
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
                Products XML ({SUB_SITEMAPS[0].itemsCount})
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => setSelectedView('pages')}
                className={`hover:underline cursor-pointer ${selectedView === 'pages' ? 'text-slate-900 font-black' : ''}`}
              >
                Pages XML ({SUB_SITEMAPS[1].itemsCount})
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => setSelectedView('all')}
                className={`hover:underline cursor-pointer ${selectedView === 'all' ? 'text-slate-900 font-black' : ''}`}
              >
                All URLs ({ALL_URLS.length})
              </button>
            </div>
          </div>

          {/* Table Content Area */}
          <div className="p-4 sm:p-8">
            
            {/* VIEW 1: Master Index Table (Matches user screenshot) */}
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
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 group-hover:text-[#2563eb] transition-colors">
                              {sitemap.url}
                            </span>
                            <span className="hidden sm:inline text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                              {sitemap.itemsCount} URLs
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs text-slate-500">
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

          {/* Bottom Card Footer - Exact Match */}
          <div className="bg-[#f8fafc] border-t border-slate-200 px-6 py-4 text-center text-xs text-slate-500">
            CashappAgent.com &bull; 100% Verified Cash App Accounts (BTC &amp; Non-BTC) &bull; Sitemaps.org Protocol 0.9 Compliant
          </div>

        </div>

      </div>
    </div>
  );
};
