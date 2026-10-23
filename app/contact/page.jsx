import React from 'react';
import ContactClient from '../../components/ContactClient';
import { apiClient } from '../../lib/api-client';

export const revalidate = 1800;

export const metadata = {
  title: 'Contact & Collaboration — Katam Ganesh Reddy',
  description: 'Reach out to Katam Ganesh Reddy for engineering projects, architecture inquiries, or collaboration.'
};

export default async function ContactPage() {
  const profile = await apiClient.profile.get().catch(() => null);

  return (
    <div className="page-wrapper">
      <div className="page-head">
        <div className="page-eyebrow">Connect</div>
        <h1 className="page-title">Direct Connection</h1>
        <p className="page-subtitle">
          Have an architectural challenge, distributed system, or application in mind? Reach out below.
        </p>
      </div>

      <ContactClient profile={profile} />
    </div>
  );
}
