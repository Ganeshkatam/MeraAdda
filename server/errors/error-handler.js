import { NextResponse } from 'next/server';
import { ApiError } from './api-error.js';

export function handleApiError(error) {
  if (error instanceof ApiError) {
    const response = NextResponse.json(
      {
        error: {
          code: error.code,
          message: error.message,
          ...(error.details ? { details: error.details } : {})
        }
      },
      { status: error.statusCode }
    );
    if (error.statusCode === 429 && error.details?.retryAfter) {
      response.headers.set('Retry-After', String(error.details.retryAfter));
    }
    return response;
  }

  console.error(error);

  return NextResponse.json(
    {
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected internal error occurred. Please try again later.'
      }
    },
    { status: 500 }
  );
}

export const formatErrorResponse = handleApiError;
