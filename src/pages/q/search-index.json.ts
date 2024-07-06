import MiniSearch from 'minisearch';

import { getImage } from 'astro:assets';
import { getCollection } from 'astro:content';

export interface Document {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  tags: string[];
  slug: string;
  image: string;
  date: string;
}

export const fields = ['title', 'subtitle', 'content', 'tags', 'slug'];

export async function GET() {
  const minisearch = new MiniSearch<Document>({
    fields,
    storeFields: ['id', 'title', 'subtitle', 'tags', 'slug', 'image', 'date'],
  });

  let posts = await getCollection('blog');
  posts = posts.filter((post) => post.data.public);
  posts = await Promise.all(
    posts.map(async (p) => ({
      ...p,
      data: { ...p.data, heroImage: (await getImage({ src: p.data.heroImage, width: 800, height: 500 })).src },
    })),
  );

  const documents: Document[] = posts.map((p) => ({
    id: p.id,
    title: p.data.title,
    subtitle: p.data.description,
    content: p.body,
    tags: p.data.tags,
    slug: p.slug,
    image: p.data.heroImage,
    date: p.data.date.toString(),
  }));

  minisearch.addAll(documents);

  return new Response(JSON.stringify(minisearch));
}
