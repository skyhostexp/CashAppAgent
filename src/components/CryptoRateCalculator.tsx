import React, { useState } from 'react';
import { CRYPTO_GATEWAYS, CONTACT_INFO } from '../data/cryptoGateways';
import { CryptoCurrency } from '../types';
import { 
  Coins, 
  Copy, 
  Check, 
  QrCode, 
  Zap, 
  Clock, 
  Landmark,
  Wallet
} from 'lucide-react';

export const CryptoRateCalculator: React.FC = () => {
  const [usdAmount, setUsdAmount] = useState<number>(349);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency>('TRX');
  const [activeTab, setActiveTab] = useState<'all' | 'crypto' | 'skrill' | 'bank'>('all');
  const [copied, setCopied] = useState<boolean>(false);
  const [showQr, setShowQr] = useState<boolean>(false);

  const gateway = CRYPTO_GATEWAYS[selectedCrypto];
  
  // Calculate equivalent
  let cryptoEquivalent = '';
  let currencyLabel = selectedCrypto as string;

  if (selectedCrypto === 'SKRILL') {
    cryptoEquivalent = `$${usdAmount.toFixed(2)}`;
    currencyLabel = 'USD (Skrill)';
  } else if (selectedCrypto === 'BANK_USD_ACH' || selectedCrypto === 'BANK_USD_SWIFT') {
    cryptoEquivalent = `$${usdAmount.toFixed(2)}`;
    currencyLabel = 'USD (Direct Wire / ACH)';
  } else if (selectedCrypto === 'BANK_EUR') {
    cryptoEquivalent = `€${(usdAmount / gateway.rateUsd).toFixed(2)}`;
    currencyLabel = 'EUR (SEPA Transfer)';
  } else if (selectedCrypto === 'BANK_GBP') {
    cryptoEquivalent = `£${(usdAmount / gateway.rateUsd).toFixed(2)}`;
    currencyLabel = 'GBP (Faster Payments)';
  } else {
    cryptoEquivalent = (usdAmount / gateway.rateUsd).toFixed(
      selectedCrypto === 'BTC' ? 6 : selectedCrypto === 'ETH' ? 5 : selectedCrypto === 'SOL' ? 4 : selectedCrypto === 'BSC' ? 4 : 2
    );
    currencyLabel = selectedCrypto;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(gateway.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presetAmounts = [189, 229, 249, 259, 349, 499];

  const allKeys = Object.keys(CRYPTO_GATEWAYS) as CryptoCurrency[];
  const filteredKeys = allKeys.filter((key) => {
    const gw = CRYPTO_GATEWAYS[key];
    if (activeTab === 'crypto') return gw.type === 'crypto' || !gw.type;
    if (activeTab === 'skrill') return gw.type === 'fiat-wallet';
    if (activeTab === 'bank') return gw.type === 'bank-transfer';
    return true;
  });

  return (
    <section id="crypto-converter" className="py-16 sm:py-20 bg-[#090d10] border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Coins className="w-3.5 h-3.5 text-[#00D632]" />
            Live Payment Rate &amp; Gateway Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Instant Payment <span className="text-[#00D632]">Rate &amp; Gateway Calculator</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Check exact crypto equivalents, Skrill direct transfer details, or international Bank Transfer (ACH, SWIFT, SEPA, Faster Payments) gateway details.
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

          {/* Method Filter Tabs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label className="text-xs font-bold text-slate-300">
                Select Payment Method / Network:
              </label>
              <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                    activeTab === 'all' ? 'bg-[#00D632] text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({allKeys.length})
                </button>
                <button
                  onClick={() => setActiveTab('crypto')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 ${
                    activeTab === 'crypto' ? 'bg-[#00D632] text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Coins className="w-3 h-3" /> Crypto
                </button>
                <button
                  onClick={() => setActiveTab('skrill')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 ${
                    activeTab === 'skrill' ? 'bg-[#811245] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Wallet className="w-3 h-3" /> Skrill
                </button>
                <button
                  onClick={() => setActiveTab('bank')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 ${
                    activeTab === 'bank' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Landmark className="w-3 h-3" /> Bank Transfer
                </button>
              </div>
            </div>

            {/* Gateway Selection Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {filteredKeys.map((cKey) => {
                const gw = CRYPTO_GATEWAYS[cKey];
                const isSelected = selectedCrypto === cKey;
                const isSkrill = gw.type === 'fiat-wallet';
                const isBank = gw.type === 'bank-transfer';

                return (
                  <button
                    key={cKey}
                    onClick={() => setSelectedCrypto(cKey)}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      isSelected
                        ? isSkrill
                          ? 'bg-[#811245]/40 border-[#811245] shadow-lg shadow-[#811245]/30'
                          : isBank
                            ? 'bg-sky-950/60 border-sky-500 shadow-lg shadow-sky-950/50'
                            : 'bg-emerald-950/70 border-[#00D632] shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: gw.iconColor }}
                    />
                    <span className={`text-xs font-black truncate max-w-full ${
                      isSelected 
                        ? isSkrill ? 'text-pink-300' : isBank ? 'text-sky-300' : 'text-white'
                        : 'text-slate-300'
                    }`}>
                      {cKey.replace('BANK_', '')}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate max-w-full">
                      {gw.network.split(' ')[0]}
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
                  You Pay in {gateway.name}:
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-mono flex items-center gap-2">
                  <span className="text-[#00D632]">{cryptoEquivalent}</span>
                  <span className="text-sm sm:text-base text-slate-300 font-sans font-normal">{currencyLabel}</span>
                </div>
                <div className="text-xs text-slate-400">
                  Calculated for <strong className="text-white">${usdAmount} USD</strong> order amount
                </div>
              </div>

              {/* Network Speed & Fee Badge */}
              <div className="flex flex-col gap-2 shrink-0">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <Zap className="w-3.5 h-3.5 text-[#00D632]" />
                  <span>Fee / Charge: <strong>{gateway.type === 'bank-transfer' ? 'Standard Wire / ACH' : gateway.type === 'fiat-wallet' ? 'Standard Skrill' : '< $0.05'}</strong></span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Confirmation: <strong>{gateway.type === 'bank-transfer' ? 'Same-day / 1 Biz Day' : gateway.type === 'fiat-wallet' ? 'Instant (< 5 Mins)' : '~1 - 3 Mins'}</strong></span>
                </div>
              </div>
            </div>

            {/* Official Wallet Address / Account Details & QR Code */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>
                  {gateway.type === 'bank-transfer'
                    ? 'Official Bank Account / IBAN Reference:'
                    : gateway.type === 'fiat-wallet'
                      ? 'Official Recipient Skrill Email:'
                      : `Official ${gateway.id} Gateway Wallet:`}
                </span>
                {gateway.type !== 'bank-transfer' && (
                  <button
                    onClick={() => setShowQr(!showQr)}
                    className="text-[#00D632] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>{showQr ? 'Hide QR Code' : 'Show QR Code'}</span>
                  </button>
                )}
              </div>

              <div className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                gateway.type === 'fiat-wallet'
                  ? 'bg-slate-900/90 border-[#811245]'
                  : gateway.type === 'bank-transfer'
                    ? 'bg-slate-900/90 border-sky-800'
                    : 'bg-slate-900 border-slate-800'
              }`}>
                <span className={`text-xs font-mono break-all select-all font-bold ${
                  gateway.type === 'fiat-wallet'
                    ? 'text-pink-300'
                    : gateway.type === 'bank-transfer'
                      ? 'text-sky-300'
                      : 'text-emerald-300'
                }`}>
                  {gateway.address}
                </span>

                <button
                  id="crypto-calc-copy-btn"
                  onClick={handleCopy}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer ${
                    gateway.type === 'fiat-wallet'
                      ? 'bg-[#811245] hover:bg-[#9e1655] text-white'
                      : gateway.type === 'bank-transfer'
                        ? 'bg-sky-600 hover:bg-sky-500 text-white'
                        : 'bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/50 text-[#00D632]'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Show Bank Details Mini-Grid if Bank Transfer */}
              {gateway.bankDetails && (
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                    <div><span className="text-slate-500 font-medium">Beneficiary:</span> <strong className="text-white">{gateway.bankDetails.accountTitle}</strong></div>
                    <div><span className="text-slate-500 font-medium">Bank Name:</span> <strong className="text-white">{gateway.bankDetails.bankName}</strong></div>
                    {gateway.bankDetails.iban && <div><span className="text-slate-500 font-medium">IBAN:</span> <strong className="text-sky-300 font-mono">{gateway.bankDetails.iban}</strong></div>}
                    {gateway.bankDetails.swiftBic && <div><span className="text-slate-500 font-medium">SWIFT/BIC:</span> <strong className="text-white font-mono">{gateway.bankDetails.swiftBic}</strong></div>}
                    {gateway.bankDetails.routingAch && <div><span className="text-slate-500 font-medium">ACH Routing:</span> <strong className="text-white font-mono">{gateway.bankDetails.routingAch}</strong></div>}
                    {gateway.bankDetails.routingWire && <div><span className="text-slate-500 font-medium">Wire Routing:</span> <strong className="text-white font-mono">{gateway.bankDetails.routingWire}</strong></div>}
                    {gateway.bankDetails.sortCode && <div><span className="text-slate-500 font-medium">Sort Code:</span> <strong className="text-white font-mono">{gateway.bankDetails.sortCode}</strong></div>}
                  </div>
                </div>
              )}

              {showQr && gateway.type !== 'bank-transfer' && (
                <div className="p-4 bg-white rounded-2xl w-40 h-40 mx-auto flex items-center justify-center animate-in zoom-in-95 shadow-2xl">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${gateway.address}`}
                    alt={`${gateway.id} QR Code`}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <p className="text-[11px] text-slate-400 leading-relaxed text-center sm:text-left">
                ℹ️ {gateway.instruction} After sending, you can complete your instant order via our checkout modal or send your reference to Telegram <strong>{CONTACT_INFO.telegram}</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
