import { apiClient } from '../lib/api-client.js';

export default async function sitemap() {
  const baseUrl = 'https://www.tomesphere.in';

  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/guestbook`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6
    }
  ];

  try {
    const projects = await apiClient.projects.list({ status: 'Live' });
    const productRoutes = (projects || [])
      .filter(p => p.slug || p.id)
      .map(p => ({
        url: `${baseUrl}/products/${p.slug || p.id}`,
        lastModified: p.updated_at || p.created_at || new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: p.featured ? 0.9 : 0.8
      }));

    return [...staticRoutes, ...productRoutes];
  } catch (err) {
    console.error('[Sitemap Generator]: Failed to query dynamic product entries:', err.message);
    return staticRoutes;
  }
}
