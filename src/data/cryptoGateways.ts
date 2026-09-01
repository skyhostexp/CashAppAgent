import { CryptoCurrency, CryptoGateway, FaqItem, Testimonial } from '../types';

export const CONTACT_INFO = {
  telegram: '@CashappAgentTeam',
  telegramUrl: 'https://t.me/CashappAgentTeam',
  whatsapp: '+1 (253) 408-0049',
  whatsappUrl: 'https://wa.me/12534080049',
  email: 'support@cashappagent.com',
  emailUrl: 'mailto:support@cashappagent.com',
  domain: 'cashappagent.com',
  brandName: 'CashappAgent',
  businessHours: '24/7/365 Live Support',
  deliveryTime: '5 - 15 Minutes Instant Delivery'
};

export const CRYPTO_GATEWAYS: Record<CryptoCurrency, CryptoGateway> = {
  BSC: {
    id: 'BSC',
    name: 'Binance Smart Chain (BNB / BEP-20 USDT)',
    network: 'BNB Smart Chain (BEP20)',
    address: '0xb0a2b177e1770a03a5aa1d2629c52276fd93bdc6',
    rateUsd: 650, // 1 BNB approx
    iconColor: '#F0B90B',
    badge: 'Ultra Fast & Lowest Gas Fees (<$0.10)',
    instruction: 'Send BNB or USDT via BEP-20 network to the address below.'
  },
  TRX: {
    id: 'TRX',
    name: 'Tron / USDT (TRC-20)',
    network: 'Tron Network (TRC20)',
    address: 'TSezBSdMrdARFQQebAYiwzkPku1qHijQEh',
    rateUsd: 1.0, // 1 USDT approx
    iconColor: '#EF0027',
    badge: 'Most Popular for USDT (Instant 1-min confirmation)',
    instruction: 'Send USDT (TRC-20) or TRX to the Tron address below.'
  },
  ETH: {
    id: 'ETH',
    name: 'Ethereum / USDT (ERC-20)',
    network: 'Ethereum Mainnet (ERC20)',
    address: '0xb0a2b177e1770a03a5aa1d2629c52276fd93bdc6',
    rateUsd: 3400, // 1 ETH approx
    iconColor: '#627EEA',
    badge: 'Universal ERC-20 & ETH Supported',
    instruction: 'Send ETH or ERC-20 USDT directly to the Ethereum address.'
  },
  SOL: {
    id: 'SOL',
    name: 'Solana (SOL / SPL)',
    network: 'Solana Mainnet (SPL)',
    address: 'EDWaA1Kp6K9USLwuBAzmCvBxQkDiQ4Bk3LLgFxA2YdVr',
    rateUsd: 190, // 1 SOL approx
    iconColor: '#9945FF',
    badge: 'Sub-Second Blockchain Speed',
    instruction: 'Send SOL or SPL tokens to the Solana wallet address below.'
  },
  BTC: {
    id: 'BTC',
    name: 'Bitcoin (BTC Native)',
    network: 'Bitcoin Mainnet Network',
    address: '18QpVzNvW5YVtywK4Zih1VKLB2gEhRojT9',
    rateUsd: 96000, // 1 BTC approx
    iconColor: '#F7931A',
    badge: 'Original Bitcoin Network',
    instruction: 'Send BTC to the native Bitcoin legacy/SegWit address below.'
  },
  LTC: {
    id: 'LTC',
    name: 'Litecoin (LTC)',
    network: 'Litecoin Mainnet',
    address: 'LR676Tw3B3FatHCbnjT14D1TmGfpmwM2WG',
    rateUsd: 110, // 1 LTC approx
    iconColor: '#345D9D',
    badge: 'Fast & Low Fee Silver Crypto',
    instruction: 'Send LTC to the Litecoin address below.'
  },
  DOGE: {
    id: 'DOGE',
    name: 'Dogecoin (DOGE)',
    network: 'Dogecoin Network',
    address: 'DAVEHhBy6NVajnwF9g8eVHsQj1rmfVBx3n',
    rateUsd: 0.25, // 1 DOGE approx
    iconColor: '#C2A633',
    badge: 'Instant Doge Transfer',
    instruction: 'Send DOGE to the Dogecoin address below.',
    type: 'crypto'
  },
  SKRILL: {
    id: 'SKRILL',
    name: 'Skrill (USD / EUR / GBP E-Wallet & Cards)',
    network: 'Skrill Direct Transfer',
    address: 'onlinespay247@gmail.com',
    rateUsd: 1.0, // 1:1 USD
    iconColor: '#811245',
    badge: 'Official Skrill Account • Instant Transfer',
    instruction: 'Send USD to our verified Skrill account email: onlinespay247@gmail.com. In transaction note/reference, include your delivery email.',
    type: 'fiat-wallet'
  },
  BANK_USD_ACH: {
    id: 'BANK_USD_ACH',
    name: 'Bank Transfer (USA Domestic ACH & Wire)',
    network: 'US Domestic ACH / FedWire',
    address: '30000002977421',
    rateUsd: 1.0,
    iconColor: '#0070BA',
    badge: 'USA Domestic Bank • ACH (028000024) / Wire (021000021)',
    instruction: 'Transfer USD via domestic ACH or FedWire to Md Sayrul Islam at JP Morgan Chase NA. Include your delivery email or Order ID in the reference note.',
    type: 'bank-transfer',
    bankDetails: {
      accountTitle: 'Md Sayrul Islam',
      accountType: 'Checking',
      currency: 'USD',
      accountNumber: '30000002977421',
      routingAch: '028000024',
      routingWire: '021000021',
      bankName: 'JP Morgan Chase NA',
      bankAddress: '270 Park Avenue, New York, NY 10017, US',
      notes: 'Routing 028000024 is for domestic ACH; Routing 021000021 is for domestic Wire transfers.'
    }
  },
  BANK_USD_SWIFT: {
    id: 'BANK_USD_SWIFT',
    name: 'Bank Transfer (International SWIFT USD)',
    network: 'SWIFT International Wire',
    address: 'GB77 CLRB 0428 1200 0776 25',
    rateUsd: 1.0,
    iconColor: '#0A84FF',
    badge: 'International SWIFT Wire • Clear Bank & JPMorgan Chase',
    instruction: 'Send international USD SWIFT wire to Md Sayrul Islam at Clear Bank / JPMorgan Chase Bank, N.A. using IBAN GB77 CLRB 0428 1200 0776 25 and SWIFT/BIC CLRBGB22XXX.',
    type: 'bank-transfer',
    bankDetails: {
      accountTitle: 'Md Sayrul Islam',
      accountType: 'Checking (Current)',
      currency: 'USD',
      iban: 'GB77 CLRB 0428 1200 0776 25',
      swiftBic: 'CLRBGB22XXX',
      sortCode: '042812',
      bankName: 'Clear Bank',
      bankAddress: 'Borough Yards, 13 Dirty Lane, London, SE1 9PA, UK',
      partnerBankName: 'JPMorgan Chase Bank, N.A.',
      partnerBankAddress: 'New York, USA',
      partnerSwiftBic: 'CHASUS33',
      notes: 'SWIFT/BIC CLRBGB22XXX is only used for international SWIFT transfers.'
    }
  },
  BANK_EUR: {
    id: 'BANK_EUR',
    name: 'Bank Transfer (Euro SEPA / Clear Bank)',
    network: 'SEPA / Euro Bank Transfer',
    address: 'GB36CLRB04281271577257',
    rateUsd: 1.08,
    iconColor: '#003399',
    badge: 'EUR SEPA Transfer • Clear Bank London',
    instruction: 'Send EUR SEPA payment to Md Sayrul Islam using IBAN GB36CLRB04281271577257 and BIC CLRBGB22XXX at Clear Bank London.',
    type: 'bank-transfer',
    bankDetails: {
      accountTitle: 'Md Sayrul Islam',
      accountType: 'Checking (Current)',
      currency: 'EUR',
      iban: 'GB36CLRB04281271577257',
      swiftBic: 'CLRBGB22XXX',
      accountNumber: '71577257',
      sortCode: '042812',
      bankName: 'Clear Bank (Based in GB)',
      bankAddress: '133 Houndsditch, LONDON, EC3A 7BX'
    }
  },
  BANK_GBP: {
    id: 'BANK_GBP',
    name: 'Bank Transfer (UK Faster Payments / GBP)',
    network: 'UK Faster Payments / BACS',
    address: 'GB73CLRB04097200937068',
    rateUsd: 1.28,
    iconColor: '#C8102E',
    badge: 'UK Faster Payments & BACS • Sort: 040972',
    instruction: 'Send GBP transfer via UK Faster Payments to Md Sayrul Islam. Sort Code: 040972, Account Number: 00937068, Bank: Clear Bank London.',
    type: 'bank-transfer',
    bankDetails: {
      accountTitle: 'Md Sayrul Islam',
      accountType: 'Checking (Current)',
      currency: 'GBP',
      iban: 'GB73CLRB04097200937068',
      swiftBic: 'CLRBGB22XXX',
      accountNumber: '00937068',
      sortCode: '040972',
      bankName: 'Clear Bank (Based in GB)',
      bankAddress: '133 Houndsditch, LONDON, EC3A 7BX'
    }
  }
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus Vance',
    location: 'Austin, Texas',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    accountBought: 'BTC Enable 25k Cash App Account',
    date: '2 days ago',
    review: 'Received my 25k limit BTC Cash App account in less than 7 minutes after sending TRX USDT! The credentials worked seamlessly, original email was provided with recovery codes, and the Bitcoin withdrawal feature works like a charm without any holds. Outstanding service by CashappAgent.',
    verifiedPurchase: true
  },
  {
    id: 'test-2',
    name: 'Elena Rostova',
    location: 'Miami, Florida',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    accountBought: 'BTC Enable 10k Cash App Account',
    date: '3 days ago',
    review: 'I run an e-commerce agency and needed an aged Cash App account with BTC enabled. The 10k tier came with Sutton bank routing and full DL docs. Customer support on Telegram answered my questions in 30 seconds. 10/10 recommend!',
    verifiedPurchase: true
  },
  {
    id: 'test-3',
    name: 'David K. Miller',
    location: 'Chicago, Illinois',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    accountBought: 'Non BTC Enable 15k Cash App Account',
    date: '1 week ago',
    review: 'Best website to buy verified Cash App accounts. Clean interface, instant crypto gateway with QR codes. Ordered the 15k Non-BTC account and was able to receive payments immediately. The 30-day warranty gives huge peace of mind.',
    verifiedPurchase: true
  },
  {
    id: 'test-4',
    name: 'Jordan Hayes',
    location: 'Seattle, Washington',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    accountBought: 'BTC Enable 4k Cash App Account',
    date: '1 week ago',
    review: 'The $249 4k BTC account is the best deal online. Full identity files included and clean Gmail login. I paid via Solana in 5 seconds. Everything is automated and legit.',
    verifiedPurchase: true
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What do I receive when I buy a verified Cash App account?',
    answer: 'When you purchase any verified Cash App account from CashappAgent, you receive a complete turnkey package containing: 1) Cash App login email & password, 2) Primary Email access (Gmail/Outlook) with recovery keys, 3) 2-Factor Authentication backup details or linked phone access, 4) Cash Card 16-digit number, Expiry, CVV & PIN, 5) Sutton/Bancorp Direct Deposit routing & account numbers, 6) Full identity documentation (SSN + Driving License / Passport scans), and 7) A step-by-step setup guide ensuring zero flags or triggers.'
  },
  {
    id: 'faq-2',
    category: 'Verification',
    question: 'What is the main difference between BTC Enable and Non-BTC Cash App accounts?',
    answer: 'BTC Enabled accounts have completed biometric identity verification specifically enabling Bitcoin wallet generation, depositing, buying, selling, and on-chain withdrawal to external hardware/software crypto wallets. Non-BTC accounts are 100% verified for high-volume USD peer-to-peer sending, receiving, debit card purchases, and direct deposits up to the specified limit without Bitcoin trading capabilities.'
  },
  {
    id: 'faq-3',
    category: 'Payments',
    question: 'How do the Crypto, Skrill, & Bank Transfer payment gateways work?',
    answer: 'We process payments via leading Cryptocurrencies (BSC, TRX, ETH, SOL, BTC, LTC, DOGE), Skrill E-Wallet (onlinespay247@gmail.com), and Direct Bank Transfers (USA Domestic ACH & Wire, International SWIFT USD, Euro SEPA, and UK Faster Payments/GBP). For Crypto, send exact coins or USDT to our official address and provide your TXID. For Skrill, transfer to onlinespay247@gmail.com and input your reference. For Bank Transfers, use our provided bank details for Md Sayrul Islam and enter your transfer reference. Automated credential dispatch takes only 5-15 minutes.'
  },
  {
    id: 'faq-4',
    category: 'Security',
    question: 'Is there a replacement warranty or guarantee?',
    answer: 'Yes! Every verified account purchased on CashappAgent includes our comprehensive 30-Day Full Replacement Warranty. If you encounter any unexpected restriction or verification issue that cannot be resolved while following our safe login guidelines, our support team will provide a brand new replacement account free of charge.'
  },
  {
    id: 'faq-5',
    category: 'General',
    question: 'How fast is the delivery after payment confirmation?',
    answer: 'Delivery is typically completed within 5 to 15 minutes. The account credentials and document archive will be sent directly to your provided email address and/or Telegram username. You can also track your real-time order status directly on cashappagent.com using your Order ID.'
  },
  {
    id: 'faq-6',
    category: 'Security',
    question: 'How should I safely log into my new Cash App account?',
    answer: 'We recommend using a clean residential USA IP proxy or VPN matching the state of the account holder, or a fresh mobile device without prior banned Cash App sessions. Clear previous browser cache or reinstall the Cash App mobile application. Detailed safe login documentation is included with your order.'
  }
];
