# The Upgrade Lab — site

Site statique du programme de basket jeunes de Douala (10–20 ans, garçons et filles, cinq niveaux). Français en `/`, miroir anglais en `/en/`. Astro 5, zéro JavaScript client par défaut, polices auto-hébergées, aucune origine tierce.

## Commandes

```bash
npm install
npm run dev        # http://localhost:4321
npm run verify     # build + audit de doctrine (la porte avant tout push)
npm run preview    # sert dist/ tel que Cloudflare le servira
```

`npm run audit` refuse ce que la doctrine refuse : intention absente du texte visible, fait inventé, teinte du logo utilisée en texte, page trop lourde (100 Ko, accueil 40 Ko gzip), vente négative, image de mineur, adresse ou horaire d'entraînement (annexe A).

## Variables d'environnement

Copier `.env.example` en `.env`. Aucune clé, aucune URL de base en dur dans le code.

| Variable | Rôle |
| --- | --- |
| `PUBLIC_SITE_URL` | URL publique (canonicals, sitemap, hreflang). Sans elle : `.invalid`, qui ne résout jamais. |
| `PUBLIC_SITE_INDEXABLE` | Premier verrou d'indexation. |
| `PUBLIC_RELEASE_VALIDATED` | Second verrou. Les deux doivent être posés pour indexer ; sinon `noindex`, `Disallow: /`, sitemap vide. |
| `PUBLIC_FORMULAIRE_ENDPOINT` | Canal du formulaire de séance d'essai. Vide : la page affiche la fiche à recopier. |
| `PUBLIC_WHATSAPP` | Numéro international, chiffres seuls. Vide : pas de bouton. |

## Mise en production (Cloudflare)

Le site est servi par Cloudflare en ressources statiques depuis `dist/` (Pages fait désormais partie de Workers). Configuration : `wrangler.jsonc`. Aucune clé dans le dépôt : l'authentification est celle de `wrangler login` sur la machine qui déploie.

```bash
npm run deploy     # build + audit, puis envoi seulement si l'audit est vert
```

- Adresse actuelle : https://the-upgrade-lab.etame-eddy01.workers.dev — préversion, indexation verrouillée.
- Le `.env` local porte `PUBLIC_SITE_URL` ; `astro.config.mjs` le lit via `loadEnv`, et une variable posée par l'hébergeur l'emporte.
- Déploiement automatique à chaque push : Cloudflare → Workers & Pages → `the-upgrade-lab` → Settings → Builds → Connect. Dépôt `EddyEtame/the_upgrade_lab`, branche `main`, build `npm run build`, déploiement `npx wrangler deploy`, variables `PUBLIC_*` dans les réglages de build.
- Domaine : Settings → Domains & Routes → Add → Custom domain, une fois `theupgradelab.org` acheté.
- Mise en ligne validée : `PUBLIC_SITE_URL=https://<domaine>`, `PUBLIC_SITE_INDEXABLE=true`, `PUBLIC_RELEASE_VALIDATED=<date>`, puis déclarer `/sitemap.xml` dans Search Console et Bing Webmaster.

## Où sont les choses

- `src/data/site.ts` — socle : faits gelés, navigation, langues, fentes « en attente ».
- `src/data/offre.ts` — secteurs, vacance, paliers (grille de travail tant que `approuve_le` est nul).
- `src/data/parcours.ts` et `src/data/en.ts` — les cinq niveaux, en français et en anglais.
- `src/data/seo-map.ts` et `registre-mots-cles.json` — intentions par page et registre de motifs.
- `src/pages/` — pages françaises ; `src/pages/en/` — le miroir, même faits, même structure.
- `src/components/Tete.astro` — head, JSON-LD, hreflang ; `Entete.astro`, `Pied.astro` — chrome bilingue.
- `scripts/audit-build.mjs` — la porte.

Les documents internes (plans, kits, PDF, recherche) vivent dans des dossiers ignorés par git.
