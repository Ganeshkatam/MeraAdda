import { NextResponse } from 'next/server';
import { projectService } from '@/server/services/project.service';
import { handleApiError } from '@/server/errors/error-handler';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const project = await projectService.getProjectBySlug(slug);
    return NextResponse.json({ data: project });
  } catch (error) {
    return handleApiError(error);
  }
}
