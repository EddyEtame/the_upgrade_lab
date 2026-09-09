/**
 * offre.ts — l'offre de partenariat, et le registre de vacance des secteurs.
 *
 * ---------------------------------------------------------------------------
 * POURQUOI CE FICHIER EXISTE À CÔTÉ DE site.ts
 *
 * `PALIERS` dans site.ts porte les NOMS des cinq paliers et `montant: null`,
 * parce que site.ts est le socle : rien d'incertain n'y entre. Ce fichier-ci
 * est l'autre moitié de la décision D6b — le REGISTRE DE RECOMMANDATIONS que
 * Teke Blaise Mbah approuve ligne par ligne.
 *
 * Donc, très précisément :
 *
 *   - les MONTANTS ci-dessous sont une PROPOSITION. Chaque ligne porte
 *     `approuve_le: null`. Tant que ce champ vaut null, la page qui affiche le
 *     montant DOIT afficher aussi la mention `MENTION_GRILLE`. Ce n'est pas une
 *     précaution de style : un tarif publié sans l'accord du fondateur est une
 *     décision commerciale prise à sa place.
 *   - les CONTREPARTIES, elles, sont arrêtées. Elles décrivent ce que le
 *     programme s'engage à livrer, et chacune est livrable par une structure en
 *     lancement, sans effectif inventé et sans image de mineur.
 *
 * ---------------------------------------------------------------------------
 * LE MÉCANISME COMMERCIAL : PUBLIER LA VACANCE
 *
 * Un directeur RSE à qui l'on demande un don arbitre contre toutes les autres
 * demandes de dons. Le même directeur à qui l'on propose UN SECTEUR QU'UN
 * CONCURRENT PEUT PRENDRE arbitre contre ses concurrents. C'est le même argent
 * et ce n'est pas la même décision.
 *
 * D'où `SECTEURS` : huit secteurs de Douala, chacun ouvert ou pris, affichés
 * en clair. Le tableau ne ment jamais dans le sens qui arrangerait — aucun
 * secteur n'est déclaré pris pour fabriquer de la rareté. Quand un partenariat
 * est signé, on passe `statut` à 'pris', on renseigne `partenaire` et `depuis`,
 * on met `VACANCE_A_JOUR_LE` à la date du jour, et le site entier suit. Une
 * seule édition, un seul fichier.
 * ---------------------------------------------------------------------------
 *
 * Aucune raison sociale n'est écrite ici. Les `exemples` décrivent des
 * CATÉGORIES d'entreprises — nommer une société qui n'a rien signé serait
 * exactement le fait inventé que ce dépôt refuse.
 */

import { BRAND } from './brand';

/* -------------------------------------------------------------------------
   1. LES HUIT SECTEURS
   ---------------------------------------------------------------------- */

export type StatutSecteur = 'ouvert' | 'pris';

export interface Secteur {
  cle: string;
  /** Le nom du secteur, tel qu'il est écrit dans le tableau. */
  nom: string;
  /** Étiquette courte, pour la bande de l'accroche. */
  court: string;
  nomEn: string;
  /** Le type d'entreprise visé. Des catégories, jamais des raisons sociales. */
  exemples: string;
  /** L'argument propre à CE secteur. Pas une phrase recyclée huit fois : la
   *  raison pour laquelle ce partenariat-là a du sens pour cette maison-là. */
  argument: string;
  /** Une limite écrite au contrat pour ce secteur, s'il y en a une. */
  reserve?: string;
  statut: StatutSecteur;
  /** Renseigné le jour où une convention est signée. Jamais avant. */
  partenaire: string | null;
  /** Date ISO de début du partenariat. */
  depuis: string | null;
}

export const SECTEURS: Secteur[] = [
  {
    cle: 'banque',
    nom: 'Banque et microfinance',
    court: 'Banque',
    nomEn: 'Banking and microfinance',
    exemples: 'Banque commerciale, établissement de microfinance, mobile money.',
    argument:
      'Un premier compte ouvert à seize ans, c’est un client pour trente ans. Le parcours vous place devant cette classe d’âge, et devant ses parents, avant tout le monde.',
    statut: 'ouvert',
    partenaire: null,
    depuis: null
  },
  {
    cle: 'telecom',
    nom: 'Télécommunications',
    court: 'Télécom',
    nomEn: 'Telecommunications',
    exemples: 'Opérateur mobile, fournisseur d’accès, service de paiement mobile.',
    argument:
      'Les U16 et les U18 sont déjà vos utilisateurs. Ici, votre marque n’achète pas leur attention : elle est associée à ce qu’ils font de leur temps trois fois par semaine.',
    statut: 'ouvert',
    partenaire: null,
    depuis: null
  },
  {
    cle: 'brasserie',
    nom: 'Brasserie et boissons',
    court: 'Boissons',
    nomEn: 'Brewing and beverages',
    exemples: 'Eaux, jus, boissons énergétiques sans alcool, sodas.',
    reserve:
      'Boissons sans alcool uniquement. Aucune marque d’alcool n’est associée à des mineurs, et cette limite est écrite dans la convention.',
    argument:
      'L’hydratation d’un jeune qui s’entraîne sous 30 °C n’est pas un slogan, c’est une ligne de budget. Un partenaire de ce secteur finance quelque chose que l’on voit à chaque séance.',
    statut: 'ouvert',
    partenaire: null,
    depuis: null
  },
  {
    cle: 'assurance',
    nom: 'Assurance',
    court: 'Assurance',
    nomEn: 'Insurance',
    exemples: 'Assurance de personnes, prévoyance, mutuelle santé.',
    argument:
      'Le risque, la prévention, la responsabilité : votre métier est déjà le vocabulaire d’un programme qui encadre des mineurs. Aucun autre secteur n’a une proximité aussi naturelle avec nos engagements.',
    statut: 'ouvert',
    partenaire: null,
    depuis: null
  },
  {
    cle: 'agroalimentaire',
    nom: 'Agroalimentaire',
    court: 'Agro',
    nomEn: 'Food and agribusiness',
    exemples: 'Transformation alimentaire, minoterie, huilerie, produits laitiers.',
    argument:
      'Ce que mange un athlète de quinze ans décide de ce qu’il pourra faire à dix-huit. C’est un vrai sujet, et c’est un sujet qu’un partenaire agroalimentaire peut porter sans forcer.',
    statut: 'ouvert',
    partenaire: null,
    depuis: null
  },
  {
    cle: 'energie',
    nom: 'Énergie et carburants',
    court: 'Énergie',
    nomEn: 'Energy and fuel',
    exemples: 'Distribution de carburants, gaz, production et fourniture d’électricité.',
    argument:
      'Une flotte, des dépôts, des équipes réparties dans toute la ville : le sport des jeunes est le sujet le plus lisible qu’une politique RSE locale puisse porter à Douala.',
    statut: 'ouvert',
    partenaire: null,
    depuis: null
  },
  {
    cle: 'transport',
    nom: 'Transport et logistique',
    court: 'Transport',
    nomEn: 'Transport and logistics',
    exemples: 'Transport de personnes, logistique, transit, messagerie.',
    argument:
      'Emmener une équipe U14 à un tournoi et la ramener le soir est un coût réel et un service que vous savez rendre mieux que quiconque. Une contrepartie peut se payer en nature.',
    statut: 'ouvert',
    partenaire: null,
    depuis: null
  },
  {
    cle: 'distribution',
    nom: 'Distribution',
    court: 'Distribution',
    nomEn: 'Retail and distribution',
    exemples: 'Grande surface, magasin de sport, réseau de proximité.',
    argument:
      'Une opération de rentrée, un corner en rayon, une collecte d’équipement : la distribution est le secteur où une contrepartie se mesure en caisse, et pas seulement en notoriété.',
    statut: 'ouvert',
    partenaire: null,
    depuis: null
  }
];

/**
 * Date à laquelle la vacance ci-dessus a été vérifiée à la main.
 *
 * Ce n'est PAS la date de build : une date de build se remet à jour toute
 * seule et donnerait l'impression fausse que quelqu'un a regardé. Celle-ci se
 * change en même temps qu'un `statut`, jamais autrement.
 */
export const VACANCE_A_JOUR_LE = '2026-09-09';
export const VACANCE_A_JOUR_LE_FR = '9 septembre 2026';

export const secteursOuverts = (): Secteur[] => SECTEURS.filter((s) => s.statut === 'ouvert');
export const secteursPris = (): Secteur[] => SECTEURS.filter((s) => s.statut === 'pris');

export const NB_SECTEURS = SECTEURS.length;
export const NB_OUVERTS = secteursOuverts().length;

/** Écrit en toutes lettres, parce qu'un chiffre isolé dans une phrase de vente
 *  se lit comme un prix. « Huit secteurs » se lit comme une carte. */
export const NB_SECTEURS_LETTRES = 'huit';

/* -------------------------------------------------------------------------
   2. CE QUI NE PEUT PAS DEVENIR PARTENAIRE
   ---------------------------------------------------------------------- */

/**
 * Les exclusions ne sont pas de la morale affichée : ce sont des clauses. Un
 * programme qui encadre des mineurs et qui accepterait un annonceur de paris
 * sportifs perdrait en une saison la confiance qu'il met dix ans à construire —
 * et il exposerait aussi la marque du partenaire assis à côté.
 */
export const EXCLUSIONS: { titre: string; detail: string }[] = [
  {
    titre: 'Alcools et tabac',
    detail:
      'Aucune association possible, à aucun palier, quel que soit le montant proposé. Le programme s’adresse à des jeunes de 10 à 20 ans.'
  },
  {
    titre: 'Paris sportifs et jeux d’argent',
    detail:
      'Exclus par principe : associer un pari à une compétition de mineurs mélange deux choses qui ne doivent jamais se toucher.'
  },
  {
    titre: 'Produits amaigrissants et compléments dopants',
    detail:
      'Rien qui promette un raccourci physique à un corps en croissance ne sera relayé par ce programme.'
  },
  {
    titre: 'Toute campagne utilisant l’image d’un mineur sans accord écrit',
    detail:
      'Y compris celle d’un partenaire. C’est l’Annexe A, et elle prime sur la convention de partenariat.'
  }
];

/* -------------------------------------------------------------------------
   3. LES CINQ PALIERS
   ---------------------------------------------------------------------- */

/** Palier à partir duquel l'exclusivité de secteur est acquise. */
export const PALIER_EXCLUSIVITE = 'silver';

export interface PalierOffre {
  cle: 'friend' | 'bronze' | 'silver' | 'gold' | 'bourse';
  nom: string;
  href: string;
  chevrons: number;
  /** PROPOSITION. Voir `approuve_le` et `MENTION_GRILLE`. */
  montantFCFA: number;
  periode: 'par an';
  /**
   * Date d'approbation écrite par le fondateur. `null` partout aujourd'hui :
   * la grille est un projet, et toute page qui affiche `montantFCFA` affiche
   * aussi `MENTION_GRILLE`.
   */
  approuve_le: null;
  statut: 'projet';
  /** Exclusivité de secteur incluse pour la saison. */
  exclusivite: boolean;
  /** À qui ce palier s'adresse, en une ligne. */
  pour: string;
  /** L'argument du palier. Une phrase, pas un paragraphe. */
  accroche: string;
  /** Ce qui est livré. Arrêté, contrairement au montant. */
  contreparties: string[];
  /** Aplat de marque de la carte. JAMAIS une couleur de texte. */
  fill: string;
  /** La seule couleur autorisée POSÉE SUR cet aplat, ratio mesuré dans
   *  src/data/site.ts : blanc sur bleu 4.99:1, blanc sur rose 4.35:1 en grand
   *  texte, noir sur ambre 9.34:1. */
  surFill: string;
  /** Hors classement : le parrainage n'est pas un palier supérieur. */
  horsRang?: boolean;
}

export const OFFRE: PalierOffre[] = [
  {
    cle: 'friend',
    nom: 'Friend of the Lab',
    href: '/sponsors/friend/',
    chevrons: 1,
    montantFCFA: 100_000,
    periode: 'par an',
    approuve_le: null,
    statut: 'projet',
    exclusivite: false,
    pour: 'Un commerce du quartier, un cabinet, une PME, un ancien joueur devenu patron.',
    accroche:
      'Le palier d’entrée, celui qui met un nom sur une liste que les autres liront.',
    contreparties: [
      'Votre nom et votre logo sur la page Friend of the Lab de ce site, avec un lien vers le vôtre.',
      'Une mention à chaque annonce de rentrée sur les canaux du programme.',
      'Le rapport de fin de saison, deux pages écrites : ce qui a été fait, avec quoi, et ce que ça a coûté.',
      'Une invitation nominative à la présentation de saison.'
    ],
    fill: BRAND.blue,
    surFill: '#FFFFFF'
  },
  {
    cle: 'bronze',
    nom: 'Bronze Partner',
    href: '/sponsors/bronze/',
    chevrons: 2,
    montantFCFA: 350_000,
    periode: 'par an',
    approuve_le: null,
    statut: 'projet',
    exclusivite: false,
    pour: 'Une entreprise installée à Douala qui veut une ligne RSE lisible sans monter un service pour la porter.',
    accroche:
      'Le premier palier où votre marque apparaît sur le terrain et pas seulement sur un écran.',
    contreparties: [
      'Tout ce que contient Friend of the Lab.',
      'Votre marque sur les tenues d’entraînement d’une catégorie — tenues produites avec le budget du partenariat.',
      'Une carte partenaire nommée sur cette page, en haut du tableau des paliers.',
      'Deux rapports écrits par an : un à mi-saison, un à la fin, chiffres du programme à l’appui.',
      'Le droit d’utiliser le nom et le logo du programme dans votre propre communication RSE, sur la durée de la convention.'
    ],
    fill: BRAND.blue,
    surFill: '#FFFFFF'
  },
  {
    cle: 'silver',
    nom: 'Silver Partner',
    href: '/sponsors/silver/',
    chevrons: 3,
    montantFCFA: 750_000,
    periode: 'par an',
    approuve_le: null,
    statut: 'projet',
    exclusivite: true,
    pour: 'Une maison qui veut fermer son secteur avant qu’un concurrent y pense.',
    accroche:
      'Le palier où le partenariat cesse d’être un don et devient une position : votre secteur, pour la saison, à vous seul.',
    contreparties: [
      'Tout ce que contient Bronze Partner.',
      'L’exclusivité de votre secteur pour toute la saison : un seul partenaire par secteur, et le tableau ci-dessus l’affiche publiquement.',
      'Votre propre page sur ce site, à une adresse réelle et indexable, écrite avec vous.',
      'Votre marque sur les maillots de match d’une catégorie d’âge, et le nom de cette catégorie associé au vôtre pendant la saison.',
      'Une intervention du fondateur devant vos équipes, dans vos locaux : ce que le programme fait, ce qu’il apprend, et ce que votre argent a payé.'
    ],
    fill: BRAND.rose,
    surFill: '#FFFFFF'
  },
  {
    cle: 'gold',
    nom: 'Gold Partner',
    href: '/sponsors/gold/',
    chevrons: 4,
    montantFCFA: 2_000_000,
    periode: 'par an',
    approuve_le: null,
    statut: 'projet',
    exclusivite: true,
    pour: 'Le partenaire principal de la saison. Un seul, et son nom se lit à côté de celui du programme.',
    accroche:
      'Le palier qui laisse une trace filmée : une saison entière racontée, et un film que vous gardez.',
    contreparties: [
      'Tout ce que contient Silver Partner.',
      'Le rang de partenaire principal : votre nom associé à celui du programme sur les supports de la saison.',
      'Votre marque sur la face avant des maillots, toutes catégories confondues.',
      'Un sujet filmé de 90 secondes sur la saison, tourné et monté par un prestataire vidéo rémunéré sur le budget du partenariat — le programme commande le film, il ne le tourne pas lui-même — et livré en fichier maître, utilisable douze mois sur vos propres canaux.',
      'Deux rapports écrits, plus un bilan de saison présenté en personne à votre direction.',
      'Le droit de donner votre nom à un parrainage d’athlète financé en plus du palier.'
    ],
    fill: BRAND.amber,
    surFill: '#000000'
  },
  {
    cle: 'bourse',
    nom: 'Parrainage d’un athlète',
    href: '/sponsors/bourse/',
    chevrons: 1,
    montantFCFA: 180_000,
    periode: 'par an',
    approuve_le: null,
    statut: 'projet',
    exclusivite: false,
    horsRang: true,
    pour: 'Une entreprise, une famille, un particulier. Cumulable : on peut en financer un, ou six.',
    accroche:
      'La seule contrepartie du dossier qui a un visage — et c’est précisément pourquoi ce visage n’est jamais publié.',
    contreparties: [
      'Une saison complète financée pour un jeune : tenue, entraînement et inscription en compétition.',
      'Deux rapports écrits par an sur cette personne : progression sportive, assiduité, et ce que le programme observe.',
      'Le nom du jeune vous est communiqué à vous, dans votre rapport. Il n’est jamais publié à côté de votre marque, et aucune photographie ne circule sans le consentement écrit des parents.',
      'La mention « parrain » sur la page de parrainage, si vous la souhaitez — beaucoup préfèrent l’anonymat, et c’est possible.'
    ],
    fill: BRAND.rose,
    surFill: '#FFFFFF'
  }
];

/** Les quatre paliers d'entreprise, dans l'ordre, sans le parrainage. */
export const PALIERS_ENTREPRISE = OFFRE.filter((p) => !p.horsRang);
/** Le parrainage, isolé : ce n'est pas un cinquième palier, c'est autre chose. */
export const PARRAINAGE = OFFRE.find((p) => p.cle === 'bourse')!;

/* -------------------------------------------------------------------------
   4. LA MENTION OBLIGATOIRE
   ---------------------------------------------------------------------- */

/**
 * À afficher partout où un `montantFCFA` est rendu, tant que `approuve_le`
 * vaut null. Elle n'affaiblit pas l'offre : elle dit à un acheteur que la
 * grille est encore ouverte, ce qui est un argument pour entrer maintenant.
 */
export const MENTION_GRILLE = {
  etiquette: 'Grille de travail',
  texte:
    'Les cinq montants ci-dessous sont une proposition, pas un tarif arrêté : chaque ligne attend la validation écrite de Teke Blaise Mbah. Ce qui est arrêté, en revanche, c’est le contenu de chaque palier — les contreparties ne bougeront pas.',
  consequence:
    'Concrètement : un partenaire qui ouvre la discussion maintenant discute encore la grille. Dans six mois, il signera la version imprimée.'
};

/** Toutes les lignes de la grille attendent la même signature. */
export const GRILLE_APPROUVEE = OFFRE.every((p) => p.approuve_le !== null);

/* -------------------------------------------------------------------------
   5. FORMATAGE
   ---------------------------------------------------------------------- */

/**
 * 100000 -> « 100 000 FCFA », avec une espace fine insécable entre les groupes
 * et une espace insécable avant la devise. Un montant ne se coupe jamais en
 * fin de ligne : c'est la seule information de la carte qu'on lit en diagonale.
 */
export function fcfa(montant: number): string {
  const groupes = String(montant).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${groupes} FCFA`;
}

/** Le nombre seul, pour un affichage où la devise est déjà posée à côté. */
export function montantSeul(montant: number): string {
  return String(montant).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/* -------------------------------------------------------------------------
   6. COMMENT ON S'ENGAGE
   ---------------------------------------------------------------------- */

/**
 * Trois étapes, écrites parce qu'un directeur RSE veut savoir combien de
 * réunions ça lui coûte avant de répondre. Aucune de ces étapes ne suppose une
 * structure que le programme n'a pas.
 */
export const ETAPES = [
  {
    rang: 1,
    titre: 'Vous choisissez un secteur et un palier',
    texte:
      'Le tableau de vacance dit ce qui est libre. Une réunion d’une heure suffit à savoir si le palier visé correspond à ce que votre direction attend d’une ligne RSE.'
  },
  {
    rang: 2,
    titre: 'Nous écrivons la convention',
    texte:
      'Une convention d’une saison : le secteur réservé, les contreparties listées une par une, les dates des deux rapports, et les exclusions rappelées noir sur blanc.'
  },
  {
    rang: 3,
    titre: 'La saison commence, et elle se raconte',
    texte:
      'Votre secteur bascule en « pris » sur cette page le jour de la signature. Puis deux rapports écrits, à mi-saison et à la fin — c’est le rapport d’impact que vous remonterez à votre direction.'
  }
];
