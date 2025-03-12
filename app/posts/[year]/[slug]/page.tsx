import { metadata } from '@/app/layout';
import getPosts from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import {
  Avatar,
  Badge,
  Group,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
} from '@mantine/core';
import { IconLocation } from '@tabler/icons-react';
import { notFound } from 'next/navigation';
import './post.css';

type Params = Promise<{ year: string; slug: string }>;

export async function generateStaticParams() {
  const posts = await getPosts('');

  return posts.map((post) => ({
    year: post.dir,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { year, slug } = await params;
  const posts = await getPosts(year);
  const post = await posts.find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      type: 'article',
      description: post.content.substring(0, 160).replace(/\!\[.*\)/, ''),
      publishedTime: new Date(post.publishedAt).toUTCString(),
      url: `${metadata.metadataBase}/posts/${post.dir}/${post.slug}`,
      images: [
        {
          url: post.thumbnail,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      images: [post.thumbnail],
    },
  };
}

export default async function Blog({ params }: { params: Params }) {
  const { year, slug } = await params;
  const posts = await getPosts(year);
  const post = await posts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Group align='center' justify='space-between'>
        <Group>
          <Avatar
            src={`/images/${post.author}.jpg`}
            alt={`${post.author}'s bio pic`}
          />
          <Stack gap={6}>
            <Text lh={1}>{post.author}</Text>
            <Text c='dimmed' fz='sm' lh={1}>
              {new Date(post.publishedAt).toLocaleDateString('en-US')}
            </Text>
          </Stack>
        </Group>
        {post.location && (
          <Badge
            variant='light'
            leftSection={<IconLocation size={12} stroke={1.5} />}
          >
            {post.location}
          </Badge>
        )}
      </Group>
      <Title my='xs'>{post.title}</Title>
      <TypographyStylesProvider>
        <article
          dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
        />
      </TypographyStylesProvider>
    </>
  );
}
