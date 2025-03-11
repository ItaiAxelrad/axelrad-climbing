import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // output: 'export',
  pageExtensions: ['md', 'ts', 'tsx'],
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};

export default nextConfig;
