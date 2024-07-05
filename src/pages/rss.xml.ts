import rss from '@astrojs/rss';

import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

import { env } from '@/conf';

export async function GET(context: APIContext) {
  if (!context.site) throw new Error('No site found');

  let posts = await getCollection('blog');
  posts = posts.filter((post) => post.data.public);

  return rss({
    title: env.SITE_TITLE,
    description: env.SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
    })),
  });
}
