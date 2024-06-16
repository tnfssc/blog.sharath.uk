import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import Icons from 'unplugin-icons/vite';

import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.sharath.uk',
  output: 'static',
  integrations: [mdx(), sitemap(), tailwind(), react()],
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
      }),
    ],
  },
});
