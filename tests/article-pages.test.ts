import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getCollection } from 'astro:content';
import { beforeAll, describe, expect, it } from 'vitest';

import DailyArticlePage from '../src/pages/daily/[...slug].astro';
import EssayArticlePage from '../src/pages/essays/[...slug].astro';
import NoteArticlePage from '../src/pages/notes/[...slug].astro';

describe('content detail pages', () => {
  let noteHtml: string;
  let essayHtml: string;
  let dailyHtml: string;

  beforeAll(async () => {
    const container = await AstroContainer.create();
    const [note] = await getCollection('notes');
    const [essay] = await getCollection('essays');
    const [daily] = await getCollection('daily');

    noteHtml = await container.renderToString(NoteArticlePage, {
      props: { entry: note },
      request: new Request('https://lin.example/notes/agent-memory/'),
    });
    essayHtml = await container.renderToString(EssayArticlePage, {
      props: { entry: essay },
      request: new Request('https://lin.example/essays/public-writing/'),
    });
    dailyHtml = await container.renderToString(DailyArticlePage, {
      props: { entry: daily },
      request: new Request('https://lin.example/daily/2026-08-17/'),
    });
  });

  it('renders note Markdown with article metadata', () => {
    expect(noteHtml).toContain('<article');
    expect(noteHtml).toContain('让 Agent 记住真正重要的事');
    expect(noteHtml).toContain('记忆不只是把所有上下文保存下来');
    expect(noteHtml).toContain('data-article-kind="notes"');
    expect(noteHtml).toContain('application/ld+json');
    expect(noteHtml).toContain('rel="canonical"');
  });

  it('renders essay and Daily through the same article contract', () => {
    expect(essayHtml).toContain('data-article-kind="essays"');
    expect(essayHtml).toContain('多年以后回来看');
    expect(dailyHtml).toContain('data-article-kind="daily"');
    expect(dailyHtml).toContain('它开始不像一个模板');
  });

  it('includes collection navigation and copy-link enhancement', () => {
    expect(noteHtml).toContain('href="/notes/"');
    expect(noteHtml).toContain('data-copy-link');
    expect(dailyHtml).toContain('href="/daily/"');
  });
});
