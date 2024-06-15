import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { imageService } from '@unpic/astro/service';
import { defineConfig } from 'astro/config';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
  site: 'https://blog.sharath.uk',
  output: 'static',
  integrations: [mdx(), sitemap(), tailwind()],
  image: { service: imageService() },
  vite: { plugins: [Icons({ compiler: 'astro' })] },
});