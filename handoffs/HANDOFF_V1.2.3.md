# Sonar BSB Events App — Version 1.2.3 Production Handoff & Session Guide

> **Project Milestone**: Version 1.2.3 Production Release (`v1.2.3`)  
> **Release Date**: November 2026  
> **Repository**: `sonar-bsb-events`  
> **Target Figma Design**: [Sonar-BSB-EventsApp-v1 (File: `i3bqFIafJrUlUqn2NMUwIl`)](https://www.figma.com/design/i3bqFIafJrUlUqn2NMUwIl/Sonar-BSB-EventsApp-v1)

---

## 🧭 Executive Summary

**Sonar BSB** is a dedicated web application for discovering and purchasing tickets for Brasília's underground electronic music scene. Built with zero external framework dependencies using vanilla HTML5, modern CSS3 (Custom Properties, Flexbox & Grid), and ES6+ JavaScript, it delivers a lightning-fast, production-grade experience across mobile, tablet, and widescreen desktop monitors.

This document serves as the master project handoff for **Version 1.2.3**, providing complete technical specifications, architectural decisions, data schemas, design tokens, and instructions for running or developing on macOS, Windows, or Linux.

---

## 🌟 Key Features in Version 1.2.3

### 1. Tightened Houdini Text Spacing ("FREQUENCY" & "FOUND")
- **Condensed Line Height**:
  - Calibrated `.houdini-line-wrapper.top-line` and `.bottom-line` vertical heights to `1.08x` font size.
  - Adjusted `.houdini-bottom-row` to `margin-top: calc(var(--houdini-found-size) * -0.06);`.
  - Collapses the vertical dead space between "FREQUENCY" and "FOUND" from ~22px down to a crisp ~1-2px, creating a unified, powerful headline lockup.
  - Retains full 20px horizontal mask padding (`margin: 0 -20px; padding: 0 20px; width: calc(100% + 40px);`), permanently preventing glyph clipping on 'Y'.
  - Maintains baseline period dot punctuation (`.found-text-group`) following "FOUND".

### 2. Elevated Sonar BSB Logo with Expanded Clearance
- **Higher Screen Position**:
  - Positioned `.welcome-logo-box` higher on the viewport with `margin-top: clamp(-28px, -4vh, -16px);`.
  - Expanded its bottom margin to `clamp(48px, 7vh, 64px);`, more than doubling the physical distance between the logo and the Houdini text (from 24px to ~56px).
  - Adjusted `.welcome-content` vertical padding to `clamp(24px, 4vh, 36px) 24px 36px;` to achieve optimal vertical balance across tall smartphones and widescreen desktop monitors.

### 3. Empty Shopping Cart on Startup & Custom Empty Cart View
- **Zero-Ticket Initial State**:
  - `checkoutState` initializes with `event: null, regularQty: 0, studentQty: 0`.
  - Header shopping cart counter badge `#headerCartBadge` remains hidden (`display: none;`) on application launch.
- **Design System Aligned Empty Cart Card (`#emptyCartCard`)**:
  - Enclosed in a white card container with `border-radius: 28px` and `box-shadow: var(--shadow-card)`.
  - Centered circular icon halo (`rgba(63, 50, 211, 0.07)` with 2px dashed border) hosting a 44px royal blue shopping cart icon.
  - Bold secondary heading: `"YOUR CART IS EMPTY"`.
  - Contextual copy: `"Looks like you haven't added any event tickets to your cart yet. Explore tonight's raves and club nights in Brasília to book your passes."`.
  - Primary CTA button (`.btn-empty-cart-action`): `"Explore Events →"` with royal blue background, hover elevation, and direct routing to the home event feed.
  - Quick event discovery tags: 1-click modal triggers for **Trema Techno**, **Externa**, and **Batrave**.
- **Dynamic View State Switching**:
  - `openCart()` routes to `showEmptyCartView()` if cart contains 0 tickets, or `showPopulatedCartView()` if tickets are present.
  - Decrementing all ticket quantities to 0 in checkout automatically displays the empty cart state.
  - Post-payment confirmation resets `checkoutState.event = null` and zeroes quantities.

### 4. Streamlined Distribution Packaging
- Discontinued copying ZIP archives to Desktop and Downloads per user directive.
- All version packages are archived strictly within the repository under `versions/v1.2.3/sonar-bsb-events-v1.2.3.zip` and uncompressed in `versions/v1.2.3/source/`.

---

## 🎨 Design System Tokens

| Token Name | Value | Purpose |
| :--- | :--- | :--- |
| `--color-primary` | `#F2F862` | Brand Neon Yellow (Logo, Houdini text, active dock icons, cart badge, active cart ring) |
| `--color-secondary` | `#3F32D3` | Brand Secondary Royal Blue (Headers, active tabs, buttons, active cart fill) |
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
├── app.js                        # State management, data schemas, navigation, cart logic (v1.2.3)
├── index.html                    # Single-Page Application HTML markup (v1.2.3)
├── login.html                    # Standalone 1- WelcomeLogin page (v1.2.3)
├── styles.css                    # Complete CSS stylesheet & design tokens (v1.2.3)
├── README.md                     # Comprehensive documentation & version changelog
├── VERSIONS.md                   # Version registry & archive index
├── PROJECT_HANDOFF.md            # Quick session handoff guide
├── HANDOFF_V1.0.md               # Version 1.0 specifications
├── HANDOFF_V1.1.md               # Version 1.1 specifications
├── HANDOFF_V1.2.md               # Version 1.2 specifications
├── HANDOFF_V1.2.1.md             # Version 1.2.1 specifications
├── HANDOFF_V1.2.2.md             # Version 1.2.2 specifications
├── HANDOFF_V1.2.3.md             # Version 1.2.3 specifications (this file)
└── versions/                     # Historical version archive (v0.4 through v1.2.3)
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

### Git Tag & Release
```bash
git checkout main
git tag -l -n1
```
