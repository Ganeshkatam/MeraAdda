import { profileRepository } from '../repositories/profile.repository';

export class ProfileService {
  async getProfile() {
    return profileRepository.getProfile();
  }

  async updateProfile(updates) {
    return profileRepository.updateProfile(updates);
  }
}

export const profileService = new ProfileService();
