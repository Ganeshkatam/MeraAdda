import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    domain: 'tomesphere.in',
    framework: 'Next.js App Router (Full-Stack Dynamic)',
    timestamp: new Date().toISOString(),
    owner: 'Katam Ganesh Reddy'
  });
}
