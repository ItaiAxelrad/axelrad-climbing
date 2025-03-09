import { getPagesLocal } from '@/lib/localMd';
import { metadata } from './layout';

export default async function sitemap() {
  const pages = await getPagesLocal('');

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

  const posts = {
    url: `${metadata.metadataBase}/posts`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1,
  };

  const routes = pages.map((post) => ({
    url: `${metadata.metadataBase}/posts/${post.dir}/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  return [about, contact, posts, ...routes];
}
