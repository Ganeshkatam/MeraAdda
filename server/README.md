# TomeSphere Standalone Backend Server

This is the standalone Node.js REST API server for TomeSphere (`tomesphere.in`). It is decoupled from the Next.js frontend and designed to run independently on any external machine (Linux VPS, cloud VM, Docker container, or bare-metal server).

---

## 1. Quick Start on Any Machine

### Option A: Direct Node.js (v18+)

```bash
# 1. Clone repository or copy server files
git clone https://github.com/Ganeshkatam/MeraAdda.git
cd MeraAdda

# 2. Install production dependencies
npm install --omit=dev

# 3. Configure environment variables (optional, defaults provided)
export PORT=5000
export HOST=0.0.0.0
export SUPABASE_URL=https://ibuaiktnkhvqoqxrqnrz.supabase.co
export SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlidWFpa3Rua2h2cW9xeHJxbnJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NjI1MTYsImV4cCI6MjEwODMzODUxNn0.KTfcNZ_uh693CDWo6QUoh7RY6EbKnOW-rPSbDHVlKjk
export CORS_ORIGIN=https://tomesphere.in,https://www.tomesphere.in,http://localhost:3000

# 4. Start the server
npm run server
```

The server will start and listen on `http://0.0.0.0:5000`.

### Option B: Docker

```bash
# Build image
docker build -t tomesphere-api .

# Run container
docker run -d \
  --name tomesphere-api \
  -p 5000:5000 \
  --restart unless-stopped \
  -e PORT=5000 \
  -e HOST=0.0.0.0 \
  -e CORS_ORIGIN="*" \
  tomesphere-api
```

### Option C: Docker Compose

```bash
docker compose up -d
```

### Option D: PM2 Process Manager

```bash
npm install -g pm2
pm2 start server/standalone.js --name tomesphere-backend
pm2 save
pm2 startup
```

---

## 2. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Server uptime, machine hostname, and Supabase health |
| `GET` | `/api/v1/projects` | List all real projects (supports `?category=`, `?status=`, `?q=`) |
| `GET` | `/api/v1/projects/:id` | Get project by ID |
| `POST` | `/api/v1/projects` | Create a new project in Supabase |
| `PUT` | `/api/v1/projects/:id` | Update project by ID |
| `DELETE` | `/api/v1/projects/:id` | Delete project by ID |
| `GET` | `/api/v1/profile` | Get real builder profile (Katam Ganesh Reddy) |
| `PUT` | `/api/v1/profile` | Update profile in Supabase |
| `GET` | `/api/v1/skills` | List all verified skills |
| `GET` | `/api/v1/guestbook` | List visitor guestbook entries |
| `POST` | `/api/v1/guestbook` | Submit a new guestbook note |
| `POST` | `/api/v1/contact` | Submit contact inquiry to Supabase |
| `GET` | `/api/v1/contact` | Retrieve contact inquiries |

---

## 3. Connecting Frontend (Vercel) to This Server

In your Vercel project settings (`tomesphere.in`):

1. Set `NEXT_PUBLIC_API_URL` to your external machine address:
   ```
   NEXT_PUBLIC_API_URL=https://api.tomesphere.in
   ```
   (or `http://YOUR_SERVER_IP:5000`)

2. If using Vercel reverse proxy, set:
   ```
   BACKEND_API_URL=http://YOUR_SERVER_IP:5000
   ```
   The Next.js `next.config.mjs` will automatically route `/api/*` to your external backend.
