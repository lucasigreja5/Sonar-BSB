# Sonar BSB Events App — Version 1.4.4 Handoff

**Version:** 1.4.4  
**Base Version:** 1.4.3  
**Release Date:** 2026-11-13  

---

## Summary of Changes in Version 1.4.4

1. **User Profile Popup — Separate Username & Full Name Fields + Username Login (`index.html`, `login.html`, `app.js`, `styles.css`)**
   - Extended `state.userProfile` in `app.js` with `username: "Johndoe"` alongside `name: "John Doe"` (defaults: Full Name `John Doe`, Username `Johndoe`).
   - Updated `#profileModal` in `index.html`:
     - In View Mode (`#profileViewMode`), displays Full Name (`.profile-user-name`) and `@Johndoe` Username (`.profile-user-username` with `#profileViewUsername`) styled in `styles.css`.
     - In Edit Mode (`#profileEditMode`), provides separate **Username** (`#editProfileUsernameInput`, default `Johndoe`) and **Full Name** (`#editProfileNameInput`, default `John Doe`) inputs.
   - Updated `handleWelcomeLogin(event)` (`app.js`), `handleLoginSubmit(e)` (`login.html`), and `#loginUsername` default `value="Johndoe"` so the login flow authenticates with `state.userProfile.username` without overwriting `state.userProfile.name`.
   - Added `syncProfileUI()` (`app.js`) called in `initApp()`, `openProfileModal()`, `saveProfileChanges()`, and `handleWelcomeLogin()` to keep view/edit fields and login username synchronized.

2. **System Popups (`.toast`) — Remove Yellow Outline (`styles.css`)**
   - Changed `.toast` border from `border: 1.5px solid var(--color-primary);` to `border: none;`.

3. **System Popups (`showToast`) — Shorter Duration (1.7s) & Outside-Click Dismiss (`app.js`)**
   - Reduced the auto-dismiss timer by `1.5s` (`3200ms` -> `1700ms`).
   - Added a deferred document capture click listener (`setTimeout(..., 0)`) in `showToast(message)` so clicking anywhere outside the `.toast` dismisses the popup without being triggered by the originating click event, cleaning up both timers and listener inside `dismissToast()`.

4. **Version Bump & Archive**
   - Updated page `<title>` tags in `index.html` and `login.html` to `(Version 1.4.4)`.
   - Archived release bundle at `versions/v1.4.4/sonar-bsb-events-v1.4.4.zip`.
