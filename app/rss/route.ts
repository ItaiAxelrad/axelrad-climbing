import { getPagesLocal } from '@/lib/localMd';
import { metadata } from '../layout';

export async function GET() {
  const pages = await getPagesLocal('');

  const itemsXml = pages
    .map(
      (post) =>
        `<item>
          <title>${post.title}</title>
          <link>${metadata.metadataBase}/posts/${post.dir}/${post.slug}</link>
          <description>${post?.content.substring(0, 100) || ''}</description>
          <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
        </item>`,
    )
    .join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>${metadata.title}</title>
        <link>${metadata.metadataBase}</link>
        <description>${metadata.description}</description>
        ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
