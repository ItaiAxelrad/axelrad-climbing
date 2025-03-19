import PostLink from '@/components/PostLink';
import getPosts from '@/lib/api';
import { groupBy } from '@/lib/groupBy';
import { Container, Group, NavLink, Text, Title } from '@mantine/core';

export default async function Posts() {
  const posts = getPosts('');
  const groupedPosts = groupBy(posts, 'dir');

  return (
    <Container size='sm' my={{ base: 'xs', sm: 'xl' }}>
      <Title>
        All Posts{' '}
        <Text c='dimmed' fz='inherit' span>
          ({posts.length})
        </Text>
      </Title>
      {Object.entries(groupedPosts)
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([year, posts]) => (
          <NavLink
            key={year}
            id={year}
            label={
              <Group align='center' gap='xs'>
                <Text fw='bold' fz='lg' span>
                  {year}
                </Text>
                <Text c='dimmed' fz='lg' span>
                  ({posts.length})
                </Text>
              </Group>
            }
          >
            {posts
              .sort(
                (a, b) =>
                  new Date(a.publishedAt).getTime() -
                  new Date(b.publishedAt).getTime(),
              )
              .map((post) => (
                <PostLink key={post.order} post={post} />
              ))}
          </NavLink>
        ))}
    </Container>
  );
}
