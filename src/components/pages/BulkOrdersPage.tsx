import React from 'react';
import { ArrowLeft, Sparkles, Building2 } from 'lucide-react';
import { BulkOrderConfigurator } from '../BulkOrderConfigurator';
import { CartItem } from '../../types';

interface BulkOrdersPageProps {
  onNavigateHome: () => void;
  onBulkCheckout: (items: CartItem[]) => void;
}

export const BulkOrdersPage: React.FC<BulkOrdersPageProps> = ({
  onNavigateHome,
  onBulkCheckout
}) => {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
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
          Agency &amp; Reseller Wholesale Tiers
        </span>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1810] via-[#09130c] to-[#070e0a] border border-emerald-500/20 p-8 sm:p-12 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-black text-[#00D632]">
          <Building2 className="w-3.5 h-3.5" />
          <span>AGENCY WHOLESALE &bull; BULK DISCOUNTS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
          Wholesale &amp; Bulk <span className="text-[#00D632]">Account Bundles</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Order 3 or more accounts and automatically save between 10% to 25%. Ideal for digital marketing agencies, crypto trading desks, and high-volume transaction operators requiring multiple clean nodes.
        </p>
      </div>

      {/* Bulk Configurator Component */}
      <BulkOrderConfigurator onBulkCheckout={onBulkCheckout} />
    </div>
  );
};
