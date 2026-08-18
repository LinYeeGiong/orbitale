// @ts-check
import { defineConfig } from 'astro/config';

const site = process.env.PUBLIC_SITE_URL ?? 'https://username.github.io';

export default defineConfig({
  site,
  output: 'static',
});
