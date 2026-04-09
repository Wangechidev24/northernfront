/**
 * Northern Front Tours & Adventures - Pricing Engine
 * Formula: TC = (P_entry + V_daily + A_night + G_daily + I_evac) × (1 + M)
 * 
 * Where:
 * - P_entry: Park entrance fees (varies by destination & nationality)
 * - V_daily: Vehicle rental (4x4 Land Cruiser daily rate)
 * - A_night: Accommodation (lodge or camping per night)
 * - G_daily: Guide services (Ali B. or certified partner guide daily rate)
 * - I_evac: Insurance/Safety surcharge (AMREF Maisha Tourist Bronze)
 * - M: Markup factor (includes 2% Tourism Levy + operational margin)
 */

export type Nationality = 'kenyan-citizen' | 'kenyan-resident' | 'non-resident';
export type AccommodationType = 'luxury-lodge' | 'mobile-camping';

interface ParkFee {
  destination: string;
  citizenKsh: number;
  residentKsh: number;
  nonResidentUsd: number;
}

interface PricingBreakdown {
  parkFees: number;
  vehicleDaily: number;
  accommodationPerNight: number;
  guideDaily: number;
  amrefInsurance: number;
  subtotal: number;
  tourismLevy: number;
  operationalMargin: number;
  total: number;
  currency: 'USD' | 'KSH';
  itemized: {
    label: string;
    amount: number;
  }[];
}

// 2026 Park Entry Fees
const PARK_FEES: Record<string, ParkFee> = {
  'samburu': {
    destination: 'Samburu National Reserve',
    citizenKsh: 800,
    residentKsh: 1600,
    nonResidentUsd: 85,
  },
  'buffalo-springs': {
    destination: 'Buffalo Springs',
    citizenKsh: 800,
    residentKsh: 1600,
    nonResidentUsd: 85,
  },
  'ol-pejeta': {
    destination: 'Ol Pejeta Conservancy',
    citizenKsh: 2000,
    residentKsh: 3500,
    nonResidentUsd: 110,
  },
  'borana': {
    destination: 'Borana Conservancy',
    citizenKsh: 1000,
    residentKsh: 2000,
    nonResidentUsd: 100,
  },
  'lake-turkana': {
    destination: 'Lake Turkana & Sibiloi',
    citizenKsh: 500,
    residentKsh: 675,
    nonResidentUsd: 50,
  },
  'chalbi': {
    destination: 'Chalbi Desert',
    citizenKsh: 400,
    residentKsh: 600,
    nonResidentUsd: 40,
  },
};

// Vehicle costs (4x4 Land Cruiser daily rental)
const VEHICLE_DAILY_RATE = {
  USD: 180,
  KSH: 23400, // At ~130 KSH/USD
};

// Accommodation costs per night
const ACCOMMODATION_RATES = {
  'luxury-lodge': {
    USD: 450,
    KSH: 58500,
  },
  'mobile-camping': {
    USD: 120,
    KSH: 15600,
  },
};

// Guide daily rate
const GUIDE_DAILY_RATE = {
  premium: { USD: 200, KSH: 26000 }, // Ali B.
  standard: { USD: 120, KSH: 15600 }, // Partner guide
};

// AMREF Maisha Tourist Bronze insurance (mandatory for all northern expeditions)
const AMREF_INSURANCE_PER_PERSON = {
  USD: 35,
  KSH: 4550,
};

// Markup component
const MARKUP = {
  tourismLevy: 0.02, // 2% mandatory tourism levy
  operationalMargin: 0.18, // 18% operational margin (total M = 20%)
};

export function calculatePrice(options: {
  destination: string;
  nationality: Nationality;
  groupSize: number;
  accommodation: AccommodationType;
  durationDays: number;
  guidePremium?: boolean;
  currency?: 'USD' | 'KSH';
}): PricingBreakdown {
  const {
    destination,
    nationality,
    groupSize,
    accommodation,
    durationDays,
    guidePremium = false,
    currency = 'USD',
  } = options;

  const parkFee = PARK_FEES[destination];
  if (!parkFee) {
    throw new Error(`Unknown destination: ${destination}`);
  }

  // Get park entry fee based on nationality
  let P_entry = 0;
  if (currency === 'USD' && nationality === 'non-resident') {
    P_entry = parkFee.nonResidentUsd * groupSize * durationDays;
  } else if (currency === 'USD') {
    // Convert KSH to USD (approximately)
    const kshFee = nationality === 'kenyan-citizen' ? parkFee.citizenKsh : parkFee.residentKsh;
    P_entry = (kshFee / 130) * groupSize * durationDays;
  } else {
    // KSH currency
    P_entry =
      (nationality === 'kenyan-citizen' ? parkFee.citizenKsh : parkFee.residentKsh) *
      groupSize *
      durationDays;
  }

  // Vehicle daily rate (group cost, not per person)
  const V_daily =
    VEHICLE_DAILY_RATE[currency] * durationDays;

  // Accommodation per night (per person)
  const A_night =
    ACCOMMODATION_RATES[accommodation][currency] * durationDays * groupSize;

  // Guide daily rate (premium or standard)
  const guideRate = guidePremium ? GUIDE_DAILY_RATE.premium : GUIDE_DAILY_RATE.standard;
  const G_daily = guideRate[currency] * durationDays;

  // Insurance (AMREF - mandatory, per person)
  const I_evac = AMREF_INSURANCE_PER_PERSON[currency] * groupSize;

  // Subtotal before markup
  const subtotal = P_entry + V_daily + A_night + G_daily + I_evac;

  // Apply markup: 2% tourism levy + 18% operational margin = 20% total
  const tourismLevy = subtotal * MARKUP.tourismLevy;
  const operationalMargin = subtotal * MARKUP.operationalMargin;
  const M = 1 + MARKUP.tourismLevy + MARKUP.operationalMargin;

  // Total cost formula: TC = (P_entry + V_daily + A_night + G_daily + I_evac) × (1 + M)
  const total = subtotal * M;

  // Itemized breakdown
  const itemized = [
    { label: `Park Entry (${parkFee.destination})`, amount: P_entry },
    { label: 'Vehicle Rental (4x4 Land Cruiser)', amount: V_daily },
    { label: `Accommodation (${accommodation === 'luxury-lodge' ? 'Luxury Lodge' : 'Mobile Camping'})`, amount: A_night },
    { label: `Guide Services (${guidePremium ? 'Premium' : 'Standard'})`, amount: G_daily },
    { label: 'AMREF Maisha Insurance', amount: I_evac },
    { label: 'Tourism Levy (2%)', amount: tourismLevy },
    { label: 'Operational Margin', amount: operationalMargin },
  ];

  return {
    parkFees: P_entry,
    vehicleDaily: V_daily,
    accommodationPerNight: A_night,
    guideDaily: G_daily,
    amrefInsurance: I_evac,
    subtotal,
    tourismLevy,
    operationalMargin,
    total: Math.round(total),
    currency,
    itemized,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, currency: 'USD' | 'KSH'): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  } else {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  }
}

/**
 * Get park fee info
 */
export function getParkFeeInfo(destination: string): ParkFee | null {
  return PARK_FEES[destination] || null;
}

/**
 * Get all available destinations
 */
export function getDestinations(): string[] {
  return Object.keys(PARK_FEES);
}
