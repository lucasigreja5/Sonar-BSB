# Sonar BSB Events App — Version 1.4.3 Handoff

**Version:** 1.4.3  
**Base Version:** 1.4.2  
**Release Date:** 2026-11-13  

---

## Summary of Changes in Version 1.4.3

1. **Favorites Card "Learn More" White Hover Text (`styles.css`)**
   - Updated `.btn-fav-learn-more:hover` text color from `var(--color-primary)` (`#F2F862`) to `#ffffff` on `--color-secondary-hover` (`#3225B8`).

2. **Event Cards Popup Top Event Image & Proportions (`styles.css`, `app.js`)**
   - Fixed a Flexbox compression bug in `.modal-sheet` (`display: flex; flex-direction: column; max-height: 90vh; overflow-y: auto`) where `.modal-image-wrapper` lacked `flex-shrink: 0;` and shrank to `0px` height when modal details overflowed vertically.
   - Updated `.modal-image-wrapper` in `styles.css` to `flex-shrink: 0;`, `aspect-ratio: 341 / 185;`, `height: auto;`, and `border-radius: 16px;` matching `.card-image-box` on event cards, added `display: block;` to `.modal-image-wrapper img`, `flex-shrink: 0;` to `.modal-drag-handle`, and `z-index: 10;` + `box-shadow` to `.modal-close-btn` so it stays layered cleanly above the top image.
   - Updated `openEventModal(eventId)` in `app.js` to set `#modalImage.alt = evt.title`, dynamically mirror the live `.card-image-box` bounding aspect ratio onto `#eventModal .modal-image-wrapper` when a card image box is rendered in the DOM (falling back to CSS `341 / 185` on views without event cards such as My Favorites), and reset `.modal-sheet.scrollTop = 0` so the top event banner is always visible when opening the popup.

3. **Version Bump & Archive**
   - Updated page `<title>` tags in `index.html` and `login.html` to `(Version 1.4.3)`.
   - Archived release bundle at `versions/v1.4.3/sonar-bsb-events-v1.4.3.zip`.
