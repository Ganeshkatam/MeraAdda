import { TooManyRequestsError } from '../errors/api-error.js';

class MemoryRateLimiter {
  constructor(cleanupIntervalMs = 60000) {
    this.hits = new Map();
    // Periodic garbage collection to prevent memory leaks from one-off IPs
    this.cleanupTimer = setInterval(() => this.cleanup(), cleanupIntervalMs);
    if (this.cleanupTimer.unref) {
      this.cleanupTimer.unref();
    }
  }

  cleanup() {
    const now = Date.now();
    for (const [key, record] of this.hits.entries()) {
      record.timestamps = record.timestamps.filter(ts => ts > now - record.windowMs);
      if (record.timestamps.length === 0) {
        this.hits.delete(key);
      }
    }
  }

  consume(key, windowMs, max) {
    const now = Date.now();
    let record = this.hits.get(key);

    if (!record) {
      record = { windowMs, timestamps: [] };
      this.hits.set(key, record);
    }

    record.windowMs = windowMs;
    // Filter timestamps within the current sliding window
    record.timestamps = record.timestamps.filter(ts => ts > now - windowMs);

    if (record.timestamps.length >= max) {
      const oldest = record.timestamps[0];
      const resetTime = Math.ceil((oldest + windowMs) / 1000);
      const retryAfter = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));

      return {
        allowed: false,
        limit: max,
        remaining: 0,
        resetTime,
        retryAfter
      };
    }

    record.timestamps.push(now);
    const remaining = Math.max(0, max - record.timestamps.length);
    const resetTime = Math.ceil((now + windowMs) / 1000);

    return {
      allowed: true,
      limit: max,
      remaining,
      resetTime,
      retryAfter: 0
    };
  }

  reset(key) {
    if (key) {
      this.hits.delete(key);
    } else {
      this.hits.clear();
    }
  }
}

export const defaultLimiter = new MemoryRateLimiter();

export function getClientIp(req) {
  // Support both Express req and Next.js Web Request
  if (req.headers && typeof req.headers.get === 'function') {
    const forwarded = req.headers.get('x-forwarded-for');
    if (forwarded) return forwarded.split(',')[0].trim();
    return req.headers.get('x-real-ip') || '127.0.0.1';
  }

  if (req.headers) {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
    return req.headers['x-real-ip'] || req.socket?.remoteAddress || '127.0.0.1';
  }

  return '127.0.0.1';
}

/**
 * Express middleware for rate limiting
 */
export function rateLimitMiddleware({
  windowMs = 60 * 1000,
  max = 5,
  keyPrefix = 'rl',
  limiter = defaultLimiter
} = {}) {
  return (req, res, next) => {
    const ip = getClientIp(req);
    const key = `${keyPrefix}:${ip}`;
    const result = limiter.consume(key, windowMs, max);

    res.setHeader('X-RateLimit-Limit', String(result.limit));
    res.setHeader('X-RateLimit-Remaining', String(result.remaining));
    res.setHeader('X-RateLimit-Reset', String(result.resetTime));

    if (!result.allowed) {
      res.setHeader('Retry-After', String(result.retryAfter));
      return next(
        new TooManyRequestsError(
          `Too many submissions from this IP. Please wait ${result.retryAfter} seconds before retrying.`,
          result.retryAfter
        )
      );
    }

    next();
  };
}

/**
 * Next.js Route Handler rate limit check
 */
export function checkRateLimit(request, {
  windowMs = 60 * 1000,
  max = 5,
  keyPrefix = 'rl',
  limiter = defaultLimiter
} = {}) {
  const ip = getClientIp(request);
  const key = `${keyPrefix}:${ip}`;
  const result = limiter.consume(key, windowMs, max);

  const headers = {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(result.resetTime)
  };

  if (!result.allowed) {
    headers['Retry-After'] = String(result.retryAfter);
    throw new TooManyRequestsError(
      `Too many submissions from this IP. Please wait ${result.retryAfter} seconds before retrying.`,
      result.retryAfter
    );
  }

  return { headers };
}
