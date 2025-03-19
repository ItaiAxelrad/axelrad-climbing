import BaseLayout from '@/components/BaseLayout';
import { theme } from '@/lib/theme';
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axelradclimbing.com'),
  applicationName: 'axelrad-climbing',
  title: 'Axelrad Climbing',
  description: 'The climbing blog of twins Eden, and Itai Axelrad',
  keywords:
    'Itai, Eden, Axelrad, Climbing, Bouldering, California, Colorado, blog, post, twins',
  icons: [
    {
      url: '/favicon.svg',
      type: 'image/svg+xml',
      sizes: 'any',
    },
  ],
  openGraph: {
    type: 'website',
    url: 'https://axelradclimbing.com',
    title: 'Axelrad Climbing',
    description: 'The climbing blog of twins Eden, and Itai Axelrad',
    siteName: 'Axelrad Climbing',
    images: [{ url: 'https://axelradclimbing.com/images/BioPic1.jpg' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel='shortcut icon' href='/favicon.svg' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <BaseLayout>{children}</BaseLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
