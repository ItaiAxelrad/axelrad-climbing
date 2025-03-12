import getPosts from '@/lib/api';
import { Button, Container, Divider, Group } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Params = Promise<{ year: string; slug: string }>;

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { year, slug } = await params;
  const posts = await getPosts('');
  const post = await posts.find((p) => p.slug === slug && p.dir === year);

  if (!post) {
    return notFound();
  }

  const prevPost = posts.find((p) => p.order === post.order - 1);
  const nextPost = posts.find((p) => p.order === post.order + 1);

  return (
    <Container size='sm' my={{ base: 'xs', sm: 'xl' }}>
      {children}
      <Divider mt='xl' mb='xs' />
      <Group justify='space-between'>
        {prevPost ? (
          <Button
            component={Link}
            variant='subtle'
            href={`/posts/${prevPost?.dir}/${prevPost?.slug}`}
            leftSection={<IconChevronLeft size={20} stroke={1.5} />}
          >
            Previous
          </Button>
        ) : (
          <div></div>
        )}
        {nextPost ? (
          <Button
            component={Link}
            variant='subtle'
            href={`/posts/${nextPost?.dir}/${nextPost?.slug}`}
            rightSection={<IconChevronRight size={20} stroke={1.5} />}
          >
            Next
          </Button>
        ) : (
          <div></div>
        )}
      </Group>
    </Container>
  );
}
