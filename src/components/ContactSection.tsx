import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/cryptoGateways';
import { 
  Send, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [contactHandle, setContactHandle] = useState('');
  const [accountInterest, setAccountInterest] = useState('BTC Enable 10k Cash App Account ($349)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedText = encodeURIComponent(
      `Hello CashappAgent Support,\n\nName: ${name}\nContact: ${contactHandle}\nInterested in: ${accountInterest}\nMessage: ${message || 'I want to purchase a verified Cash App account.'}`
    );
    window.open(`${CONTACT_INFO.telegramUrl}?text=${encodedText}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#090d10] border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5 text-[#00D632]" />
            Need Help? Contact Us 24/7
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Get in Touch with <span className="text-[#00D632]">CashappAgent</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Our specialized team is available 24/7/365 to assist with bulk custom orders, custom limit requests, and instant account dispatch inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Contact Channels */}
          <div className="lg:col-span-5 space-y-4">
            {/* Telegram Card */}
            <a
              id="contact-channel-telegram"
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-[#0e161f] border border-sky-600/40 hover:border-sky-400/80 transition-all flex items-start gap-4 group block shadow-lg"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-950/80 border border-sky-600/50 text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Send className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Primary Telegram Channel &bull; Fastest Response
                </div>
                <div className="text-lg font-black text-white font-['Outfit',sans-serif]">
                  {CONTACT_INFO.telegram}
                </div>
                <p className="text-xs text-slate-400">
                  Instant live chat, payment confirmation, and automated delivery tracking within 60 seconds.
                </p>
              </div>
            </a>

            {/* WhatsApp Card */}
            <a
              id="contact-channel-whatsapp"
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-[#0e161f] border border-emerald-600/40 hover:border-emerald-400/80 transition-all flex items-start gap-4 group block shadow-lg"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-600/50 text-[#00D632] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Official WhatsApp Hotline
                </div>
                <div className="text-lg font-black text-white font-['Outfit',sans-serif]">
                  {CONTACT_INFO.whatsapp}
                </div>
                <p className="text-xs text-slate-400">
                  Direct voice &amp; text messaging for VIP orders, replacements, and account verification advice.
                </p>
              </div>
            </a>

            {/* Email Card */}
            <a
              id="contact-channel-email"
              href={CONTACT_INFO.emailUrl}
              className="p-6 rounded-3xl bg-[#0e161f] border border-slate-700/60 hover:border-slate-500 transition-all flex items-start gap-4 group block shadow-lg"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Official Email Support
                </div>
                <div className="text-base font-black text-white font-['Outfit',sans-serif] break-all">
                  {CONTACT_INFO.email}
                </div>
                <p className="text-xs text-slate-400">
                  Direct inquiries, formal invoices, enterprise partnerships, and general documentation.
                </p>
              </div>
            </a>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-[#00D632] shrink-0" />
              <span>Available 24 Hours / 7 Days a week with zero downtime.</span>
            </div>
          </div>

          {/* Right Column: Direct Quick Inquiry Form */}
          <div className="lg:col-span-7 bg-[#0d141b] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white font-['Outfit',sans-serif]">
                Send Quick Inquiry to Telegram Desk
              </h3>
              <p className="text-xs text-slate-400">
                Fill this form to open a direct pre-configured inquiry message with our VIP concierge team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Your Name / Nickname
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#00D632] placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Your Telegram / WhatsApp
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. @username or phone"
                    value={contactHandle}
                    onChange={(e) => setContactHandle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#00D632] placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Interested Account Category
                </label>
                <select
                  value={accountInterest}
                  onChange={(e) => setAccountInterest(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#00D632]"
                >
                  <option>BTC Enable 4k Cash App Account Only $249</option>
                  <option>BTC Enable 10k Cash App Account Only $349</option>
                  <option>BTC Enable 25k Cash App Account Only $499</option>
                  <option>Non BTC Enable 4k Cash App Account Only $189</option>
                  <option>Non BTC Enable 10k Cash App Account Only $229</option>
                  <option>Non BTC Enable 15k Cash App Account Only $259</option>
                  <option>Bulk Custom Orders / Agency Packages</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Your Message or Question
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us any specific requirements or ask about our payment gateways (BSC, TRX, ETH, SOL, BTC, LTC, DOGE)..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#00D632] placeholder:text-slate-600 resize-none"
                />
              </div>

              <button
                type="submit"
                id="contact-form-send-btn"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00A827] via-[#00D632] to-[#00FF44] hover:from-[#00B82B] text-black font-black text-sm shadow-xl shadow-[#00D632]/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Open Instant Chat on Telegram</span>
              </button>

              {submitted && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-bold text-center">
                  Chat opened! Our Telegram agent ({CONTACT_INFO.telegram}) will respond immediately.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
