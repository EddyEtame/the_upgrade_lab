/**
 * /robots.txt — piloté par le double verrou.
 *
 * Tant que PUBLIC_SITE_INDEXABLE et PUBLIC_RELEASE_VALIDATED ne sont pas posées
 * toutes les deux, tout est refusé et le sitemap n'est pas annoncé. Aucun agent
 * n'est bloqué nommément : le site VEUT être lu par les moteurs de réponse le
 * jour où il est validé, et ai.txt / llms.txt disent ce qu'ils peuvent en faire.
 */
import type { APIRoute } from 'astro';
import { INDEXABLE, URL_SITE } from '../data/site';

export const GET: APIRoute = () => {
  const corps = INDEXABLE
    ? [
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${URL_SITE}/sitemap.xml`,
        '',
        '# Politique d’usage par les agents : /ai.txt — résumé citable : /llms.txt'
      ].join('\n')
    : [
        '# Version protégée : le site n’est pas encore validé pour l’indexation.',
        'User-agent: *',
        'Disallow: /'
      ].join('\n');
  return new Response(corps + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
