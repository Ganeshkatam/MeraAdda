import React from 'react';
import GuestbookClient from '../../components/GuestbookClient';
import { apiClient } from '../../lib/api-client';

export const revalidate = 60; // revalidate every 60s for live guestbook

export const metadata = {
  title: 'Visitor Guestbook — Katam Ganesh Reddy',
  description: 'Leave a note on tomesphere.in powered by Next.js Server Actions and Supabase.'
};

export default async function GuestbookPage() {
  const guestbook = await apiClient.guestbook.list(50).catch(() => []);

  return (
    <div className="page-wrapper">
      <div className="page-head">
        <div className="page-eyebrow">Visitor Community</div>
        <h1 className="page-title">Community Guestbook</h1>
        <p className="page-subtitle">
          Leave a greeting, thought, or feedback recorded live in Supabase.
        </p>
      </div>

      <GuestbookClient initialEntries={guestbook} />
    </div>
  );
}
