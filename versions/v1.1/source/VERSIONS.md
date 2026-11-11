# Sonar BSB Events App — Version Registry & Changelog

This directory contains versioned snapshots of the Sonar BSB Events web application, allowing easy switching, comparison, and rollback.

---

## 🏷️ Version History

### Version 1.1 (Current Production Release — `v1.1`)
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
