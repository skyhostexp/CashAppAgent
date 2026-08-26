import React, { useState } from 'react';
import { ACCOUNT_PRODUCTS } from '../data/products';
import { AccountCategory, AccountProduct } from '../types';
import { ProductCard } from './ProductCard';
import { Bitcoin, ShieldCheck, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProductGridProps {
  selectedCategory: 'all' | AccountCategory;
  onCategoryChange: (category: 'all' | AccountCategory) => void;
  onBuyNow: (product: AccountProduct) => void;
  onAddToCart: (product: AccountProduct) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  selectedCategory,
  onCategoryChange,
  onBuyNow,
  onAddToCart
}) => {
  const [filterQuery, setFilterQuery] = useState<'all' | 'budget' | 'high-limit'>('all');

  const filteredProducts = ACCOUNT_PRODUCTS.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (filterQuery === 'budget' && item.price > 250) {
      return false;
    }
    if (filterQuery === 'high-limit' && item.limitValue < 10000) {
      return false;
    }
    return true;
  });

  const btcCount = ACCOUNT_PRODUCTS.filter(p => p.category === 'btc-enabled').length;
  const nonBtcCount = ACCOUNT_PRODUCTS.filter(p => p.category === 'non-btc').length;

  return (
    <section id="accounts" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#00D632]" />
            Official Pricing &amp; Available Tiers
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Verified <span className="text-[#00D632]">Cash App Accounts</span> for Sale
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Choose your required tier below. All accounts are aged, 100% ID &amp; SSN verified, linked with virtual card details, clean webmail login, and backed by a 30-day replacement warranty.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          <button
            id="tab-all-accounts"
            onClick={() => onCategoryChange('all')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#00D632] text-black shadow-lg shadow-[#00D632]/25 scale-105'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>All Categories ({ACCOUNT_PRODUCTS.length})</span>
          </button>

          <button
            id="tab-btc-enabled"
            onClick={() => onCategoryChange('btc-enabled')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              selectedCategory === 'btc-enabled'
                ? 'bg-gradient-to-r from-[#F7931A] to-amber-500 text-black shadow-lg shadow-amber-500/25 scale-105'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Bitcoin className="w-4 h-4 text-[#F7931A]" />
            <span>BTC Enabled CashApp ({btcCount})</span>
            <span className="bg-black/30 text-white text-[10px] px-1.5 py-0.2 rounded-full">
              Hot
            </span>
          </button>

          <button
            id="tab-non-btc"
            onClick={() => onCategoryChange('non-btc')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              selectedCategory === 'non-btc'
                ? 'bg-[#00D632] text-black shadow-lg shadow-[#00D632]/25 scale-105'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Non-BTC CashApp ({nonBtcCount})</span>
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuyNow={onBuyNow}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* Bottom Trust Guarantee Strip */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/40 border border-emerald-700/30 flex flex-wrap items-center justify-around gap-4 text-xs font-semibold text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00D632]" />
            <span>Automated Instant 5-15 Min Crypto Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00D632]" />
            <span>30-Day Full Replacement Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00D632]" />
            <span>Primary Clean Webmail Included</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00D632]" />
            <span>24/7 Priority Support via Telegram</span>
          </div>
        </div>
      </div>
    </section>
  );
};
