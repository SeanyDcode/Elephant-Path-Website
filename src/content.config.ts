// Content collections: the blog and the library.
// Each entry is a Markdown file in src/content/<collection>/.
// The browser-based editor (Phase 4) will read and write these same files.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { focusAreaIds } from './config/site';

const category = z.enum(focusAreaIds);

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    categories: z.array(category).default([]),
    draft: z.boolean().default(false),
    sample: z.boolean().default(false), // shows a [SAMPLE] marker
  }),
});

const library = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/library' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    category,
    note: z.string(), // one line about why it's recommended
    link: z.url().optional(),
    sample: z.boolean().default(false),
  }),
});

export const collections = { blog, library };
