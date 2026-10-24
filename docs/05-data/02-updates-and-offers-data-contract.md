# TomeSphere — Updates & Offers Data Contract

**Document Type:** Data Contract & Schema Specification  
**Owner:** Database Architect / Backend Lead  
**Status:** Approved for Implementation (Phase C)  
**Last Reviewed:** 2026-10-24  
**Dependencies:** `docs/05-data/01-product-catalog-data-contract.md`, `docs/adr/README.md` (ADR-006)

---

## 1. Objective & Authority

This document defines the canonical schema, data contracts, publication rules, and security policies governing **Product Updates (Changelogs)** and **Product Offers (Promotions)** in TomeSphere.

It guarantees that:
1. Product updates correlate with verified product changes (releases, features, bug fixes).
2. Product offers reflect active, unexpired commercial or trial benefits with explicit eligibility.
3. Expired offers and draft announcements never leak into public search or API endpoints.
4. Updates and offers are anchored to parent products via foreign key relationships (`project_id`).

---

## 2. Updates & Changelogs Data Model

### Database Table: `public.updates`

| Column | Data Type | Nullable | Default | Description & Constraint |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `TEXT` | No | `upd_<nanoid>` | Primary key. Unique system identifier. |
| `slug` | `TEXT` | No (Unique) | - | Permanent URL-safe identifier (`^[a-z0-9]+(?:-[a-z0-9]+)*$`). |
| `project_id` | `TEXT` | No | - | Foreign key to `public.projects(id)` ON DELETE CASCADE. |
| `title` | `TEXT` | No | - | Update headline (5–120 characters). |
| `summary` | `TEXT` | No | - | Concise summary (10–300 characters). |
| `content` | `TEXT` | No | - | Detailed markdown content or release notes. |
| `version` | `TEXT` | Yes | `NULL` | Optional semantic version string (e.g. `'v1.2.0'`). |
| `update_type` | `TEXT` | No | `'Feature'` | Category: `'Launch'`, `'Feature'`, `'Improvement'`, `'Bugfix'`, `'Maintenance'`. |
| `status` | `TEXT` | No | `'Draft'` | Publication status: `'Published'`, `'Draft'`, `'Archived'`. |
| `published_at` | `TIMESTAMPTZ` | Yes | `NOW()` | Publication timestamp. Must be `<=` current time for public access. |
| `created_at` | `TIMESTAMPTZ` | No | `NOW()` | Record creation timestamp. |
| `updated_at` | `TIMESTAMPTZ` | No | `NOW()` | Auto-updated via `handle_updated_at()` trigger. |

### Allowed Update Types (`ALLOWED_UPDATE_TYPES`)
- `'Launch'`: Initial public release or major ecosystem launch.
- `'Feature'`: New functional capability introduced to the product.
- `'Improvement'`: Enhancement to performance, user experience, or reliability.
- `'Bugfix'`: Resolution of a defect or security patch.
- `'Maintenance'`: Infrastructure upgrade, dependency maintenance, or deprecation notice.

---

## 3. Offers & Promotions Data Model

### Database Table: `public.offers`

| Column | Data Type | Nullable | Default | Description & Constraint |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `TEXT` | No | `off_<nanoid>` | Primary key. Unique system identifier. |
| `slug` | `TEXT` | No (Unique) | - | Permanent URL-safe identifier (`^[a-z0-9]+(?:-[a-z0-9]+)*$`). |
| `project_id` | `TEXT` | No | - | Foreign key to `public.projects(id)` ON DELETE CASCADE. |
| `title` | `TEXT` | No | - | Promotion headline (5–100 characters). |
| `description` | `TEXT` | No | - | Detailed offer description (10–500 characters). |
| `benefit` | `TEXT` | No | - | Tangible benefit (e.g. `'Free 30-Day Pro Access'`, `'50% Off First Year'`). |
| `eligibility` | `TEXT` | No | - | Clear qualification criteria (e.g. `'New developers'`, `'All community members'`). |
| `terms` | `TEXT` | Yes | `NULL` | Terms, conditions, and redemption restrictions. |
| `coupon_code` | `TEXT` | Yes | `NULL` | Promotional code for redemption (optional). |
| `url` | `TEXT` | No | - | Verified redemption URL (`http:` or `https:`). |
| `start_date` | `TIMESTAMPTZ` | No | `NOW()` | Timestamp when offer becomes active. |
| `end_date` | `TIMESTAMPTZ` | No | - | Timestamp when offer expires. Must be `> start_date`. |
| `status` | `TEXT` | No | `'Draft'` | Status: `'Published'`, `'Draft'`, `'Expired'`. |
| `is_featured` | `BOOLEAN` | No | `false` | Featured flag for platform spotlight. |
| `created_at` | `TIMESTAMPTZ` | No | `NOW()` | Record creation timestamp. |
| `updated_at` | `TIMESTAMPTZ` | No | `NOW()` | Auto-updated via `handle_updated_at()` trigger. |

### Expiry Enforcement Rules
1. **Automated Exclusion**: Any offer where `end_date < NOW()` is treated as expired and automatically excluded from public queries.
2. **Explicit Terms**: Offers without defined benefits or eligibility criteria are rejected at the validator boundary.

---

## 4. Supabase Row Level Security (RLS) Policies

### Table `public.updates`
- **Public Read (anon, authenticated)**:
  ```sql
  CREATE POLICY "Public read published updates" ON public.updates
    FOR SELECT TO anon, authenticated
    USING (status = 'Published' AND published_at <= NOW());
  ```
- **Admin Mutation**:
  ```sql
  REVOKE INSERT, UPDATE, DELETE ON public.updates FROM anon, authenticated;
  GRANT SELECT ON public.updates TO anon, authenticated;
  GRANT ALL ON public.updates TO service_role;
  ```

### Table `public.offers`
- **Public Read (anon, authenticated)**:
  ```sql
  CREATE POLICY "Public read active published offers" ON public.offers
    FOR SELECT TO anon, authenticated
    USING (status = 'Published' AND start_date <= NOW() AND end_date >= NOW());
  ```
- **Admin Mutation**:
  ```sql
  REVOKE INSERT, UPDATE, DELETE ON public.offers FROM anon, authenticated;
  GRANT SELECT ON public.offers TO anon, authenticated;
  GRANT ALL ON public.offers TO service_role;
  ```

---

## 5. API Contracts

### 5.1 Updates Endpoints (`/api/v1/updates`)
- `GET /api/v1/updates`: List published updates (`?project_id=...&type=...&limit=...`).
- `GET /api/v1/updates/slug/:slug`: Fetch single published update by permanent slug.
- `POST /api/v1/updates`: Admin create update.
- `PUT /api/v1/updates/:id`: Admin update update.
- `DELETE /api/v1/updates/:id`: Admin delete update.

### 5.2 Offers Endpoints (`/api/v1/offers`)
- `GET /api/v1/offers`: List active published offers (`?project_id=...&featured=...&limit=...`).
- `GET /api/v1/offers/slug/:slug`: Fetch single active offer by permanent slug.
- `POST /api/v1/offers`: Admin create offer.
- `PUT /api/v1/offers/:id`: Admin update offer.
- `DELETE /api/v1/offers/:id`: Admin delete offer.
