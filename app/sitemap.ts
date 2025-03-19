import getPosts from '@/lib/api';
import type { MetadataRoute } from 'next';
import { metadata } from './layout';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts('');

  const about = {
    url: `${metadata.metadataBase}about`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 1,
  };

  const contact = {
    url: `${metadata.metadataBase}contact`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 1,
  };

  const routes = {
    url: `${metadata.metadataBase}posts`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 1,
  };

  const slugs = posts.map((post) => ({
    url: `${metadata.metadataBase}posts/${post.dir}/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  return [about, contact, routes, ...slugs];
}
