import React, { useState, useEffect } from 'react';
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

// Dedicated Page View Components
import { AllAccountsPage } from './components/pages/AllAccountsPage';
import { BtcAccountsPage } from './components/pages/BtcAccountsPage';
import { NonBtcAccountsPage } from './components/pages/NonBtcAccountsPage';
import { FaqPage } from './components/pages/FaqPage';
import { SafetyGuidePage } from './components/pages/SafetyGuidePage';
import { BulkOrdersPage } from './components/pages/BulkOrdersPage';
import { ContactPage } from './components/pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>(() => {
    try {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'all-accounts' || hash === 'accounts' || hash === 'catalog') return 'all-accounts';
      if (hash === 'btc-accounts' || hash === 'btc-enabled' || hash === 'btc') return 'btc-accounts';
      if (hash === 'non-btc-accounts' || hash === 'non-btc') return 'non-btc-accounts';
      if (hash === 'faq' || hash === 'help') return 'faq';
      if (hash === 'safety-guide' || hash === 'safety') return 'safety-guide';
      if (hash === 'bulk-orders' || hash === 'bulk') return 'bulk-orders';
      if (hash === 'contact' || hash === 'support') return 'contact';
      return 'home';
    } catch {
      return 'home';
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<'all' | AccountCategory>('all');
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cashappsagent_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedOrders, setSavedOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('cashappsagent_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [isOrderLookupOpen, setIsOrderLookupOpen] = useState(false);

  // Sync hash with browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'all-accounts' || hash === 'accounts' || hash === 'catalog') setCurrentPage('all-accounts');
      else if (hash === 'btc-accounts' || hash === 'btc-enabled' || hash === 'btc') setCurrentPage('btc-accounts');
      else if (hash === 'non-btc-accounts' || hash === 'non-btc') setCurrentPage('non-btc-accounts');
      else if (hash === 'faq' || hash === 'help') setCurrentPage('faq');
      else if (hash === 'safety-guide' || hash === 'safety') setCurrentPage('safety-guide');
      else if (hash === 'bulk-orders' || hash === 'bulk') setCurrentPage('bulk-orders');
      else if (hash === 'contact' || hash === 'support') setCurrentPage('contact');
      else if (hash === '' || hash === 'home') setCurrentPage('home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('cashappsagent_cart', JSON.stringify(cart));
    } catch {
      // safe fallback
    }
  }, [cart]);

  // Sync orders to local storage
  useEffect(() => {
    try {
      localStorage.setItem('cashappsagent_orders', JSON.stringify(savedOrders));
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

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="min-h-screen bg-[#0b0f12] text-slate-100 selection:bg-[#00D632] selection:text-black flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
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
        {/* VIEW 1: Dedicated All Accounts Page */}
        {currentPage === 'all-accounts' && (
          <AllAccountsPage
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {/* VIEW 2: Dedicated BTC Enabled Accounts Page */}
        {currentPage === 'btc-accounts' && (
          <BtcAccountsPage
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {/* VIEW 3: Dedicated Non-BTC USD Accounts Page */}
        {currentPage === 'non-btc-accounts' && (
          <NonBtcAccountsPage
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {/* VIEW 4: Dedicated FAQ & Warranty Page */}
        {currentPage === 'faq' && (
          <FaqPage
            onNavigateHome={() => navigateTo('home')}
            onOpenContact={() => navigateTo('contact')}
          />
        )}

        {/* VIEW 5: Dedicated Safety & Anti-Ban Warm-up Guide Page */}
        {currentPage === 'safety-guide' && (
          <SafetyGuidePage
            onNavigateHome={() => navigateTo('home')}
            onExploreAccounts={() => navigateTo('all-accounts')}
          />
        )}

        {/* VIEW 6: Dedicated Bulk Orders & Wholesale Page */}
        {currentPage === 'bulk-orders' && (
          <BulkOrdersPage
            onNavigateHome={() => navigateTo('home')}
            onBulkCheckout={(items) => {
              setCheckoutItems(items);
              setIsCheckoutOpen(true);
            }}
          />
        )}

        {/* VIEW 7: Dedicated Contact & Official Support Desk Page */}
        {currentPage === 'contact' && (
          <ContactPage
            onNavigateHome={() => navigateTo('home')}
            onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
          />
        )}

        {/* VIEW 8: Primary Home Overview */}
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

      {/* Floating Telegram, WhatsApp & Cart Bar */}
      <FloatingContactBar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
