# Sonar BSB Events App — Version 1.4.5 Handoff

**Version:** 1.4.5  
**Base Version:** 1.4.4  
**Release Date:** 2026-11-16  

---

## Summary of Changes in Version 1.4.5

1. **Top Bar Animated Search Bar — Remove `"SEARCH"` Text (`index.html`)**
   - Updated `#desktopSearchInput` inside `#desktopSearchBar` in `index.html` from `placeholder="SEARCH"` to `placeholder=""`, removing the static `"SEARCH"` text inside the animated top-bar search pill while preserving the magnifying glass icon, expand/collapse animation, clear/close button (`#desktopSearchCloseBtn`), and typing/search functionality.

2. **Top Search Bar Results Shown on Search Page & Enter/Return Collapse (`app.js`)**
   - Updated the `input` listener on `#desktopSearchInput` so typing a non-empty query switches `state.activeView` to `"search"` (moving the active `.is-selected` indicator in the bottom navigation dock to `#navSearchBtn`).
   - Updated `switchView("search")` to show `#sectionHeaderBlock` and `#eventsContainer` whenever `state.searchQuery.trim() !== ""` (or `state.searchSubmitted` is true) and to preserve focus on `#desktopSearchInput` when the user is actively typing there.
   - Updated `renderEvents()` (`state.activeView === "search"`) to filter `EVENTS_DATA` by `state.searchQuery` and display matching results directly on the Search page.
   - Added a `keydown` handler on `#desktopSearchInput` for `"Enter"` (`e.preventDefault(); closeTopSearchBar(false);`) so pressing Enter/Return blurs and hides the text input and collapses the top search bar back to `44px × 44px`, syncs the trimmed query into `#searchFormName` (`state.searchFilters.name`), smooth-scrolls to `#sectionHeaderBlock` (`scroll-margin-top: 84px`), and triggers a `.search-results-pulse` highlight animation on `#sectionHeaderBlock` (`styles.css`).
   - Updated `switchView(viewName)` so navigating to any non-search view (Home, Favorites, Tickets, etc.) clears `state.searchQuery` and collapses `#desktopSearchBar` (`closeTopSearchBar(true)`), transfers the active top-bar query into `state.searchFilters.name` / `#searchFormName` with `state.searchSubmitted = true` (and includes `evt.venue` in `matchName`) so the Search page remains persistent with those results when revisited, and resets Home back to its original default `"today"` tab state (`What’s on Today`, 9 events).

3. **Version Bump & Archive**
   - Updated page `<title>` tags in `index.html` and `login.html` to `(Version 1.4.5)`.
   - Archived release bundle at `versions/v1.4.5/sonar-bsb-events-v1.4.5.zip`.
