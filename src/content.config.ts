import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const sharedSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  lang: z.enum(['zh', 'en']).default('zh'),
  published: z.boolean().default(false),
  translationKey: z.string().optional(),
  cover: z.string().optional(),
});

const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
  schema: sharedSchema.extend({
    series: z.string().optional(),
    readingMinutes: z.number().int().positive().optional(),
  }),
});

const essays = defineCollection({
  loader: glob({ base: './src/content/essays', pattern: '**/*.{md,mdx}' }),
  schema: sharedSchema,
});

const daily = defineCollection({
  loader: glob({ base: './src/content/daily', pattern: '**/*.{md,mdx}' }),
  schema: sharedSchema.extend({
    location: z.string().optional(),
    images: z.array(z.string()).default([]),
  }),
});

export const collections = { notes, essays, daily };
