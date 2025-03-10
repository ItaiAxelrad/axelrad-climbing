import PostLink from '@/components/PostLink';
import { groupBy } from '@/lib/groupBy';
import { getPagesLocal } from '@/lib/localMd';
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
  const pages = await getPagesLocal('');
  const filteredPages = pages.filter((page) =>
    query ? page.title.toLowerCase().includes(query.toLowerCase()) : true,
  );
  const groupedPosts = groupBy(filteredPages, 'dir');

  return (
    <Container size='sm' my='xl'>
      <Title>All Posts</Title>
      <Form action='/posts'>
        <Group gap='xs' my='sm'>
          <TextInput
            name='query'
            placeholder='Search posts'
            defaultValue={query}
          />
          <Button type='submit'>Submit</Button>
          {query && (
            <Text fz='sm' c='dimmed'>
              {filteredPages.length} results
            </Text>
          )}
        </Group>
      </Form>
      {!filteredPages.length && (
        <Text ta='center' my='xl'>
          No posts found
        </Text>
      )}
      {Object.entries(groupedPosts).map(([year, posts]) => (
        <NavLink
          key={year}
          id={year}
          label={
            <Text fw='bold' fz='lg'>
              {year}
            </Text>
          }
          defaultOpened
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
