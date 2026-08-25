import React, { useState } from 'react';
import { ACCOUNT_PRODUCTS } from '../data/products';
import { AccountProduct, CartItem } from '../types';
import { 
  Building2, 
  Percent, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Minus, 
  Plus, 
  ShieldCheck, 
  Zap,
  ShoppingBag
} from 'lucide-react';

interface BulkOrderConfiguratorProps {
  onBulkCheckout: (items: CartItem[]) => void;
}

export const BulkOrderConfigurator: React.FC<BulkOrderConfiguratorProps> = ({ onBulkCheckout }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'btc-10k': 2,
    'btc-25k': 1,
    'non-btc-15k': 0,
    'btc-4k': 0,
    'non-btc-10k': 0,
    'non-btc-4k': 0,
  });

  const handleUpdate = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  // Calculate items and counts
  const totalCount: number = (Object.values(quantities) as number[]).reduce((a: number, b: number) => a + b, 0);

  // Discount rule:
  // 1-2: 0%
  // 3-4: 5%
  // 5-9: 10%
  // 10+: 15%
  const discountRate: number = totalCount >= 10 ? 0.15 : totalCount >= 5 ? 0.10 : totalCount >= 3 ? 0.05 : 0;

  const subtotal: number = (Object.entries(quantities) as [string, number][]).reduce((acc: number, [id, qty]) => {
    const product = ACCOUNT_PRODUCTS.find(p => p.id === id);
    return acc + (product ? product.price * qty : 0);
  }, 0);

  const discountAmount = Math.round(subtotal * discountRate);
  const finalTotal = subtotal - discountAmount;

  const handleProceed = () => {
    const items: CartItem[] = [];
    (Object.entries(quantities) as [string, number][]).forEach(([id, qty]) => {
      if (qty > 0) {
        const product = ACCOUNT_PRODUCTS.find(p => p.id === id);
        if (product) {
          items.push({ product, quantity: qty });
        }
      }
    });

    if (items.length > 0) {
      onBulkCheckout(items);
    }
  };

  return (
    <section id="bulk" className="py-16 sm:py-20 bg-[#090d10] border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-[#00D632]" />
            Wholesale &amp; Bulk Agency Bundler
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Build Your <span className="text-[#00D632]">Custom Agency Package</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Mix and match verified BTC &amp; Non-BTC Cash App accounts with automatic progressive tier discounts up to 15% off.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Account Selector Matrix */}
          <div className="lg:col-span-7 space-y-3">
            {ACCOUNT_PRODUCTS.map((prod) => {
              const qty = quantities[prod.id] || 0;
              return (
                <div
                  key={prod.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    qty > 0
                      ? 'bg-[#0e1720] border-emerald-600/60 shadow-lg'
                      : 'bg-[#0c1217] border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-white font-['Outfit',sans-serif]">
                        {prod.name}
                      </span>
                      {prod.btcEnabled ? (
                        <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                          BTC Enabled
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                          USD Only
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400">
                      Limit: <strong className="text-slate-200">{prod.limitDisplay}</strong> &bull; ${prod.price} each
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-xl p-1 shrink-0">
                    <button
                      onClick={() => handleUpdate(prod.id, -1)}
                      disabled={qty === 0}
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white flex items-center justify-center cursor-pointer transition-colors"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="w-7 text-center font-mono font-bold text-sm text-white">
                      {qty}
                    </span>

                    <button
                      onClick={() => handleUpdate(prod.id, 1)}
                      className="w-8 h-8 rounded-lg bg-[#00D632] hover:bg-[#00BF2C] text-black font-bold flex items-center justify-center cursor-pointer transition-colors"
                      title="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Order Summary & Volume Discount Card */}
          <div className="lg:col-span-5 bg-[#0d141b] border-2 border-emerald-600/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-black text-white font-['Outfit',sans-serif] flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#00D632]" />
                <span>Bulk Bundle Summary</span>
              </h3>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-700/40">
                {totalCount} {totalCount === 1 ? 'Account' : 'Accounts'}
              </span>
            </div>

            {/* Discount Scale Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-[#00D632]" />
                  Progressive Discount Scale:
                </span>
                <span className="text-[#00D632] font-black font-mono">
                  {(discountRate * 100).toFixed(0)}% OFF APPLIED
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1 text-[10px] text-center pt-1 font-semibold">
                <div className={`p-1.5 rounded-lg border ${totalCount >= 3 && totalCount < 5 ? 'bg-emerald-950 text-emerald-300 border-emerald-600' : 'bg-black/30 text-slate-500 border-transparent'}`}>
                  3-4 Accounts: 5%
                </div>
                <div className={`p-1.5 rounded-lg border ${totalCount >= 5 && totalCount < 10 ? 'bg-emerald-950 text-emerald-300 border-emerald-600' : 'bg-black/30 text-slate-500 border-transparent'}`}>
                  5-9 Accounts: 10%
                </div>
                <div className={`p-1.5 rounded-lg border ${totalCount >= 10 ? 'bg-emerald-950 text-emerald-300 border-emerald-600' : 'bg-black/30 text-slate-500 border-transparent'}`}>
                  10+ Accounts: 15%
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2.5 text-xs text-slate-300 border-b border-slate-800 pb-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Regular Retail Subtotal:</span>
                <span className="text-white font-mono font-bold">${subtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Volume Discount Savings:</span>
                  <span className="font-mono">-${discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                <span>Final Bulk Price:</span>
                <span className="text-2xl text-[#00D632] font-mono font-black">${finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Inclusions */}
            <div className="space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00D632] shrink-0" />
                <span>Distinct SSN and identity files for each account</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00D632] shrink-0" />
                <span>Organized in structured spreadsheet (.CSV / .TXT)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00D632] shrink-0" />
                <span>30-Day individual replacement warranty on all accounts</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="bulk-checkout-btn"
              onClick={handleProceed}
              disabled={totalCount === 0}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00A827] via-[#00D632] to-[#00FF44] hover:from-[#00B82B] disabled:opacity-50 text-black font-black text-sm shadow-xl shadow-[#00D632]/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Instant Bulk Crypto Checkout (${finalTotal.toLocaleString()})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
