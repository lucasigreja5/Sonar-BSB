# Sonar BSB Events App — Version 1.4.5 Handoff

**Version:** 1.4.5  
**Base Version:** 1.4.4  
**Release Date:** 2026-11-16  

---

## Summary of Changes in Version 1.4.5

1. **Top Bar Animated Search Bar — Remove `"SEARCH"` Text (`index.html`)**
   - Updated `#desktopSearchInput` inside `#desktopSearchBar` in `index.html` from `placeholder="SEARCH"` to `placeholder=""`, removing the static `"SEARCH"` text inside the animated top-bar search pill while preserving the magnifying glass icon, expand/collapse animation, clear/close button (`#desktopSearchCloseBtn`), and typing/search functionality.

2. **Top Search Bar Results Shown on Search Page (`app.js`)**
   - Updated the `input` listener on `#desktopSearchInput` so typing a non-empty query switches `state.activeView` to `"search"` (moving the active `.is-selected` indicator in the bottom navigation dock to `#navSearchBtn`).
   - Updated `switchView("search")` to show `#sectionHeaderBlock` and `#eventsContainer` whenever `state.searchQuery.trim() !== ""` (or `state.searchSubmitted` is true) and to preserve focus on `#desktopSearchInput` when the user is actively typing there.
   - Updated `renderEvents()` (`state.activeView === "search"`) to filter `EVENTS_DATA` by `state.searchQuery` and display matching results directly on the Search page.

3. **Version Bump & Archive**
   - Updated page `<title>` tags in `index.html` and `login.html` to `(Version 1.4.5)`.
   - Archived release bundle at `versions/v1.4.5/sonar-bsb-events-v1.4.5.zip`.
