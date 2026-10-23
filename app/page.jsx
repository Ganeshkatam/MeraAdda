import HomeOverviewClient from '../components/HomeOverviewClient';
import { apiClient } from '../lib/api-client.js';

export const revalidate = 1800; // revalidate every 30 minutes

export default async function Page() {
  let projects = [];
  let profile = null;

  try {
    const [p, prof] = await Promise.all([
      apiClient.projects.list().catch(() => []),
      apiClient.profile.get().catch(() => null)
    ]);

    projects = p || [];
    profile = prof || null;
  } catch (err) {
    console.error('[Frontend SSR]: Failed to retrieve initial data from backend server:', err.message);
  }

  return (
    <HomeOverviewClient
      projects={projects}
      profile={profile}
    />
  );
}
