import React from 'react';
import GuestbookClient from '../../components/GuestbookClient';
import { apiClient } from '../../lib/api-client';

export const revalidate = 60; // revalidate every 60s for live guestbook

export const metadata = {
  title: 'Guestbook — TomeSphere',
  description: 'Share your thoughts, suggestions, and feedback with the TomeSphere community.'
};

export default async function GuestbookPage() {
  const guestbook = await apiClient.guestbook.list(50).catch(() => []);

  return (
    <div className="page-wrapper">
      <div className="page-head">
        <div className="page-eyebrow">Visitor Community</div>
        <h1 className="page-title">Community Guestbook</h1>
        <p className="page-subtitle">
          Leave a note, suggestion, or greeting for the TomeSphere team and community.
        </p>
      </div>

      <GuestbookClient initialEntries={guestbook} />
    </div>
  );
}
