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

## Mise en production (Cloudflare Pages)

1. Créer le projet Pages depuis le dépôt GitHub `EddyEtame/the_upgrade_lab`, branche `main`.
2. Commande de build `npm run build`, dossier de sortie `dist`. Node est fixé par `.node-version` (22).
3. Poser les variables ci-dessus dans Pages → Settings → Environment variables. Pour une préversion : `PUBLIC_SITE_INDEXABLE=false`. Pour la mise en ligne validée : `PUBLIC_SITE_URL=https://<domaine>`, `PUBLIC_SITE_INDEXABLE=true`, `PUBLIC_RELEASE_VALIDATED=<date>`.
4. Rattacher le domaine. `public/_headers` pose les en-têtes de sécurité et le cache immuable des polices et de la marque ; `dist/404.html` sert la page 404.
5. Après la première mise en ligne indexable : déclarer `https://<domaine>/sitemap.xml` dans Search Console et Bing Webmaster.

## Où sont les choses

- `src/data/site.ts` — socle : faits gelés, navigation, langues, fentes « en attente ».
- `src/data/offre.ts` — secteurs, vacance, paliers (grille de travail tant que `approuve_le` est nul).
- `src/data/parcours.ts` et `src/data/en.ts` — les cinq niveaux, en français et en anglais.
- `src/data/seo-map.ts` et `registre-mots-cles.json` — intentions par page et registre de motifs.
- `src/pages/` — pages françaises ; `src/pages/en/` — le miroir, même faits, même structure.
- `src/components/Tete.astro` — head, JSON-LD, hreflang ; `Entete.astro`, `Pied.astro` — chrome bilingue.
- `scripts/audit-build.mjs` — la porte.

Les documents internes (plans, kits, PDF, recherche) vivent dans des dossiers ignorés par git.
