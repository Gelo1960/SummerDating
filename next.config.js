/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/privacy_policy.html', destination: '/privacy-policy', permanent: true },
      { source: '/terms_of_service.html', destination: '/terms-of-service', permanent: true },
      { source: '/support.html', destination: '/support', permanent: true },
      { source: '/blog/:slug.html', destination: '/blog/:slug', permanent: true },
    ];
  },
};

module.exports = nextConfig;
