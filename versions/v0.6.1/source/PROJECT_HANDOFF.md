# Sonar BSB Events App — Project Context & Session Handoff

> **To resume this project in Antigravity on macOS or another machine:**
> 1. Open the project folder `sonar-bsb-events` in Antigravity.
> 2. In a new conversation, type `@PROJECT_HANDOFF.md` or mention this file to restore complete context.

---

## 📌 Project Overview
- **Product**: Sonar BSB — Events Discovery & Ticketing Web Application
- **Figma Design**: [Sonar-BSB-EventsApp-v1 (Node 365:525)](https://www.figma.com/design/i3bqFIafJrUlUqn2NMUwIl/Sonar-BSB-EventsApp-v1?node-id=365-525)
- **Current Version**: `V-1.0` (Committed and tagged on local `main` branch)
- **Tech Stack**: Vanilla HTML5, modern CSS3 (Custom Properties, Grid & Flexbox), vanilla ES6+ JavaScript. Completely zero external runtime dependencies.

---

## 🎨 Design System Tokens
- **Brand Secondary (Royal Blue)**: `#3F32D3` (Headers, active navigation, buttons, titles)
- **Brand Primary (Neon Yellow)**: `#F2F862` (Brasília cathedral logo, active icon glyphs, badge highlights)
- **Background Interface**: `#F2F2F2` (Body background)
- **Text Main**: `#1D1D1D` & `#363636`
- **Text Muted**: `#64748B`, `#888888`, `#CBD5E1`
- **Cards**: White `#ffffff` with `border-radius: 30px` (events) / `28px` (modals) / `14px` (payment cards)

---

## 🛠️ Implemented Architecture & Flows

### 1. Dual-View Mode Controller
- **Responsive Web**: Multi-column fluid layout scaling up to 1280px desktop with top quick-search bar.
- **Mobile Frame (1:1)**: Accurate 402px × 874px iPhone viewport mockup with simulated status bar, notch, and sticky dock.

### 2. Complete 9-Event Lineup
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

### 3. Bottom Navigation Dock
- Sticky floating dock with drop shadow.
- Center active button has blue fill (`#3F32D3`) with yellow icon (`#F2F862`).
- Navigation across Home, Search, Favorites, and Tickets.

### 4. Checkout & Payment Flow (Figma 5.1 → 5.2.1 → 5.3 → 5.4)
- **Shopping Cart (5.1)**: Review header positioned at the top; dynamic quantity selectors for Regular ($60.00) & Student ($30.00) tickets.
- **Select Payment Method (5.2.1)**:
  - Custom CSS Grid layout (`32px auto 1fr 22px`) guaranteeing the boolean selection circle always fits cleanly inside the card without overflow.
  - Card number typography reduced to `12px` bold with ellipsis clipping.
- **Add Payment Method Popup (5.3)**:
  - Slide-up card with `#3F32D3` circular close icon.
  - Petrol teal credit card preview (`linear-gradient(135deg, #24637d 0%, #194a5e 100%)`) with gold SIM chip and vector Mastercard logo.
  - Form validation with formatted inputs (`Card Number`, `Name on Card`, `Exp. Date`, `CVV`).
  - "Save This Card?" toggle switch.
  - Submitting appends the card to the list, auto-selects it, and triggers a `"✓ Payment Added!"` toast.
- **Confirmation View (5.4)**: Displays transaction ID, date, payment method, and approved badge.

### 5. E-Ticket Modal (Figma 7.3.2)
- High-fidelity vector QR code, transaction details, and ticket wallet.

### 6. User Profile (Figma 7.1)
- User details view for "John Doe" (`johndoe@mail.com`) with Sonar VIP badge and photo URL edit option.

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
