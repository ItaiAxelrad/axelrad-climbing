import type { MetadataRoute } from 'next';
import { metadata } from './layout';

export const dynamic = "force-static"

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
