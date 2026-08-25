import React from 'react';
import { TESTIMONIALS } from '../data/cryptoGateways';
import { Star, ShieldCheck, CheckCircle2, MessageSquareQuote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 relative bg-[#090d10] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00D632]" />
            Verified Customer Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Trusted by <span className="text-[#00D632]">2,400+ Buyers</span> Worldwide
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Real feedback from individuals and e-commerce merchants who bought verified Cash App accounts through cashappagent.com.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-[#0d141b] border border-slate-800 flex flex-col justify-between space-y-4 hover:border-emerald-700/50 transition-all duration-300 shadow-xl"
            >
              <div className="space-y-3">
                {/* Stars and date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500">{t.date}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-500/40"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-xs font-black text-white flex items-center gap-1">
                      <span>{t.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00D632]" />
                    </div>
                    <div className="text-[10px] text-slate-400">{t.location}</div>
                  </div>
                </div>

                <div className="inline-block px-2.5 py-1 rounded-md bg-emerald-950/70 border border-emerald-700/30 text-[10px] font-bold text-emerald-300">
                  Purchased: {t.accountBought}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
