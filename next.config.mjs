/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // S'assurer que le dossier content/articles/ est inclus dans le bundle serverless
  // (necessaire pour que sitemap.ts puisse lire les .mdx au runtime via fs.readdirSync).
  outputFileTracingIncludes: {
    '/sitemap.xml': ['./content/articles/**/*'],
    '/blog': ['./content/articles/**/*'],
    '/blog/[slug]': ['./content/articles/**/*', './public/illustrations/**/*'],
    '/silo/[slug]': ['./content/articles/**/*'],
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'image.pollinations.ai' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // SEO redirects
  async redirects() {
    return [
      { source: '/blog/:slug/index.html', destination: '/blog/:slug', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
    ];
  },

  // Headers (security + caching)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
