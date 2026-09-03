import React, { useState, useEffect } from 'react';
import { CartItem, CryptoCurrency, OrderDetails } from '../types';
import { CRYPTO_GATEWAYS, CONTACT_INFO } from '../data/cryptoGateways';
import { generateCryptoQrSvg } from '../utils/qrHelper';
import confetti from 'canvas-confetti';
import { 
  X, 
  Copy, 
  Check, 
  ShieldCheck, 
  Bitcoin, 
  Zap, 
  Send, 
  Download, 
  RefreshCw, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Landmark,
  Coins,
  Wallet,
  Building,
  Info
} from 'lucide-react';

interface CryptoCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCreated: (order: OrderDetails) => void;
}

export const CryptoCheckoutModal: React.FC<CryptoCheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCreated
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedCategory, setSelectedCategory] = useState<'crypto' | 'skrill' | 'bank'>('crypto');
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency>('TRX');
  const [customerEmail, setCustomerEmail] = useState('');
  const [telegramOrWhatsapp, setTelegramOrWhatsapp] = useState('');
  const [txHash, setTxHash] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyProgress, setVerifyProgress] = useState(0);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Reset modal state for fresh ordering
  const resetModalState = () => {
    setStep(1);
    setTxHash('');
    setConfirmedOrder(null);
    setErrorMsg('');
    setIsVerifying(false);
    setVerifyProgress(0);
    setCopiedField(null);
  };

  const handleClose = () => {
    resetModalState();
    onClose();
  };

  // Whenever modal opens afresh, reset if it was left on completed step
  useEffect(() => {
    if (isOpen) {
      if (step === 4 || confirmedOrder) {
        resetModalState();
      }
    }
  }, [isOpen]);

  const totalUsd = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const gateway = CRYPTO_GATEWAYS[selectedCrypto];

  // Auto-switch category when selectedCrypto changes
  useEffect(() => {
    if (gateway?.type === 'bank-transfer') {
      setSelectedCategory('bank');
    } else if (gateway?.type === 'fiat-wallet') {
      setSelectedCategory('skrill');
    } else {
      setSelectedCategory('crypto');
    }
  }, [selectedCrypto]);

  // Calculate estimated payment amount
  const calculatePaymentAmount = (crypto: CryptoCurrency, usd: number) => {
    const gw = CRYPTO_GATEWAYS[crypto];
    if (crypto === 'SKRILL') {
      return `$${usd.toFixed(2)} USD (1:1 Skrill Direct Transfer)`;
    }
    if (crypto === 'BANK_USD_ACH' || crypto === 'BANK_USD_SWIFT') {
      return `$${usd.toFixed(2)} USD (Direct Bank Wire / ACH)`;
    }
    if (crypto === 'BANK_EUR') {
      const eur = (usd / gw.rateUsd).toFixed(2);
      return `€${eur} EUR ($${usd.toFixed(2)} USD equiv.)`;
    }
    if (crypto === 'BANK_GBP') {
      const gbp = (usd / gw.rateUsd).toFixed(2);
      return `£${gbp} GBP ($${usd.toFixed(2)} USD equiv.)`;
    }
    if (crypto === 'TRX' || crypto === 'BSC' || crypto === 'ETH') {
      if (crypto === 'TRX') return `${usd.toFixed(2)} USDT / ${(usd * 4.2).toFixed(1)} TRX`;
      if (crypto === 'BSC') return `${usd.toFixed(2)} USDT (BEP20) / ${(usd / gw.rateUsd).toFixed(4)} BNB`;
      if (crypto === 'ETH') return `${usd.toFixed(2)} USDT (ERC20) / ${(usd / gw.rateUsd).toFixed(4)} ETH`;
    }
    const amount = (usd / gw.rateUsd).toFixed(5);
    return `${amount} ${crypto}`;
  };

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleCopyFullBankDetails = () => {
    if (!gateway.bankDetails) return;
    const b = gateway.bankDetails;
    const fullText = `=== CASHAPPAGENT BANK TRANSFER DETAILS ===
Beneficiary Name: ${b.accountTitle}
Account Type: ${b.accountType}
Currency: ${b.currency}
Bank Name: ${b.bankName}
Bank Address: ${b.bankAddress}
${b.accountNumber ? `Account Number: ${b.accountNumber}\n` : ''}${b.iban ? `IBAN: ${b.iban}\n` : ''}${b.swiftBic ? `SWIFT / BIC: ${b.swiftBic}\n` : ''}${b.sortCode ? `Sort Code: ${b.sortCode}\n` : ''}${b.routingAch ? `Routing (ACH): ${b.routingAch}\n` : ''}${b.routingWire ? `Routing (Wire): ${b.routingWire}\n` : ''}${b.partnerBankName ? `Partner Bank: ${b.partnerBankName}\nPartner Address: ${b.partnerBankAddress}\nPartner SWIFT/BIC: ${b.partnerSwiftBic}\n` : ''}${b.notes ? `Note: ${b.notes}\n` : ''}Payment Reference: Include your email (${customerEmail || 'your email'}) or Order ID
==========================================`;
    handleCopy(fullText, 'full-bank-details');
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address to receive your account credentials.');
      return;
    }
    if (!telegramOrWhatsapp.trim()) {
      setErrorMsg('Please provide your Telegram username or WhatsApp number for instant delivery.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleConfirmTransfer = () => {
    if (!txHash.trim() || txHash.length < 4) {
      if (gateway.type === 'bank-transfer') {
        setErrorMsg('Please enter your Bank Transfer Reference Number, Sender Account Name, or Transaction ID.');
      } else if (gateway.type === 'fiat-wallet') {
        setErrorMsg('Please enter your Skrill Transaction ID / Reference Number or Sender Email.');
      } else {
        setErrorMsg('Please enter your Transaction Hash (TXID) or sender wallet address to verify payment.');
      }
      return;
    }
    setErrorMsg('');
    setStep(3);
    setIsVerifying(true);
    setVerifyProgress(10);

    // Verification progress simulation
    const interval = setInterval(() => {
      setVerifyProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          completeOrder();
          return 100;
        }
        return prev + 15;
      });
    }, 400);
  };

  const completeOrder = () => {
    setIsVerifying(false);
    const orderId = `CAG-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderDetails = {
      orderId,
      createdAt: new Date().toISOString(),
      items,
      totalAmountUsd: totalUsd,
      cryptoCurrency: selectedCrypto,
      cryptoAmount: totalUsd,
      walletAddress: gateway.address,
      customerEmail,
      telegramOrWhatsapp,
      txHash,
      status: 'verifying',
      deliveryEta: '5 - 15 Minutes'
    };

    setConfirmedOrder(newOrder);
    onOrderCreated(newOrder);
    setStep(4);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  const downloadReceipt = () => {
    if (!confirmedOrder) return;
    const isSkrill = confirmedOrder.cryptoCurrency === 'SKRILL';
    const isBank = confirmedOrder.cryptoCurrency.startsWith('BANK_');
    const gw = CRYPTO_GATEWAYS[confirmedOrder.cryptoCurrency];

    let paymentMethodDetails = '';
    if (isBank && gw.bankDetails) {
      const b = gw.bankDetails;
      paymentMethodDetails = `PAYMENT METHOD: Direct Bank Transfer (${gw.name})
BENEFICIARY NAME: ${b.accountTitle}
ACCOUNT TYPE: ${b.accountType} (${b.currency})
BANK: ${b.bankName} (${b.bankAddress})
${b.accountNumber ? `ACCOUNT NUMBER: ${b.accountNumber}\n` : ''}${b.iban ? `IBAN: ${b.iban}\n` : ''}${b.swiftBic ? `SWIFT / BIC: ${b.swiftBic}\n` : ''}${b.sortCode ? `SORT CODE: ${b.sortCode}\n` : ''}${b.routingAch ? `ACH ROUTING: ${b.routingAch}\n` : ''}${b.routingWire ? `WIRE ROUTING: ${b.routingWire}\n` : ''}${b.partnerBankName ? `PARTNER BANK: ${b.partnerBankName} (BIC: ${b.partnerSwiftBic})\n` : ''}SENDER / TRANSFER REFERENCE: ${confirmedOrder.txHash}`;
    } else if (isSkrill) {
      paymentMethodDetails = `PAYMENT METHOD: Skrill E-Wallet (onlinespay247@gmail.com)
SKRILL TRANSACTION / SENDER: ${confirmedOrder.txHash}`;
    } else {
      paymentMethodDetails = `PAYMENT METHOD: ${confirmedOrder.cryptoCurrency} (Crypto Gateway)
OUR WALLET: ${confirmedOrder.walletAddress}
TX HASH / SENDER: ${confirmedOrder.txHash}`;
    }

    const content = `=====================================================
CASHAPPAGENT - OFFICIAL ORDER INVOICE & RECEIPT
Domain: cashappagent.com
Support Telegram: ${CONTACT_INFO.telegram}
Support WhatsApp: ${CONTACT_INFO.whatsapp}
Support Email: ${CONTACT_INFO.email}
=====================================================
ORDER ID: ${confirmedOrder.orderId}
DATE: ${new Date(confirmedOrder.createdAt).toLocaleString()}
DELIVERY EMAIL: ${confirmedOrder.customerEmail}
TELEGRAM / WHATSAPP: ${confirmedOrder.telegramOrWhatsapp}
-----------------------------------------------------
ITEMS PURCHASED:
${confirmedOrder.items
  .map(
    (it, idx) =>
      `${idx + 1}. ${it.product.name} (Qty: ${it.quantity}) - $${it.product.price * it.quantity} USD`
  )
  .join('\n')}
-----------------------------------------------------
TOTAL AMOUNT: $${confirmedOrder.totalAmountUsd} USD
${paymentMethodDetails}
STATUS: Payment Submitted & Queued for Instant Dispatch
DELIVERY ETA: 5 - 15 Minutes
=====================================================
PACKAGE CONTENTS UPON DISPATCH:
- Cash App Login Webmail & Password
- Email Recovery Access
- SSN & ID Verification Document Bundle
- Virtual Cash Card Details (CVV & Expiry)
- Bank Account & Direct Deposit Routing
- 30-Day Replacement Guarantee & Anti-Flag Guidelines
=====================================================
Need urgent dispatch? Message us on Telegram: ${CONTACT_INFO.telegram}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CashappAgent-Order-${confirmedOrder.orderId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  const isBankTransfer = gateway.type === 'bank-transfer';
  const isSkrillTransfer = gateway.type === 'fiat-wallet';

  const cryptoKeys: CryptoCurrency[] = ['TRX', 'BSC', 'ETH', 'SOL', 'BTC', 'LTC', 'DOGE'];
  const bankKeys: CryptoCurrency[] = ['BANK_USD_ACH', 'BANK_USD_SWIFT', 'BANK_EUR', 'BANK_GBP'];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#0e151c] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-emerald-950 via-[#0d2217] to-slate-900 px-6 py-4 border-b border-emerald-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00D632] text-black font-black flex items-center justify-center text-base">
              $
            </div>
            <div>
              <div className="text-sm font-black text-white flex items-center gap-2">
                <span>CashappAgent Secure Checkout</span>
                <span className="bg-[#00D632]/20 text-[#00D632] border border-[#00D632]/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Instant Dispatch
                </span>
              </div>
              <div className="text-[11px] text-slate-400">Total Due: <strong className="text-white font-bold">${totalUsd} USD</strong></div>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-slate-900/60 px-6 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400">
          <span className={step >= 1 ? 'text-[#00D632] flex items-center gap-1' : ''}>
            1. Details
          </span>
          <span className="text-slate-600">&rarr;</span>
          <span className={step >= 2 ? 'text-[#00D632] flex items-center gap-1' : ''}>
            2. Payment
          </span>
          <span className="text-slate-600">&rarr;</span>
          <span className={step >= 3 ? 'text-[#00D632] flex items-center gap-1' : ''}>
            3. Verification
          </span>
          <span className="text-slate-600">&rarr;</span>
          <span className={step === 4 ? 'text-[#00D632] flex items-center gap-1' : ''}>
            4. Dispatch
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: CONTACT DETAILS */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order Summary ({items.length} item{items.length > 1 ? 's' : ''})</div>
                {items.map((it) => (
                  <div key={it.product.id} className="flex items-center justify-between text-xs text-slate-200">
                    <span className="font-semibold">{it.product.name} &times; {it.quantity}</span>
                    <span className="text-[#00D632] font-black">${it.product.price * it.quantity} USD</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Delivery Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="checkout-email-input"
                    type="email"
                    required
                    placeholder="e.g. yourname@gmail.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#00D632] placeholder:text-slate-500"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Your account login credentials and document archive will be sent here.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Telegram Username or WhatsApp Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="checkout-contact-input"
                    type="text"
                    required
                    placeholder="e.g. @your_telegram or +1 234 567 8900"
                    value={telegramOrWhatsapp}
                    onChange={(e) => setTelegramOrWhatsapp(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#00D632] placeholder:text-slate-500"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Used for instant notification and real-time live support dispatch.
                  </span>
                </div>
              </div>

              <button
                type="submit"
                id="checkout-continue-to-payment-btn"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00A827] via-[#00D632] to-[#00FF44] hover:from-[#00B82B] text-black font-black text-sm shadow-xl shadow-[#00D632]/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Select Payment Method &amp; Pay ${totalUsd}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD SELECTION & SPECIFIC GATEWAY DETAILS */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Category Switcher Tabs */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  Select Payment Category:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('crypto');
                      setSelectedCrypto('TRX');
                    }}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      selectedCategory === 'crypto'
                        ? 'bg-emerald-950/80 border-[#00D632] text-white shadow-md shadow-emerald-950/50 ring-1 ring-[#00D632]'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <Coins className={`w-4 h-4 ${selectedCategory === 'crypto' ? 'text-[#00D632]' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold">Cryptocurrency</span>
                    <span className="text-[10px] text-slate-400">TRX, BSC, BTC, SOL...</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('skrill');
                      setSelectedCrypto('SKRILL');
                    }}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      selectedCategory === 'skrill'
                        ? 'bg-[#811245]/50 border-[#811245] text-pink-200 ring-2 ring-[#a01657]'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <Wallet className={`w-4 h-4 ${selectedCategory === 'skrill' ? 'text-pink-300' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold">Skrill E-Wallet</span>
                    <span className="text-[10px] text-slate-400">USD / EUR Direct</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('bank');
                      setSelectedCrypto('BANK_USD_ACH');
                    }}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      selectedCategory === 'bank'
                        ? 'bg-blue-950/80 border-blue-500 text-blue-200 ring-1 ring-blue-500'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <Landmark className={`w-4 h-4 ${selectedCategory === 'bank' ? 'text-blue-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold">Bank Transfer</span>
                    <span className="text-[10px] text-slate-400">ACH / SWIFT / SEPA / UK</span>
                  </button>
                </div>
              </div>

              {/* Sub-option pills */}
              {selectedCategory === 'crypto' && (
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400">Select Blockchain Token:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {cryptoKeys.map((cKey) => {
                      const gw = CRYPTO_GATEWAYS[cKey];
                      const isSel = selectedCrypto === cKey;
                      return (
                        <button
                          key={cKey}
                          type="button"
                          id={`crypto-select-${cKey.toLowerCase()}`}
                          onClick={() => setSelectedCrypto(cKey)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSel
                              ? 'bg-emerald-950/80 border-[#00D632] ring-1 ring-[#00D632]'
                              : 'bg-slate-900 border-slate-800 hover:bg-slate-800/80'
                          }`}
                        >
                          <div className="text-xs font-black text-white flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: gw.iconColor }} />
                              {cKey}
                            </span>
                            {isSel && <Check className="w-3.5 h-3.5 text-[#00D632]" />}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate mt-0.5">{gw.network.split(' ')[0]}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedCategory === 'bank' && (
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400">Select Bank Transfer Method:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {bankKeys.map((bKey) => {
                      const gw = CRYPTO_GATEWAYS[bKey];
                      const isSel = selectedCrypto === bKey;
                      return (
                        <button
                          key={bKey}
                          type="button"
                          id={`bank-select-${bKey.toLowerCase()}`}
                          onClick={() => setSelectedCrypto(bKey)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSel
                              ? 'bg-blue-950/70 border-blue-400 ring-1 ring-blue-400'
                              : 'bg-slate-900 border-slate-800 hover:bg-slate-800/80'
                          }`}
                        >
                          <div className="text-xs font-black text-white flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <Landmark className="w-3.5 h-3.5 text-blue-400" />
                              {bKey === 'BANK_USD_ACH' && 'USA Domestic ACH & Wire'}
                              {bKey === 'BANK_USD_SWIFT' && 'International SWIFT (USD)'}
                              {bKey === 'BANK_EUR' && 'Euro SEPA Transfer (EUR)'}
                              {bKey === 'BANK_GBP' && 'UK Faster Payments (GBP)'}
                            </span>
                            {isSel && <Check className="w-3.5 h-3.5 text-blue-400" />}
                          </div>
                          <div className="text-[11px] text-blue-200/80 mt-1">
                            {gw.badge.split('•')[0]}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PAYMENT DETAILS DISPLAY BOX */}

              {/* A. BANK TRANSFER CARD */}
              {isBankTransfer && gateway.bankDetails && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1829] via-[#091422] to-slate-950 border border-blue-800/60 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-900/60 pb-3">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-900/60 text-blue-200 border border-blue-700/50 mb-1">
                        <Landmark className="w-3 h-3 text-blue-300" />
                        {gateway.badge}
                      </div>
                      <h4 className="text-sm font-black text-white">{gateway.name}</h4>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-xs text-slate-300">Amount Due:</div>
                      <div className="text-base font-black text-blue-300 font-mono">
                        {calculatePaymentAmount(selectedCrypto, totalUsd)}
                      </div>
                    </div>
                  </div>

                  {/* Bank Details Field Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* Account Title / Beneficiary */}
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                      <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
                        <span>Beneficiary / Account Title:</span>
                        {copiedField === 'beneficiary' && <span className="text-[#00D632] font-bold">Copied!</span>}
                      </div>
                      <div className="flex items-center justify-between font-mono font-bold text-white">
                        <span>{gateway.bankDetails.accountTitle}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(gateway.bankDetails?.accountTitle || '', 'beneficiary')}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          title="Copy Name"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Account Type & Currency */}
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Account Type &amp; Currency:</div>
                      <div className="font-mono font-bold text-blue-200">
                        {gateway.bankDetails.accountType} &bull; Currency: <strong className="text-white">{gateway.bankDetails.currency}</strong>
                      </div>
                    </div>

                    {/* IBAN (if available) */}
                    {gateway.bankDetails.iban && (
                      <div className="sm:col-span-2 p-3 rounded-xl bg-slate-900/90 border border-blue-900/60 space-y-1">
                        <div className="text-[10px] uppercase font-bold text-blue-300 flex items-center justify-between">
                          <span>IBAN:</span>
                          {copiedField === 'iban' && <span className="text-[#00D632] font-bold">Copied IBAN!</span>}
                        </div>
                        <div className="flex items-center justify-between font-mono font-bold text-emerald-300 text-sm break-all">
                          <span className="select-all">{gateway.bankDetails.iban}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(gateway.bankDetails?.iban || '', 'iban')}
                            className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shrink-0 ml-2 transition-colors cursor-pointer"
                            title="Copy IBAN"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Account Number (for US ACH / UK / EUR) */}
                    {gateway.bankDetails.accountNumber && (
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                        <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
                          <span>Account Number:</span>
                          {copiedField === 'acc-num' && <span className="text-[#00D632] font-bold">Copied!</span>}
                        </div>
                        <div className="flex items-center justify-between font-mono font-bold text-white text-sm">
                          <span>{gateway.bankDetails.accountNumber}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(gateway.bankDetails?.accountNumber || '', 'acc-num')}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* SWIFT / BIC */}
                    {gateway.bankDetails.swiftBic && (
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                        <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
                          <span>SWIFT / BIC Code:</span>
                          {copiedField === 'swift' && <span className="text-[#00D632] font-bold">Copied!</span>}
                        </div>
                        <div className="flex items-center justify-between font-mono font-bold text-white">
                          <span>{gateway.bankDetails.swiftBic}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(gateway.bankDetails?.swiftBic || '', 'swift')}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Sort Code (UK / International) */}
                    {gateway.bankDetails.sortCode && (
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                        <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
                          <span>Sort Code:</span>
                          {copiedField === 'sortcode' && <span className="text-[#00D632] font-bold">Copied!</span>}
                        </div>
                        <div className="flex items-center justify-between font-mono font-bold text-white">
                          <span>{gateway.bankDetails.sortCode}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(gateway.bankDetails?.sortCode || '', 'sortcode')}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* US Routing Numbers (ACH & Wire) */}
                    {gateway.bankDetails.routingAch && (
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                        <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
                          <span>Routing Number (ACH):</span>
                          {copiedField === 'ach' && <span className="text-[#00D632] font-bold">Copied!</span>}
                        </div>
                        <div className="flex items-center justify-between font-mono font-bold text-white">
                          <span>{gateway.bankDetails.routingAch}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(gateway.bankDetails?.routingAch || '', 'ach')}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {gateway.bankDetails.routingWire && (
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                        <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
                          <span>Routing Number (Wire):</span>
                          {copiedField === 'wire' && <span className="text-[#00D632] font-bold">Copied!</span>}
                        </div>
                        <div className="flex items-center justify-between font-mono font-bold text-white">
                          <span>{gateway.bankDetails.routingWire}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(gateway.bankDetails?.routingWire || '', 'wire')}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Bank Name & Address */}
                    <div className="sm:col-span-2 p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 text-slate-300">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Receiving Bank &amp; Address:</div>
                      <div className="font-semibold text-white">{gateway.bankDetails.bankName}</div>
                      <div className="text-[11px] text-slate-400">{gateway.bankDetails.bankAddress}</div>
                      {gateway.bankDetails.partnerBankName && (
                        <div className="pt-2 border-t border-slate-800 text-[11px] text-blue-200">
                          <strong>Partner Bank:</strong> {gateway.bankDetails.partnerBankName} ({gateway.bankDetails.partnerBankAddress}) &bull; SWIFT/BIC: <strong className="font-mono text-white">{gateway.bankDetails.partnerSwiftBic}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 1-Click Copy All Bank Details Button */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      id="copy-full-bank-details-btn"
                      onClick={handleCopyFullBankDetails}
                      className="w-full py-2.5 px-4 rounded-xl bg-blue-900/50 hover:bg-blue-800/70 border border-blue-600/50 text-blue-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      {copiedField === 'full-bank-details' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedField === 'full-bank-details' ? 'All Bank Details Copied to Clipboard!' : 'Copy Full Bank Transfer Details'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* B. SKRILL CARD */}
              {isSkrillTransfer && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#200513] to-slate-950 border border-[#811245]/70 shadow-lg shadow-[#811245]/20 space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    <div
                      className="shrink-0 bg-white p-2 rounded-xl shadow-lg"
                      dangerouslySetInnerHTML={{ __html: generateCryptoQrSvg('onlinespay247@gmail.com', 120) }}
                    />
                    <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
                      <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-[#811245]/50 text-pink-200 border-[#a01657]">
                        {gateway.badge}
                      </div>
                      <div className="text-xs text-slate-300">
                        Amount to Send: <strong className="text-white font-black text-sm">${totalUsd} USD</strong>
                      </div>
                      <div className="text-[11px] font-mono font-bold text-pink-300">
                        {calculatePaymentAmount(selectedCrypto, totalUsd)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span>Official Recipient Skrill Email:</span>
                      {copiedField === 'skrill-email' && (
                        <span className="font-bold flex items-center gap-1 text-pink-400">
                          <Check className="w-3 h-3" /> Copied Skrill Email!
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-xl border font-mono text-xs break-all bg-slate-900/90 border-[#811245] text-pink-200 font-bold">
                      <span className="flex-1 select-all">{gateway.address}</span>
                      <button
                        id="copy-skrill-email-btn"
                        type="button"
                        onClick={() => handleCopy(gateway.address, 'skrill-email')}
                        className="p-2 rounded-lg font-bold shrink-0 transition-all cursor-pointer bg-[#811245] hover:bg-[#a01657] text-white"
                        title="Copy Skrill Email"
                      >
                        {copiedField === 'skrill-email' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] text-pink-200 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                      Skrill to Skrill Email: <strong className="text-white">onlinespay247@gmail.com</strong>
                    </span>
                    <a
                      href="https://account.skrill.com/wallet/account/login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#811245] hover:bg-[#991552] text-white text-[11px] font-bold transition-colors"
                    >
                      <span>Open Skrill</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              {/* C. CRYPTO WALLET & QR CARD */}
              {!isBankTransfer && !isSkrillTransfer && (
                <div className="p-5 rounded-2xl bg-black/50 border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    <div
                      className="shrink-0 bg-white p-2 rounded-xl shadow-lg"
                      dangerouslySetInnerHTML={{ __html: generateCryptoQrSvg(gateway.address, 130) }}
                    />
                    <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
                      <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-emerald-900/60 text-emerald-300 border border-emerald-700/40">
                        {gateway.badge}
                      </div>
                      <div className="text-xs text-slate-300">
                        Amount to Send: <strong className="text-white font-black text-sm">${totalUsd} USD</strong>
                      </div>
                      <div className="text-[11px] font-mono font-bold text-emerald-400">
                        {calculatePaymentAmount(selectedCrypto, totalUsd)}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Network: <strong className="text-slate-200">{gateway.network}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span>Deposit Address ({selectedCrypto}):</span>
                      {copiedField === 'crypto-addr' && (
                        <span className="font-bold flex items-center gap-1 text-[#00D632]">
                          <Check className="w-3 h-3" /> Copied Address!
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-xl border font-mono text-xs break-all bg-slate-900 border-slate-700 text-emerald-300">
                      <span className="flex-1 select-all">{gateway.address}</span>
                      <button
                        id="copy-wallet-address-btn"
                        type="button"
                        onClick={() => handleCopy(gateway.address, 'crypto-addr')}
                        className="p-2 rounded-lg font-bold shrink-0 transition-all cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-black"
                        title="Copy Address"
                      >
                        {copiedField === 'crypto-addr' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Reference / TXID Input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  {isBankTransfer 
                    ? 'Enter Bank Transfer Reference / Sender Account Name / Wire ID ' 
                    : isSkrillTransfer 
                    ? 'Enter Skrill Transaction ID / Reference Number or Sender Email ' 
                    : 'Enter Transaction Hash (TXID) or Sender Address '}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  id="checkout-txid-input"
                  type="text"
                  placeholder={
                    isBankTransfer 
                      ? "e.g. Wire-Ref-98234 or your account sender name" 
                      : isSkrillTransfer 
                      ? "e.g. 394829103 or your-skrill-email@domain.com" 
                      : "e.g. 0x8f2c... or TSez... or btc txid"
                  }
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-[#00D632] placeholder:text-slate-600"
                />
                <span className="text-[11px] text-slate-400 block">
                  {isBankTransfer 
                    ? 'Paste the transaction reference ID, confirmation number, or sender name from your online banking app.' 
                    : isSkrillTransfer 
                    ? 'Paste the Skrill transaction reference ID or sender email after sending payment.' 
                    : 'Paste the transaction hash from your wallet after broadcasting the payment.'}
                </span>
              </div>

              {/* Step 2 Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800 cursor-pointer"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  id="checkout-confirm-transfer-btn"
                  onClick={handleConfirmTransfer}
                  className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-[#00A827] via-[#00D632] to-[#00FF44] hover:from-[#00B82B] text-black font-black text-xs sm:text-sm shadow-xl shadow-[#00D632]/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>I Have Sent Payment &bull; Verify</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SIMULATED VERIFICATION */}
          {step === 3 && (
            <div className="text-center py-10 space-y-6">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-[#00D632] animate-spin" />
                <div className="w-12 h-12 rounded-full bg-emerald-950 flex items-center justify-center text-[#00D632]">
                  <RefreshCw className="w-6 h-6 animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-white font-['Outfit',sans-serif]">
                  {isBankTransfer
                    ? 'Verifying Bank Transfer Reference...'
                    : selectedCrypto === 'SKRILL' 
                    ? 'Verifying Skrill Payment Reference...' 
                    : `Broadcasting & Confirming on ${selectedCrypto}...`}
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {isBankTransfer
                    ? `Verifying bank wire/ACH payment reference for beneficiary Md Sayrul Islam against order total of $${totalUsd} USD.`
                    : selectedCrypto === 'SKRILL'
                    ? `Verifying Skrill transaction reference for recipient onlinespay247@gmail.com and matching against order total of $${totalUsd} USD.`
                    : `Connecting to node network. Verifying transaction hash and matching against order total of $${totalUsd} USD.`}
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-1.5">
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#00A827] to-[#00D632] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${verifyProgress}%` }}
                  />
                </div>
                <div className="text-[11px] text-emerald-400 font-mono font-bold">
                  {verifyProgress}% - {isBankTransfer ? 'Matched with Bank Clearing Network' : selectedCrypto === 'SKRILL' ? 'Matched with Skrill Gateway' : 'Synced with blockchain node'}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: ORDER CONFIRMATION & DISPATCH RECEIPT */}
          {step === 4 && confirmedOrder && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-600/40 text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#00D632] text-black flex items-center justify-center font-black">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="text-xl font-black text-white font-['Outfit',sans-serif]">
                  Order Placed Successfully!
                </h3>
                <div className="text-xs text-slate-300">
                  Order ID: <strong className="text-[#00D632] font-mono text-sm">{confirmedOrder.orderId}</strong>
                </div>
                <div className="text-[11px] text-slate-400">
                  Your payment confirmation has been received. Our automated preparation system is compiling your credentials.
                </div>
              </div>

              {/* Order Info Specs */}
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Payment Method:</span>
                  <span className="text-white font-bold">
                    {confirmedOrder.cryptoCurrency.startsWith('BANK_')
                      ? CRYPTO_GATEWAYS[confirmedOrder.cryptoCurrency].name
                      : confirmedOrder.cryptoCurrency === 'SKRILL'
                      ? 'Skrill E-Wallet (onlinespay247@gmail.com)'
                      : confirmedOrder.cryptoCurrency}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Delivery Target:</span>
                  <span className="text-white font-bold">{confirmedOrder.customerEmail}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Contact / Handle:</span>
                  <span className="text-white font-bold">{confirmedOrder.telegramOrWhatsapp}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Estimated Delivery:</span>
                  <span className="text-emerald-400 font-bold">{confirmedOrder.deliveryEta} (Instant)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Warranty:</span>
                  <span className="text-emerald-400 font-bold">30-Day Full Replacement Guarantee</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  id="download-order-receipt-btn"
                  onClick={downloadReceipt}
                  className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download Invoice (.txt)</span>
                </button>

                <a
                  id="order-telegram-dispatch-btn"
                  href={`${CONTACT_INFO.telegramUrl}?text=Hello,%20I%20just%20placed%20Order%20${confirmedOrder.orderId}%20on%20CashappAgent.%20Payment%20Method:%20${confirmedOrder.cryptoCurrency}.%20Please%20expedite%20my%20delivery.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-sky-900/60 hover:bg-sky-800/80 border border-sky-600/50 text-sky-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4 text-sky-400" />
                  <span>Notify Telegram Agent</span>
                </a>
              </div>

              {/* Order Again Primary Action */}
              <button
                id="order-more-accounts-btn"
                type="button"
                onClick={handleClose}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00A827] via-[#00D632] to-[#00FF44] hover:from-[#00B82B] text-black font-black text-sm shadow-xl shadow-[#00D632]/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Order More Accounts / Place Another Order</span>
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Close &amp; Return to Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
