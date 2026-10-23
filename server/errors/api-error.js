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

export class MethodNotAllowedError extends ApiError {
  constructor(method = '') {
    super(`HTTP Method ${method} not allowed`, 405, 'METHOD_NOT_ALLOWED');
  }
}
