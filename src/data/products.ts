import { AccountProduct } from '../types';

export const ACCOUNT_PRODUCTS: AccountProduct[] = [
  {
    id: 'btc-4k',
    name: 'BTC Enable 4k Cash App Account',
    category: 'btc-enabled',
    price: 249,
    limitDisplay: '$4,000 / Week',
    limitValue: 4000,
    btcEnabled: true,
    tag: 'Popular Starter',
    shortDesc: 'Fully verified personal Cash App account with Bitcoin buy/sell and external wallet withdrawal enabled. $4k weekly sending limit.',
    features: [
      'Bitcoin (BTC) Deposit & On-Chain Withdrawal Enabled',
      '$4,000 / Week Sending & Receiving Limit',
      '100% SSN & Driving License (DL) Verified',
      'Original Clean Email Access (Gmail / Outlook) Included',
      'Virtual & Physical Cash Card Linked with PIN & CVV',
      'Direct Deposit Routing & Account Number Ready',
      'Phone Number Linked with SMS Access Support',
      'Full Identity Documents & Selfie Scan Included',
      '30-Day Replacement Guarantee & 24/7 Priority Support',
      'Instant Automated Delivery (5-15 Minutes)'
    ],
    specs: {
      dailyLimit: '$2,500',
      weeklyLimit: '$4,000',
      monthlyLimit: '$15,000',
      btcWithdrawal: 'Enabled ($2,000/day BTC)',
      cashCard: 'Active (Virtual + Linked)',
      directDeposit: 'Active with Bancorp / Sutton Bank',
      documents: 'SSN + ID Front/Back Scan'
    }
  },
  {
    id: 'btc-10k',
    name: 'BTC Enable 10k Cash App Account',
    category: 'btc-enabled',
    price: 349,
    limitDisplay: '$10,000 / Week',
    limitValue: 10000,
    btcEnabled: true,
    tag: 'Best Value',
    isPopular: true,
    shortDesc: 'Aged high-tier verified Cash App account with enhanced Bitcoin transaction limits and $10k weekly volume capability.',
    features: [
      'Bitcoin (BTC) High-Volume Deposit & On-Chain Withdrawal',
      '$10,000 / Week Sending & Receiving Limit',
      'Aged USA Account (Clean Transaction History & High Trust Score)',
      '100% Fully Verified with Real SSN & State Photo ID',
      'Dedicated Primary Email + Security Recovery Info Included',
      'Virtual Cash Card Activated with Full Details (16-Digit, CVV, Exp)',
      'Bank & Direct Deposit Enabled with High Daily Limits',
      'Clean Cookies & Device Profile for Zero Verification Triggers',
      '30-Day Replacement Warranty & VIP Telegram Concierge',
      'Instant Auto-Delivery via Email & Telegram'
    ],
    specs: {
      dailyLimit: '$5,000',
      weeklyLimit: '$10,000',
      monthlyLimit: '$35,000',
      btcWithdrawal: 'Enabled ($5,000/day BTC)',
      cashCard: 'Active (Virtual + Card Ready)',
      directDeposit: 'Active with Bancorp / Sutton Bank',
      documents: 'SSN + DL + Utility Proof'
    }
  },
  {
    id: 'btc-25k',
    name: 'BTC Enable 25k Cash App Account',
    category: 'btc-enabled',
    price: 499,
    limitDisplay: '$25,000 / Week',
    limitValue: 25000,
    btcEnabled: true,
    tag: 'Maximum Limit',
    shortDesc: 'Premium institutional/business tier verified Cash App account with maximum $25,000 weekly limits and limitless BTC trading.',
    features: [
      'Maximum Bitcoin (BTC) On-Chain Transfer & High-Speed Trading',
      '$25,000 / Week Tier-3 Maximum Sending Limit',
      'High-Volume Business/Pro Tier with Aged Reputation',
      'Full Dual Verification (EIN / SSN + Government Real ID)',
      'Clean Webmail Access (Full Ownership Transfer)',
      'Cash Card Active + Apple Pay / Google Wallet Compatibility',
      'Enterprise Direct Deposit & Commercial ACH Routing',
      'Full Complete Document Bundle (ID Front/Back, SSN, Tax Doc)',
      '30-Day Full Replacement Warranty + VIP 1-on-1 Support',
      'Priority Fast-Track Delivery (5-10 Minutes)'
    ],
    specs: {
      dailyLimit: '$10,000',
      weeklyLimit: '$25,000',
      monthlyLimit: '$75,000+',
      btcWithdrawal: 'High-Tier Enabled ($10,000/day BTC)',
      cashCard: 'Active (Apple Pay & G-Pay Ready)',
      directDeposit: 'Commercial ACH & Sutton Bank',
      documents: 'SSN + DL Scan + Tax Document'
    }
  },
  {
    id: 'non-btc-4k',
    name: 'Non BTC Enable 4k Cash App Account',
    category: 'non-btc',
    price: 189,
    limitDisplay: '$4,000 / Week',
    limitValue: 4000,
    btcEnabled: false,
    tag: 'Budget Pick',
    shortDesc: 'Fully verified personal Cash App account with $4k weekly sending limit for standard USD peer-to-peer transfers and card usage.',
    features: [
      '$4,000 / Week USD Sending & Receiving Limit',
      '100% SSN & Government ID Identity Verified',
      'Complete Primary Email Access Included',
      'Cash Card Ready with PIN & CVV Details',
      'Bank Account & Direct Deposit Linkable',
      'Instant P2P Transfers with Zero Delays',
      'Full Verification Documentation Provided',
      '30-Day Replacement Guarantee Included',
      'Instant Auto-Delivery via Email / Telegram'
    ],
    specs: {
      dailyLimit: '$2,500',
      weeklyLimit: '$4,000',
      monthlyLimit: '$12,000',
      btcWithdrawal: 'Non-BTC (USD Only)',
      cashCard: 'Active (Virtual Details Provided)',
      directDeposit: 'Active with Routing Number',
      documents: 'SSN + ID Scan'
    }
  },
  {
    id: 'non-btc-10k',
    name: 'Non BTC Enable 10k Cash App Account',
    category: 'non-btc',
    price: 229,
    limitDisplay: '$10,000 / Week',
    limitValue: 10000,
    btcEnabled: false,
    tag: 'High Limit USD',
    shortDesc: 'Aged USD verified Cash App account with expanded $10,000 weekly volume limit for high-frequency transfers and payments.',
    features: [
      '$10,000 / Week Sending & Receiving Limit (USD)',
      'Aged USA Account with Established Good Standing',
      '100% ID & SSN Cleared Verification',
      'Original Email Access Included (Full Control)',
      'Cash Card Active + Instant Debit Card Cashout Support',
      'Direct Deposit Routing & Account Number Ready',
      'Device Session Cookies & Anti-Flag Safety Guidelines',
      '30-Day Full Replacement Warranty',
      'Instant Auto-Delivery (5-15 Minutes)'
    ],
    specs: {
      dailyLimit: '$5,000',
      weeklyLimit: '$10,000',
      monthlyLimit: '$30,000',
      btcWithdrawal: 'Non-BTC (USD Only)',
      cashCard: 'Active (Virtual + Linked)',
      directDeposit: 'Active with Sutton Bank',
      documents: 'SSN + ID Scan Front/Back'
    }
  },
  {
    id: 'non-btc-15k',
    name: 'Non BTC Enable 15k Cash App Account',
    category: 'non-btc',
    price: 259,
    limitDisplay: '$15,000 / Week',
    limitValue: 15000,
    btcEnabled: false,
    tag: 'Top USD Volume',
    shortDesc: 'Maximum limit Non-BTC verified Cash App account supporting up to $15,000 weekly turnover for seamless money transfers.',
    features: [
      '$15,000 / Week Sending & Receiving Limit (USD)',
      'Premium Aged Account with High Transaction History',
      'Complete KYC ID & SSN Verification Docs',
      'Dedicated Email with Master Password & 2FA Recovery',
      'Virtual Cash Card Activated with Full Details',
      'Direct Deposit Enabled with Fast ACH Processing',
      'Comprehensive Setup Guide for Safe Multi-Device Login',
      '30-Day Replacement Guarantee & 24/7 Agent Support',
      'Instant Automated Delivery via Email / Telegram'
    ],
    specs: {
      dailyLimit: '$7,500',
      weeklyLimit: '$15,000',
      monthlyLimit: '$45,000',
      btcWithdrawal: 'Non-BTC (USD Only)',
      cashCard: 'Active (Virtual + Ready)',
      directDeposit: 'Active with Routing Number',
      documents: 'SSN + ID Scan + Proof'
    }
  }
];
