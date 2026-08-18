import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';

import HomePage from '../src/pages/index.astro';

describe('Orbitale homepage', () => {
  let html: string;

  beforeAll(async () => {
    const container = await AstroContainer.create();
    html = await container.renderToString(HomePage, {
      partial: false,
      request: new Request('https://lin.example/'),
    });
  });

  it('renders the Chinese-first site identity and primary navigation', () => {
    expect(html).toContain('<html lang="zh-CN"');
    expect(html).toContain('LIN / LAB NOTES');
    expect(html).toContain('aria-label="主导航"');
  });

  it('renders the interactive orbit and command terminal', () => {
    expect(html).toContain('data-exploration-orbit');
    expect(html).toContain('data-command-terminal');
    expect(html).toContain('AI AGENTS');
  });

  it('renders publishing statistics from the content collections', () => {
    expect(html).toContain('我的数字花园');
    expect(html).toContain('LEARNING NOTES');
    expect(html).toContain('WRITING ACTIVITY');
  });

  it('renders keyboard-accessible activity cells with real publication counts', () => {
    expect(html).toContain('data-activity-cell');
    expect(html).toContain('aria-label="2026年8月18日，笔记 1 篇，随笔 0 篇，Daily 0 条，共 1 次发布"');
    expect(html).toContain('data-activity-tooltip');
    expect(html).toContain('data-activity-summary');
  });
});
