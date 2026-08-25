import React, { useState } from 'react';
import { FAQS } from '../data/cryptoGateways';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Send } from 'lucide-react';
import { CONTACT_INFO } from '../data/cryptoGateways';

export const FaqSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(FAQS[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Verification', 'Payments', 'Security'];

  const filteredFaqs = selectedCategory === 'All' 
    ? FAQS 
    : FAQS.filter(f => f.category === selectedCategory);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-[#00D632]" />
          Frequently Asked Questions
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
          Everything You Need to <span className="text-[#00D632]">Know</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          Got questions regarding buying verified Cash App accounts, delivery, or crypto checkout? Find answers below.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#00D632] text-black shadow-md shadow-[#00D632]/20 font-black'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {filteredFaqs.map((faq) => {
          const isOpen = openFaq === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-[#0e161f] border-emerald-600/50 shadow-lg shadow-emerald-950/40'
                  : 'bg-[#0c1217] border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-sm sm:text-base font-bold text-white font-['Outfit',sans-serif]">
                  {faq.question}
                </span>
                <div className={`p-1.5 rounded-lg bg-slate-800 text-slate-300 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#00D632]' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4 animate-in fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Unanswered Question Box */}
      <div className="mt-10 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
        <div className="text-sm font-bold text-white">Have a specific question not covered here?</div>
        <p className="text-xs text-slate-400">
          Our customer service team is on standby 24/7 on Telegram to guide you through verification and checkout.
        </p>
        <a
          href={CONTACT_INFO.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-950 hover:bg-sky-900 border border-sky-600/50 text-sky-300 font-bold text-xs transition-colors"
        >
          <Send className="w-4 h-4 text-sky-400" />
          <span>Ask on Telegram: {CONTACT_INFO.telegram}</span>
        </a>
      </div>
    </section>
  );
};
