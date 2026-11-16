// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Where the site lives: the custom domain, served from the root.
// (The domain itself is set in the repo's Settings → Pages; DNS is at name.com.)
const SITE = 'https://jeyavardhan.dev';
const BASE = '/';

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
