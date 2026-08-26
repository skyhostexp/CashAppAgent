import React from 'react';
import { AccountProduct } from '../../types';
import { ACCOUNT_PRODUCTS } from '../../data/products';
import { ProductCard } from '../ProductCard';
import { Bitcoin, Zap, ShieldCheck, ArrowLeft, CheckCircle2, Lock, ArrowUpRight } from 'lucide-react';

interface BtcAccountsPageProps {
  onBuyNow: (product: AccountProduct) => void;
  onAddToCart: (product: AccountProduct) => void;
  onNavigateHome: () => void;
}

export const BtcAccountsPage: React.FC<BtcAccountsPageProps> = ({
  onBuyNow,
  onAddToCart,
  onNavigateHome
}) => {
  const btcProducts = ACCOUNT_PRODUCTS.filter((p) => p.btcEnabled);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#F7931A] transition-colors bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <span className="text-xs font-semibold text-slate-500">
          Showing {btcProducts.length} BTC-Enabled Accounts
        </span>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c1204] via-[#140c02] to-[#0a0701] border border-amber-500/30 p-8 sm:p-12 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F7931A]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/90 border border-amber-500/40 text-xs font-black text-[#F7931A]">
            <Bitcoin className="w-4 h-4 text-[#F7931A]" />
            <span>INSTANT ON-CHAIN CLEARANCE &bull; 0 HOLD TIME</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            BTC Enabled <span className="text-[#F7931A]">Cash App</span> Accounts
          </h1>
          <p className="text-sm sm:text-base text-amber-100/80 leading-relaxed">
            Fully verified Bitcoin wallet functionality with instantaneous deposit, on-chain external blockchain withdrawal, and high limits up to $25,000/week. Bypass standard wait times and purchase pre-cleared crypto nodes.
          </p>
        </div>
      </div>

      {/* Key Advantages Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-amber-500/20 space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-[#F7931A]">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Direct External Wallet Sending</h3>
          <p className="text-xs text-slate-400">
            Transfer directly to cold storage, hardware wallets (Ledger/Trezor), and external crypto exchanges without temporary hold periods.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-amber-500/20 space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-[#F7931A]">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Full Identity Verification</h3>
          <p className="text-xs text-slate-400">
            Every BTC account passes formal KYC verification including US driver's license ID and SSN compliance, unlocking official limits.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-amber-500/20 space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-[#F7931A]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">30-Day Escrow Replacement</h3>
          <p className="text-xs text-slate-400">
            Guaranteed clean history. If any verification lock occurs during initial compliance warmup, we issue a prompt replacement.
          </p>
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>Available BTC Tiers</span>
          <span className="text-xs font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/30">
            {btcProducts.length} In Stock
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {btcProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuyNow={onBuyNow}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
