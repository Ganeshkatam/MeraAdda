import React from 'react';
import TerminalClient from '../../components/TerminalClient';
import { apiClient } from '../../lib/api-client';

export const revalidate = 1800;

export const metadata = {
  title: 'Developer Dossier & Terminal — Katam Ganesh Reddy',
  description: 'Interactive developer terminal and technical dossier for Katam Ganesh Reddy.'
};

export default async function TerminalPage() {
  const [profile, skills, projects] = await Promise.all([
    apiClient.profile.get().catch(() => null),
    apiClient.skills.list().catch(() => []),
    apiClient.projects.list().catch(() => [])
  ]);

  const skillsList = Array.isArray(skills) ? skills.map(s => s.name || s) : [];

  return (
    <div className="page-wrapper">
      <div className="page-head">
        <div className="page-eyebrow">Interactive Shell</div>
        <h1 className="page-title">Developer Dossier</h1>
        <p className="page-subtitle">
          Type commands to query background, technical stack, verified projects, and contact endpoints.
        </p>
      </div>

      <TerminalClient
        profile={profile}
        skills={skillsList}
        projects={projects}
      />
    </div>
  );
}
