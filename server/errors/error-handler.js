import { NextResponse } from 'next/server';
import { ApiError } from './api-error';

export function handleApiError(error) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: {
          code: error.code,
          message: error.message,
          ...(error.details ? { details: error.details } : {})
        }
      },
      { status: error.statusCode }
    );
  }

  console.error('[API Unhandled Error]:', error);

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
