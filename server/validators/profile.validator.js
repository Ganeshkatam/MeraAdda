import { ValidationError } from '../errors/api-error.js';

const ALLOWED_PROFILE_FIELDS = new Set([
  'name',
  'title',
  'domain',
  'location',
  'email',
  'bio',
  'intro',
  'avatar_url',
  'socials',
  'is_available'
]);

export function validateProfileUpdatePayload(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new ValidationError('Profile update payload must be a JSON object');
  }

  const sanitized = {};
  const errors = [];

  for (const [key, value] of Object.entries(data)) {
    if (!ALLOWED_PROFILE_FIELDS.has(key)) {
      errors.push({ field: key, message: `Field '${key}' is not an editable profile field` });
      continue;
    }

    if (key === 'email' && typeof value === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim()) || value.length > 120) {
        errors.push({ field: 'email', message: 'A valid email address is required' });
        continue;
      }
      sanitized.email = value.trim();
    } else if (key === 'socials') {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        errors.push({ field: 'socials', message: 'Socials must be a key-value object' });
        continue;
      }
      sanitized.socials = value;
    } else if (key === 'is_available') {
      sanitized.is_available = Boolean(value);
    } else if (typeof value === 'string') {
      sanitized[key] = value.trim();
    }
  }

  if (errors.length > 0) {
    throw new ValidationError('Profile validation failed', errors);
  }

  if (Object.keys(sanitized).length === 0) {
    throw new ValidationError('At least one valid profile field must be provided for update');
  }

  return sanitized;
}
