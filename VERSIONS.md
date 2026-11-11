# Sonar BSB Events App — Version Registry & Changelog

This directory contains versioned snapshots of the Sonar BSB Events web application, allowing easy switching, comparison, and rollback.

---

## 🏷️ Version History

### Version 0.5 (Current Working Version — `v0.5`)
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
