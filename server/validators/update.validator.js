import { ValidationError } from '../errors/api-error.js';

export const ALLOWED_UPDATE_TYPES = new Set([
  'Launch',
  'Feature',
  'Improvement',
  'Bugfix',
  'Maintenance'
]);

export const ALLOWED_UPDATE_STATUSES = new Set([
  'Published',
  'Draft',
  'Archived'
]);

export function validateUpdatePayload(data, isPartial = false) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new ValidationError('Update payload must be a JSON object');
  }

  const errors = [];
  const sanitized = {};

  // project_id
  if (data.project_id !== undefined || !isPartial) {
    if (typeof data.project_id !== 'string' || !data.project_id.trim()) {
      errors.push({ field: 'project_id', message: 'Valid parent project_id is required' });
    } else {
      sanitized.project_id = data.project_id.trim();
    }
  }

  // title
  if (data.title !== undefined || !isPartial) {
    if (typeof data.title !== 'string' || data.title.trim().length < 5 || data.title.trim().length > 120) {
      errors.push({ field: 'title', message: 'Title must be between 5 and 120 characters' });
    } else {
      sanitized.title = data.title.trim();
    }
  }

  // slug
  if (data.slug !== undefined || (!isPartial && data.title)) {
    let slugCandidate = typeof data.slug === 'string' ? data.slug.trim() : '';
    if (!slugCandidate && typeof data.title === 'string') {
      slugCandidate = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slugCandidate)) {
      errors.push({ field: 'slug', message: 'Slug must be lowercase alphanumeric with single hyphens' });
    } else {
      sanitized.slug = slugCandidate;
    }
  }

  // summary
  if (data.summary !== undefined || !isPartial) {
    if (typeof data.summary !== 'string' || data.summary.trim().length < 10 || data.summary.trim().length > 300) {
      errors.push({ field: 'summary', message: 'Summary must be between 10 and 300 characters' });
    } else {
      sanitized.summary = data.summary.trim();
    }
  }

  // content
  if (data.content !== undefined || !isPartial) {
    if (typeof data.content !== 'string' || data.content.trim().length < 10) {
      errors.push({ field: 'content', message: 'Content must be at least 10 characters' });
    } else {
      sanitized.content = data.content.trim();
    }
  }

  // version
  if (data.version !== undefined && data.version !== null) {
    if (typeof data.version !== 'string' || data.version.trim().length > 30) {
      errors.push({ field: 'version', message: 'Version must be a string up to 30 characters' });
    } else {
      sanitized.version = data.version.trim();
    }
  }

  // update_type
  if (data.update_type !== undefined || !isPartial) {
    const type = typeof data.update_type === 'string' ? data.update_type.trim() : 'Feature';
    if (!ALLOWED_UPDATE_TYPES.has(type)) {
      errors.push({ field: 'update_type', message: `Invalid update_type. Allowed: ${[...ALLOWED_UPDATE_TYPES].join(', ')}` });
    } else {
      sanitized.update_type = type;
    }
  }

  // status
  if (data.status !== undefined || !isPartial) {
    const status = typeof data.status === 'string' ? data.status.trim() : 'Draft';
    if (!ALLOWED_UPDATE_STATUSES.has(status)) {
      errors.push({ field: 'status', message: `Invalid status. Allowed: ${[...ALLOWED_UPDATE_STATUSES].join(', ')}` });
    } else {
      sanitized.status = status;
    }
  }

  // published_at
  if (data.published_at !== undefined && data.published_at !== null) {
    const date = new Date(data.published_at);
    if (isNaN(date.getTime())) {
      errors.push({ field: 'published_at', message: 'Invalid published_at ISO date string' });
    } else {
      sanitized.published_at = date.toISOString();
    }
  }

  if (errors.length > 0) {
    throw new ValidationError('Update payload validation failed', errors);
  }

  return sanitized;
}
