'use server';

export async function submitContactMessage(prevState, formData) {
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const message = formData.get('message')?.toString().trim();

  if (!name || name.length < 2) {
    return { error: 'Please provide a valid name (at least 2 characters).' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  if (!message || message.length < 5) {
    return { error: 'Please provide a message with at least 5 characters.' };
  }

  // Simulated server-side storage / dispatch
  const timestamp = new Date().toISOString();
  console.log(`[Contact Submission] ${timestamp} From: ${name} (${email}) - Message: ${message}`);

  return {
    success: true,
    message: `Thank you ${name}! Your message has been received on tomesphere.in. I will respond to ${email} shortly.`
  };
}

export async function submitGuestbookEntry(prevState, formData) {
  const author = formData.get('author')?.toString().trim() || 'Fellow Explorer';
  const message = formData.get('message')?.toString().trim();

  if (!message || message.length < 3) {
    return { error: 'Guestbook message must be at least 3 characters.' };
  }

  const newEntry = {
    id: `gb_${Date.now()}`,
    author: author.slice(0, 40),
    message: message.slice(0, 200),
    timestamp: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  };

  return {
    success: true,
    entry: newEntry
  };
}

export async function getLiveGitHubRepos() {
  try {
    const res = await fetch('https://api.github.com/users/Ganeshkatam/repos?sort=updated&per_page=6', {
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'TomeSphere-Portfolio-App'
      }
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return Array.isArray(data)
      ? data.map(repo => ({
          name: repo.name,
          description: repo.description || 'Open source repository by Ganesh Katam',
          url: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language || 'JavaScript',
          updatedAt: new Date(repo.updated_at).toLocaleDateString()
        }))
      : [];
  } catch (err) {
    console.error('Failed to fetch GitHub repos:', err);
    return [];
  }
}
