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
    title: 'Buy Verified Cash App Accounts | BTC & Non-BTC - CashappsAgent',
    label: 'Home'
  },
  blog: {
    page: 'blog',
    path: '/blog',
    fullUrl: `${SITE_ORIGIN}/blog`,
    title: 'Official Blog & Guides | CashappsAgent',
    label: 'Blog'
  },
  'all-accounts': {
    page: 'all-accounts',
    path: '/accounts',
    fullUrl: `${SITE_ORIGIN}/accounts`,
    title: 'All Verified Accounts Catalog | CashappsAgent',
    label: 'All Accounts'
  },
  'btc-accounts': {
    page: 'btc-accounts',
    path: '/btc-accounts',
    fullUrl: `${SITE_ORIGIN}/btc-accounts`,
    title: 'BTC Enabled Cash App Accounts | CashappsAgent',
    label: 'BTC Enabled'
  },
  'non-btc-accounts': {
    page: 'non-btc-accounts',
    path: '/non-btc-accounts',
    fullUrl: `${SITE_ORIGIN}/non-btc-accounts`,
    title: 'Non-BTC USD Cash App Accounts | CashappsAgent',
    label: 'Non-BTC'
  },
  'safety-guide': {
    page: 'safety-guide',
    path: '/safety-guide',
    fullUrl: `${SITE_ORIGIN}/safety-guide`,
    title: '7-Day Anti-Ban Warmup Blueprint | CashappsAgent',
    label: 'Safety Guide'
  },
  'bulk-orders': {
    page: 'bulk-orders',
    path: '/bulk-orders',
    fullUrl: `${SITE_ORIGIN}/bulk-orders`,
    title: 'Agency Wholesale & Bulk Bundles | CashappsAgent',
    label: 'Bulk Orders'
  },
  faq: {
    page: 'faq',
    path: '/faq',
    fullUrl: `${SITE_ORIGIN}/faq`,
    title: 'Frequently Asked Questions & Warranty | CashappsAgent',
    label: 'FAQ'
  },
  contact: {
    page: 'contact',
    path: '/contact',
    fullUrl: `${SITE_ORIGIN}/contact`,
    title: 'Official 24/7 Support Desk | CashappsAgent',
    label: 'Contact'
  }
};

/**
 * Determine page from pathname or hash
 */
export function getPageFromLocation(): PageView {
  if (typeof window === 'undefined') return 'home';

  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '').replace(/\/$/, '');

  // Check path matches
  if (pathname === '/blog' || hash === 'blog') return 'blog';
  if (pathname === '/accounts' || pathname === '/all-accounts' || hash === 'all-accounts' || hash === 'accounts' || hash === 'catalog') return 'all-accounts';
  if (pathname === '/btc-accounts' || pathname === '/btc' || hash === 'btc-accounts' || hash === 'btc-enabled' || hash === 'btc') return 'btc-accounts';
  if (pathname === '/non-btc-accounts' || pathname === '/non-btc' || hash === 'non-btc-accounts' || hash === 'non-btc') return 'non-btc-accounts';
  if (pathname === '/safety-guide' || pathname === '/safety' || hash === 'safety-guide' || hash === 'safety') return 'safety-guide';
  if (pathname === '/bulk-orders' || pathname === '/bulk' || hash === 'bulk-orders' || hash === 'bulk') return 'bulk-orders';
  if (pathname === '/faq' || pathname === '/help' || hash === 'faq' || hash === 'help') return 'faq';
  if (pathname === '/contact' || pathname === '/support' || hash === 'contact' || hash === 'support') return 'contact';

  return 'home';
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
