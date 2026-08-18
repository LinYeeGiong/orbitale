export const contentKinds = ['notes', 'essays', 'daily'] as const;

export type ContentKind = (typeof contentKinds)[number];

export interface ContentRecord {
  id: string;
  kind: ContentKind;
  title: string;
  description: string;
  date: Date;
  tags: string[];
}

export interface ExplorationFieldDefinition {
  id: string;
  label: string;
  title: string;
  description: string;
  href: string;
  tags: readonly string[];
}

export interface ExplorationFieldStats extends ExplorationFieldDefinition {
  count: number;
  latest: string | null;
}

export interface TagArchive {
  tag: string;
  entries: ContentRecord[];
}

interface PublishableEntry {
  data: {
    published: boolean;
    lang: string;
  };
}

export function getContentPath(kind: ContentKind, id: string): string {
  const normalizedId = id.replace(/^\/+|\/+$/g, '');
  return `/${kind}/${normalizedId}/`;
}

export function sortContentRecords(records: readonly ContentRecord[]): ContentRecord[] {
  return [...records].sort((left, right) => right.date.valueOf() - left.date.valueOf());
}

export function getAdjacentRecords(
  records: readonly ContentRecord[],
  currentId: string,
): { previous: ContentRecord | null; next: ContentRecord | null } {
  const sorted = sortContentRecords(records);
  const index = sorted.findIndex(({ id }) => id === currentId);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: sorted[index + 1] ?? null,
    next: sorted[index - 1] ?? null,
  };
}

export function buildExplorationStats(
  definitions: readonly ExplorationFieldDefinition[],
  records: readonly ContentRecord[],
): ExplorationFieldStats[] {
  const sorted = sortContentRecords(records);

  return definitions.map((definition) => {
    const fieldTags = new Set(definition.tags.map((tag) => tag.toLocaleLowerCase()));
    const matches = sorted.filter((record) =>
      record.tags.some((tag) => fieldTags.has(tag.toLocaleLowerCase())),
    );

    return {
      ...definition,
      count: matches.length,
      latest: matches[0]?.title ?? null,
    };
  });
}

export function isPublishedChinese(entry: PublishableEntry): boolean {
  return entry.data.published && entry.data.lang === 'zh';
}

export function getTagArchive(records: readonly ContentRecord[]): TagArchive[] {
  const groups = new Map<string, TagArchive>();

  for (const record of records) {
    for (const tag of record.tags) {
      const key = tag.toLocaleLowerCase();
      const archive = groups.get(key) ?? { tag, entries: [] };
      archive.entries.push(record);
      groups.set(key, archive);
    }
  }

  return [...groups.values()]
    .map((archive) => ({ ...archive, entries: sortContentRecords(archive.entries) }))
    .sort((left, right) => left.tag.localeCompare(right.tag, 'zh-CN'));
}
