# SEO / GEO — The Upgrade Lab

Mis à jour : 6 septembre 2026. Méthode reprise de `club-de-boxe-blagnac`.

## Requête centrale

La page d'accueil porte l'intention « club de basket Douala ». Le champ complet
des requêtes vit dans `src/data/seo-map.ts`, en français et en anglais, et
l'audit de build vérifie les pages contre ce fichier plutôt que de laisser
bourrer les mots-clés à la main.

**Le site est bilingue parce que le Cameroun l'est.** Le français porte le
marché des sponsors à Douala ; l'anglais porte le fondateur, les régions
anglophones, la diaspora et les recruteurs internationaux. Deux champs
complets, un seul jeu de faits, `hreflang` entre les deux.

## La règle des pages géographiques

Pas de page pour une ville où le programme ne s'entraîne pas. Douala est réel ;
Yaoundé ne l'est pas. Une page `/basket-yaounde/` qui redirait le même contenu
serait exactement le motif que Google sanctionne comme doorway page, et la
sanction porterait sur le domaine entier, pas sur la page.

La portée nationale et continentale s'obtient autrement : par de l'éditorial qui
sert réellement ces requêtes — le parcours du basket au Cameroun, ce
qu'implique une licence fédérale, comment se passe la sélection vers les
académies continentales. Un parent à Yaoundé ou un recruteur à l'étranger lit
ça pour de vraies raisons.

## Les 18 pages, et pourquoi aucune n'est une doorway page

Voir `PAGE_INTENTS` dans `src/data/seo-map.ts`. Chacune décrit **une chose
différente** : cinq niveaux de parcours, cinq paliers de partenariat,
l'encadrement, la protection des mineurs, l'inscription, les questions. Jamais
la même chose réétiquetée.

Le palier Silver promet « votre propre page sur le site ». Cette promesse est
donc aussi une décision de référencement : chaque sponsor vendu ajoute une URL
réelle et indexable.

## Verrou d'indexabilité

Double verrou, repris de Blagnac. `PUBLIC_SITE_INDEXABLE=false` par défaut, plus
`PUBLIC_RELEASE_VALIDATED` qui doit être renseigné explicitement. Tant que les
deux ne sont pas levés : `noindex,nofollow,noarchive,nosnippet`, robots
`Disallow: /`, sitemap vide. Le canonical de repli utilise le TLD réservé
`.invalid`.

Aucune réponse marquée `verified:false` dans `SHORT_ANSWERS` ne part en build
public. Aujourd'hui cela concerne le lieu d'entraînement et le coût par athlète,
tous deux en attente du questionnaire d'entrée.

## Fichiers agents (GEO)

`llms.txt`, `llms-full.txt`, `ai.txt`, `mcp.json`. Pour un programme qui cherche
des sponsors, être citable par un moteur de réponse compte peut-être davantage
qu'un rang de lien bleu : un directeur RSE tape aujourd'hui « programmes
jeunesse à Douala à sponsoriser » dans un assistant, et la réponse se fabrique
à partir de ces fichiers.

Règles : distinguer les faits confirmés de ce qui est en attente, dater,
pointer la page canonique qui porte le fait, ne jamais déduire un lieu depuis
une photo ou un nom de fichier, refléter exactement le contenu visible.

## Données structurées

Au lancement : `WebSite`, `WebPage`, `AboutPage`, `ContactPage`, `FAQPage`.
Après validation seulement : `SportsOrganization`, `SportsActivityLocation`,
`PostalAddress`, `openingHoursSpecification`, `sameAs`. Aucune note
autoattribuée, aucun palmarès sans source.

**Jamais d'adresse ni d'horaire d'entraînement publiés à côté d'images de
mineurs** — c'est l'annexe A de la note de cadrage, et ça prime sur le SEO
local. Le NAP complet attendra une décision explicite de Blaise.
