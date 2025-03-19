'use client';

import { type Post } from '@/lib/api';
import { ActionIcon, Avatar, Button, Kbd } from '@mantine/core';
import { Spotlight, spotlight } from '@mantine/spotlight';
import { IconPhoto, IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Search() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`${window.origin}/api/posts`);
      const data = await res.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  const actions = posts?.map((post) => ({
    id: String(post.order),
    label: post.title,
    description: `${new Date(post.publishedAt).toLocaleDateString(
      'en-US',
    )} - ${post.author} - ${post.location}`,
    onClick: () => router.push(`/posts/${post.dir}/${post.slug}`),
    keywords: [post.location, ...(post.tags ?? [])].filter(
      (tag): tag is string => tag !== undefined,
    ),
    leftSection: (
      <Avatar src={post.thumbnail} alt={post.title} radius='md'>
        <IconPhoto />
      </Avatar>
    ),
  }));

  return (
    <>
      <Button
        variant='default'
        color='gray'
        visibleFrom='sm'
        onClick={spotlight.open}
        leftSection={
          <IconSearch size={16} color='var(--mantine-color-dimmed)' />
        }
        rightSection={
          <Kbd ml={5} size='xs'>
            /
          </Kbd>
        }
        styles={{
          root: {
            maxHeight: 34,
          },
          label: {
            fontWeight: '400',
            color: 'var(--mantine-color-dimmed)',
            marginRight: '3rem',
          },
        }}
      >
        Search
      </Button>
      <ActionIcon
        onClick={spotlight.open}
        variant='default'
        color='light'
        size='lg'
        hiddenFrom='sm'
      >
        <IconSearch stroke={1.5} size={22} />
      </ActionIcon>
      <Spotlight
        actions={actions ?? []}
        nothingFound='Nothing found...'
        limit={8}
        shortcut={['/']}
        searchProps={{
          leftSection: <IconSearch size={20} stroke={1.5} />,
          placeholder: 'Search...',
        }}
      />
    </>
  );
}
