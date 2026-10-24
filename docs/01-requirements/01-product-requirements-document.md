# TomeSphere — Product Requirements Document (PRD)

**Document Type:** Product Requirements Document (PRD)  
**Owner:** Product Lead / Systems Architect  
**Status:** Approved  
**Last Reviewed:** 2026-10-24  
**Dependencies:** `docs/00-foundation/01-product-vision-strategy.md`  
**Target Milestone:** Phase 1 (Launch Foundation) & Phase 2 (Product Information)  

---

## 1. Objective & Scope

This document specifies the functional requirements, user journeys, acceptance criteria, and feature priorities for the TomeSphere platform. It acts as the definitive contract for implementation, verification, and regression testing.

---

## 2. User Personas & Needs

| Persona | Role | Primary Needs | Key Pain Points |
| :--- | :--- | :--- | :--- |
| **P-1: Discoverer** | New visitor exploring the ecosystem | Wants to quickly understand what products exist, what problems they solve, and their maturity. | Fragmented links across the web; dead or unmaintained destinations. |
| **P-2: Product User** | Returning user of specific apps | Wants direct, reliable launch access to applications, release notes, and operational uptime status. | Confusion about subdomain locations; lack of centralized release notes. |
| **P-3: Technical Evaluator** | Developer, engineer, or collaborator | Wants to inspect architectures, tech stacks, open-source repositories, and developer CLI tools. | Marketing claims without technical substance or repository links. |
| **P-4: Platform Maintainer** | Administrator / ecosystem author | Wants to register new products, update metadata, manage announcements, and curate featured highlights. | Needing to edit and re-deploy frontend code for routine metadata changes. |

---

## 3. Core User Journeys

### Journey 1: Discover & Launch an Ecosystem Product (Phase 1)
1. User lands on `/` (Homepage).
2. User views featured products showcase or navigates to `/products` (Directory).
3. User filters by category (e.g. `WEB APPS`, `DEVELOPER TOOLS`) or types a keyword into search.
4. User selects a product card to inspect its detail page (`/products/[slug]`).
5. User reviews capabilities, screenshots, and tech stack, then clicks "Launch Application" to open the live app in a new tab.

### Journey 2: Follow Updates, Changelogs & Promotions (Phase 2)
1. User clicks `Updates` or `Offers` in the top navigation to view the centralized feed.
2. User reads chronologically ordered, verified release notes with version tags, or inspects active promotions with clear expiration dates.
3. User navigates directly to a specific product's detail page to inspect its full historical changelog.

### Journey 3: Administrative Catalog Management (Phase 1 & 2)
1. Administrator accesses `/admin` or sends authorized requests with admin secret headers.
2. Express server validates input payload against schema rules.
3. Supabase records the updated product, update, or offer attributes.
4. ISR cache revalidates within the configured window (`revalidate = 1800`), serving updated data to users.

---

## 4. Functional Requirements Specification

### 4.1 Discovery & Catalog Experience (Phase 1)

- **FR-CAT-01 (Catalog Browsing)**: The system must display all products having `status = 'Live'` on `/products`.
  - *Priority*: P0 (Implemented).
  - *Acceptance Criteria*: Products must render in responsive grid; cards must display title, category, tagline, description, tags, and action buttons.
- **FR-CAT-02 (Category Filtering)**: The system must support instant filtering across predefined categories (`ALL`, `WEB APPS`, `BUSINESS TOOLS`, `REAL-TIME APPS`, `ECOMMERCE`, `MARKETPLACE`, `DEVELOPER TOOLS`, `MOBILE`, `OTHER`).
  - *Priority*: P0 (Implemented).
  - *Acceptance Criteria*: Changing category updates visible list instantly without full page reload.
- **FR-CAT-03 (Search)**: The system must provide search filtering matching against product name, category, description, and tags.
  - *Priority*: P0 (Implemented).
  - *Acceptance Criteria*: Search debounce (<250ms), case-insensitive, displaying clear empty state when zero matches found.
- **FR-CAT-04 (Permanent Slugs)**: Products must be identifiable by unique, URL-safe slugs.
  - *Priority*: P0 (Approved for Phase 1 launch).
  - *Acceptance Criteria*: Slugs must match regex `^[a-z0-9]+(?:-[a-z0-9]+)*$`. Lookup by slug must return the corresponding record.

### 4.2 Product Detail Pages — `/products/[slug]` (Phase 1)

- **FR-DET-01 (Dedicated Route)**: Every product must have an independent, SEO-optimized page at `/products/[slug]`.
  - *Priority*: P0 (Approved for Phase 1 launch).
  - *Acceptance Criteria*: Invalid slug returns clean Next.js 404. Valid slug renders product identity, overview, features, technical specifications, and outbound links.
- **FR-DET-02 (Canonical Metadata & Social Share)**: Detail pages must generate dynamic OpenGraph and Twitter card metadata.
  - *Priority*: P1 (Approved for Phase 1 launch).
  - *Acceptance Criteria*: Title, description, and canonical URL match product attributes.
- **FR-DET-03 (External Routing)**: Primary CTA must clearly navigate to the verified production URL (`target="_blank"` with `rel="noopener noreferrer"`).
  - *Priority*: P0 (Approved for Phase 1 launch).
  - *Acceptance Criteria*: Launch button functions for subdomains and external repositories.

### 4.3 Content, Updates & Offers (Phase 2)

- **FR-UPD-01 (Updates Feed & Details)**: Central timeline at `/updates` and dedicated notes at `/updates/[slug]`.
  - *Priority*: P1 (Phase 2).
- **FR-OFF-01 (Verified Offers Directory)**: Directory at `/offers` and dedicated detail pages at `/offers/[slug]` with automated expiration filtering (`end_date > NOW()`).
  - *Priority*: P1 (Phase 2).
- **FR-ADM-01 (Protected Management Pages)**: Management console at `/admin/*` protected by server-side authentication for products, updates, offers, and moderation.
  - *Priority*: P1 (Phase 2).

### 4.4 Verified Trending & Deep Discovery (Phase 3)

- **FR-TRN-01 (Data-Gated Trending)**: `/trending` view driven exclusively by verified telemetry signals without decorative rankings.
  - *Priority*: P2 (Phase 3).

---

## 5. Three-Tier Status Classification

### 5.1 Verified Current State
- **Homepage Showcase**: Cinematic dark theme with abstract TomeSphere visual, featured products grid, and statistics overview (`HomeOverviewClient.jsx`).
- **Product Directory**: `/products` page with client-side category filtering, search, and outbound link handling (`WorkCatalogClient.jsx`).
- **API Catalog Endpoints**: `GET /api/v1/projects` (with query filtering for `category`, `status`, `featured`, `q`) and `GET /api/v1/projects/:id`.
- **Database Schema**: `public.projects` table with RLS enforcement allowing anonymous reads only when `status = 'Live'`.
- **Security Validation**: 29 automated test cases covering payloads, RLS, and admin headers (`tests/security.test.js`).

### 5.2 Approved Decisions
- **Phase 1 Launch Gate**: Deploy `GET /api/v1/projects/slug/:slug` in Express backend and create `app/products/[slug]/page.jsx` in Next.js frontend, accompanied by legal pages (`/privacy`, `/terms`, `/cookies`, `/accessibility`).
- **First-Class Discovery for Updates & Offers (ADR-006)**: Dedicated top-level navigation routes for `/updates` and `/offers` planned for Phase 2.
- **Trending Strictly Data-Gated (ADR-006)**: Trending claims prohibited until Phase 3 telemetry is deployed.

### 5.3 Proposals (Subject to Further Review)
- **Product Reviews & Ratings**: User-submitted reviews for products (requires anti-abuse and moderation system).
- **Interactive Sandbox Previews**: Embedded iframes or web containers for trying CLI or web tools directly within TomeSphere.

---

## 6. Definition of Done (DoD)

A requirement or feature is considered complete only when:
1. **Code Implementation**: Built strictly according to architectural boundaries and design system tokens.
2. **Input Validation**: All external inputs (route params, query params, request bodies) validated server-side.
3. **Automated Testing**: Unit/integration tests added covering normal operation, error cases, and authorization boundaries.
4. **Zero Regressions**: Existing 29+ security and operational tests pass cleanly (`npm test`).
5. **No Placeholders**: Zero `TODO`, `FIXME`, or mock stub values in production pathways.
6. **Documentation Updated**: Relevant schemas, contracts, and changelogs documented in version-controlled markdown.
