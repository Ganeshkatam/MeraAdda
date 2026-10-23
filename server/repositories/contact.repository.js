import { randomUUID } from 'node:crypto';
import { supabase } from '../config/supabase.js';
import { ApiError } from '../errors/api-error.js';

export class ContactRepository {
  async saveMessage({ name, email, message }) {
    const entry = {
      id: `msg_${randomUUID().replace(/-/g, '').slice(0, 16)}`,
      name,
      email,
      message,
      receivedAt: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('contacts')
      .insert({
        id: entry.id,
        name: entry.name,
        email: entry.email,
        message: entry.message
      })
      .select()
      .single();

    if (error || !data) {
      console.error('[ContactRepository.saveMessage]: Insert error:', error?.message);
      throw new ApiError('Unable to submit inquiry at this time.', 500, 'DATABASE_ERROR');
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      message: data.message,
      receivedAt: data.created_at || entry.receivedAt
    };
  }

  async getAllMessages() {
    const { data, error } = await supabase
      .from('contacts')
      .select('id, name, email, message, status, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[ContactRepository.getAllMessages]: Fetch error:', error.message);
      throw new ApiError('Unable to fetch contact inquiries.', 500, 'DATABASE_ERROR');
    }

    return data || [];
  }
}

export const contactRepository = new ContactRepository();
