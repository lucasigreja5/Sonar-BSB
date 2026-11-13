# Sonar BSB Events App — Version Registry & Changelog

This directory contains versioned snapshots of the Sonar BSB Events web application, allowing easy switching, comparison, and rollback.

---

## 🏷️ Version History

### Version 1.3.2 (Current Production Release — `v1.3.2`)
- **Date**: 2026-11-13
- **Snapshot Directory**: `versions/v1.3.2/`
- **Archive Zip**: `versions/v1.3.2/sonar-bsb-events-v1.3.2.zip`
- **Handoff Documentation**: `HANDOFF_V1.3.2.md`
- **Changes**:
  - Generated the 8 remaining photorealistic `1024×1024` cover posters using the `gemini-3.1-flash-image` image generator model in the exact Sonar BSB double-outline neon style with centered vertical typography: `event-conic404.png`, `event-synthlab.png`, `event-planalto-solar.png`, `event-anel-kinetic.png`, `event-botanico.png`, `event-sofsul.png`, `event-prainha.png`, and `event-kmzero.png`.
  - Updated page `<title>` tags in `index.html` and `login.html` to `Version 1.3.2`, completing the full 27-event photorealistic cover gallery.

### Version 1.3.1 (Previous Production Release — `v1.3.1`)
- **Date**: 2026-11-12
- **Snapshot Directory**: `versions/v1.3.1/`
- **Archive Zip**: `versions/v1.3.1/sonar-bsb-events-v1.3.1.zip`
- **Handoff Documentation**: `HANDOFF_V1.3.1.md`
- **Changes**:
  - **Weekend-Prioritized Dynamic Dates (`app.js`)**: Scheduled all `This Month` and `Upcoming` (`+1/+2` months) dynamic event dates strictly onto `Thursday–Sunday` slots (`PREFERRED_EVENT_WEEKDAYS` + balanced `WEEKEND_DAY_ROTATIONS`), avoiding Mon–Wed even on month-end dates, year rollovers, and Feb 28/29.
  - **System Calendar Date Input on Search (`index.html`, `styles.css`, `app.js`)**: Replaced the free-text `#searchFormDate` field with `<input type="date">` opening the native OS system calendar picker (`showPicker()` on click + native indicator hotspot), styled with an inline calendar SVG icon, clear (`×`) button, exact `YYYY-MM-DD` (`dateISO`) matching, and mobile blur guard.
  - **Conic: Frequency 404 Placeholder Artwork (`assets/event-conic404.png`)**: Replaced the bottom-text AI render with a centered `1024×1024` wireframe cover placeholder pending `v1.3.2` (`gemini-3.1-flash-image` quota reset, alongside the 7 temporary neon graphic covers from `v1.3`).
  - Updated `<title>` badges across `index.html` and `login.html` to `Version 1.3.1`.

### Version 1.3 (Previous Production Release — `v1.3`)
- **Date**: 2026-11-12
- **Snapshot Directory**: `versions/v1.3/`
- **Archive Zip**: `versions/v1.3/sonar-bsb-events-v1.3.zip`
- **Handoff Documentation**: `HANDOFF_V1.3.md`
- **Changes**:
  - Expanded catalog from 9 to **27 mock events** (9 `Today`, 9 `This Month`, 9 `Upcoming`), adding 18 Brasília electronic events with full venues, entry prices, descriptions, 2-artist lineups, genres, and `1024×1024` cover assets (11 AI-generated covers + 7 custom neon-poster graphics for `event-synthlab.png` and the 6 new Upcoming covers due to `gemini-3.1-flash-image` daily quota reset).
  - Replaced hardcoded August 2026 event dates with `buildEventsData(referenceDate = new Date())`, anchoring Today to the user's open date, This Month strictly within the current month, and Upcoming strictly across the next 2 calendar months (`month + 1` and `month + 2`), plus dynamic Search placeholder, Search `dateShort`/`dateMonth` matching, Checkout `dd/mm/yy`, and default ticket timestamps.
  - Updated page `<title>` badges to `Version 1.3` and `#eventCountBadge` initial fallback to `9 events`.

### Version 1.2.4 (Previous Production Release — `v1.2.4`)
- **Release Date**: November 2026
- **Git Tag**: `v1.2.4`
- **Original User Prompt**:
  > *"Version 1.2.4*  
  > *Please make the following adjustments:*  
  > *- On the event cards, please change the add to cart button icon to a "+" icon, keeping the current color and style"*
- **Key Features & Changes**:
  - **Event Card Add-to-Cart Icon Updated to `+`**: Replaced the shopping-bag `<svg>` inside `.btn-purchase-direct` (`renderEvents()` in `app.js`) with a crisp stroke-based `+` `<svg>` (`width="22" height="22" viewBox="0 0 24 24"`, `stroke="currentColor"`, `stroke-width="2.5"`, `stroke-linecap="round"`, `stroke-linejoin="round"`).
  - **Preserved Button Color & Style**: `.btn-purchase-direct` retains its exact neon yellow fill (`var(--color-primary)` / `#F2F862`), dark navy icon color (`#130f40`), `48px × 46px` sizing, `12px` border radius, `var(--shadow-btn)` elevation, and hover states without modification.
  - **Master Handoff Guide**: Full specifications documented in `HANDOFF_V1.2.4.md`.
  - **Snapshot Directory**: `versions/v1.2.4/source/`
  - **ZIP Package**: `versions/v1.2.4/sonar-bsb-events-v1.2.4.zip`

---

### Version 1.2.3 (Previous Production Release — `v1.2.3`)
- **Release Date**: November 2026
- **Git Tag**: `v1.2.3`
- **Original User Prompt**:
  > *"Version 1.2.3*  
  > *Please make the following adjustments:*  
  > *- On the login screen, on the houdini text animation, reduce the spacing between "frequency" and "found"*  
  > *- On the login screen, move the Sonar BSB logo to a higher position on the screen, increasing the distance between the logo and the houdini text*  
  > *- On the app startup, have the shopping cart be empty, and generate a "empty cart" page for this situation, following the design system for the project and the other pages*  
  > *From this release onwards, theres no need to create the version zip file on the desktop and download folders"*
- **Key Features & Changes**:
  - **Tight Houdini Text Line Spacing**: Reduced line wrapper heights to 1.08x font size and set `.houdini-bottom-row` `margin-top: -0.06x`, tightening the vertical gap between "FREQUENCY" and "FOUND" to ~1-2px for a unified, impactful headline lockup.
  - **Elevated Sonar BSB Logo with Expanded Margin**: Moved `.welcome-logo-box` higher with `margin-top: clamp(-28px, -4vh, -16px);` and expanded bottom margin to `clamp(48px, 7vh, 64px);` (expanding distance to Houdini text from 24px to ~56px).
  - **Empty Cart on App Startup & Dedicated Empty Cart Page**: Cart initializes with 0 tickets and hidden badge; clicking cart icon loads a custom `#emptyCartCard` featuring empty cart icon halo, helpful copy, primary "Explore Events &rarr;" button, and trending event suggestions.
  - **Packaging Streamline**: Distribution ZIP archive stored exclusively in-repo (`versions/v1.2.3/sonar-bsb-events-v1.2.3.zip`), eliminating external Desktop/Downloads copies per user direction.
  - **Master Handoff Guide**: Full specifications documented in `HANDOFF_V1.2.3.md`.
  - **Snapshot Directory**: `versions/v1.2.3/source/`
  - **ZIP Package**: `versions/v1.2.3/sonar-bsb-events-v1.2.3.zip`

---

### Version 1.2.2 (Previous Production Release — `v1.2.2`)
- **Release Date**: November 2026
- **Git Tag**: `v1.2.2`
- **Original User Prompt**:
  > *"Version 1.2.2*  
  > *Please make the following adjustments:*  
  > *- On the top bar, increase the shopping cart white icon size, while keeping the outside yellow ring of the selected icon the same size"*
- **Key Features & Changes**:
  - **Increased White Cart Icon Sizing**: Enlarged `.header-cart-icon` from 22px to 28px (`width: 28px; height: 28px;`), increasing the visual area by +61.9% and matching the prominence of the 44px profile avatar.
  - **Identical 44px Outside Yellow Ring on Selected State**: Button dimensions remain strictly 44px by 44px (`box-sizing: border-box`). When selected (`.is-active`, `.is-selected`), the 2px yellow border ring retains an outer diameter of exactly 44px with 6px of breathing room around the centered 28px icon.
  - **Master Handoff Guide**: Full specifications documented in `HANDOFF_V1.2.2.md`.
  - **Snapshot Directory**: `versions/v1.2.2/source/`
  - **ZIP Package**: `versions/v1.2.2/sonar-bsb-events-v1.2.2.zip`

---

### Version 1.2.1 (Previous Production Release — `v1.2.1`)
- **Release Date**: November 2026
- **Git Tag**: `v1.2.1`
- **Original User Prompt**:
  > *"Version 1.2.1*  
  > *Please make the following adjustments:*  
  > *- For the shopping cart button, when the cart is not selected, remove the yellow circle arround the icon, and change the icon color to white. When the cart is selected, keep its style as it is right now*  
  > *- On the login screen, for the houdini text, increase the size of the "found" text, so as it fill the same width as the textbox below it, and have it aligned to the center. Watch for the clipping mask on the frequency word, the Y is being clipped out of the frame. And align the blinking dot to work as a period for the "found""*
- **Key Features & Changes**:
  - **Refined Shopping Cart Button States**: When unselected, the yellow circle border is removed (`border: 2px solid transparent; background: transparent;`) and the icon renders in clean white (`#ffffff`). When selected on checkout, the royal blue fill, neon yellow icon, and glowing yellow border ring are retained.
  - **Larger "FOUND" Text Matching Textbox Width**: Sized "FOUND" independently to `clamp(72px, calc(var(--houdini-target-width) * 0.248), 88px)` so the word itself fills the full width of the login inputs beneath it and centers seamlessly.
  - **Unclipped 'Y' in "FREQUENCY"**: Expanded horizontal clipping boundaries on `.houdini-line-wrapper.top-line` by 20px on each side (`width: calc(100% + 40px); margin: 0 -20px; padding: 0 20px;`) and calibrated font size (`clamp(38px, calc(var(--houdini-target-width) * 0.15), 53px)`), permanently eliminating letter clipping on the 'Y'.
  - **Typographic Baseline Period Dot**: Wrapped "FOUND" and the blinking radar dot inside `.found-text-group` with `align-items: baseline;`, positioning the pulsing neon dot directly at the typographic baseline as punctuation following the letter 'D'.
  - **Master Handoff Guide**: Full specifications documented in `HANDOFF_V1.2.1.md`.
  - **Snapshot Directory**: `versions/v1.2.1/source/`
  - **ZIP Package**: `versions/v1.2.1/sonar-bsb-events-v1.2.1.zip`

---

### Version 1.2 (Previous Production Release — `v1.2`)
- **Release Date**: November 2026
- **Git Tag**: `v1.2`
- **Original User Prompt**:
  > *"Version v1.2*  
  > *Please make the following adjustments:*  
  > *- On the login screen, on the mobile screen size, make the houdini text fill the same width as the login text boxes below, adjust the houdini text height if necessary*  
  > *- On the home page, after the login, turn off the "Welcome to SonarBSB" pop up*  
  > *- On the top bar, add a shopping cart button to the left of the user profile image. Use a shopping cart icon with the same style and colors as the bottom nav icons, and with the same size as the profile image"*
- **Key Features & Changes**:
  - **Full-Width Proportional Houdini Text on Mobile**: Bound the Houdini container to `min(calc(100vw - 48px), 354px)`, dynamically filling the exact inner width of the login text inputs below. Scaled font sizes (`clamp(48px, ... * 0.171, 60.5px)` for FREQUENCY and `clamp(66px, ... * 0.231, 82.5px)` for FOUND + dot) with calibrated line wrapper heights (`1.22x` and `1.18x`) and `white-space: nowrap;` preventing character clipping.
  - **Deactivated Welcome Pop-Up**: Turned off the `showToast` notification upon logging in from the welcome screen, allowing an immediate, quiet entry into the home event feed.
  - **Top Bar Shopping Cart Button**: Integrated a 44px circular shopping cart button to the left of `#profileAvatarBtn` inside `.header-actions`. Features the exact styling and color language of the bottom nav icons (white surface with `#1D1D1D` vector cart icon, transitioning on hover/checkout to royal blue with neon yellow icon and glow), accompanied by a live ticket counter badge.
  - **Master Handoff Guide**: Full specifications documented in `HANDOFF_V1.2.md`.
  - **Snapshot Directory**: `versions/v1.2/source/`
  - **ZIP Package**: `versions/v1.2/sonar-bsb-events-v1.2.zip`

---

### Version 1.1 (Previous Production Release — `v1.1`)
- **Release Date**: November 2026
- **Git Tag**: `v1.1`
- **Original User Prompt**:
  > *"Version 1.1*  
  > *Please Make the following adjustments:*  
  > *- On the login page, in the mobile screen size, the houdini text is distorted and aligned to the left of the screen. Adjust its porportions to the correct ratio, and make it aligned to the center*  
  > *- On the search screen, in the mobile screen size, only open the touch screen keyboard if one of the text boxes is interacted with*  
  > *- On the event cards, make the text for the event name, time and location larger, while still mantaining the current alignment inside the cards and in relation to the other cards. You can make the event title and event location span more than one text line. Make adjustments to the cards sizes if necessary"*
- **Key Features & Changes**:
  - **Centered & Proportional Houdini Text on Mobile**: Mathematically bound the 5:8 ratio (54px / 86.4px = 0.625) using CSS custom properties with dynamic `clamp(42px, 14vw, 86.4px)` scaling and proportional wrapper heights. Fully centered horizontally across all mobile screens with zero clipping or text squishing.
  - **Touchscreen Keyboard Only on Direct Interaction**: Suppressed auto-focus on `#searchFormName` for touch and mobile devices in `switchView("search")`. The virtual keyboard now opens only when the user explicitly taps or interacts with one of the search inputs.
  - **Enlarged Event Card Typography & Uniform Alignment**: Increased card title to 19px (multi-line up to 2 lines), event time to 14px bold, venue location to 13.5px (multi-line up to 2 lines), and ticket price to 24px bold. Card height scaled to 450px with `margin-top: auto` on `.card-actions` ensuring all "Learn More" and direct purchase buttons remain locked to the exact same baseline across all cards.
  - **Master Handoff Guide**: Full specifications documented in `HANDOFF_V1.1.md`.
  - **Snapshot Directory**: `versions/v1.1/source/`
  - **ZIP Package**: `versions/v1.1/sonar-bsb-events-v1.1.zip`

---

### Version 1.0 (Previous Production Release — `v1.0`)
- **Release Date**: November 2026
- **Git Tag**: `v1.0`
- **Original User Prompt**:
  > *"I think version 0.6.2 is ready to be depolyed. Please check if there's any issues or bugs and if its all clear, save it as version 1.0, and include a handoff file for this conversation named after the version 1.0, and include everything into a zip file"*
- **Key Features & Changes**:
  - **Production Master Release**: Full audit completed covering all 18 vector & raster assets, 84 DOM IDs, 23 event handlers, and responsive CSS across mobile, tablet, and widescreen.
  - **Login First Launch & Redirect Token**: App consistently initializes on `1- WelcomeLogin`; submitting credentials via standalone `login.html` auto-redirects directly into `index.html`'s home feed without loop issues.
  - **1- WelcomeLogin Aesthetic**: Houdini text reveal with 0.5s pause, solid neon yellow glowing dot core (`#F2F862`) without ripple waves, completely unclipped in `.houdini-bottom-row`.
  - **90% Grey Side Bars (#1D1D1D)**: Soft modernist cinema pillarbox framing on displays wider than 1280px.
  - **Bottom Dock Stroke Centering**: 1pt center stroke on Favorites and 0.75pt center stroke on Tickets icons, matching fill color across both active and resting states.
  - **Master Handoff Guide**: Full specifications documented in `HANDOFF_V1.0.md`.
  - **Snapshot Directory**: `versions/v1.0/source/`
  - **ZIP Package**: `versions/v1.0/sonar-bsb-events-v1.0.zip`

---

### Version 0.6.2 (Previous Working Version — `v0.6.2`)
- **Release Date**: November 2026
- **Git Tag**: `v0.6.2`
- **Original User Prompt**:
  > *"Version 0.6.2 Please make the following adjustments - When opening the app, start with the login screen as the first screen - On the login screen, on the blinking dot effect, remove the ripple waves effects - Change the color of the black bars on the side to a 90% grey (#1D1D1D) - On the bottom nav bar, on the favorites icon, add a 1pt stroke center position, with the same color as the fill - On the bottom nav bar, on the tickets icon, add a 0.75pt stroke center position, with the same color as the fill"*
- **Key Features & Changes**:
  - **Login First on Launch**: Application consistently initializes directly on the `1- WelcomeLogin` view upon fresh launch or reload, offering Login or Guest explore flows.
  - **Solid Blinking Dot**: Removed the expanding acoustic ripple rings (`.dot-ring`) from the blinking dot next to "Found", maintaining the glowing neon yellow heartbeat core.
  - **90% Grey Side Bars (#1D1D1D)**: Replaced pitch-black bars on wide displays with refined 90% charcoal grey (`#1D1D1D`), matching the design system's primary dark token.
  - **Bottom Nav Icon Center Strokes**: Added 1pt center stroke to the Favorites icon and 0.75pt center stroke to the Tickets icon, perfectly matching fill color across both unselected (`#1D1D1D`) and selected (`#F2F862`) states.
  - **Snapshot Directory**: `versions/v0.6.2/source/`
  - **ZIP Package**: `versions/v0.6.2/sonar-bsb-events-v0.6.2.zip`

---

### Version 0.6.1 (Previous Working Version — `v0.6.1`)
- **Release Date**: November 2026
- **Git Tag**: `v0.6.1`
- **Original User Prompt**:
  > *"Version 0.6.1 Make the following adjustments: - On the login screen, the blinking dot effect is getting cropped inside a box from the figma file houdini effect, please remove this crop from the box - On the login screen, add a .5s delay on the start of the houdini text for the home screen - On the login screen, remove the Live frequency Brasilia DF element above the houdini text - On the login screen, remove the blinking yellow dots from the background - On the home screen, on the top nav bar, remove the button taking to the login screen, have the option to return to that screen be only the sign out button - On the home screen of the main page, if the screen size exceeds the app total size, use black bars on the sides of the screen, as it was when it had the dual preview switcher"*
- **Key Features & Changes**:
  - **Uncropped Radar Ping Dot**: Separated the blinking dot container from the text clip box with a visible `.houdini-bottom-row`, allowing radar ripples (`scale(2.8)`) and neon halos to expand unclipped into open space.
  - **0.5s Initial Houdini Delay**: Introduced a 0.5s pause before "Frequency" (0.5s delay) and "Found" (0.75s delay) emerge, creating an intentional, cinematic entrance.
  - **Cleaner Login Artboard**: Removed the status badge and ambient floating yellow dots from the login mesh background.
  - **Header Nav Cleaned**: Removed the header login button; returning to login is now strictly through the profile "Sign Out" flow.
  - **Cinema Black Side Bars**: Added `background-color: #000000` to body and deep framing shadows to the 1280px `.app-container`, displaying sleek black bars on wide viewports as during the dual-view switcher era.
  - **Snapshot Directory**: `versions/v0.6.1/source/`
  - **ZIP Package**: `versions/v0.6.1/sonar-bsb-events-v0.6.1.zip`

---

### Version 0.6 (Previous Working Version — `v0.6`)
- **Release Date**: November 2026
- **Git Tag**: `v0.6`
- **Original User Prompt**:
  > *"Version 0.6 Please make the following adjustments, and start adding the list of version adjustments to the readme file, including the orginal prompt and your reasoning on how it was implemented - Create a login page from the frame "1- WelcomeLogin" on the figma file, with including the houdini text and blinking dot animations"*
- **Key Features & Changes**:
  - **1- WelcomeLogin Dedicated Login Page**: Faithful implementation of Figma frame `1- WelcomeLogin` (node `374:537`), active as both the integrated entry screen in `index.html` and as a standalone `login.html` page.
  - **Houdini Text Animation**: Signature upward escape/reveal animation for "Frequency" and "Found" in neon yellow `#F2F862` with cubic-bezier easing.
  - **Multi-Layer Blinking Dot Animations**:
    - Sonar radar ping dot next to "Found" with neon yellow core and acoustic ripple rings (`@keyframes sonarPing` and `@keyframes dotBlink`).
    - Live frequency radar status badge with pulsating green indicator (`LIVE FREQUENCY • BRASÍLIA DF`).
    - Form input focus blinking caret/dot indicators for active typing.
    - Ambient floating frequency nodes twinkling across the mesh gradient.
  - **Header Login Button**: Added a direct shortcut in the app header to quickly view or return to the login screen.
  - **Snapshot Directory**: `versions/v0.6/source/`
  - **ZIP Package**: `versions/v0.6/sonar-bsb-events-v0.6.zip`

---

### Version 0.5 (Previous Working Version — `v0.5`)
- **Release Date**: November 2026
- **Git Tag**: `v0.5`
- **Key Features & Changes**:
  - **Fixed Bottom Navigation Dock**: Fixed the broken CSS block and pointer-events layering so that all 4 navigation items (Home, Search, Favorites, Tickets) receive clicks reliably and update selected states with elevated blue circle indicator and neon yellow icon.
  - **Direct Navigation Binding**: Added explicit programmatic event listeners (`setupNavEventListeners`) to bottom navigation buttons in addition to inline handlers.
  - **Pure Responsive Web Layout**: Removed the dual-view preview banner switcher and mobile status bar, making the web layout natively fluid from mobile viewports up to large desktop screens (max-width: 1280px).
  - **1- WelcomeLogin & Houdini Text Animation**: Implemented Figma frame `1- WelcomeLogin` (node `374:537`) with dynamic vector mesh backdrop (`welcome-gradient.svg`), official logo, form inputs, and the signature **Houdini text reveal animation** (`HoudiniText` node `654:5110` revealing "Frequency" and "Found" in neon yellow `#F2F862`).
  - **Brasília DF Focus**: Removed the top location selector pill ("Brasília, DF • Plano Piloto") to keep the application exclusively dedicated to Brasília's electronic scene.
  - **Snapshot Directory**: `versions/v0.5/`
  - **ZIP Package**: `versions/v0.5/sonar-bsb-events-v0.5.zip`

---

### Version 0.4 (Previous Stable Snapshot — `v0.4`)
- **Release Date**: November 2026
- **Git Commit / Tag**: `e6b86e8` / `v0.4`
- **Key Features**:
  - Uniform event card dimensions & alignment across all categories (Today, This Month, Upcoming).
  - Flush "Learn More" bottom ticket purchase section without empty space.
  - Cart and checkout flow with home return button removed.
  - Global typography standardized strictly to Helvetica Neue.
  - Contained Dual-View Preview Switcher (Fluid Responsive Web vs 1:1 Mobile Canvas).
  - Location pill ("Brasília, DF • Plano Piloto") in subheader.
  - **Snapshot Directory**: `versions/v0.4/source/`
  - **ZIP Package**: `versions/v0.4/sonar-bsb-events-v0.4.zip`

---

## 🔄 How to Revert or Switch Between Versions

### Option 1: Using the Versioned Folders (No Git Required)
Each version has a complete standalone copy:
- **To run Version 0.5**: Open `index.html` at the project root.
- **To run Version 0.4**: Open `versions/v0.4/source/index.html`.

### Option 2: Using Git Tags
You can quickly check out any version using git commands in this directory:
```bash
# View all available version tags
git tag -l

# Switch to Version 0.4
git checkout v0.4

# Switch back to Version 0.5 (main branch)
git checkout main
```
