'use client';

import { getPagesLocal } from '@/lib/localMd';
import { Avatar, Button, Kbd } from '@mantine/core';
import { Spotlight, SpotlightActionData, spotlight } from '@mantine/spotlight';
import { IconPhoto, IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Search() {
  const router = useRouter();
  const [actions, setActions] = useState<SpotlightActionData[] | null>(null);

  useEffect(() => {
    async function fetchActions() {
      const pages = await getPagesLocal('');
      const actions = pages.map((page) => ({
        id: String(page.order),
        label: page.title,
        description: `${new Date(page.publishedAt).toLocaleDateString(
          'en-US',
        )} - ${page.author}`,
        onClick: () => router.push(`/posts/${page.dir}/${page.slug}`),
        keywords: page.tags,
        leftSection: (
          <Avatar src={page.thumbnail} alt={page.title} radius='md'>
            <IconPhoto />
          </Avatar>
        ),
      }));
      setActions(actions);
    }
    fetchActions();
  });

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
