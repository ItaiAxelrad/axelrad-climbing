'use client';

import SchemeButton from '@/components/SchemeButton';
import Search from '@/components/Search';
import {
  ActionIcon,
  Anchor,
  AppShell,
  Burger,
  Group,
  NavLink,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBrandYoutubeFilled,
  IconExternalLink,
  IconMountain,
  IconRss,
} from '@tabler/icons-react';
import Link from 'next/link';

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      padding='xs'
      header={{ height: 55 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
    >
      <AppShell.Header p='xs' withBorder>
        <Group
          gap='xl'
          align='center'
          justify='space-between'
          wrap='nowrap'
          px='xs'
        >
          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
          <Group visibleFrom='sm' gap='lg' align='center'>
            <Group gap='xs'>
              <ActionIcon variant='subtle' size='lg' component={Link} href='/'>
                <IconMountain
                  color='var(--mantine-color-yellow-6)'
                  fill='var(--mantine-color-yellow-light)'
                />
              </ActionIcon>
              <Anchor c='text' href='/' fw='bold' fz='lg'>
                Axelrad Climbing
              </Anchor>
            </Group>
            <Anchor c='text' href='/about'>
              About
            </Anchor>
            <Anchor c='text' href='/contact'>
              Contact
            </Anchor>
            <Anchor c='text' href='/posts'>
              Posts
            </Anchor>
          </Group>
          <Group gap='xs'>
            <Search />
            <ActionIcon
              component={Link}
              variant='default'
              color='light'
              size='lg'
              href='/rss'
              target='_blank'
            >
              <IconRss stroke={1.5} size={22} />
            </ActionIcon>
            <ActionIcon
              component={Link}
              variant='default'
              color='red'
              size='lg'
              href='https://www.youtube.com/@axelradclimbing'
              target='_blank'
            >
              <IconBrandYoutubeFilled
                stroke={1.5}
                size={22}
                color='var(--mantine-color-red-6)'
              />
            </ActionIcon>
            <SchemeButton />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p={0} onClick={toggle}>
        <NavLink component={Link} href='/' label='Home' />
        <NavLink component={Link} href='/about' label='About' />
        <NavLink component={Link} href='/contact' label='Contact' />
        <NavLink component={Link} href='/posts' label='Posts' />
        <NavLink
          component={Link}
          href='/rss'
          label='RSS'
          target='_blank'
          leftSection={<IconRss stroke={1.5} size={22} />}
          rightSection={<IconExternalLink stroke={1.5} size={22} />}
        />
        <NavLink
          href='https://www.youtube.com/@axelradclimbing'
          label='YouTube'
          target='_blank'
          leftSection={
            <IconBrandYoutubeFilled
              stroke={1.5}
              size={22}
              color='var(--mantine-color-red-6)'
            />
          }
          rightSection={<IconExternalLink stroke={1.5} size={22} />}
        />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer
        p='xs'
        withBorder={false}
        style={{ position: 'relative' }}
      >
        <Text ta='center' fz='sm' c='dimmed' my='xs'>
          &copy; Axelrad Climbing
        </Text>

      </AppShell.Footer>
    </AppShell>
  );
}
