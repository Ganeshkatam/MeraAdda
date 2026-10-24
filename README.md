# TomeSphere — Central Digital Product Hub & Discovery Platform

The central digital hub and product discovery platform accessible at [tomesphere.in](https://tomesphere.in) with its backend REST API at [api.tomesphere.in](https://api.tomesphere.in).

## Ecosystem Architecture

- **`tomesphere.in`**: Frontend built with Next.js 16 and React 19 serving the public product discovery platform.
- **`api.tomesphere.in`**: Standalone Express 5 REST API backend serving data from Supabase PostgreSQL.
- **`docs/`**: Canonical 11-part product blueprint, architecture decision records (ADR-001 through ADR-006), and operating manual.

## Multi-Page Application Routes

- **`/` (Overview)**: Central discovery dashboard featuring cinematic dark hero, featured applications spotlight, and ecosystem pulse.
- **`/products` (Directory)**: Interactive catalog of production applications with real-time category filtering and search.
- **`/products/[slug]` (Product Details)**: Canonical product detail pages with verified capabilities, technical specifications, and outbound launch links.
- **`/about` (Architecture & Vision)**: Engineering philosophy, system design disciplines, and platform principles.
- **`/guestbook` (Community)**: Visitor message board backed by Supabase with moderation workflow.
- **`/contact` (Direct Connection)**: Direct inquiry endpoint with write-only database policies.

## Backend Architecture & REST API

The application enforces a strictly decoupled layered architecture:

```
├── app/api/v1/                   # Next.js Route Handlers (Proxy/SSR endpoints)
├── server/                       # Standalone Backend Module (api.tomesphere.in)
│   ├── server.js                 # Standalone Express Server Entry Point
│   ├── package.json              # Standalone Dependencies & Scripts
│   ├── errors/                   # ApiError class hierarchy & error response formatter
│   ├── validators/               # Schema and input validation
│   ├── services/                 # Domain business logic
│   ├── repositories/             # Supabase PostgreSQL persistence abstraction
│   └── config/                   # Constants and environment configuration
└── lib/
    └── api-client.js             # Typed frontend API client communicating with backend
```

### API Endpoints (`/api/v1`)

| Endpoint | Method | Description |
|---|---|---|
| `/health` | GET | Service liveness health check |
| `/api/v1/projects` | GET | List cataloged projects with status/category filters |
| `/api/v1/projects` | POST | Create a new project (requires admin authentication) |
| `/api/v1/projects/slug/:slug` | GET | Retrieve project by permanent URL slug |
| `/api/v1/projects/:id` | GET | Retrieve project by ID (with fallback to slug) |
| `/api/v1/projects/:id` | PUT | Update project details (requires admin authentication) |
| `/api/v1/projects/:id` | DELETE | Remove project (requires admin authentication) |
| `/api/v1/guestbook` | GET | Fetch approved guestbook entries |
| `/api/v1/guestbook` | POST | Submit guestbook entry (defaults to pending moderation) |
| `/api/v1/contact` | POST | Dispatch contact message with strict boundary validation |
| `/api/v1/profile` | GET | Retrieve public profile and metadata |
| `/api/v1/profile` | PUT | Update profile configuration (requires admin authentication) |
| `/api/v1/updates` | GET | Retrieve published product updates and changelogs |
| `/api/v1/offers` | GET | Retrieve active product promotional offers |

### Standard Error Contract

All API error responses adhere to a stable structured contract:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed: email must be a valid email address.",
    "details": ["email must be a valid email address"]
  }
}
```

## Architecture & Authority Boundaries

The application enforces strict separation of concerns and database access boundaries:

- **Server (Sole Database Authority)**: The standalone Node.js server (`server/server.js`) is the sole authority for all database operations. It connects to Supabase PostgreSQL using server-only environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`).
- **Frontend (Server Calls Only)**: The frontend has zero direct database credentials. It communicates exclusively with the backend server via HTTP endpoints (`NEXT_PUBLIC_API_URL` or `/api/v1/*`).

## Run Locally

```sh
# Run Next.js Frontend
npm install
npm run dev

# Run Standalone Backend Server
cd server
npm install
npm start
```

To produce an optimized production build:

```sh
npm run build
```
