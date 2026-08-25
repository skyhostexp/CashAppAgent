import React, { useState, useId } from 'react';
import { ACCOUNT_PRODUCTS } from '../data/products';
import { AccountProduct } from '../types';
import { 
  Calculator, 
  Bitcoin, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  Sliders,
  DollarSign
} from 'lucide-react';

interface AccountCalculatorProps {
  onSelectProduct: (product: AccountProduct) => void;
}

export const AccountCalculator: React.FC<AccountCalculatorProps> = ({ onSelectProduct }) => {
  const [monthlyVolume, setMonthlyVolume] = useState<number>(10000);
  const [needBtc, setNeedBtc] = useState<boolean>(true);
  const [dailyTxCount, setDailyTxCount] = useState<number>(5);

  // Find the best matching account based on criteria
  const recommendedProduct: AccountProduct = React.useMemo(() => {
    const pool = ACCOUNT_PRODUCTS.filter(p => (needBtc ? p.btcEnabled : true));
    
    if (monthlyVolume > 15000) {
      return pool.find(p => p.id === 'btc-25k') || pool[0];
    } else if (monthlyVolume > 6000) {
      return pool.find(p => p.id === (needBtc ? 'btc-10k' : 'non-btc-15k')) || pool[0];
    } else {
      return pool.find(p => p.id === (needBtc ? 'btc-4k' : 'non-btc-4k')) || pool[0];
    }
  }, [monthlyVolume, needBtc]);

  return (
    <section id="calculator" className="py-16 sm:py-20 bg-[#090e13] border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-[#00D632]" />
            Smart Account Recommender &amp; Limit Matcher
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Find the <span className="text-[#00D632]">Perfect Account</span> for Your Volume
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Specify your expected monthly transaction throughput and Bitcoin requirements to discover the most cost-efficient and safe Cash App account tier.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 bg-[#0d141b] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              {/* Monthly Volume Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="calculator-monthly-volume-slider" className="text-xs font-bold text-slate-300 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#00D632]" />
                    <span>Expected Monthly Transaction Volume:</span>
                  </label>
                  <span className="text-lg font-black text-[#00D632] font-mono bg-emerald-950/70 border border-emerald-700/40 px-3 py-1 rounded-xl">
                    ${monthlyVolume.toLocaleString()} / mo
                  </span>
                </div>
                
                <input
                  id="calculator-monthly-volume-slider"
                  type="range"
                  min={1000}
                  max={30000}
                  step={1000}
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00D632]"
                />

                <div className="flex justify-between text-[11px] font-bold text-slate-500">
                  <span>$1,000 (Starter)</span>
                  <span>$10,000 (Standard)</span>
                  <span>$25,000+ (High Volume)</span>
                </div>
              </div>

              {/* Bitcoin Capability Toggle */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Bitcoin className="w-4 h-4 text-[#F7931A]" />
                  <span>Do you require Bitcoin On-Chain Withdrawal / Trading?</span>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNeedBtc(true)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      needBtc
                        ? 'bg-amber-950/40 border-amber-500/80 shadow-lg shadow-amber-950/30'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-black text-white flex items-center gap-1.5">
                        <Bitcoin className="w-4 h-4 text-[#F7931A]" />
                        <span>Yes (BTC Enabled)</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Buy, sell, receive, &amp; withdraw BTC directly to hardware wallets.
                      </p>
                    </div>
                    {needBtc && <CheckCircle2 className="w-4 h-4 text-[#F7931A] shrink-0" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setNeedBtc(false)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      !needBtc
                        ? 'bg-emerald-950/40 border-emerald-500/80 shadow-lg shadow-emerald-950/30'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-black text-white flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#00D632]" />
                        <span>No (USD Only)</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Peer-to-peer USD transfers, debit payments, &amp; direct deposits.
                      </p>
                    </div>
                    {!needBtc && <CheckCircle2 className="w-4 h-4 text-[#00D632] shrink-0" />}
                  </button>
                </div>
              </div>

              {/* Daily Frequency Indicator */}
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-200">Recommended Daily Safety Margin</div>
                  <div className="text-[11px] text-slate-400">
                    Accounts are aged to prevent algorithmic holds during high velocity sending.
                  </div>
                </div>
                <div className="text-xs font-extrabold text-[#00D632] bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-700/30 shrink-0">
                  Optimal Health Score: 99.4%
                </div>
              </div>
            </div>

            {/* Quick Metrics Footer */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-[10px] text-slate-400">Estimated Delivery</div>
                <div className="text-xs font-black text-white">5 - 15 Mins</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Warranty Period</div>
                <div className="text-xs font-black text-[#00D632]">30 Days 100%</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Full Documents</div>
                <div className="text-xs font-black text-white">SSN + DL Scan</div>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Recommendation Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#0f1d16] to-[#0c1319] border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Top decorative glow */}
            <div className="absolute -right-12 -top-12 w-44 h-44 bg-[#00D632]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#00D632] text-black text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md shadow-[#00D632]/20">
                  <Sparkles className="w-3 h-3" />
                  Best Recommended Match
                </span>
                <span className="text-xs font-mono text-slate-400">Tier #{recommendedProduct.id}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white font-['Outfit',sans-serif] leading-snug">
                  {recommendedProduct.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {recommendedProduct.shortDesc}
                </p>
              </div>

              {/* Price & Limit Highlight */}
              <div className="p-4 rounded-2xl bg-black/40 border border-emerald-700/40 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400">One-time Investment</div>
                  <div className="text-3xl font-black text-white font-['Outfit',sans-serif]">
                    ${recommendedProduct.price}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-slate-400">Certified Limit</div>
                  <div className="text-xl font-black text-[#00D632] font-mono">
                    {recommendedProduct.limitDisplay}
                  </div>
                </div>
              </div>

              {/* Specifications Included */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Included in This Tier:
                </div>
                <div className="grid grid-cols-1 gap-2 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00D632] shrink-0" />
                    <span>{recommendedProduct.specs.btcWithdrawal}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00D632] shrink-0" />
                    <span>{recommendedProduct.specs.cashCard}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00D632] shrink-0" />
                    <span>{recommendedProduct.specs.directDeposit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00D632] shrink-0" />
                    <span>{recommendedProduct.specs.documents}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 relative z-10">
              <button
                id="calculator-buy-recommended-btn"
                onClick={() => onSelectProduct(recommendedProduct)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00A827] via-[#00D632] to-[#00FF44] hover:from-[#00B82B] text-black font-black text-sm shadow-xl shadow-[#00D632]/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Instant Checkout (${recommendedProduct.price})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-[10px] text-center text-slate-400 mt-2">
                🔒 Instant Auto-Delivery to Email/Telegram via Crypto Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
