# Sonar BSB Events App — Version 1.5 Handoff

**Version:** 1.5  
**Base Version:** 1.4.6  
**Release Date:** 2026-11-16  

---

## Summary of Changes in Version 1.5

1. **Dark Mode Theme & System Preference Detection (`styles.css`, `app.js`)**
   - Added `initTheme()`, `applyTheme(theme, persist)`, and `toggleDarkMode(isDark)` in `app.js` (called from `initApp()`):
     - Starts in Light Mode (`data-theme="light"`) by default, or automatically matches the user's OS/browser dark mode setting (`window.matchMedia("(prefers-color-scheme: dark)").matches`) when no manual override is saved.
     - Persists manual theme choices in `localStorage` (`sonar_theme`) and listens for OS `prefers-color-scheme` changes when no manual override is stored.
   - Added `:root[data-theme="dark"]` token overrides (`#121218` canvas, `#1C1C26` elevated cards/modals, `#252536` inputs & nested surfaces, `#F1F5F9` / `#CBD5E1` / `#94A3B8` text, `#C7D2FE` headings, `#F2F862` price accents) across Home, Search, Favorites, Tickets, Checkout, Payment, Modals, and Bottom Navigation in `styles.css`.
   - Updated the empty-search-state card in `renderEvents()` (`app.js`) to use `.empty-search-state` and `var(--color-white)` / `var(--color-text-muted)`.

2. **User Profile Dark Mode Toggle (`index.html`, `styles.css`, `app.js`)**
   - Added `.profile-theme-toggle-card` inside `#profileViewMode` (`#profileModal`) with `#profileDarkModeToggle` switch and `#profileThemeStatus` label (`Light theme active` / `Dark theme active`).

3. **Version Bump & Archive**
   - Updated page `<title>` tags in `index.html` and `login.html` to `(Version 1.5)`.
   - Archived release bundle at `versions/v1.5/sonar-bsb-events-v1.5.zip`.
