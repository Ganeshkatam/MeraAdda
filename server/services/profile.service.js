import { profileRepository } from '../repositories/profile.repository.js';
import { validateProfileUpdatePayload } from '../validators/profile.validator.js';

export class ProfileService {
  async getProfile() {
    return profileRepository.getProfile();
  }

  async updateProfile(updates) {
    const validated = validateProfileUpdatePayload(updates);
    return profileRepository.updateProfile(validated);
  }
}

export const profileService = new ProfileService();
