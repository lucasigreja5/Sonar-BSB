# Sonar BSB Events App — Version 1.1 Production Handoff & Session Guide

> **Project Milestone**: Version 1.1 Production Release (`v1.1`)  
> **Release Date**: November 2026  
> **Repository**: `sonar-bsb-events`  
> **Target Figma Design**: [Sonar-BSB-EventsApp-v1 (File: `i3bqFIafJrUlUqn2NMUwIl`)](https://www.figma.com/design/i3bqFIafJrUlUqn2NMUwIl/Sonar-BSB-EventsApp-v1)

---

## 🧭 Executive Summary

**Sonar BSB** is a dedicated web application for discovering and purchasing tickets for Brasília's underground electronic music scene. Built with zero external framework dependencies using vanilla HTML5, modern CSS3 (Custom Properties, Flexbox & Grid), and ES6+ JavaScript, it delivers a lightning-fast, production-grade experience across mobile, tablet, and widescreen desktop monitors.

This document serves as the master project handoff for **Version 1.1**, providing complete technical specifications, architectural decisions, data schemas, design tokens, and instructions for running or developing on macOS, Windows, or Linux.

---

## 🌟 Key Features in Version 1.1

### 1. Centered & Strictly Proportional Houdini Text on Mobile (`Figma 654:5110`)
- **Proportional 5:8 Typography Ratio**: Bound "Frequency" (54px Regular 500) and "Found" (86.4px Black 900) via CSS custom properties: `--houdini-found-size: clamp(42px, 14vw, 86.4px);` and `--houdini-freq-size: calc(var(--houdini-found-size) * 0.625);`.
- **Dynamic Wrapper Heights**: Line wrappers scale proportionally with `calc()` values (`1.15 * font-size` and `1.12 * font-size`), eliminating any vertical cropping or letter distortion.
- **Center Alignment**: Entire container and both top/bottom rows are centered (`align-items: center; justify-content: center; text-align: center;`), perfectly balanced against the logo and login card on all smartphone screens (320px–480px).
- **Proportional Letter Spacing**: `-0.015em` on "Frequency" and `-0.025em` on "Found" prevents character crowding.
- **Uncropped Solid Sonar Radar Dot**: Solid neon yellow core (`#F2F862`) pulses smoothly with heartbeat glow (`@keyframes dotBlink`), scaling dynamically (`clamp(10px, 3vw, 14px)`) without ripple waves.

### 2. Mobile Touch Keyboard Suppression on Search Screen
- **Touch & Mobile Virtual Keyboard Control**: Programmatic `focus()` on `#searchFormName` in `switchView("search")` is strictly bypassed on touchscreen and mobile devices (`window.innerWidth <= 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)`).
- **Direct Interaction Only**: The virtual on-screen keyboard opens only when the user explicitly taps or interacts with one of the search text inputs (`#searchFormName`, `#searchFormDate`, `#searchFormLocation`), keeping over 50% of the screen free to browse curated filters and event listings.
- **Desktop Keyboard Usability**: On desktop devices with physical keyboards, auto-focus remains active for immediate query typing.

### 3. Enlarged Event Card Typography & Uniform Geometric Alignment
- **Larger, Punchier Event Name**: `.card-title` increased to `19px` (font-weight 800) with a 2-line clamp (`-webkit-line-clamp: 2`) and fixed title container height `48px`.
- **High-Contrast Time & Venue**: `.card-time` increased to `14px` bold, and `.card-venue` increased to `13.5px` with a 2-line clamp (`-webkit-line-clamp: 2; line-height: 1.3`).
- **Prominent Pricing**: `.card-price` increased to `24px` (font-weight 800) for instant ticket price recognition.
- **Expanded Card Dimensions**: Card height standardized to `450px` (from 420px) and info row to `62px` (from 50px).
- **Flush Pinned Button Row**: `.card-actions` retains `margin-top: auto` (height 46px), guaranteeing that all "Learn More" and direct purchase buttons stay horizontally aligned across every card in the grid, regardless of line counts.

### 4. 1- WelcomeLogin Screen (`Figma 374:537`)
- **Default Entry View**: Application consistently opens directly into `1- WelcomeLogin` upon fresh launch or reload.
- **Dual-Mode Access**: Integrated SPA login flow in `index.html` plus standalone `login.html` with redirect token synchronization (`sonar_redirect_from_login`).
- **Interactive Form**: Inputs with bracketed SVG borders (`input-left.svg`, `input-right.svg`), pulsing green focus indicators, and guest exploration option.

### 5. Responsive Web Layout & 90% Grey Side Bars (`#1D1D1D`)
- **Fluid Layout**: Natively fluid from mobile viewports (375px/414px) up to tablet (768px/1024px) and desktop (1280px).
- **Cinema Pillarboxing**: On widescreen monitors exceeding the 1280px app total width, the margins are rendered in a sleek 90% charcoal grey (`#1D1D1D`), perfectly framing the app with subtle ambient drop shadows (`box-shadow: 0 0 60px rgba(0,0,0,0.85)`).

### 6. Underground Electronic Event Lineup (9 Curated Brasília Events)
- **Time Filters**: Filter tabs for **Today**, **This Month**, and **Upcoming**.
- **Brasília DF Exclusivity**: Tailored exclusively to Brasília's iconic modernist and underground venues (Galeria dos Estados, Birosca do Conic, Praça das Fontes, Externa Club, Subsolo Dulcina, Orla do Lago, Infinu, HUM Rooftop, Galpão Setor Industrial).
- **Real-Time Search**: Instant filtering by artist name, event title, venue, or genre. Global `/` keyboard shortcut focuses the search bar.
- **Favorite Heart Toggle**: Instant toggle to save events to the user's favorites wallet.

### 7. Interactive Event Sheet Modal ("Learn More")
- High-fidelity modal displaying event cover image, date badge, full DJ/artist lineup bios, venue location with directions link, and description.
- **Flush Sticky Footer**: Bottom element spans the card cleanly with ticket price breakdown and dynamic "Purchase Tickets" CTA.

### 8. Shopping Cart & Multi-Step Checkout Flow
- **Review Cart (`Figma 5.1`)**: Dynamic quantity adjustments for Regular ($60.00) and Student/Half-Price ($30.00) tickets with real-time subtotal calculation.
- **Select Payment Method (`Figma 5.2.1`)**: Clean grid layout ensuring radio selection booleans fit within card boundaries; card number typography clipped with ellipsis.
- **Add Payment Method Popup (`Figma 5.3` / `625:3126`)**: Slide-up modal featuring a petrol teal credit card preview with gold SIM chip, Mastercard logo, and formatted input fields (`Card Number`, `Name on Card`, `Exp. Date`, `CVV`).
- **Confirmation View (`Figma 5.4`)**: Displays transaction ID, purchase timestamp, payment summary, and approved status badge.

### 9. E-Ticket Wallet Modal (`Figma 7.3.2`)
- Digital ticket preview with vector QR code, animated scan line, transaction ID, venue details, and barcode for event entry.
- "Save PDF / Print" and wallet counter.

### 10. User Profile & Photo Upload (`Figma 7.1` / `398:484`)
- Accessible by clicking the top avatar button.
- Profile view for "John Doe" (`johndoe@mail.com`) with Sonar VIP badge, photo upload/URL change, and Sign Out flow.

### 11. Elevated Bottom Navigation Dock (`Figma 751:6292`)
- Custom floating white bar with rounded corners and subtle drop shadow.
- Elevated circular active button with `#3F32D3` fill and `#F2F862` icon.
- Favorites icon with 1pt center stroke, Tickets icon with 0.75pt center stroke matching fill color.

---

## 🎨 Design System Tokens

| Token Name | Value | Purpose |
| :--- | :--- | :--- |
| `--color-primary` | `#F2F862` | Brand Neon Yellow (Logo, Houdini text, active dock icons) |
| `--color-secondary` | `#3F32D3` | Brand Secondary Royal Blue (Headers, active tabs, buttons) |
| `--color-secondary-hover` | `#3227a8` | Hover state for blue buttons |
| `--color-bg-app` | `#F7F7F8` | Primary light interface background |
| `--color-bg-viewport` | `#1D1D1D` | 90% Charcoal grey cinema pillarbox framing (> 1280px) |
| `--color-text-main` | `#1D1D1D` | Primary high-contrast body & title text |
| `--color-text-secondary` | `#363636` | Secondary body text |
| `--color-text-muted` | `#64748B` | Dates, placeholders, subtle subtitles |
| `--font-family-primary` | `Helvetica Neue, -apple-system, sans-serif` | Global application typography |
| `--card-border-radius` | `30px` | Event card border radius |

---

## 📂 Source File Manifest

```
sonar-bsb-events/
├── assets/                       # 18 production vector & raster assets
│   ├── back-button.svg           # Circular back button
│   ├── credit-card-preview.svg   # Petrol teal credit card preview with gold chip
│   ├── design-add-card-popup.png # Reference asset
│   ├── design-select-payment.png # Reference asset
│   ├── design_reference.png      # Reference asset
│   ├── event-batrave.png         # Batrave event cover banner
│   ├── event-concrete.png        # Concrete Beats event cover banner
│   ├── event-externa.png         # Externa Collective event cover banner
│   ├── event-hum.png             # HUM Rooftop event cover banner
│   ├── event-lowclub.png         # Low Club event cover banner
│   ├── event-makoomba.png        # Makoomba event cover banner
│   ├── event-traco.png           # Traço event cover banner
│   ├── event-trema.png           # Trema Techno event cover banner
│   ├── event-vapor.png           # Vapø_R event cover banner
│   ├── favorite-button.svg       # Heart outline toggle asset
│   ├── icon-add-payment.svg      # Plus circle icon for adding cards
│   ├── logo-applepay.svg         # Apple Pay logo vector
│   ├── logo-icon.svg             # Stylized Brasília Cathedral icon
│   ├── logo-mastercard.svg       # Mastercard circles vector
│   ├── logo-paypal.svg           # PayPal logo vector
│   ├── nav-ellipse.svg           # Elevated dock circle asset
│   ├── nav-favorites.svg         # Dock favorites bookmark icon (1pt stroke)
│   ├── nav-home.svg              # Dock home icon
│   ├── nav-rectangle.svg         # Dock background layer asset
│   ├── nav-search.svg            # Dock search magnifying glass icon
│   ├── nav-ticket.svg            # Dock ticket stub icon (0.75pt stroke)
│   ├── profile-picture.png       # User profile avatar
│   ├── sonar-logo.svg            # Sonar BSB brand logo
│   └── welcome-gradient.svg      # Indigo-blue mesh gradient backdrop
├── app.js                        # State management, data schemas, navigation, interactions
├── index.html                    # Single-Page Application HTML markup
├── login.html                    # Standalone 1- WelcomeLogin page
├── styles.css                    # Complete CSS stylesheet & design tokens
├── README.md                     # Comprehensive documentation & version changelog
├── VERSIONS.md                   # Version registry & archive index
├── PROJECT_HANDOFF.md            # Quick session handoff guide
├── HANDOFF_V1.0.md               # Version 1.0 specifications
├── HANDOFF_V1.1.md               # Version 1.1 specifications (this file)
└── versions/                     # Historical version archive (v0.4 through v1.1)
```

---

## 🚀 How to Run, Test & Deploy

### Running Locally
```bash
# Direct in browser
open index.html

# Or with a local server
python3 -m http.server 8080
# Browse to: http://localhost:8080
```

### Transfer to Mac / Another Machine
1. Copy or extract `sonar-bsb-events-v1.1.zip` to your target computer.
2. Open the folder in VS Code, Cursor, or Antigravity.
3. In Antigravity, mention `@HANDOFF_V1.1.md` in your first prompt to immediately restore full context.
