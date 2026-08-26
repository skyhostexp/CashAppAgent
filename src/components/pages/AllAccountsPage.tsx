import React, { useState } from 'react';
import { AccountProduct } from '../../types';
import { ACCOUNT_PRODUCTS } from '../../data/products';
import { ProductCard } from '../ProductCard';
import { ShieldCheck, Search, Filter, Sparkles, SlidersHorizontal, ArrowLeft } from 'lucide-react';

interface AllAccountsPageProps {
  onBuyNow: (product: AccountProduct) => void;
  onAddToCart: (product: AccountProduct) => void;
  onNavigateHome: () => void;
}

export const AllAccountsPage: React.FC<AllAccountsPageProps> = ({
  onBuyNow,
  onAddToCart,
  onNavigateHome
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'btc' | 'non-btc'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'limit-high'>('recommended');

  const filteredProducts = ACCOUNT_PRODUCTS.filter((p) => {
    if (filterCategory === 'btc' && !p.btcEnabled) return false;
    if (filterCategory === 'non-btc' && p.btcEnabled) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.limitDisplay.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'limit-high') return b.limitValue - a.limitValue;
    return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
  });

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#00D632] transition-colors bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <span className="text-xs font-semibold text-slate-500">
          Showing {filteredProducts.length} Verified Accounts
        </span>
      </div>

      {/* Page Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1810] via-[#09130c] to-[#070e0a] border border-emerald-500/20 p-8 sm:p-12 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00D632]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-black text-[#00D632]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FULL INVENTORY &bull; AGED 2021–2024</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            All Verified <span className="text-[#00D632]">Cash App</span> Accounts
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Browse our complete live stock of identity-verified USA Cash App accounts. Every account is provisioned with Sutton Bank routing, full SSN verification, primary email login access, and our standard 30-day replacement warranty.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Field */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search limits, BTC, price..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-slate-700/80 focus:border-[#00D632] rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterCategory === 'all'
                ? 'bg-[#00D632] text-black shadow-[0_0_15px_rgba(0,214,50,0.3)]'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Accounts ({ACCOUNT_PRODUCTS.length})
          </button>
          <button
            onClick={() => setFilterCategory('btc')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              filterCategory === 'btc'
                ? 'bg-[#00D632] text-black shadow-[0_0_15px_rgba(0,214,50,0.3)]'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>BTC Enabled</span>
          </button>
          <button
            onClick={() => setFilterCategory('non-btc')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterCategory === 'non-btc'
                ? 'bg-[#00D632] text-black shadow-[0_0_15px_rgba(0,214,50,0.3)]'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Non-BTC USD
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-black/50 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-bold text-slate-300 outline-none focus:border-[#00D632]"
          >
            <option value="recommended">Featured / Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="limit-high">Highest Limit</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
          <p className="text-base text-slate-400">No accounts match your current search query.</p>
          <button
            onClick={() => { setSearchQuery(''); setFilterCategory('all'); }}
            className="text-xs font-bold text-[#00D632] underline"
          >
            Clear Filters
          </button>
        </div>
      ) : (
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
      )}

      {/* Safety & Guarantee Reassurance Footer */}
      <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-800/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-[#00D632] shrink-0" />
          <div>
            <span className="font-bold text-white block">Escrow &amp; Replacement Assurance</span>
            <span>All accounts come with automated credentials delivery and 30 days of direct technical warranty.</span>
          </div>
        </div>
        <button
          onClick={onNavigateHome}
          className="text-xs font-bold text-[#00D632] hover:underline whitespace-nowrap"
        >
          View Full Warranty Policy &rarr;
        </button>
      </div>
    </div>
  );
};
