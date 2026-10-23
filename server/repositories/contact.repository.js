import { supabase } from '@/lib/supabase';
import { store } from './memory-store';

export class ContactRepository {
  async saveMessage({ name, email, message }) {
    const entry = {
      id: `msg_${Date.now()}`,
      name,
      email,
      message,
      receivedAt: new Date().toISOString()
    };

    try {
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

      if (!error && data) {
        store.contactMessages.unshift(entry);
        return entry;
      }
    } catch (e) {
      console.warn('Supabase contact insert failed:', e.message);
    }

    store.contactMessages.unshift(entry);
    return entry;
  }

  async getAllMessages() {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data;
      }
    } catch (e) {
      // fallback
    }
    return [...store.contactMessages];
  }
}

export const contactRepository = new ContactRepository();
