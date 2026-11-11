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

## 📜 Version Adjustments & Changelog (Prompts, Reasoning & Implementation)

This log documents each iterative release of the project, recording the exact user prompt, the engineering reasoning, and the technical implementation details.

---

### 🏷️ Version 0.6 (Current Release — `v0.6`)

#### 💬 Original User Prompt:
> *"Version 0.6*  
> *Please make the following adjustments, and start adding the list of version adjustments to the readme file, including the orginal prompt and your reasoning on how it was implemented*  
> *- Create a login page from the frame "1- WelcomeLogin" on the figma file, with including the houdini text and blinking dot animations"*

#### 🧠 Reasoning & Architecture:
1. **Login Page Experience (`1- WelcomeLogin` / Figma node `374:537`)**:
   - The user requested a genuine login page rather than immediately landing on the events home feed.
   - We implemented a dual-access pattern:
     - **Integrated SPA Login Flow**: In `index.html`, when unauthenticated, the application opens directly to the full-screen `welcomeSection` representing `1- WelcomeLogin`. Submitting credentials (or continuing as guest) transitions smoothly into the app with a welcome toast.
     - **Standalone Page (`login.html`)**: Created a dedicated `login.html` file matching Figma node `374:537` 1:1, allowing direct testing or standalone bookmarking.
     - **Header & Profile Navigation**: Added an interactive "Login Page" pill button in the site header and a "Sign Out (Back to Login Screen)" button in the profile modal so users can easily toggle between the login screen and the event feed.
2. **Houdini Text Animation (`654:5110`)**:
   - Recreated the overflow-clipped upward escape/reveal animation for "Frequency" (50.4px height frame, Helvetica Neue Regular 500) and "Found" (73.44px height frame, Helvetica Neue Black 900) in neon yellow (`#F2F862`) with cubic-bezier easing (`cubic-bezier(0.16, 1, 0.3, 1)`).
3. **Multi-Layer Blinking Dot Animations**:
   - **Signature Sonar Radar Ping Dot**: Integrated a glowing neon yellow core (`.dot-core`) with expanding acoustic ripple rings (`.dot-ring`, `@keyframes sonarPing`) immediately beside "Found", evoking an active sonar frequency ping.
   - **Live Frequency Status Badge**: Positioned a pill badge (`.welcome-status-badge`) with a pulsing green live radar dot (`.blinking-status-dot`) reading `LIVE FREQUENCY • BRASÍLIA DF`.
   - **Form Input Focus Caret**: Real-time glowing green blinking indicator (`.welcome-input-indicator`) beside each input field upon active focus.
   - **Ambient Floating Particle Grid**: Scattered ambient frequency dots (`.ambient-dot`, `@keyframes ambientBlink`) gently twinkling across the blue mesh gradient backdrop.

#### 🛠️ Files Modified:
- `index.html`: Enhanced `welcomeSection` with blinking dot elements, status badge, and added header login shortcut.
- `styles.css`: Added keyframe animations (`@keyframes sonarPing`, `@keyframes dotBlink`, `@keyframes ambientBlink`, `@keyframes statusPulse`), input indicator styles, and header button styling.
- `app.js`: Updated view transition logic and animation resets for the blinking dots on entry.
- `login.html`: Standalone login page implementation.
- `VERSIONS.md` & `README.md`: Version registry updates.

---

### 🏷️ Version 0.5 (`v0.5`)

#### 💬 Original User Prompt:
> *"The bottom nav bar stopped working after the latest adjustments, please make it work again like it was on the previous version. Lets start naming versions, and keeping the older versions saved on the folder, so we can revert back to previous versions if necessary. Lets make this one version 0.5, and keep adding subversions from now on until its ready to be published."*

#### 🧠 Reasoning & Architecture:
1. **Diagnosis & Root Cause Analysis**:
   - Discovered an orphaned CSS closing brace in `styles.css` right before the `.nav-item` rules. Browser CSS parsers skipped the `.nav-item` selector block due to the syntax error.
   - Without `position: relative; z-index: 10;`, the buttons fell behind the dock background (`.dock-bg-layer`), which lacked `pointer-events: none;` and intercepted all user clicks.
   - In `index.html`, the container had `class="bottom-nav-container"` without `id="bottomNavContainer"`, causing `getElementById` in `app.js` to return `null`.
2. **Technical Fixes**:
   - Cleaned the CSS syntax error in `styles.css`.
   - Added `pointer-events: none;` to `.dock-bg-layer` so background decoration never blocks click hits.
   - Assigned `.nav-item` `position: relative; z-index: 10; pointer-events: auto; cursor: pointer;`.
   - Added programmatic click listeners in `setupNavEventListeners()` inside `app.js` to guarantee responsiveness.
3. **Version Archiving System**:
   - Created the `versions/` folder structure storing unpacked source code and zip files for each historical milestone (`versions/v0.4/` and `versions/v0.5/`).
   - Tagged releases in Git (`v0.4`, `v0.5`) and published `VERSIONS.md`.

---

### 🏷️ Version 0.4 (`v0.4`)

#### 💬 Original User Prompt:
> *- "On all pages that the event card appears, make sure that all cards have the same sizes, and that the learn more and purchase buttons inside the card are all at the same height related to the card. You can adjust fonts sizes and spacings as necessary to achieve this result*  
> *- Inside the learn more popup, make sure that the price per tickets and purchase tickets bottom element spans the whole height of the card, leaving no empty space under it*  
> *- Inside the shopping cart and checkout flow, remove the return buttom at the top left that would return to home*  
> *- In all pages, try to use only the helvetica neue font, keeping the styles"*

#### 🧠 Reasoning & Architecture:
- Standardized `.event-card` to flexbox layout with uniform height (`height: 100%; min-height: 440px`), card description clamp, and `margin-top: auto` on `.event-card-actions` so all "Learn More" and "Purchase" buttons align horizontally across all cards.
- Restructured `.event-sheet-footer` with `position: sticky; bottom: 0; padding: 20px 24px;` and background fill to eliminate dead space under the ticket CTA.
- Removed return-to-home chevron buttons in cart and payment selection flows to streamline checkout.
- Standardized global typography strictly to `Helvetica Neue` with consistent weights across all components.

---

### 🏷️ Earlier Milestones (V-1.0 Initial Foundation)
- Initial translation of the 9-event database from Brasília DF underground electronic scene.
- Dual-view mode (responsive web + mobile simulation).
- Complete checkout flow, credit card popup (Figma 5.3), e-ticket modal (Figma 7.3.2), and user profile management.

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
