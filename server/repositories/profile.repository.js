import { supabase } from '../config/supabase.js';
import { ApiError } from '../errors/api-error.js';

export class ProfileRepository {
  async getProfile() {
    const { data, error } = await supabase
      .from('profile')
      .select('name, title, domain, location, email, bio, intro, socials, is_available')
      .eq('id', 'primary')
      .single();

    if (error || !data) {
      throw new ApiError(`Database error fetching profile: ${error?.message || 'Profile record not found'}`, 500, 'DATABASE_ERROR');
    }

    return {
      name: data.name,
      title: data.title,
      domain: data.domain,
      location: data.location || 'India',
      email: data.email,
      bio: data.bio || '',
      intro: data.intro || '',
      socials: data.socials || {},
      is_available: Boolean(data.is_available)
    };
  }

  async updateProfile(updates) {
    const safePayload = {
      id: 'primary',
      updated_at: new Date().toISOString()
    };
    if (typeof updates.name === 'string') safePayload.name = updates.name.trim();
    if (typeof updates.title === 'string') safePayload.title = updates.title.trim();
    if (typeof updates.domain === 'string') safePayload.domain = updates.domain.trim();
    if (typeof updates.location === 'string') safePayload.location = updates.location.trim();
    if (typeof updates.email === 'string') safePayload.email = updates.email.trim();
    if (typeof updates.bio === 'string') safePayload.bio = updates.bio.trim();
    if (typeof updates.intro === 'string') safePayload.intro = updates.intro.trim();
    if (typeof updates.avatar_url === 'string') safePayload.avatar_url = updates.avatar_url.trim();
    if (updates.socials && typeof updates.socials === 'object' && !Array.isArray(updates.socials)) {
      safePayload.socials = updates.socials;
    }
    if (updates.is_available !== undefined) safePayload.is_available = Boolean(updates.is_available);

    const { data, error } = await supabase
      .from('profile')
      .upsert(safePayload)
      .select('name, title, domain, location, email, bio, intro, socials, is_available')
      .single();

    if (error || !data) {
      throw new ApiError(`Database error updating profile: ${error?.message || 'Profile update failed'}`, 500, 'DATABASE_ERROR');
    }

    return {
      name: data.name,
      title: data.title,
      domain: data.domain,
      location: data.location || 'India',
      email: data.email,
      bio: data.bio || '',
      intro: data.intro || '',
      socials: data.socials || {},
      is_available: Boolean(data.is_available)
    };
  }
}

export const profileRepository = new ProfileRepository();
