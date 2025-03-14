import { securityHeaders } from '@/lib/security-headers';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // output: 'export',
  pageExtensions: ['md', 'ts', 'tsx'],
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  async headers() {
    return [
      {
        // Sets security headers for all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;