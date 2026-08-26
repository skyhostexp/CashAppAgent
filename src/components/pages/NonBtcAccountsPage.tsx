import React from 'react';
import { AccountProduct } from '../../types';
import { ACCOUNT_PRODUCTS } from '../../data/products';
import { ProductCard } from '../ProductCard';
import { ShieldCheck, CreditCard, Landmark, ArrowLeft, CheckCircle2, DollarSign } from 'lucide-react';

interface NonBtcAccountsPageProps {
  onBuyNow: (product: AccountProduct) => void;
  onAddToCart: (product: AccountProduct) => void;
  onNavigateHome: () => void;
}

export const NonBtcAccountsPage: React.FC<NonBtcAccountsPageProps> = ({
  onBuyNow,
  onAddToCart,
  onNavigateHome
}) => {
  const nonBtcProducts = ACCOUNT_PRODUCTS.filter((p) => !p.btcEnabled);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#00D632] transition-colors bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <span className="text-xs font-semibold text-slate-500">
          Showing {nonBtcProducts.length} Non-BTC USD Accounts
        </span>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071711] via-[#05110c] to-[#030907] border border-emerald-500/30 p-8 sm:p-12 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00D632]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-xs font-black text-[#00D632]">
            <DollarSign className="w-4 h-4 text-[#00D632]" />
            <span>USD TRANSACTION ENGINE &bull; SUTTON BANK ROUTING</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Non-BTC <span className="text-[#00D632]">USD Cash App</span> Accounts
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            High-limit, cost-effective verified Cash App accounts for standard USD peer-to-peer transfers, direct deposits, invoicing, and debit card usage. Ideal for business operations and daily payroll transfers.
          </p>
        </div>
      </div>

      {/* Core Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-900/30 space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-[#00D632]">
            <Landmark className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Sutton Bank Routing &amp; Account</h3>
          <p className="text-xs text-slate-400">
            Dedicated US bank routing number and account number ready to accept payroll ACH transfers and wire settlements.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-900/30 space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-[#00D632]">
            <CreditCard className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Cash Card Virtual Card Access</h3>
          <p className="text-xs text-slate-400">
            Instant virtual Cash Card access for online POS checkouts, SaaS subscriptions, and Apple Pay/Google Pay linking.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-900/30 space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-[#00D632]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Lowest Entry Cost</h3>
          <p className="text-xs text-slate-400">
            Enjoy fully aged and verified account infrastructure without the added premium of BTC wallet verification modules.
          </p>
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>Available Non-BTC Tiers</span>
          <span className="text-xs font-mono text-[#00D632] bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
            {nonBtcProducts.length} In Stock
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {nonBtcProducts.map((product) => (
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
