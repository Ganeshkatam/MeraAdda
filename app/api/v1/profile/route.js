import { NextResponse } from 'next/server';
import { profileService } from '@/server/services/profile.service';
import { handleApiError } from '@/server/errors/error-handler';
import { requireAdminRequest } from '@/server/auth/admin-auth';

export async function GET() {
  try {
    const profile = await profileService.getProfile();
    return NextResponse.json({ data: profile });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request) {
  try {
    requireAdminRequest(request);
    const body = await request.json();
    const updated = await profileService.updateProfile(body);
    return NextResponse.json({ data: updated });
  } catch (error) {
    return handleApiError(error);
  }
}
