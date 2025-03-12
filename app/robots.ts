import type { MetadataRoute } from 'next';
import { metadata } from './layout';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/dashboard/',
    },
    sitemap: `${metadata.metadataBase}/sitemap.xml'`,
  };
}
