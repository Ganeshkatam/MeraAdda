'use server';

import { contactService } from '@/server/services/contact.service.js';
import { guestbookService } from '@/server/services/guestbook.service.js';
import { projectService } from '@/server/services/project.service.js';

export async function submitContactMessage(prevState, formData) {
  try {
    const raw = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    const result = await contactService.processInquiry(raw);
    return {
      success: true,
      message: result.confirmation
    };
  } catch (error) {
    return {
      error: error.message || 'Failed to submit contact message. Please check the provided information.'
    };
  }
}

export async function submitGuestbookEntry(prevState, formData) {
  try {
    const raw = {
      author: formData.get('author'),
      message: formData.get('message')
    };

    const entry = await guestbookService.addEntry(raw);
    return {
      success: true,
      entry
    };
  } catch (error) {
    return {
      error: error.message || 'Failed to post guestbook entry.'
    };
  }
}

export async function getInitialProjects() {
  return projectService.listProjects();
}
