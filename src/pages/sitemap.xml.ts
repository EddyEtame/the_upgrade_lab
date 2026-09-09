/**
 * /sitemap.xml — les URL réelles, avec une fraîcheur honnête.
 *
 * `lastmod` vient du DERNIER COMMIT qui a touché la source de la page, jamais
 * de la date de build : une date de build se remet à jour toute seule et ferait
 * croire au moteur que quelqu'un a relu la page. Si git n'est pas disponible
 * sur la machine de build, on omet lastmod plutôt que de mentir.
 *
 * Vide tant que le double verrou n'est pas levé : un sitemap qui liste des
 * pages en noindex apprend au moteur à ne pas nous croire.
 */
import type { APIRoute } from 'astro';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { INDEXABLE, URL_SITE, PLAN } from '../data/site';

function dateCommit(chemin: string | null): string | null {
  try {
    const cmd = chemin
      ? `git log -1 --format=%cI -- "${chemin}"`
      : 'git log -1 --format=%cI';
    const s = execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    return s ? s.slice(0, 10) : null;
  } catch {
    return null;
  }
}

/** La source d'une URL. Les pages dynamiques renvoient leur gabarit. */
function sourceDe(href: string): string | null {
  const nu = href.replace(/^\/|\/$/g, '');
  if (nu === '') return 'src/pages/index.astro';
  const statique = `src/pages/${nu}/index.astro`;
  if (existsSync(statique)) return statique;
  if (nu.startsWith('le-parcours/')) return 'src/data/parcours.ts';
  if (nu.startsWith('sponsors/')) return 'src/data/offre.ts';
  return null;
}

export const GET: APIRoute = () => {
  const repo = dateCommit(null);
  const urls = INDEXABLE
    ? PLAN.map((l) => {
        const src = sourceDe(l.href);
        const lm = (src && dateCommit(src)) ?? repo;
        return `  <url>\n    <loc>${URL_SITE}${l.href}</loc>${lm ? `\n    <lastmod>${lm}</lastmod>` : ''}\n  </url>`;
      })
    : [];
  const accueil = INDEXABLE
    ? `  <url>\n    <loc>${URL_SITE}/</loc>${repo ? `\n    <lastmod>${repo}</lastmod>` : ''}\n  </url>\n`
    : '';
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    accueil +
    urls.join('\n') +
    (urls.length ? '\n' : '') +
    `</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
