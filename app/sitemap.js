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
      url: `${baseUrl}/updates`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8
    },
    {
      url: `${baseUrl}/offers`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8
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
    const [projects, updates, offers] = await Promise.all([
      apiClient.projects.list({ status: 'Live' }).catch(() => []),
      apiClient.updates.list({ status: 'Published' }).catch(() => []),
      apiClient.offers.list({ status: 'Published', onlyActive: true }).catch(() => [])
    ]);

    const productRoutes = (projects || [])
      .filter(p => p.slug || p.id)
      .map(p => ({
        url: `${baseUrl}/products/${p.slug || p.id}`,
        lastModified: p.updated_at || p.created_at || new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: p.featured ? 0.9 : 0.8
      }));

    const updateRoutes = (updates || [])
      .filter(u => u.slug)
      .map(u => ({
        url: `${baseUrl}/updates/${u.slug}`,
        lastModified: u.updated_at || u.published_at || new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.7
      }));

    const offerRoutes = (offers || [])
      .filter(o => o.slug)
      .map(o => ({
        url: `${baseUrl}/offers/${o.slug}`,
        lastModified: o.updated_at || o.start_date || new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.7
      }));

    return [...staticRoutes, ...productRoutes, ...updateRoutes, ...offerRoutes];
  } catch (err) {
    console.error('[Sitemap Generator]: Failed to query dynamic entries:', err.message);
    return staticRoutes;
  }
}
