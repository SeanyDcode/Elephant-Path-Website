// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import { externalLinks } from './src/lib/markdown-external-links.mjs';
import { SITE, BASE_PATH } from './site.config.mjs';

// The launch switch lives in site.config.mjs.
export default defineConfig({
  site: SITE,
  base: BASE_PATH || '/',
  trailingSlash: 'ignore',
  // Pages marked no-index (the 404 page) stay out of the sitemap.
  integrations: [sitemap({ filter: (page) => !/\/404\/?$/.test(page) })],
  markdown: {
    processor: satteri({ hastPlugins: [externalLinks] }),
  },
});
