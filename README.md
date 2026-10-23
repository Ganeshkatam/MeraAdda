# TomeSphere — Katam Ganesh Reddy Product Studio & Portfolio

The central digital hub and product showcase for **Katam Ganesh Reddy**, accessible at [tomesphere.in](https://tomesphere.in).

## Ecosystem Architecture

- **`tomesphere.in`**: The main platform where visitors can explore Ganesh's software products, systems, and background.
- **`bookgarden.tomesphere.in`**: The dedicated digital book library and reading sanctuary application (BookGarden).

## Key Features

- **Full-Stack Next.js 16 (App Router)**: Dynamic server-rendered architecture with React 19.
- **Flagship Spotlight (BookGarden)**: Featured reading companion and digital book library at [bookgarden.tomesphere.in](https://bookgarden.tomesphere.in).
- **Live GitHub Activity Stream**: Dynamic API integration hydrating public repositories directly from GitHub.
- **Real-Time Visitor Guestbook**: Interactive message board signed dynamically using Next.js Server Actions.
- **Direct Server Messaging**: Dynamic contact form processed server-side with input validation.
- **Developer Dossier Terminal**: Interactive shell executing commands (`whoami`, `bio`, `skills`, `projects`, `flagship`, `library`, `tomesphere`, `live`, `contact`).
- **Studio Control Room**: Built-in dashboard for cataloging projects and profile details.
- **High-End Design System**: Obsidian dark palette with glassmorphism, ambient lighting orbs, and light mode switch.

## Backend Architecture & API (Day 1 Decoupled Design)

This application is built with a strictly decoupled layered architecture rather than an entangled monolith:

```
├── app/api/v1/                   # Transport & HTTP Route Handlers
│   ├── contact/route.js          # POST /api/v1/contact
│   ├── github/activity/route.js  # GET /api/v1/github/activity
│   ├── guestbook/route.js        # GET, POST /api/v1/guestbook
│   ├── profile/route.js          # GET, PUT /api/v1/profile
│   └── projects/
│       ├── route.js              # GET, POST /api/v1/projects
│       └── [id]/route.js         # GET, PUT, DELETE /api/v1/projects/:id
├── server/
│   ├── errors/                   # ApiError class hierarchy & error response formatter
│   ├── validators/               # Boundary schema and input validation
│   ├── services/                 # Pure domain business logic
│   ├── repositories/             # Persistence and data access abstraction
│   └── config/                   # Domain constants and application settings
└── lib/
    └── api-client.js             # Typed frontend API client communicating with backend
```

### API Endpoints (`/api/v1`)

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | GET | Service health check |
| `/api/v1/projects` | GET | List cataloged projects with status/category filters |
| `/api/v1/projects` | POST | Create a new project (validated schema) |
| `/api/v1/projects/:id` | GET | Retrieve project by ID |
| `/api/v1/projects/:id` | PUT | Update project details |
| `/api/v1/projects/:id` | DELETE | Remove project |
| `/api/v1/guestbook` | GET | Fetch signed guestbook entries |
| `/api/v1/guestbook` | POST | Submit guestbook entry (validated author, message) |
| `/api/v1/contact` | POST | Dispatch contact message with email verification |
| `/api/v1/profile` | GET | Retrieve public profile and bio metadata |
| `/api/v1/profile` | PUT | Update profile and social configurations |
| `/api/v1/github/activity` | GET | Real-time GitHub repositories for Ganeshkatam |

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

## Database Schema (Supabase Postgres)

The backend connects to a dedicated Supabase PostgreSQL database (`MyPortfolio`) with Row Level Security (RLS) policies:

- **`projects`**: Real software products with catalog tags, live URLs, repository links, categories, and showcase flags (`proj_bookgarden`, `proj_streetcraft`, `proj_cowatch`, `proj_fitmirror`, `proj_mystays`, `proj_gk_cli`, `proj_calclens`).
- **`profile`**: Authenticated developer identity, contact information, domain routing, and social metadata.
- **`guestbook`**: Visitor entries signed in real time.
- **`contacts`**: Contact inquiries submitted through the portfolio interface.

Environment configuration:
```sh
NEXT_PUBLIC_SUPABASE_URL=https://ibuaiktnkhvqoqxrqnrz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```


## Run Locally

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

To produce an optimized production build:

```sh
npm run build
npm run start
```

