import { z } from 'astro/zod';

export const envSchema = z.object({
  SITE_TITLE: z.string().optional().default('blog.sharath.uk'),
  SITE_DESCRIPTION: z.string().optional().default('This is a blog where I write about random things.'),
  BASE_URL: z.string().optional().default('https://blog.sharath.uk'),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  SITE_TITLE: import.meta.env.SITE_TITLE,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  SITE_DESCRIPTION: import.meta.env.SITE_DESCRIPTION,
  BASE_URL: import.meta.env.BASE_URL,
});
