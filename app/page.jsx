import PortfolioClient from '../components/PortfolioClient';
import { getLiveGitHubRepos, getInitialProjects } from './actions';
import { profileService } from '@/server/services/profile.service';
import { guestbookService } from '@/server/services/guestbook.service';

export const revalidate = 1800; // revalidate every 30 minutes

export default async function Page() {
  const [repos, projects, profile, guestbook] = await Promise.all([
    getLiveGitHubRepos(),
    getInitialProjects(),
    profileService.getProfile(),
    guestbookService.getEntries({ limit: 20 })
  ]);

  return (
    <PortfolioClient
      initialRepos={repos}
      initialProjects={projects}
      initialProfile={profile}
      initialGuestbook={guestbook}
    />
  );
}
