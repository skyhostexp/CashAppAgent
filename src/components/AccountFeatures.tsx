import React from 'react';
import { 
  ShieldCheck, 
  Mail, 
  CreditCard, 
  FileCheck, 
  Lock, 
  Smartphone, 
  Sparkles,
  Zap,
  CheckCircle2,
  RefreshCw,
  Send,
  HelpCircle
} from 'lucide-react';
import { CONTACT_INFO } from '../data/cryptoGateways';

export const AccountFeatures: React.FC = () => {
  const packageItems = [
    {
      icon: Mail,
      title: 'Full Primary Email Access',
      desc: 'Complete control of the original Gmail / Outlook address with backup recovery keys and 2-step verification keys.'
    },
    {
      icon: FileCheck,
      title: 'SSN & Government ID Documents',
      desc: 'Real high-resolution front & back scans of the Driver License/State ID and verified SSN documentation for verification proof.'
    },
    {
      icon: CreditCard,
      title: 'Active Cash Card (CVV & PIN)',
      desc: '16-digit card number, CVV code, expiration date, and ATM security PIN ready for online purchases and mobile wallet binding.'
    },
    {
      icon: ShieldCheck,
      title: 'Sutton Bank Direct Deposit',
      desc: 'Official routing and account numbers for ACH wire deposits, employer paychecks, and seamless bank linking.'
    },
    {
      icon: Smartphone,
      title: 'Phone Number Linked Access',
      desc: 'Virtual SIM SMS verification support or seamless phone number swap instructions to your personal carrier.'
    },
    {
      icon: Lock,
      title: 'Anti-Flag Safe Login Guide',
      desc: 'Step-by-step PDF manual on residential IP selection, device configuration, and warming up your account safely.'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Select Account Category & Limit',
      desc: 'Choose between BTC Enabled ($249 - $499) or Non-BTC USD Accounts ($189 - $259) depending on your volume requirements.'
    },
    {
      step: '02',
      title: 'Complete Instant Crypto Payment',
      desc: 'Pay using BSC, TRX, ETH, SOL, BTC, LTC, or DOGE with zero transaction fees and instant block confirmation.'
    },
    {
      step: '03',
      title: 'Automated 5-15 Min Preparation',
      desc: 'Our dispatch system verifies credentials, packages your identity documents, and prepares your secure delivery archive.'
    },
    {
      step: '04',
      title: 'Receive Credentials & Ownership',
      desc: 'Archive is delivered straight to your email & Telegram with full 30-day replacement guarantee and 24/7 support.'
    }
  ];

  return (
    <div className="space-y-20 py-16 sm:py-20">
      {/* Package Contents Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#00D632]" />
            What Is Included in Every Package
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Turnkey <span className="text-[#00D632]">Account Deliverables</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Every Cash App account from CashappsAgent is delivered with 100% full ownership credentials and identity proof archives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packageItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-[#0d141b] border border-slate-800 hover:border-emerald-700/50 transition-all duration-300 space-y-3 group shadow-lg hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-700/40 text-[#00D632] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white font-['Outfit',sans-serif] group-hover:text-[#00D632] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4-Step Delivery Process Section */}
      <section id="process" className="bg-[#090d10] py-16 sm:py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Fast &amp; Automated Pipeline
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
              How to <span className="text-[#00D632]">Buy &amp; Receive</span> Your Account
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Get up and running in 4 easy steps with zero paperwork or delays.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((stepItem, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-3xl bg-[#0e161f] border border-slate-800 space-y-3"
              >
                <div className="text-3xl sm:text-4xl font-black text-emerald-500/30 font-['Outfit',sans-serif]">
                  {stepItem.step}
                </div>
                <h3 className="text-base font-black text-white">
                  {stepItem.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {stepItem.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Direct Support Callout */}
          <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-700/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-sm font-black text-white flex items-center justify-center sm:justify-start gap-2">
                <span>Need custom bulk accounts or custom limit requests?</span>
              </div>
              <p className="text-xs text-slate-300">
                Contact our VIP desk directly on Telegram ({CONTACT_INFO.telegram}) or WhatsApp ({CONTACT_INFO.whatsapp}).
              </p>
            </div>
            <a
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#00D632] hover:bg-[#00FF3D] text-black font-black text-xs sm:text-sm shrink-0 flex items-center gap-2 cursor-pointer shadow-lg shadow-[#00D632]/25"
            >
              <Send className="w-4 h-4" />
              <span>Message @CashappsAgent</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
