# TomeSphere — Product Vision & Strategy

**Document Type:** Product Vision & Strategic Direction  
**Owner:** Technical Lead / Systems Architect  
**Status:** Draft  
**Last Reviewed:** 2026-10-24  
**Dependencies:** `docs/00-foundation/00-documentation-audit.md`  
**Domain:** https://www.tomesphere.in/  

---

## 1. Executive Summary

TomeSphere is a centralized digital product hub designed to unite independent applications, developer utilities, and web services under a single discovery and information umbrella. It functions as both a trustworthy **informational hub** and a **product discovery platform**.

TomeSphere addresses a core structural challenge in multi-product ecosystems: while individual products (e.g., BookGarden, StreetCraft, CoWatch) operate autonomously with their own deployments and domain logic, users lack a single authoritative destination to discover what exists, understand product capabilities, review changelogs, evaluate promotions, and inspect verified operational status.

TomeSphere is **not a personal portfolio**. It is a product-first software hub built for users, developers, and ecosystem participants.

---

## 2. Core Problem & Justification

### Why TomeSphere must exist if every product is independently accessible

1. **Fragmentation of Discovery**: Independent applications have disparate domains (`bookgarden.tomesphere.in`, `cowatch.tomesphere.in`, `github.com/...`). Without a central index, users discovering one product remain unaware of related or complementary tools in the ecosystem.
2. **Inconsistent Product Information**: Independent apps prioritize functional interfaces over contextual documentation, changelogs, system architecture overviews, and roadmap announcements. TomeSphere provides a standard information architecture across all products.
3. **Ecosystem Trust & Verification**: Users need a single origin to verify genuine applications, official releases, maintenance notices, and validated offers, protecting them from outdated forks or phishing destinations.
4. **Independent Evolution**: By maintaining clear separation between the discovery hub and the individual apps, products can innovate, migrate tech stacks, or change hosting providers without disrupting their catalog identity or permanent URLs.

---

## 3. Product Principles

1. **One Central Destination**: A user visiting `tomesphere.in` gains immediate visibility into all published products in the ecosystem.
2. **Information First**: Product listings must provide actionable, verified technical and functional details rather than vague marketing superlatives.
3. **Real Activity Only**: Popularity metrics, user counts, and trending badges must be backed by verifiable data. Speculative or fabricated signals are prohibited.
4. **Ecosystem Autonomy**: Products maintain their own codebases, storage, auth providers, and deployment lifecycles. TomeSphere aggregates; it does not monopolize runtime execution.
5. **Architectural Expandability**: Introducing a new product to TomeSphere requires only adding a structured catalog record, not re-architecting the platform.
6. **Zero-Trust Security & Data Integrity**: Public discovery surfaces are strictly read-only. Catalog mutations and metadata management require authenticated server-side authorization.

---

## 4. Target Audiences

- **New Visitors**: Evaluating the scope and capabilities of the TomeSphere ecosystem.
- **Product Users**: Returning users looking to launch specific web apps, check service status, or read release updates.
- **Developers & Systems Engineers**: Inspecting architecture, public API contracts, CLI tools, and GitHub repositories.
- **Offer & Feature Seekers**: Discovering active promotions, beta features, or trial access across ecosystem applications.

---

## 5. Scope & Explicit Non-Goals

### What TomeSphere Is
- A canonical catalog of production applications, CLI tools, and developer platforms.
- A central source of product documentation, verified changelogs, and release history.
- An outbound gateway routing users to live application URLs and source repositories.

### What TomeSphere Explicitly Is Not (Non-Goals)
- **Not a Personal Portfolio**: The platform does not center on an individual's personal journey, resume bullet points, or subjective claims.
- **Not a Monolithic Multi-Tenant Runtime**: TomeSphere does not host the runtime application logic of BookGarden, CoWatch, or FitMirror.
- **Not a Centralized User Auth Proxy (at this phase)**: TomeSphere does not enforce a single sign-on (SSO) across disparate apps.
- **Not an E-Commerce Merchant Gateway**: TomeSphere does not process credit cards or manage external order fulfillment directly.
- **Not a Social Network**: TomeSphere does not implement generic friending, algorithmic feeds, or unfiltered user-to-user messaging.

---

## 6. Three-Tier Architectural State

### 6.1 Verified Current State
- **Product Hub Branding**: Implemented cinematic dark hero and product showcase (`HomeOverviewClient.jsx`, `app/globals.css`).
- **Catalog Listings**: Active catalog listing on `/products` (and legacy alias `/work`) displaying items from Supabase table `public.projects` via Express API `/api/v1/projects`.
- **Category Filtering & Search**: In-memory and server-side filtering by category (`WEB APPS`, `PRODUCTIVITY`, `DEVELOPER TOOLS`, etc.) and text search.
- **Outbound Product Launch**: Direct external launch buttons routing to production subdomains (`bookgarden.tomesphere.in`, `cowatch.tomesphere.in`, etc.).
- **Security Baseline**: RLS enabled on all tables; admin mutations guarded by constant-time secret comparison (`tests/security.test.js`).

### 6.2 Approved Decisions
- **Phase 2 Priority**: Construction of dedicated product detail routes at `/products/[slug]`.
- **Permanent Slugs**: Products will be indexed and accessed via URL-safe, immutable slugs (e.g. `bookgarden`, `streetcraft`, `gk-dev-cli`).
- **Deprecation of Portfolio Entities**: Gradual retirement of `public.profile` and `public.skills` endpoints in favor of product-specific contributor and metadata records.
- **Strict Verification of Claims**: Labels like "Trending" or "Popular" remain disabled until verified metrics ingestion is deployed in Phase 5.

### 6.3 Proposals (Under Review)
- **Centralized Event Telemetry**: Lightweight privacy-preserving event ingestion pipeline to measure real outbound launches.
- **Cross-Product Status Health Checks**: Automated background pinging of subdomains to show live status indicators (Operational / Degraded / Maintenance).
- **RSS / Atom Feed for Updates**: Machine-readable ecosystem changelog feed.
