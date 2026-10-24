import { updateRepository } from '../repositories/update.repository.js';
import { validateUpdatePayload } from '../validators/update.validator.js';
import { NotFoundError } from '../errors/api-error.js';

export class UpdateService {
  async listUpdates(options = {}) {
    return updateRepository.findAll(options);
  }

  async getUpdateBySlug(slug, options = {}) {
    if (!slug) {
      throw new NotFoundError('Update slug is required');
    }
    const update = await updateRepository.findBySlug(slug, options);
    if (!update) {
      throw new NotFoundError(`Update with slug '${slug}' was not found`);
    }
    return update;
  }

  async createUpdate(data) {
    const validated = validateUpdatePayload(data, false);
    return updateRepository.create(validated);
  }

  async updateUpdate(id, data) {
    if (!id) {
      throw new NotFoundError('Update ID is required');
    }
    const existing = await updateRepository.findById(id);
    if (!existing) {
      throw new NotFoundError(`Update with ID '${id}' was not found`);
    }
    const validated = validateUpdatePayload(data, true);
    return updateRepository.update(id, validated);
  }

  async deleteUpdate(id) {
    if (!id) {
      throw new NotFoundError('Update ID is required');
    }
    const existing = await updateRepository.findById(id);
    if (!existing) {
      throw new NotFoundError(`Update with ID '${id}' was not found`);
    }
    return updateRepository.delete(id);
  }
}

export const updateService = new UpdateService();
