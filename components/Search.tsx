'use client';

import getPosts from '@/lib/api';
import { Avatar, Button, Kbd } from '@mantine/core';
import { Spotlight, spotlight, SpotlightActionData } from '@mantine/spotlight';
import { IconPhoto, IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Search() {
  const router = useRouter();
  const [actions, setActions] = useState<SpotlightActionData[] | null>(null);

  useEffect(() => {
    async function fetchActions() {
      const posts = await getPosts('');
      const actions = posts.map((post) => ({
        id: String(post.order),
        label: post.title,
        description: `${new Date(post.publishedAt).toLocaleDateString(
          'en-US',
        )} - ${post.author}`,
        onClick: () => router.push(`/posts/${post.dir}/${post.slug}`),
        keywords: post.tags,
        leftSection: (
          <Avatar src={post.thumbnail} alt={post.title} radius='md'>
            <IconPhoto />
          </Avatar>
        ),
      }));
      setActions(actions);
    }
    fetchActions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Button
        variant='default'
        color='gray'
        visibleFrom='xs'
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
