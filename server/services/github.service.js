export class GitHubService {
  constructor(username = 'Ganeshkatam') {
    this.username = username;
  }

  async getRecentRepositories(limit = 6) {
    try {
      const res = await fetch(`https://api.github.com/users/${this.username}/repos?sort=updated&per_page=${limit}`, {
        headers: {
          'User-Agent': 'TomeSphere-Backend-API',
          Accept: 'application/vnd.github.v3+json'
        },
        next: { revalidate: 1800 }
      });

      if (!res.ok) {
        return [];
      }

      const repos = await res.json();
      if (!Array.isArray(repos)) {
        return [];
      }

      return repos.map(r => ({
        id: r.id,
        name: r.name,
        fullName: r.full_name,
        description: r.description || 'Public GitHub project repository',
        url: r.html_url,
        homepage: r.homepage || null,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language || 'TypeScript',
        topics: r.topics || [],
        updatedAt: new Date(r.updated_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      }));
    } catch (err) {
      console.error('[GitHub Service Error]:', err);
      return [];
    }
  }

  async getUserProfile() {
    try {
      const res = await fetch(`https://api.github.com/users/${this.username}`, {
        headers: { 'User-Agent': 'TomeSphere-Backend-API' },
        next: { revalidate: 3600 }
      });
      if (!res.ok) return null;
      const data = await res.json();
      return {
        username: data.login,
        publicRepos: data.public_repos,
        followers: data.followers,
        avatarUrl: data.avatar_url,
        profileUrl: data.html_url
      };
    } catch (err) {
      return null;
    }
  }
}

export const githubService = new GitHubService();
