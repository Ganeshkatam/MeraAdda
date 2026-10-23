import { NextResponse } from 'next/server';
import { githubService } from '@/server/services/github.service';
import { handleApiError } from '@/server/errors/error-handler';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : 6;
    const repos = await githubService.getRecentRepositories(limit);
    return NextResponse.json({ data: repos });
  } catch (error) {
    return handleApiError(error);
  }
}
