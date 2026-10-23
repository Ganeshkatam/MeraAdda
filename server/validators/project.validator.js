import { ValidationError } from '../errors/api-error.js';
import { ALLOWED_CATEGORIES, ALLOWED_STATUSES } from '../config/constants.js';

export function validateProjectPayload(data, isUpdate = false) {
  const errors = [];

  if (!data || typeof data !== 'object') {
    throw new ValidationError('Request body must be a JSON object');
  }

  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const url = typeof data.url === 'string' ? data.url.trim() : '';
  const description = typeof data.description === 'string' ? data.description.trim() : '';
  const category = typeof data.category === 'string' ? data.category.trim() : 'WEB APPS';
  const status = typeof data.status === 'string' ? data.status.trim() : 'Live';
  const image = typeof data.image === 'string' ? data.image.trim() : '';
  const year = typeof data.year === 'string' ? data.year.trim() : new Date().getFullYear().toString();
  const featured = Boolean(data.featured);
  const tags = Array.isArray(data.tags)
    ? data.tags.filter(t => typeof t === 'string' && t.trim().length > 0).map(t => t.trim())
    : [];

  if (!isUpdate || data.name !== undefined) {
    if (!name || name.length < 2 || name.length > 80) {
      errors.push({ field: 'name', message: 'Project name must be between 2 and 80 characters.' });
    }
  }

  if (!isUpdate || data.url !== undefined) {
    if (!url || url.length < 3 || url.length > 255) {
      errors.push({ field: 'url', message: 'Project URL or domain must be between 3 and 255 characters.' });
    }
  }

  if (!isUpdate || data.description !== undefined) {
    if (!description || description.length < 10 || description.length > 500) {
      errors.push({ field: 'description', message: 'Description must be between 10 and 500 characters.' });
    }
  }

  if (category && !ALLOWED_CATEGORIES.includes(category)) {
    errors.push({
      field: 'category',
      message: `Invalid category. Must be one of: ${ALLOWED_CATEGORIES.join(', ')}`
    });
  }

  if (status && !ALLOWED_STATUSES.includes(status)) {
    errors.push({
      field: 'status',
      message: `Invalid status. Must be one of: ${ALLOWED_STATUSES.join(', ')}`
    });
  }

  if (errors.length > 0) {
    throw new ValidationError('Project validation failed', errors);
  }

  return {
    name,
    url,
    description,
    category,
    status,
    image: image || null,
    year,
    featured,
    tags
  };
}
