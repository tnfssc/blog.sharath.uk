import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    heroImage: z.string(),
    tags: z.array(z.string()),
    public: z.boolean().default(false),
  }),
});

export const collections = { blog };
