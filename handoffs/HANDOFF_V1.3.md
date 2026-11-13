# Project Handoff — Sonar BSB Events App (`v1.3`)

**Date:** 2026-11-12  
**Version:** `1.3` (Production Release)  
**GitHub Repository:** `https://github.com/lucasigreja5/Sonar-BSB`

---

## 🎯 Version 1.3 Changes Summary

1. **18 New Mock Events Across All 3 Categories (27 Events Total)**:
   - **Today (`9` events)**: Added *Subterrânea: Acid Chamber*, *Esplanada Bass: Orbit 061*, *Conic: Frequency 404*, *Eixão Sonoro: Dusk Session*, *Ponto Zero: Brutalist Pulse*, and *Cerrado Mist: Sound System*.
   - **This Month (`9` events)**: Added *Ponte JK: Waterline*, *Mirante Digital: Transmission*, *SIA Garage: Protocol 909*, *Ermida: Twilight Echo*, *Concha Prism: Wave Mechanics*, and *508 SynthLab: Modular Night*.
   - **Upcoming (`9` events)**: Added *Planalto Solar: Open Air*, *Anel Monumental: Kinetic X*, *Botânico: Canopy Nights*, *SOF Sul: Heavy Machinery*, *Prainha Norte: First Light*, and *Km Zero: Analog Fest*.
   - All 18 new covers (`1024×1024` PNGs in `./assets/`) match the Sonar BSB neon/brutalist poster style. Eleven covers were generated with AI (`gemini-3.1-flash-image`), while 7 covers (`event-synthlab.png`, `event-planalto-solar.png`, `event-anel-kinetic.png`, `event-botanico.png`, `event-sofsul.png`, `event-prainha.png`, `event-kmzero.png`) use temporary matching neon graphic posters following `429 RESOURCE_EXHAUSTED` quota limits.

2. **Dynamic App-Open Date Anchoring (`app.js`)**:
   - Implemented `buildEventsData(referenceDate = new Date())`, `resolveCurrentMonthDate(...)`, `resolveUpcomingMonthDate(...)`, `formatEventDateFields(...)`, and `formatPurchaseTimestamp(...)`.
   - **Today** events always match the exact local calendar day when the user opens the app.
   - **This Month** events always stay within the user's current month/year.
   - **Upcoming** events always distribute across the next 2 calendar months (`month + 1` and `month + 2`) with year rollover and short/leap February clamping.
   - Dynamically populates `#searchFormDate` placeholder, Search `dateShort`/`dateMonth`/keyword matching, Checkout `dd/mm/yy` timestamps (`#checkoutEventDateTime`), and default mock ticket timestamps (`createDefaultTickets()`).

---

## 📁 Archive & Verification Checklist

- [x] `index.html` and `login.html` `<title>` updated to `Version 1.3`; `#eventCountBadge` initial fallback set to `9 events`
- [x] All 27 event cover PNGs verified at `1024×1024` and rendering cleanly across `Today`, `This Month`, and `Upcoming` in headless Edge
- [x] `buildEventsData()` unit-tested across 5 calendar boundary cases (mid-month, month-end, year-end rollover, leap Feb, non-leap Feb)
- [x] Archive snapshot created in `versions/v1.3/` (`sonar-bsb-events-v1.3.zip` and extracted `source/`)
