import type { GetImageResult } from 'astro';
import { getImage } from 'astro:assets';
import { getCollection } from 'astro:content';

export type PostImgs = Record<string, GetImageResult>;

export async function GET() {
  const posts = await getCollection('blog');
  const rawImgs = posts.map((p) => p.data.heroImage);
  const imgs = await Promise.all(rawImgs.map((i) => getImage({ src: i, width: 800, height: 500 })));
  const postImgs = new Map(imgs.map((i, idx) => [posts[idx]!.slug, i]));

  const postImgsObj: PostImgs = Object.fromEntries(postImgs);

  return new Response(JSON.stringify(postImgsObj));
}
