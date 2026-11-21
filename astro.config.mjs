// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import { externalLinks } from './src/lib/markdown-external-links.mjs';
import { SITE, BASE_PATH } from './site.config.mjs';

// "Last updated" dates for the sitemap, which help search engines notice new
// and edited blog posts. Each post's date is its updatedDate, or else its
// pubDate. The Blog page takes the date of its newest post. Other pages get
// no date, because there's no reliable one to give them.
function blogDates() {
  const dir = new URL('./src/content/blog/', import.meta.url);
  /** @type {Record<string, Date>} */
  const dates = {};
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    const frontMatter = readFileSync(new URL(file, dir), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
    if (/^draft:\s*true\s*$/m.test(frontMatter)) continue;
    /** @param {string} key */
    const field = (key) => frontMatter.match(new RegExp(`^${key}:\\s*['"]?([^'"\\r\\n]+)`, 'm'))?.[1];
    const date = new Date(field('updatedDate') ?? field('pubDate') ?? '');
    if (!Number.isNaN(date.valueOf())) dates[file.replace(/\.md$/, '')] = date;
  }
  return dates;
}
const postDates = blogDates();
const newestPost = Object.values(postDates).sort((a, b) => b.valueOf() - a.valueOf())[0];

// The launch switch lives in site.config.mjs.
export default defineConfig({
  site: SITE,
  base: BASE_PATH || '/',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // Pages marked no-index (the 404 page) stay out of the sitemap.
      filter: (page) => !/\/404\/?$/.test(page),
      serialize(item) {
        const path = new URL(item.url).pathname.slice(BASE_PATH.length);
        const post = path.match(/^\/blog\/([^/]+)\/$/)?.[1];
        const date = post ? postDates[post] : path === '/blog/' ? newestPost : undefined;
        if (date) item.lastmod = date.toISOString();
        return item;
      },
    }),
  ],
  markdown: {
    processor: satteri({ hastPlugins: [externalLinks] }),
  },
});
