import { guestbookRepository } from '../repositories/guestbook.repository.js';
import { validateGuestbookPayload } from '../validators/guestbook.validator.js';

export class GuestbookService {
  async getEntries(options = {}) {
    return guestbookRepository.findAll(options);
  }

  async addEntry(rawData) {
    const validated = validateGuestbookPayload(rawData);
    return guestbookRepository.create(validated);
  }
}

export const guestbookService = new GuestbookService();
