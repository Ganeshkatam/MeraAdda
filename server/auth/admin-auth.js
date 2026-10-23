import { ForbiddenError } from '../errors/api-error.js';

/**
 * Enforces admin authorization for sensitive mutation operations (create, update, delete).
 * Normal website visitors have zero editing permissions.
 */
export function verifyAdminAuth(headers) {
  const secret = process.env.ADMIN_SECRET || process.env.ADMIN_KEY;
  if (!secret) {
    // If no secret key is set up on the host, strictly deny mutations to prevent unauthenticated edits
    throw new ForbiddenError('Administrative operations are disabled on this instance.');
  }

  const adminHeader = headers['x-admin-key'] || headers['x-admin-secret'];
  const authHeader = headers['authorization'] || headers['Authorization'];

  if (adminHeader && adminHeader === secret) {
    return true;
  }

  if (authHeader) {
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();
    if (token === secret) {
      return true;
    }
  }

  throw new ForbiddenError('Administrative privileges required to perform this action.');
}

/**
 * Express middleware for REST API server
 */
export function requireAdminMiddleware(req, res, next) {
  try {
    verifyAdminAuth(req.headers);
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Next.js Route Handler guard
 */
export function requireAdminRequest(request) {
  const headersObj = {};
  if (request && request.headers) {
    if (typeof request.headers.forEach === 'function') {
      request.headers.forEach((value, key) => {
        headersObj[key.toLowerCase()] = value;
      });
    } else if (typeof request.headers.get === 'function') {
      headersObj['x-admin-key'] = request.headers.get('x-admin-key');
      headersObj['x-admin-secret'] = request.headers.get('x-admin-secret');
      headersObj['authorization'] = request.headers.get('authorization');
    }
  }
  return verifyAdminAuth(headersObj);
}
