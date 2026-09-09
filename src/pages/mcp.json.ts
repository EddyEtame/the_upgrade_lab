/**
 * /mcp.json — la carte du site pour un agent outillé.
 *
 * Un manifeste statique : qui, quoi, où lire, et les mêmes garde-fous que
 * ai.txt sous forme structurée. Aucune donnée qui ne soit déjà visible sur le
 * site. Les faits en attente sont listés comme tels, jamais comme des valeurs.
 */
import type { APIRoute } from 'astro';
import { SITE, FAITS, PARCOURS, PALIERS, PLAN, EN_ATTENTE, PROTECTION, TERRAIN_3X3, URL_SITE, EDITE_LE } from '../data/site';
import { SECTEURS, VACANCE_A_JOUR_LE } from '../data/offre';

export const GET: APIRoute = () => {
  const carte = {
    name: SITE.nom,
    shortName: SITE.nomCourt,
    version: EDITE_LE,
    description: SITE.description,
    descriptionEn: SITE.descriptionEN,
    url: `${URL_SITE}/`,
    language: ['fr-CM', 'en-CM'],
    entity: {
      type: 'SportsOrganization',
      sport: 'Basketball',
      locality: SITE.ville,
      region: SITE.region,
      country: SITE.pays,
      status: FAITS.statut,
      founder: SITE.fondateur,
      ageRange: [FAITS.ageMin, FAITS.ageMax],
      categories: FAITS.categories,
      pathway: PARCOURS.map((n) => ({ rank: n.rang, label: n.label, url: `${URL_SITE}${n.href}` })),
      court: { format: 'FIBA 3x3', lengthM: TERRAIN_3X3.longueurM, widthM: TERRAIN_3X3.largeurM, baskets: TERRAIN_3X3.paniers, olympic: TERRAIN_3X3.olympique }
    },
    resources: [
      { uri: `${URL_SITE}/llms.txt`, name: 'Résumé citable', mimeType: 'text/plain' },
      { uri: `${URL_SITE}/ai.txt`, name: 'Politique d’usage par les agents', mimeType: 'text/plain' },
      { uri: `${URL_SITE}/sitemap.xml`, name: 'Plan du site', mimeType: 'application/xml' },
      ...PLAN.map((l) => ({ uri: `${URL_SITE}${l.href}`, name: l.libelle, mimeType: 'text/html', description: l.note ?? undefined }))
    ],
    partnerships: {
      tiers: PALIERS.map((p) => ({ key: p.key, name: p.nom, url: `${URL_SITE}${p.href}`, priceConfirmed: false })),
      sectors: SECTEURS.map((s) => ({ key: s.cle, name: s.nom, status: s.statut })),
      vacancyCheckedOn: VACANCE_A_JOUR_LE
    },
    pending: EN_ATTENTE.map((f) => ({ key: f.cle, label: f.libelle, source: f.source })),
    safeguarding: PROTECTION,
    policy: {
      neverInfer: ['training address or venue', 'training schedule', 'federal or league affiliation', 'membership fees', 'athlete counts', 'coach identities', 'any minor’s full name'],
      neverMergeWith: 'any other organisation with a similar name',
      priceGrid: 'working draft, pending written approval'
    }
  };
  return new Response(JSON.stringify(carte, null, 2) + '\n', { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
