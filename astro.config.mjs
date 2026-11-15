// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Where the site lives. When a custom domain is connected:
//   1. set SITE to it, e.g. 'https://jeyavardhan.dev'
//   2. set BASE to '/'
//   3. put the bare domain (jeyavardhan.dev) in public/CNAME
const SITE = 'https://jeyavardhan-l.github.io';
const BASE = '/My-Portfolio';

export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      defaultColor: false,
    },
  },
});
