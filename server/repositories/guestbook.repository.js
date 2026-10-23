import { store } from './memory-store';

export class GuestbookRepository {
  async findAll({ limit = 50 } = {}) {
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
      }),
      createdAt: new Date().toISOString()
    };
    store.guestbook.unshift(entry);
    return entry;
  }
}

export const guestbookRepository = new GuestbookRepository();
