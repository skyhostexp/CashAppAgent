import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, CheckCircle2, Zap, X, ShoppingBag, ArrowUpRight } from 'lucide-react';

interface LiveOrder {
  id: string;
  customer: string;
  location: string;
  productName: string;
  price: number;
  crypto: string;
  cryptoColor: string;
  timeAgoMinutes: number;
  txHash: string;
}

const LIVE_ORDERS_POOL: LiveOrder[] = [
  {
    id: 'CA-94821',
    customer: 'Michael R.',
    location: 'Austin, TX',
    productName: 'BTC Enabled Cash App (Tier 2 - $10k Limit)',
    price: 349,
    crypto: 'Bitcoin (BTC)',
    cryptoColor: '#F7931A',
    timeAgoMinutes: 1,
    txHash: '3f8e...9a12'
  },
  {
    id: 'CA-94822',
    customer: 'Alex K.',
    location: 'Miami, FL',
    productName: 'BTC Enabled Cash App (Enterprise - $25k Limit)',
    price: 649,
    crypto: 'USDT (TRC20)',
    cryptoColor: '#26A17B',
    timeAgoMinutes: 2,
    txHash: '7c4d...88e0'
  },
  {
    id: 'CA-94823',
    customer: 'David P.',
    location: 'Los Angeles, CA',
    productName: 'Non-BTC Cash App (Tier 1 - $4k Limit)',
    price: 189,
    crypto: 'Solana (SOL)',
    cryptoColor: '#14F195',
    timeAgoMinutes: 3,
    txHash: '9a31...bc4f'
  },
  {
    id: 'CA-94824',
    customer: 'Marcus T.',
    location: 'Chicago, IL',
    productName: 'BTC Enabled Cash App (Tier 1 - $4k Limit)',
    price: 249,
    crypto: 'Litecoin (LTC)',
    cryptoColor: '#345D9D',
    timeAgoMinutes: 4,
    txHash: '1e5b...44a7'
  },
  {
    id: 'CA-94825',
    customer: 'James W.',
    location: 'New York, NY',
    productName: 'Agency Bundle (5x BTC Verified Accounts)',
    price: 1450,
    crypto: 'Bitcoin (BTC)',
    cryptoColor: '#F7931A',
    timeAgoMinutes: 5,
    txHash: '4a99...3d22'
  },
  {
    id: 'CA-94826',
    customer: 'Tyler B.',
    location: 'Atlanta, GA',
    productName: 'Non-BTC Cash App (Tier 2 - $10k Limit)',
    price: 289,
    crypto: 'USDT (TRC20)',
    cryptoColor: '#26A17B',
    timeAgoMinutes: 2,
    txHash: '8b22...ff10'
  },
  {
    id: 'CA-94827',
    customer: 'Jason M.',
    location: 'Seattle, WA',
    productName: 'BTC Enabled Cash App (Tier 3 - $15k Limit)',
    price: 449,
    crypto: 'Ethereum (ETH)',
    cryptoColor: '#627EEA',
    timeAgoMinutes: 6,
    txHash: '5e17...00bc'
  },
  {
    id: 'CA-94828',
    customer: 'Ethan S.',
    location: 'Phoenix, AZ',
    productName: 'Non-BTC Cash App (Tier 3 - $15k Limit)',
    price: 389,
    crypto: 'TRON (TRX)',
    cryptoColor: '#EF0027',
    timeAgoMinutes: 3,
    txHash: '2c88...19ae'
  },
  {
    id: 'CA-94829',
    customer: 'Kevin D.',
    location: 'Denver, CO',
    productName: 'BTC Enabled Cash App (Tier 2 - $10k Limit)',
    price: 349,
    crypto: 'Bitcoin (BTC)',
    cryptoColor: '#F7931A',
    timeAgoMinutes: 1,
    txHash: '6d41...77ee'
  },
  {
    id: 'CA-94830',
    customer: 'Brian H.',
    location: 'Houston, TX',
    productName: 'Enterprise Custom Limit Cash App',
    price: 799,
    crypto: 'USDT (TRC20)',
    cryptoColor: '#26A17B',
    timeAgoMinutes: 4,
    txHash: '9f04...aa33'
  },
  {
    id: 'CA-94831',
    customer: 'Justin P.',
    location: 'San Diego, CA',
    productName: 'BTC Enabled Cash App (Tier 2 - $10k Limit)',
    price: 349,
    crypto: 'Skrill (USD)',
    cryptoColor: '#811245',
    timeAgoMinutes: 2,
    txHash: 'SKR-84920'
  }
];

interface LiveOrderNotificationProps {
  onOpenOrderLookup?: () => void;
}

export const LiveOrderNotification: React.FC<LiveOrderNotificationProps> = ({ onOpenOrderLookup }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [timeOffset, setTimeOffset] = useState(1);

  // Cycle notification every 8.5 seconds
  useEffect(() => {
    if (isPaused || !isVisible) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % LIVE_ORDERS_POOL.length);
        setTimeOffset(Math.floor(Math.random() * 4) + 1);
        setIsVisible(true);
      }, 600);
    }, 8500);

    return () => clearInterval(interval);
  }, [isPaused, isVisible]);

  const currentOrder = LIVE_ORDERS_POOL[currentIndex];

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    // Re-show after 30 seconds
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % LIVE_ORDERS_POOL.length);
      setIsVisible(true);
    }, 30000);
  };

  return (
    <div
      id="live-order-notification-container"
      className="fixed bottom-5 left-5 z-40 max-w-[340px] sm:max-w-sm pointer-events-none select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence>
        {isVisible && currentOrder && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto bg-[#091017]/95 border border-emerald-500/30 hover:border-emerald-500/60 rounded-2xl p-3.5 shadow-2xl shadow-black/80 backdrop-blur-xl transition-colors group cursor-pointer"
            onClick={onOpenOrderLookup}
          >
            {/* Top Bar: Live Indicator & Dismiss */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D632] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D632]"></span>
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                  Live Order Verified
                </span>
                <span className="text-slate-600 text-[10px]">&bull;</span>
                <span className="text-slate-400 text-[10px] font-mono">
                  {timeOffset <= 1 ? 'Just now' : `${timeOffset}m ago`}
                </span>
              </div>

              <button
                onClick={handleDismiss}
                className="p-1 rounded-md text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors cursor-pointer"
                title="Dismiss"
                aria-label="Dismiss notification"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex items-start gap-3">
              {/* Product / Status Avatar */}
              <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center shrink-0 text-[#00D632] shadow-inner group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-4 h-4" />
              </div>

              {/* Order Info */}
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-black text-white truncate">
                    {currentOrder.customer}{' '}
                    <span className="text-slate-400 font-normal text-[11px]">
                      ({currentOrder.location})
                    </span>
                  </p>
                  <span className="text-xs font-mono font-black text-[#00D632] shrink-0">
                    ${currentOrder.price}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 font-medium truncate">
                  Purchased {currentOrder.productName}
                </p>

                {/* Footer Details: Crypto Paid & Tx Hash */}
                <div className="flex items-center gap-2 pt-1 text-[10px]">
                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: currentOrder.cryptoColor }}
                    />
                    <span className="font-mono text-slate-300">{currentOrder.crypto}</span>
                  </span>
                  <span className="text-slate-600">&bull;</span>
                  <span className="text-slate-400 font-mono flex items-center gap-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5 text-[#00D632]" />
                    <span>Instant Dispatch</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
