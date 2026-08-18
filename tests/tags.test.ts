import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';

import TagPage from '../src/pages/tags/[tag].astro';
import type { ContentRecord } from '../src/lib/content';

describe('tag archive page', () => {
  it('combines matching content kinds and links to permanent pages', async () => {
    const entries: ContentRecord[] = [
      { id: 'agent-memory', kind: 'notes', title: '让 Agent 记住真正重要的事', description: 'Memory', date: new Date('2026-08-18'), tags: ['AI'] },
      { id: '2026-08-17', kind: 'daily', title: '博客开始像自己的空间', description: 'Daily', date: new Date('2026-08-17'), tags: ['AI'] },
    ];
    const container = await AstroContainer.create();
    const html = await container.renderToString(TagPage, {
      props: { archive: { tag: 'AI', entries } },
      request: new Request('https://lin.example/tags/AI/'),
    });

    expect(html).toContain('<h1');
    expect(html).toContain('#AI');
    expect(html).toContain('让 Agent 记住真正重要的事');
    expect(html).toContain('博客开始像自己的空间');
    expect(html).toContain('href="/notes/agent-memory/"');
    expect(html).toContain('href="/daily/2026-08-17/"');
  });
});
