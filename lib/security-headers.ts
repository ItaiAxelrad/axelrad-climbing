export const ContentSecurityPolicy = `
  connect-src *;
  default-src 'self' vercel.live data:;
  font-src 'self' data:;
  frame-src  https://www.youtube.com https://www.instagram.com https://www.vimeo.com;
  img-src * blob: data:;
  media-src 'none';
  object-src 'self' data: image/svg+xml base64; 
  script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com vercel.live va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline';
  worker-src 'self' blob: ;
`;

export const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

export const imageSources = [
  'images.unsplash.com',
  'lh3.googleusercontent.com',
  'www.youtube.com',
  'i.ytimg.com',
  'player.vimeo.com',
  'www.instagram.com',
  'scontent-den4-1.xx.fbcdn.net',
  'platform-lookaside.fbsbx.com',
  'avatars.githubusercontent.com',
];
