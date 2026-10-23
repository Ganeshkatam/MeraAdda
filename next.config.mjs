/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    const backend = process.env.BACKEND_API_URL;
    if (!backend) return [];
    return [
      {
        source: '/api/:path*',
        destination: `${backend.replace(/\/$/, '')}/api/:path*`,
      },
      {
        source: '/health',
        destination: `${backend.replace(/\/$/, '')}/health`,
      },
    ];
  },
};

export default nextConfig;
