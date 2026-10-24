# TomeSphere Standalone Backend Server

This is the standalone Node.js REST API server for TomeSphere (`tomesphere.in`). It is decoupled from the Next.js frontend and designed to run independently on any external machine (Linux VPS, cloud VM, Docker container, or bare-metal server).

---

## 1. Deploy on Render (Recommended)

Render runs this backend server as a decoupled Web Service:

### Option A: Via Blueprint (`render.yaml`)
1. Go to [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** -> **Blueprint**.
3. Connect your repository `Ganeshkatam/MeraAdda`.
4. Render detects `render.yaml` automatically and configures:
   - **Name**: `tomesphere-backend`
   - **Build Command**: `npm install --omit=dev`
   - **Start Command**: `npm run server`
   - **Health Check**: `/health`
5. Click **Apply**. Render will deploy your service and give you a public URL (e.g., `https://tomesphere-backend.onrender.com`).

### Option B: Manual Web Service on Render
1. Click **New +** -> **Web Service**.
2. Connect `Ganeshkatam/MeraAdda`.
3. Configure:
   - **Runtime**: `Node`
   - **Build Command**: `npm install --omit=dev`
   - **Start Command**: `npm run server`
   - **Health Check Path**: `/health`
4. In **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `HOST`: `0.0.0.0`
   - `SUPABASE_URL`: `https://ibuaiktnkhvqoqxrqnrz.supabase.co`
   - `SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlidWFpa3Rua2h2cW9xeHJxbnJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NjI1MTYsImV4cCI6MjEwODMzODUxNn0.KTfcNZ_uh693CDWo6QUoh7RY6EbKnOW-rPSbDHVlKjk`
   - `CORS_ORIGIN`: `https://tomesphere.in,https://www.tomesphere.in,http://localhost:3000`

---

## 2. Quick Start on Any Other Machine

### Option C: Direct Node.js (v18+)

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
pm2 start server/server.js --name tomesphere-backend
pm2 save
pm2 startup
```

---

## 2. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Server process uptime and liveness probe |
| `GET` | `/api/v1/projects` | List all real projects (supports `?category=`, `?status=`, `?q=`) |
| `GET` | `/api/v1/projects/:id` | Get project by ID |
| `POST` | `/api/v1/projects` | Create a new project in Supabase |
| `PUT` | `/api/v1/projects/:id` | Update project by ID |
| `DELETE` | `/api/v1/projects/:id` | Delete project by ID |
| `GET` | `/api/v1/profile` | Get real builder profile (Katam Ganesh Reddy) |
| `PUT` | `/api/v1/profile` | Update profile in Supabase |
| `GET` | `/api/v1/updates` | List published product updates and changelogs |
| `GET` | `/api/v1/updates/slug/:slug` | Retrieve update by permanent slug |
| `GET` | `/api/v1/offers` | List active product promotions and benefits |
| `GET` | `/api/v1/offers/slug/:slug` | Retrieve offer by permanent slug |
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
