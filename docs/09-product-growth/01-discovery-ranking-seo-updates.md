# TomeSphere — Discovery, Ranking, SEO, Updates & Offers

**Document Type:** Growth & Discovery Policies Specification  
**Owner:** Growth & Product Strategy Lead  
**Status:** Draft  
**Last Reviewed:** 2026-10-24  
**Dependencies:** `docs/01-requirements/01-product-requirements-document.md`, `docs/05-data/01-product-catalog-data-contract.md`  

---

## 1. Product Discovery & Ranking Governance

### 1.1 The Strict Anti-Deception Policy
TomeSphere strictly prohibits unverified or misleading popularity badges. A product will **never** be labeled as "Trending", "Popular", or "Top App" simply through manual editorial preference or vanity placement.

### 1.2 Distinct Visibility Tiers
1. **Featured (`featured = true`)**:
   - *Definition*: Products deliberately selected for editorial or ecosystem importance.
   - *Requirement*: Must be explicitly labeled as "Featured" or "Spotlight" so visitors understand it is an editorial curation, not an algorithmic ranking.
2. **New (`status = 'Live'` and launch year = current year)**:
   - *Definition*: Products newly added to the ecosystem within the last 90 days.
3. **Recently Updated (Phase 3)**:
   - *Definition*: Products with verified release notes published within the last 30 days.
4. **Trending & Popular (Phase 5)**:
   - *Definition*: Products experiencing measurable, verified engagement spikes or high verified active usage.
   - *Requirement*: Kept disabled until the verified telemetry ingestion pipeline is built.

---

## 2. Search Engine Optimization (SEO) & Public Metadata

### 2.1 Canonical URL Architecture
- Every product must have an immutable canonical URL:
  `https://www.tomesphere.in/products/[slug]`
- In Phase 2 detail pages, `robots` tags must specify `index, follow` for live products, and `noindex, follow` for draft/preview entries.

### 2.2 Dynamic OpenGraph & Twitter Cards
Detail pages must dynamically render metadata tags:
- `og:title`: `[Product Name] — TomeSphere`
- `og:description`: `[tagline or clamped description]`
- `og:url`: `https://www.tomesphere.in/products/[slug]`
- `og:site_name`: `TomeSphere Product Hub`
- `og:type`: `website`
- `twitter:card`: `summary_large_image`

### 2.3 Robots & Sitemap
- `app/robots.js` dynamically generates rules allowing public indexing of `/`, `/products`, and `/about`, while blocking private admin paths.
- `app/sitemap.js` queries `projects.list()` to inject all live product detail URLs into the search index.

---

## 3. Product Updates & Changelog Policy (Phase 3)

1. **Verification Before Publication**: An update entry must correlate with a live, deployed commit, version tag, or operational change.
2. **Categorization**: Updates must specify an update type: `Launch`, `Feature`, `Improvement`, `Bugfix`, or `Maintenance`.
3. **Product Association**: Updates must link directly to the parent product's `id` and `slug`.

---

## 4. Offers & Promotions Policy (Phase 4)

1. **Ownership & Eligibility**: Offers must explicitly declare what benefit is provided, who is eligible, and how to redeem it.
2. **Automated Expiry**: The platform must never display expired offers. Once `end_date < NOW()`, the offer record must be suppressed from public active lists.
3. **Clear Distinction from Announcements**: An announcement of a new feature is not an offer. Only tangible commercial or access promotions may be listed under Offers.
