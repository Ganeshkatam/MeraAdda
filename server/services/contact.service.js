import { contactRepository } from '../repositories/contact.repository';
import { validateContactPayload } from '../validators/contact.validator';

export class ContactService {
  async processInquiry(rawData) {
    const validated = validateContactPayload(rawData);
    const saved = await contactRepository.saveMessage(validated);

    console.log(`[Contact Service Log]: Received inquiry from ${saved.name} (${saved.email}) at ${saved.receivedAt}`);

    return {
      messageId: saved.id,
      name: saved.name,
      email: saved.email,
      status: 'received',
      confirmation: `Thank you ${saved.name}. Your message has been routed to Katam Ganesh Reddy.`
    };
  }

  async listInquiries() {
    return contactRepository.getAllMessages();
  }
}

export const contactService = new ContactService();
