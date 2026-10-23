import { store } from './memory-store';

export class ProfileRepository {
  async getProfile() {
    return { ...store.profile };
  }

  async updateProfile(updates) {
    store.profile = {
      ...store.profile,
      ...updates
    };
    return { ...store.profile };
  }
}

export const profileRepository = new ProfileRepository();
