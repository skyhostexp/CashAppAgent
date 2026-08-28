export type AccountCategory = 'btc-enabled' | 'non-btc';

export type PageView = 
  | 'home' 
  | 'blog'
  | 'all-accounts' 
  | 'btc-accounts' 
  | 'non-btc-accounts' 
  | 'faq' 
  | 'contact' 
  | 'safety-guide' 
  | 'bulk-orders'
  | '404';

export interface AccountProduct {
  id: string;
  name: string;
  category: AccountCategory;
  price: number;
  limitDisplay: string;
  limitValue: number;
  btcEnabled: boolean;
  tag?: string;
  isPopular?: boolean;
  shortDesc: string;
  features: string[];
  specs: {
    dailyLimit: string;
    weeklyLimit: string;
    monthlyLimit: string;
    btcWithdrawal: string;
    cashCard: string;
    directDeposit: string;
    documents: string;
  };
}

export type CryptoCurrency = 'BSC' | 'TRX' | 'ETH' | 'SOL' | 'BTC' | 'LTC' | 'DOGE';

export interface CryptoGateway {
  id: CryptoCurrency;
  name: string;
  network: string;
  address: string;
  rateUsd: number; // approximate rate for conversion
  iconColor: string;
  badge: string;
  memoRequired?: boolean;
  instruction: string;
}

export interface CartItem {
  product: AccountProduct;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  totalAmountUsd: number;
  cryptoCurrency: CryptoCurrency;
  cryptoAmount: number;
  walletAddress: string;
  customerEmail: string;
  telegramOrWhatsapp: string;
  txHash?: string;
  status: 'pending_payment' | 'verifying' | 'delivering' | 'completed';
  deliveryEta: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  accountBought: string;
  date: string;
  review: string;
  verifiedPurchase: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Payments' | 'Verification' | 'Security';
}
