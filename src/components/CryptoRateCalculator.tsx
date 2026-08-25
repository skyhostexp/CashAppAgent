import React, { useState } from 'react';
import { CRYPTO_GATEWAYS } from '../data/cryptoGateways';
import { CryptoCurrency } from '../types';
import { 
  Coins, 
  Copy, 
  Check, 
  QrCode, 
  ArrowRightLeft, 
  Zap, 
  ShieldCheck, 
  Clock, 
  ExternalLink 
} from 'lucide-react';

export const CryptoRateCalculator: React.FC = () => {
  const [usdAmount, setUsdAmount] = useState<number>(349);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency>('TRX');
  const [copied, setCopied] = useState<boolean>(false);
  const [showQr, setShowQr] = useState<boolean>(false);

  const gateway = CRYPTO_GATEWAYS[selectedCrypto];
  
  // Calculate crypto conversion
  const cryptoEquivalent = (usdAmount / gateway.rateUsd).toFixed(
    selectedCrypto === 'BTC' ? 6 : selectedCrypto === 'ETH' ? 5 : selectedCrypto === 'SOL' ? 4 : selectedCrypto === 'BSC' ? 4 : 2
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(gateway.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presetAmounts = [189, 229, 249, 259, 349, 499];

  return (
    <section id="crypto-converter" className="py-16 sm:py-20 bg-[#090d10] border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Coins className="w-3.5 h-3.5 text-[#00D632]" />
            Live Crypto Gateway &amp; Fee Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Instant Crypto <span className="text-[#00D632]">Rate &amp; Network Calculator</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Check exact crypto equivalents, estimated blockchain network confirmation times, and zero-fee gateway addresses across all supported blockchains.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-[#0d141b] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
          {/* Preset Buttons & Input */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Account Price in USD:</span>
              <span className="text-[11px] text-slate-500 font-normal">Click a tier or type custom amount</span>
            </label>

            <div className="flex flex-wrap gap-2">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setUsdAmount(amt)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    usdAmount === amt
                      ? 'bg-[#00D632] text-black font-black shadow-md shadow-[#00D632]/20'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  ${amt} USD
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
              <input
                type="number"
                min={10}
                value={usdAmount}
                onChange={(e) => setUsdAmount(Math.max(1, Number(e.target.value)))}
                className="w-full pl-8 pr-4 py-3 bg-slate-900/90 border border-slate-700 text-white font-mono font-bold text-base rounded-2xl focus:outline-none focus:border-[#00D632]"
                placeholder="Enter USD Amount"
              />
            </div>
          </div>

          {/* Crypto Currency Selection Pills */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300">
              Select Blockchain Network:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {(Object.keys(CRYPTO_GATEWAYS) as CryptoCurrency[]).map((cKey) => {
                const gw = CRYPTO_GATEWAYS[cKey];
                const isSelected = selectedCrypto === cKey;
                return (
                  <button
                    key={cKey}
                    onClick={() => setSelectedCrypto(cKey)}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-950/70 border-[#00D632] shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: gw.iconColor }}
                    />
                    <span className={`text-xs font-black ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {cKey}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-time Conversion Result Box */}
          <div className="p-6 rounded-3xl bg-[#090e13] border border-emerald-900/50 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  You Pay in {gateway.id} ({gateway.network}):
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono flex items-center gap-2">
                  <span className="text-[#00D632]">{cryptoEquivalent}</span>
                  <span className="text-lg text-slate-300 font-sans">{selectedCrypto}</span>
                </div>
                <div className="text-xs text-slate-400">
                  Equivalent to <strong className="text-white">${usdAmount} USD</strong> at current market rates
                </div>
              </div>

              {/* Network Speed & Fee Badge */}
              <div className="flex flex-col gap-2 shrink-0">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <Zap className="w-3.5 h-3.5 text-[#00D632]" />
                  <span>Network Gas: <strong>&lt; $0.05</strong></span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Confirmation: <strong>~1 - 3 Mins</strong></span>
                </div>
              </div>
            </div>

            {/* Official Wallet Address & QR Code */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>Official {gateway.id} Gateway Wallet:</span>
                <button
                  onClick={() => setShowQr(!showQr)}
                  className="text-[#00D632] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>{showQr ? 'Hide QR Code' : 'Show QR Code'}</span>
                </button>
              </div>

              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
                <span className="text-xs font-mono text-emerald-300 break-all select-all">
                  {gateway.address}
                </span>

                <button
                  id="crypto-calc-copy-btn"
                  onClick={handleCopy}
                  className="px-4 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/50 text-[#00D632] text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {showQr && (
                <div className="p-4 bg-white rounded-2xl w-40 h-40 mx-auto flex items-center justify-center animate-in zoom-in-95 shadow-2xl">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${gateway.address}`}
                    alt={`${gateway.id} QR Code`}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <p className="text-[11px] text-slate-400 leading-relaxed text-center sm:text-left">
                ℹ️ {gateway.instruction} After sending, you can complete your instant order via our checkout modal or send your TXID to Telegram <strong>@CashappsAgent</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
