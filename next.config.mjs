/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/admin.html',
        destination: '/',
      },
      {
        source: '/admin',
        destination: '/',
      },
    ];
  },
};

export default nextConfig;
