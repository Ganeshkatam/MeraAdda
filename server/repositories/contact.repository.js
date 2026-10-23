import { supabase } from '../config/supabase.js';
import { ApiError } from '../errors/api-error.js';

export class ContactRepository {
  async saveMessage({ name, email, message }) {
    const entry = {
      id: `msg_${Date.now()}`,
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
      throw new ApiError(`Database error saving contact message: ${error?.message || 'Insert failed'}`, 500, 'DATABASE_ERROR');
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
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new ApiError(`Database error fetching contact messages: ${error.message}`, 500, 'DATABASE_ERROR');
    }

    return data || [];
  }
}

export const contactRepository = new ContactRepository();
