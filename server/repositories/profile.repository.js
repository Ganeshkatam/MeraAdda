import { supabase } from '../config/supabase.js';
import { ApiError } from '../errors/api-error.js';

export class ProfileRepository {
  async getProfile() {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
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
      bio: data.bio,
      intro: data.intro,
      socials: data.socials || {}
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
      .select()
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
      bio: data.bio,
      intro: data.intro,
      socials: data.socials || {}
    };
  }
}

export const profileRepository = new ProfileRepository();
