/**
 * Google Analytics 4 (GA4) & RankMath SEO Event Tracking Module
 * Integrated for real-time traffic, conversion funnels, e-commerce, and Search Console telemetry.
 */

import { AccountProduct, CartItem, OrderDetails } from '../types';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const STORAGE_GA_ID_KEY = 'cashappagent_ga_measurement_id';
const STORAGE_EVENTS_KEY = 'cashappagent_ga_recent_events';
export const DEFAULT_GA_MEASUREMENT_ID = 'G-CASHAPPAGNT';

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  name: string;
  params: Record<string, any>;
}

/**
 * Retrieves the active Google Analytics 4 Measurement ID
 */
export function getActiveMeasurementId(): string {
  try {
    const saved = localStorage.getItem(STORAGE_GA_ID_KEY);
    if (saved && saved.trim().length > 0) return saved.trim();
  } catch {
    // fallback
  }

  return (
    (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_GA_MEASUREMENT_ID) ||
    DEFAULT_GA_MEASUREMENT_ID
  );
}

/**
 * Updates the user-defined GA4 Measurement ID and reinitializes GTAG
 */
export function setActiveMeasurementId(measurementId: string): void {
  try {
    const cleanId = measurementId.trim();
    if (cleanId) {
      localStorage.setItem(STORAGE_GA_ID_KEY, cleanId);
      initGoogleAnalytics(cleanId);
    } else {
      localStorage.removeItem(STORAGE_GA_ID_KEY);
      initGoogleAnalytics(DEFAULT_GA_MEASUREMENT_ID);
    }
  } catch {
    // safe fallback
  }
}

/**
 * Safe local event buffer for the RankMath & Google Analytics Live Monitor
 */
export function getRecentAnalyticsEvents(): AnalyticsEvent[] {
  try {
    const saved = localStorage.getItem(STORAGE_EVENTS_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return [];
}

function recordLocalEvent(name: string, params: Record<string, any>): void {
  try {
    const existing = getRecentAnalyticsEvents();
    const newEntry: AnalyticsEvent = {
      id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      name,
      params,
    };
    const updated = [newEntry, ...existing].slice(0, 40);
    localStorage.setItem(STORAGE_EVENTS_KEY, JSON.stringify(updated));
  } catch {
    // ignore storage limits
  }
}

/**
 * Initializes Google Tag Manager / GTAG script in DOM dynamically
 */
export function initGoogleAnalytics(customId?: string): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  try {
    const gaId = customId || getActiveMeasurementId();

    // Initialize dataLayer safely
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }

    // Check if GTAG script is already present
    const existingScript = document.getElementById('google-analytics-gtag');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-analytics-gtag';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      window.gtag('js', new Date());
      window.gtag('config', gaId, {
        send_page_view: false, // Managed manually for SPA route changes
        site_speed_sample_rate: 100,
      });
    } else {
      // Reconfigure existing tag if ID changed
      existingScript.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${gaId}`);
      window.gtag('config', gaId, {
        send_page_view: false,
      });
    }
  } catch {
    // Gracefully handle browser/network blockages
  }
}

/**
 * Tracks SPA Page Views across CashappAgent routes
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (typeof window === 'undefined') return;

  try {
    const gaId = getActiveMeasurementId();
    const title = pageTitle || document.title || 'CashappAgent';
    const location = window.location.href;

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: title,
        page_location: location,
        page_path: pagePath,
        send_to: gaId,
      });
    }

    recordLocalEvent('page_view', {
      page_path: pagePath,
      page_title: title,
      page_location: location,
    });
  } catch {
    // safe fallback
  }
}

/**
 * Tracks Custom Analytics & Conversion Events
 */
export function trackEvent(eventName: string, eventParams: Record<string, any> = {}): void {
  if (typeof window === 'undefined') return;

  try {
    const gaId = getActiveMeasurementId();

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        ...eventParams,
        send_to: gaId,
      });
    }

    recordLocalEvent(eventName, eventParams);
  } catch {
    // safe fallback
  }
}

/**
 * Track Product View (E-Commerce)
 */
export function trackProductView(product: AccountProduct): void {
  trackEvent('view_item', {
    currency: 'USD',
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.btcEnabled ? 'BTC Enabled' : 'Non-BTC USD',
        item_brand: 'CashappAgent',
        price: product.price,
        item_variant: product.limitDisplay,
      },
    ],
  });
}

/**
 * Track Add to Cart (E-Commerce)
 */
export function trackAddToCart(product: AccountProduct, quantity = 1): void {
  trackEvent('add_to_cart', {
    currency: 'USD',
    value: product.price * quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.btcEnabled ? 'BTC Enabled' : 'Non-BTC USD',
        item_brand: 'CashappAgent',
        price: product.price,
        quantity,
      },
    ],
  });
}

/**
 * Track Begin Checkout (E-Commerce)
 */
export function trackBeginCheckout(items: CartItem[], totalAmount: number): void {
  trackEvent('begin_checkout', {
    currency: 'USD',
    value: totalAmount,
    coupon: 'INSTANT_DELIVERY',
    items: items.map((item) => ({
      item_id: item.product.id,
      item_name: item.product.name,
      item_category: item.product.btcEnabled ? 'BTC Enabled' : 'Non-BTC USD',
      price: item.product.price,
      quantity: item.quantity,
    })),
  });
}

/**
 * Track Purchase / Order Placed (E-Commerce Conversion)
 */
export function trackPurchase(order: OrderDetails): void {
  trackEvent('purchase', {
    transaction_id: order.orderId,
    value: order.totalAmountUsd,
    currency: 'USD',
    tax: 0,
    shipping: 0,
    items: order.items.map((item) => ({
      item_id: item.product.id,
      item_name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    })),
    payment_method: order.cryptoCurrency || 'Crypto Gateway',
  });
}

/**
 * Track Crypto Payment Gateway Selection
 */
export function trackPaymentGatewaySelect(cryptoSymbol: string, usdAmount: number): void {
  trackEvent('select_payment_method', {
    payment_type: 'cryptocurrency',
    crypto_currency: cryptoSymbol,
    value: usdAmount,
    currency: 'USD',
  });
}

/**
 * Track Direct Contact / Lead Clicks
 */
export function trackContactChannelClick(channel: 'Telegram' | 'Email' | 'Live Chat', destination: string): void {
  trackEvent('contact_lead', {
    contact_channel: channel,
    destination_target: destination,
  });
}

/**
 * Track Instant Indexing API Submissions to Rank Math & Search Console
 */
export function trackInstantIndexTrigger(engine: string, urlCount: number, status: string): void {
  trackEvent('seo_instant_index_submit', {
    search_engine: engine,
    submitted_url_count: urlCount,
    status_result: status,
  });
}
