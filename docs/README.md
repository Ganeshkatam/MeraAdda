# TomeSphere — Master Documentation Index & Operating Manual

**Document Type:** Master Documentation Index & Source of Truth  
**Status:** Approved  
**Last Reviewed:** 2026-10-24  
**Website:** https://www.tomesphere.in/  

---

## 1. Complete Product Blueprint Architecture

All platform documentation is version-controlled under `docs/` and structured into an 11-part canonical hierarchy plus Architecture Decision Records (ADR):

```text
docs/
├── 00-foundation/
│   ├── 00-documentation-audit.md                    # Master codebase audit & gap analysis
│   └── 01-product-vision-strategy.md                # Vision, mission, problem, non-goals, principles
├── 01-requirements/
│   └── 01-product-requirements-document.md          # User personas, journeys, functional specs, DoD
├── 02-ux-research/
│   └── 01-user-needs-information-architecture.md    # User research, IA, sitemap, cognitive load
├── 03-ui-ux-design/
│   ├── 01-design-system-and-components.md           # Visual tokens, palette, components, breakpoints
│   └── 02-page-specifications-and-journeys.md       # Screen blueprints (Home, Catalog, Detail, Admin)
├── 04-architecture/
│   └── 01-system-architecture-boundaries.md         # System topology, boundaries, data ownership
├── 05-data/
│   └── 01-product-catalog-data-contract.md          # Schema, constraints, enums, API contracts
├── 06-security-privacy/
│   └── 01-security-privacy-governance.md            # Threat model, RLS, authorization, retention
├── 07-engineering/
│   └── 01-engineering-standards-ai-rules.md         # Code standards, AI rules, commit rules, test gates
├── 08-operations/
│   └── 01-environments-deployment-monitoring.md      # Environments, Vercel/Render, health probes, runbooks
├── 09-product-growth/
│   └── 01-discovery-ranking-seo-updates.md          # Ranking policies, anti-deception, SEO, offers
├── 10-roadmap/
│   └── 01-roadmap-milestones-definition-of-ready.md # Roadmap phases 1-6, Definition of Ready (DoR)
└── adr/
    └── README.md                                    # Architectural Decision Records (ADR-001 through ADR-005)
```

---

## 2. Document Registry & Master Index

| Part & Document | Primary Role & Description | Status |
| :--- | :--- | :--- |
| **00. Foundation**<br>[00-documentation-audit.md](file:///d:/MeraAdda/docs/00-foundation/00-documentation-audit.md) | Verified audit of repository code, migrations, PR #3, and gap analysis. | **Approved** |
| **00. Foundation**<br>[01-product-vision-strategy.md](file:///d:/MeraAdda/docs/00-foundation/01-product-vision-strategy.md) | Ecosystem purpose, non-goals, principles, and strategic direction. | **Approved** |
| **01. Requirements**<br>[01-product-requirements-document.md](file:///d:/MeraAdda/docs/01-requirements/01-product-requirements-document.md) | Personas, journeys, functional requirements, and Definition of Done. | **Approved** |
| **02. UX Research**<br>[01-user-needs-information-architecture.md](file:///d:/MeraAdda/docs/02-ux-research/01-user-needs-information-architecture.md) | User needs, cognitive load, navigation hierarchy, and sitemap. | **Approved** |
| **03. UI/UX Design**<br>[01-design-system-and-components.md](file:///d:/MeraAdda/docs/03-ui-ux-design/01-design-system-and-components.md) | Design tokens in `globals.css`, color palette, components, breakpoints. | **Approved** |
| **03. UI/UX Design**<br>[02-page-specifications-and-journeys.md](file:///d:/MeraAdda/docs/03-ui-ux-design/02-page-specifications-and-journeys.md) | Detailed screen blueprints for Homepage, Directory, and Detail Pages. | **Approved** |
| **04. Architecture**<br>[01-system-architecture-boundaries.md](file:///d:/MeraAdda/docs/04-architecture/01-system-architecture-boundaries.md) | Subsystem boundaries, loose coupling, data ownership matrix. | **Approved** |
| **05. Data**<br>[01-product-catalog-data-contract.md](file:///d:/MeraAdda/docs/05-data/01-product-catalog-data-contract.md) | Canonical schema in Supabase, validation in Express, API contracts. | **Approved** |
| **06. Security & Privacy**<br>[01-security-privacy-governance.md](file:///d:/MeraAdda/docs/06-security-privacy/01-security-privacy-governance.md) | Threat model, least-privilege RLS, admin timing guards, privacy. | **Approved** |
| **07. Engineering**<br>[01-engineering-standards-ai-rules.md](file:///d:/MeraAdda/docs/07-engineering/01-engineering-standards-ai-rules.md) | Engineering conventions, AI coding rules, commit format, test gates. | **Approved** |
| **08. Operations**<br>[01-environments-deployment-monitoring.md](file:///d:/MeraAdda/docs/08-operations/01-environments-deployment-monitoring.md) | Hosting configuration (Vercel/Render), liveness probes, SEV levels. | **Approved** |
| **09. Product Growth**<br>[01-discovery-ranking-seo-updates.md](file:///d:/MeraAdda/docs/09-product-growth/01-discovery-ranking-seo-updates.md) | Anti-deception ranking policy, SEO metadata, updates, offers rules. | **Approved** |
| **10. Roadmap**<br>[01-roadmap-milestones-definition-of-ready.md](file:///d:/MeraAdda/docs/10-roadmap/01-roadmap-milestones-definition-of-ready.md) | Phases 1–6, milestones, and the 8-point Definition of Ready (DoR). | **Approved** |
| **ADR**<br>[README.md](file:///d:/MeraAdda/docs/adr/README.md) | Architecture Decision Records (ADR-001 through ADR-005). | **Approved** |

---

## 3. Core Operating Rules

### 3.1 The Three-Tier Truth Classification
Every document across this repository strictly distinguishes:
- **Verified Current State**: What the codebase, database, and deployed systems demonstrably do today.
- **Approved Decisions**: Locked commitments and approved specifications for current and upcoming phases.
- **Proposals**: Unapproved ideas, exploratory discussions, or long-term considerations requiring review.

### 3.2 The Definition of Ready (DoR) Gate
Before any feature enters active implementation:
1. Documented purpose and persona.
2. Approved UI design and responsive breakpoints.
3. All interface states defined (default, hover, loading skeleton, empty, error).
4. Data contract and validation schema locked.
5. Security and permission model specified.
6. Accessibility criteria verified (WCAG 2.1 AA).
7. Acceptance criteria and test plan drafted.
8. Rollback and failure recovery strategy documented.
