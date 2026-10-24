# TomeSphere — Operations, Environments, Deployment & Monitoring

**Document Type:** Operations & Deployment Manual  
**Owner:** DevOps / Site Reliability Lead  
**Status:** Draft  
**Last Reviewed:** 2026-10-24  
**Dependencies:** `docs/04-architecture/01-system-architecture-boundaries.md`  

---

## 1. Environments Overview

TomeSphere operates across three distinct operational environments:

| Environment | Purpose | Hosting Target | Hostnames / Access | Configuration |
| :--- | :--- | :--- | :--- | :--- |
| **Local Development** | Engineering, local tests, SSR validation | Local developer machine | `http://127.0.0.1:3000` (Next.js), `http://127.0.0.1:5000` (Express) | `.env.local` |
| **Preview / Staging** | Pull request testing (Vercel builds intentionally suppressed) | Local / Branch containers | Ephemeral testing | Controlled by `vercel.json` |
| **Production** | Live user-facing platform | Vercel (Frontend), Render (Backend API), Supabase (Database) | `https://www.tomesphere.in`, `https://api.tomesphere.in` | Encrypted secrets in platform dashboards |

---

## 2. CI/CD & Deployment Procedures

### 2.1 Frontend Delivery (Vercel)
- **Production Trigger**: Merges to `main` branch.
- **Build Command**: `npm run build` (invoking `next build`).
- **Preview Suppression Strategy**: Configured via `vercel.json`:
  ```json
  {
    "git": {
      "deploymentEnabled": {
        "main": true
      }
    },
    "ignoreCommand": "if [ \"$VERCEL_ENV\" = \"preview\" ]; then exit 0; else exit 1; fi"
  }
  ```
  Verified by `tests/security.test.js` to ensure experimental branches do not deploy public preview URLs.

### 2.2 Backend Delivery (Render / Docker)
- **Production Trigger**: Auto-deployed on git push to `main`.
- **Container Strategy**: `Dockerfile` utilizing Node.js 20/22 slim image.
- **Port Binding**: Binds to `0.0.0.0` on port specified by `PORT` environment variable (defaults to 5000).

---

## 3. Observability & Health Probes

### 3.1 Health Endpoints
- **Express Backend Probe**: `GET /health` and `GET /api/health`
  - Returns `HTTP 200 OK` with JSON payload:
    ```json
    {
      "status": "ok",
      "service": "TomeSphere REST API Server",
      "commit": "4abd44d",
      "timestamp": "2026-10-24T13:30:00.000Z"
    }
    ```
  - Independent of database connectivity so container orchestrators do not flap if DB undergoes brief maintenance.

### 3.2 Request Logging
- Every HTTP request to Express is logged to stdout:
  `[ISO-Timestamp] METHOD /path STATUS_CODE (duration_ms)`
- Sensitive tokens (`x-admin-key`, `Authorization`) are stripped from log outputs.

---

## 4. Incident Response & Severity Matrix

| Severity Level | Definition | Response Target | Example Incident |
| :--- | :--- | :--- | :--- |
| **SEV-1 (Critical)** | Core catalog or homepage completely down. | Immediate (< 30 min) | Database unreachable, Next.js build crash on production. |
| **SEV-2 (Major)** | Core discovery degraded or admin mutations failing. | < 2 hours | Search filter failing, admin cannot update projects. |
| **SEV-3 (Minor)** | Non-blocking visual defect or transient slow response. | < 24 hours | Misaligned badge, minor typo in documentation. |
