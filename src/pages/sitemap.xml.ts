/**
 * /sitemap.xml — les URL réelles, dans les deux langues, avec une fraîcheur
 * honnête.
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
import { INDEXABLE, URL_SITE, PLAN, LANGUES, cheminMiroir } from '../data/site';

function dateCommit(chemin: string | null): string | null {
  try {
    const cmd = chemin ? `git log -1 --format=%cI -- "${chemin}"` : 'git log -1 --format=%cI';
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
  if (nu === 'en') return 'src/pages/en/index.astro';
  const statique = `src/pages/${nu}/index.astro`;
  if (existsSync(statique)) return statique;
  if (/^(en\/)?le-parcours\//.test(nu)) return nu.startsWith('en/') ? 'src/data/en.ts' : 'src/data/parcours.ts';
  if (/^(en\/)?sponsors\//.test(nu)) return nu.startsWith('en/') ? 'src/data/en.ts' : 'src/data/offre.ts';
  return null;
}

export const GET: APIRoute = () => {
  const repo = dateCommit(null);
  const hrefs: string[] = ['/', ...PLAN.map((l) => l.href)];
  if (LANGUES.en.actif) hrefs.push('/en/', ...PLAN.map((l) => cheminMiroir(l.href, 'en')));

  const entree = (href: string) => {
    const lm = (sourceDe(href) && dateCommit(sourceDe(href))) ?? repo;
    const autre = href.startsWith('/en') ? cheminMiroir(href, 'fr') : cheminMiroir(href, 'en');
    const alt = LANGUES.en.actif
      ? `\n    <xhtml:link rel="alternate" hreflang="${href.startsWith('/en') ? 'en' : 'fr'}" href="${URL_SITE}${href}"/>` +
        `\n    <xhtml:link rel="alternate" hreflang="${href.startsWith('/en') ? 'fr' : 'en'}" href="${URL_SITE}${autre}"/>`
      : '';
    return `  <url>\n    <loc>${URL_SITE}${href}</loc>${lm ? `\n    <lastmod>${lm}</lastmod>` : ''}${alt}\n  </url>`;
  };

  const urls = INDEXABLE ? hrefs.map(entree) : [];
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    urls.join('\n') + (urls.length ? '\n' : '') +
    `</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
