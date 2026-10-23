import PortfolioClient from '../components/PortfolioClient';
import { apiClient } from '../lib/api-client.js';

export const revalidate = 1800; // revalidate every 30 minutes

export default async function Page() {
  let projects = [];
  let profile = null;
  let guestbook = [];
  let skills = [];

  try {
    const [p, prof, gb, sk] = await Promise.all([
      apiClient.projects.list().catch(() => []),
      apiClient.profile.get().catch(() => null),
      apiClient.guestbook.list(20).catch(() => []),
      apiClient.skills.list().catch(() => [])
    ]);

    projects = p || [];
    profile = prof || null;
    guestbook = gb || [];
    skills = Array.isArray(sk) ? sk.map(s => s.name) : [];
  } catch (err) {
    console.error('[Frontend SSR]: Failed to retrieve initial data from backend server:', err.message);
  }

  return (
    <PortfolioClient
      initialProjects={projects}
      initialProfile={profile}
      initialGuestbook={guestbook}
      initialSkills={skills}
    />
  );
}
