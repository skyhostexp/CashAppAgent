import React from 'react';
import { CartItem } from '../types';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const totalUsd = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d141b] border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Top Bar */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00D632] text-black font-black flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-black" />
              </div>
              <div>
                <h3 className="text-base font-black text-white font-['Outfit',sans-serif]">
                  Your Cart ({items.length})
                </h3>
                <span className="text-[11px] text-emerald-400 font-medium">Instant Crypto Checkout</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <div className="text-base font-bold text-white">Your cart is empty</div>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Explore our verified BTC Enabled or Non-BTC Cash App accounts and add your preferred tier.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-[#00D632] text-black font-extrabold text-xs"
                >
                  Browse Accounts
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {item.product.limitDisplay} Limit
                      </div>
                      <h4 className="text-sm font-black text-white">
                        {item.product.name}
                      </h4>
                      <div className="text-xs text-emerald-400 font-bold mt-0.5">
                        ${item.product.price} USD / unit
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                      title="Remove from cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-2 bg-slate-900 rounded-lg p-1 border border-slate-800">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                        title="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-bold text-white min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                        title="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] text-slate-400">Subtotal:</div>
                      <div className="text-sm font-black text-white">
                        ${item.product.price * item.quantity} USD
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Checkout Section */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-900/80 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Delivery Fee:</span>
                  <span className="text-[#00D632] font-bold">FREE (Automated Instant)</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Replacement Warranty:</span>
                  <span className="text-white font-bold">30 Days Included</span>
                </div>
                <div className="flex items-center justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                  <span>Total Amount:</span>
                  <span className="text-[#00D632] font-['Outfit',sans-serif] text-xl">
                    ${totalUsd} USD
                  </span>
                </div>
              </div>

              <button
                id="cart-proceed-checkout-btn"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00A827] via-[#00D632] to-[#00FF44] hover:from-[#00B82B] text-black font-black text-sm shadow-xl shadow-[#00D632]/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Proceed to Instant Checkout (${totalUsd})</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00D632]" />
                <span>BSC &bull; TRX &bull; ETH &bull; SOL &bull; BTC &bull; LTC &bull; DOGE &bull; <strong className="text-pink-300">SKRILL</strong></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
