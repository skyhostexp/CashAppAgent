import React, { useState } from 'react';
import { AccountProduct } from '../types';
import { 
  X, 
  Bitcoin, 
  ShieldCheck, 
  Zap, 
  ShoppingBag, 
  Check, 
  Copy, 
  Key, 
  Tag as TagIcon, 
  FileText, 
  Info, 
  Building2, 
  CreditCard, 
  Lock, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface ProductDetailsModalProps {
  product: AccountProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onBuyNow: (product: AccountProduct) => void;
  onAddToCart: (product: AccountProduct) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  onBuyNow,
  onAddToCart
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen || !product) return null;

  const isBtc = product.btcEnabled;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-[#0d141b] border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-[#101b22] to-slate-900 border-b border-slate-800 flex items-start justify-between gap-4 sticky top-0 z-20">
          <div className="space-y-2">
            <div className="flex items-center flex-wrap gap-2">
              {isBtc ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7931A]/20 text-[#F7931A] border border-[#F7931A]/40 text-xs font-black">
                  <Bitcoin className="w-3.5 h-3.5" />
                  BTC Enabled
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700/50 text-xs font-black">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00D632]" />
                  USD Non-BTC Verified
                </span>
              )}
              {product.tag && (
                <span className="px-3 py-1 rounded-full bg-[#00D632]/15 border border-[#00D632]/40 text-[#00D632] text-xs font-black">
                  {product.tag}
                </span>
              )}
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[11px] font-bold">
                Tier: {product.limitDisplay}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
              {product.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar">
          
          {/* Price & Primary Limit Ribbon */}
          <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Account Price</div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-black text-white font-['Outfit',sans-serif]">
                  ${product.price}
                </span>
                <span className="text-xs font-bold text-[#00D632]">USD</span>
                <span className="text-xs text-slate-400 ml-2">(Pay with Crypto, Skrill, or Bank Wire)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Authorized Limit</div>
              <div className="text-lg font-black text-emerald-400 font-mono">
                {product.limitDisplay}
              </div>
            </div>
          </div>

          {/* Product Short Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
              <Info className="w-4 h-4 text-[#00D632]" />
              <span>Product Short Description</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-200 text-sm leading-relaxed font-medium">
              {product.shortDesc}
            </div>
          </div>

          {/* Product Focus Keyword & Tag Cloud */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Focus Keyword */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Key className="w-3.5 h-3.5" />
                  <span>Product Focus Keyword</span>
                </div>
                <button
                  onClick={() => handleCopy(product.focusKeyword, 'focus-key')}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'focus-key' ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3 h-3" /> Copy Keyword
                    </span>
                  )}
                </button>
              </div>
              <div className="p-2.5 rounded-xl bg-black/60 border border-slate-800/90 font-mono text-xs text-emerald-300 font-semibold select-all break-all">
                {product.focusKeyword}
              </div>
            </div>

            {/* Product Tags */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider">
                <TagIcon className="w-3.5 h-3.5" />
                <span>Product Tags</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.tags && product.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-bold"
                  >
                    #{t.replace(/\s+/g, '-')}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Product Full Description */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
              <FileText className="w-4 h-4 text-[#00D632]" />
              <span>Product Description (Full Dossier)</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 text-sm leading-relaxed space-y-3">
              <p>{product.description}</p>
            </div>
          </div>

          {/* Verification & Technical Specs Matrix */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Technical Verification Specifications
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Daily Limit</div>
                <div className="text-sm font-black text-white font-mono mt-0.5">{product.specs.dailyLimit}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Weekly Limit</div>
                <div className="text-sm font-black text-emerald-400 font-mono mt-0.5">{product.specs.weeklyLimit}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Monthly Limit</div>
                <div className="text-sm font-black text-white font-mono mt-0.5">{product.specs.monthlyLimit}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">BTC Withdrawal</div>
                <div className="text-sm font-black text-[#F7931A] font-mono mt-0.5">{product.specs.btcWithdrawal}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Direct Deposit Bank</div>
                <div className="text-sm font-bold text-white mt-0.5 truncate">{product.specs.directDeposit}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Documents Included</div>
                <div className="text-sm font-bold text-emerald-300 mt-0.5 truncate">{product.specs.documents}</div>
              </div>
            </div>
          </div>

          {/* Included Features List */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Complete Delivery Package Inclusions
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.features.map((feat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00D632] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 sm:p-8 bg-slate-900/95 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-20">
          <div className="text-center sm:text-left">
            <div className="text-xs text-slate-400 font-medium">Instant Automated Delivery</div>
            <div className="text-sm font-bold text-white">Delivered in 5-15 mins via Email &amp; Telegram</div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex-1 sm:flex-initial px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-slate-300" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onBuyNow(product);
              }}
              className="flex-1 sm:flex-initial px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#00A827] via-[#00D632] to-[#00FF44] hover:from-[#00B82B] hover:to-[#00FF55] text-black font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-[#00D632]/25 hover:shadow-[#00D632]/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Buy Now (${product.price} USD)</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
