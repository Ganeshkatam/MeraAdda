import { NextResponse } from 'next/server';

export async function GET() {
  const commit = process.env.VERCEL_GIT_COMMIT_SHA
    ? process.env.VERCEL_GIT_COMMIT_SHA.substring(0, 7)
    : process.env.GITHUB_SHA
      ? process.env.GITHUB_SHA.substring(0, 7)
      : 'production';

  return NextResponse.json({
    status: 'ok',
    service: 'TomeSphere Platform',
    commit,
    timestamp: new Date().toISOString()
  });
}
