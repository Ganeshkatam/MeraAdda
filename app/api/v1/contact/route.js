import { NextResponse } from 'next/server';
import { contactService } from '@/server/services/contact.service';
import { handleApiError } from '@/server/errors/error-handler';

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await contactService.processInquiry(body);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
