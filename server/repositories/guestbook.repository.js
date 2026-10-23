import { randomUUID } from 'node:crypto';
import { supabase } from '../config/supabase.js';
import { ApiError } from '../errors/api-error.js';

export class GuestbookRepository {
  async findAll({ limit = 50 } = {}) {
    const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 50, 1), 100);
    const { data, error } = await supabase
      .from('guestbook')
      .select('id, author, message, timestamp')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(safeLimit);

    if (error) {
      console.error('[GuestbookRepository.findAll]: Fetch error:', error.message);
      throw new ApiError('Unable to retrieve guestbook entries at this time.', 500, 'DATABASE_ERROR');
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
      id: `gb_${randomUUID().replace(/-/g, '').slice(0, 16)}`,
      author: author.trim(),
      message: message.trim(),
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
        timestamp: entry.timestamp,
        status: 'approved'
      })
      .select()
      .single();

    if (error || !data) {
      console.error('[GuestbookRepository.create]: Insert error:', error?.message);
      throw new ApiError('Unable to post guestbook entry at this time.', 500, 'DATABASE_ERROR');
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
