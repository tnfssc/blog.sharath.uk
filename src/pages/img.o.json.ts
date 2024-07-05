import type { GetImageResult } from 'astro';

import { postImgs } from '@/lib/postImgs';

export type PostImgs = Record<string, GetImageResult>;

export async function GET() {
  const postImgsObj = await postImgs();
  return new Response(JSON.stringify(postImgsObj));
}
