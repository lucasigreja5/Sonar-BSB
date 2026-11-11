# Sonar BSB Events App — Project Context & Session Handoff

> **To resume this project in Antigravity on macOS or another machine:**
> 1. Open the project folder `sonar-bsb-events` in Antigravity.
> 2. In a new conversation, type `@HANDOFF_V1.0.md` or `@PROJECT_HANDOFF.md` to restore complete context.

---

## 📌 Project Overview
- **Product**: Sonar BSB — Events Discovery & Ticketing Web Application
- **Figma Design**: [Sonar-BSB-EventsApp-v1 (Node 365:525)](https://www.figma.com/design/i3bqFIafJrUlUqn2NMUwIl/Sonar-BSB-EventsApp-v1?node-id=365-525)
- **Current Version**: `v1.0` (Production Master Release)
- **Tech Stack**: Vanilla HTML5, modern CSS3 (Custom Properties, Grid & Flexbox), vanilla ES6+ JavaScript. Completely zero external runtime dependencies.
- **Detailed Handoff**: See [HANDOFF_V1.0.md](HANDOFF_V1.0.md) for complete specifications, data schemas, and design tokens.

---

## 🎨 Design System Tokens
- **Brand Secondary (Royal Blue)**: `#3F32D3` (Headers, active navigation, buttons, titles)
- **Brand Primary (Neon Yellow)**: `#F2F862` (Brasília cathedral logo, active icon glyphs, Houdini text)
- **Background Interface**: `#F7F7F8` (App background)
- **Viewport Side Bars**: `#1D1D1D` (90% Charcoal grey cinema pillarboxing)
- **Text Main**: `#1D1D1D` & `#363636`
- **Text Muted**: `#64748B`, `#888888`, `#CBD5E1`
- **Cards**: White `#ffffff` with `border-radius: 30px` (events) / `28px` (modals) / `14px` (payment cards)

---

## 🛠️ Implemented Architecture & Flows

### 1. 1- WelcomeLogin & Houdini Text Reveal
- Application starts directly on `1- WelcomeLogin` as the first screen upon launch.
- Houdini text reveal emerges from masked frame with a 0.5s initial pause ("Frequency" in 500, "Found" in 900).
- Solid neon yellow heartbeat blinking dot beside "Found" without ripple waves, completely unclipped.
- Standalone page available at `login.html`.

### 2. Pure Responsive Web Layout with 90% Grey Side Bars
- Natively fluid from mobile up to desktop (1280px).
- Screens wider than 1280px are framed by `#1D1D1D` 90% grey bars with deep ambient shadow.

### 3. Complete 9-Event Brasília Lineup
- **Today**:
  1. `Trema Techno: Subsolo Urbano` (15 AUG • Galeria dos Estados • $60.00)
  2. `Vapø_R: Cybernetic Cathedral` (15 AUG • Birosca do Conic • $80.00)
  3. `Concrete Beats Festival` (15 AUG • Praça das Fontes, Parque da Cidade • $160.00)
- **This Month**:
  4. `Externa Collective: Monolith` (19 AUG • Externa Club, SCS • $70.00)
  5. `Traço: Echoes of Oscar` (20 AUG • Subsolo Dulcina • $50.00)
  6. `Low Club: Sunset Horizon` (22 AUG • Orla do Lago • $120.00)
- **Upcoming**:
  7. `Makoomba: Eletrônico Ancestral` (28 NOV • Infinu • $60.00)
  8. `Hum Rooftop Sessions: Overdrive` (04 DEC • HUM • $100.00)
  9. `Batrave: The Last Dance` (31 DEC • Galpão Setor Industrial • $240.00)

### 4. Bottom Navigation Dock
- Sticky floating dock with elevated active circular indicator (`#3F32D3` circle with `#F2F862` icon).
- Favorites icon has `1pt` center stroke with same color as fill.
- Tickets icon has `0.75pt` center stroke with same color as fill.

### 5. Checkout & Payment Flow (Figma 5.1 → 5.2.1 → 5.3 → 5.4)
- Shopping Cart with quantity selectors.
- Select Payment Method with cleanly fitted selection boolean.
- Add Payment Method popup (Figma 5.3) with credit card preview and Mastercard logo.
- Transaction confirmation screen.

### 6. E-Ticket Modal & Profile
- E-Ticket with QR code and barcode.
- User profile with avatar upload and Sign Out flow.

---

## 🚀 How to Run & Push to GitHub on macOS
```bash
# Unzip and navigate to folder
cd sonar-bsb-events

# Preview locally
open index.html
# Or start a local server:
# python3 -m http.server 8080

# Push to your GitHub repository
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main --tags
```
