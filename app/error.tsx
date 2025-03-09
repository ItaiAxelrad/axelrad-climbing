'use client';

import { Button, Container, Group, Text, Title } from '@mantine/core';
import { IconChevronLeft, IconRefresh } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import BaseLayout from '@/components/BaseLayout';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();
  return (
    <BaseLayout>
      <Container size='xs' my='xl'>
        <Title>Server-side Error</Title>
        <Text my='xs'>
          A server-side error occurred. Please try again or go back.
        </Text>
        <Group my='md'>
          <Button
            leftSection={<IconChevronLeft size={18} />}
            onClick={() => router.back()}
          >
            Go Back
          </Button>
          <Button
            leftSection={<IconRefresh size={18} />}
            onClick={() => reset()}
          >
            Try Again
          </Button>
        </Group>
      </Container>
    </BaseLayout>
  );
}
