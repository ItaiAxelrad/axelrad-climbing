import getPosts from '@/lib/api';
import { metadata } from './layout';

export default async function sitemap() {
  const posts = await getPosts('');

  const about = {
    url: `${metadata.metadataBase}/about`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1,
  };

  const contact = {
    url: `${metadata.metadataBase}/contact`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1,
  };

  const routes = {
    url: `${metadata.metadataBase}/posts`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1,
  };

  const slugs = posts.map((post) => ({
    url: `${metadata.metadataBase}/posts/${post.dir}/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  return [about, contact, routes, ...slugs];
}
