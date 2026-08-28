import { PageView } from '../types';

export const SITE_ORIGIN = 'https://cashappagent.com';

export interface PageRouteInfo {
  page: PageView;
  path: string;
  fullUrl: string;
  title: string;
  label: string;
}

export const PAGE_ROUTES: Record<PageView, PageRouteInfo> = {
  home: {
    page: 'home',
    path: '/',
    fullUrl: `${SITE_ORIGIN}/`,
    title: 'Buy Verified Cash App Accounts | BTC & Non-BTC - CashappAgent',
    label: 'Home'
  },
  blog: {
    page: 'blog',
    path: '/blog',
    fullUrl: `${SITE_ORIGIN}/blog`,
    title: 'Official Blog & Guides | CashappAgent',
    label: 'Blog'
  },
  'all-accounts': {
    page: 'all-accounts',
    path: '/buy-verified-cashapp-accounts',
    fullUrl: `${SITE_ORIGIN}/buy-verified-cashapp-accounts`,
    title: 'Buy Verified Cash App Accounts | CashappAgent',
    label: 'All Accounts'
  },
  'btc-accounts': {
    page: 'btc-accounts',
    path: '/buy-btc-enabled-cashapp-accounts',
    fullUrl: `${SITE_ORIGIN}/buy-btc-enabled-cashapp-accounts`,
    title: 'Buy BTC Enabled Cash App Accounts | CashappAgent',
    label: 'BTC Enabled'
  },
  'non-btc-accounts': {
    page: 'non-btc-accounts',
    path: '/buy-non-btc-cashapp-accounts',
    fullUrl: `${SITE_ORIGIN}/buy-non-btc-cashapp-accounts`,
    title: 'Buy Non-BTC Cash App Accounts | CashappAgent',
    label: 'Non-BTC'
  },
  'safety-guide': {
    page: 'safety-guide',
    path: '/safety-guide',
    fullUrl: `${SITE_ORIGIN}/safety-guide`,
    title: '7-Day Anti-Ban Warmup Blueprint | CashappAgent',
    label: 'Safety Guide'
  },
  'bulk-orders': {
    page: 'bulk-orders',
    path: '/bulk-orders',
    fullUrl: `${SITE_ORIGIN}/bulk-orders`,
    title: 'Agency Wholesale & Bulk Bundles | CashappAgent',
    label: 'Bulk Orders'
  },
  faq: {
    page: 'faq',
    path: '/faq',
    fullUrl: `${SITE_ORIGIN}/faq`,
    title: 'Frequently Asked Questions & Warranty | CashappAgent',
    label: 'FAQ'
  },
  contact: {
    page: 'contact',
    path: '/contact',
    fullUrl: `${SITE_ORIGIN}/contact`,
    title: 'Official 24/7 Support Desk | CashappAgent',
    label: 'Contact'
  },
  sitemap: {
    page: 'sitemap',
    path: '/sitemap_index.xml',
    fullUrl: `${SITE_ORIGIN}/sitemap_index.xml`,
    title: 'XML Sitemap | Rank Math SEO - CashappAgent',
    label: 'XML Sitemap'
  },
  '404': {
    page: '404',
    path: '/404',
    fullUrl: `${SITE_ORIGIN}/404`,
    title: '404 - Page Not Found | CashappAgent',
    label: 'Not Found'
  }
};

/**
 * Determine page from pathname or hash
 */
export function getPageFromLocation(): PageView {
  if (typeof window === 'undefined') return 'home';

  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '').replace(/\/$/, '');

  // Exact Root Home
  if (pathname === '/' || pathname === '/home' || (!pathname && !hash)) return 'home';

  // Check valid known paths
  if (pathname === '/blog' || hash === 'blog') return 'blog';
  if (pathname === '/buy-verified-cashapp-accounts' || pathname === '/accounts' || pathname === '/all-accounts' || hash === 'buy-verified-cashapp-accounts' || hash === 'all-accounts' || hash === 'accounts' || hash === 'catalog') return 'all-accounts';
  if (pathname === '/buy-btc-enabled-cashapp-accounts' || pathname === '/btc-accounts' || pathname === '/btc' || hash === 'buy-btc-enabled-cashapp-accounts' || hash === 'btc-accounts' || hash === 'btc-enabled' || hash === 'btc') return 'btc-accounts';
  if (pathname === '/buy-non-btc-cashapp-accounts' || pathname === '/non-btc-accounts' || pathname === '/non-btc' || hash === 'buy-non-btc-cashapp-accounts' || hash === 'non-btc-accounts' || hash === 'non-btc') return 'non-btc-accounts';
  if (pathname === '/safety-guide' || pathname === '/safety' || hash === 'safety-guide' || hash === 'safety') return 'safety-guide';
  if (pathname === '/bulk-orders' || pathname === '/bulk' || hash === 'bulk-orders' || hash === 'bulk') return 'bulk-orders';
  if (pathname === '/faq' || pathname === '/help' || hash === 'faq' || hash === 'help') return 'faq';
  if (pathname === '/contact' || pathname === '/support' || hash === 'contact' || hash === 'support') return 'contact';
  if (
    pathname === '/sitemap_index.xml' || 
    pathname === '/sitemap.xml' || 
    pathname === '/page-sitemap.xml' || 
    pathname === '/product-sitemap.xml' || 
    pathname === '/post-sitemap.xml' ||
    pathname === '/sitemap' ||
    hash === 'sitemap' ||
    hash === 'sitemap_index.xml'
  ) return 'sitemap';

  // Unknown route returns 404
  return '404';
}

/**
 * Update browser URL with pushState and title
 */
export function setBrowserPage(page: PageView) {
  if (typeof window === 'undefined') return;

  const route = PAGE_ROUTES[page] || PAGE_ROUTES.home;
  document.title = route.title;

  try {
    // Keep clean URL pathname if supported
    const newUrl = route.path;
    if (window.location.pathname !== newUrl) {
      window.history.pushState({ page }, route.title, newUrl);
    }
  } catch {
    // Fallback to hash if sandboxed iframe restricts pushState
    try {
      window.location.hash = page === 'home' ? '' : route.path.replace(/^\//, '');
    } catch {
      // ignore
    }
  }
}
