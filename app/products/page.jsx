import React from 'react';
import WorkCatalogClient from '../../components/WorkCatalogClient';
import { apiClient } from '../../lib/api-client';

export const revalidate = 1800;

export const metadata = {
  title: 'Products & Systems — TomeSphere',
  description: 'Full catalog of production applications, developer tools, and distributed systems engineered by TomeSphere.'
};

export default async function ProductsPage() {
  const projects = await apiClient.projects.list().catch(() => []);

  return (
    <div className="page-wrapper">
      <div className="page-head">
        <div className="page-eyebrow">Digital Products &amp; Platforms</div>
        <h1 className="page-title">Explore Products ({projects.length})</h1>
        <p className="page-subtitle">
          Practical web applications, developer tools, and collaborative software—built for real work.
        </p>
      </div>

      <WorkCatalogClient initialProjects={projects} />
    </div>
  );
}
