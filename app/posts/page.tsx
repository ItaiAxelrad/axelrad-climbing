import PostLink from '@/components/PostLink';
import getPosts from '@/lib/api';
import { groupBy } from '@/lib/groupBy';
import {
  Button,
  Container,
  Group,
  NavLink,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import Form from 'next/form';

type SearchParams = Promise<{ query: string }>;

export default async function Posts({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { query } = await searchParams;
  const posts = await getPosts('');
  const filteredPosts = posts.filter((post) =>
    query ? post.title.toLowerCase().includes(query.toLowerCase()) : true,
  );
  const groupedPosts = groupBy(filteredPosts, 'dir');

  return (
    <Container size='sm' my={{ base: 'xs', sm: 'xl' }}>
      <Title>
        All Posts{' '}
        <Text c='dimmed' fz='inherit' span>
          ({filteredPosts.length})
        </Text>
      </Title>
      <Form action='/posts'>
        <Group gap='xs' my='sm'>
          <TextInput
            name='query'
            placeholder='Search posts'
            defaultValue={query}
          />
          <Button type='submit'>Submit</Button>
        </Group>
      </Form>
      {!filteredPosts.length && (
        <Text ta='center' my='xl'>
          No posts found
        </Text>
      )}
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
            defaultOpened={query ? true : false}
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
