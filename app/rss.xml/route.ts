import getPosts from '@/lib/api';
import { NextResponse } from 'next/server';
import { metadata } from '../layout';

export const dynamic = 'force-static';

export async function GET() {
  const posts = await getPosts('');

  const itemsXml = posts
    .map(
      (post) =>
        `<item>
          <title>${post.title}</title>
          <link>${metadata.metadataBase}/posts/${post.dir}/${post.slug}</link>
          <description>${post?.content.substring(0, 160).replace(/\!\[.*\)/, '') || ''}</description>
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

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
