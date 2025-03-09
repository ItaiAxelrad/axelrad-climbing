import '@mantine/core/styles.css';
import '@mantine/spotlight/styles.css';
import type { Metadata } from 'next';
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core';
import { theme } from '@/lib/theme';
import BaseLayout from '@/components/BaseLayout';

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
    images: [{ url: 'https://axelradclimbing.com/logo.png' }],
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
      </head>
      <body>
        <MantineProvider theme={theme}>
          <BaseLayout>{children}</BaseLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
