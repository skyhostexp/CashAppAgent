import React, { useState, useMemo } from 'react';
import { PageView, AccountProduct } from '../../types';
import { PAGE_ROUTES, SITE_ORIGIN } from '../../utils/navigation';
import { ACCOUNT_PRODUCTS } from '../../data/products';
import { BLOG_POSTS } from '../../data/blogPosts';
import { RankMathInstantIndexConsole } from '../seo/RankMathInstantIndexConsole';
import {
  ExternalLink,
  Copy,
  Check,
  Search,
  ShoppingCart,
  ArrowRight,
  Sparkles,
  FileCode2,
  Filter,
  Zap,
} from 'lucide-react';

interface SitemapPageProps {
  onNavigate: (page: PageView) => void;
  onSelectProduct?: (product: AccountProduct) => void;
  onOpenOrderLookup: () => void;
}

type TabMode = 'index' | 'products' | 'vintage' | 'pages' | 'posts' | 'html' | 'instant-index';

interface TableRowItem {
  id: string | number;
  url: string;
  displayUrl: string;
  changefreq?: string;
  priority?: string;
  lastmod: string;
  title?: string;
  badge?: string;
  price?: string;
  page?: PageView;
  productObj?: AccountProduct;
  isXmlFile?: boolean;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({
  onNavigate,
  onSelectProduct,
  onOpenOrderLookup,
}) => {
  const [activeTab, setActiveTab] = useState<TabMode>('index');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCopy = (url: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // 1. Sitemap Index Feed Data (Screenshot 1 & 2)
  const indexRows: TableRowItem[] = useMemo(() => [
    {
      id: 1,
      url: `${SITE_ORIGIN}/product-sitemap.xml`,
      displayUrl: `${SITE_ORIGIN}/product-sitemap.xml`,
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Product Sitemap - All Verified BTC & Non-BTC Accounts',
      isXmlFile: true,
    },
    {
      id: 2,
      url: `${SITE_ORIGIN}/vintage-sitemap.xml`,
      displayUrl: `${SITE_ORIGIN}/vintage-sitemap.xml`,
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Vintage & Aged Cash App Accounts Sitemap (2020-2025)',
      isXmlFile: true,
    },
    {
      id: 3,
      url: `${SITE_ORIGIN}/page-sitemap.xml`,
      displayUrl: `${SITE_ORIGIN}/page-sitemap.xml`,
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Page Sitemap - Core Landing Pages & Hubs',
      isXmlFile: true,
    },
    {
      id: 4,
      url: `${SITE_ORIGIN}/post-sitemap.xml`,
      displayUrl: `${SITE_ORIGIN}/post-sitemap.xml`,
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Post Sitemap - Blog Articles & Security Guides',
      isXmlFile: true,
    },
  ], []);

  // 2. Products Sitemap Data (Screenshot 3)
  const productRows: TableRowItem[] = useMemo(() => [
    {
      id: 1,
      url: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts#btc-4k`,
      displayUrl: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts#btc-4k`,
      changefreq: 'daily',
      priority: '1.00',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'BTC Enable 4k Cash App Account',
      badge: 'BTC Enabled',
      price: '$120',
      page: 'btc-accounts',
      productObj: ACCOUNT_PRODUCTS.find(p => p.id === 'btc-4k'),
    },
    {
      id: 2,
      url: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts#btc-10k`,
      displayUrl: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts#btc-10k`,
      changefreq: 'daily',
      priority: '0.95',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'BTC Enable 10k Cash App Account',
      badge: 'High Limit',
      price: '$210',
      page: 'btc-accounts',
      productObj: ACCOUNT_PRODUCTS.find(p => p.id === 'btc-10k'),
    },
    {
      id: 3,
      url: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts#btc-25k`,
      displayUrl: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts#btc-25k`,
      changefreq: 'daily',
      priority: '0.95',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'BTC Enable 25k Cash App Account',
      badge: 'Enterprise',
      price: '$350',
      page: 'btc-accounts',
      productObj: ACCOUNT_PRODUCTS.find(p => p.id === 'btc-25k'),
    },
    {
      id: 4,
      url: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts#non-btc-4k`,
      displayUrl: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts#non-btc-4k`,
      changefreq: 'daily',
      priority: '0.95',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Non BTC Enable 4k Cash App Account',
      badge: 'USD Only',
      price: '$75',
      page: 'non-btc-accounts',
      productObj: ACCOUNT_PRODUCTS.find(p => p.id === 'non-btc-4k'),
    },
    {
      id: 5,
      url: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts#non-btc-10k`,
      displayUrl: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts#non-btc-10k`,
      changefreq: 'daily',
      priority: '0.95',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Non BTC Enable 10k Cash App Account',
      badge: 'USD Only',
      price: '$140',
      page: 'non-btc-accounts',
      productObj: ACCOUNT_PRODUCTS.find(p => p.id === 'non-btc-10k'),
    },
    {
      id: 6,
      url: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts#non-btc-15k`,
      displayUrl: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts#non-btc-15k`,
      changefreq: 'daily',
      priority: '0.90',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Non BTC Enable 15k Cash App Account',
      badge: 'Max Limit',
      price: '$190',
      page: 'non-btc-accounts',
      productObj: ACCOUNT_PRODUCTS.find(p => p.id === 'non-btc-15k'),
    },
    {
      id: 7,
      url: `${SITE_ORIGIN}/bulk-orders#tier-starter`,
      displayUrl: `${SITE_ORIGIN}/bulk-orders#tier-starter`,
      changefreq: 'daily',
      priority: '0.95',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Agency Wholesale Starter Pack (3-5 Accounts)',
      badge: '15% Off',
      page: 'bulk-orders',
    },
    {
      id: 8,
      url: `${SITE_ORIGIN}/bulk-orders#tier-scaling`,
      displayUrl: `${SITE_ORIGIN}/bulk-orders#tier-scaling`,
      changefreq: 'daily',
      priority: '0.90',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Agency Growth & Scaling Bundle (6-10 Accounts)',
      badge: '20% Off',
      page: 'bulk-orders',
    },
  ], []);

  // 3. Vintage & Aged Sitemap Data (Screenshot 4)
  const vintageRows: TableRowItem[] = useMemo(() => [
    {
      id: 1,
      url: `${SITE_ORIGIN}/buy-verified-cashapp-accounts?vintage=2020`,
      displayUrl: `${SITE_ORIGIN}/buy-verified-cashapp-accounts?vintage=2020`,
      changefreq: 'weekly',
      priority: '0.90',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: '2020 Vintage Aged Cash App Accounts',
      page: 'all-accounts',
    },
    {
      id: 2,
      url: `${SITE_ORIGIN}/buy-verified-cashapp-accounts?vintage=2021`,
      displayUrl: `${SITE_ORIGIN}/buy-verified-cashapp-accounts?vintage=2021`,
      changefreq: 'weekly',
      priority: '0.90',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: '2021 Vintage Aged Cash App Accounts',
      page: 'all-accounts',
    },
    {
      id: 3,
      url: `${SITE_ORIGIN}/buy-verified-cashapp-accounts?vintage=2022`,
      displayUrl: `${SITE_ORIGIN}/buy-verified-cashapp-accounts?vintage=2022`,
      changefreq: 'weekly',
      priority: '0.90',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: '2022 Vintage Aged Cash App Accounts',
      page: 'all-accounts',
    },
    {
      id: 4,
      url: `${SITE_ORIGIN}/buy-verified-cashapp-accounts?vintage=2023`,
      displayUrl: `${SITE_ORIGIN}/buy-verified-cashapp-accounts?vintage=2023`,
      changefreq: 'weekly',
      priority: '0.90',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: '2023 Vintage Aged Cash App Accounts',
      page: 'all-accounts',
    },
    {
      id: 5,
      url: `${SITE_ORIGIN}/buy-verified-cashapp-accounts?vintage=2024`,
      displayUrl: `${SITE_ORIGIN}/buy-verified-cashapp-accounts?vintage=2024`,
      changefreq: 'weekly',
      priority: '0.90',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: '2024 Seasoned Cash App Accounts',
      page: 'all-accounts',
    },
    {
      id: 6,
      url: `${SITE_ORIGIN}/buy-verified-cashapp-accounts?vintage=2025`,
      displayUrl: `${SITE_ORIGIN}/buy-verified-cashapp-accounts?vintage=2025`,
      changefreq: 'weekly',
      priority: '0.88',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: '2025 Fresh Verified Cash App Accounts',
      page: 'all-accounts',
    },
    {
      id: 7,
      url: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts?vintage=aged-2022`,
      displayUrl: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts?vintage=aged-2022`,
      changefreq: 'weekly',
      priority: '0.88',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Aged BTC Enabled 2022 Cash App Accounts',
      page: 'btc-accounts',
    },
    {
      id: 8,
      url: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts?vintage=aged-2023`,
      displayUrl: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts?vintage=aged-2023`,
      changefreq: 'weekly',
      priority: '0.88',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Aged BTC Enabled 2023 Cash App Accounts',
      page: 'btc-accounts',
    },
    {
      id: 9,
      url: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts?vintage=aged-2024`,
      displayUrl: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts?vintage=aged-2024`,
      changefreq: 'weekly',
      priority: '0.88',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Aged BTC Enabled 2024 Cash App Accounts',
      page: 'btc-accounts',
    },
    {
      id: 10,
      url: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts?vintage=aged-2022`,
      displayUrl: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts?vintage=aged-2022`,
      changefreq: 'weekly',
      priority: '0.88',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Aged Non-BTC 2022 Cash App Accounts',
      page: 'non-btc-accounts',
    },
    {
      id: 11,
      url: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts?vintage=aged-2023`,
      displayUrl: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts?vintage=aged-2023`,
      changefreq: 'weekly',
      priority: '0.85',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Aged Non-BTC 2023 Cash App Accounts',
      page: 'non-btc-accounts',
    },
    {
      id: 12,
      url: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts?vintage=aged-2024`,
      displayUrl: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts?vintage=aged-2024`,
      changefreq: 'weekly',
      priority: '0.85',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Aged Non-BTC 2024 Cash App Accounts',
      page: 'non-btc-accounts',
    },
  ], []);

  // 4. Pages Sitemap Data
  const pageRows: TableRowItem[] = useMemo(() => [
    {
      id: 1,
      url: `${SITE_ORIGIN}/`,
      displayUrl: `${SITE_ORIGIN}/`,
      changefreq: 'daily',
      priority: '1.00',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Homepage - Buy Verified Cash App Accounts',
      page: 'home',
    },
    {
      id: 2,
      url: `${SITE_ORIGIN}/buy-verified-cashapp-accounts`,
      displayUrl: `${SITE_ORIGIN}/buy-verified-cashapp-accounts`,
      changefreq: 'daily',
      priority: '0.95',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'All Verified Accounts Catalog Hub',
      page: 'all-accounts',
    },
    {
      id: 3,
      url: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts`,
      displayUrl: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts`,
      changefreq: 'daily',
      priority: '0.90',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'BTC Enabled Cash App Accounts Hub',
      page: 'btc-accounts',
    },
    {
      id: 4,
      url: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts`,
      displayUrl: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts`,
      changefreq: 'daily',
      priority: '0.90',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Non-BTC Verified Cash App Accounts Hub',
      page: 'non-btc-accounts',
    },
    {
      id: 5,
      url: `${SITE_ORIGIN}/bulk-orders`,
      displayUrl: `${SITE_ORIGIN}/bulk-orders`,
      changefreq: 'daily',
      priority: '0.90',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Wholesale Bulk Orders & Agency Packages',
      page: 'bulk-orders',
    },
    {
      id: 6,
      url: `${SITE_ORIGIN}/safety-guide`,
      displayUrl: `${SITE_ORIGIN}/safety-guide`,
      changefreq: 'daily',
      priority: '0.90',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: '7-Day Anti-Ban Warmup & Safety Guide',
      page: 'safety-guide',
    },
    {
      id: 7,
      url: `${SITE_ORIGIN}/faq`,
      displayUrl: `${SITE_ORIGIN}/faq`,
      changefreq: 'weekly',
      priority: '0.85',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Frequently Asked Questions & 30-Day Guarantee',
      page: 'faq',
    },
    {
      id: 8,
      url: `${SITE_ORIGIN}/blog`,
      displayUrl: `${SITE_ORIGIN}/blog`,
      changefreq: 'weekly',
      priority: '0.85',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'Research & Security Blog Articles',
      page: 'blog',
    },
    {
      id: 9,
      url: `${SITE_ORIGIN}/contact`,
      displayUrl: `${SITE_ORIGIN}/contact`,
      changefreq: 'monthly',
      priority: '0.75',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: '24/7 Support Desk & Concierge',
      page: 'contact',
    },
    {
      id: 10,
      url: `${SITE_ORIGIN}/sitemap`,
      displayUrl: `${SITE_ORIGIN}/sitemap`,
      changefreq: 'weekly',
      priority: '0.70',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: 'HTML & XML Sitemap Index',
      page: 'sitemap',
    },
  ], []);

  // 5. Posts Sitemap Data
  const postRows: TableRowItem[] = useMemo(() => {
    return BLOG_POSTS.map((post, idx) => ({
      id: idx + 1,
      url: `${SITE_ORIGIN}/blog#${post.slug}`,
      displayUrl: `${SITE_ORIGIN}/blog#${post.slug}`,
      changefreq: 'monthly',
      priority: '0.75',
      lastmod: '2026-08-29T11:59:00+00:00',
      title: post.title,
      badge: post.category,
      page: 'blog',
    }));
  }, []);

  // 6. Complete Combined HTML Sitemap Data (Screenshot 5)
  const allHtmlRows: TableRowItem[] = useMemo(() => [
    {
      id: 1,
      url: `${SITE_ORIGIN}/`,
      displayUrl: `${SITE_ORIGIN}/`,
      changefreq: 'daily',
      priority: '1.00',
      lastmod: '2026-08-28',
      title: 'CashappAgent Official Storefront',
      page: 'home',
    },
    {
      id: 2,
      url: `${SITE_ORIGIN}/buy-verified-cashapp-accounts`,
      displayUrl: `${SITE_ORIGIN}/buy-verified-cashapp-accounts`,
      changefreq: 'daily',
      priority: '0.95',
      lastmod: '2026-08-28',
      title: 'All Verified Accounts Catalog',
      page: 'all-accounts',
    },
    {
      id: 3,
      url: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts`,
      displayUrl: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts`,
      changefreq: 'daily',
      priority: '0.90',
      lastmod: '2026-08-28',
      title: 'BTC Enabled Cash App Accounts',
      page: 'btc-accounts',
    },
    {
      id: 4,
      url: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts`,
      displayUrl: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts`,
      changefreq: 'daily',
      priority: '0.90',
      lastmod: '2026-08-28',
      title: 'Non-BTC Cash App Accounts (USD Only)',
      page: 'non-btc-accounts',
    },
    {
      id: 5,
      url: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts#btc-4k`,
      displayUrl: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts#btc-4k`,
      changefreq: 'daily',
      priority: '0.90',
      lastmod: '2026-08-28',
      title: 'BTC Enable 4k Limit Account ($120)',
      page: 'btc-accounts',
      productObj: ACCOUNT_PRODUCTS.find(p => p.id === 'btc-4k'),
    },
    {
      id: 6,
      url: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts#btc-10k`,
      displayUrl: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts#btc-10k`,
      changefreq: 'daily',
      priority: '0.90',
      lastmod: '2026-08-28',
      title: 'BTC Enable 10k Limit Account ($210)',
      page: 'btc-accounts',
      productObj: ACCOUNT_PRODUCTS.find(p => p.id === 'btc-10k'),
    },
    {
      id: 7,
      url: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts#btc-25k`,
      displayUrl: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts#btc-25k`,
      changefreq: 'daily',
      priority: '0.90',
      lastmod: '2026-08-28',
      title: 'BTC Enable 25k Limit Account ($350)',
      page: 'btc-accounts',
      productObj: ACCOUNT_PRODUCTS.find(p => p.id === 'btc-25k'),
    },
    {
      id: 8,
      url: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts#non-btc-4k`,
      displayUrl: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts#non-btc-4k`,
      changefreq: 'daily',
      priority: '0.85',
      lastmod: '2026-08-28',
      title: 'Non-BTC 4k Limit Account ($75)',
      page: 'non-btc-accounts',
      productObj: ACCOUNT_PRODUCTS.find(p => p.id === 'non-btc-4k'),
    },
    {
      id: 9,
      url: `${SITE_ORIGIN}/bulk-orders`,
      displayUrl: `${SITE_ORIGIN}/bulk-orders`,
      changefreq: 'weekly',
      priority: '0.85',
      lastmod: '2026-08-28',
      title: 'Bulk Orders & Agency Pricing Desk',
      page: 'bulk-orders',
    },
    {
      id: 10,
      url: `${SITE_ORIGIN}/safety-guide`,
      displayUrl: `${SITE_ORIGIN}/safety-guide`,
      changefreq: 'weekly',
      priority: '0.85',
      lastmod: '2026-08-28',
      title: '7-Day Anti-Ban Warmup Blueprint',
      page: 'safety-guide',
    },
    {
      id: 11,
      url: `${SITE_ORIGIN}/faq`,
      displayUrl: `${SITE_ORIGIN}/faq`,
      changefreq: 'weekly',
      priority: '0.80',
      lastmod: '2026-08-28',
      title: 'FAQ & 30-Day Escrow Warranty',
      page: 'faq',
    },
    {
      id: 12,
      url: `${SITE_ORIGIN}/blog`,
      displayUrl: `${SITE_ORIGIN}/blog`,
      changefreq: 'weekly',
      priority: '0.80',
      lastmod: '2026-08-28',
      title: 'Research & Security Blog Hub',
      page: 'blog',
    },
    {
      id: 13,
      url: `${SITE_ORIGIN}/contact`,
      displayUrl: `${SITE_ORIGIN}/contact`,
      changefreq: 'monthly',
      priority: '0.75',
      lastmod: '2026-08-28',
      title: '24/7 Live Telegram & WhatsApp Desk',
      page: 'contact',
    },
    {
      id: 14,
      url: `${SITE_ORIGIN}/sitemap_index.xml`,
      displayUrl: `${SITE_ORIGIN}/sitemap_index.xml`,
      changefreq: 'daily',
      priority: '1.00',
      lastmod: '2026-08-28',
      title: 'Rank Math Master Sitemap Index XML',
      isXmlFile: true,
    },
    {
      id: 15,
      url: `${SITE_ORIGIN}/product-sitemap.xml`,
      displayUrl: `${SITE_ORIGIN}/product-sitemap.xml`,
      changefreq: 'daily',
      priority: '0.95',
      lastmod: '2026-08-28',
      title: 'Product XML Feed with Images',
      isXmlFile: true,
    },
    {
      id: 16,
      url: `${SITE_ORIGIN}/vintage-sitemap.xml`,
      displayUrl: `${SITE_ORIGIN}/vintage-sitemap.xml`,
      changefreq: 'weekly',
      priority: '0.90',
      lastmod: '2026-08-28',
      title: 'Vintage 2020-2025 Aged Accounts Feed',
      isXmlFile: true,
    },
    {
      id: 17,
      url: `${SITE_ORIGIN}/post-sitemap.xml`,
      displayUrl: `${SITE_ORIGIN}/post-sitemap.xml`,
      changefreq: 'monthly',
      priority: '0.75',
      lastmod: '2026-08-28',
      title: 'Blog Articles & Research XML Feed',
      isXmlFile: true,
    },
  ], []);

  // Determine current active rows based on selected tab
  const currentRows: TableRowItem[] = useMemo(() => {
    switch (activeTab) {
      case 'index':
        return indexRows;
      case 'products':
        return productRows;
      case 'vintage':
        return vintageRows;
      case 'pages':
        return pageRows;
      case 'posts':
        return postRows;
      case 'html':
      default:
        return allHtmlRows;
    }
  }, [activeTab, indexRows, productRows, vintageRows, pageRows, postRows, allHtmlRows]);

  // Filter rows by search term
  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return currentRows;
    const q = searchQuery.toLowerCase();
    return currentRows.filter(
      (r) =>
        r.url.toLowerCase().includes(q) ||
        (r.title && r.title.toLowerCase().includes(q)) ||
        (r.changefreq && r.changefreq.toLowerCase().includes(q)) ||
        (r.priority && r.priority.includes(q))
    );
  }, [currentRows, searchQuery]);

  const handleRowClick = (item: TableRowItem) => {
    if (item.isXmlFile) {
      window.open(item.url, '_blank');
    } else if (item.productObj && onSelectProduct) {
      onSelectProduct(item.productObj);
    } else if (item.page) {
      onNavigate(item.page);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-[#334155] py-8 sm:py-12 px-3 sm:px-6 lg:px-8 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif]">
      {/* Centered Main Rank Math Sitemap Card */}
      <div className="max-w-[1140px] mx-auto bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08),0_4px_12px_-2px_rgba(0,0,0,0.04)] border border-slate-200/80 transition-all">
        
        {/* Dark Navy Header Banner (Matching Rank Math Screenshots) */}
        <div className="bg-[#141f32] p-6 sm:p-10 text-white relative">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {activeTab === 'instant-index'
                ? 'Instant Indexing Console'
                : activeTab === 'index'
                ? 'XML Sitemap Index'
                : 'XML Sitemap'}
            </h1>
            <span className="bg-[#2563eb] text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
              RANK MATH SEO
            </span>
          </div>

          <p className="text-[#cbd5e1] text-sm sm:text-base leading-relaxed max-w-4xl font-normal">
            Generated by Rank Math SEO standard schema for{' '}
            <a
              href="https://cashappagent.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#60a5fa] hover:underline font-bold"
            >
              CashappAgent.com
            </a>{' '}
            to index all verified BTC &amp; Non-BTC Cash App products.
          </p>
        </div>

        {/* Subbar with Quick Links and Counter (Screenshot Match) */}
        <div className="bg-white px-6 sm:px-10 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="text-slate-500 font-medium">
            {activeTab === 'instant-index' ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Instant Indexing Protocol: Google &amp; Bing/Yandex Ready</span>
              </span>
            ) : activeTab === 'index' ? (
              <span>
                Sitemaps in this index: <strong className="text-slate-900 font-bold">{filteredRows.length}</strong>
              </span>
            ) : (
              <span>
                URLs in this sitemap: <strong className="text-slate-900 font-bold">{filteredRows.length}</strong>
              </span>
            )}
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap items-center gap-2 font-semibold text-sm">
            <button
              onClick={() => { setActiveTab('index'); setSearchQuery(''); }}
              className={`cursor-pointer transition-colors ${
                activeTab === 'index' ? 'text-[#1d4ed8] underline font-bold' : 'text-[#2563eb] hover:underline'
              }`}
            >
              Index XML
            </button>
            <span className="text-slate-300">|</span>

            <button
              onClick={() => { setActiveTab('products'); setSearchQuery(''); }}
              className={`cursor-pointer transition-colors ${
                activeTab === 'products' ? 'text-[#1d4ed8] underline font-bold' : 'text-[#2563eb] hover:underline'
              }`}
            >
              Products XML
            </button>
            <span className="text-slate-300">|</span>

            <button
              onClick={() => { setActiveTab('vintage'); setSearchQuery(''); }}
              className={`cursor-pointer transition-colors ${
                activeTab === 'vintage' ? 'text-[#1d4ed8] underline font-bold' : 'text-[#2563eb] hover:underline'
              }`}
            >
              Vintage XML
            </button>
            <span className="text-slate-300">|</span>

            <button
              onClick={() => { setActiveTab('pages'); setSearchQuery(''); }}
              className={`cursor-pointer transition-colors ${
                activeTab === 'pages' ? 'text-[#1d4ed8] underline font-bold' : 'text-[#2563eb] hover:underline'
              }`}
            >
              Pages XML
            </button>
            <span className="text-slate-300">|</span>

            <button
              onClick={() => { setActiveTab('posts'); setSearchQuery(''); }}
              className={`cursor-pointer transition-colors ${
                activeTab === 'posts' ? 'text-[#1d4ed8] underline font-bold' : 'text-[#2563eb] hover:underline'
              }`}
            >
              Posts XML
            </button>
            <span className="text-slate-300">|</span>

            <button
              onClick={() => { setActiveTab('html'); setSearchQuery(''); }}
              className={`cursor-pointer transition-colors ${
                activeTab === 'html' ? 'text-[#1d4ed8] underline font-bold' : 'text-[#2563eb] hover:underline'
              }`}
            >
              HTML Sitemap
            </button>
            <span className="text-slate-300">|</span>

            <button
              onClick={() => { setActiveTab('instant-index'); setSearchQuery(''); }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'instant-index'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Instant Index</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </button>
          </div>
        </div>

        {activeTab === 'instant-index' ? (
          <div className="p-4 sm:p-6 bg-slate-100/50">
            <RankMathInstantIndexConsole onNavigateToSitemapTab={(t) => setActiveTab(t as TabMode)} />
          </div>
        ) : (
          <>
            {/* Interactive Search Bar & Raw XML Open Actions */}
            <div className="bg-slate-50/70 px-6 sm:px-10 py-3 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="relative flex-1 min-w-[240px] max-w-md">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search indexed URLs, endpoints, or priority..."
                  className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold"
                  >
                    &times;
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 font-mono">
                <a
                  href="/sitemap_index.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-blue-50 text-blue-600 border border-slate-200 text-[11px] font-semibold transition-colors"
                >
                  <span>sitemap_index.xml</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="/product-sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-blue-50 text-blue-600 border border-slate-200 text-[11px] font-semibold transition-colors"
                >
                  <span>product-sitemap.xml</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Data Table (Pixel-perfect match to Screenshots) */}
            <div className="w-full overflow-x-auto">
          {activeTab === 'index' ? (
            /* SITEMAP INDEX TABLE (Screenshot 1 & 2) */
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-300 bg-white">
                  <th className="py-4 pl-6 sm:pl-10 pr-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider w-12">
                    #
                  </th>
                  <th className="py-4 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    SITEMAP
                  </th>
                  <th className="py-4 pr-6 sm:pr-10 pl-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right sm:text-left">
                    LAST MODIFIED
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => handleRowClick(row)}
                  >
                    <td className="py-4 pl-6 sm:pl-10 pr-3 text-slate-400 font-semibold text-xs">
                      {idx + 1}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-between gap-2">
                        <a
                          href={row.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="font-bold text-slate-900 hover:text-[#2563eb] hover:underline break-all transition-colors inline-flex items-center gap-1.5"
                        >
                          <span>{row.displayUrl}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity text-[#2563eb]" />
                        </a>

                        <button
                          onClick={(e) => handleCopy(row.url, e)}
                          title="Copy sitemap URL"
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          {copiedUrl === row.url ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="py-4 pr-6 sm:pr-10 pl-4 text-slate-500 font-mono text-xs text-right sm:text-left whitespace-nowrap">
                      {row.lastmod}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* URL SET TABLE (Screenshots 3, 4, 5) */
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-300 bg-white">
                  <th className="py-4 pl-6 sm:pl-10 pr-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider w-12">
                    #
                  </th>
                  <th className="py-4 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    URL
                  </th>
                  <th className="py-4 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    CHANGEFREQ
                  </th>
                  <th className="py-4 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    PRIORITY
                  </th>
                  <th className="py-4 pr-6 sm:pr-10 pl-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right sm:text-left">
                    LAST MODIFIED
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => handleRowClick(row)}
                  >
                    {/* Column 1: Index Number */}
                    <td className="py-4 pl-6 sm:pl-10 pr-3 text-slate-400 font-semibold text-xs">
                      {idx + 1}
                    </td>

                    {/* Column 2: URL & Action */}
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <a
                            href={row.url}
                            onClick={(e) => {
                              if (!row.isXmlFile) {
                                e.preventDefault();
                                handleRowClick(row);
                              }
                            }}
                            className="font-bold text-slate-900 hover:text-[#2563eb] hover:underline break-all transition-colors inline-flex items-center gap-1.5"
                          >
                            <span>{row.displayUrl}</span>
                            {!row.isXmlFile && (
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity text-[#2563eb]" />
                            )}
                          </a>
                          {row.title && (
                            <p className="text-xs text-slate-500 font-normal">
                              {row.title}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {row.productObj && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectProduct && row.productObj) {
                                  onSelectProduct(row.productObj);
                                }
                              }}
                              className="px-2 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <ShoppingCart className="w-3 h-3" />
                              <span>Buy</span>
                            </button>
                          )}

                          <button
                            onClick={(e) => handleCopy(row.url, e)}
                            title="Copy Canonical URL"
                            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            {copiedUrl === row.url ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Column 3: Changefreq Pill Badge */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-block bg-[#e0f2fe] text-[#0284c7] px-2.5 py-0.5 rounded-md text-[11px] font-bold lowercase tracking-wide">
                        {row.changefreq || 'daily'}
                      </span>
                    </td>

                    {/* Column 4: Priority Bold Blue */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-[#2563eb] font-bold text-sm">
                        {row.priority || '0.80'}
                      </span>
                    </td>

                    {/* Column 5: Last Modified Date */}
                    <td className="py-4 pr-6 sm:pr-10 pl-4 text-slate-500 font-mono text-xs text-right sm:text-left whitespace-nowrap">
                      {row.lastmod}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Empty State */}
        {filteredRows.length === 0 && (
          <div className="py-16 px-6 text-center text-slate-500 space-y-2">
            <Search className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-semibold text-slate-700">No matching URLs found in this sitemap</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              Clear search filter
            </button>
          </div>
        )}
          </>
        )}

        {/* Footer Bar (Screenshot Match) */}
        <div className="bg-[#f8fafc] px-6 sm:px-10 py-6 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
          CashappAgent.com • 100% Phone Verified &amp; 2020–2026 Aged Cash App Accounts • Sitemaps.org Protocol 0.9 Compliant
        </div>
      </div>

      {/* Quick Navigation Back to Store */}
      <div className="max-w-[1140px] mx-auto mt-6 flex items-center justify-between text-xs text-slate-500 px-2">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-slate-900 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>&larr; Back to CashappAgent Storefront</span>
        </button>

        <div className="flex items-center gap-4">
          <a
            href="/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 transition-colors"
          >
            robots.txt
          </a>
          <span>&bull;</span>
          <a
            href="/sitemap_index.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 transition-colors"
          >
            XML Schema
          </a>
        </div>
      </div>
    </div>
  );
};
