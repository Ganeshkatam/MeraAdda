# TomeSphere — Engineering Standards & AI Coding Rules

**Document Type:** Engineering Standards & AI Operating Guidelines  
**Owner:** Engineering Lead / Systems Architect  
**Status:** Draft  
**Last Reviewed:** 2026-10-24  
**Dependencies:** `docs/04-architecture/01-system-architecture-boundaries.md`  

---

## 1. Core Engineering Principles

1. **Inspect Before Modifying**: Never edit or add files without reading surrounding source code, active schemas, and configuration.
2. **Make the Smallest Correct Change**: Keep diffs focused, minimal, and directly aligned with the requirement. Avoid unrelated refactorings or stylistic churn.
3. **No Unverified Claims**: Never state that a feature or test has been verified unless the command was actually executed and succeeded.
4. **No Placeholders in Production**: Never commit fake implementations, stubbed mocks, or unresolved `TODO`/`FIXME` comments into production paths.
5. **No Emojis**: Emojis are strictly prohibited in commit messages, documentation, code, and comments.

---

## 2. Repository Structure & Separation of Concerns

```text
├── app/                  # Next.js 16 App Router (SSR, ISR, React 19 Frontend)
│   ├── globals.css       # Core design tokens and vanilla CSS styles
│   ├── products/         # Product directory & detail routes
│   └── api/              # Frontend API routes (if needed)
├── components/           # Reusable React components (Navbar, Footer, HomeOverview, etc.)
├── lib/                  # Shared clients & utilities (e.g. api-client.js)
├── server/               # Express 5 REST API backend
│   ├── auth/             # Admin authentication guards
│   ├── config/           # Server configuration & constants
│   ├── errors/           # Custom ApiError hierarchies
│   ├── repositories/     # Data access layer interfacing Supabase
│   ├── services/         # Business orchestration logic
│   └── validators/       # Input sanitization and payload boundary checks
├── supabase/             # Supabase PostgreSQL schema migrations and seed scripts
│   ├── migrations/       # Version-controlled SQL migration scripts
│   └── seed.sql          # Canonical seed data
└── tests/                # Automated verification suites (Node.js test runner)
```

---

## 3. Development & Verification Discipline

### 3.1 Pre-Commit Verification Commands
Before submitting any pull request or committing code, the following sequence must be executed locally:

```bash
# 1. Execute automated security and validator test suite
npm test

# 2. Verify Next.js build compilation (when altering frontend routes)
npm run build
```

### 3.2 Database Migration Discipline & SQL Completion Policy
Every SQL change (migrations, schema modifications, RLS policies, triggers, indexes, seed data, or data migrations) must adhere to the **TomeSphere SQL Completion Policy**:

1. **Create the Script**: Document the schema change in a versioned, timestamped migration file in `supabase/migrations/` (e.g., `YYYYMMDD_description.sql`).
2. **Safety Review**: Inspect for security, data integrity, explicit permissions, idempotent definitions (`IF NOT EXISTS`, conditional policies), and verify zero destructive operations (`DROP`, `TRUNCATE`).
3. **Environment Verification**: Strictly identify and verify the target environment before execution. Staging fixtures or unverified migrations must **never** be executed against production environments.
4. **Targeted Application**: Apply the migration to the intended database using approved migration workflows or controlled database console execution.
5. **Direct State Verification**: Verify the actual database state through direct queries (table creation, foreign keys, triggers, role privileges) and execute positive and negative access tests (e.g., verifying anonymous clients can read published records but are strictly blocked from draft/expired records).
6. **Auditable Record**: Record the execution output, SQL verification results, and environment identification in the release readiness plan and commit log.
7. **Strict Invariant**: No SQL migration, policy, trigger, or seed script may be marked as complete if application or direct database verification fails or remains unexecuted. Creating a file or pushing it to Git does not satisfy completion.

### 3.3 Commit Message Guidelines
All commits in this repository must follow the structured format:

```text
<type>(<scope>): <short imperative summary>

### Context
Why this change is needed. What problem or requirement does it address?

### Changes
- Itemized summary of modifications made across modules.
- Architectural, functional, or configuration details.

### Verification
- Detailed list of verification commands executed locally.
- Test and build results confirming zero regression or error.

### Impact / Notes
- Potential side-effects, dependencies updated, or follow-up tasks required.
```

**Allowed Types**: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`.  
**Allowed Scopes**: `auth`, `products`, `catalog`, `frontend`, `backend`, `database`, `infra`, `security`.  
**Emoji Prohibition**: Absolutely no emojis in commit headers or bodies.

---

## 4. Rules for AI Coding Agents

When automated or AI-assisted coding agents operate in this repository:
1. **Three-Tier Truth Discipline**:
   - *Verified current state*: What the codebase demonstrably does today.
   - *Approved decisions*: What TomeSphere is committed to doing.
   - *Proposals*: Ideas requiring human review.
   Never confuse a proposal with an existing implementation.
2. **Never Invent Dependencies**: Do not introduce new NPM packages or third-party libraries without explicit verification that an existing library cannot fulfill the requirement.
3. **Preserve User Changes**: Always check `git status` and `git diff` before modifying files to avoid overwriting uncommitted work.
4. **Preserve Accessibility & Tokens**: Use existing design tokens in `app/globals.css`. Do not introduce Tailwind classes or ad-hoc inline styles.
