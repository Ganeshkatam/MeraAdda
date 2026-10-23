# TomeSphere — Digital Product Studio & Platform

The central digital hub and product platform accessible at [tomesphere.in](https://tomesphere.in) with its backend REST API at [api.tomesphere.in](https://api.tomesphere.in).

## Ecosystem Architecture

- **`tomesphere.in`**: Multi-Page Application (MPA) frontend built with Next.js 16 and React 19.
- **`api.tomesphere.in`**: Standalone Express REST API backend serving data from Supabase PostgreSQL.

## Multi-Page Application Routes

- **`/` (Overview)**: Central overview hub featuring architectural highlights, systems bento portals, and real-time tech marquee.
- **`/products` (Products & Systems)**: Interactive catalog of all 7 production applications with real-time category filtering and live search.
- **`/about` (Architecture & Pillars)**: Engineering philosophy, system design disciplines, and verified technical competencies.
- **`/terminal` (System Shell)**: Interactive developer console executing commands (`whoami`, `bio`, `skills`, `projects`, `contact`, `help`, `clear`).
- **`/guestbook` (Community)**: Real-time visitor message board backed by Supabase.
- **`/contact` (Direct Connection)**: Direct server message endpoint and communication channels.

## Backend Architecture & REST API

The application enforces a strictly decoupled layered architecture:

```
├── app/api/v1/                   # Next.js Route Handlers (Proxy/SSR endpoints)
│   ├── contact/route.js          # POST /api/v1/contact
│   ├── github/activity/route.js  # GET /api/v1/github/activity
│   ├── guestbook/route.js        # GET, POST /api/v1/guestbook
│   ├── profile/route.js          # GET, PUT /api/v1/profile
│   └── projects/                 # GET, POST /api/v1/projects
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
| `/health` | GET | Service health check |
| `/api/v1/projects` | GET | List cataloged projects with status/category filters |
| `/api/v1/projects` | POST | Create a new project (validated schema) |
| `/api/v1/projects/:id` | GET | Retrieve project by ID |
| `/api/v1/projects/:id` | PUT | Update project details |
| `/api/v1/projects/:id` | DELETE | Remove project |
| `/api/v1/guestbook` | GET | Fetch signed guestbook entries |
| `/api/v1/guestbook` | POST | Submit guestbook entry (validated author, message) |
| `/api/v1/contact` | POST | Dispatch contact message with email verification |
| `/api/v1/profile` | GET | Retrieve public profile and metadata |
| `/api/v1/profile` | PUT | Update profile and social configurations |
| `/api/v1/skills` | GET | Retrieve verified technology competencies |

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
