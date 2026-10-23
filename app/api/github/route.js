import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.github.com/users/Ganeshkatam/repos?sort=updated&per_page=6', {
      headers: {
        'User-Agent': 'TomeSphere-Portfolio-App'
      },
      next: { revalidate: 1800 }
    });

    if (!res.ok) {
      return NextResponse.json({ repos: [] }, { status: 200 });
    }

    const repos = await res.json();
    return NextResponse.json({
      repos: Array.isArray(repos)
        ? repos.map(r => ({
            name: r.name,
            description: r.description || 'Public GitHub project',
            url: r.html_url,
            stars: r.stargazers_count,
            language: r.language || 'TypeScript',
            updated: new Date(r.updated_at).toLocaleDateString()
          }))
        : []
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve repos' }, { status: 500 });
  }
}
