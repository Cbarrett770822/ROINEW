/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable build caching for faster builds
  experimental: {
    // Enable turbotrace for dependency analysis and optimization
    turbotrace: {
      logLevel: 'error',
      contextDirectory: __dirname,
      processCwd: __dirname,
    },
    // Enable optimized server builds
    serverComponentsExternalPackages: [],
    // Enable memory cache for faster builds
    memoryBasedWorkersCount: true,
  },
  // Improve TypeScript type checking
  typescript: {
    // Make TypeScript errors fatal in production builds
    ignoreBuildErrors: false,
  },
  // Transpile modules that need to be processed by Next.js
  transpilePackages: ['jose'],
  // Configure build output
  output: 'standalone',
  // Configure build caching
  distDir: '.next',
  // Configure build optimization
  swcMinify: true,
  // Configure compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configure image optimization
  images: {
    domains: [],
    formats: ['image/webp'],
  },
  // Configure headers for security
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],
};

module.exports = nextConfig;
