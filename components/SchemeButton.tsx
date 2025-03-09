'use client';

import {
  ActionIcon,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';

export default function SchemeButton() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  return (
    <Tooltip
      label={`${computedColorScheme === 'dark' ? 'Light' : 'Dark'} mode`}
      offset={4}
    >
      <ActionIcon
        onClick={() =>
          setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
        }
        variant='default'
        color={computedColorScheme === 'dark' ? 'yellow' : 'indigo'}
        size='lg'
        aria-label='Toggle color scheme'
      >
        {computedColorScheme === 'dark' ? (
          <IconSun
            color='var(--mantine-color-yellow-6)'
            fill='var(--mantine-color-yellow-light)'
            stroke={1.5}
          />
        ) : (
          <IconMoonStars
            color='var(--mantine-color-indigo-6)'
            fill='var(--mantine-color-indigo-light)'
            stroke={1.5}
          />
        )}
      </ActionIcon>
    </Tooltip>
  );
}
