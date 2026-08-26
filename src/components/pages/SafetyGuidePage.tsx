import React from 'react';
import { ArrowLeft, ShieldAlert, CheckCircle, Smartphone, Wifi, Clock, Lock, Sparkles } from 'lucide-react';
import { SafeLoginGuide } from '../SafeLoginGuide';

interface SafetyGuidePageProps {
  onNavigateHome: () => void;
  onExploreAccounts: () => void;
}

export const SafetyGuidePage: React.FC<SafetyGuidePageProps> = ({
  onNavigateHome,
  onExploreAccounts
}) => {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#00D632] transition-colors bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <span className="text-xs font-semibold text-slate-500">
          Anti-Ban Protocol &bull; 7-Day Warmup
        </span>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1810] via-[#09130c] to-[#070e0a] border border-emerald-500/20 p-8 sm:p-12 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-black text-[#00D632]">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>ACCOUNT LONGEVITY &bull; BEST PRACTICES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
          7-Day Anti-Ban <span className="text-[#00D632]">Warm-up Blueprint</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Follow this proven security protocol to ensure permanent account health, establish a clean device fingerprint, and safely scale daily transaction limits without triggering Cash App's automated fraud flags.
        </p>
      </div>

      {/* Safe Login Guide Interactive Component */}
      <SafeLoginGuide />

      {/* Action Footer */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-4">
        <h3 className="text-lg font-bold text-white">Ready to deploy your verified account?</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          All accounts come pre-warmed, with full primary email access and identity documentation included.
        </p>
        <button
          onClick={onExploreAccounts}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00D632] text-black font-bold text-xs hover:bg-[#00FF50] shadow-[0_0_20px_rgba(0,214,50,0.3)] transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Browse Available Inventory</span>
        </button>
      </div>
    </div>
  );
};
