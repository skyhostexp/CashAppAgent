import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  Lock, 
  Smartphone, 
  Wifi, 
  Calendar, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const SafeLoginGuide: React.FC = () => {
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({
    'step-1': true,
    'step-2': true,
  });
  const [copiedBlueprint, setCopiedBlueprint] = useState<boolean>(false);

  const toggleCheck = (id: string) => {
    setCheckedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const WARMUP_TIMELINE = [
    {
      day: 'Day 1',
      title: 'Initial Device & Proxy Setup',
      desc: 'Connect to a clean USA static residential proxy or fresh mobile network matching the account region. Log in using delivered Gmail credentials and verify 2FA.',
      recommendedVolume: '1 test transaction ($10 - $50)',
      id: 'step-1'
    },
    {
      day: 'Day 2 - 3',
      title: 'Cash Card & Direct Deposit Activity',
      desc: 'Activate the virtual Visa Cash Card in-app. Perform a small online merchant purchase or link the Sutton Bank direct deposit info to PayPal/employer.',
      recommendedVolume: '$100 - $500 total volume',
      id: 'step-2'
    },
    {
      day: 'Day 4 - 5',
      title: 'Bitcoin On-Chain Warmup (BTC Tiers)',
      desc: 'Receive or purchase a small Bitcoin deposit ($50 - $200). Execute a test external withdrawal to an external hardware wallet (Ledger/Trezor/Exodus).',
      recommendedVolume: '$500 - $2,000 volume',
      id: 'step-3'
    },
    {
      day: 'Day 6 - 7+',
      title: 'Full Velocity & Maximum Tier Limit',
      desc: 'Account trust score is fully established in Square/Block risk engines. You may now operate at full tier capacity ($4,000 to $25,000 per week).',
      recommendedVolume: 'Up to $25,000 certified limit',
      id: 'step-4'
    }
  ];

  const handleCopyBlueprint = () => {
    const text = `=== CASHAPPSAGENT SAFE LOGIN & WARMUP PROTOCOL ===\n\n` +
      WARMUP_TIMELINE.map(w => `${w.day}: ${w.title}\n- Action: ${w.desc}\n- Target Volume: ${w.recommendedVolume}\n`).join('\n') +
      `\nGuaranteed with 30-day warranty at cashappagent.com`;
    navigator.clipboard.writeText(text);
    setCopiedBlueprint(true);
    setTimeout(() => setCopiedBlueprint(false), 2000);
  };

  const completedCount = Object.values(checkedSteps).filter(Boolean).length;
  const totalCount = WARMUP_TIMELINE.length;

  return (
    <section id="safety-guide" className="py-16 sm:py-20 bg-[#070b0e] border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00D632]" />
            Anti-Ban Protection &amp; Safe Warm-up Blueprint
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            How to Keep Your Account <span className="text-[#00D632]">100% Safe</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Follow our battle-tested 7-day warm-up sequence to prevent automated risk flags and ensure lifetime operational longevity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive 7-Day Timeline */}
          <div className="lg:col-span-8 bg-[#0d141b] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="space-y-0.5">
                <h3 className="text-lg font-black text-white font-['Outfit',sans-serif]">
                  Interactive 7-Day Warm-up Checklist
                </h3>
                <div className="text-xs text-slate-400">
                  {completedCount} of {totalCount} steps marked as reviewed
                </div>
              </div>

              <button
                id="copy-warmup-blueprint-btn"
                onClick={handleCopyBlueprint}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedBlueprint ? <Check className="w-3.5 h-3.5 text-[#00D632]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBlueprint ? 'Blueprint Copied!' : 'Copy Blueprint'}</span>
              </button>
            </div>

            <div className="space-y-4">
              {WARMUP_TIMELINE.map((item) => {
                const isChecked = !!checkedSteps[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                      isChecked
                        ? 'bg-emerald-950/20 border-emerald-600/50 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isChecked ? 'bg-[#00D632] text-black' : 'border border-slate-700 bg-slate-800 text-transparent'
                    }`}>
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="text-xs font-black text-[#00D632] uppercase tracking-wider">
                          {item.day} &bull; {item.title}
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-black/60 border border-slate-800 text-emerald-300 px-2 py-0.5 rounded-md">
                          {item.recommendedVolume}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Key Anti-Ban Rules & Guidelines */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl bg-[#0e1720] border border-amber-500/40 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Crucial Anti-Ban Rules</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Never use free datacenter VPNs</strong>. Always use clean static residential USA proxies (like IPRoyal, BrightData, or a dedicated 4G mobile hotspot).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Do not change email or cashtag immediately</strong> on Day 1. Let the account settle on your device for 48-72 hours first.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Keep 2-Factor Authentication active</strong> at all times using the included backup keys or authenticator app.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-[#0d141b] border border-emerald-700/50 space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-[#00D632] font-black text-sm">
                <Sparkles className="w-4 h-4" />
                <span>30-Day Guaranteed Protection</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                All accounts come backed by our zero-hassle replacement policy. If any account receives an unexpected limitation despite following our warmup guide, our Telegram team replaces it instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
