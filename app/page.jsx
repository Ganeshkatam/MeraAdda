import PortfolioClient from '../components/PortfolioClient';
import { getLiveGitHubRepos } from './actions';

export const revalidate = 1800; // revalidate every 30 minutes

export default async function Page() {
  const repos = await getLiveGitHubRepos();

  return <PortfolioClient initialRepos={repos} />;
}
