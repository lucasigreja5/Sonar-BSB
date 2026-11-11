# Sonar BSB - Events Discovery App (Responsive Web Page)

Production-ready responsive web implementation of the **[Sonar BSB Events App v1 Figma Design](https://www.figma.com/design/i3bqFIafJrUlUqn2NMUwIl/Sonar-BSB-EventsApp-v1?node-id=365-525)** (Node `365:525`).

---

## 🎨 Design System Tokens

Extracted directly from the Figma design tokens & variables:
- **Brand Primary Accent**: `#F2F862` (Vibrant neon lime/yellow used on the Brasília Cathedral soundwave logo, BSB typography, and active highlights)
- **Brand Secondary Accent**: `#3F32D3` (Electronic royal purple used on headers, navigation dock, filter pills, buttons, and prices)
- **Interface Canvas**: `#F2F2F2` (Soft modernist grey background)
- **Neutral Dark / Text**: `#1D1D1D` & `#363636` (Headings, times, venues)
- **Muted / Borders**: `#888888`, `#C0C0C0` & `#E5E7EB` (Subtitles, unfocused states, dividers)
- **Card Radii**: `rounded-[30px]` for event cards, `rounded-[24px]` for filters and popups, `rounded-[18px]` for compact favorites, `rounded-[12px]` for action buttons, `rounded-[8px]` for date badges.
- **Shadows**:
  - `0px 4px 14px rgba(0, 0, 0, 0.08)` (Card rest state)
  - `0px 12px 28px rgba(63, 50, 211, 0.16)` (Card hover elevation)
  - `0px 4px 4px rgba(0, 0, 0, 0.25)` (Button shadow)
  - `0px 6px 18px rgba(63, 50, 211, 0.45)` (Dock elevated button)

---

## 🚀 Key Features & Flow Implementations

### 1. Dual-View Experience (Responsive Web + 1:1 Mobile Simulation)
- **Responsive Web Mode**: Fluid multi-column layout adapting seamlessly from mobile screens (360px) to tablets (2 columns) and ultra-wide desktop monitors (3 columns, max-width 1280px). Includes desktop search input with keyboard shortcut `/`.
- **Mobile Frame (1:1 Preview)**: Simulates the exact 402px × 874px mobile canvas, bezel, and top status bar (`10:04`) from the Figma artboard.
- Easily toggleable anytime using the top showcase controller banner.

### 2. Complete 9-Event Lineup (Figma Sections 2.1, 2.2, 2.3)
- **Today (`What’s on Today`)**:
  1. `Trema Techno: Subsolo Urbano` (15 AUG • 22:00h • Galeria dos Estados • $ 60.00)
  2. `Vapø_R: Cybernetic Cathedral` (15 AUG • 23:00h • Birosca do Conic • $ 80.00)
  3. `Concrete Beats Festival` (15 AUG • 16:00h • Praça das Fontes, Parque da Cidade • $ 160.00)
- **This Month (`What’s Coming This Month`)**:
  4. `Externa Collective: Monolith` (19 AUG • 22:00h • Externa Club, SCS • $ 70.00)
  5. `Traço: Echoes of Oscar` (20 AUG • 23:00h • Subsolo do Teatro Dulcina Conic • $ 50.00)
  6. `Low Club: Sunset Horizon` (22 AUG • 14:00h • Orla do Lago Paranoá • $ 120.00)
- **Upcoming (`Hot and Upcoming Events`)**:
  7. `Makoomba: Eletrônico Ancestral` (28 NOV • 22:00h • Infinu Comunidade Criativa, W3 Sul • $ 60.00)
  8. `Hum Rooftop Sessions: Overdrive` (04 DEC • 16:00h • HUM Espaço Multiuso, SIG • $ 100.00)
  9. `Batrave: The Last Dance` (31 DEC • 21:00h • Galpão de Oficinas, Setor Industrial • $ 240.00)

### 3. Dedicated Search Flow (Figma 3.1.1 & 3.2.1)
- Interactive search filter card with **Event Name**, **Event Date**, and **Event Location** inputs.
- "Only Events Happening Today?" toggle switch with dynamic filtering.
- "Find Events Near Me" search action with real-time feedback.

### 4. Interactive Favorites (Figma 6- Favorites `393:815`)
- Dedicated horizontal compact card format matching Figma node `393:815`.
- Instant bookmarking / heart toggle with smooth pop animations, toast notifications, and live dock count badge.

### 5. Rich Event Details Slide-up Sheet (Figma 4.1- EventDetails1 `374:543`)
- High-fidelity modal sheet featuring:
  - Event cover banner with date badge
  - Verified event and genre tags
  - Taglines & full cultural narrative
  - **The Lineup**: Curated artist descriptions and bios (e.g. Oblongui, Maze One, Aura Sonar, etc.)
  - **The Venue**: Architectural and urbanist background on Brasília's iconic modernist spaces (Galeria dos Estados, Conic, Parque da Cidade, etc.)
  - "Buy Tickets" button with price that instantly books tickets into the user's wallet.

### 6. Digital E-Ticket & Wallet (Figma 7.3.2- ETicketPopUp `783:10868`)
- Live vector QR code generation.
- Transaction details: Transaction ID (`#WFHT100492`), date/time, payment method (`Mastercard •••• 2304`), and approved status.
- "Save PDF / Print" and wallet counter.

### 7. Checkout & Payment Flow (Figma 5.1, 5.2.1, 5.3, 5.4)
- **Shopping Cart**: Real-time quantity adjustments for Regular & Student tickets with live subtotal calculation and clear header banner.
- **Select Payment Method**: Interactive payment mode selection (Mastercard, PayPal, Apple Pay) with custom grid layout and precise boolean selection circles.
- **Add Payment Method Popup (5.3)**: Slide-up modal featuring realistic gradient credit card preview, auto-formatted card inputs, and instant addition to the saved methods list.
- **Confirmation Screen (5.4)**: Purchase confirmation summary with transaction ID, payment method, date, and quick access to E-Ticket.

### 8. User Profile & Photo Upload (Figma 7.1- UserProfile `398:484`)
- Accessible by clicking the top avatar button.
- Profile view for "John Doe" (`johndoe@mail.com`) with Sonar VIP badge, photo upload/URL change, and quick navigation to tickets, favorites, and profile editing.

### 9. Elevated Bottom Navigation Dock (Figma 751:6292)
- Custom floating white bar with rounded corners and subtle drop shadow.
- Elevated circular active button with `#3F32D3` fill and `#F2F862` icon.
- Interactive Home, Search, Favorites, and Tickets items matching Figma artboard layout.

---

## 🏷️ Version History

- **`V-1.0`** (Initial Release): Complete Figma design implementation of Sonar BSB Events discovery app, including responsive web mode, 1:1 mobile frame mode, 9-event lineup, search flow, favorites, event details sheet, full checkout flow with payment selection & card popup, e-ticket wallet, and user profile management.

---

## 📂 Project Directory Structure

```
sonar-bsb-events/
├── assets/
│   ├── logo-icon.svg          # Stylized Brasília Cathedral / Soundwave icon
│   ├── back-button.svg        # Circular back button
│   ├── favorite-button.svg    # Favorite heart toggle button
│   ├── event-trema.png        # Event 1 photo banner
│   ├── event-vapor.png        # Event 2 photo banner
│   ├── event-concrete.png     # Event 3 photo banner
│   ├── profile-picture.png    # User profile avatar
│   ├── nav-home.svg           # Elevated dock home icon
│   ├── nav-search.svg         # Dock search icon
│   ├── nav-favorites.svg      # Dock favorites icon
│   ├── nav-ticket.svg         # Dock ticket icon
│   ├── nav-ellipse.svg        # Elevated dock circle asset
│   └── nav-rectangle.svg      # Dock background asset
├── index.html                 # Clean semantic HTML5 markup
├── styles.css                 # Responsive stylesheet & design system tokens
├── app.js                     # Interactive application logic & state management
└── README.md                  # Documentation & usage guide
```

---

## 💻 How to View & Run

1. **Directly in Browser**:
   Open `index.html` in your default browser:
   ```powershell
   Start-Process "C:\Users\Lucas.Moreira\.gemini\antigravity\scratch\sonar-bsb-events\index.html"
   ```

2. **Using a Local Server**:
   ```powershell
   cd "C:\Users\Lucas.Moreira\.gemini\antigravity\scratch\sonar-bsb-events"
   npx serve .
   ```
   Or with Python:
   ```powershell
   python -m http.server 8080
   ```
   Then open `http://localhost:8080`.

3. **Recommended Workspace**:
   Set `C:\Users\Lucas.Moreira\.gemini\antigravity\scratch\sonar-bsb-events` as your active workspace in Antigravity.
