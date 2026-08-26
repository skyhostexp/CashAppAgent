import React, { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../data/cryptoGateways';
import { Send, Phone, ArrowUp } from 'lucide-react';

interface FloatingContactBarProps {
  cartCount?: number;
  onOpenCart?: () => void;
}

export const FloatingContactBar: React.FC<FloatingContactBarProps> = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Floating Action Pills */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Floating Telegram Button */}
        <a
          id="floating-telegram-btn"
          href={CONTACT_INFO.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#229ED9] hover:bg-[#1E88E5] text-white font-extrabold text-xs shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 active:scale-95 transition-all"
          title="Chat on Telegram @CashappsAgent"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Telegram Support</span>
        </a>

        {/* Floating WhatsApp Button */}
        <a
          id="floating-whatsapp-btn"
          href={CONTACT_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-black font-extrabold text-xs shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all"
          title="Chat on WhatsApp +1 (253) 408-0049"
        >
          <Phone className="w-4 h-4 fill-black" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
