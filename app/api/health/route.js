import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    domain: 'tomesphere.in',
    timestamp: new Date().toISOString()
  });
}
