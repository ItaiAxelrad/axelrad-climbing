import PostLink from '@/components/PostLink';
import getPosts from '@/lib/api';
import { groupBy } from '@/lib/groupBy';
import { Container, Text, Title } from '@mantine/core';

type Params = Promise<{ year: string }>;

export async function generateStaticParams() {
  const posts = await getPosts('');
  const groupedPosts = groupBy(posts, 'dir');

  return Object.keys(groupedPosts).map((year) => ({
    year,
  }));
}

export default async function Posts({ params }: { params: Params }) {
  const { year } = await params;
  const posts = await getPosts(year);

  return (
    <Container size='sm' my={{ base: 'xs', sm: 'xl' }}>
      <Title>
        Posts from {year}{' '}
        <Text c='dimmed' fz='inherit' span>
          ({posts.length})
        </Text>
      </Title>
      {posts.map((post) => (
        <PostLink key={post.order} post={post} />
      ))}
    </Container>
  );
}
