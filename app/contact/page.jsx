import React from 'react';
import ContactClient from '../../components/ContactClient';
import { apiClient } from '../../lib/api-client';

export const revalidate = 1800;

export const metadata = {
  title: 'Contact Studio — TomeSphere',
  description: 'Reach out to the TomeSphere product studio team for collaborations, product inquiries, or partnerships.'
};

export default async function ContactPage() {
  const profile = await apiClient.profile.get().catch(() => null);

  return (
    <div className="page-wrapper">
      <div className="page-head">
        <div className="page-eyebrow">Connect</div>
        <h1 className="page-title">Direct Connection</h1>
        <p className="page-subtitle">
          Have a product question, partnership idea, or inquiry? Reach out below.
        </p>
      </div>

      <ContactClient profile={profile} />
    </div>
  );
}
