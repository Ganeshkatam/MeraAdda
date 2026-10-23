import { supabase } from '../../lib/supabase.js';
import { ApiError } from '../errors/api-error.js';

export class GuestbookRepository {
  async findAll({ limit = 50 } = {}) {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new ApiError(`Database error fetching guestbook entries: ${error.message}`, 500, 'DATABASE_ERROR');
    }

    return (data || []).map(entry => ({
      id: entry.id,
      author: entry.author,
      message: entry.message,
      timestamp: entry.timestamp
    }));
  }

  async create({ author, message }) {
    const entry = {
      id: `gb_${Date.now()}`,
      author,
      message,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };

    const { data, error } = await supabase
      .from('guestbook')
      .insert({
        id: entry.id,
        author: entry.author,
        message: entry.message,
        timestamp: entry.timestamp
      })
      .select()
      .single();

    if (error || !data) {
      throw new ApiError(`Database error creating guestbook entry: ${error?.message || 'Insert failed'}`, 500, 'DATABASE_ERROR');
    }

    return {
      id: data.id,
      author: data.author,
      message: data.message,
      timestamp: data.timestamp
    };
  }
}

export const guestbookRepository = new GuestbookRepository();
