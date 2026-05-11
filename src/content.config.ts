import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string().default('Dos Ríos'),
    description: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    time: z.string(),
    location: z.string(),
    description: z.string(),
    type: z.enum(['milonga', 'practica', 'class', 'workshop']),
    style: z.enum(['traditional', 'nuevo', 'mixed']).optional(),
    featured: z.boolean().default(false),
  }),
});

const schedule = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/schedule' }),
  schema: z.object({
    title: z.string(),
    schedule: z.string(),
    time: z.string(),
    location: z.string(),
    description: z.string(),
    type: z.enum(['milonga', 'practica', 'class', 'workshop']),
    style: z.enum(['traditional', 'nuevo', 'mixed']).optional(),
    note: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    schedule: z.string().optional(),
    time: z.string().optional(),
    location: z.string().optional(),
    cost: z.string().optional(),
    note: z.string().optional(),
  }),
});

export const collections = { blog, events, schedule, pages };
