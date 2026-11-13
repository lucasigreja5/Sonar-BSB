# Sonar BSB Events App — Project Context & Session Handoff

> **To resume this project in Antigravity on macOS or another machine:**
> 1. Open the project folder `sonar-bsb-events` in Antigravity.
> 2. In a new conversation, type `@handoffs/HANDOFF_V1.4.2.md` or `@PROJECT_HANDOFF.md` to restore complete context.

---

## 📌 Project Overview
- **Product**: Sonar BSB — Events Discovery & Ticketing Web Application
- **Figma Design**: [Sonar-BSB-EventsApp-v1 (Node 365:525)](https://www.figma.com/design/i3bqFIafJrUlUqn2NMUwIl/Sonar-BSB-EventsApp-v1?node-id=365-525)
- **Current Version**: `v1.4.2` (Production Release)
- **Tech Stack**: Vanilla HTML5, modern CSS3 (Custom Properties, Grid & Flexbox), vanilla ES6+ JavaScript. Completely zero external runtime dependencies.
- **Detailed Handoff**: See [handoffs/HANDOFF_V1.4.2.md](handoffs/HANDOFF_V1.4.2.md) for complete specifications, data schemas, and design tokens.

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

### 3. Complete 27-Event Dynamic Brasília Lineup
- **Today (`9` events — dynamically anchored to user open date)**:
  1. `Trema Techno: Subsolo Urbano` (Galeria dos Estados • `$60.00`)
  2. `Vapø_R: Cybernetic Cathedral` (Birosca do Conic • `$80.00`)
  3. `Concrete Beats Festival` (Praça das Fontes, Parque da Cidade • `$160.00`)
  4. `Subterrânea: Acid Chamber` (Beco da Cultura, SCS • `$55.00`)
  5. `Esplanada Bass: Orbit 061` (Cúpula Externa, Museu Nacional • `$65.00`)
  6. `Conic: Frequency 404` (Galeria Subsolo Conic • `$45.00`)
  7. `Eixão Sonoro: Dusk Session` (Passarela do Eixão Sul, 208 Sul • `$40.00`)
  8. `Ponto Zero: Brutalist Pulse` (Quadra 2 Bloco C, SBS • `$75.00`)
  9. `Cerrado Mist: Sound System` (Arena Aberta Funarte • `$50.00`)
- **This Month (`9` events — dynamically inside current calendar month)**:
  10. `Externa Collective: Monolith` (Externa Club, SCS • `$70.00`)
  11. `Traço: Echoes of Oscar` (Subsolo do Teatro Dulcina Conic • `$50.00`)
  12. `Low Club: Sunset Horizon` (Orla do Lago Paranoá • `$120.00`)
  13. `Ponte JK: Waterline` (Orla da Ponte JK • `$110.00`)
  14. `Mirante Digital: Transmission` (Torre de TV Digital, Lago Norte • `$95.00`)
  15. `SIA Garage: Protocol 909` (Galpão Trecho 3, SIA • `$70.00`)
  16. `Ermida: Twilight Echo` (Anfiteatro Ermida Dom Bosco, Lago Sul • `$85.00`)
  17. `Concha Prism: Wave Mechanics` (Concha Acústica, SHTN • `$65.00`)
  18. `508 SynthLab: Modular Night` (Espaço Cultural Renato Russo, 508 Sul • `$55.00`)
- **Upcoming (`9` events — dynamically across next 2 calendar months)**:
  19. `Makoomba: Eletrônico Ancestral` (Infinu, W3 Sul • `$60.00`)
  20. `Hum Rooftop Sessions: Overdrive` (HUM Espaço Multiuso, SIG • `$100.00`)
  21. `Planalto Solar: Open Air` (Parque Olhos d’Água, Asa Norte • `$150.00`)
  22. `Anel Monumental: Kinetic X` (Galeria Interna Arena BRB • `$180.00`)
  23. `Batrave: The Last Dance` (Galpão de Oficinas, Setor Industrial • `$240.00`)
  24. `Botânico: Canopy Nights` (Alameda dos Ipês, Jardim Botânico DF • `$130.00`)
  25. `SOF Sul: Heavy Machinery` (Hangar 14, SOF Sul • `$90.00`)
  26. `Prainha Norte: First Light` (Prainha do Lago Norte • `$140.00`)
  27. `Km Zero: Analog Fest` (Clareira Histórica, Park Way / Catetinho • `$195.00`)

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

# Push to GitHub repository
git push -u origin main --tags
```
