export type PublicationKind = 'notes' | 'essays' | 'daily';

export interface Publication {
  date: Date;
  kind: PublicationKind;
}

export interface ActivityDay {
  date: string;
  notes: number;
  essays: number;
  daily: number;
  total: number;
  level: number;
}

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function buildActivityDays(
  publications: Publication[],
  endDate: Date,
  numberOfDays: number,
): ActivityDay[] {
  if (!Number.isInteger(numberOfDays) || numberOfDays <= 0) return [];

  const endDay = Date.parse(`${toDateKey(endDate)}T00:00:00.000Z`);
  const startDay = endDay - (numberOfDays - 1) * DAY_IN_MS;
  const activity = new Map<string, Omit<ActivityDay, 'date' | 'total' | 'level'>>();

  for (const publication of publications) {
    const timestamp = Date.parse(`${toDateKey(publication.date)}T00:00:00.000Z`);
    if (timestamp < startDay || timestamp > endDay) continue;

    const key = toDateKey(publication.date);
    const counts = activity.get(key) ?? { notes: 0, essays: 0, daily: 0 };
    counts[publication.kind] += 1;
    activity.set(key, counts);
  }

  return Array.from({ length: numberOfDays }, (_, index) => {
    const date = toDateKey(new Date(startDay + index * DAY_IN_MS));
    const counts = activity.get(date) ?? { notes: 0, essays: 0, daily: 0 };
    const total = counts.notes + counts.essays + counts.daily;

    return {
      date,
      ...counts,
      total,
      level: Math.min(4, total),
    };
  });
}
