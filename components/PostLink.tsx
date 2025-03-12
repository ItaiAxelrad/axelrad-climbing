import type { Post } from '@/lib/api';
import { Avatar, NavLink } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import Link from 'next/link';

export default function PostLink({ post }: { post: Post }) {
  return (
    <NavLink
      key={post.order}
      component={Link}
      href={`/posts/${post.dir}/${post.slug}`}
      label={post.title}
      description={`${new Date(post.publishedAt).toLocaleDateString(
        'en-US',
      )} - ${post.author}`}
      leftSection={
        <Avatar src={post.thumbnail} alt={post.title} radius='md'>
          <IconPhoto />
        </Avatar>
      }
    />
  );
}
