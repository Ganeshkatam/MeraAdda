import { NextResponse } from 'next/server';
import { skillService } from '@/server/services/skill.service';
import { handleApiError } from '@/server/errors/error-handler';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const skills = await skillService.listSkills({ category });
    return NextResponse.json({ success: true, data: skills });
  } catch (err) {
    return handleApiError(err);
  }
}
