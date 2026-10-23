import express from 'express';
import cors from 'cors';
import os from 'os';
import { projectService } from './services/project.service.js';
import { profileService } from './services/profile.service.js';
import { guestbookService } from './services/guestbook.service.js';
import { contactService } from './services/contact.service.js';
import { skillService } from './services/skill.service.js';
import { ApiError } from './errors/api-error.js';
import { supabase } from './config/supabase.js';
import { requireAdminMiddleware } from './auth/admin-auth.js';

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Global CORS - allows requests from frontend machine / Vercel domain
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(s => s.trim())
  : '*';

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'x-admin-key', 'x-admin-secret']
}));

app.use(express.json());

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Health Check Endpoints
const healthHandler = async (req, res) => {
  let dbStatus = 'connected';
  let dbError = null;

  try {
    const { error } = await supabase.from('projects').select('id', { count: 'exact', head: true });
    if (error) {
      dbStatus = 'degraded';
      dbError = error.message;
    }
  } catch (err) {
    dbStatus = 'disconnected';
    dbError = err.message;
  }

  res.status(dbStatus === 'connected' ? 200 : 503).json({
    status: dbStatus === 'connected' ? 'ok' : 'error',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    hostname: os.hostname(),
    platform: process.platform,
    nodeVersion: process.version,
    database: {
      provider: 'Supabase PostgreSQL',
      status: dbStatus,
      ...(dbError ? { error: dbError } : {})
    }
  });
};

app.get('/health', healthHandler);
app.get('/api/health', healthHandler);

// Projects Endpoints
app.get('/api/v1/projects', async (req, res, next) => {
  try {
    const projects = await projectService.listProjects(req.query);
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    next(err);
  }
});

app.get('/api/v1/projects/:id', async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
});

app.post('/api/v1/projects', requireAdminMiddleware, async (req, res, next) => {
  try {
    const created = await projectService.createProject(req.body);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
});

app.put('/api/v1/projects/:id', requireAdminMiddleware, async (req, res, next) => {
  try {
    const updated = await projectService.updateProject(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

app.delete('/api/v1/projects/:id', requireAdminMiddleware, async (req, res, next) => {
  try {
    await projectService.deleteProject(req.params.id);
    res.json({ success: true, message: `Project ${req.params.id} deleted successfully` });
  } catch (err) {
    next(err);
  }
});

// Profile Endpoints
app.get('/api/v1/profile', async (req, res, next) => {
  try {
    const profile = await profileService.getProfile();
    res.json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
});

app.put('/api/v1/profile', requireAdminMiddleware, async (req, res, next) => {
  try {
    const profile = await profileService.updateProfile(req.body);
    res.json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
});

// Skills Endpoints
app.get('/api/v1/skills', async (req, res, next) => {
  try {
    const skills = await skillService.listSkills(req.query);
    res.json({ success: true, count: skills.length, data: skills });
  } catch (err) {
    next(err);
  }
});

// Guestbook Endpoints
app.get('/api/v1/guestbook', async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 50;
    const entries = await guestbookService.getEntries({ limit });
    res.json({ success: true, count: entries.length, data: entries });
  } catch (err) {
    next(err);
  }
});

app.post('/api/v1/guestbook', async (req, res, next) => {
  try {
    const entry = await guestbookService.addEntry(req.body);
    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    next(err);
  }
});

// Contact Endpoints
app.post('/api/v1/contact', async (req, res, next) => {
  try {
    const response = await contactService.processInquiry(req.body);
    res.status(201).json({ success: true, data: response });
  } catch (err) {
    next(err);
  }
});

app.get('/api/v1/contact', async (req, res, next) => {
  try {
    const inquiries = await contactService.listInquiries();
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (err) {
    next(err);
  }
});

// 404 Route Catch-All
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `Endpoint ${req.method} ${req.originalUrl} does not exist.`
    }
  });
});

// Central Error Handler Middleware
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        ...(err.details ? { details: err.details } : {})
      }
    });
  }

  console.error('[Standalone API Error]:', err);
  res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected error occurred.'
    }
  });
});

// Start Server
const server = app.listen(PORT, HOST, () => {
  console.log('------------------------------------------------------------');
  console.log(`TomeSphere Backend Server is running on external host`);
  console.log(`Listening on: http://${HOST}:${PORT}`);
  console.log(`Machine Hostname: ${os.hostname()}`);
  console.log(`Platform: ${process.platform} (${process.arch})`);
  console.log(`Health Check: http://${HOST}:${PORT}/health`);
  console.log(`API Base: http://${HOST}:${PORT}/api/v1`);
  console.log('------------------------------------------------------------');
});

// Process signal handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => console.log('HTTP server closed'));
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => process.exit(0));
});

export default app;
