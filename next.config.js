/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for build caching
  experimental: {
    // Enable build caching
    turbotrace: {
      // Enable turbotrace to optimize build
      logLevel: 'error',
    },
    // Enable server components
    serverComponents: true,
    // Enable concurrent features
    concurrentFeatures: true,
  },
  // Improve TypeScript type checking
  typescript: {
    // Make TypeScript errors fatal in production builds
    ignoreBuildErrors: false,
  },
  // Transpile modules that need to be processed by Next.js
  transpilePackages: ['jose'],
  // Add support for Edge Runtime
  runtime: 'edge',
};

module.exports = nextConfig;
