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
    store.contactMessages.unshift(entry);
    return entry;
  }

  async getAllMessages() {
    return [...store.contactMessages];
  }
}

export const contactRepository = new ContactRepository();
