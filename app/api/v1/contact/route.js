import { NextResponse } from 'next/server';
import { contactService } from '@/server/services/contact.service';
import { handleApiError } from '@/server/errors/error-handler';
import { checkRateLimit } from '@/server/middleware/rate-limiter';

export async function POST(request) {
  try {
    const { headers } = checkRateLimit(request, {
      windowMs: 15 * 60 * 1000,
      max: 5,
      keyPrefix: 'contact'
    });
    const body = await request.json();
    const result = await contactService.processInquiry(body);
    return NextResponse.json({ data: result }, { status: 200, headers });
  } catch (error) {
    return handleApiError(error);
  }
}
