import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each project is a folder: src/content/projects/<slug>/index.md, with its
// cover, gallery images and (optionally) diagram.svg next to it.
const projects = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      side: z.enum(['software', 'hardware', 'both']),
      featured: z.boolean().default(false),
      order: z.number().default(100),
      status: z.enum(['shipped', 'in progress', 'archived']).default('shipped'),
      tags: z.array(z.string()).default([]),
      repo: z.url().optional(),
      demo: z.url().optional(),
      cover: image().optional(),
      gallery: z.array(z.object({ src: image(), caption: z.string().default('') })).default([]),
      specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
      draft: z.boolean().default(false),
    }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writing };
