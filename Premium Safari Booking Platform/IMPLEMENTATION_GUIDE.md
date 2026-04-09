# Northern Front Tours & Adventures - Implementation Guide

## Architecture Overview

The Northern Front Tours website implements a six-phase immersive digital experience with an algorithmic pricing engine and payment gateway integration.

### Phase 1: Hero Section (Immersive Visual Hook)
- **Component**: `Hero.tsx`
- **Features**:
  - Full-viewport background with wildlife imagery
  - Animated text reveal on scroll
  - Call-to-action buttons linking to booking experience
  - Color palette: Desert ochre (#C9A96E), Savannah gold (#D4AF37), Charcoal (#36454F)

### Phase 2: Discovery Grid (Interactive Masonry)
- **Component**: `NorthernWonders.tsx`
- **Features**:
  - Responsive masonry grid (4 cols desktop, 2 tablet, 1 mobile)
  - 6-8 destination tiles with hover-to-play video loops
  - Destinations:
    - Samburu National Reserve & Buffalo Springs
    - Ol Pejeta Conservancy
    - Borana Conservancy
    - Sabache Safari Eco-Lodge
    - Chalbi Desert
    - Lake Turkana & Sibiloi
  - Click navigation to destination detail pages

### Phase 3: Scroll-Blur Narrative Pivot
- **Component**: `GuideStory.tsx`
- **Features**:
  - Full-page hero image with progressive blur effect
  - Ali B.'s personalized "Guide's Note" emerges on scroll
  - Backdrop-filter: blur(12px) with opacity: 0.6
  - Circular profile image with contact details
  - "BOOK YOUR EXPEDITION" CTA button

### Phase 4: Multi-Step Booking Form
- **Component**: `BookingExperience.tsx`
- **Features**:
  - 6-step card form (one question per view)
  - Conditional logic based on nationality, group size, interests
  - Real-time pricing calculation
  - Form steps:
    1. Identity (Name, Email, Phone, Nationality)
    2. Destination Selection
    3. Group Composition (Size, Duration)
    4. Accommodation Type (Luxury Lodge vs. Mobile Camping)
    5. Interests Selection (Photography, Culture, Adventure)
    6. Review & Quote Summary

### Phase 5: Algorithmic Pricing Engine
- **File**: `src/utils/pricingEngine.ts`
- **Formula**: 
  ```
  TC = (P_entry + V_daily + A_night + G_daily + I_evac) × (1 + M)
  ```
  
  Where:
  - **P_entry**: Park entrance fees (varies by destination & nationality)
  - **V_daily**: Vehicle rental (4x4 Land Cruiser daily rate)
  - **A_night**: Accommodation (lodge or camping per night)
  - **G_daily**: Guide services (Ali B. or partner guide daily rate)
  - **I_evac**: Insurance/Safety surcharge (AMREF Maisha Tourist Bronze - $35 mandatory)
  - **M**: Markup factor (2% tourism levy + 18% operational margin = 20% total)

#### 2026 Pricing Tiers

| Destination | Citizen (KSH) | Resident (KSH) | Non-Resident (USD) |
|---|---|---|---|
| Samburu/Buffalo Springs | 800 | 1,600 | $85 |
| Ol Pejeta | 2,000 | 3,500 | $110 |
| Borana | 1,000 | 2,000 | $100 |
| Lake Turkana | 500 | 675 | $50 |
| Chalbi Desert | 400 | 600 | $40 |

#### Vehicle & Accommodation Rates

- **Vehicle (4x4 Land Cruiser)**: $180/day USD (~23,400 KSH)
- **Luxury Lodge**: $450/night USD per person (~58,500 KSH)
- **Mobile Camping**: $120/night USD per person (~15,600 KSH)
- **Guide (Standard)**: $120/day USD (~15,600 KSH)
- **Guide (Premium - Ali B.)**: $200/day USD (~26,000 KSH)
- **AMREF Insurance**: $35 per person (mandatory for all expeditions)

### Phase 6: Payment Gateway & Compliance
- **File**: `src/utils/paymentConfig.ts`
- **Supported Gateways**:
  - **DPO Pay**: International cards (Visa, Mastercard, Amex), multi-currency
  - **Flutterwave**: Cards + M-Pesa STK Push, merchant dashboard
- **Payment Methods**:
  - Credit/Debit Cards (USD, GBP, EUR, KES)
  - M-Pesa STK (KES only)
  - Bank Transfer
- **Compliance**:
  - 2% Tourism Levy (auto-applied)
  - VAT calculation (16% in Kenya if applicable)
  - Currency conversion at real-time rates

---

## Component Structure

```
src/
├── app/
│   ├── App.tsx (Main app orchestrator)
│   └── components/
│       ├── Hero.tsx (Phase 1)
│       ├── NorthernWonders.tsx (Phase 2)
│       ├── GuideStory.tsx (Phase 3)
│       ├── BookingExperience.tsx (Phase 4)
│       ├── CulturalRespectFooter.tsx (Ethical guidelines)
│       └── TrustFooter.tsx (Footer navigation)
├── utils/
│   ├── pricingEngine.ts (Phase 5 - Pricing logic)
│   ├── destinations.ts (Destination data with guide notes)
│   └── paymentConfig.ts (Phase 6 - Payment setup)
└── styles/
    ├── index.css
    ├── tailwind.css
    └── theme.css
```

---

## Usage

### Pricing Calculation
```typescript
import { calculatePrice, formatCurrency } from '../utils/pricingEngine';

const quote = calculatePrice({
  destination: 'samburu',
  nationality: 'non-resident',  // 'kenyan-citizen' | 'kenyan-resident' | 'non-resident'
  groupSize: 4,
  accommodation: 'luxury-lodge',  // 'luxury-lodge' | 'mobile-camping'
  durationDays: 5,
  guidePremium: false,            // false = standard, true = Ali B. premium
  currency: 'USD'                 // 'USD' | 'KSH'
});

console.log(quote.total);           // $3,850 (example)
console.log(formatCurrency(quote.total, quote.currency)); // "$3,850.00"
console.log(quote.itemized);        // Detailed breakdown
```

### Destination Data
```typescript
import { getDestination, getAllDestinations } from '../utils/destinations';

const samburu = getDestination('samburu');
console.log(samburu.guideNote);     // Ali B.'s personalized narrative
console.log(samburu.signature);     // Signature experience
console.log(samburu.features);      // Array of highlights
```

### Payment Gateway Setup
```typescript
import { 
  initializePaymentGateway, 
  validatePaymentConfig,
  getAvailablePaymentMethods 
} from '../utils/paymentConfig';

// Initialize payment gateway
initializePaymentGateway('flutterwave');

// Validate configuration
const { valid, errors } = validatePaymentConfig('dpo-pay');

// Check available methods for currency
const methods = getAvailablePaymentMethods('KES');
// Returns: ['card', 'mpesa', 'bank-transfer']
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
# Payment Gateway Configuration
REACT_APP_DPO_GATEWAY_ID=your_dpo_gateway_id
REACT_APP_DPO_COMPANY_TOKEN=your_dpo_company_token
REACT_APP_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
REACT_APP_FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key

# Application Settings
REACT_APP_BASE_URL=http://localhost:5173
REACT_APP_ENV=development
```

---

## Styling & Design System

### Color Palette
- **Primary**: Desert Ochre (#C9A96E)
- **Secondary**: Savannah Gold (#D4AF37)
- **Neutral**: Charcoal (#36454F)
- **Accent**: Wildlife Tan (#D2B48C)
- **Background**: Off-white/Cream (#F5F1E8)

### Responsive Breakpoints
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

### Key Classes
- `.text-[#d4a574]` = Primary gold accent
- `.bg-[#1a1511]` = Dark background
- `text-white/60` = Secondary text
- `backdrop-blur-sm` = Subtle blur effect

---

## Cultural Respect & Ethical Guidelines

All experiences adhere to strict ethical standards outlined in `CulturalRespectFooter.tsx`:

### Photography Ethics
- All photography is by permission only
- No filming of sacred ceremonies
- Maintain 25m+ distance from large predators
- Silence during wildlife viewing

### Community Engagement
- Fair compensation to local families
- Modest dress required for village visits
- Learn basic local language phrases
- Prioritize depth over spectacle

### Conservation Commitment
- Protected areas around waterholes
- No off-road driving except on established routes
- Zero-impact camping practices
- Portion of fees support conservation initiatives

---

## Performance Optimization

### Video Assets
- Format: WebM (VP9) or H.265
- Bitrate: 2-4 Mbps (hero), 500-1000 Kbps (loops)
- Target: <3s load on 3G/4G networks
- Hero video duration: ≤10s
- Grid loops: 3-5s each

### Image Optimization
- Hero images: <500KB (WebP + JPG fallback)
- Grid tiles: <100KB each
- Profile images: <50KB
- Lazy-loading enabled

### Bundle Optimization
- Code-split form components
- Lazy-load payment gateway SDKs
- Defer non-critical scripts
- Tree-shaking enabled in Vite config

---

## SEO & Metadata

### Primary Keywords
- "Luxury Northern Kenya Safari"
- "Private Guide Ali B."
- "Chalbi Desert Expedition"
- "Northern Five Safari Kenya"
- "Lake Turkana Jade Sea tour"

### Schema.org Implementation
- LocalBusiness structured data
- TourOperator microdata
- AggregateOffer (pricing schema)

---

## Future Enhancement Roadmap

### Phase 7: CRM Integration
- Lead summary formatting
- ZoFlowX/Pipedrive API integration
- Automated email workflows
- Trip data persistence

### Phase 8: Advanced Analytics
- Conversion funnel tracking
- Form abandonment analysis
- Payment gateway performance metrics
- User journey heat maps

### Phase 9: Multi-Language Support
- Internationalization (i18next)
- Swahili, French, German translations
- RTL support for Arabic markets

### Phase 10: Mobile App
- React Native version
- Offline guide access
- GPS-integrated trail navigation
- Live chat with Ali B.

---

## Troubleshooting

### Payment Gateway Not Loading
1. Verify environment variables are set
2. Check browser console for SDK load errors
3. Ensure CORS settings are configured
4. Test with `validatePaymentConfig()`

### Pricing Calculation Errors
1. Verify destination ID is valid (`getDestinationIds()`)
2. Check nationality parameter matches enum
3. Ensure durationDays is ≥ 3

### Scroll-Blur Not Working
1. Verify `motion/react` library is installed
2. Check `useScroll` hook is properly initialized
3. Ensure viewport target ref is correctly attached

---

## Contact & Support

**Master Guide**: Ali B.  
**Phone**: +254 724 001975  
**Email**: bookings@northernfronttours.com  
**Operating Region**: Northern Kenya (Samburu, Turkana, Marsabit Counties)

---

**Last Updated**: April 9, 2026  
**Version**: 1.0 (Full Launch)
