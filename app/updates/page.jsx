import React from 'react';
import UpdatesListClient from '../../components/UpdatesListClient';
import { apiClient } from '../../lib/api-client';

export const revalidate = 1800;

export const metadata = {
  title: 'Product Updates & Changelogs — TomeSphere',
  description: 'Verified release notes, feature launches, architecture milestones, and operational updates across the TomeSphere product ecosystem.',
  alternates: {
    canonical: 'https://tomesphere.in/updates'
  }
};

export default async function UpdatesPage() {
  const updates = await apiClient.updates.list({ status: 'Published' }).catch(() => []);

  return (
    <div className="page-wrapper">
      <div className="page-head">
        <div className="page-eyebrow">Product Ecosystem Changelog</div>
        <h1 className="page-title">Platform Updates ({updates.length})</h1>
        <p className="page-subtitle">
          Verified milestones, releases, and architecture updates for independent products in the TomeSphere hub.
        </p>
      </div>

      <UpdatesListClient initialUpdates={updates} />
    </div>
  );
}
