# Project Handoff — Sonar BSB Events App (`v1.3.1`)

**Date:** 2026-11-12  
**Version:** `1.3.1` (Production Release)  
**GitHub Repository:** `https://github.com/lucasigreja5/Sonar-BSB`

---

## 🎯 Version 1.3.1 Changes Summary

1. **Weekend-Focused Dynamic Dates (`Thu–Sun` — `app.js`)**:
   - Added `PREFERRED_EVENT_WEEKDAYS = new Set([0, 4, 5, 6])` (Sunday, Thursday, Friday, Saturday) and `WEEKEND_DAY_ROTATIONS` so `This Month` and `Upcoming` (`+1/+2` calendar months) distribute events naturally across **Thursdays, Fridays, Saturdays, and Sundays** and avoid Monday, Tuesday, and Wednesday.
   - `resolveCurrentMonthDate()` spreads `This Month` events across remaining `Thu–Sun` days of the open month (gracefully sharing remaining weekends late in the month, or using the month's final `Thu–Sun` weekend if opened on the final Mon–Wed of a month so dates never escape the current month or land on Mon–Wed).
   - `resolveUpcomingMonthDate()` partitions each future month (`month + 1` and `month + 2`) into sequential windows and selects a rotated `Sat / Fri / Sun / Thu` slot per window, safely handling Dec→Jan rollovers and 28/29-day February.
   - `Today` events remain anchored strictly to the user's exact local open date.

2. **System Calendar Picker on Search (`index.html`, `styles.css`, `app.js`)**:
   - Upgraded `#searchFormDate` from `<input type="text">` to `<input type="date">` inside `.date-input-wrapper`.
   - Clicking anywhere in the **Event Date** field invokes `showPicker()` (with fallback to the full-height native `::-webkit-calendar-picker-indicator` hotspot) to open the OS/system calendar dialog on desktop and mobile.
   - Added `.date-calendar-icon` SVG overlay, `#clearSearchDateBtn` (`×`) when a date is chosen, exact `YYYY-MM-DD` matching against `evt.dateISO` in `renderEvents()`, and explicit mobile/touch blur handling on `switchView('search')` so touch keyboards never open automatically.

3. **CONIC: Frequency 404 Cover Placeholder (`assets/event-conic404.png`)**:
   - Replaced the bottom-aligned AI artwork on *Conic: Frequency 404* with a centered `1024×1024` Sonar BSB dark wireframe placeholder (`COVER PLACEHOLDER • ARTWORK PENDING • SCHEDULED FOR V1.3.2`) aligned in the horizontal card crop center.

---

## 🎨 Roadmap for Version 1.3.2 (Pending AI Cover Generations)

Once `gemini-3.1-flash-image` daily quota resets (`~2026-11-13T01:50:56Z` / `22:50 BRT`), regenerate the **8 temporary/placeholder covers** below using centered neon/brutalist photography to complete `v1.3.2`:

| Event ID | Title | Current Asset in `v1.3.1` | Status |
| :--- | :--- | :--- | :--- |
| `conic-frequency-404` | Conic: Frequency 404 | `./assets/event-conic404.png` | Wireframe Placeholder |
| `renato-russo-synthlab` | 508 SynthLab: Modular Night | `./assets/event-synthlab.png` | Temporary Neon Graphic |
| `planalto-solar-gathering` | Planalto Solar: Open Air | `./assets/event-planalto-solar.png` | Temporary Neon Graphic |
| `mane-ring-kinetic` | Anel Monumental: Kinetic X | `./assets/event-anel-kinetic.png` | Temporary Neon Graphic |
| `botanico-organic-nocturne` | Botânico: Canopy Nights | `./assets/event-botanico.png` | Temporary Neon Graphic |
| `sof-sul-heavy-machinery` | SOF Sul: Heavy Machinery | `./assets/event-sofsul.png` | Temporary Neon Graphic |
| `prainha-lago-norte-dawn` | Prainha Norte: First Light | `./assets/event-prainha.png` | Temporary Neon Graphic |
| `catetinho-analog-freq` | Km Zero: Analog Fest | `./assets/event-kmzero.png` | Temporary Neon Graphic |

---

## 📁 Verification & Archive Checklist

- [x] `index.html` and `login.html` `<title>` updated to `Version 1.3.1`
- [x] `buildEventsData()` verified across 5 boundary dates (`2026-11-12`, `2026-11-30`, `2026-12-31`, `2028-01-31`, `2027-01-31`): `9/9` Thu–Sun on all `This Month` and `Upcoming` schedules (`0` failures)
- [x] `#searchFormDate` `type="date"`, `showPicker`, ISO filtering, clear button (`×`), and mobile initial `activeElement === BODY` verified in headless Edge
- [x] All 27 event cover PNGs verified loaded at `1024×1024` across `Today`, `This Month`, and `Upcoming`
- [x] Archive snapshot created in `versions/v1.3.1/` (`sonar-bsb-events-v1.3.1.zip` and extracted `source/`)
