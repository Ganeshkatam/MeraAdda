# TomeSphere — User Needs & Information Architecture

**Document Type:** UX Research & Information Architecture Specification  
**Owner:** UX Lead / Product Designer  
**Status:** Approved  
**Last Reviewed:** 2026-10-24  
**Dependencies:** `docs/01-requirements/01-product-requirements-document.md`  

---

## 1. User Research & Core Insights

Research and evaluation of digital product hubs (such as developer directories, app aggregators, and product platforms) reveal three fundamental user expectations:

1. **Immediate Clarity Over Hype**: Visitors leave within 10 seconds if a product's primary function and domain problem are hidden behind generic marketing slogans (e.g. "Empowering tomorrow"). Users need explicit statements: *"What does it do? Who uses it? Where does it run?"*
2. **Transparent Operational State**: Users will not click external links if they cannot verify whether a tool is a live production service, a CLI, or an early prototype. Explicit badges (`Live`, `In progress`, `Developer Tool`) build trust.
3. **Frictionless Navigation Pathways**: Product exploration requires persistent context. A user browsing a detail page must be able to return to the filtered directory with a single click without losing their scroll position or active search query.

---

## 2. Information Architecture (IA) & Sitemap

```text
TomeSphere Platform (tomesphere.in)
│
├── Public Discovery Pages (Core)
│   ├── / (Homepage / Discovery Dashboard)
│   ├── /products (Canonical Catalog & Directory)
│   ├── /products/[slug] (Canonical Product Detail Page)
│   └── /trending (Verified Trending Products — Phase 3)
│
├── Public Updates & Offers (Phase 2)
│   ├── /updates (Central Ecosystem Changelog Feed)
│   ├── /updates/[slug] (Permanent Update Detail Page)
│   ├── /offers (Verified Promotions Directory)
│   └── /offers/[slug] (Permanent Offer Terms Page)
│
├── Search & Deep Navigation
│   ├── /search?q=... (Shareable Search Results)
│   ├── /categories (Category Index)
│   ├── /categories/[slug] (Category Detail Catalog)
│   ├── /recent (Recently Added Products)
│   └── /recently-updated (Recently Updated Products)
│
├── Platform Information & Legal
│   ├── /about (Studio Principles & Architecture Philosophy)
│   ├── /contact (Direct System Inquiries & Triage Form)
│   ├── /help (FAQ & Ecosystem Guidelines)
│   ├── /guestbook (Community Feedback & Verified Guest Messages)
│   ├── /privacy (Privacy Policy)
│   ├── /terms (Terms of Use)
│   ├── /cookies (Cookie Policy)
│   └── /accessibility (Accessibility Statement)
│
└── Protected Management Console (/admin)
    ├── /admin (Overview Dashboard)
    ├── /admin/products (Product Management)
    ├── /admin/products/[id] (Product Editor)
    ├── /admin/updates (Updates Manager)
    ├── /admin/offers (Offers Manager)
    └── /admin/moderation (Feedback & Inquiries Triage)
```

---

## 3. Primary Navigation Hierarchy

### 3.1 Desktop Navigation
- Brand Monogram (`TS`) + Title (`TomeSphere`) + Tagline (`Product Place · tomesphere.in`)
- Primary Destinations:
  1. `Home` (`/`)
  2. `Products` (`/products`)
  3. `Trending` (`/trending`)
  4. `Updates` (`/updates`)
  5. `Offers` (`/offers`)
  6. `About` (`/about`)
- Utility Tools:
  - Global Search trigger
  - Dark / Light Theme Toggle

### 3.2 Footer Structure
- **Discovery**: Products, Categories, Trending, Recently Added.
- **Ecosystem**: Updates, Offers, Documentation, GitHub.
- **Support & Legal**: Contact, Help / FAQ, Privacy Policy, Terms, Cookies, Accessibility Statement.

---

## 4. Cognitive Load & Layout Principles

1. **Card Scannability**: Every product card in the directory presents information in strict priority order:
   - Primary: Product Name and Category Badge.
   - Secondary: 1-sentence Tagline explaining utility.
   - Tertiary: Technical tags (e.g. `Next.js`, `TypeScript`, `WebSockets`).
   - Action: Primary Launch CTA (external link icon) and Detail Page link.
2. **Predictable Navigation**: The header remains fixed or sticky, providing instant access to Home, Products, About, and Theme Toggle across all breakpoints.
3. **Responsive Visual Anchors**: On compact screens (320px–360px), multi-column grids collapse gracefully to single-column cards with touch-friendly tap targets (>44px height).

---

## 5. Usability Benchmarks & Accessibility Constraints

- **WCAG 2.1 AA Compliance**: All text elements must achieve a minimum color contrast ratio of 4.5:1 against their respective backgrounds in both light and dark themes.
- **Visible Keyboard Focus**: Interactive elements (buttons, links, inputs) must display a clear, high-contrast focus ring (`outline: 2px solid var(--accent-violet); outline-offset: 2px`).
- **Reduced Motion Support**: All CSS keyframe animations (such as the rotating sphere rings) must respect `@media (prefers-reduced-motion: reduce)`.
