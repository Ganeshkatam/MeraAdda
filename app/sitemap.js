export default function sitemap() {
  const baseUrl = 'https://tomesphere.in';
  const routes = ['', '/products', '/about', '/guestbook', '/contact'];

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' || route === '/products' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
