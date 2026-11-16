# Sonar BSB Events App — Version 1.4.6 Handoff

**Version:** 1.4.6  
**Base Version:** 1.4.5  
**Release Date:** 2026-11-16  

---

## Summary of Changes in Version 1.4.6

1. **Edit Profile Mobile Scroll Containment (`styles.css`)**
   - Added `max-height: 90vh; overflow-y: auto;` to `.profile-card` so Edit Profile mode (`#profileEditMode`) remains scrollable on compact mobile screens and when the virtual keyboard opens without clipping **Save Changes** / **Cancel**.

2. **Login Screen Accessible Input Labels (`index.html`, `login.html`)**
   - Added `aria-label="Username"` on `#loginUsername` and `aria-label="Password"` on `#loginPassword` across both `index.html` and `login.html` for screen-reader accessibility.

3. **Top Search Close Button Touch Target (`styles.css`)**
   - Enlarged `.desktop-search-close-btn` (`#desktopSearchCloseBtn`) from `24px × 24px` to `34px × 34px` while preserving the centered `13px` icon and `44px` header pill proportions.

4. **Visible "Clear Filters" Button in Search Panel (`index.html`, `styles.css`)**
   - Wrapped `#btnFindEvents` and a new `#btnClearSearchFilters` (`Clear Filters`, calling `resetSearchFilters()`) inside `.search-form-actions` in `#searchFilterPanel` so users can reset search filters directly even when results are currently shown.

5. **Modal Keyboard Focus Management (`app.js`)**
   - Added `moveFocusToModal(modalEl)` and `restoreFocusFromModal()` wired into `openEventModal`/`closeEventModal`, `showTicketPopup`/`closeTicketModal`, and `openProfileModal`/`closeProfileModal` so focus enters the active modal (`modal-close-btn`) on open and returns cleanly to the triggering element on close.

6. **Version Bump & Archive**
   - Updated page `<title>` tags in `index.html` and `login.html` to `(Version 1.4.6)`.
   - Archived release bundle at `versions/v1.4.6/sonar-bsb-events-v1.4.6.zip`.
