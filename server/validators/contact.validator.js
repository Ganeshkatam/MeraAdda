import { ValidationError } from '../errors/api-error';

export function validateContactPayload(data) {
  const errors = [];

  if (!data || typeof data !== 'object') {
    throw new ValidationError('Request body must be a JSON object');
  }

  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';

  if (!name || name.length < 2 || name.length > 80) {
    errors.push({ field: 'name', message: 'Name must be between 2 and 80 characters.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email) || email.length > 120) {
    errors.push({ field: 'email', message: 'A valid email address is required.' });
  }

  if (!message || message.length < 5 || message.length > 2000) {
    errors.push({ field: 'message', message: 'Message must be between 5 and 2000 characters.' });
  }

  if (errors.length > 0) {
    throw new ValidationError('Contact validation failed', errors);
  }

  return { name, email, message };
}
