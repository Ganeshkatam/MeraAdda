import { supabase } from '@/lib/supabase';
import { store } from './memory-store';

export class GuestbookRepository {
  async findAll({ limit = 50 } = {}) {
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map(entry => ({
          id: entry.id,
          author: entry.author,
          message: entry.message,
          timestamp: entry.timestamp
        }));
      }
    } catch (e) {
      console.warn('Supabase guestbook fetch failed, using fallback:', e.message);
    }

    return [...store.guestbook].slice(0, limit);
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

    try {
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

      if (!error && data) {
        store.guestbook.unshift(data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase guestbook insert failed:', e.message);
    }

    store.guestbook.unshift(entry);
    return entry;
  }
}

export const guestbookRepository = new GuestbookRepository();
