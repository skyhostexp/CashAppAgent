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
  Phone, 
  Download, 
  RefreshCw, 
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink
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
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency>('TRX');
  const [customerEmail, setCustomerEmail] = useState('');
  const [telegramOrWhatsapp, setTelegramOrWhatsapp] = useState('');
  const [txHash, setTxHash] = useState('');
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyProgress, setVerifyProgress] = useState(0);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const totalUsd = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const gateway = CRYPTO_GATEWAYS[selectedCrypto];

  // Calculate estimated crypto amount
  const calculateCryptoAmount = (crypto: CryptoCurrency, usd: number) => {
    const gw = CRYPTO_GATEWAYS[crypto];
    if (crypto === 'TRX' || crypto === 'BSC' || crypto === 'ETH') {
      // Often paid as 1:1 USDT or exact coin
      if (crypto === 'TRX') return `${usd.toFixed(2)} USDT / ${(usd * 4.2).toFixed(1)} TRX`;
      if (crypto === 'BSC') return `${usd.toFixed(2)} USDT (BEP20) / ${(usd / gw.rateUsd).toFixed(4)} BNB`;
      if (crypto === 'ETH') return `${usd.toFixed(2)} USDT (ERC20) / ${(usd / gw.rateUsd).toFixed(4)} ETH`;
    }
    const amount = (usd / gw.rateUsd).toFixed(5);
    return `${amount} ${crypto}`;
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(gateway.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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
    if (!txHash.trim() || txHash.length < 8) {
      setErrorMsg('Please enter your Transaction Hash (TXID) or sender wallet address to verify payment.');
      return;
    }
    setErrorMsg('');
    setStep(3);
    setIsVerifying(true);
    setVerifyProgress(10);

    // Simulate blockchain verification steps
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

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback safe
    }
  };

  const downloadReceipt = () => {
    if (!confirmedOrder) return;
    const content = `=====================================================
CASHAPPSAGENT - OFFICIAL ORDER INVOICE & RECEIPT
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
PAYMENT GATEWAY: ${confirmedOrder.cryptoCurrency}
OUR WALLET: ${confirmedOrder.walletAddress}
TX HASH / SENDER: ${confirmedOrder.txHash}
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
    a.download = `CashappsAgent-Order-${confirmedOrder.orderId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0e151c] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-emerald-950 via-[#0d2217] to-slate-900 px-6 py-4 border-b border-emerald-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00D632] text-black font-black flex items-center justify-center text-base">
              $
            </div>
            <div>
              <div className="text-sm font-black text-white flex items-center gap-2">
                <span>CashappsAgent Crypto Checkout</span>
                <span className="bg-[#00D632]/20 text-[#00D632] border border-[#00D632]/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Instant Dispatch
                </span>
              </div>
              <div className="text-[11px] text-slate-400">Total Due: <strong className="text-white font-bold">${totalUsd} USD</strong></div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
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
            2. Send Crypto
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
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order Summary ({items.length} item)</div>
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
                <span>Select Crypto &amp; Pay ${totalUsd}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          )}

          {/* STEP 2: CRYPTO GATEWAY SELECTION & QR ADDRESS */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Crypto selector tabs */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Select Cryptocurrency Gateway:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(Object.keys(CRYPTO_GATEWAYS) as CryptoCurrency[]).map((cKey) => {
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
                          <span>{cKey}</span>
                          {isSel && <Check className="w-3.5 h-3.5 text-[#00D632]" />}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">{gw.network.split(' ')[0]}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* QR Code & Wallet Details Box */}
              <div className="p-5 rounded-2xl bg-black/50 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  {/* Visual QR Code */}
                  <div
                    className="shrink-0 bg-white p-2 rounded-xl shadow-lg"
                    dangerouslySetInnerHTML={{ __html: generateCryptoQrSvg(gateway.address, 130) }}
                  />

                  {/* Payment specs */}
                  <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
                    <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-900/60 text-emerald-300 border border-emerald-700/40">
                      {gateway.badge}
                    </div>
                    <div className="text-xs text-slate-300">
                      Amount to Send: <strong className="text-white font-black text-sm">${totalUsd} USD</strong>
                    </div>
                    <div className="text-[11px] text-emerald-400 font-mono">
                      Approx: {calculateCryptoAmount(selectedCrypto, totalUsd)}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Network: <strong className="text-slate-200">{gateway.network}</strong>
                    </div>
                  </div>
                </div>

                {/* Wallet Address Box with 1-click Copy */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>Deposit Address ({selectedCrypto}):</span>
                    {copied && <span className="text-[#00D632] font-bold flex items-center gap-1"><Check className="w-3 h-3" /> Copied to Clipboard</span>}
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-emerald-300 break-all">
                    <span className="flex-1 select-all">{gateway.address}</span>
                    <button
                      id="copy-wallet-address-btn"
                      onClick={handleCopyAddress}
                      className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-bold shrink-0 transition-all cursor-pointer"
                      title="Copy Address"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 italic">
                  {gateway.instruction}
                </div>
              </div>

              {/* TXID Input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  Enter Transaction Hash (TXID) or Sender Address <span className="text-red-400">*</span>
                </label>
                <input
                  id="checkout-txid-input"
                  type="text"
                  placeholder="e.g. 0x8f2c... or TSez... or btc txid"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-[#00D632] placeholder:text-slate-600"
                />
                <span className="text-[11px] text-slate-400 block">
                  Paste the transaction hash from your wallet after broadcasting the payment.
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800"
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
                  <span>I Have Transferred &bull; Verify</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SIMULATED BLOCKCHAIN VERIFICATION */}
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
                  Broadcasting &amp; Confirming on {selectedCrypto}...
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Connecting to node network. Verifying transaction hash and matching against order total of ${totalUsd} USD.
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
                  {verifyProgress}% - Synced with blockchain node
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
                  href={`${CONTACT_INFO.telegramUrl}?text=Hello,%20I%20just%20placed%20Order%20${confirmedOrder.orderId}%20on%20CashappsAgent.%20Please%20expedite%20my%20delivery.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-sky-900/60 hover:bg-sky-800/80 border border-sky-600/50 text-sky-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4 text-sky-400" />
                  <span>Notify Telegram Agent</span>
                </a>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={onClose}
                  className="text-xs text-slate-400 hover:text-white underline"
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
