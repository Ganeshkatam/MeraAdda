import { NextResponse } from 'next/server';
import { projectService } from '@/server/services/project.service';
import { handleApiError } from '@/server/errors/error-handler';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');
    const query = searchParams.get('q');

    const projects = await projectService.listProjects({ category, status, featured, query });
    return NextResponse.json({ data: projects });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const created = await projectService.createProject(body);
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
