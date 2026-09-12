# NOIRÉ — Built For The After Hours

> **NOIRÉ** is a high-fashion digital portfolio showcase and editorial e-commerce experience designed for contemporary luxury streetwear. Built as a continuous interactive fashion film with connected Framer Motion scene transitions, editorial magazine layouts, and a complete simulated shopping experience.

---

## Brand Essence

* **Aesthetic**: Dark, Sophisticated, Modern, Confident, Minimal, Nocturnal.
* **Color System**: Monochromatic noir palette (`#080808`, `#121212`, `#F6F5F2`), 35mm film grain texture, and frosted glassmorphism.
* **Typography**: `Syne` (Avant-garde fashion display sans), `Italiana` (Haute-couture editorial serif), and `Plus Jakarta Sans` (Technical specifications & forms).

---

## Tech Stack

* **Framework**: [React 19](https://react.dev/)
* **Bundler**: [Vite 8](https://vitejs.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Motion & Transitions**: [Framer Motion](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Audio**: Native Web Audio API synth soundscape oscillator

---

## Features

1. **Dramatic Full-Screen Hero**: Staggered typography entrance, live Paris & Tokyo clocks, and ambient synth soundscape toggle.
2. **Asymmetrical Editorial Collection**: Flagship showcase (*After Dark Waxed Leather Bomber*) with interactive craft coordinates and inspection pins.
3. **Asymmetric Luxury Shop**: 12 curated streetwear pieces, category filters with live item counts, sorting, dual-image hover flips, and color swatches.
4. **Connected Scene Transitions**: Shared element `layoutId` expansion from product cards directly into the Product Detail view.
5. **Interactive Bag / Cart Drawer**: Free worldwide express shipping progress bar ($300 threshold), promo code discounts (`NOIRE10`), and `localStorage` persistence.
6. **Multi-Step Simulated Checkout**: 5-step clean flow (Information → Shipping → Payment → Review → Confirmation) with demo payment processing and order confirmation (`NO-XXXXX`).
7. **Visual Manifesto & Concierge**: Full-width panoramic photography break, brand pillars (*"LESS NOISE. MORE PRESENCE."*), VIP drop cipher registration, and FAQ accordions.

---

## Getting Started

### Prerequisites

* Node.js 18+ (tested on Node.js 24)
* npm 9+

### Installation

```bash
# Clone repository
git clone <repo-url>
cd portfolio

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
npm run build
```

Compiled production assets will be generated in `dist/`.

### Local Production Preview

```bash
npm run preview
```

---

## Deployment

This is a 100% static client-rendered Single Page Application (SPA). It can be deployed with zero backend configuration on:
* **Cloudflare Pages / Cloudflare Workers Static Assets**: `npx wrangler pages deploy dist`
* **Vercel**: Connect Git repository or run `vercel`
* **Netlify**: Connect Git repository or run `netlify deploy --prod --dir=dist`
* **GitHub Pages**: Deploy the `dist/` directory via GitHub Actions

---

## License

Fictional creative portfolio project. All trademarks and aesthetic concepts are created solely for portfolio demonstration purposes.
