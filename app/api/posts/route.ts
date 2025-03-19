import getPosts from '@/lib/api';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getPosts('');
  return Response.json(posts);
}
