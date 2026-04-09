/**
 * Payment Gateway Configuration
 * Supports DPO Pay and Flutterwave for international cards and M-Pesa
 */

export type PaymentGateway = 'dpo-pay' | 'flutterwave';
export type Currency = 'USD' | 'KES' | 'GBP' | 'EUR';
export type PaymentMethod = 'card' | 'mpesa' | 'bank-transfer';

// DPO Pay Configuration
export const DPO_PAY_CONFIG = {
  gatewayId: process.env.REACT_APP_DPO_GATEWAY_ID || 'DEMO',
  serviceType: 30001, // Travel and tourism service code
  companyRef: 'NorthernFront-Safari-Booking',
  companyToken: process.env.REACT_APP_DPO_COMPANY_TOKEN || 'DEMO_TOKEN',
  successUrl: `${process.env.REACT_APP_BASE_URL || 'http://localhost:5173'}/payment/success`,
  cancelUrl: `${process.env.REACT_APP_BASE_URL || 'http://localhost:5173'}/payment/cancel`,
  failureUrl: `${process.env.REACT_APP_BASE_URL || 'http://localhost:5173'}/payment/failure`,
  defaultCurrency: 'USD' as Currency,
  supportedCurrencies: ['USD', 'KES', 'GBP', 'EUR'],
};

// Flutterwave Configuration
export const FLUTTERWAVE_CONFIG = {
  publicKey: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY || 'DEMO_PUBLIC_KEY',
  secretKey: process.env.REACT_APP_FLUTTERWAVE_SECRET_KEY || 'DEMO_SECRET_KEY',
  environment: (process.env.REACT_APP_ENV || 'development') === 'production' ? 'production' : 'staging',
  baseUrl: 'https://api.flutterwave.com/v3',
  webhookUrl: `${process.env.REACT_APP_BASE_URL || 'http://localhost:5173'}/webhooks/flutterwave`,
  defaultCurrency: 'KES' as Currency,
  supportedCurrencies: ['USD', 'KES', 'GBP', 'EUR', 'XOF'],
};

// Payment Method Configuration
export const PAYMENT_METHODS: Record<PaymentMethod, {
  label: string;
  description: string;
  gateways: PaymentGateway[];
  currencies: Currency[];
}> = {
  'card': {
    label: 'International Card',
    description: 'Visa, Mastercard, American Express',
    gateways: ['dpo-pay', 'flutterwave'],
    currencies: ['USD', 'GBP', 'EUR', 'KES'],
  },
  'mpesa': {
    label: 'M-Pesa (Kenya)',
    description: 'Instant mobile money payment',
    gateways: ['flutterwave'],
    currencies: ['KES'],
  },
  'bank-transfer': {
    label: 'Bank Transfer',
    description: 'Direct bank account deposit',
    gateways: [], // Requires manual handling
    currencies: ['USD', 'KES'],
  },
};

// Compliance Configuration
export const COMPLIANCE = {
  tourismLevyRate: 0.02, // 2% mandatory tourism levy
  operationalMarginRate: 0.18, // 18% operational margin
  vatRate: 0.16, // 16% VAT in Kenya (if applicable)
  amrefInsuranceRequired: true,
  currencyConversionRate: {
    'KES_TO_USD': 130, // Approximate rate; should be fetched in production
    'USD_TO_KES': 130,
  },
};

// Payment Processing Fees
export const PAYMENT_FEES: Record<PaymentMethod, Record<Currency, number>> = {
  'card': {
    'USD': 0.035, // 3.5% + fixed fee
    'KES': 0.035,
    'GBP': 0.03,
    'EUR': 0.03,
  },
  'mpesa': {
    'USD': 0,
    'KES': 0.01, // 1% for M-Pesa
    'GBP': 0,
    'EUR': 0,
  },
  'bank-transfer': {
    'USD': 0.02,
    'KES': 100, // Flat fee in KES
    'GBP': 0.02,
    'EUR': 0.02,
  },
};

// Webhook Signatures
export interface WebhookPayload {
  transactionId: string;
  amount: number;
  currency: Currency;
  status: 'success' | 'pending' | 'failed' | 'cancelled';
  paymentMethod: PaymentMethod;
  orderId: string;
  timestamp: string;
  signature: string;
}

/**
 * Initialize payment gateway
 */
export function initializePaymentGateway(gateway: PaymentGateway): void {
  if (gateway === 'dpo-pay') {
    // Load DPO Pay SDK
    const script = document.createElement('script');
    script.src = 'https://secure.3gdirectpay.com/API/v6/js/PaymentProcessing.js';
    script.async = true;
    document.head.appendChild(script);
  } else if (gateway === 'flutterwave') {
    // Load Flutterwave SDK
    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.async = true;
    document.head.appendChild(script);
  }
}

/**
 * Format payment method for display
 */
export function formatPaymentMethod(method: PaymentMethod): string {
  const methods: Record<PaymentMethod, string> = {
    'card': 'Credit/Debit Card',
    'mpesa': 'M-Pesa',
    'bank-transfer': 'Bank Transfer',
  };
  return methods[method] || 'Unknown';
}

/**
 * Get available payment methods for a currency
 */
export function getAvailablePaymentMethods(currency: Currency): PaymentMethod[] {
  return Object.entries(PAYMENT_METHODS)
    .filter(([, config]) => config.currencies.includes(currency))
    .map(([method]) => method as PaymentMethod);
}

/**
 * Calculate payment fee
 */
export function calculatePaymentFee(
  amount: number,
  currency: Currency,
  method: PaymentMethod
): { fee: number; total: number } {
  const feeRate = PAYMENT_FEES[method]?.[currency] || 0;
  const fee = method === 'bank-transfer' && typeof feeRate === 'number' && feeRate < 1
    ? feeRate // Flat fee
    : amount * feeRate; // Percentage fee

  return {
    fee: Math.round(fee),
    total: Math.round(amount + fee),
  };
}

/**
 * Validate payment configuration for environment
 */
export function validatePaymentConfig(gateway: PaymentGateway): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (gateway === 'dpo-pay') {
    if (!DPO_PAY_CONFIG.gatewayId || DPO_PAY_CONFIG.gatewayId === 'DEMO') {
      errors.push('DPO Pay Gateway ID not configured');
    }
    if (!DPO_PAY_CONFIG.companyToken || DPO_PAY_CONFIG.companyToken === 'DEMO_TOKEN') {
      errors.push('DPO Pay Company Token not configured');
    }
  } else if (gateway === 'flutterwave') {
    if (!FLUTTERWAVE_CONFIG.publicKey || FLUTTERWAVE_CONFIG.publicKey === 'DEMO_PUBLIC_KEY') {
      errors.push('Flutterwave Public Key not configured');
    }
    if (!FLUTTERWAVE_CONFIG.secretKey || FLUTTERWAVE_CONFIG.secretKey === 'DEMO_SECRET_KEY') {
      errors.push('Flutterwave Secret Key not configured');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Export all for convenience
export const paymentConfig = {
  DPO_PAY_CONFIG,
  FLUTTERWAVE_CONFIG,
  PAYMENT_METHODS,
  COMPLIANCE,
  PAYMENT_FEES,
  initializePaymentGateway,
  formatPaymentMethod,
  getAvailablePaymentMethods,
  calculatePaymentFee,
  validatePaymentConfig,
};
