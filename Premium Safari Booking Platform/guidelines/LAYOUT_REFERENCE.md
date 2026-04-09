# Northern Front Tours & Adventures - Website Layout Reference
## Premium Safari Booking Platform by Ali B.

**Last Updated:** April 9, 2026  
**Version:** 1.0  
**Status:** Immutable Reference Architecture

---

## Executive Summary

This document defines the **canonical layout and UX flow** for the Northern Front Tours & Adventures website. All implementation work must adhere strictly to these specifications. The layout comprises six interconnected phases that guide users from immersive visual experience through personalized booking.

---

## Phase 1: Hero Section (The Immersive Visual Hook)

### Layout Structure
- **Full-viewport background**: 100vh minimum height
- **Centered animation**: High-fidelity video or WebGL (Grevy's Zebra or Reticulated Giraffe)
- **Text overlay**: "Welcome to Northern Front" appears on scroll (fade-in + slide-up effect)
- **Branding**: Logo top-left or centered; typography from Northern Front business card

### Visual Requirements
**Grevy's Zebra**
- Large "Mickey Mouse" ears (distinctively oversized and rounded)
- Narrow imperial stripes stopping at pure white belly
- Robust equine trot or gallop motion
- Optional: Running toward/away from viewer (first-person safari feel)

**Reticulated Giraffe**
- Liver-colored polygonal spots (anatomically accurate)
- Rhythmic neck swaying for balance
- Same-side leg movement during gallop
- Backdrop: Mathews Range or Mount Ololokwe wide-angle shot

### Branding Elements
- **Color Palette**: Desert ochre (#C9A96E), Savannah gold (#D4AF37), Charcoal (#36454F)
- **Typography**: Business card font family (serif preferred)
- **Logo**: Positioned for visual prominence without obstructing animation

---

## Phase 2: Discovery Grid (Interactive Masonry)

### Layout Architecture
- **Grid Type**: Masonry/staggered layout
- **Responsive Columns**: 4 (desktop) → 2 (tablet) → 1 (mobile)
- **Tile Count**: 6-8 destination cards
- **Interaction**: Hover-to-play video loops; click to navigate

### Required Destinations (Non-negotiable)
1. Samburu National Reserve & Buffalo Springs
2. Ol Pejeta Conservancy
3. Borana Conservancy
4. Sabache Safari Eco-Lodge
5. Chalbi Desert
6. Lake Turkana ("The Jade Sea")

### Video Loop Specifications
- **Duration**: 3-5 seconds
- **Format**: WebM (VP9) or H.265
- **Behavior**: Muted, looping, auto-play on hover, cover fill
- **Performance**: < 3s load time on 3G/4G networks

---

## Phase 3: Destination Page (Scroll-Blur Narrative)

### Page Layout (Top to Bottom)
1. **Hero Image** (Full viewport): High-res destination photograph
2. **Scroll Trigger Zone**: Progressive blur effect as user scrolls
3. **Narrative Content**: Ali B.'s first-person "Guide's Note" (150-300 words)
4. **Profile Section** (Footer):
   - Circular profile image of Ali B.
   - Contact details (+254 724 001975)
   - "BOOK YOUR EXPEDITION" CTA button

### Scroll-Blur Effect (CRITICAL)
- **Trigger**: On scroll down
- **CSS**: `backdrop-filter: blur(12px); opacity: 0.6;`
- **Easing**: Linear or ease-out, 600-800ms transition
- **Purpose**: Text legibility while maintaining visual immersion

### Narrative Requirements
- **Tone**: First-person "lived experience" (sensory, personal anecdotes)
- **Structure**: Hook → experience → unique offering → transition to CTA
- **Avoid**: Generic marketing language; prioritize authenticity

---

## Phase 4: Booking Form (Multi-Step Personalization)

### Form Architecture
- **Type**: Card-based progressive disclosure
- **Flow**: One question per card; back/next navigation
- **Animation**: Subtle transitions between steps
- **Validation**: Real-time, non-intrusive error states

### Data Collection Steps

| Step | Fields | Conditional Logic |
|---|---|---|
| 1 | Name, Nationality*, Email | Nationality → fee tier lookup |
| 2 | Group Size (1, 2-4, 5-8, 8+) | Size → vehicle/accommodation options |
| 3 | Accommodation Type | Luxury Lodge OR Bespoke Mobile Camping |
| 4 | Interests (select up to 2) | Photography / Cultural / Extreme Adventure |
| 5 | Trip Duration & Dates | 3-7 days, 8-14 days, 15+ days |
| 6 | Review & Payment | Display calculated quote + payment options |

*Nationality is **mandatory** for fee tier calculation

---

## Phase 5: Pricing Engine (Algorithmic Quotation)

### Formula
$$TC = (P_{entry} + V_{daily} + A_{night} + G_{daily} + I_{evac}) \times (1 + M)$$

### Variable Definitions

**Park Entry Fees ($P_{entry}$)** — 2026 Tiers

| Destination | Non-Resident USD | Resident Ksh |
|---|---|---|
| Samburu / Buffalo Springs | $85 | 1,600 |
| Ol Pejeta | $110 | 3,500 |
| Lake Turkana | $50 | 675 |
| Borana (Private) | $80-120 | Private |

**Vehicle ($V_{daily}$)**
- Land Cruiser 4x4: $150-200 USD/day

**Accommodation ($A_{night}$)**
- Luxury Lodge: $300-600 USD/person/night
- Mobile Camping: $50-150 USD/person/night

**Guide Services ($G_{daily}$)**
- Ali B. (Premium): $200 USD/day
- Partner Guide: $100-150 USD/day

**Insurance Surcharge ($I_{evac}$)**
- AMREF Maisha Tourist Bronze: **$35/person** (MANDATORY)

**Markup ($M$)**
- Tourism Levy: +2% (auto-applied)
- Operational: +15-20%
- **Total**: 17-22%

### Display Requirements
- Itemized invoice breakdown
- Real-time currency conversion (USD ↔ Ksh)
- Clear total with tax/levy line items

---

## Phase 6: Payment Gateway

### Supported Gateways
- **DPO Pay** (Recommended) — International cards, multi-currency
- **Flutterwave** (Alternative) — Cards + M-Pesa integration

### Payment Methods
- International: Visa, Mastercard, Amex (USD/GBP)
- Local: M-Pesa STK Push (instant phone payment)
- Bank transfer (corporate bookings)

### Post-Payment Flow
1. Confirmation email to user
2. Formatted Lead Summary to Ali B.
3. CRM entry (ZoFlowX or Pipedrive)
4. Trip data stored for itinerary

---

## Design System Constants

### Color Palette
- **Primary**: Desert Ochre (#C9A96E)
- **Secondary**: Savannah Gold (#D4AF37)
- **Neutral**: Charcoal (#36454F)
- **Accent**: Wildlife Tan (#D2B48C)
- **Background**: Cream (#F5F1E8)

### Typography
- **Headlines**: Serif (Georgia, Domine, or business card font)
- **Body**: Clean sans-serif (Poppins, Inter, system fonts)
- **Base Size**: 16px mobile, 18px desktop

### Spacing
- Mobile gutter: 16px
- Tablet gutter: 24px
- Desktop gutter: 32px

### Responsive Breakpoints
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

---

## Performance Standards

### Video Assets
- Format: WebM (VP9) or H.265
- Bitrate: 2-4 Mbps (hero), 500-1000 Kbps (loops)
- Target: < 3s load on 3G/4G networks

### Images
- Hero: < 500KB (WebP + JPG fallback)
- Grid tiles: < 100KB each
- Ali B. profile: < 50KB

### SEO Keywords
- "Luxury Northern Kenya Safari"
- "Private Guide Ali B."
- "Chalbi Desert Expedition"
- "Northern Five Safari Kenya"

---

## Immutable Layout Components

✅ **MUST REMAIN UNCHANGED:**
1. Full-viewport hero with wildlife animation
2. Interactive masonry grid (6-8 tiles)
3. Scroll-blur effect on destination pages
4. Multi-step card form (6 steps)
5. Algorithmic pricing formula ($TC$ calculation)
6. Payment gateway integration
7. Ali B. as primary narrative voice
8. Cultural respect footer section

---

## Approval & Change Control

**Current Status**: Reference Architecture v1.0  
**Last Reviewed**: April 9, 2026  
**Any changes to this layout must be explicitly approved before implementation.**

