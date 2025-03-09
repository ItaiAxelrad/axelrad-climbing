import type { MantineThemeOverride } from '@mantine/core';
import Link from 'next/link';

export const theme: MantineThemeOverride = {
  primaryColor: 'yellow',
  defaultRadius: 'md',
  components: {
    Anchor: {
      defaultProps: {
        component: Link,
      },
    },
  },
};
