# Sonar BSB Events App — Version 1.0 Production Handoff & Session Guide

> **Project Milestone**: Version 1.0 Production Release (`v1.0`)  
> **Release Date**: November 2026  
> **Repository**: `sonar-bsb-events`  
> **Target Figma Design**: [Sonar-BSB-EventsApp-v1 (File: `i3bqFIafJrUlUqn2NMUwIl`)](https://www.figma.com/design/i3bqFIafJrUlUqn2NMUwIl/Sonar-BSB-EventsApp-v1)

---

## 🧭 Executive Summary

**Sonar BSB** is a dedicated web application for discovering and purchasing tickets for Brasília's underground electronic music scene. Built with zero external framework dependencies using vanilla HTML5, modern CSS3 (Custom Properties, Flexbox & Grid), and ES6+ JavaScript, it delivers a lightning-fast, production-grade experience across mobile, tablet, and widescreen desktop monitors.

This document serves as the master project handoff for **Version 1.0**, providing complete technical specifications, architectural decisions, data schemas, design tokens, and instructions for running or developing on macOS, Windows, or Linux.

---

## 🌟 Key Features in Version 1.0

### 1. 1- WelcomeLogin Screen (`Figma 374:537`)
- **First Screen on App Launch**: The app opens directly to the `1- WelcomeLogin` view upon fresh launch or reload.
- **Houdini Text Reveal Animation (`Figma 654:5110`)**: Upward clip reveal animation for "Frequency" (Regular 500) and "Found" (Black 900) in neon yellow (`#F2F862`) with a smooth 0.5s initial cinematic pause before sliding up.
- **Solid Sonar Radar Dot**: Positioned right beside "Found", the solid glowing neon yellow core (`#F2F862`) executes a smooth heartbeat glow (`@keyframes dotBlink`) without ripple waves, sitting uncropped in an open-overflow container.
- **Interactive Form**: Inputs with bracketed SVG borders (`input-left.svg`, `input-right.svg`), pulsing green focus indicators, and guest exploration option.
- **Standalone Entry (`login.html`)**: A completely independent login page with session redirection to `index.html`.

### 2. Responsive Web Layout & 90% Grey Side Bars (`#1D1D1D`)
- **Fluid Layout**: Natively fluid from mobile viewports (375px/414px) up to tablet (768px/1024px) and desktop (1280px).
- **Cinema Pillarboxing**: On widescreen monitors exceeding the 1280px app total width, the margins are rendered in a sleek 90% charcoal grey (`#1D1D1D`), perfectly framing the app with subtle ambient drop shadows (`box-shadow: 0 0 60px rgba(0,0,0,0.85)`).

### 3. Underground Electronic Event Lineup (9 Curated Events)
- **Time Filters**: Filter tabs for **Today**, **This Month**, and **Upcoming**.
- **Brasília DF Exclusivity**: Tailored exclusively to Brasília's iconic modernist and underground venues (Galeria dos Estados, Birosca do Conic, Praça das Fontes, Externa Club, Subsolo Dulcina, Orla do Lago, Infinu, HUM Rooftop, Galpão Setor Industrial).
- **Uniform Event Cards**: Standardized card heights across all categories with horizontally aligned "Learn More" and "Purchase" buttons.
- **Real-Time Search**: Instant filtering by artist name, event title, venue, or genre. Global `/` keyboard shortcut focuses the search bar.
- **Favorite Heart Toggle**: Instant toggle to save events to the user's favorites wallet.

### 4. Interactive Event Sheet Modal ("Learn More")
- High-fidelity modal displaying event cover image, date badge, full DJ/artist lineup bios, venue location with directions link, and description.
- **Flush Sticky Footer**: Bottom element spans the card cleanly with ticket price breakdown and dynamic "Purchase Tickets" CTA.

### 5. Shopping Cart & Multi-Step Checkout Flow
- **Review Cart (`Figma 5.1`)**: Dynamic quantity adjustments for Regular ($60.00) and Student/Half-Price ($30.00) tickets with real-time subtotal calculation.
- **Select Payment Method (`Figma 5.2.1`)**: Clean grid layout ensuring radio selection booleans fit within card boundaries; card number typography clipped with ellipsis.
- **Add Payment Method Popup (`Figma 5.3` / `625:3126`)**: Slide-up modal featuring a petrol teal credit card preview with gold SIM chip, Mastercard logo, and formatted input fields (`Card Number`, `Name on Card`, `Exp. Date`, `CVV`).
- **Confirmation View (`Figma 5.4`)**: Displays transaction ID, purchase timestamp, payment summary, and approved status badge.

### 6. E-Ticket Wallet Modal (`Figma 7.3.2`)
- Digital ticket preview with vector QR code, animated scan line, transaction ID, venue details, and barcode for event entry.

### 7. User Profile Management (`Figma 7.1`)
- John Doe VIP profile with editable name, email, and interactive photo avatar upload.
- **Sign Out Flow**: Dedicated Sign Out button that cleans session storage and returns the user to the `1- WelcomeLogin` screen.

### 8. Elevated Bottom Navigation Dock (`Figma 751:6292`)
- Floating navigation dock housing Home, Search, Favorites, and Tickets.
- Active item displays an elevated royal blue circle (`#3F32D3`) with neon yellow glyph (`#F2F862`).
- **Center-Positioned Strokes**:
  - **Favorites Icon**: `1pt` center stroke, matching fill color across all states.
  - **Tickets Icon**: `0.75pt` center stroke, matching fill color across all states.

---

## 🎨 Design System Tokens

```css
:root {
  /* Brand Palette */
  --color-primary: #f2f862;          /* Neon Yellow: Cathedral Logo, Active Icons, Houdini Text */
  --color-secondary: #3f32d3;        /* Royal Blue: Headers, Active Circle, CTAs, Titles */
  --color-bg-interface: #f7f7f8;     /* App Background: Soft light grey */
  --color-viewport-sides: #1d1d1d;   /* Cinema Side Bars: 90% Charcoal Grey */
  --color-white: #ffffff;            /* Card Backgrounds, Dock Pill */

  /* Neutral Typography */
  --color-text-main: #1d1d1d;        /* Deep charcoal */
  --color-text-secondary: #363636;   /* Medium neutral */
  --color-text-muted: #888888;       /* Subtitles & metadata */
  --color-border: #c0c0c0;
  --color-border-light: #e5e7eb;

  /* Typography */
  --font-family-primary: "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;

  /* Elevation & Shadows */
  --shadow-card: 0px 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-card-hover: 0px 12px 28px rgba(63, 50, 211, 0.16);
  --shadow-dock: 0px 8px 30px rgba(0, 0, 0, 0.18);
  --shadow-active-dock: 0px 6px 18px rgba(63, 50, 211, 0.45);
}
```

---

## 📂 Complete File & Directory Inventory

```
sonar-bsb-events/
├── assets/
│   ├── back-button.svg              # Circular back navigation button
│   ├── credit-card-preview.svg      # Realistic petrol teal credit card mockup
│   ├── event-batrave.png            # Event photo: Batrave The Last Dance
│   ├── event-concrete.png           # Event photo: Concrete Beats Festival
│   ├── event-externa.png            # Event photo: Externa Collective Monolith
│   ├── event-hum.png                # Event photo: Hum Rooftop Sessions
│   ├── event-lowclub.png            # Event photo: Low Club Sunset Horizon
│   ├── event-makoomba.png           # Event photo: Makoomba Eletrônico Ancestral
│   ├── event-traco.png              # Event photo: Traço Echoes of Oscar
│   ├── event-trema.png              # Event photo: Trema Techno Subsolo Urbano
│   ├── event-vapor.png              # Event photo: Vapø_R Cybernetic Cathedral
│   ├── favorite-button.svg          # Floating heart button
│   ├── icon-add-payment.svg         # Plus icon for adding payment method
│   ├── input-left.svg               # Bracketed input left border vector
│   ├── input-right.svg              # Bracketed input right border vector
│   ├── logo-applepay.svg            # Apple Pay vector badge
│   ├── logo-icon.svg                # Brasília Cathedral soundwave icon
│   ├── logo-mastercard.svg          # Mastercard dual-circle logo
│   ├── logo-paypal.svg              # PayPal vector badge
│   ├── nav-ellipse.svg              # Bottom nav elevated circle asset
│   ├── nav-favorites.svg            # Favorites bottom nav icon (1pt stroke)
│   ├── nav-home.svg                 # Home bottom nav icon
│   ├── nav-rectangle.svg            # Bottom nav dock background asset
│   ├── nav-search.svg               # Search bottom nav icon
│   ├── nav-ticket.svg               # Ticket bottom nav icon (0.75pt stroke)
│   ├── profile-picture.png          # User avatar photo
│   ├── sonar-logo.svg               # Official SONAR BSB brand logo
│   └── welcome-gradient.svg         # Dark blue dynamic vector mesh backdrop
├── index.html                       # Master SPA HTML5 entry point
├── login.html                       # Standalone 1- WelcomeLogin page
├── styles.css                       # Complete design system & responsive styling
├── app.js                           # Full state management, routing & event handlers
├── HANDOFF_V1.0.md                  # This file (Version 1.0 Master Handoff)
├── PROJECT_HANDOFF.md               # Quick-start session handoff
├── README.md                        # Documentation & Prompt/Reasoning Changelog
├── VERSIONS.md                      # Version registry & rollback guide
└── versions/                        # Versioned snapshots (v0.4, v0.5, v0.6, v0.6.1, v0.6.2, v1.0)
```

---

## 🚀 How to Run, Test & Deploy

### 1. Opening Directly in Any Web Browser
Simply double-click `index.html` or run:
```powershell
# Windows
Start-Process "index.html"

# macOS
open index.html

# Linux
xdg-open index.html
```

### 2. Running via Local HTTP Server (Recommended)
```bash
# Python 3
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```
Then visit `http://localhost:8080`.

### 3. Pushing to GitHub
```bash
# In the sonar-bsb-events directory
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main --tags
```

---

## 🏷️ Version History Milestones

| Version | Commit / Tag | Summary |
|---------|--------------|---------|
| **V-1.0** | `V-1.0` | Initial foundation: 9-event database, dual-view mode switcher, checkout flow, e-ticket, and profile. |
| **v0.4** | `e6b86e8` / `v0.4` | Standardized card dimensions, flush bottom ticket footer, removed return button in checkout, strict Helvetica Neue. |
| **v0.5** | `v0.5` | Fixed bottom nav pointer events, pure responsive web model (dual preview switcher removed), Brasília DF exclusivity. |
| **v0.6** | `v0.6` | 1- WelcomeLogin screen with Houdini text animation and multi-layer blinking dot effects. Added `login.html`. |
| **v0.6.1**| `v0.6.1` | Uncropped blinking dot box, 0.5s initial Houdini delay, removed status badge & ambient dots, restored widescreen side bars. |
| **v0.6.2**| `v0.6.2` | Launch on login first, removed ripple waves from blinking dot, 90% grey (`#1D1D1D`) side bars, 1pt and 0.75pt nav icon center strokes. |
| **v1.0** | `v1.0` | **Production Master Release**: Complete audit passed, login redirect synchronization, master handoff documentation and packages. |
