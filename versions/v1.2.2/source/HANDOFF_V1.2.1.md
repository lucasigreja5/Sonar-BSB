# Sonar BSB Events App — Version 1.2.1 Production Handoff & Session Guide

> **Project Milestone**: Version 1.2.1 Production Release (`v1.2.1`)  
> **Release Date**: November 2026  
> **Repository**: `sonar-bsb-events`  
> **Target Figma Design**: [Sonar-BSB-EventsApp-v1 (File: `i3bqFIafJrUlUqn2NMUwIl`)](https://www.figma.com/design/i3bqFIafJrUlUqn2NMUwIl/Sonar-BSB-EventsApp-v1)

---

## 🧭 Executive Summary

**Sonar BSB** is a dedicated web application for discovering and purchasing tickets for Brasília's underground electronic music scene. Built with zero external framework dependencies using vanilla HTML5, modern CSS3 (Custom Properties, Flexbox & Grid), and ES6+ JavaScript, it delivers a lightning-fast, production-grade experience across mobile, tablet, and widescreen desktop monitors.

This document serves as the master project handoff for **Version 1.2.1**, providing complete technical specifications, architectural decisions, data schemas, design tokens, and instructions for running or developing on macOS, Windows, or Linux.

---

## 🌟 Key Features in Version 1.2.1

### 1. Refined Shopping Cart Button States (`.header-cart-btn`)
- **Unselected State**:
  - Yellow circle border removed (`border: 2px solid transparent; background: transparent; box-shadow: none;`).
  - Shopping cart icon rendered in crisp pure white (`color: #ffffff;`).
  - Subtle translucent hover feedback (`rgba(255, 255, 255, 0.14)`).
- **Selected State** (`.is-active`, `.is-selected` when exploring checkout/cart):
  - Preserves full signature styling: royal blue background (`#3F32D3`), glowing neon yellow icon (`#F2F862`), 2px neon yellow border circle, and radiant drop shadow (`0 0 12px rgba(242, 248, 98, 0.6)`).
- **Live Counter Badge**: Integrated `#headerCartBadge` displaying active ticket quantity with neon yellow background and dark navy text.

### 2. Larger "FOUND" Text Matching Textbox Width & Center Alignment
- **Word-Level Width Lock**: The word "FOUND" itself scales to fill the full horizontal extent of the login inputs beneath it:
  `--houdini-found-size: clamp(72px, calc(var(--houdini-target-width) * 0.248), 88px);`.
- On desktop viewports (354px input width), it scales to 88px (~354px text width); on a 375px mobile phone (327px input width), it scales to 81px (~327px text width).
- Centered horizontally via `display: flex; justify-content: center; text-align: center;`.

### 3. Mask Boundary Expansion on "FREQUENCY" (Preserving the 'Y')
- **Generous Horizontal Clearance**: `.houdini-line-wrapper.top-line` boundaries expanded by 20px on both sides:
  `width: calc(100% + 40px); margin-left: -20px; margin-right: -20px; padding: 0 20px; box-sizing: border-box; overflow: hidden;`.
- **Calibrated Font Sizing**: Set to `clamp(38px, calc(var(--houdini-target-width) * 0.15), 53px)` with `letter-spacing: 0.01em`.
- The letter 'Y' now has over 35px of horizontal clearance from any mask edge, permanently eliminating glyph truncation.

### 4. Typographic Baseline Period Dot for "FOUND"
- **Punctuation Alignment**: Grouped "FOUND" and the pulsing neon radar dot inside `.found-text-group` with `display: inline-flex; align-items: baseline;`.
- **Baseline Placement**: `.houdini-blinking-dot` uses `vertical-align: 0.08em; margin-left: 6px;` and dimensions `clamp(10px, 3.2vw, 13px)`.
- The dot rests directly on the typographic baseline at the bottom-right corner of the word "FOUND", functioning as active punctuation (`FOUND •`).

### 5. Deactivated Login Welcome Toast
- Seamless, quiet transition from the welcome login screen to the home feed upon credential submission.

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
├── index.html                    # Single-Page Application HTML markup
├── login.html                    # Standalone 1- WelcomeLogin page
├── styles.css                    # Complete CSS stylesheet & design tokens
├── README.md                     # Comprehensive documentation & version changelog
├── VERSIONS.md                   # Version registry & archive index
├── PROJECT_HANDOFF.md            # Quick session handoff guide
├── HANDOFF_V1.0.md               # Version 1.0 specifications
├── HANDOFF_V1.1.md               # Version 1.1 specifications
├── HANDOFF_V1.2.md               # Version 1.2 specifications
├── HANDOFF_V1.2.1.md             # Version 1.2.1 specifications (this file)
└── versions/                     # Historical version archive (v0.4 through v1.2.1)
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
1. Copy or extract `sonar-bsb-events-v1.2.1.zip` to your target computer.
2. Open the folder in VS Code, Cursor, or Antigravity.
3. In Antigravity, mention `@HANDOFF_V1.2.1.md` in your first prompt to immediately restore full context.
