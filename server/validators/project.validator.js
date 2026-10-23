import { ValidationError } from '../errors/api-error.js';
import { ALLOWED_CATEGORIES, ALLOWED_STATUSES } from '../config/constants.js';

function isValidWebUrl(stringUrl) {
  try {
    const parsed = new URL(stringUrl);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function validateProjectPayload(data, isUpdate = false) {
  const errors = [];

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new ValidationError('Request body must be a JSON object');
  }

  const result = {};

  // Name validation
  if (!isUpdate || data.name !== undefined) {
    if (typeof data.name !== 'string') {
      errors.push({ field: 'name', message: 'Project name must be a string.' });
    } else {
      const name = data.name.trim();
      if (name.length < 2 || name.length > 80) {
        errors.push({ field: 'name', message: 'Project name must be between 2 and 80 characters.' });
      } else {
        result.name = name;
      }
    }
  }

  // URL validation
  if (!isUpdate || data.url !== undefined) {
    if (typeof data.url !== 'string') {
      errors.push({ field: 'url', message: 'Project URL must be a string.' });
    } else {
      const url = data.url.trim();
      if (!isValidWebUrl(url) || url.length > 255) {
        errors.push({ field: 'url', message: 'Project URL must be a valid http/https address under 255 characters.' });
      } else {
        result.url = url;
      }
    }
  }

  // Description validation
  if (!isUpdate || data.description !== undefined) {
    if (typeof data.description !== 'string') {
      errors.push({ field: 'description', message: 'Description must be a string.' });
    } else {
      const desc = data.description.trim();
      if (desc.length < 10 || desc.length > 500) {
        errors.push({ field: 'description', message: 'Description must be between 10 and 500 characters.' });
      } else {
        result.description = desc;
      }
    }
  }

  // Category validation
  if (!isUpdate || data.category !== undefined) {
    const category = typeof data.category === 'string' ? data.category.trim() : 'WEB APPS';
    if (!ALLOWED_CATEGORIES.includes(category)) {
      errors.push({
        field: 'category',
        message: `Invalid category. Must be one of: ${ALLOWED_CATEGORIES.join(', ')}`
      });
    } else {
      result.category = category;
    }
  }

  // Status validation
  if (!isUpdate || data.status !== undefined) {
    const status = typeof data.status === 'string' ? data.status.trim() : 'Live';
    if (!ALLOWED_STATUSES.includes(status)) {
      errors.push({
        field: 'status',
        message: `Invalid status. Must be one of: ${ALLOWED_STATUSES.join(', ')}`
      });
    } else {
      result.status = status;
    }
  }

  // Optional string fields
  if (data.github_url !== undefined) {
    if (data.github_url === null || data.github_url === '') {
      result.github_url = null;
    } else if (typeof data.github_url === 'string' && isValidWebUrl(data.github_url.trim())) {
      result.github_url = data.github_url.trim();
    } else {
      errors.push({ field: 'github_url', message: 'GitHub URL must be a valid http/https address.' });
    }
  }

  if (data.image !== undefined) {
    result.image = typeof data.image === 'string' ? data.image.trim() || null : null;
  } else if (!isUpdate) {
    result.image = null;
  }

  if (data.year !== undefined) {
    result.year = typeof data.year === 'string' ? data.year.trim() : String(data.year);
  } else if (!isUpdate) {
    result.year = new Date().getFullYear().toString();
  }

  // Boolean featured field
  if (data.featured !== undefined) {
    result.featured = data.featured === true || data.featured === 'true';
  } else if (!isUpdate) {
    result.featured = false;
  }

  // Tags validation
  if (data.tags !== undefined) {
    if (!Array.isArray(data.tags)) {
      errors.push({ field: 'tags', message: 'Tags must be an array of strings.' });
    } else if (data.tags.length > 15) {
      errors.push({ field: 'tags', message: 'Cannot exceed 15 tags per project.' });
    } else {
      result.tags = data.tags
        .filter(t => typeof t === 'string' && t.trim().length > 0)
        .map(t => t.trim().slice(0, 30));
    }
  } else if (!isUpdate) {
    result.tags = [];
  }

  if (errors.length > 0) {
    throw new ValidationError('Project validation failed', errors);
  }

  return result;
}
