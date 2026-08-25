import React, { useState } from 'react';
import { AccountProduct } from '../types';
import { 
  Bitcoin, 
  Check, 
  ShieldCheck, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  ShoppingBag, 
  CreditCard,
  Lock,
  ArrowRight
} from 'lucide-react';

interface ProductCardProps {
  product: AccountProduct;
  onBuyNow: (product: AccountProduct) => void;
  onAddToCart: (product: AccountProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onBuyNow,
  onAddToCart
}) => {
  const [showSpecs, setShowSpecs] = useState(false);

  const isBtc = product.btcEnabled;

  return (
    <div
      id={`product-card-${product.id}`}
      className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
        product.isPopular
          ? 'bg-gradient-to-b from-[#14231b] via-[#0e161c] to-[#0a0f13] border-2 border-[#00D632] shadow-2xl shadow-[#00D632]/20 ring-1 ring-[#00D632]/40'
          : 'bg-[#0d141b] border border-slate-800 hover:border-emerald-700/60 shadow-xl hover:shadow-2xl'
      }`}
    >
      {/* Top Banner Tag */}
      {product.tag && (
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md ${
              product.isPopular
                ? 'bg-[#00D632] text-black ring-2 ring-black/40'
                : isBtc
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-emerald-950 text-emerald-300 border border-emerald-700/50'
            }`}
          >
            {product.tag}
          </span>
        </div>
      )}

      <div className="p-6 sm:p-7 space-y-5">
        {/* Category & Badge */}
        <div className="flex items-center gap-2">
          {isBtc ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F7931A]/15 text-[#F7931A] border border-[#F7931A]/30 text-xs font-bold">
              <Bitcoin className="w-3.5 h-3.5" />
              BTC Enabled
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-700/40 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00D632]" />
              USD Verified (Non-BTC)
            </span>
          )}
          <span className="text-xs text-slate-400 font-medium">Instant Stock</span>
        </div>

        {/* Product Title & Limit */}
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight font-['Outfit',sans-serif] group-hover:text-[#00D632] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        {/* Pricing Display */}
        <div className="p-4 rounded-2xl bg-black/40 border border-slate-800/80 flex items-baseline justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Account Price</div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-white font-['Outfit',sans-serif]">
                ${product.price}
              </span>
              <span className="text-xs font-bold text-[#00D632]">USD</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sending Limit</div>
            <div className="text-sm font-black text-emerald-400">
              {product.limitDisplay}
            </div>
          </div>
        </div>

        {/* Core Checklist */}
        <div className="space-y-2.5 pt-1">
          {product.features.slice(0, 5).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
              <div className="p-0.5 rounded-full bg-[#00D632]/20 text-[#00D632] shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="leading-snug">{feat}</span>
            </div>
          ))}
        </div>

        {/* Expandable Specifications Sheet */}
        {showSpecs && (
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-xs space-y-2 animate-in fade-in">
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider border-b border-slate-700 pb-1">
              Technical Verification Specs
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400">Daily Max:</span>{' '}
                <strong className="text-white">{product.specs.dailyLimit}</strong>
              </div>
              <div>
                <span className="text-slate-400">Monthly:</span>{' '}
                <strong className="text-white">{product.specs.monthlyLimit}</strong>
              </div>
              <div>
                <span className="text-slate-400">BTC Transfer:</span>{' '}
                <strong className={isBtc ? 'text-[#00D632]' : 'text-slate-400'}>
                  {product.specs.btcWithdrawal}
                </strong>
              </div>
              <div>
                <span className="text-slate-400">Direct Deposit:</span>{' '}
                <strong className="text-white">{product.specs.directDeposit}</strong>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400">Documents:</span>{' '}
                <strong className="text-emerald-300">{product.specs.documents}</strong>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowSpecs(!showSpecs)}
          className="text-xs font-semibold text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors pt-1"
        >
          <span>{showSpecs ? 'Hide detailed specs' : 'View full account specs & documents'}</span>
          {showSpecs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Card Actions */}
      <div className="p-6 sm:p-7 pt-0 space-y-2.5">
        <button
          id={`buy-now-btn-${product.id}`}
          onClick={() => onBuyNow(product)}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00A827] via-[#00D632] to-[#00FF44] hover:from-[#00B82B] hover:to-[#00FF55] text-black font-black text-sm rounded-xl shadow-lg shadow-[#00D632]/25 hover:shadow-[#00D632]/40 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-black" />
          <span>Buy Now &bull; ${product.price} (Crypto)</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        <button
          id={`add-cart-btn-${product.id}`}
          onClick={() => onAddToCart(product)}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};
