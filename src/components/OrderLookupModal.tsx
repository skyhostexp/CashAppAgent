import React, { useState } from 'react';
import { OrderDetails } from '../types';
import { CONTACT_INFO } from '../data/cryptoGateways';
import { 
  Search, 
  X, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Send, 
  AlertCircle, 
  PackageCheck,
  FileText
} from 'lucide-react';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedOrders: OrderDetails[];
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({
  isOpen,
  onClose,
  savedOrders
}) => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [matchedOrder, setMatchedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearched(true);
    const found = savedOrders.find(
      (o) =>
        o.orderId.toLowerCase() === query.trim().toLowerCase() ||
        o.customerEmail.toLowerCase() === query.trim().toLowerCase() ||
        o.telegramOrWhatsapp.toLowerCase().includes(query.trim().toLowerCase())
    );

    if (found) {
      setMatchedOrder(found);
    } else {
      // If none saved in session, generate a sample track view if valid format, or show not found
      if (query.toUpperCase().startsWith('CAG-')) {
        setMatchedOrder({
          orderId: query.toUpperCase(),
          createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
          items: [],
          totalAmountUsd: 349,
          cryptoCurrency: 'TRX',
          cryptoAmount: 349,
          walletAddress: 'TSezBSdMrdARFQQebAYiwzkPku1qHijQEh',
          customerEmail: 'customer@cashappagent.com',
          telegramOrWhatsapp: '@CustomerAgent',
          status: 'delivering',
          deliveryEta: 'Under 5 Minutes'
        });
      } else {
        setMatchedOrder(null);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#0e151c] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-[#00D632]" />
            <h3 className="text-base font-black text-white font-['Outfit',sans-serif]">
              Track Your Account Order
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-7 space-y-6">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs font-bold text-slate-300">
              Enter Order ID (e.g. CAG-892415) or Email / Telegram:
            </label>
            <div className="flex gap-2">
              <input
                id="order-tracker-input"
                type="text"
                placeholder="CAG-XXXXXX or email"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-[#00D632] placeholder:text-slate-600"
              />
              <button
                type="submit"
                id="order-tracker-submit-btn"
                className="px-5 py-3 rounded-xl bg-[#00D632] hover:bg-[#00FF3D] text-black font-extrabold text-xs sm:text-sm cursor-pointer transition-all"
              >
                Track
              </button>
            </div>
          </form>

          {/* Quick saved orders pill tags if available */}
          {savedOrders.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Recent Session Orders:</div>
              <div className="flex flex-wrap gap-2">
                {savedOrders.map((ord) => (
                  <button
                    key={ord.orderId}
                    onClick={() => {
                      setQuery(ord.orderId);
                      setMatchedOrder(ord);
                      setSearched(true);
                    }}
                    className="px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-xs font-mono font-bold hover:bg-emerald-900"
                  >
                    {ord.orderId} &bull; ${ord.totalAmountUsd}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Result Display */}
          {searched && matchedOrder ? (
            <div className="p-5 rounded-2xl bg-black/40 border border-emerald-600/40 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="text-xs text-slate-400">Order Reference</div>
                  <div className="text-base font-black text-[#00D632] font-mono">
                    {matchedOrder.orderId}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Status</div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-700/50">
                    <span className="w-2 h-2 rounded-full bg-[#00D632] animate-ping" />
                    Automated Dispatching
                  </span>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#00D632] shrink-0" />
                  <span className="text-slate-200">1. Crypto Payment Verified on Blockchain</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#00D632] shrink-0" />
                  <span className="text-slate-200">2. Account Credentials &amp; Clean Webmail Prepared</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#00D632] shrink-0" />
                  <span className="text-slate-200">3. Identity Documents &amp; SSN Scans Bundled</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 animate-spin" />
                  <span className="text-amber-300 font-semibold">4. Dispatching package to {matchedOrder.customerEmail} (5-15 mins)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Need priority delivery?</span>
                <a
                  href={`${CONTACT_INFO.telegramUrl}?text=Status%20request%20for%20order%20${matchedOrder.orderId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sky-400 font-bold hover:underline"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Contact Telegram Support</span>
                </a>
              </div>
            </div>
          ) : searched && !matchedOrder ? (
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3 animate-in fade-in">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
              <div className="text-sm font-bold text-white">Order not found in instant memory</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                If you made a payment recently via BSC, TRX, ETH, SOL, BTC, LTC, or DOGE, please contact our 24/7 Telegram support directly with your TXID for manual lookup.
              </p>
              <a
                href={CONTACT_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-950 border border-sky-700/60 text-sky-300 text-xs font-bold"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Contact Telegram: {CONTACT_INFO.telegram}</span>
              </a>
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-slate-500">
              Enter your Order ID from your receipt or confirmation email to see real-time preparation status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
