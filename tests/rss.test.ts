import { describe, expect, it } from 'vitest';

import { GET } from '../src/pages/rss.xml';

describe('RSS feed', () => {
  it('emits all published collections with permanent links', async () => {
    const response = await GET({ site: new URL('https://lin.example/') } as never);
    const xml = await response.text();

    expect(response.headers.get('content-type')).toContain('application/xml');
    expect(xml).toContain('https://lin.example/notes/agent-memory/');
    expect(xml).toContain('https://lin.example/essays/public-writing/');
    expect(xml).toContain('https://lin.example/daily/2026-08-17/');
    expect(xml).toContain('从短期上下文到长期可检索记忆');
    expect(xml).not.toContain('<script');
  });
});
