import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

// This file runs before Vite loads .env, so read it explicitly. A variable set
// in the shell or in the host's build settings wins over the local .env.
const env = { ...loadEnv(process.env.NODE_ENV || 'production', process.cwd(), ''), ...process.env };

// Zero client JS by default. Anything interactive ships as a small inline
// script on the page that needs it, never as a framework runtime — the byte
// budget is a design constraint here, not a late optimisation.
export default defineConfig({
  site: env.PUBLIC_SITE_URL || 'https://the-upgrade-lab.invalid',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  image: { formats: ['avif', 'webp'] },
  compressHTML: true
});
