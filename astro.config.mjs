import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import 'dotenv/config';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import remarkGemoji from 'remark-gemoji';
import Icons from 'unplugin-icons/vite';

import { defineConfig } from 'astro/config';

import { env } from './src/conf';

// https://astro.build/config
export default defineConfig({
  site: env.BASE_URL,
  output: 'hybrid',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  image: {
    domains: ['cdn.sharath.uk'],
  },
  integrations: [
    mdx({
      remarkPlugins: [remarkGemoji],
      rehypePlugins: [rehypeAccessibleEmojis],
    }),
    sitemap({ filter: ({ url }) => !url.includes('/q') }),
    tailwind(),
    react(),
  ],
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
      }),
    ],
  },
});
