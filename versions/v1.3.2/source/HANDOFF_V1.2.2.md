# Sonar BSB Events App — Version 1.2.2 Production Handoff & Session Guide

> **Project Milestone**: Version 1.2.2 Production Release (`v1.2.2`)  
> **Release Date**: November 2026  
> **Repository**: `sonar-bsb-events`  
> **Target Figma Design**: [Sonar-BSB-EventsApp-v1 (File: `i3bqFIafJrUlUqn2NMUwIl`)](https://www.figma.com/design/i3bqFIafJrUlUqn2NMUwIl/Sonar-BSB-EventsApp-v1)

---

## 🧭 Executive Summary

**Sonar BSB** is a dedicated web application for discovering and purchasing tickets for Brasília's underground electronic music scene. Built with zero external framework dependencies using vanilla HTML5, modern CSS3 (Custom Properties, Flexbox & Grid), and ES6+ JavaScript, it delivers a lightning-fast, production-grade experience across mobile, tablet, and widescreen desktop monitors.

This document serves as the master project handoff for **Version 1.2.2**, providing complete technical specifications, architectural decisions, data schemas, design tokens, and instructions for running or developing on macOS, Windows, or Linux.

---

## 🌟 Key Features in Version 1.2.2

### 1. Increased White Shopping Cart Icon Size (`.header-cart-icon`)
- **Visual Scale Calibration**:
  - Enlarged the unselected shopping cart icon from 22px to **28px** (`width: 28px; height: 28px;`), representing a +27.3% linear increase and a +61.9% increase in visual area.
  - Sits prominently on the royal blue header next to the 44px circular user profile image with balanced visual weight.
  - Sized in proportion to the bottom navigation icons (30px) and styled with clean white color (`#ffffff`).
- **Harmonious Hover Feedback**:
  - Scaled smoothly with the 44px circular button (`transform: scale(1.08)`) and subtle translucent backlight highlight (`rgba(255, 255, 255, 0.14)`).

### 2. Preserved Outside Yellow Ring Dimensions (`44px` Strict Diameter)
- **Zero Ring Distortion / Exact 44px Diameter**:
  - Maintained strict `width: 44px; height: 44px; box-sizing: border-box; border-radius: 50%;` across all button states.
  - When selected (`.header-cart-btn.is-active`, `.header-cart-btn.is-selected`), the button renders a 2px solid neon yellow border (`border: 2px solid var(--color-primary)`), keeping the outside yellow ring outer diameter at exactly 44px—identical to previous versions.
  - Inside the 40px inner diameter, the 28px icon has 6px of breathing room from the yellow border (and the actual cart graphic has ~10.4px of clear padding), guaranteeing no clipping, overflow, or layout shift.
- **Glowing Ambient Aura**:
  - Radiant drop shadow `box-shadow: 0 0 12px rgba(242, 248, 98, 0.6)` retained on the selected button.

### 3. All Previous Core Architecture Retained
- **Typographic Baseline Period Dot**: Pulsing neon radar dot anchored at the baseline of the word "FOUND".
- **Unclipped "FREQUENCY" Mask**: Generous 20px horizontal mask margins preventing glyph truncation on 'Y'.
- **Full-Width Houdini Text on Mobile**: Matches the exact 327px/354px width of login input fields.
- **Deactivated Welcome Popup**: Direct, quiet transition to the home feed upon credential submission.
- **Cinema Pillarboxing**: `#1D1D1D` 90% charcoal grey sidebars on widescreen displays.
- **Stroked SVG Bottom Navigation Icons**: Tickets (0.75pt) and Favorites (1pt) stroke weighting.

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
├── app.js                        # State management, data schemas, navigation, cart logic
├── index.html                    # Single-Page Application HTML markup (v1.2.2)
├── login.html                    # Standalone 1- WelcomeLogin page (v1.2.2)
├── styles.css                    # Complete CSS stylesheet & design tokens
├── README.md                     # Comprehensive documentation & version changelog
├── VERSIONS.md                   # Version registry & archive index
├── PROJECT_HANDOFF.md            # Quick session handoff guide
├── HANDOFF_V1.0.md               # Version 1.0 specifications
├── HANDOFF_V1.1.md               # Version 1.1 specifications
├── HANDOFF_V1.2.md               # Version 1.2 specifications
├── HANDOFF_V1.2.1.md             # Version 1.2.1 specifications
├── HANDOFF_V1.2.2.md             # Version 1.2.2 specifications (this file)
└── versions/                     # Historical version archive (v0.4 through v1.2.2)
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
