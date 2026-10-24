import { NextResponse } from 'next/server';
import { updateService } from '@/server/services/update.service';
import { handleApiError } from '@/server/errors/error-handler';
import { requireAdminRequest } from '@/server/auth/admin-auth';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const update = await updateService.getUpdateBySlug(slug);
    return NextResponse.json({ data: update });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request, { params }) {
  try {
    requireAdminRequest(request);
    const { slug } = await params;
    const body = await request.json();
    const updated = await updateService.updateUpdate(slug, body);
    return NextResponse.json({ data: updated });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request, { params }) {
  try {
    requireAdminRequest(request);
    const { slug } = await params;
    const result = await updateService.deleteUpdate(slug);
    return NextResponse.json({ data: result });
  } catch (error) {
    return handleApiError(error);
  }
}
