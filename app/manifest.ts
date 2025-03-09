import type { MetadataRoute } from 'next';
import { metadata } from './layout';

// type ManifestIcon = {
//   src: string;
//   type?: string;
//   sizes?: string;
//   purpose?: 'any' | 'maskable' | 'monochrome' | 'badge';
// };

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: metadata.applicationName!,
    short_name: metadata.applicationName!,
    description: metadata.description!,
    start_url: metadata.metadataBase!.toString(),
    // background_color: sharedViewport.themeColor!.toString(),
    // theme_color: sharedViewport.themeColor!.toString(),
    // icons: metadata.icons as ManifestIcon[],
    display: 'standalone',
  };
}
