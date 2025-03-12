import type { MetadataRoute } from 'next';
import { metadata } from './layout';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: metadata.applicationName!,
    short_name: metadata.applicationName!,
    description: metadata.description!,
    start_url: metadata.metadataBase!.toString(),
    display: 'standalone',
  };
}
