# TomeSphere — UI/UX Design System & Component Library

**Document Type:** UI/UX Design System Specification  
**Owner:** Design System Lead  
**Status:** Draft
**Last Reviewed:** 2026-10-24  
**Dependencies:** `app/globals.css`, `docs/02-ux-research/01-user-needs-information-architecture.md`  

---

## 1. Visual Foundations & Design Tokens

TomeSphere employs a cinematic dark-mode-first hybrid design system. All visual tokens are codified as CSS custom properties in `app/globals.css`.

### 1.1 Color Palette & Semantic Tokens

```css
:root {
  /* Surface & Background Tokens */
  --bg-primary: #030712;          /* Deep void background */
  --bg-surface: #0b101b;          /* Raised card & container surface */
  --bg-surface-elevated: #111827; /* Modals, dropdowns, hovered surfaces */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.16);

  /* Typography Colors */
  --text-primary: #f9fafb;        /* High-contrast headings & titles */
  --text-secondary: #94a3b8;      /* Body copy, labels, secondary metadata */
  --text-muted: #64748b;          /* Placeholders, disabled text */

  /* Brand Accents */
  --accent-violet: #818cf8;       /* Primary interactive accent */
  --accent-violet-glow: rgba(129, 140, 248, 0.25);
  --accent-teal: #2dd4bf;         /* Secondary accent for success / status */
  --accent-teal-glow: rgba(45, 212, 191, 0.22);
  --accent-cyan: #38bdf8;         /* Visual highlights & highlights */
  --accent-purple: #c084fc;       /* Tertiary highlights */

  /* Status Colors */
  --status-live: #10b981;         /* Emerald green for operational services */
  --status-progress: #f59e0b;     /* Amber for in-development items */
  --status-archived: #6b7280;     /* Slate for retired items */
}
```

### 1.2 Typography Hierarchy

- **Font Family**: Modern sans-serif stack (`Inter`, system-ui, -apple-system, sans-serif).
- **Type Scale**:
  - `Hero Title`: `clamp(2.25rem, 5vw, 3.75rem)` / Line height `1.1` / Weight `700`
  - `Page Title (H1)`: `2.25rem` (36px) / Line height `1.2` / Weight `700`
  - `Section Title (H2)`: `1.75rem` (28px) / Line height `1.25` / Weight `600`
  - `Card Title (H3)`: `1.25rem` (20px) / Line height `1.3` / Weight `600`
  - `Body Copy`: `1rem` (16px) / Line height `1.6` / Weight `400`
  - `Caption / Eyebrow`: `0.75rem` (12px) / Line height `1.4` / Weight `600` / Uppercase tracking `0.08em`

### 1.3 Radii & Elevation
- **Card Radius**: `16px` (`border-radius: 1rem`)
- **Button Radius**: `9999px` (Pill style) or `10px` for structured actions.
- **Glassmorphic Shadows**: `box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.36)`.

---

## 2. Core Component Specifications

### 2.1 Buttons (`.btn`)
- **Variants**:
  - `.btn-primary`: Violet gradient background, white text, subtle glow hover effect.
  - `.btn-secondary`: Dark surface background, subtle border, white text.
  - `.btn-outline`: Transparent background, 1px border, text matching accent.
  - `.btn-icon`: Circular 40x40px touch target for theme switch and navigation triggers.
- **States**:
  - *Hover*: Slight elevation (`translateY(-1px)`), glow intensifies.
  - *Active*: Depressed state (`translateY(0)`).
  - *Focus*: 2px solid violet outline with 2px offset.
  - *Disabled*: `opacity: 0.5; pointer-events: none;`.

### 2.2 Badges & Status Indicators (`.badge`)
- **Category Badge**: Pill badge with subtle border, uppercase label, font size `0.75rem`.
- **Status Dot**: 8px rounded dot accompanying status text:
  - Green pulse for `Live`.
  - Amber static for `In progress`.
  - Muted gray for `Archived`.

### 2.3 Product Cards (`.product-card`)
- **Layout**: CSS Grid or Flex column with fixed padding (`1.5rem`).
- **Surface**: Translucent dark glass (`background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(12px)`).
- **Interactions**:
  - Hover: Border changes from `--border-subtle` to `--border-strong` with ambient violet top highlight.
  - Mobile: Full width, no side-scroll clipping.

---

## 3. Responsive Breakpoints

| Breakpoint Name | Viewport Width | Layout Adaptations |
| :--- | :--- | :--- |
| **Compact Mobile** | 320px – 375px | Single-column stack, reduced padding (`1rem`), navigation collapses into full-screen drawer. |
| **Standard Mobile**| 376px – 640px | Single-column cards, full-width search input, horizontal scrolling category pills. |
| **Tablet** | 641px – 1024px| 2-column product grid, compact desktop navigation bar. |
| **Desktop / Wide** | 1025px+ | 3-column product grid, full horizontal desktop navigation, cinematic hero presentation. |

---

## 4. Accessibility & Quality States

1. **Empty States**: If a category or search returns 0 products, render a helpful empty state with:
   - Descriptive title: *"No matching products found"*.
   - Suggestion: *"Try searching for another keyword or reset the category filter"*.
   - Action Button: *"Reset Filters"* restoring all products.
2. **Loading States**: Skeleton card placeholders with subtle shimmering pulse matching card dimensions.
3. **Error Recovery**: Graceful inline error banners with retry triggers when API calls fail.
