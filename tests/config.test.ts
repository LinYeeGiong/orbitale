import { describe, expect, it } from 'vitest';

import { siteConfig } from '../src/config/site';

describe('siteConfig', () => {
  it('contains the complete public customization contract', () => {
    expect(new URL(siteConfig.siteUrl).protocol).toBe('https:');
    expect(siteConfig.navigation.map((item) => item.href)).toContain('/notes/');
    expect(siteConfig.terminal.shortcuts).toContain('/explore');
    expect(siteConfig.exploration.every((field) => field.tags.length > 0)).toBe(true);
    expect(siteConfig.footer.links.some((link) => link.href === '/rss.xml')).toBe(true);
  });

  it('keeps personal identity in the configuration', () => {
    expect(siteConfig.name).toBe('Lin');
    expect(siteConfig.brand).toBe('LIN / LAB NOTES');
    expect(siteConfig.terminal.user).toBe('lin');
    expect(siteConfig.location).toContain('SHANGHAI');
  });
});
