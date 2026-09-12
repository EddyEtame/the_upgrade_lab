/**
 * The Upgrade Lab — constantes du site.
 *
 * Ce fichier est le SOCLE. Huit autres agents construisent contre lui et ne
 * peuvent pas poser de questions : tout ce qui est ici est soit mesuré, soit
 * décidé, soit explicitement marqué EN ATTENTE. Rien n'est deviné.
 *
 * Trois règles tenues dans ce fichier :
 *
 *   1. AUCUN FAIT INVENTÉ. Un effectif, un tarif, une adresse, une affiliation,
 *      un palmarès : si ce n'est pas confirmé, la valeur est `null` et la fente
 *      est décrite dans EN_ATTENTE. Une fente vide se voit et se remplit ;
 *      un chiffre inventé se propage et ne se retire jamais.
 *   2. ANNEXE A PRIME. Aucune adresse d'entraînement, aucun horaire, aucun nom
 *      complet d'enfant, aucune photographie de mineur ne transite par ici.
 *   3. LES TEINTES DU LOGO SONT DES APLATS. Le texte lit les rampes de
 *      `brand.ts`. Les seules couleurs de texte posées ici sont le blanc et le
 *      noir sur un aplat, avec leur ratio mesuré en commentaire.
 *
 * Rien dans ce fichier ne s'exécute dans le navigateur : le site est rendu en
 * statique, `EDITE_LE` est donc cuit au build et jamais recalculé côté client.
 */

import { PATHWAY, BRAND, ON_DARK, ON_LIGHT, LOGO } from './brand';
import { LOCATION } from './seo-map';

/* -------------------------------------------------------------------------
   1. LE VERROU D'INDEXABILITÉ
   ---------------------------------------------------------------------- */

/** Une variable d'environnement compte comme « posée » si elle existe, n'est
 *  pas vide, et ne vaut ni `false` ni `0`. L'absence vaut faux. */
const pose = (v: unknown): boolean => {
  if (typeof v !== 'string') return false;
  const s = v.trim().toLowerCase();
  return s !== '' && s !== 'false' && s !== '0' && s !== 'no';
};

/**
 * Double verrou, repris de Blagnac et documenté dans docs/SEO-GEO.md.
 * LES DEUX doivent être posées. Tant que ce n'est pas le cas, chaque page
 * émet `noindex,nofollow,noarchive,nosnippet` — voir Tete.astro.
 */
export const INDEXABLE: boolean =
  pose(import.meta.env.PUBLIC_SITE_INDEXABLE) &&
  pose(import.meta.env.PUBLIC_RELEASE_VALIDATED);

/** Le TLD `.invalid` est un garde délibéré : si l'URL n'est pas configurée,
 *  les canoniques pointent vers quelque chose qui ne peut pas résoudre plutôt
 *  que vers quelque chose de faux. */
export const URL_SITE: string = (
  (import.meta.env.PUBLIC_SITE_URL as string | undefined) ||
  'https://the-upgrade-lab.invalid'
).replace(/\/+$/, '');

/* -------------------------------------------------------------------------
   2. L'IDENTITÉ
   ---------------------------------------------------------------------- */

export const SITE = {
  /** Décision D3 : « The Upgrade Lab », sans trait d'union, partout.
   *  Le lettrage du logo dit UPGRADES-LAB ; c'est le lettrage qui est fautif,
   *  pas le nom, et son nettoyage est déjà accepté par le client. */
  nom: 'The Upgrade Lab',
  nomCourt: 'UGL',
  /** Ciblé comme requête, jamais écrit comme nom. Voir registre-mots-cles.json. */
  varianteFautive: 'The Upgrades Lab',
  devise: 'Grind hard, Win Big',
  fondateur: 'Teke Blaise Mbah',
  fondateurRole: 'Fondateur et coordinateur',
  ville: LOCATION.city,
  region: LOCATION.region,
  pays: LOCATION.country,
  paysEN: LOCATION.countryEN,
  /** Douala, région du Littoral, Cameroun. */
  lieuPhrase: `${LOCATION.city}, région du ${LOCATION.region}, ${LOCATION.country}`,
  langue: 'fr' as const,
  locale: 'fr_CM',
  localeEN: 'en_CM',
  url: URL_SITE,
  /** 155 caractères utiles. Vend ce qui existe : un parcours, une ville, un âge. */
  description:
    "Programme de développement de basket à Douala pour les 10-20 ans, filles et garçons : un parcours en cinq niveaux, de la découverte du ballon aux clubs supérieurs.",
  descriptionEN:
    "Youth basketball development programme in Douala, Cameroon, ages 10 to 20, girls and boys: a five-level pathway from first touch to higher clubs and academies."
} as const;

/** Le drapeau de langue. L'anglais existe dans la stratégie (décision D2) mais
 *  les pages `/en/` ne sont pas encore écrites : tant que `actif` est faux,
 *  l'en-tête n'affiche pas de bascule vers une page qui répondrait 404.
 *  L'agent qui livre la version anglaise bascule ce seul booléen. */
export const LANGUES = {
  fr: { code: 'fr', etiquette: 'Français', abrege: 'FR', racine: '/', actif: true },
  en: { code: 'en', etiquette: 'English', abrege: 'EN', racine: '/en/', actif: true }
} as const;

export type CodeLangue = 'fr' | 'en';

/** Chemin miroir dans l'autre langue. `/le-parcours/` <-> `/en/le-parcours/`.
 *  Sert au hreflang de Tete.astro et à la bascule de l'en-tête. */
export function cheminMiroir(chemin: string, vers: CodeLangue): string {
  const nu = chemin.replace(/^\/en(?=\/|$)/, '') || '/';
  const propre = nu.startsWith('/') ? nu : `/${nu}`;
  if (vers === 'fr') return propre;
  return propre === '/' ? '/en/' : `/en${propre}`;
}

/** Langue d'un chemin, déduite du préfixe. */
export function langueDuChemin(chemin: string): CodeLangue {
  return /^\/en(\/|$)/.test(chemin) ? 'en' : 'fr';
}

/* -------------------------------------------------------------------------
   3. LA NAVIGATION
   ---------------------------------------------------------------------- */

export interface LienNav {
  href: string;
  libelle: string;
  /** Libellé anglais, pour la version `/en/` quand elle sera écrite. */
  en: string;
  /** Visible dans l'en-tête. Les autres n'existent que dans le pied. */
  entete: boolean;
  /** Rendu en bouton chanfreiné plutôt qu'en lien. Un seul dans tout le site. */
  action?: boolean;
  /** Résumé court, utilisé en `title` et par les plans de site. */
  note?: string;
  enfants?: LienNav[];
}

/**
 * Les 18 URL du site vivent dans PAGE_INTENTS (seo-map.ts) ; celles-ci sont
 * les mêmes, ordonnées pour un humain. Rien ici ne pointe vers une page qui
 * n'est pas au plan : un lien mort dans un pied de page est vu par le crawler
 * avant d'être vu par nous.
 */
export const NAV: LienNav[] = [
  {
    href: '/le-programme/',
    libelle: 'Le programme',
    en: 'Programme',
    entete: true,
    note: 'Ce qu’est The Upgrade Lab, pour qui, et sur quel terrain.'
  },
  {
    href: '/le-parcours/',
    libelle: 'Le parcours',
    en: 'Pathway',
    entete: true,
    note: 'Les cinq niveaux, de la découverte à la sortie du programme.',
    enfants: [
      { href: '/le-parcours/discover/', libelle: 'Discover', en: 'Discover', entete: false },
      { href: '/le-parcours/develop/', libelle: 'Develop', en: 'Develop', entete: false },
      { href: '/le-parcours/compete/', libelle: 'Compete', en: 'Compete', entete: false },
      { href: '/le-parcours/perform/', libelle: 'Perform', en: 'Perform', entete: false },
      { href: '/le-parcours/progress/', libelle: 'Progress', en: 'Progress', entete: false }
    ]
  },
  {
    href: '/sponsors/',
    libelle: 'Sponsors',
    en: 'Sponsors',
    entete: true,
    note: 'Ce qu’une entreprise de Douala reçoit en retour, palier par palier.',
    enfants: [
      { href: '/sponsors/friend/', libelle: 'Friend of the Lab', en: 'Friend of the Lab', entete: false },
      { href: '/sponsors/bronze/', libelle: 'Bronze Partner', en: 'Bronze Partner', entete: false },
      { href: '/sponsors/silver/', libelle: 'Silver Partner', en: 'Silver Partner', entete: false },
      { href: '/sponsors/gold/', libelle: 'Gold Partner', en: 'Gold Partner', entete: false },
      { href: '/sponsors/bourse/', libelle: 'Parrainer un athlète', en: 'Sponsor an athlete', entete: false }
    ]
  },
  {
    href: '/encadrement/',
    libelle: 'L’encadrement',
    en: 'Coaching',
    entete: true,
    note: 'Qui encadre les séances, et selon quelle méthode.'
  },
  {
    href: '/protection-des-mineurs/',
    libelle: 'Protection des mineurs',
    en: 'Safeguarding',
    entete: false,
    note: 'Les engagements pris envers les familles, écrits noir sur blanc.'
  },
  {
    href: '/questions/',
    libelle: 'Questions',
    en: 'Questions',
    entete: false,
    note: 'Les réponses aux questions que posent les parents et les partenaires.'
  },
  {
    href: '/rejoindre/',
    libelle: 'Rejoindre',
    en: 'Join',
    entete: true,
    action: true,
    note: 'Comment un jeune entre dans le programme, et comment se passe une détection.'
  }
];

/** L'en-tête n'affiche que celles-ci. Le pied porte le plan complet. */
export const NAV_ENTETE: LienNav[] = NAV.filter((l) => l.entete);

/** Toutes les URL du site, à plat. Sert au plan du pied et aux audits. */
export const PLAN: LienNav[] = NAV.flatMap((l) => [l, ...(l.enfants ?? [])]);

/* -------------------------------------------------------------------------
   4. LE PARCOURS EN CINQ NIVEAUX
   ---------------------------------------------------------------------- */

/**
 * Les cinq niveaux du client, dans son ordre et avec ses mots.
 *
 * `fill` est l'aplat de marque : il ne porte JAMAIS de petit texte.
 * `texteSurNoir` / `texteSurPapier` viennent des rampes : eux seuls portent du
 * texte. `surFill` est la seule couleur autorisée POSÉE SUR l'aplat, et son
 * ratio est mesuré ci-dessous, pas supposé :
 *
 *   blanc sur #0068E0 -> 4.99:1  (AA texte normal)
 *   blanc sur #F0005A -> 4.35:1  (AA grand texte ; d'où le plancher CSS
 *                                 de 1.25rem / 700 sur `.bande-parcours`)
 *   noir  sur #F89800 -> 9.34:1  (AA partout — l'ambre est la teinte claire,
 *                                 c'est précisément pourquoi elle inverse)
 *
 * `chevrons` compte les paliers franchis : la flèche est le jambage gauche du
 * U du logo, et c'est le marqueur de progression du site entier.
 */
export interface Niveau {
  key: string;
  /** Le nom du niveau est en anglais parce que c'est le nom du client. */
  label: string;
  rang: number;
  href: string;
  fill: string;
  surFill: string;
  texteSurNoir: string;
  texteSurPapier: string;
  chevrons: number;
  /** Une phrase, à la première personne du programme. Sert de sous-titre
   *  partout : cartes, pied, sommaire du parcours. */
  promesse: string;
  /** Ce qui se passe réellement à ce niveau. Deux propositions maximum. */
  resume: string;
}

export const PARCOURS: Niveau[] = PATHWAY.map((n, i) => {
  const surFill = n.fill === BRAND.amber ? '#000000' : '#FFFFFF';
  const textes: Record<string, { promesse: string; resume: string }> = {
    discover: {
      promesse: 'Prendre le ballon en main.',
      resume:
        'Le premier contact : dribble, appuis, tir près du panier, et le goût de revenir la semaine suivante.'
    },
    develop: {
      promesse: 'Répéter jusqu’à ce que ça tienne.',
      resume:
        'La technique individuelle se construit, la lecture du jeu commence, le geste résiste enfin à la fatigue.'
    },
    compete: {
      promesse: 'Jouer contre quelqu’un d’autre.',
      resume:
        'La confrontation réelle : les règles, l’arbitrage, le score, et ce que l’émotion fait à un geste appris.'
    },
    perform: {
      promesse: 'Tenir sur toute une saison.',
      resume:
        'Préparation physique, régularité, sommeil et discipline — le passage de « doué » à « fiable ».'
    },
    progress: {
      promesse: 'Passer la porte suivante.',
      resume:
        'La sortie du programme vers un club supérieur, une académie ou une bourse, dossier et contacts à l’appui.'
    }
  };
  return {
    key: n.key,
    label: n.label,
    rang: i + 1,
    href: `/le-parcours/${n.key}/`,
    fill: n.fill,
    surFill,
    texteSurNoir: n.textOnDark,
    texteSurPapier: n.textOnLight,
    chevrons: i + 1,
    ...textes[n.key]
  };
});

/* -------------------------------------------------------------------------
   5. LES PALIERS DE PARTENARIAT
   ---------------------------------------------------------------------- */

/**
 * Les noms des paliers, et RIEN D'AUTRE.
 *
 * Les montants existent, ils sont au dossier commercial, et le dossier
 * commercial ne monte pas dans ce dépôt (.gitignore, ligne 1). Décision D6b :
 * toute modification de l'offre — palier, prix, contrepartie — passe par un
 * registre de recommandations que Blaise approuve. Un agent qui écrirait un
 * montant ici prendrait une décision commerciale à sa place.
 *
 * `montant: null` est donc un fait, pas un oubli.
 */
export interface Palier {
  key: string;
  nom: string;
  href: string;
  chevrons: number;
  /** Confirmé nulle part sur le site public tant que Blaise n'a pas tranché. */
  montant: null;
  montantConfirme: false;
  /** Hors classement : le parrainage n'est pas un palier supérieur, c'est un
   *  autre objet — une saison, un jeune nommé, deux rapports écrits. */
  horsRang?: boolean;
}

export const PALIERS: Palier[] = [
  { key: 'friend', nom: 'Friend of the Lab', href: '/sponsors/friend/', chevrons: 1, montant: null, montantConfirme: false },
  { key: 'bronze', nom: 'Bronze Partner', href: '/sponsors/bronze/', chevrons: 2, montant: null, montantConfirme: false },
  { key: 'silver', nom: 'Silver Partner', href: '/sponsors/silver/', chevrons: 3, montant: null, montantConfirme: false },
  { key: 'gold', nom: 'Gold Partner', href: '/sponsors/gold/', chevrons: 4, montant: null, montantConfirme: false },
  { key: 'bourse', nom: 'Parrainage d’athlète', href: '/sponsors/bourse/', chevrons: 1, montant: null, montantConfirme: false, horsRang: true }
];

/* -------------------------------------------------------------------------
   6. LE REGISTRE DE VÉRITÉ
   ---------------------------------------------------------------------- */

/**
 * Ce qui est confirmé. Une page peut s'appuyer sur n'importe quelle valeur de
 * ce bloc sans vérifier ailleurs.
 */
export const FAITS = {
  ageMin: 10,
  ageMax: 20,
  categories: ['U10', 'U12', 'U14', 'U16', 'U18', 'U20'] as const,
  /** Six catégories, deux genres, cinq niveaux. */
  mixite: 'filles et garçons',
  nombreNiveaux: 5,
  langues: ['français', 'anglais'] as const,
  ville: LOCATION.city,
  /** Le programme démarre. C'est un fait, et il se vend : un sponsor qui entre
   *  maintenant entre au premier jour, pas au dixième anniversaire. */
  statut: 'programme en lancement'
} as const;

/**
 * Ce qui n'est pas confirmé, et où le savoir se trouvera.
 *
 * Une page qui a besoin d'une de ces valeurs dessine la FENTE — classe `.fente`
 * dans base.css — et l'étiquette. Elle ne devine pas, et elle n'ouvre jamais
 * sur l'absence : la vérité vit dans les faits et la FAQ, jamais dans l'accroche.
 */
export const EN_ATTENTE: { cle: string; libelle: string; source: string }[] = [
  { cle: 'terrain', libelle: 'Lieu d’entraînement', source: 'accord de terrain — et Annexe A : jamais publié à côté d’images de mineurs' },
  { cle: 'horaires', libelle: 'Jours et heures des séances', source: 'Annexe A — communiqués par écrit aux familles inscrites, jamais publiés' },
  { cle: 'cotisation', libelle: 'Coût d’une saison pour un jeune', source: 'questionnaire d’entrée, calculé depuis le budget' },
  { cle: 'effectifs', libelle: 'Nombre de jeunes par catégorie', source: 'questionnaire d’entrée' },
  { cle: 'encadrants', libelle: 'Entraîneurs, diplômes et certifications', source: 'questionnaire d’entrée' },
  { cle: 'email', libelle: 'Adresse e-mail de contact', source: 'questionnaire d’entrée, question 39 — à ouvrir sur le domaine' },
  { cle: 'telephone', libelle: 'Ligne téléphonique publique du programme', source: 'questionnaire d’entrée — la ligne personnelle du fondateur n’est pas publiée' },
  { cle: 'reseaux', libelle: 'Comptes officiels du programme', source: 'questionnaire d’entrée' },
  { cle: 'affiliations', libelle: 'Affiliation fédérale', source: 'aucune affiliation à ce jour — s’en réclamer serait un fait faux' }
];

/** Recherche par clé, pour étiqueter une fente sans recopier le libellé. */
export function attente(cle: string) {
  return EN_ATTENTE.find((f) => f.cle === cle);
}

/* -------------------------------------------------------------------------
   7. LE TERRAIN — le recadrage, et il tient dans un objet
   ---------------------------------------------------------------------- */

/**
 * La décision de contenu la plus importante du projet, écrite une seule fois
 * pour que neuf pages en disent la même chose.
 *
 * Une dalle de béton à Douala n'est pas un terrain de 5-contre-5 déficient.
 * Le format FIBA 3x3 fait 15 m sur 11, un seul panier, une raquette
 * réglementaire, une ligne de lancer franc réglementaire, et l'arc à 6,75 m
 * qui sert de ligne à deux points. Et le 3x3 est une DISCIPLINE OLYMPIQUE
 * depuis les Jeux de Tokyo 2020.
 *
 * Donc la surface sur laquelle ces enfants s'entraînent est un terrain
 * réglementaire d'une discipline olympique. L'histoire est une histoire de
 * légitimité — jamais de manque.
 */
export const TERRAIN_3X3 = {
  longueurM: 15,
  largeurM: 11,
  paniers: 1,
  /** L'arc à deux points du 3x3. */
  arcM: 6.75,
  olympique: true,
  premiereOlympiade: 'Tokyo 2020',
  phrase:
    'Une dalle de 15 mètres sur 11 avec un seul panier n’est pas un demi-terrain : c’est un terrain FIBA 3x3 réglementaire, et le 3x3 est une discipline olympique depuis Tokyo 2020.',
  /** L'appui scientifique. On cite l'étude, on ne la paraphrase pas au-delà de
   *  ce qu'elle dit : réduire l'aire de jeu améliore l'acquisition technique. */
  etude: {
    auteurs: 'Buszard, Reid, Masters et Farrow',
    titre: 'Scaling the Equipment and Play Area in Children’s Sport',
    revue: 'Sports Medicine',
    annee: 2016,
    etudesRevues: 25,
    enfants: 989,
    conclusion:
      'À l’échelle de 25 études et 989 enfants, adapter le matériel et l’aire de jeu améliore l’acquisition des habiletés.'
  }
} as const;

/* -------------------------------------------------------------------------
   8. LES ENGAGEMENTS PUBLICS — Annexe A
   ---------------------------------------------------------------------- */

/**
 * Le sous-ensemble publiable de l'Annexe A. Ces quatre lignes sont des
 * engagements, pas du marketing : elles se tiennent, et le pied de page les
 * porte sur chaque page parce qu'un parent ne lit pas toujours la page dédiée.
 */
export const PROTECTION = [
  'Consentement parental écrit avant toute image.',
  'Jamais un nom complet à côté du visage d’un enfant.',
  'Ni adresse ni horaire d’entraînement publiés.',
  'Retrait sous 48 heures, sur simple demande, sans justification.'
] as const;

/** The same four commitments, for the /en/ pages. Same facts, same order. */
export const PROTECTION_EN = [
  'Written parental consent before any image.',
  'Never a full name beside a child’s face.',
  'No training address or schedule published.',
  'Taken down within 48 hours on request, no reason required.'
] as const;

/* -------------------------------------------------------------------------
   9. CONTACT
   ---------------------------------------------------------------------- */

/**
 * Aucune coordonnée n'est publiée tant qu'elle n'est pas confirmée comme
 * coordonnée DU PROGRAMME. La ligne personnelle du fondateur existe dans le
 * dossier interne ; elle n'est pas une coordonnée publique, et la publier
 * serait décider à sa place.
 *
 * Quand `email` reçoit une valeur, le pied de page bascule tout seul de la
 * fente marquée au lien réel. Rien d'autre à changer.
 */
export const CONTACT = {
  email: null as string | null,
  telephone: null as string | null,
  reseaux: [] as { nom: string; url: string }[]
} as const;

/* -------------------------------------------------------------------------
   10. LE LOGO, RÉEXPORTÉ
   ---------------------------------------------------------------------- */

/** Réexport pour qu'une page n'ait qu'un import à faire. La source reste
 *  brand.ts : ne pas recopier ces chemins ailleurs. */
export const MARQUE = LOGO;
export const TEINTES = BRAND;
export const RAMPE_SOMBRE = ON_DARK;
export const RAMPE_CLAIRE = ON_LIGHT;

/* -------------------------------------------------------------------------
   11. LA DATE D'ÉDITION
   ---------------------------------------------------------------------- */

/**
 * Cuit au build. Le site est statique : ce module s'exécute une fois, sur la
 * machine de build, et la chaîne part telle quelle dans le HTML. Aucun
 * `new Date()` n'atteint le navigateur — sur 3G lente à Douala, une date
 * calculée côté client coûterait du JavaScript pour zéro information de plus.
 */
const _build = new Date();

/** ISO court, pour `dateModified` et l'attribut `datetime`. */
export const EDITE_LE: string = _build.toISOString().slice(0, 10);

/** Lisible, en français, pour le pied de page. */
export const EDITE_LE_FR: string = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
}).format(_build);

/** Lisible, en anglais, pour les pages `/en/`. */
export const EDITE_LE_EN: string = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
}).format(_build);

export const ANNEE: number = _build.getUTCFullYear();
