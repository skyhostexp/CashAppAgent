import React from 'react';
import { ACCOUNT_PRODUCTS } from '../data/products';
import { AccountProduct } from '../types';
import { Check, X, Bitcoin, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface ComparisonTableProps {
  onBuyNow: (product: AccountProduct) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ onBuyNow }) => {
  return (
    <section id="comparison" className="py-16 sm:py-20 relative bg-[#090d10] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            Detailed Breakdown
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Compare <span className="text-[#00D632]">Account Limits</span> &amp; Features
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Compare all 6 verified Cash App account categories to find the exact volume limit and Bitcoin capability required for your transactions.
          </p>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-[#0d141b] shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                <th className="p-4 sm:p-5">Account Tier</th>
                <th className="p-4 sm:p-5">Price</th>
                <th className="p-4 sm:p-5">Weekly Limit</th>
                <th className="p-4 sm:p-5">BTC Withdrawal</th>
                <th className="p-4 sm:p-5">Cash Card</th>
                <th className="p-4 sm:p-5">Verification Docs</th>
                <th className="p-4 sm:p-5 text-right">Instant Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs font-medium">
              {ACCOUNT_PRODUCTS.map((prod) => {
                const isBtc = prod.btcEnabled;
                return (
                  <tr
                    key={prod.id}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      prod.isPopular ? 'bg-emerald-950/20' : ''
                    }`}
                  >
                    <td className="p-4 sm:p-5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                            isBtc
                              ? 'bg-[#F7931A]/20 text-[#F7931A] border border-[#F7931A]/40'
                              : 'bg-[#00D632]/20 text-[#00D632] border border-[#00D632]/40'
                          }`}
                        >
                          {isBtc ? <Bitcoin className="w-4 h-4" /> : '$'}
                        </div>
                        <div>
                          <div className="font-extrabold text-white text-sm flex items-center gap-1.5">
                            {prod.name}
                            {prod.isPopular && (
                              <span className="bg-[#00D632] text-black text-[9px] font-black px-1.5 rounded-full">
                                BEST
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {isBtc ? 'BTC & USD Enabled' : 'Standard USD High Limit'}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 sm:p-5 font-black text-sm text-white font-['Outfit',sans-serif]">
                      <span className="text-[#00D632]">${prod.price}</span> USD
                    </td>

                    <td className="p-4 sm:p-5">
                      <span className="font-extrabold text-slate-200">{prod.limitDisplay}</span>
                      <div className="text-[10px] text-slate-400">Daily: {prod.specs.dailyLimit}</div>
                    </td>

                    <td className="p-4 sm:p-5">
                      {isBtc ? (
                        <div className="flex items-center gap-1 text-[#00D632] font-bold">
                          <Check className="w-4 h-4" />
                          <span>Active ({prod.specs.btcWithdrawal.split(' ')[1] || 'On-chain'})</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-slate-500 font-semibold">
                          <X className="w-4 h-4" />
                          <span>USD Transfers Only</span>
                        </div>
                      )}
                    </td>

                    <td className="p-4 sm:p-5">
                      <span className="text-slate-300 font-semibold">{prod.specs.cashCard}</span>
                    </td>

                    <td className="p-4 sm:p-5">
                      <span className="text-emerald-300 font-semibold">{prod.specs.documents}</span>
                    </td>

                    <td className="p-4 sm:p-5 text-right">
                      <button
                        onClick={() => onBuyNow(prod)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00D632] hover:bg-[#00FF3D] text-black font-black text-xs shadow-md shadow-[#00D632]/20 cursor-pointer active:scale-95 transition-all"
                      >
                        <span>Buy ${prod.price}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
