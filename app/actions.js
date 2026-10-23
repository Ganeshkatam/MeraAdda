'use server';

import { apiClient } from '@/lib/api-client.js';

export async function submitContactMessage(prevState, formData) {
  try {
    const raw = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    const result = await apiClient.contact.send(raw);
    return {
      success: true,
      message: result.confirmation || 'Message received successfully.'
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

    const entry = await apiClient.guestbook.create(raw);
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
  return apiClient.projects.list();
}
