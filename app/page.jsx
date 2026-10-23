import PortfolioClient from '../components/PortfolioClient';
import { getInitialProjects } from './actions';
import { profileService } from '@/server/services/profile.service';
import { guestbookService } from '@/server/services/guestbook.service';
import { skillService } from '@/server/services/skill.service';

export const revalidate = 1800; // revalidate every 30 minutes

export default async function Page() {
  const [projects, profile, guestbook, skills] = await Promise.all([
    getInitialProjects(),
    profileService.getProfile(),
    guestbookService.getEntries({ limit: 20 }),
    skillService.listSkills()
  ]);

  return (
    <PortfolioClient
      initialProjects={projects}
      initialProfile={profile}
      initialGuestbook={guestbook}
      initialSkills={skills.map(s => s.name)}
    />
  );
}
