import { describe, expect, it } from 'vitest';

import { buildActivityDays } from '../src/lib/activity';

describe('buildActivityDays', () => {
  it('groups every publication type by calendar day', () => {
    const days = buildActivityDays(
      [
        { date: new Date('2026-08-17T02:00:00Z'), kind: 'notes' },
        { date: new Date('2026-08-17T18:00:00Z'), kind: 'notes' },
        { date: new Date('2026-08-17T12:00:00Z'), kind: 'essays' },
        { date: new Date('2026-08-17T06:00:00Z'), kind: 'daily' },
      ],
      new Date('2026-08-18T12:00:00Z'),
      2,
    );

    expect(days[0]).toEqual({
      date: '2026-08-17',
      notes: 2,
      essays: 1,
      daily: 1,
      total: 4,
      level: 4,
    });
  });

  it('fills missing dates and keeps the requested range inclusive', () => {
    const days = buildActivityDays([], new Date('2026-08-18T12:00:00Z'), 3);

    expect(days).toEqual([
      { date: '2026-08-16', notes: 0, essays: 0, daily: 0, total: 0, level: 0 },
      { date: '2026-08-17', notes: 0, essays: 0, daily: 0, total: 0, level: 0 },
      { date: '2026-08-18', notes: 0, essays: 0, daily: 0, total: 0, level: 0 },
    ]);
  });

  it('ignores publications outside the requested range', () => {
    const days = buildActivityDays(
      [
        { date: new Date('2026-08-15T12:00:00Z'), kind: 'notes' },
        { date: new Date('2026-08-18T12:00:00Z'), kind: 'daily' },
        { date: new Date('2026-08-19T12:00:00Z'), kind: 'essays' },
      ],
      new Date('2026-08-18T12:00:00Z'),
      3,
    );

    expect(days.map(({ date, total }) => ({ date, total }))).toEqual([
      { date: '2026-08-16', total: 0 },
      { date: '2026-08-17', total: 0 },
      { date: '2026-08-18', total: 1 },
    ]);
  });

  it('caps the visual intensity at level four', () => {
    const publications = Array.from({ length: 6 }, () => ({
      date: new Date('2026-08-18T12:00:00Z'),
      kind: 'notes' as const,
    }));

    expect(buildActivityDays(publications, new Date('2026-08-18'), 1)[0]?.level).toBe(4);
  });
});
