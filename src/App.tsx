import React, { useState, useEffect, useCallback } from 'react';
import { AccountCategory, AccountProduct, CartItem, OrderDetails, PageView } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { AccountCalculator } from './components/AccountCalculator';
import { VirtualAccountPreview } from './components/VirtualAccountPreview';
import { ComparisonTable } from './components/ComparisonTable';
import { CryptoRateCalculator } from './components/CryptoRateCalculator';
import { SafeLoginGuide } from './components/SafeLoginGuide';
import { BulkOrderConfigurator } from './components/BulkOrderConfigurator';
import { AccountFeatures } from './components/AccountFeatures';
import { SeoContentArticle } from './components/SeoContentArticle';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CryptoCheckoutModal } from './components/CryptoCheckoutModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderLookupModal } from './components/OrderLookupModal';
import { FloatingContactBar } from './components/FloatingContactBar';
import { LiveOrderNotification } from './components/LiveOrderNotification';
import { PageTransitionLoader } from './components/PageTransitionLoader';

// Dedicated Page View Components
import { AllAccountsPage } from './components/pages/AllAccountsPage';
import { BtcAccountsPage } from './components/pages/BtcAccountsPage';
import { NonBtcAccountsPage } from './components/pages/NonBtcAccountsPage';
import { BlogPage } from './components/pages/BlogPage';
import { FaqPage } from './components/pages/FaqPage';
import { SafetyGuidePage } from './components/pages/SafetyGuidePage';
import { BulkOrdersPage } from './components/pages/BulkOrdersPage';
import { ContactPage } from './components/pages/ContactPage';
import { SitemapPage } from './components/pages/SitemapPage';
import { NotFoundPage } from './components/pages/NotFoundPage';

import { getPageFromLocation, setBrowserPage } from './utils/navigation';
import { applySeoMetadata } from './utils/seo';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>(() => getPageFromLocation());
  const [isReloading, setIsReloading] = useState(false);
  const [targetLoadingPage, setTargetLoadingPage] = useState<PageView>(currentPage);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Dynamically update Rank Math SEO metadata, titles, canonicals, OpenGraph & JSON-LD
  useEffect(() => {
    applySeoMetadata(currentPage);
  }, [currentPage]);

  const [selectedCategory, setSelectedCategory] = useState<'all' | AccountCategory>('all');
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cashappagent_cart') || localStorage.getItem('cashappsagent_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedOrders, setSavedOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('cashappagent_orders') || localStorage.getItem('cashappsagent_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [isOrderLookupOpen, setIsOrderLookupOpen] = useState(false);

  // Sync browser back/forward history and hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      const page = getPageFromLocation();
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('cashappagent_cart', JSON.stringify(cart));
    } catch {
      // safe fallback
    }
  }, [cart]);

  // Sync orders to local storage
  useEffect(() => {
    try {
      localStorage.setItem('cashappagent_orders', JSON.stringify(savedOrders));
    } catch {
      // safe fallback
    }
  }, [savedOrders]);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleAddToCart = (product: AccountProduct) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.product.id === product.id);
      if (exists) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleBuyNow = (product: AccountProduct) => {
    setCheckoutItems([{ product, quantity: 1 }]);
    setIsCheckoutOpen(true);
  };

  const handleProceedCartToCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutItems([...cart]);
    setIsCheckoutOpen(true);
  };

  const handleOrderCreated = (order: OrderDetails) => {
    setSavedOrders((prev) => [order, ...prev]);
    setCart([]);
  };

  /**
   * Smooth animated page transition with reload indicator and URL pushState update
   */
  const navigateTo = useCallback((page: PageView) => {
    setTargetLoadingPage(page);
    setIsReloading(true);
    setLoadingProgress(25);

    setTimeout(() => {
      setLoadingProgress(70);
    }, 100);

    setTimeout(() => {
      setLoadingProgress(100);
      setCurrentPage(page);
      setBrowserPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => {
        setIsReloading(false);
        setLoadingProgress(0);
      }, 250);
    }, 280);
  }, []);

  /**
   * Manual Reload Trigger
   */
  const handleReload = () => {
    setIsReloading(true);
    setLoadingProgress(30);
    setTimeout(() => setLoadingProgress(75), 150);
    setTimeout(() => {
      setLoadingProgress(100);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setIsReloading(false);
        setLoadingProgress(0);
      }, 200);
    }, 350);
  };

  const scrollToAccounts = () => {
    if (currentPage !== 'home') {
      navigateTo('all-accounts');
      return;
    }
    const el = document.getElementById('accounts');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectBtc = () => {
    navigateTo('btc-accounts');
  };

  return (
    <div className="min-h-screen bg-[#0b0f12] text-slate-100 selection:bg-[#00D632] selection:text-black flex flex-col font-['Plus_Jakarta_Sans',sans-serif] relative">
      {/* Top Reload / Route Progress Bar & Indicator */}
      <PageTransitionLoader
        isLoading={isReloading}
        targetPage={targetLoadingPage}
        progress={loadingProgress}
      />

      {/* Header with Navigation & Announcement bar */}
      <Header
        cartCount={totalCartCount}
        cartTotal={totalCartAmount}
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
      />

      <main className="flex-grow">
        {/* VIEW 1: Dedicated All Accounts Page (/Buy-Verified-CashApp-Accounts) */}
        {currentPage === 'all-accounts' && (
          <AllAccountsPage
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {/* VIEW 2: Dedicated BTC Enabled Accounts Page (/buy-btc-enabled-cashapp-accounts) */}
        {currentPage === 'btc-accounts' && (
          <BtcAccountsPage
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {/* VIEW 3: Dedicated Non-BTC USD Accounts Page (/Buy-non-btc-CashApp-accounts) */}
        {currentPage === 'non-btc-accounts' && (
          <NonBtcAccountsPage
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {/* VIEW 4: Dedicated Official Blog & Guides Page (/blog) */}
        {currentPage === 'blog' && (
          <BlogPage
            onNavigateHome={() => navigateTo('home')}
            onExploreAccounts={() => navigateTo('all-accounts')}
          />
        )}

        {/* VIEW 5: Dedicated FAQ & Warranty Page (/faq) */}
        {currentPage === 'faq' && (
          <FaqPage
            onNavigateHome={() => navigateTo('home')}
            onOpenContact={() => navigateTo('contact')}
          />
        )}

        {/* VIEW 6: Dedicated Safety & Anti-Ban Warm-up Guide Page (/safety-guide) */}
        {currentPage === 'safety-guide' && (
          <SafetyGuidePage
            onNavigateHome={() => navigateTo('home')}
            onExploreAccounts={() => navigateTo('all-accounts')}
          />
        )}

        {/* VIEW 7: Dedicated Bulk Orders & Wholesale Page (/bulk-orders) */}
        {currentPage === 'bulk-orders' && (
          <BulkOrdersPage
            onNavigateHome={() => navigateTo('home')}
            onBulkCheckout={(items) => {
              setCheckoutItems(items);
              setIsCheckoutOpen(true);
            }}
          />
        )}

        {/* VIEW 8: Dedicated Contact & Official Support Desk Page (/contact) */}
        {currentPage === 'contact' && (
          <ContactPage
            onNavigateHome={() => navigateTo('home')}
            onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
          />
        )}

        {/* VIEW 9: HTML & XML Sitemap Index (/sitemap) */}
        {currentPage === 'sitemap' && (
          <SitemapPage
            onNavigate={(page) => navigateTo(page)}
            onSelectProduct={(product) => handleBuyNow(product)}
            onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
          />
        )}

        {/* VIEW 10: 404 Not Found Page */}
        {currentPage === 'not-found' && (
          <NotFoundPage
            onNavigateHome={() => navigateTo('home')}
            onNavigate={(page) => navigateTo(page)}
            onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
          />
        )}

        {/* VIEW 11: Primary Home Overview (/) */}
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              onExploreClick={scrollToAccounts}
              onSelectBtc={handleSelectBtc}
            />

            {/* Product Cards Grid with Filters */}
            <ProductGrid
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onBuyNow={handleBuyNow}
              onAddToCart={handleAddToCart}
            />

            {/* Smart Limit Calculator & Account Tier Recommender */}
            <AccountCalculator onSelectProduct={handleBuyNow} />

            {/* Interactive Virtual Account Inspector & Mockup */}
            <VirtualAccountPreview />

            {/* Comparison Matrix */}
            <ComparisonTable onBuyNow={handleBuyNow} />

            {/* Live Crypto Price & Network Fee Estimator */}
            <CryptoRateCalculator />

            {/* Anti-Ban 7-Day Warm-up Blueprint & Checklist */}
            <SafeLoginGuide />

            {/* Wholesale & Custom Agency Bundle Builder */}
            <BulkOrderConfigurator
              onBulkCheckout={(items) => {
                setCheckoutItems(items);
                setIsCheckoutOpen(true);
              }}
            />

            {/* Features & 4-Step Delivery Process */}
            <AccountFeatures />

            {/* In-depth 1200-1500 word SEO Content Article */}
            <SeoContentArticle />

            {/* Verified Customer Reviews */}
            <Testimonials />

            {/* Frequently Asked Questions */}
            <FaqSection />

            {/* Contact Us Channels */}
            <ContactSection />
          </>
        )}
      </main>

      {/* Styled Cash App Footer */}
      <Footer
        onSelectProduct={(p) => {
          handleBuyNow(p);
        }}
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
        onNavigate={navigateTo}
      />

      {/* Crypto Checkout Modal */}
      <CryptoCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={checkoutItems}
        onOrderCreated={handleOrderCreated}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedCartToCheckout}
      />

      {/* Real-time Order Tracking Modal */}
      <OrderLookupModal
        isOpen={isOrderLookupOpen}
        onClose={() => setIsOrderLookupOpen(false)}
        savedOrders={savedOrders}
      />

      {/* Floating Telegram & WhatsApp Bar (Bottom Right) */}
      <FloatingContactBar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Real-time Live Order Notification (Bottom Left) */}
      <LiveOrderNotification
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
      />
    </div>
  );
}
