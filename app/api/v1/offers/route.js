import { NextResponse } from 'next/server';
import { offerService } from '@/server/services/offer.service';
import { handleApiError } from '@/server/errors/error-handler';
import { requireAdminRequest } from '@/server/auth/admin-auth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const project_id = searchParams.get('project_id');
    const status = searchParams.get('status') || 'Published';
    const onlyActive = searchParams.get('onlyActive') !== 'false';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : 50;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset'), 10) : 0;

    const offers = await offerService.listOffers({ project_id, status, onlyActive, limit, offset });
    return NextResponse.json({ data: offers });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request) {
  try {
    requireAdminRequest(request);
    const body = await request.json();
    const created = await offerService.createOffer(body);
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
