import React, { useState } from 'react';
import { FAQS, CONTACT_INFO } from '../../data/cryptoGateways';
import { ArrowLeft, HelpCircle, ChevronDown, ShieldCheck, Search, Zap, Send } from 'lucide-react';

interface FaqPageProps {
  onNavigateHome: () => void;
  onOpenContact: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigateHome, onOpenContact }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Payments', 'Verification', 'Security'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
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
          Knowledge Base &bull; {FAQS.length} Guides
        </span>
      </div>

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1810] via-[#09130c] to-[#070e0a] border border-emerald-500/20 p-8 sm:p-12 shadow-2xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-black text-[#00D632]">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>HELP CENTER &bull; ESCROW POLICIES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
          Frequently Asked <span className="text-[#00D632]">Questions</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Everything you need to know about purchasing verified Cash App accounts, BTC wallet limits, automated delivery, login safety, and warranty replacement terms.
        </p>

        {/* Search Field */}
        <div className="relative max-w-md mx-auto pt-2">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions (e.g., BTC, delivery, warranty, proxy)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-black/60 border border-slate-700/80 focus:border-[#00D632] rounded-2xl text-sm text-white placeholder-slate-500 outline-none transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-[#00D632] text-black shadow-[0_0_15px_rgba(0,214,50,0.3)]'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden transition-all hover:border-emerald-500/30"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-white text-sm sm:text-base group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#00D632]" />
                  <span className="group-hover:text-[#00D632] transition-colors">{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#00D632]' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-black/20">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 30-Day Escrow & Warranty Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-emerald-950/40 border border-emerald-500/30 space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-[#00D632] shrink-0" />
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">Our 30-Day Escrow Replacement Promise</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              If an account encounters any verification discrepancy or lock within 30 days of purchase while following our warm-up guide, our agent will verify the state and issue a fresh replacement account within minutes.
            </p>
          </div>
        </div>
      </div>

      {/* Still need help CTA */}
      <div className="text-center py-6 space-y-3">
        <p className="text-xs text-slate-400">Can't find the answer you're looking for?</p>
        <button
          onClick={onOpenContact}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00D632] text-black font-bold text-xs hover:bg-[#00FF50] shadow-[0_0_15px_rgba(0,214,50,0.3)] transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Contact 24/7 Agent Desk</span>
        </button>
      </div>
    </div>
  );
};
