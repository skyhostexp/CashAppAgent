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
    path: '/sitemap',
    fullUrl: `${SITE_ORIGIN}/sitemap`,
    title: 'Website Sitemap & Page Index | CashappAgent',
    label: 'Sitemap'
  },
  'not-found': {
    page: 'not-found',
    path: '/404',
    fullUrl: `${SITE_ORIGIN}/404`,
    title: '404 - Page Not Found | CashappAgent',
    label: '404 Not Found'
  }
};

/**
 * Determine page from pathname or hash. If path or hash is not recognized, return 'not-found' (404).
 */
export function getPageFromLocation(): PageView {
  if (typeof window === 'undefined') return 'home';

  let rawPath = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const rawHash = window.location.hash.toLowerCase().replace(/^#\/?/, '').replace(/\/$/, '');

  // Support SPA redirect query parameters (e.g. /?/some-page)
  if (window.location.search && window.location.search.startsWith('?/')) {
    const queryPath = window.location.search.slice(1).split('&')[0];
    if (queryPath) {
      rawPath = ('/' + queryPath.replace(/^\//, '')).toLowerCase().replace(/\/$/, '');
    }
  }

  // Explicit 404 / not-found checks
  if (rawPath === '/404' || rawPath === '/not-found' || rawHash === '404' || rawHash === 'not-found') {
    return 'not-found';
  }

  // Known root or empty path
  const isRoot = rawPath === '' || rawPath === '/' || rawPath === '/index.html';

  // Check pathname routes
  if (rawPath === '/blog') return 'blog';
  if (rawPath === '/buy-verified-cashapp-accounts' || rawPath === '/accounts' || rawPath === '/all-accounts') return 'all-accounts';
  if (rawPath === '/buy-btc-enabled-cashapp-accounts' || rawPath === '/btc-accounts' || rawPath === '/btc') return 'btc-accounts';
  if (rawPath === '/buy-non-btc-cashapp-accounts' || rawPath === '/non-btc-accounts' || rawPath === '/non-btc') return 'non-btc-accounts';
  if (rawPath === '/safety-guide' || rawPath === '/safety') return 'safety-guide';
  if (rawPath === '/bulk-orders' || rawPath === '/bulk') return 'bulk-orders';
  if (rawPath === '/faq' || rawPath === '/help') return 'faq';
  if (rawPath === '/contact' || rawPath === '/support') return 'contact';
  if (rawPath === '/sitemap' || rawPath === '/sitemap.html') return 'sitemap';

  // If path is not root and did not match any known route above, show 404
  if (!isRoot) {
    return 'not-found';
  }

  // If at root path, check hash
  if (rawHash) {
    if (rawHash === 'blog') return 'blog';
    if (['buy-verified-cashapp-accounts', 'all-accounts', 'accounts', 'catalog'].includes(rawHash)) return 'all-accounts';
    if (['buy-btc-enabled-cashapp-accounts', 'btc-accounts', 'btc-enabled', 'btc'].includes(rawHash)) return 'btc-accounts';
    if (['buy-non-btc-cashapp-accounts', 'non-btc-accounts', 'non-btc'].includes(rawHash)) return 'non-btc-accounts';
    if (['safety-guide', 'safety'].includes(rawHash)) return 'safety-guide';
    if (['bulk-orders', 'bulk'].includes(rawHash)) return 'bulk-orders';
    if (['faq', 'help'].includes(rawHash)) return 'faq';
    if (['contact', 'support'].includes(rawHash)) return 'contact';
    if (['sitemap', 'sitemap.html'].includes(rawHash)) return 'sitemap';

    // Allowed in-page anchor IDs on homepage
    const homeSectionAnchors = [
      '',
      'home',
      'hero',
      'accounts',
      'products',
      'calculator',
      'virtual-preview',
      'comparison',
      'rates',
      'warmup',
      'agency',
      'features',
      'article',
      'reviews',
      'testimonials',
      'faq-section',
      'contact-section'
    ];

    if (!homeSectionAnchors.includes(rawHash)) {
      // Unrecognized anchor/hash on website -> show 404
      return 'not-found';
    }
  }

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
