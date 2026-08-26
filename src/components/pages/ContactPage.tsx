import React from 'react';
import { ArrowLeft, Headphones, Send, Phone, Mail, ShieldCheck, Clock } from 'lucide-react';
import { CONTACT_INFO } from '../../data/cryptoGateways';
import { ContactSection } from '../ContactSection';

interface ContactPageProps {
  onNavigateHome: () => void;
  onOpenOrderLookup: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  onOpenOrderLookup
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
          Support Desk &bull; Live 24/7/365
        </span>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1810] via-[#09130c] to-[#070e0a] border border-emerald-500/20 p-8 sm:p-12 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-black text-[#00D632]">
          <Headphones className="w-3.5 h-3.5" />
          <span>DIRECT AGENT HELPDESK &bull; INSTANT ESCROW</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
          Official <span className="text-[#00D632]">Support &amp; Verification</span> Desk
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Need custom order assistance, immediate credential verification, or bulk pricing quotes? Our verified support team is online 24/7 across Telegram, WhatsApp, and encrypted email.
        </p>
      </div>

      {/* Direct Verified Channels Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href={CONTACT_INFO.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-2xl bg-sky-950/30 hover:bg-sky-950/60 border border-sky-600/40 transition-all space-y-3 group"
        >
          <div className="w-12 h-12 rounded-xl bg-sky-900/50 border border-sky-500/40 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
            <Send className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">Telegram Support</h3>
          <p className="text-xs text-sky-200/70">
            Fastest response channel with live human verification agents.
          </p>
          <div className="text-xs font-mono font-bold text-sky-400">
            @CashappsAgent
          </div>
        </a>

        <a
          href={CONTACT_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-2xl bg-emerald-950/30 hover:bg-emerald-950/60 border border-emerald-600/40 transition-all space-y-3 group"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-900/50 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">WhatsApp Direct</h3>
          <p className="text-xs text-emerald-200/70">
            Direct chat &amp; order confirmation line.
          </p>
          <div className="text-xs font-mono font-bold text-emerald-400">
            {CONTACT_INFO.whatsapp}
          </div>
        </a>

        <a
          href={CONTACT_INFO.emailUrl}
          className="p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 transition-all space-y-3 group"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:scale-110 transition-transform">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-white transition-colors">Official Email Desk</h3>
          <p className="text-xs text-slate-400">
            Encrypted order dispatch &amp; formal invoice queries.
          </p>
          <div className="text-xs font-mono font-bold text-slate-300">
            {CONTACT_INFO.email}
          </div>
        </a>
      </div>

      {/* Embedded Contact Section */}
      <ContactSection />
    </div>
  );
};
