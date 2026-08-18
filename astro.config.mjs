// @ts-check
import { defineConfig } from 'astro/config';
import { siteConfig } from './src/config/site.ts';

const site = process.env.PUBLIC_SITE_URL ?? siteConfig.siteUrl;

export default defineConfig({
  site,
  output: 'static',
  cacheDir: './.astro',
});
