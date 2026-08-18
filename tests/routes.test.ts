import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';

import AboutPage from '../src/pages/about.astro';
import DailyPage from '../src/pages/daily/index.astro';
import EssaysPage from '../src/pages/essays/index.astro';
import NotesPage from '../src/pages/notes/index.astro';

const pages = [
  { component: AboutPage, path: '/about/', heading: '关于我' },
  { component: NotesPage, path: '/notes/', heading: '学习记录' },
  { component: EssaysPage, path: '/essays/', heading: '随笔' },
  { component: DailyPage, path: '/daily/', heading: '生活切片' },
] as const;

describe('terminal destination routes', () => {
  it.each(pages)('renders $path with its Chinese heading', async ({ component, path, heading }) => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(component, {
      partial: false,
      request: new Request(`https://lin.example${path}`),
    });

    expect(html).toMatch(new RegExp(`<h1[^>]*>${heading}</h1>`));
    expect(html).toContain('LIN / LAB NOTES');
  });
});
