# Sonar BSB Events App — Version 1.2 Production Handoff & Session Guide

> **Project Milestone**: Version 1.2 Production Release (`v1.2`)  
> **Release Date**: November 2026  
> **Repository**: `sonar-bsb-events`  
> **Target Figma Design**: [Sonar-BSB-EventsApp-v1 (File: `i3bqFIafJrUlUqn2NMUwIl`)](https://www.figma.com/design/i3bqFIafJrUlUqn2NMUwIl/Sonar-BSB-EventsApp-v1)

---

## 🧭 Executive Summary

**Sonar BSB** is a dedicated web application for discovering and purchasing tickets for Brasília's underground electronic music scene. Built with zero external framework dependencies using vanilla HTML5, modern CSS3 (Custom Properties, Flexbox & Grid), and ES6+ JavaScript, it delivers a lightning-fast, production-grade experience across mobile, tablet, and widescreen desktop monitors.

This document serves as the master project handoff for **Version 1.2**, providing complete technical specifications, architectural decisions, data schemas, design tokens, and instructions for running or developing on macOS, Windows, or Linux.

---

## 🌟 Key Features in Version 1.2

### 1. Full-Width Proportional Houdini Text on Mobile (`Figma 654:5110`)
- **Matching Login Box Width**: The Houdini text container dynamically fills the exact inner width of the login text inputs below: `--houdini-target-width: min(calc(100vw - 48px), 354px);`.
- **Typographic Scale**: Scaled font sizes proportionally:
  - Top Line ("FREQUENCY"): `clamp(48px, calc(var(--houdini-target-width) * 0.171), 60.5px)`
  - Bottom Row ("FOUND" + dot): `clamp(66px, calc(var(--houdini-target-width) * 0.231), 82.5px)`
- **Dynamic Wrapper Heights**: Line wrappers scale proportionally with `calc()` values (`1.22 * font-size` for `.top-line` and `1.18 * font-size` for `.bottom-line`), eliminating any vertical clipping or letter distortion.
- **Center Alignment & No Wrap**: With `white-space: nowrap;` and calibrated letter spacing (`-0.015em` / `-0.02em`), both headline lines extend seamlessly to the edges of the form column.

### 2. Deactivation of the "Welcome to SonarBSB" Toast Pop-Up
- **Silent Seamless Transition**: The `showToast` notification upon submitting credentials in `handleWelcomeLogin()` has been turned off. Logging in or continuing as guest now transitions directly and cleanly into the event feed without visual clutter or pop-ups.

### 3. Top Bar Shopping Cart Button (`.header-cart-btn`)
- **Position & Sizing**: Positioned on the site header immediately to the left of `#profileAvatarBtn` inside `.header-actions`. Features the exact `44px x 44px` circular silhouette of the profile avatar.
- **Bottom Nav Dock Styling & Colors**:
  - **Resting State**: Clean white circular surface (`#ffffff`) with `#1D1D1D` vector shopping cart icon and `2px solid var(--color-primary)` border matching the profile avatar.
  - **Hover & Active States** (when exploring checkout/cart): Royal blue background (`#3F32D3`), glowing neon yellow icon (`#F2F862`), and radiant shadow glow (`0 0 12px rgba(242, 248, 98, 0.6)`).
  - **Dynamic Item Badge**: `#headerCartBadge` automatically reflects the active ticket quantity in the shopping cart, styled identically to `.nav-badge` (neon yellow fill, `#130f40` bold counter text).
  - **One-Click Cart Access**: Triggers `openCart()`, populating checkout calculations and switching views seamlessly.

### 4. Centered Proportional Houdini Architecture & Solid Radar Dot
- Upward reveal animation with 0.5s initial pause for "Frequency" (500) and "Found" (900) in neon yellow (`#F2F862`).
- Solid neon yellow heartbeat blinking dot beside "Found" without ripple waves, sitting uncropped in an open-overflow container.

### 5. Touchscreen Keyboard Only on Direct Interaction
- On mobile and touchscreen devices, automatic focus on `#searchFormName` is suppressed on view entry. The virtual on-screen keyboard opens only when the user explicitly taps one of the search inputs.

### 6. Enlarged Event Card Typography & Uniform Alignment
- Standardized card height (`450px`) with enlarged title (`19px`), time (`14px` bold), venue (`13.5px`), and price (`24px` bold).
- `margin-top: auto` on `.card-actions` guarantees that all "Learn More" and direct purchase buttons stay horizontally locked to the exact same baseline across every card.

---

## 🎨 Design System Tokens

| Token Name | Value | Purpose |
| :--- | :--- | :--- |
| `--color-primary` | `#F2F862` | Brand Neon Yellow (Logo, Houdini text, active dock icons, cart badge) |
| `--color-secondary` | `#3F32D3` | Brand Secondary Royal Blue (Headers, active tabs, buttons, active cart) |
| `--color-secondary-hover` | `#3227a8` | Hover state for blue buttons |
| `--color-bg-app` | `#F7F7F8` | Primary light interface background |
| `--color-bg-viewport` | `#1D1D1D` | 90% Charcoal grey cinema pillarbox framing (> 1280px) |
| `--color-text-main` | `#1D1D1D` | Primary high-contrast body & title text, resting cart icon |
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
├── app.js                        # State management, data schemas, navigation, cart logic
├── index.html                    # Single-Page Application HTML markup
├── login.html                    # Standalone 1- WelcomeLogin page
├── styles.css                    # Complete CSS stylesheet & design tokens
├── README.md                     # Comprehensive documentation & version changelog
├── VERSIONS.md                   # Version registry & archive index
├── PROJECT_HANDOFF.md            # Quick session handoff guide
├── HANDOFF_V1.0.md               # Version 1.0 specifications
├── HANDOFF_V1.1.md               # Version 1.1 specifications
├── HANDOFF_V1.2.md               # Version 1.2 specifications (this file)
└── versions/                     # Historical version archive (v0.4 through v1.2)
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
1. Copy or extract `sonar-bsb-events-v1.2.zip` to your target computer.
2. Open the folder in VS Code, Cursor, or Antigravity.
3. In Antigravity, mention `@HANDOFF_V1.2.md` in your first prompt to immediately restore full context.
