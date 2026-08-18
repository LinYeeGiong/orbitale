import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

const repositoryRoot = new URL('../', import.meta.url);

describe('release metadata', () => {
  it('publishes Orbitale v0.2.1 as an MIT-licensed Astro theme', async () => {
    const [packageSource, license] = await Promise.all([
      readFile(new URL('package.json', repositoryRoot), 'utf8'),
      readFile(new URL('LICENSE', repositoryRoot), 'utf8'),
    ]);
    const pkg = JSON.parse(packageSource);

    expect(pkg.version).toBe('0.2.1');
    expect(pkg.license).toBe('MIT');
    expect(pkg.repository.url).toContain('LinYeeGiong/AstroOrbitale');
    expect(pkg.keywords).toContain('astro-theme');
    expect(license).toContain('MIT License');
    expect(license).toContain('Copyright (c) 2026 Lin');
  });
});
