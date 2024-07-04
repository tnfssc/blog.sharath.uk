import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context: APIContext) {
  if (!context.site) throw new Error('No site found');

  let posts = await getCollection('blog');
  posts = posts.filter((post) => post.data.public);

  return new Response(
    JSON.stringify({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      site: context.site,
      items: posts.map((post) => ({
        ...post.data,
        pubDate: post.data.date,
        link: `/blog/${post.slug}/`,
      })),
    }),
  );
}
