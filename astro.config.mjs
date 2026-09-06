import { defineConfig } from 'astro/config';

// Zero client JS by default. Anything interactive ships as a small inline
// script on the page that needs it, never as a framework runtime — the byte
// budget is a design constraint here, not a late optimisation.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://the-upgrade-lab.invalid',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  image: { formats: ['avif', 'webp'] },
  compressHTML: true
});
