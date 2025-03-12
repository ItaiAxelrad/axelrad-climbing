import PostLink from '@/components/PostLink';
import getPosts from '@/lib/api';
import {
  Badge,
  Button,
  Card,
  CardSection,
  Center,
  Container,
  Group,
  Image,
  Text,
} from '@mantine/core';
import { IconLocation } from '@tabler/icons-react';
import Link from 'next/link';

export default async function Home() {
  const posts = await getPosts('');
  const featuredPost = posts[0];

  return (
    <Container size='sm' my={{ base: 'xs', sm: 'xl' }}>
      {/* <Title>Axelrad Climbing</Title>
      <Text my='xs'>Welcome to the climbing blog of twins Eden and Itai.</Text> */}

      <Card shadow='sm' my='xl' padding='xl' radius='md' withBorder>
        <CardSection>
          <Image src={featuredPost.thumbnail} alt={featuredPost.title} />
        </CardSection>
        <Group justify='space-between' mt='md'>
          <Text fw='bold' fz='xl'>
            {featuredPost.title}
          </Text>
          {featuredPost.location && (
            <Badge
              variant='light'
              leftSection={<IconLocation size={12} stroke={1.5} />}
            >
              {featuredPost.location}
            </Badge>
          )}
        </Group>
        <Text size='sm' c='dimmed'>
          Published{' '}
          {new Date(featuredPost.publishedAt).toLocaleDateString('en-US')} by{' '}
          {featuredPost.author}
        </Text>
        <Text my='md'>
          {featuredPost.content.substring(0, 160).replace(/\!\[.*\)/, '')}
          ...
        </Text>
        <Button
          component={Link}
          href={`/posts/${featuredPost.dir}/${featuredPost.slug}`}
        >
          Read more
        </Button>
      </Card>

      {posts.slice(1, 6).map((post) => (
        <PostLink key={post.order} post={post} />
      ))}
      <Center>
        <Button variant='default' component={Link} href='/posts' my='md'>
          All Posts
        </Button>
      </Center>
    </Container>
  );
}
