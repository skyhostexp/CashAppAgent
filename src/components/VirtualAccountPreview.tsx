import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  CreditCard, 
  Bitcoin, 
  DollarSign, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Lock, 
  Smartphone, 
  Building2,
  Sparkles,
  QrCode
} from 'lucide-react';
import { CashAppLogo } from './CashAppLogo';

export const VirtualAccountPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'app' | 'btc' | 'card' | 'dossier'>('app');
  const [showCardDetails, setShowCardDetails] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="inspector" className="py-16 sm:py-20 bg-[#070b0e] relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5 text-[#00D632]" />
            Interactive Virtual Account Inspector
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Preview Your <span className="text-[#00D632]">Delivered Package</span> Live
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Explore the exact interface, Bitcoin withdrawal capabilities, virtual Cash Card, and full identity documentation included with your order.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          <button
            onClick={() => setActiveTab('app')}
            className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'app'
                ? 'bg-[#00D632] text-black shadow-lg shadow-[#00D632]/25 font-black'
                : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Cash App Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('btc')}
            className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'btc'
                ? 'bg-[#F7931A] text-black shadow-lg shadow-[#F7931A]/25 font-black'
                : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Bitcoin className="w-4 h-4" />
            <span>Bitcoin Withdrawal Tab</span>
          </button>

          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'card'
                ? 'bg-slate-100 text-black shadow-lg shadow-white/20 font-black'
                : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Virtual Cash Card</span>
          </button>

          <button
            onClick={() => setActiveTab('dossier')}
            className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'dossier'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 font-black'
                : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Delivered Credentials File</span>
          </button>
        </div>

        {/* Main Display Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center Phone Frame Simulator (5 cols) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm rounded-[42px] p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-2xl border-4 border-slate-700/80 relative">
              {/* Phone Speaker Notch */}
              <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800" />
              </div>

              {/* Phone Screen Canvas */}
              <div className="rounded-[32px] bg-[#000000] text-white p-5 min-h-[520px] flex flex-col justify-between border border-slate-900 relative overflow-hidden font-sans">
                
                {/* TAB 1: CASH APP DASHBOARD */}
                {activeTab === 'app' && (
                  <div className="space-y-6 animate-in fade-in zoom-in-95">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#00D632] flex items-center justify-center font-black text-black text-xs">
                          $
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1">
                            <span>$VerifiedUser</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00D632]" />
                          </div>
                          <div className="text-[10px] text-slate-400">USA Sutton Bank Active</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-[#00D632] text-[10px] font-extrabold border border-emerald-800">
                        100% VERIFIED
                      </span>
                    </div>

                    {/* Balance */}
                    <div className="text-center py-6 space-y-1">
                      <div className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">
                        Cash Balance
                      </div>
                      <div className="text-4xl font-black text-white font-['Outfit',sans-serif]">
                        $12,450<span className="text-[#00D632]">.00</span>
                      </div>
                      <div className="text-[11px] text-emerald-400 font-semibold flex items-center justify-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Sending Limit: $25,000 / week</span>
                      </div>
                    </div>

                    {/* Quick P2P Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <button className="py-3 rounded-2xl bg-[#00D632] text-black font-black text-xs flex items-center justify-center gap-1 shadow-md">
                        <ArrowUpRight className="w-4 h-4" />
                        <span>Pay / Send</span>
                      </button>
                      <button className="py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white font-black text-xs flex items-center justify-center gap-1">
                        <ArrowDownLeft className="w-4 h-4 text-[#00D632]" />
                        <span>Request</span>
                      </button>
                    </div>

                    {/* Banking Details Box */}
                    <div className="p-3.5 rounded-2xl bg-[#121212] border border-slate-800 space-y-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center justify-between">
                        <span>Sutton Bank Direct Deposit</span>
                        <Building2 className="w-3.5 h-3.5 text-[#00D632]" />
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Routing Number:</span>
                        <span className="text-white font-bold">041215663</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Account Number:</span>
                        <span className="text-emerald-300 font-bold">****7892</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: BITCOIN WALLET */}
                {activeTab === 'btc' && (
                  <div className="space-y-6 animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#F7931A] flex items-center justify-center font-black text-black text-xs">
                          <Bitcoin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Bitcoin On-Chain Wallet</div>
                          <div className="text-[10px] text-amber-400">Biometric Verification: Passed</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-400 text-[10px] font-extrabold border border-amber-800">
                        BTC ENABLED
                      </span>
                    </div>

                    <div className="text-center py-4 space-y-1">
                      <div className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">
                        BTC Balance
                      </div>
                      <div className="text-3xl font-black text-white font-['Outfit',sans-serif]">
                        0.4500 <span className="text-[#F7931A]">BTC</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        ≈ $43,200.00 USD
                      </div>
                    </div>

                    {/* BTC Actions */}
                    <div className="grid grid-cols-3 gap-2">
                      <button className="py-2.5 rounded-xl bg-[#F7931A] text-black font-black text-[11px] flex items-center justify-center gap-1">
                        <span>Buy BTC</span>
                      </button>
                      <button className="py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold text-[11px] flex items-center justify-center gap-1">
                        <span>Deposit</span>
                      </button>
                      <button className="py-2.5 rounded-xl bg-emerald-950 border border-emerald-600/50 text-[#00D632] font-black text-[11px] flex items-center justify-center gap-1">
                        <span>Withdraw</span>
                      </button>
                    </div>

                    {/* On-Chain Deposit Address Preview */}
                    <div className="p-3 rounded-2xl bg-[#121212] border border-slate-800 space-y-1.5 text-center">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">
                        Your Dedicated BTC Deposit Address
                      </div>
                      <div className="text-[11px] font-mono text-amber-300 break-all bg-black/60 p-2 rounded-xl border border-slate-800">
                        bc1q9v8t6e3f4w0k2p7m8h5z1a9y4x6c7d...
                      </div>
                      <div className="text-[9px] text-slate-500">
                        Zero deposit limits &bull; Auto-credited after 1 network confirmation
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: VIRTUAL CASH CARD */}
                {activeTab === 'card' && (
                  <div className="space-y-5 animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-[#00D632]" />
                        <span>Active Cash Card (Visa Debit)</span>
                      </div>
                      <button
                        onClick={() => setShowCardDetails(!showCardDetails)}
                        className="text-[10px] text-[#00D632] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                      >
                        {showCardDetails ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{showCardDetails ? 'Hide' : 'Reveal'} Details</span>
                      </button>
                    </div>

                    {/* Matte Black Visa Card Mockup */}
                    <div className="w-full aspect-[1.58/1] rounded-2xl bg-gradient-to-tr from-[#111111] via-[#1a1a1a] to-[#242424] border border-slate-700/80 p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#00D632] italic font-['Outfit',sans-serif]">
                          Cash App
                        </span>
                        <span className="text-xs font-bold text-slate-300 tracking-wider">
                          VISA DEBIT
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm font-mono tracking-widest text-slate-100 font-bold">
                          {showCardDetails ? '4147  2024  8901  4439' : '••••  ••••  ••••  4439'}
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span>EXP: {showCardDetails ? '08/29' : '••/••'}</span>
                          <span>CVV: {showCardDetails ? '842' : '•••'}</span>
                          <span>PIN: {showCardDetails ? '1942' : '••••'}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="uppercase font-bold tracking-wider text-slate-200">
                          VERIFIED ACCOUNT HOLDER
                        </span>
                        <span className="text-[#00D632] font-black text-[9px] bg-emerald-950 px-2 py-0.5 rounded">
                          APPLE / GOOGLE PAY READY
                        </span>
                      </div>
                    </div>

                    {/* Card Features List */}
                    <div className="space-y-1.5 text-[11px] text-slate-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00D632]" />
                        <span>Linkable to Apple Pay, Google Wallet &amp; PayPal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00D632]" />
                        <span>Instant online checkout &amp; ATM withdrawal ready</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: DELIVERED CREDENTIALS FILE */}
                {activeTab === 'dossier' && (
                  <div className="space-y-4 animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[#00D632]" />
                        <span>Credentials.txt Archive</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#00D632]">Delivered in 5-15 mins</span>
                    </div>

                    <div className="p-3 bg-[#0a0a0a] rounded-2xl border border-slate-800 text-[10px] font-mono space-y-2 text-slate-300 overflow-x-auto leading-relaxed">
                      <div className="text-emerald-400 font-bold border-b border-slate-800 pb-1">
                        === CASH APPS AGENT CREDENTIALS ===
                      </div>
                      <div>Cash App Email: account.holder88@gmail.com</div>
                      <div>Cash App Password: CashSecure#2026!</div>
                      <div>Cashtag: $Alexander_V88</div>
                      <div>Primary Email Password: GoogleKey#9932</div>
                      <div>2FA Backup Keys: 4920 1849 2049 1194</div>
                      <div>SSN: XXX-XX-4982 (Verified)</div>
                      <div>DL Scan: Attached in DL_Front_Back.pdf</div>
                      <div>Sutton Bank Routing: 041215663</div>
                      <div>Sutton Bank Account: 9842109482</div>
                    </div>

                    <div className="text-[10px] text-slate-400 leading-snug">
                      🔒 All credentials come with original Gmail/Outlook access and complete recovery ownership.
                    </div>
                  </div>
                )}

                {/* Bottom Mock Nav */}
                <div className="pt-3 border-t border-slate-900 flex items-center justify-around text-slate-500 text-xs">
                  <div className="text-[#00D632] flex flex-col items-center">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-[9px]">Money</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-[9px]">Card</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Bitcoin className="w-4 h-4" />
                    <span className="text-[9px]">Bitcoin</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Lock className="w-4 h-4" />
                    <span className="text-[9px]">Security</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Feature Highlights (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#00D632] uppercase tracking-wider">
                Full Spectrum Deliverables
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit',sans-serif]">
                Everything Configured for Seamless, Long-Term Operation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We eliminate the risk of accounts getting restricted. Every account is created using clean residential USA credentials, aged naturally, and verified across all state and federal databases.
              </p>
            </div>

            {/* Matrix of 4 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#0d141b] border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-700/40 text-[#00D632] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs font-black text-white font-['Outfit',sans-serif]">
                  Full Identity Verification
                </div>
                <p className="text-[11px] text-slate-400">
                  SSN numbers and high-resolution Front &amp; Back Driving License scans provided for full compliance.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0d141b] border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-amber-950 border border-amber-700/40 text-[#F7931A] flex items-center justify-center">
                  <Bitcoin className="w-4 h-4" />
                </div>
                <div className="text-xs font-black text-white font-['Outfit',sans-serif]">
                  Unrestricted BTC Withdrawals
                </div>
                <p className="text-[11px] text-slate-400">
                  Biometrics cleared for instantaneous external blockchain transfers to any wallet or exchange.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0d141b] border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-sky-950 border border-sky-700/40 text-sky-400 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="text-xs font-black text-white font-['Outfit',sans-serif]">
                  Sutton Bank ACH Routing
                </div>
                <p className="text-[11px] text-slate-400">
                  Dedicated USA routing &amp; account numbers for incoming direct deposits, payroll, or business wires.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0d141b] border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-700/40 text-purple-400 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="text-xs font-black text-white font-['Outfit',sans-serif]">
                  Virtual Visa Card &amp; PIN
                </div>
                <p className="text-[11px] text-slate-400">
                  Instant online merchant debit usage, subscriptions, and ATM pin code for physical card operations.
                </p>
              </div>
            </div>

            {/* Quick Action CTA to Scroll to Accounts */}
            <div className="pt-2">
              <a
                href="#accounts"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all border border-slate-700 hover:border-slate-500"
              >
                <span>Select &amp; Buy Verified Account Now</span>
                <ArrowUpRight className="w-4 h-4 text-[#00D632]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
