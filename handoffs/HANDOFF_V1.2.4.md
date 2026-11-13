# Sonar BSB Events App — Version 1.2.4 Production Handoff & Session Guide

> **Project Milestone**: Version 1.2.4 Production Release (`v1.2.4`)  
> **Release Date**: November 2026  
> **Repository**: `sonar-bsb-events`  
> **Target Figma Design**: [Sonar-BSB-EventsApp-v1 (File: `i3bqFIafJrUlUqn2NMUwIl`)](https://www.figma.com/design/i3bqFIafJrUlUqn2NMUwIl/Sonar-BSB-EventsApp-v1)

---

## 🧭 Executive Summary

**Sonar BSB** is a dedicated web application for discovering and purchasing tickets for Brasília's underground electronic music scene. Built with zero external framework dependencies using vanilla HTML5, modern CSS3 (Custom Properties, Flexbox & Grid), and ES6+ JavaScript, it delivers a lightning-fast, production-grade experience across mobile, tablet, and widescreen desktop monitors.

This document serves as the master project handoff for **Version 1.2.4**, providing complete technical specifications, architectural decisions, design tokens, and instructions for running or developing on macOS, Windows, or Linux.

---

## 🌟 Key Features in Version 1.2.4

### 1. Event Card Add-to-Cart `+` Icon (`.btn-purchase-direct`)
- **Icon Update**:
  - Replaced the shopping-bag `<svg>` in `renderEvents()` ([app.js](app.js)) with a geometric `+` SVG icon (`width="22" height="22" viewBox="0 0 24 24"`, `<path d="M12 5V19M5 12H19"/>`).
  - Uses `stroke="currentColor"`, `stroke-width="2.5"`, `stroke-linecap="round"`, and `stroke-linejoin="round"` for crisp rendering matching the rest of the card action iconography.
  - Updated button attributes to `title="Add to Cart"` and `aria-label="Add to Cart"` while preserving `onclick="startCheckout('${evt.id}')"`.
- **Preserved Color & Button Styling**:
  - Retains the exact `.btn-purchase-direct` CSS rules: `width: 48px; height: 46px;`, neon yellow background (`var(--color-primary)` / `#F2F862`), deep navy foreground (`#130f40`), `border-radius: 12px`, `var(--shadow-btn)` drop shadow, and hover states (`--color-primary-dark` with `translateY(-2px)`).

### 2. Core Features Retained from v1.2.3
- **Tightened Houdini Text Line Spacing** (`1.08x` height, `-0.06x` row offset) and elevated login logo (`welcome-logo-box`).
- **Empty Cart on Startup & Custom Empty Cart View** (`#emptyCartCard`) with "Explore Events →" CTA and quick event pills.
- **Top Bar Shopping Cart Icon (28px)** with white resting state and 44px neon yellow ring when selected.
- **In-Repo Packaging Only**: Version ZIP packages archived inside `versions/v1.2.4/` without duplicating to Desktop or Downloads.

---

## 🎨 Design System Tokens

| Token Name | Value | Purpose |
| :--- | :--- | :--- |
| `--color-primary` | `#F2F862` | Brand Neon Yellow (Logo, Houdini text, active dock icons, cart badge, add-to-cart button fill) |
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
├── assets/                       # Production vector & raster assets
├── app.js                        # State management, event card '+' action, navigation, cart logic (v1.2.4)
├── index.html                    # Single-Page Application HTML markup (v1.2.4)
├── login.html                    # Standalone 1- WelcomeLogin page (v1.2.4)
├── styles.css                    # Complete CSS stylesheet & design tokens
├── README.md                     # Comprehensive documentation & version changelog
├── VERSIONS.md                   # Version registry & archive index
├── PROJECT_HANDOFF.md            # Quick session handoff guide
├── HANDOFF_V1.0.md               # Version 1.0 specifications
├── HANDOFF_V1.1.md               # Version 1.1 specifications
├── HANDOFF_V1.2.md               # Version 1.2 specifications
├── HANDOFF_V1.2.1.md             # Version 1.2.1 specifications
├── HANDOFF_V1.2.2.md             # Version 1.2.2 specifications
├── HANDOFF_V1.2.3.md             # Version 1.2.3 specifications
├── HANDOFF_V1.2.4.md             # Version 1.2.4 specifications (this file)
└── versions/                     # Historical version archive (v0.4 through v1.2.4)
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
