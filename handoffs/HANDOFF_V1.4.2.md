# Sonar BSB Events App — Version 1.4.2 Handoff

**Version:** 1.4.2  
**Base Version:** 1.4.1  
**Release Date:** 2026-11-13  

---

## Summary of Changes in Version 1.4.2

1. **Favorites Cards: "Learn More" Button & Relocated Smaller Price (`app.js`, `styles.css`)**
   - Updated the **My Favorites** horizontal card template (`.fav-card-horizontal`) inside `renderEvents()` (`state.activeView === "favorites"`):
     - Relocated `<span class="fav-card-price">${evt.priceFormatted}</span>` inside `.fav-card-meta-row` right alongside `.fav-card-date`, styled with a smaller `13px` font size (`font-weight: 800`, subtle royal-blue pill tint `rgba(63, 50, 211, 0.1)`, `#3F32D3` text).
     - Added `<button type="button" class="btn-learn-more btn-fav-learn-more" onclick="event.stopPropagation(); openEventModal('${evt.id}')">Learn More</button>` at the bottom of `.fav-card-info`, matching the event card `"Learn More"` action style (`#3F32D3` royal-blue background, `#F2F2F2` crisp bold text, `10px` radius, `36px` height, `--shadow-btn`, `#3225B8` + `#F2F862` hover accent).

2. **Feedback Popups Redesign (`z52M2Cn7oC78mUUtVEb1sZ`, `node-id=3:177` / `3:178`, `app.js`, `styles.css`)**
   - Redesigned `.toast-container`, `.toast`, and `showToast(message)` to align with the Sonar BSB design system (`#3F32D3` -> `#2E23A6` royal-blue gradient surface, `#F2F862` `1.5px` accent border, `#FAFCC6` primary-100 text, `16px` radius, and elevation shadow adapted from Figma `Snackbar` `3:177` / `3:178`):
     - Added a `30px × 30px` circular `.toast-icon-badge` (`#F2F862` fill, `#3F32D3` icon) powered by contextual vector SVGs via `getToastIconSVG(rawMessage)`.
     - Set `.toast-message` via `textContent` (after stripping decorative leading/trailing emojis) for safe, clean typography (`14px` bold, `#FAFCC6`).
     - Added an interactive Figma-inspired pill dismiss button (`.toast-dismiss-btn` `"OK"`) that immediately animates and dismisses the notification when clicked, in addition to the `3200ms` auto-dismiss timer.

3. **Version Bump & Archive**
   - Updated page `<title>` tags in `index.html` and `login.html` to `(Version 1.4.2)`.
   - Archived release bundle at `versions/v1.4.2/sonar-bsb-events-v1.4.2.zip`.
