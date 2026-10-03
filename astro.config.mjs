// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { externalLinks } from './src/lib/markdown-external-links.mjs';
import { SITE, BASE_PATH } from './site.config.mjs';

// The launch switch lives in site.config.mjs.
export default defineConfig({
  site: SITE,
  base: BASE_PATH || '/',
  trailingSlash: 'ignore',
  markdown: {
    processor: satteri({ hastPlugins: [externalLinks] }),
  },
});
