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
    const { data, error } = await supabase
      .from('profile')
      .upsert({
        id: 'primary',
        ...updates,
        updated_at: new Date().toISOString()
      })
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
