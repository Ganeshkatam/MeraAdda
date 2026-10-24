import { NextResponse } from 'next/server';
import { offerService } from '@/server/services/offer.service';
import { handleApiError } from '@/server/errors/error-handler';
import { requireAdminRequest } from '@/server/auth/admin-auth';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const onlyActive = searchParams.get('onlyActive') !== 'false';
    const offer = await offerService.getOfferBySlug(slug, onlyActive);
    return NextResponse.json({ data: offer });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request, { params }) {
  try {
    requireAdminRequest(request);
    const { slug } = await params;
    const body = await request.json();
    const updated = await offerService.updateOffer(slug, body);
    return NextResponse.json({ data: updated });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request, { params }) {
  try {
    requireAdminRequest(request);
    const { slug } = await params;
    const result = await offerService.deleteOffer(slug);
    return NextResponse.json({ data: result });
  } catch (error) {
    return handleApiError(error);
  }
}
