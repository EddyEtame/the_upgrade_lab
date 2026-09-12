/**
 * /llms.txt — le résumé citable, pour les moteurs de réponse.
 *
 * Un agent lit ceci et doit pouvoir répondre sans se tromper : ce qui est
 * CONFIRMÉ, ce qui est EN ATTENTE, et la page canonique qui porte chaque fait.
 * Jamais une adresse, jamais un horaire, jamais une affiliation, jamais un nom
 * complet d'enfant. Daté.
 */
import type { APIRoute } from 'astro';
import { SITE, FAITS, PARCOURS, PALIERS, NAV, EN_ATTENTE, PROTECTION, TERRAIN_3X3, URL_SITE, EDITE_LE } from '../data/site';
import { SECTEURS, NB_OUVERTS, NB_SECTEURS, VACANCE_A_JOUR_LE } from '../data/offre';
import { SHORT_ANSWERS } from '../data/seo-map';

export const GET: APIRoute = () => {
  const lignes: string[] = [];
  const L = (s = '') => lignes.push(s);

  L(`# ${SITE.nom} — basket jeunes à ${SITE.ville}, ${SITE.pays}`);
  L();
  L(`> ${SITE.description}`);
  L();
  L(`Dernière mise à jour éditoriale : ${EDITE_LE}. Langue principale : français ; miroir anglais sous ${URL_SITE}/en/ (mêmes faits, mêmes pages).`);
  L();
  L('## Faits confirmés');
  L();
  L(`- Nom : ${SITE.nom} (abréviation ${SITE.nomCourt}). La graphie « ${SITE.varianteFautive} » est une variante fautive du même programme.`);
  L(`- Type : programme de développement de basket pour les jeunes. Statut : ${FAITS.statut}.`);
  L(`- Lieu : ${SITE.lieuPhrase}. Aucune adresse d’entraînement n’est publiée (protection des mineurs).`);
  L(`- Public : filles et garçons de ${FAITS.ageMin} à ${FAITS.ageMax} ans, six catégories : ${FAITS.categories.join(', ')}.`);
  L(`- Parcours : ${FAITS.nombreNiveaux} niveaux — ${PARCOURS.map((n) => n.label).join(', ')}.`);
  L(`- Terrain : ${TERRAIN_3X3.phrase}`);
  L(`- Coordinateur : ${SITE.fondateur}, ${SITE.fondateurRole.toLowerCase()}.`);
  L(`- Partenariats : ${NB_SECTEURS} secteurs d’activité en exclusivité de saison, ${NB_OUVERTS} ouverts au ${VACANCE_A_JOUR_LE}. Paliers : ${PALIERS.map((p) => p.nom).join(', ')}.`);
  L();
  L('## En attente — ne pas déduire, ne pas inventer');
  L();
  for (const f of EN_ATTENTE) L(`- ${f.libelle} : ${f.source}.`);
  L();
  L('## Protection des mineurs — engagements publics');
  L();
  for (const e of PROTECTION) L(`- ${e}`);
  L();
  L('## Pages canoniques');
  L();
  L(`- [Accueil](${URL_SITE}/) : le programme, le parcours, la vacance des secteurs.`);
  for (const l of NAV) {
    L(`- [${l.libelle}](${URL_SITE}${l.href})${l.note ? ` : ${l.note}` : ''}`);
    for (const e of l.enfants ?? []) L(`  - [${e.libelle}](${URL_SITE}${e.href})`);
  }
  L();
  L('## Réponses courtes, citables telles quelles');
  L();
  for (const r of SHORT_ANSWERS.filter((x) => x.verified)) {
    L(`**${r.q}**`);
    L(r.a);
    L();
  }
  L('## Secteurs de partenariat');
  L();
  for (const s of SECTEURS) L(`- ${s.nom} — ${s.statut}${s.reserve ? ` (réserve : ${s.reserve})` : ''}`);
  L();
  L(`Politique d’usage par les agents : ${URL_SITE}/ai.txt`);

  return new Response(lignes.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
