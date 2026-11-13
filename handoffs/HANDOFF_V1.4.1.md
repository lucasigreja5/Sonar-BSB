# Sonar BSB Events App — Version 1.4.1 Handoff

**Version:** 1.4.1  
**Base Version:** 1.4  
**Release Date:** 2026-11-13  

---

## Summary of Changes in Version 1.4.1

1. **Top Search Bar Close Button (`index.html`, `styles.css`, `app.js`)**
   - Added `#desktopSearchCloseBtn` inside `#desktopSearchBar` so users can immediately exit the search function, clear `#desktopSearchInput` and `state.searchQuery`, collapse the search bar back to its `44px × 44px` circular toggle state, and close active search results back to the current tab/view.
   - Added `exitTopSearchBar(e)` and updated `closeTopSearchBar(clearValue)` to blur any focused child element inside `#desktopSearchBar` so `:focus-within` never keeps the bar expanded after clicking the close button.

2. **`NEWFavoriteButton` Component (`z52M2Cn7oC78mUUtVEb1sZ`, `node-id=226:1043`)** (`app.js`, `styles.css`)
   - Replaced the favorite buttons on both Event Cards (`.card-fav-btn`) and Favorites Cards (`.fav-card-remove-btn`) via `renderFavoriteButtonSVG(isActive)` with the `32×32` `NEWFavoriteButton` component from Figma:
     - **Default** (`226:1044`): `#C0C0C0` circular background with `#888888` outline heart.
     - **Hover** (`226:1047`): `#505050` circular background with `#888888` outline heart.
     - **Active** (`226:1050`): `#F2F862` (`--color-primary`) circular background with `#3F32D3` (`--color-secondary`) outline heart.

3. **Taller Favorites Cards & Tickets Cards (`styles.css`)**
   - Increased `.fav-card-horizontal` and `.ticket-card-horizontal` height to `min-height: 200px` (`16px` padding, `18px` gap) and resized `.fav-card-thumb` and `.ticket-card-thumb` from `124×110` to `168×168` (`144×152` on `<= 480px` mobile with `min-height: 180px`) on the **My Favorites** and **My Tickets and Events** views to improve poster text legibility.
   - Adjusted `.fav-card-info` (`padding-right: 36px;`) and card typography sizes so details read cleanly without overlapping the top-right `32×32` favorite button.

4. **Version Bump & Archive**
   - Updated page `<title>` tags in `index.html` and `login.html` to `(Version 1.4.1)`.
   - Archived release bundle at `versions/v1.4.1/sonar-bsb-events-v1.4.1.zip`.
