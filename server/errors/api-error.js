export class ApiError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR', details = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Invalid request payload', details = null) {
    super(message, 400, 'BAD_REQUEST', details);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class ValidationError extends ApiError {
  constructor(message = 'Validation failed', details = null) {
    super(message, 422, 'VALIDATION_ERROR', details);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Administrative privileges required') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class MethodNotAllowedError extends ApiError {
  constructor(method = '') {
    super(`HTTP Method ${method} not allowed`, 405, 'METHOD_NOT_ALLOWED');
  }
}

export class TooManyRequestsError extends ApiError {
  constructor(message = 'Too many requests. Please wait before retrying.', retryAfter = 60) {
    super(message, 429, 'RATE_LIMIT_EXCEEDED', { retryAfter });
    this.retryAfter = retryAfter;
  }
}

