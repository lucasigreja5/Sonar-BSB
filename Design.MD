# Sonar BSB Events App — Design System Specification (`Design.MD`)

> **Source of Truth Mapping**
> - **Library File (Styles & Components)**: [Styles-and-Components](https://www.figma.com/design/z52M2Cn7oC78mUUtVEb1sZ/Styles-and-Components?node-id=0-1)
> - **Target Application File**: [Sonar-BSB-EventsApp-v1 (`SONAR BSB - APP V1.0`)](https://www.figma.com/design/i3bqFIafJrUlUqn2NMUwIl/Sonar-BSB-EventsApp-v1?node-id=365-525)
>
> This document inventories **only** the styles and components from `Styles-and-Components` that are actively used in the `SONAR BSB - APP V1.0` page (`365:525`), along with their exact Figma tokens, dimensions, layout rules, and usage counts.

---

## 1. Application Scope (`SONAR BSB - APP V1.0`)

The `SONAR BSB - APP V1.0` page (`402×874` mobile frame baseline) is organized into 7 primary screens/flows:
1. `1- WelcomeLogin` (`374:537`)
2. `2- HomepageFlow` (`815:2865`)
3. `3- SearchFlow` (`766:8808`)
4. `4- EventDetailsFlow` (`469:1936`)
5. `5- CheckoutFlow` (`431:958`)
6. `6- Favorites` (`393:815`)
7. `7- ProfileFlow` (`815:2866`)

---

## 2. Color Styles (Used Subset)

Out of the 21 `BSBTech-*` paint styles defined in `Styles-and-Components`, **9** are actively applied in `SONAR BSB - APP V1.0`:

| Figma Style Name | Hex | Role & Usage |
| :--- | :--- | :--- |
| `BSBTech-Primary-Color/500` | `#F2F862` | Brand neon yellow — active dock icon glyph, cathedral logo highlight, Houdini `"Found"` accent, accent CTA fill |
| `BSBTech-Secondary-Color/500` | `#3F32D3` | Brand royal blue — top navigation header, primary CTA buttons, popup buttons, active dock circle, splash gradient base |
| `BSBTech-Accent-Color/500` | `#96262F` | Accent crimson — destructive/accent large CTA variant |
| `BSBTech-Greys/900` | `#1D1D1D` | Charcoal dark — primary headings, strong text, dark icons |
| `BSBTech-Greys/700` | `#363636` | Dark grey — body copy, secondary headings, form labels |
| `BSBTech-Greys/500` | `#505050` | Medium grey — supporting metadata, addresses, secondary text |
| `BSBTech-Greys/300` | `#888888` | Muted grey — placeholders, disabled form fields, payment row borders |
| `BSBTech-Greys/100` | `#C0C0C0` | Light grey — dividers, subtle borders, inactive states |
| `BSBTech-Greys/Interface` | `#F2F2F2` | App canvas / interface background |

> **Note on Excluded Styles**: The lighter/darker tint steps (`100`, `300`, `700`, `900`) of `BSBTech-Primary-Color`, `BSBTech-Secondary-Color`, and `BSBTech-Accent-Color` in `Styles-and-Components` are **not** used in `SONAR BSB - APP V1.0`.

---

## 3. Typography Scale

`Styles-and-Components` defines no standalone Figma Text Styles; typography is applied directly via component text layers and screen text nodes using **Helvetica Neue** and **Roboto**:

| Role | Font Family & Weight | Size | Line Height | Letter Spacing | Example / Context |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display (Heavy)** | Helvetica Neue Black | `86.4px` | `79.2px` | `0%` | `"Found"` in `HoudiniText` |
| **Hero Display (Light)** | Helvetica Neue Regular | `54px` | `79.2px` | `0%` | `"Frequency"` in `HoudiniText` |
| **Screen Title** | Helvetica Neue Bold | `28px` | `100.09%` | `-3%` | `"What’s on Today"` |
| **Price / Large CTA** | Helvetica Neue Medium / Regular | `24px` | `100.09%` / Auto | `0%` | `"$ 60.00"`, Large button label (`"Login"`) |
| **Section / Modal Header** | Helvetica Neue Bold | `20px` | `100.09%` | `0%` | `"Event Details"` |
| **Summary Total** | Roboto Bold | `20px` | `150%` | `0%` | `"Total Price"` |
| **Currency / Value** | Roboto Regular | `20px` | `150%` | `0%` | `"$"` |
| **Card Title / Tab Active** | Helvetica Neue Bold | `18px` | `100.09%` | `-3%` | `EventCardNEW` title, `"Today"` tab |
| **Tab Inactive** | Roboto SemiBold | `18px` | `117.29%` | `0%` | `"This Month"` tab |
| **Medium CTA / Popup** | Helvetica Neue Regular | `18px` | Auto | `0%` | `"Learn More"`, `Button-Popup` |
| **Compact Card Title** | Helvetica Neue Bold | `16px` | `150%` | `0%` | `FavoritesCard`, `MyEventsCards` |
| **Form Input / Line Item** | Roboto Regular / Light | `16px` | Auto / `150%` | `0%` | `"Username"`, `"Regular Tickets x "` |
| **Date Badge (Day / Month)** | Roboto ExtraLight / SemiBold | `16px` | Auto | `0%` | `"15"` / `"AUG"` |
| **Small CTA** | Helvetica Neue Regular | `16px` | Auto | `0%` | `"Save"` |
| **Payment Row Label** | Helvetica Neue Bold | `14px` | `100.09%` | `0%` | `"Master Card"`, `"**** **** **** 1234"` |
| **Event Meta / Address** | Helvetica Neue Regular | `14px` | `18px` | `0%` | `"22:00h Galeria dos Estados..."` |
| **Order Meta** | Roboto Light | `14px` | `150%` | `0%` | `"Transaction ID"` |
| **Compact Meta / Caption** | Helvetica Neue Regular | `12px` | `18px` | `0%` | `FavoritesCard` / `MyEventsCards` address |
| **Floating Field Label** | Roboto Regular | `12px` | Auto | `0%` | `FormField` `SmallLabel` |

---

## 4. Elevation & Effects

Effects observed across used components and screens in `SONAR BSB - APP V1.0`:

| Token / Usage | Type | Radius | Offset | Spread | Color |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Standard Card / Button Shadow** | `DROP_SHADOW` | `4px` | `(0, 4)` | `0` | `rgba(0, 0, 0, 0.25)` |
| **Bottom Navigation Dock Shadow** | `DROP_SHADOW` | `8px` | `(1, 0)` | `0` | `rgba(0, 0, 0, 0.15)` |
| **Subtle Inset / Micro Shadow** | `INNER_SHADOW` | `3px` | `(1, 1)` | `0` | `rgba(0, 0, 0, 0.25)` |
| **Ambient Splash Blur** | `LAYER_BLUR` | `32.58px` | — | — | — |
| **Modal Backdrop Blur** | `BACKGROUND_BLUR` | `3.34px` | — | — | — |

---

## 5. Components & Variants (Used Subset)

Only the following components and specific variants from `Styles-and-Components` are instantiated in `SONAR BSB - APP V1.0`:

### 5.1 Brand & Welcome
| Component / Variant | Dimensions | Key Specs | Instances |
| :--- | :--- | :--- | :--- |
| `Logo` | `106×43` | Horizontal auto-layout, `gap: 3.91px`, `SONARBSB` wordmark + emblem | `40` |
| `HoudiniText / State=Frame1` | `328×132` | `"Frequency"` (54px Regular) + `"Found"` (86.4px Black) | `1` |
| `Gradient Animation / Position=Start` | `1103×1515` | Fill `#3F32D3` animated splash backdrop | `1` |

### 5.2 Navigation & Chrome
| Component / Variant | Dimensions | Key Specs | Instances |
| :--- | :--- | :--- | :--- |
| `Nav - Top` | `402×120` | Fill `#3F32D3`, `DROP_SHADOW(0, 4, r:4)` | `39` |
| `Back Button` | `32×32` | Vector back arrow icon | `38` |
| `Nav - Lower` | `402×98` | Horizontal auto-layout, Fill `#FFFFFF`, padding `16/48/24/48`, `gap: 86px`, `DROP_SHADOW(1, 0, r:8)` | `19` |
| `NavBottom / Position=IconTickets` | `1070×90` | Active Tickets dock state, `DROP_SHADOW(1, 0, r:8)` | `9` |
| `NavBottom / Position=IconSearch` | `1070×90` | Active Search dock state, `DROP_SHADOW(1, 0, r:8)` | `4` |
| `NavBottom / Position=IconHome` | `1070×90` | Active Home dock state, `DROP_SHADOW(1, 0, r:8)` | `3` |
| `NavBottom / Position=IconFavorites` | `1070×90` | Active Favorites dock state, `DROP_SHADOW(1, 0, r:8)` | `1` |
| `Page Nav / Style=Box` | `369×32` | Segmented box tabs (`Today`, `This Month`, `Upcoming`) | `3` |

### 5.3 Buttons
| Component / Variant | Dimensions | Key Specs | Instances |
| :--- | :--- | :--- | :--- |
| `Button Main / Size=Medium, Color=Primary, State=Default, Outline=False` | `202×46` | Radius `12px`, Fill `#3F32D3`, padding `12/24`, `gap: 8px`, `DROP_SHADOW(0, 4, r:4)`, 18px label | `33` |
| `Button Main / Size=Large, Color=Primary, State=Default, Outline=False` | `258×60` | Radius `12px`, Fill `#3F32D3`, padding `18/32`, `gap: 8px`, `DROP_SHADOW(0, 4, r:4)`, 24px label | `29` |
| `Button Main / Size=Small, Color=Primary, State=Default, Outline=False` | `173×40` | Radius `12px`, Fill `#3F32D3`, `gap: 8px`, `DROP_SHADOW(0, 4, r:4)`, 16px label | `4` |
| `Button Main / Size=Large, Color=Accent, State=Default, Outline=False` | `258×60` | Radius `12px`, Fill `#F2F862`, padding `18/32`, `gap: 8px`, `DROP_SHADOW(0, 4, r:4)`, 24px label | `1` |
| `Button-Popup / State=Default` | `120×37` | Radius `16.67px`, Fill `#3F32D3`, padding `8/16`, `gap: 8px`, 18px label | `11` |
| `AddButton` | `51×51` | Circular/square add action button | `1` |

### 5.4 Cards
| Component / Variant | Dimensions | Key Specs | Instances |
| :--- | :--- | :--- | :--- |
| `EventCardNEW / Size=Reduced` | `352×268` | Vertical auto-layout, Radius `30px`, Fill `#FFFFFF`, padding `16px`, `gap: 16px`, `DROP_SHADOW(0, 4, r:4)` | `12` |
| `EventCardNEW / Size=Default` | `352×402` | Vertical auto-layout, Radius `30px`, Fill `#FFFFFF`, padding `16px`, `gap: 16px`, `DROP_SHADOW(0, 4, r:4)` | `9` |
| `FavoritesCard / State=Default` | `354×96` | Horizontal auto-layout, Radius `18px`, Fill `#FFFFFF`, padding `12/12/12/0`, `gap: 12px`, `DROP_SHADOW(0, 4, r:4)` | `9` |
| `MyEventsCards / State=Default` | `354×142` | Horizontal auto-layout, Radius `18px`, Fill `#FFFFFF`, padding `12/12/12/0`, `gap: 12px`, `DROP_SHADOW(0, 4, r:4)` | `3` |

### 5.5 Form Controls & Payment
| Component / Variant | Dimensions | Key Specs | Instances |
| :--- | :--- | :--- | :--- |
| `PaymentMode / Selected=False` | `353×48` | Grid layout, Radius `12px`, padding `8/16`, `gap: 26px` | `27` |
| `PaymentModeBG / State=Default` | `353×50` | Radius `12px`, Fill `#FFFFFF`, Stroke `#888888`, `DROP_SHADOW(0, 4, r:4)` | `27` |
| `Checkbox / Boolean=False` | `24×24` | Unchecked square checkbox | `27` |
| `FormField / State=Default` | `275×44` | Default input field (`BottomLabel` 16px, `SmallLabel` 12px) | `12` |
| `FormField / State=Disabled` | `275×44` | Radius `8px`, Fill `#888888` | `1` |
| `FormFieldFilled / State=Default` | `275×44` | Radius `8px`, Fill `#FFFFFF` | `2` |
| `Boolean / State=False` | `36×21` | Toggle switch (off state) | `3` |
| `MastercardLogo` | `32×32` | Payment brand icon | `10` |
| `PaypalLogo` | `32×32` | Payment brand icon | `9` |
| `ApplePayLogo` | `32×32` | Payment brand icon | `9` |

### 5.6 Icons
| Component / Variant | Dimensions | Instances |
| :--- | :--- | :--- |
| `NEWFavoriteButton / State=Default` | `32×32` | `21` |
| `NEWFavoriteButton / State=Active` | `32×32` | `9` |
| `SearchIcon` | `32×32` | `19` |
| `FavoritesIcon` | `25×23` | `17` |
| `HomeIcon` | `32×32` | `17` |
| `TicketIconNEW` | `33×33` | `17` |
| `AddIcon` | `32×32` | `11` |
| `CloseIcon` | `32×32` | `3` |
| `SuccessIcon` | `32×32` | `1` |

---

## 6. Unused Library Items (Excluded by Scope)

The following items exist in `Styles-and-Components` (`z52M2Cn7oC78mUUtVEb1sZ`) but are **not** used in `SONAR BSB - APP V1.0` (`365:525`) and are therefore omitted from this specification:
- **Color Styles**: `100`, `300`, `700`, `900` shades of `BSBTech-Primary-Color`, `BSBTech-Secondary-Color`, and `BSBTech-Accent-Color`.
- **Legacy / Unused Components**: `ReturnButton`, `Event Card` (legacy), `Early Bird Ticket`, `Pricing Ticket`, `Page Nav (Style=Line)`, `ticket-solid 1`, `user-regular 1`, `Input Field`, `Input Field v2`, `Field Default`, `Field Error`, `Field Text`, `Card - Lower`, `Video Icon - *`, `Video Hover Playback`, `Video Card`, `Artist Picture`, `Headshot`, `Cart Button`, `Search Bar`, `NavAlt1`, `NavAlt2`, `CartIcon`, `Pop Up`, `Email Signup`, `Phone Signup`, `Slot`, `Cursor`, `Dot`, `EventCardSearch`, and emoji components (`Annoyed 2`, `Mega Smile 2`, `Smile 2`, `Shocked 2`).
- **Unused Variants**: `Hover`, `Pressed`, `Disabled`, `Outline=True`, and `Color=Secondary` variants of `Button Main`; `Selected=True` of `PaymentMode`; `Boolean=True` of `Checkbox`; `State=True` of `Boolean`; `State=Hover`/`Active` of `FormField`/`FormFieldFilled`; `State=Hover` of `FavoritesCard`/`MyEventsCards`/`NEWFavoriteButton`; `Frame2`/`Frame3` of `HoudiniText`; `Middle`/`Ending` of `Gradient Animation`.
