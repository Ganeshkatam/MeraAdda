import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'TomeSphere Platform',
    timestamp: new Date().toISOString()
  });
}
