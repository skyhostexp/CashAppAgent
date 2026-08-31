import React from 'react';
import { CONTACT_INFO } from '../data/cryptoGateways';
import { 
  ShieldCheck, 
  Zap, 
  Bitcoin, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  Phone, 
  Lock, 
  Sparkles,
  CreditCard,
  TrendingUp
} from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onSelectBtc: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onSelectBtc }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-[#00D632]/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Value Proposition & Primary Keyword */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-600/40 text-emerald-300 text-xs sm:text-sm font-bold shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-[#00D632] animate-ping" />
              <span>Official Trusted Provider &bull; cashappagent.com</span>
            </div>

            {/* Main Keyword H1 Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] font-['Outfit',sans-serif]">
              Buy Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D632] via-[#00FF55] to-emerald-400">Cash App Accounts</span>
            </h1>

            {/* Optimized Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Get fully aged, 100% identity-verified <strong className="text-white">BTC Enabled &amp; Non-BTC Cash App Accounts</strong> with limits up to <span className="text-[#00D632] font-bold">$25,000/week</span>. Comes complete with primary email login, SSN/ID document scans, linked routing details, and guaranteed 5-minute crypto delivery.
            </p>

            {/* Key Value Feature Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-200">
                <ShieldCheck className="w-4 h-4 text-[#00D632] shrink-0" />
                <span>100% SSN &amp; ID Verified</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-200">
                <Bitcoin className="w-4 h-4 text-[#F7931A] shrink-0" />
                <span>BTC On-Chain Active</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-200 col-span-2 sm:col-span-1">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>5-15 Min Auto-Delivery</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                id="hero-explore-accounts-btn"
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#00A827] via-[#00D632] to-[#00FF44] hover:from-[#00B82B] hover:to-[#00FF55] text-black font-black text-base rounded-2xl shadow-xl shadow-[#00D632]/25 hover:shadow-[#00D632]/40 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Buy Verified Accounts</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <a
                id="hero-telegram-support-btn"
                href={CONTACT_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm sm:text-base rounded-2xl transition-all flex items-center justify-center gap-2.5 hover:border-sky-500/50"
              >
                <Send className="w-4 h-4 text-sky-400" />
                <span>Chat on Telegram</span>
              </a>
            </div>

            {/* Live Security & Payment Strip */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00D632]" />
                30-Day Replacement Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00D632]" />
                Crypto &amp; Skrill Secure Checkout
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#00D632]" />
                Original Gmail &amp; Recovery Keys
              </span>
            </div>
          </div>

          {/* Right Column: Visual Cash App Account Interactive Card Mockup */}
          <div className="lg:col-span-5 relative">
            {/* Floating Live Sale Notification Badge */}
            <div className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-2 bg-[#0e1720] border border-emerald-500/40 rounded-2xl shadow-xl animate-bounce">
              <span className="flex h-2 w-2 rounded-full bg-[#00D632]" />
              <div className="text-[11px] font-bold text-slate-200">
                Just sold: <span className="text-[#00D632]">BTC Enable 25k ($499)</span>
              </div>
            </div>

            {/* Main Interactive Card Container */}
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-emerald-500/40 via-emerald-800/20 to-slate-900 border border-emerald-500/30 shadow-2xl shadow-emerald-950/50">
              <div className="rounded-[22px] bg-[#0d141b] p-6 sm:p-7 space-y-6">
                {/* Header in Mockup */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00A827] to-[#00D632] flex items-center justify-center font-black text-black text-xl">
                      $
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        Cash App Pro Account
                        <span className="bg-[#00D632] text-black text-[9px] font-black px-1.5 py-0.2 rounded-full">
                          VERIFIED
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">Status: Tier-3 Active &bull; Fully KYC Cleared</div>
                    </div>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#00D632]" />
                </div>

                {/* Account Balance Mockup */}
                <div className="bg-gradient-to-br from-emerald-950/60 to-slate-900/90 rounded-2xl p-5 border border-emerald-700/30">
                  <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Weekly Transaction Limit</span>
                    <span className="text-white text-[11px] bg-emerald-900/60 px-2 py-0.5 rounded-md">Tier 3</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline gap-2">
                    <span>$25,000.00</span>
                    <span className="text-xs text-emerald-400 font-bold">/ week</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-emerald-900/40 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-slate-400 text-[11px]">BTC Status</div>
                      <div className="text-[#00D632] font-bold flex items-center gap-1">
                        <Bitcoin className="w-3.5 h-3.5 text-[#F7931A]" />
                        Deposit &amp; Send OK
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[11px]">Cash Card</div>
                      <div className="text-white font-bold flex items-center gap-1">
                        <CreditCard className="w-3.5 h-3.5 text-sky-400" />
                        Active &bull; CVV Ready
                      </div>
                    </div>
                  </div>
                </div>

                {/* Included Package Checklist */}
                <div className="space-y-2 text-xs">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Package Inclusions &bull; Ready To Use
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00D632] shrink-0" />
                      <span>Original Webmail Login</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00D632] shrink-0" />
                      <span>SSN &amp; Driver License</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00D632] shrink-0" />
                      <span>Sutton Bank Routing</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00D632] shrink-0" />
                      <span>Safe Anti-Ban Guide</span>
                    </div>
                  </div>
                </div>

                {/* Quick CTA to select BTC category */}
                <button
                  id="hero-mockup-quick-buy-btn"
                  onClick={onSelectBtc}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-[#00D632] text-slate-200 hover:text-black font-bold text-xs transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>View All BTC Enabled Accounts ($249 - $499)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
