import { NextResponse } from 'next/server';
import { updateService } from '@/server/services/update.service';
import { handleApiError } from '@/server/errors/error-handler';
import { requireAdminRequest } from '@/server/auth/admin-auth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const project_id = searchParams.get('project_id');
    const status = searchParams.get('status') || 'Published';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : 50;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset'), 10) : 0;

    const updates = await updateService.listUpdates({ project_id, status, limit, offset });
    return NextResponse.json({ data: updates });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request) {
  try {
    requireAdminRequest(request);
    const body = await request.json();
    const created = await updateService.createUpdate(body);
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
