import { ValidationError } from '../errors/api-error.js';

export const ALLOWED_OFFER_STATUSES = new Set([
  'Published',
  'Draft',
  'Expired'
]);

export function validateOfferPayload(data, isPartial = false) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new ValidationError('Offer payload must be a JSON object');
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
    if (typeof data.title !== 'string' || data.title.trim().length < 5 || data.title.trim().length > 100) {
      errors.push({ field: 'title', message: 'Title must be between 5 and 100 characters' });
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

  // description
  if (data.description !== undefined || !isPartial) {
    if (typeof data.description !== 'string' || data.description.trim().length < 10 || data.description.trim().length > 500) {
      errors.push({ field: 'description', message: 'Description must be between 10 and 500 characters' });
    } else {
      sanitized.description = data.description.trim();
    }
  }

  // benefit
  if (data.benefit !== undefined || !isPartial) {
    if (typeof data.benefit !== 'string' || data.benefit.trim().length < 3 || data.benefit.trim().length > 120) {
      errors.push({ field: 'benefit', message: 'Benefit declaration must be between 3 and 120 characters' });
    } else {
      sanitized.benefit = data.benefit.trim();
    }
  }

  // eligibility
  if (data.eligibility !== undefined || !isPartial) {
    if (typeof data.eligibility !== 'string' || data.eligibility.trim().length < 3 || data.eligibility.trim().length > 150) {
      errors.push({ field: 'eligibility', message: 'Eligibility criteria must be between 3 and 150 characters' });
    } else {
      sanitized.eligibility = data.eligibility.trim();
    }
  }

  // terms
  if (data.terms !== undefined && data.terms !== null) {
    if (typeof data.terms !== 'string' || data.terms.trim().length > 1000) {
      errors.push({ field: 'terms', message: 'Terms must be a string up to 1000 characters' });
    } else {
      sanitized.terms = data.terms.trim();
    }
  }

  // coupon_code
  if (data.coupon_code !== undefined && data.coupon_code !== null) {
    if (typeof data.coupon_code !== 'string' || data.coupon_code.trim().length > 50) {
      errors.push({ field: 'coupon_code', message: 'Coupon code must be a string up to 50 characters' });
    } else {
      sanitized.coupon_code = data.coupon_code.trim().toUpperCase();
    }
  }

  // url
  if (data.url !== undefined || !isPartial) {
    if (typeof data.url !== 'string') {
      errors.push({ field: 'url', message: 'Launch/redemption URL must be a valid URL string' });
    } else {
      try {
        const parsed = new URL(data.url.trim());
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
          errors.push({ field: 'url', message: 'URL must use http or https scheme' });
        } else {
          sanitized.url = data.url.trim();
        }
      } catch {
        errors.push({ field: 'url', message: 'Invalid URL format' });
      }
    }
  }

  // start_date & end_date
  let startMs = null;
  let endMs = null;

  if (data.start_date !== undefined || !isPartial) {
    const sDate = new Date(data.start_date || Date.now());
    if (isNaN(sDate.getTime())) {
      errors.push({ field: 'start_date', message: 'Invalid start_date ISO format' });
    } else {
      startMs = sDate.getTime();
      sanitized.start_date = sDate.toISOString();
    }
  }

  if (data.end_date !== undefined || !isPartial) {
    if (!data.end_date) {
      errors.push({ field: 'end_date', message: 'Expiry end_date is required for all promotions' });
    } else {
      const eDate = new Date(data.end_date);
      if (isNaN(eDate.getTime())) {
        errors.push({ field: 'end_date', message: 'Invalid end_date ISO format' });
      } else {
        endMs = eDate.getTime();
        sanitized.end_date = eDate.toISOString();
      }
    }
  }

  if (startMs !== null && endMs !== null && endMs <= startMs) {
    errors.push({ field: 'end_date', message: 'Offer end_date must be strictly after start_date' });
  }

  // status
  if (data.status !== undefined || !isPartial) {
    const status = typeof data.status === 'string' ? data.status.trim() : 'Draft';
    if (!ALLOWED_OFFER_STATUSES.has(status)) {
      errors.push({ field: 'status', message: `Invalid status. Allowed: ${[...ALLOWED_OFFER_STATUSES].join(', ')}` });
    } else {
      sanitized.status = status;
    }
  }

  // is_featured
  if (data.is_featured !== undefined) {
    sanitized.is_featured = Boolean(data.is_featured);
  }

  if (errors.length > 0) {
    throw new ValidationError('Offer payload validation failed', errors);
  }

  return sanitized;
}
