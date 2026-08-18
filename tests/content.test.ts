import { describe, expect, it } from 'vitest';

import {
  buildExplorationStats,
  getAdjacentRecords,
  getContentPath,
  getTagArchive,
  isPublishedChinese,
  sortContentRecords,
  type ContentRecord,
} from '../src/lib/content';

const records: ContentRecord[] = [
  {
    id: 'agent-memory',
    kind: 'notes',
    title: 'Agent Memory',
    description: 'Memory note',
    date: new Date('2026-08-18'),
    tags: ['AI', 'Agent'],
  },
  {
    id: 'public-writing',
    kind: 'essays',
    title: 'Public Writing',
    description: 'Essay',
    date: new Date('2026-08-10'),
    tags: ['Writing'],
  },
  {
    id: '2026-08-17',
    kind: 'daily',
    title: 'Lab afternoon',
    description: 'Daily',
    date: new Date('2026-08-17'),
    tags: ['Daily', 'AI'],
  },
];

describe('content model', () => {
  it('builds permanent paths for every content kind and nested IDs', () => {
    expect(getContentPath('notes', 'systems/cache')).toBe('/notes/systems/cache/');
    expect(getContentPath('essays', '/public-writing/')).toBe('/essays/public-writing/');
    expect(getContentPath('daily', '2026-08-17')).toBe('/daily/2026-08-17/');
  });

  it('sorts newest first without mutating the input', () => {
    const originalOrder = records.map(({ id }) => id);
    const sorted = sortContentRecords(records);

    expect(sorted.map(({ id }) => id)).toEqual(['agent-memory', '2026-08-17', 'public-writing']);
    expect(records.map(({ id }) => id)).toEqual(originalOrder);
  });

  it('finds older and newer neighbors from a newest-first list', () => {
    const sorted = sortContentRecords(records);

    expect(getAdjacentRecords(sorted, '2026-08-17')).toEqual({
      previous: sorted[2],
      next: sorted[0],
    });
    expect(getAdjacentRecords(sorted, 'agent-memory')).toEqual({
      previous: sorted[1],
      next: null,
    });
    expect(getAdjacentRecords(sorted, 'missing')).toEqual({ previous: null, next: null });
  });

  it('aggregates each matching entry once across a field tag union', () => {
    const stats = buildExplorationStats(
      [
        {
          id: 'agents',
          label: 'AI AGENTS',
          title: '智能体',
          description: 'Agent work',
          href: '/notes/',
          tags: ['AI', 'Agent'],
        },
        {
          id: 'systems',
          label: '系统',
          title: '系统',
          description: 'Systems',
          href: '/notes/',
          tags: ['Systems'],
        },
      ],
      records,
    );

    expect(stats).toMatchObject([
      { id: 'agents', count: 2, latest: 'Agent Memory' },
      { id: 'systems', count: 0, latest: null },
    ]);
  });

  it('matches exploration tags case-insensitively', () => {
    const [field] = buildExplorationStats(
      [{ id: 'daily', label: 'DAILY', title: 'Daily', description: 'Daily', href: '/daily/', tags: ['daily'] }],
      records,
    );

    expect(field).toMatchObject({ count: 1, latest: 'Lab afternoon' });
  });

  it('filters entries to published Chinese content', () => {
    expect(isPublishedChinese({ data: { published: true, lang: 'zh' } })).toBe(true);
    expect(isPublishedChinese({ data: { published: false, lang: 'zh' } })).toBe(false);
    expect(isPublishedChinese({ data: { published: true, lang: 'en' } })).toBe(false);
  });

  it('groups tags case-insensitively while preserving their first display spelling', () => {
    const archive = getTagArchive([
      ...records,
      { id: 'lowercase-ai', kind: 'notes', title: 'Lowercase AI', description: 'Case test', date: new Date('2026-08-01'), tags: ['ai'] },
    ]);
    const ai = archive.find(({ tag }) => tag === 'AI');

    expect(ai?.entries.map(({ id }) => id)).toEqual(['agent-memory', '2026-08-17', 'lowercase-ai']);
    expect(archive.filter(({ tag }) => tag.toLocaleLowerCase() === 'ai')).toHaveLength(1);
  });
});
