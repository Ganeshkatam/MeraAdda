import { NextResponse } from 'next/server';
import { guestbookService } from '@/server/services/guestbook.service';
import { handleApiError } from '@/server/errors/error-handler';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : 50;
    const entries = await guestbookService.getEntries({ limit });
    return NextResponse.json({ data: entries });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const created = await guestbookService.addEntry(body);
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
