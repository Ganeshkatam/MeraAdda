# TomeSphere — Architecture Decision Records (ADR)

**Document Type:** Architectural Decision Registry  
**Owner:** Systems Architect  
**Status:** Active  
**Last Reviewed:** 2026-10-24  

---

## What is an ADR?

An Architecture Decision Record (ADR) captures a significant architectural decision made in TomeSphere, along with its context, options considered, trade-offs, and consequences.

## Record Index

| ADR ID | Title | Date | Status |
| :--- | :--- | :--- | :--- |
| **ADR-001** | Separate Discovery Hub from Autonomous Product Runtimes | 2026-10-23 | Accepted |
| **ADR-002** | Cinematic Dark Hybrid Design System with Vanilla CSS Tokens | 2026-10-24 | Accepted |
| **ADR-003** | Three-Tier Truth Classification for Platform Documentation | 2026-10-24 | Accepted |
| **ADR-004** | Permanent Product Slugs for Phase 2 Detail Pages | 2026-10-24 | Accepted |
| **ADR-005** | 11-Part Complete Product Blueprint & Definition of Ready Standards | 2026-10-24 | Accepted |
| **ADR-006** | First-Class Discovery Destinations for Updates and Offers with Data-Gated Trending | 2026-10-24 | Accepted |

---

### ADR-001: Separate Discovery Hub from Autonomous Product Runtimes
- **Status**: Accepted
- **Context**: TomeSphere could have been built as a monolithic multi-tenant runtime running all products under a single web app.
- **Decision**: Keep products autonomous (independent codebases, databases, deployments) and operate TomeSphere strictly as a centralized discovery, catalog, and information hub.
- **Consequences**: Independent deployment cycles and zero risk of cross-product blast radius; requires explicit catalog metadata contracts.

### ADR-002: Cinematic Dark Hybrid Design System with Vanilla CSS Tokens
- **Status**: Accepted
- **Context**: Needed a distinctive, cohesive, and modern visual identity without heavy UI library dependencies or framework coupling.
- **Decision**: Use vanilla CSS custom properties in `app/globals.css` with a cinematic dark palette (deep navy/slate backgrounds, violet and teal accents) and responsive layouts.
- **Consequences**: High performance, zero CSS-in-JS runtime overhead; requires discipline maintaining token naming consistency.

### ADR-003: Three-Tier Truth Classification for Platform Documentation
- **Status**: Accepted
- **Context**: AI-assisted development and rapid evolution can conflate future roadmap ideas with implemented capabilities.
- **Decision**: Require every technical and product document to categorize statements into *Verified current state*, *Approved decisions*, and *Proposals*.
- **Consequences**: Eliminates accidental hallucination of unbuilt features while preserving a clear forward-looking roadmap.

### ADR-004: Permanent Product Slugs for Phase 2 Detail Pages
- **Status**: Accepted
- **Context**: Product URLs must be human-readable, SEO-friendly, and stable over time.
- **Decision**: Products are keyed by lowercase alphanumeric hyphenated slugs (e.g. `/products/bookgarden`). Database enforces uniqueness. Slugs are immutable once published.
- **Consequences**: High SEO value and reliable linking; prevents breaking backlinks when product display names are tweaked.

### ADR-005: 11-Part Complete Product Blueprint & Definition of Ready Standards
- **Status**: Accepted
- **Context**: Feature development was beginning to outpace foundational consensus, risking inconsistent UI patterns and data contract mismatches.
- **Decision**: Adopt an 11-part comprehensive documentation blueprint (`docs/00-foundation` through `docs/10-roadmap`) and enforce an 8-point Definition of Ready (DoR) gate before implementing new major features.
- **Consequences**: Ensures that UI/UX, data schemas, security rules, and acceptance criteria are locked before code is written.

### ADR-006: First-Class Discovery Destinations for Updates and Offers with Data-Gated Trending
- **Status**: Accepted
- **Context**: Determining whether Updates and Offers should exist only as subsidiary tabs inside product detail pages or as top-level discovery destinations, and how Trending should be represented.
- **Decision**:
  1. Products remain the primary core of the platform.
  2. Updates (`/updates`) and Offers (`/offers`) are designated as first-class top-level discovery destinations in the main navigation and sitemap, in addition to being cross-referenced on individual product pages.
  3. Trending (`/trending`) is strictly data-gated: it will not display decorative or speculative popularity claims until an authenticated, privacy-conscious event telemetry pipeline is deployed in Phase 3.
- **Consequences**: Visitors looking for what is newly released or promotional benefits can access them directly across all products; maintains absolute integrity regarding ecosystem metrics.
