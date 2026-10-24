import { offerRepository } from '../repositories/offer.repository.js';
import { validateOfferPayload } from '../validators/offer.validator.js';
import { NotFoundError } from '../errors/api-error.js';

export class OfferService {
  async listOffers(options = {}) {
    return offerRepository.findAll(options);
  }

  async getOfferBySlug(slug, onlyActive = true) {
    if (!slug) {
      throw new NotFoundError('Offer slug is required');
    }
    const offer = await offerRepository.findBySlug(slug, onlyActive);
    if (!offer) {
      throw new NotFoundError(`Active offer with slug '${slug}' was not found`);
    }
    return offer;
  }

  async createOffer(data) {
    const validated = validateOfferPayload(data, false);
    return offerRepository.create(validated);
  }

  async updateOffer(id, data) {
    if (!id) {
      throw new NotFoundError('Offer ID is required');
    }
    const existing = await offerRepository.findById(id);
    if (!existing) {
      throw new NotFoundError(`Offer with ID '${id}' was not found`);
    }
    const validated = validateOfferPayload(data, true);
    return offerRepository.update(id, validated);
  }

  async deleteOffer(id) {
    if (!id) {
      throw new NotFoundError('Offer ID is required');
    }
    const existing = await offerRepository.findById(id);
    if (!existing) {
      throw new NotFoundError(`Offer with ID '${id}' was not found`);
    }
    return offerRepository.delete(id);
  }
}

export const offerService = new OfferService();
