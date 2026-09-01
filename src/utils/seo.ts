import { PageView } from '../types';
import { PAGE_ROUTES, SITE_ORIGIN } from './navigation';
import { ACCOUNT_PRODUCTS } from '../data/products';
import { BLOG_POSTS } from '../data/blogPosts';

export interface SeoMetaTags {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogType: string;
  twitterTitle: string;
  twitterDescription: string;
  jsonLd: Record<string, unknown>[];
}

export function getSeoMetadata(page: PageView): SeoMetaTags {
  const route = PAGE_ROUTES[page] || PAGE_ROUTES.home;
  const canonicalUrl = route.fullUrl;

  const baseOrganization = {
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: 'CashappAgent',
    url: `${SITE_ORIGIN}/`,
    logo: `${SITE_ORIGIN}/favicon.svg`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-253-408-0049',
        contactType: 'customer service',
        email: 'support@cashappagent.com',
        availableLanguage: ['English'],
      },
    ],
    sameAs: ['https://t.me/CashappAgentTeam'],
  };

  const baseWebSite = {
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    url: `${SITE_ORIGIN}/`,
    name: 'CashappAgent',
    publisher: {
      '@id': `${SITE_ORIGIN}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_ORIGIN}/sitemap?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const breadcrumbsList = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_ORIGIN}/`,
      },
      ...(page !== 'home'
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: route.label,
              item: canonicalUrl,
            },
          ]
        : []),
    ],
  };

  switch (page) {
    case 'all-accounts':
      return {
        title: 'Buy Verified Cash App Accounts | BTC & Non-BTC All Tiers ($4k-$25k) - CashappAgent',
        description: 'Browse complete catalog of 100% verified Cash App accounts with $4,000, $10,000, and $25,000 limits. Instant auto-delivery, full documentation, SSN DL verified, 30-day warranty.',
        keywords: 'buy verified cash app accounts, cash app accounts for sale, buy cashapp 4k limit, buy cashapp 10k limit, buy cashapp 25k limit, verified aged cash app accounts, buy btc cash app',
        canonical: canonicalUrl,
        ogTitle: 'Buy Verified Cash App Accounts - Full Catalog ($4k-$25k Limits)',
        ogDescription: 'Instant crypto delivery of fully verified Cash App accounts. SSN/ID verified, clean email access, routing & cash card activated with 30-day replacement warranty.',
        ogUrl: canonicalUrl,
        ogType: 'website',
        twitterTitle: 'Buy Verified Cash App Accounts - CashappAgent Catalog',
        twitterDescription: 'All verified Cash App account tiers in stock. BTC enabled and Non-BTC USD with instant auto-delivery and 24/7 VIP support.',
        jsonLd: [
          baseOrganization,
          baseWebSite,
          breadcrumbsList,
          {
            '@type': 'ItemList',
            name: 'Verified Cash App Account Catalog',
            numberOfItems: ACCOUNT_PRODUCTS.length,
            itemListElement: ACCOUNT_PRODUCTS.map((prod, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Product',
                name: prod.name,
                description: prod.description,
                disambiguatingDescription: prod.shortDesc,
                keywords: `${prod.focusKeyword}, ${prod.tags.join(', ')}`,
                url: `${SITE_ORIGIN}/${prod.btcEnabled ? 'buy-btc-enabled-cashapp-accounts' : 'buy-non-btc-cashapp-accounts'}#${prod.id}`,
                brand: { '@type': 'Brand', name: 'CashappAgent' },
                offers: {
                  '@type': 'Offer',
                  price: prod.price.toString(),
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/InStock',
                  url: `${SITE_ORIGIN}/${prod.btcEnabled ? 'buy-btc-enabled-cashapp-accounts' : 'buy-non-btc-cashapp-accounts'}#${prod.id}`,
                },
              },
            })),
          },
        ],
      };

    case 'btc-accounts':
      return {
        title: 'Buy BTC Enabled Cash App Accounts | Instant Bitcoin Withdrawal - CashappAgent',
        description: 'Buy verified Cash App accounts with Bitcoin enabled. On-chain external wallet deposit and withdrawal unlocked. $4k, $10k, and $25k limit tiers with instant crypto delivery.',
        keywords: 'buy btc enable cash app account, bitcoin withdrawal cash app, buy cash app with btc enabled, verified bitcoin cash app, buy btc 4k cash app, buy btc 10k cash app, buy btc 25k cash app',
        canonical: canonicalUrl,
        ogTitle: 'Buy BTC Enabled Cash App Accounts (Instant On-Chain Withdrawal)',
        ogDescription: 'Unlocked Bitcoin trading, on-chain deposits, and external wallet withdrawals. Fully verified with SSN, Driving License & 30-day warranty.',
        ogUrl: canonicalUrl,
        ogType: 'website',
        twitterTitle: 'Buy BTC Enabled Cash App Accounts - Instant Delivery',
        twitterDescription: 'Get BTC enabled Cash App accounts with high limits and instant crypto delivery at CashappAgent.',
        jsonLd: [
          baseOrganization,
          baseWebSite,
          breadcrumbsList,
          {
            '@type': 'Product',
            name: 'BTC Enabled Cash App Accounts Collection',
            description: 'Fully verified Cash App accounts with biometric ID verification enabling on-chain Bitcoin transactions and withdrawals.',
            brand: { '@type': 'Brand', name: 'CashappAgent' },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'USD',
              lowPrice: '249',
              highPrice: '499',
              offerCount: '3',
              availability: 'https://schema.org/InStock',
            },
          },
        ],
      };

    case 'non-btc-accounts':
      return {
        title: 'Buy Non-BTC Verified Cash App Accounts | Budget USD P2P - CashappAgent',
        description: 'Buy cheap verified Cash App accounts for standard USD peer-to-peer sending and direct deposits. $4k, $10k, and $15k limit tiers starting at $189. Full SSN & DL verified.',
        keywords: 'buy non btc cash app account, cheap verified cash app, buy usd cash app account, cash app p2p verified, buy cashapp 4k non btc, buy cashapp 10k non btc',
        canonical: canonicalUrl,
        ogTitle: 'Buy Non-BTC Cash App Accounts - Verified USD Transfer Tiers',
        ogDescription: 'Budget-friendly verified Cash App accounts starting at $189. Full email access, routing info, and virtual Cash Card ready for USD transactions.',
        ogUrl: canonicalUrl,
        ogType: 'website',
        twitterTitle: 'Buy Non-BTC Cash App Accounts - CashappAgent',
        twitterDescription: 'High-limit verified Cash App accounts for USD sending and direct deposits. Instant delivery.',
        jsonLd: [
          baseOrganization,
          baseWebSite,
          breadcrumbsList,
          {
            '@type': 'Product',
            name: 'Non-BTC Verified Cash App Accounts Collection',
            description: 'Verified Cash App accounts optimized for USD transfers, cash card spending, and direct ACH deposits.',
            brand: { '@type': 'Brand', name: 'CashappAgent' },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'USD',
              lowPrice: '189',
              highPrice: '389',
              offerCount: '3',
              availability: 'https://schema.org/InStock',
            },
          },
        ],
      };

    case 'safety-guide':
      return {
        title: '7-Day Anti-Ban Warm-up Guide for Verified Cash App Accounts - CashappAgent',
        description: 'The definitive anti-ban security blueprint: How to safely warm up a new verified Cash App account using US residential proxies, clean device fingerprinting, and progressive transaction velocity.',
        keywords: 'cash app warm up guide, anti-ban cash app blueprint, cash app residential proxy setup, how to use bought cash app account safely, cash app limit scaling',
        canonical: canonicalUrl,
        ogTitle: '7-Day Anti-Ban Safety Blueprint for Cash App Accounts',
        ogDescription: 'Step-by-step security protocols, residential proxy configuration, and device warmup schedule to guarantee 100% account longevity and zero flags.',
        ogUrl: canonicalUrl,
        ogType: 'article',
        twitterTitle: '7-Day Anti-Ban Warmup Guide - CashappAgent Security',
        twitterDescription: 'Master the setup protocols for verified Cash App accounts to prevent bans and scale volume safely.',
        jsonLd: [
          baseOrganization,
          baseWebSite,
          breadcrumbsList,
          {
            '@type': 'HowTo',
            name: 'How to Safely Warm Up a New Verified Cash App Account',
            description: 'Step-by-step protocol for establishing device trust, configuring US residential proxies, and scaling limits without bans.',
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Device & Clean Profile Setup',
                text: 'Use a clean mobile device profile and match the system timezone to the account holder state.',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Static US Residential Proxy Connection',
                text: 'Connect via a dedicated static US residential socks5 proxy and maintain sticky IP consistency.',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Progressive Transaction Velocity',
                text: 'Conduct micro-transactions ($10-$25) during days 1-3 before scaling to high-velocity limit transfers.',
              },
            ],
          },
        ],
      };

    case 'bulk-orders':
      return {
        title: 'Wholesale Bulk Verified Cash App Accounts | 15%-30% Discount - CashappAgent',
        description: 'Buy verified Cash App accounts in bulk for agencies, liquidity desks, and volume operations. Tiered wholesale discounts from 15% to 30% off with dedicated VIP account manager.',
        keywords: 'wholesale cash app accounts, bulk verified cash app, buy cash app accounts bulk, agency cash app bundle, btc cash app bulk orders',
        canonical: canonicalUrl,
        ogTitle: 'Wholesale & Bulk Verified Cash App Accounts (15%-30% Off)',
        ogDescription: 'Discounted wholesale bundles for high-volume teams and OTC traders. Batch credential exports and dedicated Telegram VIP concierge dispatch.',
        ogUrl: canonicalUrl,
        ogType: 'website',
        twitterTitle: 'Wholesale Bulk Verified Cash App Accounts - CashappAgent',
        twitterDescription: 'Save up to 30% on bulk verified Cash App accounts. Custom batches, BTC enabled, and dedicated agency delivery.',
        jsonLd: [
          baseOrganization,
          baseWebSite,
          breadcrumbsList,
          {
            '@type': 'Product',
            name: 'Wholesale Bulk Verified Cash App Accounts Package',
            description: 'Volume packages of verified Cash App accounts for marketing agencies, e-commerce merchants, and liquidity desks.',
            brand: { '@type': 'Brand', name: 'CashappAgent' },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'USD',
              lowPrice: '550',
              highPrice: '3500',
              offerCount: '3',
              availability: 'https://schema.org/InStock',
            },
          },
        ],
      };

    case 'blog':
      return {
        title: 'Cash App Insights, Bitcoin Limits & Security Blog | CashappAgent',
        description: 'Read the latest research, tutorials, and security guides on Cash App limits, Bitcoin mempool withdrawal fees, Sutton Bank routing, and account warm-up strategies.',
        keywords: 'cash app blog, bitcoin withdrawal limits guide, sutton bank cash app routing, cash app transfer limits 2026, cashappagent research',
        canonical: canonicalUrl,
        ogTitle: 'CashappAgent Research & Security Blog',
        ogDescription: 'Expert guides on verified Cash App account limits, Bitcoin on-chain settlements, Sutton Bank direct deposits, and risk minimization.',
        ogUrl: canonicalUrl,
        ogType: 'blog',
        twitterTitle: 'CashappAgent Research & Security Blog',
        twitterDescription: 'Official technical guides on Cash App transfer limits, Bitcoin withdrawals, and proxy management.',
        jsonLd: [
          baseOrganization,
          baseWebSite,
          breadcrumbsList,
          {
            '@type': 'Blog',
            name: 'CashappAgent Research & Technical Blog',
            description: 'Authoritative guides on Cash App architecture, Bitcoin limits, and security blueprints.',
            blogPost: BLOG_POSTS.map((post) => ({
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.excerpt,
              datePublished: '2026-08-01T00:00:00Z',
              author: {
                '@type': 'Organization',
                name: post.author,
              },
              url: `${SITE_ORIGIN}/blog#${post.slug}`,
            })),
          },
        ],
      };

    case 'faq':
      return {
        title: 'Frequently Asked Questions & 30-Day Warranty Policy - CashappAgent',
        description: 'Have questions about buying verified Cash App accounts? Learn about instant crypto delivery, login credentials, replacement guarantees, and 24/7 VIP support.',
        keywords: 'cash app accounts FAQ, buy verified cash app warranty, cashappagent guarantee, how to pay with crypto for cash app, cash app replacement policy',
        canonical: canonicalUrl,
        ogTitle: 'FAQ & 30-Day Replacement Guarantee - CashappAgent',
        ogDescription: 'Everything you need to know about delivery speed, login formats, escrow protection, and 100% money-back replacement terms.',
        ogUrl: canonicalUrl,
        ogType: 'website',
        twitterTitle: 'Frequently Asked Questions & Warranty - CashappAgent',
        twitterDescription: 'Clear answers on delivery, payment methods, warranty terms, and account usage guidelines.',
        jsonLd: [
          baseOrganization,
          baseWebSite,
          breadcrumbsList,
          {
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How do I buy verified Cash App accounts safely?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'At CashappAgent, choose your desired limit tier ($4k, $10k, or $25k), pay seamlessly via cryptocurrency (BTC, LTC, USDT, SOL, BNB, etc.), and receive your complete credential package instantly within 5-15 minutes.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is included with my verified Cash App account purchase?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Every order includes: Cash App Cashtag & Password, linked email login credentials, virtual Cash Card details with PIN and CVV, direct deposit routing/account numbers, SSN/ID verification scans, and the 7-day anti-ban warmup blueprint.',
                },
              },
              {
                '@type': 'Question',
                name: 'What does the 30-Day Replacement Warranty cover?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'If any purchased account experiences a verification lock or login issue within 30 days while adhering to our proxy warmup protocol, our support desk replaces the account completely free of charge with zero hassle.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I send and withdraw Bitcoin on BTC Enabled accounts?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. BTC Enabled accounts come with full biometric and government ID verification completed on Cash App, allowing you to buy, sell, deposit, and withdraw Bitcoin to external wallets with limits up to $10,000/day.',
                },
              },
            ],
          },
        ],
      };

    case 'contact':
      return {
        title: '24/7 Agent Support Desk & Telegram VIP Concierge - CashappAgent',
        description: 'Need help with your verified Cash App order or custom high-limit request? Reach out to CashappAgent 24/7 support via Telegram (@CashappAgentTeam), WhatsApp, or email.',
        keywords: 'cashappagent contact, cash app support desk, telegram verified cash app, buy cash app customer service, 24/7 crypto concierge',
        canonical: canonicalUrl,
        ogTitle: '24/7 Agent Support Desk & Concierge - CashappAgent',
        ogDescription: 'Instant customer assistance via Telegram and WhatsApp. Fast response times for order verification, custom batches, and replacement requests.',
        ogUrl: canonicalUrl,
        ogType: 'website',
        twitterTitle: '24/7 Support Desk - CashappAgent',
        twitterDescription: 'Connect with our 24/7 customer service and VIP dispatch desk via Telegram and email.',
        jsonLd: [
          baseOrganization,
          baseWebSite,
          breadcrumbsList,
          {
            '@type': 'ContactPage',
            name: 'CashappAgent 24/7 Agent Support Desk',
            description: 'Official customer support and Telegram VIP concierge desk for order assistance and custom bulk orders.',
            url: canonicalUrl,
          },
        ],
      };

    case 'sitemap':
      return {
        title: 'Rank Math XML Sitemap & Instant Indexing Hub - CashappAgent',
        description: 'Complete Rank Math SEO XML sitemap index and Instant Indexing Console for Google Indexing API & IndexNow. Discover all verified Cash App product tiers, Bitcoin limits, and feeds.',
        keywords: 'rank math instant index, cashappagent sitemap, google indexing api, indexnow, sitemap_index.xml, product-sitemap.xml, vintage-sitemap.xml, page-sitemap.xml, post-sitemap.xml, rank math seo',
        canonical: canonicalUrl,
        ogTitle: 'Rank Math XML Sitemap & Instant Indexing Console - CashappAgent',
        ogDescription: 'Explore the full indexed architecture and trigger instant crawling for Google & Bing via IndexNow and Google Indexing API.',
        ogUrl: canonicalUrl,
        ogType: 'website',
        twitterTitle: 'Rank Math Instant Index & Sitemap - CashappAgent',
        twitterDescription: 'Instant Indexing console and crawler feeds for all verified accounts, products, and safety articles.',
        jsonLd: [
          baseOrganization,
          baseWebSite,
          breadcrumbsList,
        ],
      };

    case 'home':
    default:
      return {
        title: 'Buy Verified Cash App Accounts | BTC & Non-BTC Enabled ($4k-$25k Limits) - CashappAgent',
        description: 'Buy 100% verified Cash App accounts with BTC enabled & Non-BTC limits up to $25k. Instant delivery, SSN/ID verified, routing numbers, email access, 30-day warranty & 24/7 support at CashappAgent.',
        keywords: 'Buy Verified Cash App Accounts, buy btc enable cash app account, verified cash app accounts for sale, buy cash app account with bitcoin withdrawal, cashappagent, buy cashapp 4k limit, buy cashapp 10k limit, buy cashapp 25k limit, old aged cash app accounts, sutton bank cash app routing',
        canonical: `${SITE_ORIGIN}/`,
        ogTitle: 'Buy Verified Cash App Accounts | BTC & Non-BTC Enabled - CashappAgent',
        ogDescription: 'Get fully verified Cash App accounts with BTC limits up to $25k. Instant crypto checkout, 100% replacement warranty, and 24/7 support.',
        ogUrl: `${SITE_ORIGIN}/`,
        ogType: 'website',
        twitterTitle: 'Buy Verified Cash App Accounts - CashappAgent',
        twitterDescription: 'Premium verified Cash App accounts with instant delivery, email access & phone linked. Crypto payment gateway supported.',
        jsonLd: [
          baseOrganization,
          baseWebSite,
          breadcrumbsList,
          {
            '@type': 'Product',
            name: 'Buy Verified Cash App Accounts',
            description: 'Verified personal and business Cash App accounts with BTC enabled/non-BTC options, full verification documents, bank linkage, email and phone access.',
            brand: {
              '@type': 'Brand',
              name: 'CashappAgent',
            },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'USD',
              lowPrice: '189',
              highPrice: '499',
              offerCount: '6',
              availability: 'https://schema.org/InStock',
            },
          },
          {
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How do I buy verified Cash App accounts safely?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'At CashappAgent, select your desired tier (BTC enabled 4k/10k/25k or Non-BTC 4k/10k/15k), complete the crypto payment, and receive your full login credentials, email access, and verification documents instantly via email or Telegram.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the difference between BTC Enable and Non-BTC Cash App accounts?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'BTC Enabled accounts have completed biometric/ID verification with Cash App to allow buying, selling, depositing, and on-chain withdrawal of Bitcoin. Non-BTC accounts support standard USD peer-to-peer sending and direct deposits with verified limits.',
                },
              },
              {
                '@type': 'Question',
                name: 'What crypto currencies are accepted for payment?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We accept BSC (BNB/BEP-20), TRX (TRC-20), ETH (Ethereum/ERC-20), SOL (Solana), BTC (Bitcoin), LTC (Litecoin), and DOGE (Dogecoin) with zero payment delay.',
                },
              },
            ],
          },
        ],
      };
  }
}

/**
 * Dynamically updates document title, meta tags, canonical link, and JSON-LD schema in DOM
 */
export function applySeoMetadata(page: PageView): void {
  if (typeof document === 'undefined') return;

  const meta = getSeoMetadata(page);

  // Update Page Title
  document.title = meta.title;

  // Helper function to update or create meta tag
  const setMetaTag = (attrName: string, attrVal: string, content: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard Meta Tags
  setMetaTag('name', 'description', meta.description);
  setMetaTag('name', 'keywords', meta.keywords);
  setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  // Open Graph Meta Tags
  setMetaTag('property', 'og:title', meta.ogTitle);
  setMetaTag('property', 'og:description', meta.ogDescription);
  setMetaTag('property', 'og:url', meta.ogUrl);
  setMetaTag('property', 'og:type', meta.ogType);
  setMetaTag('property', 'og:site_name', 'CashappAgent');
  setMetaTag('property', 'og:image', `${SITE_ORIGIN}/favicon.svg`);

  // Twitter Meta Tags
  setMetaTag('property', 'twitter:title', meta.twitterTitle);
  setMetaTag('property', 'twitter:description', meta.twitterDescription);
  setMetaTag('property', 'twitter:url', meta.ogUrl);
  setMetaTag('property', 'twitter:card', 'summary_large_image');
  setMetaTag('property', 'twitter:image', `${SITE_ORIGIN}/favicon.svg`);

  // Canonical Link Tag
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', meta.canonical);

  // Update Schema.org JSON-LD Script
  let jsonLdEl = document.getElementById('rankmath-jsonld-schema');
  if (!jsonLdEl) {
    jsonLdEl = document.createElement('script');
    jsonLdEl.setAttribute('type', 'application/ld+json');
    jsonLdEl.setAttribute('id', 'rankmath-jsonld-schema');
    document.head.appendChild(jsonLdEl);
  }

  const structuredDataGraph = {
    '@context': 'https://schema.org',
    '@graph': meta.jsonLd,
  };

  jsonLdEl.textContent = JSON.stringify(structuredDataGraph, null, 2);
}
