import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

import { siteConfig } from '../config/site';
import { getContentPath, isPublishedChinese, type ContentKind } from '../lib/content';

interface FeedEntry {
  id: string;
  kind: ContentKind;
  title: string;
  description: string;
  date: Date;
  tags: string[];
}

const kindLabels: Record<ContentKind, string> = {
  notes: '笔记',
  essays: '随笔',
  daily: 'Daily',
};

export async function GET(context: APIContext): Promise<Response> {
  const site = context.site ?? new URL(siteConfig.siteUrl);
  if (!['http:', 'https:'].includes(site.protocol)) {
    throw new Error('Orbitale RSS requires an absolute HTTP(S) site URL.');
  }

  const [notes, essays, daily] = await Promise.all([
    getCollection('notes', isPublishedChinese),
    getCollection('essays', isPublishedChinese),
    getCollection('daily', isPublishedChinese),
  ]);
  const entries: FeedEntry[] = [
    ...notes.map(({ id, data }) => ({ id, kind: 'notes' as const, title: data.title, description: data.description, date: data.date, tags: data.tags })),
    ...essays.map(({ id, data }) => ({ id, kind: 'essays' as const, title: data.title, description: data.description, date: data.date, tags: data.tags })),
    ...daily.map(({ id, data }) => ({ id, kind: 'daily' as const, title: data.title, description: data.description, date: data.date, tags: data.tags })),
  ].sort((left, right) => right.date.valueOf() - left.date.valueOf());

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site,
    items: entries.map((entry) => ({
      title: entry.title,
      description: entry.description,
      pubDate: entry.date,
      link: getContentPath(entry.kind, entry.id),
      categories: [kindLabels[entry.kind], ...entry.tags],
    })),
    customData: `<language>${siteConfig.locale}</language>`,
  });
}
