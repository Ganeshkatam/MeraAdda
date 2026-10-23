import React from 'react';
import WorkCatalogClient from '../../components/WorkCatalogClient';
import { apiClient } from '../../lib/api-client';

export const revalidate = 1800;

export const metadata = {
  title: 'Work & Applications — Katam Ganesh Reddy',
  description: 'Full catalog of production applications, developer tools, and distributed systems built by Katam Ganesh Reddy.'
};

export default async function WorkPage() {
  const projects = await apiClient.projects.list().catch(() => []);

  return (
    <div className="page-wrapper">
      <div className="page-head">
        <div className="page-eyebrow">Interactive Portfolio</div>
        <h1 className="page-title">Selected Work ({projects.length})</h1>
        <p className="page-subtitle">
          Web applications, developer tools, real-time collaboration platforms, and distributed systems.
        </p>
      </div>

      <WorkCatalogClient initialProjects={projects} />
    </div>
  );
}
