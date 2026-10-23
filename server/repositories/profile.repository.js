import { supabase } from '@/lib/supabase';
import { store } from './memory-store';

export class ProfileRepository {
  async getProfile() {
    try {
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .eq('id', 'primary')
        .single();

      if (!error && data) {
        return {
          name: data.name,
          title: data.title,
          domain: data.domain,
          location: data.location || 'India',
          email: data.email,
          bio: data.bio || store.profile.bio,
          intro: data.intro || store.profile.intro,
          socials: data.socials || store.profile.socials
        };
      }
    } catch (e) {
      console.warn('Supabase profile fetch failed, using fallback:', e.message);
    }

    return { ...store.profile };
  }

  async updateProfile(updates) {
    try {
      const { data, error } = await supabase
        .from('profile')
        .upsert({
          id: 'primary',
          ...updates,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (!error && data) {
        store.profile = { ...store.profile, ...data };
        return { ...store.profile };
      }
    } catch (e) {
      console.warn('Supabase profile update failed:', e.message);
    }

    store.profile = {
      ...store.profile,
      ...updates
    };
    return { ...store.profile };
  }
}

export const profileRepository = new ProfileRepository();
