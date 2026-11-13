# Sonar BSB Events App — Version 1.4 Handoff

**Version:** 1.4  
**Base Version:** 1.3.2  
**Release Date:** 2026-11-13  

---

## Summary of Changes in Version 1.4

1. **Search Screen Deferred Results (`index.html`, `app.js`)**
   - Added `state.searchSubmitted` (initialized to `false`) so the Search screen (`#searchFilterPanel`) keeps the search results header (`#sectionHeaderBlock`) and grid (`#eventsContainer`) completely empty upon navigation and while typing or toggling filters.
   - Results are now rendered only after the user enters data in at least one search field (`#searchFormName`, `#searchFormDate`, or `#searchFormLocation`) and clicks the **"Find Events Near Me"** button (`#btnFindEvents`).
   - Clearing all search inputs or clicking **"Reset Search"** clears the rendered search results back to the empty initial state.

2. **Modal Outside-Click Bug Fix (`app.js`, `styles.css`)**
   - Fixed a bug in `setupKeyboardShortcuts()` where clicking outside a popup on its modal backdrop set inline `modal.style.display = "none"` on `.modal-overlay` elements (`#eventModal`, `#ticketModal`, `#profileModal`), preventing modals from reopening until page refresh.
   - Updated the backdrop click handler and `Escape` key handler to invoke the dedicated close helpers (`closeEventModal()`, `closeTicketModal()`, `closeProfileModal()`, `closeAddPaymentModal()`).
   - Ensured `openEventModal()`, `showTicketPopup()`, and `openProfileModal()` clear any lingering inline `display` override, and explicitly set `.modal-overlay.open { display: flex; opacity: 1; pointer-events: auto; }` in `styles.css`.

3. **Top-Bar Search Bar Style & Animation (`index.html`, `styles.css`, `app.js`)**
   - Styled `#desktopSearchBar` in the header after the Figma `Search Bar` component (`z52M2Cn7oC78mUUtVEb1sZ`, node `28:230`, `State=Closed` circle expanding smoothly to `State=Open` `354px` pill with uppercase bold `"SEARCH"` placeholder and Figma `SearchIcon` SVG).
   - Applied the header cart button's color scheme: resting `44px × 44px` transparent circle with white icon and subtle hover scale (`1.08`), expanding on click/focus or `/` shortcut to `#3F32D3` (`--color-secondary`) background, `#F2F862` (`--color-primary`) icon and text, `2px solid #F2F862` border, and neon yellow glow (`0 0 12px rgba(242, 248, 98, 0.6)`).
   - Responsive mobile sizing (`<= 767px`) prevents overlap or horizontal overflow on `390px` viewports.

4. **Top-Bar Cart Button Icon (`index.html`, `styles.css`)**
   - Updated `#headerCartBtn` (and `.empty-cart-icon` in `#emptyCartCard`) to use the filled shopping cart vector extracted from the Figma `Cart Button` component (`z52M2Cn7oC78mUUtVEb1sZ`, node `30:177`, `viewBox="11.25 11.25 23.75 23.75"`), sized to `24px × 24px` inside the `44px × 44px` circular button.

5. **Version Bump**
   - Updated page `<title>` tags in `index.html` and `login.html` to `(Version 1.4)`.
   - Archived release bundle at `versions/v1.4/sonar-bsb-events-v1.4.zip`.
