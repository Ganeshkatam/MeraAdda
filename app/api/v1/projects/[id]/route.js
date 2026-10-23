import { NextResponse } from 'next/server';
import { projectService } from '@/server/services/project.service';
import { handleApiError } from '@/server/errors/error-handler';
import { requireAdminRequest } from '@/server/auth/admin-auth';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const project = await projectService.getProjectById(id);
    return NextResponse.json({ data: project });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request, { params }) {
  try {
    requireAdminRequest(request);
    const { id } = await params;
    const body = await request.json();
    const updated = await projectService.updateProject(id, body);
    return NextResponse.json({ data: updated });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request, { params }) {
  try {
    requireAdminRequest(request);
    const { id } = await params;
    await projectService.deleteProject(id);
    return NextResponse.json({ success: true, message: `Project ${id} deleted successfully` });
  } catch (error) {
    return handleApiError(error);
  }
}
