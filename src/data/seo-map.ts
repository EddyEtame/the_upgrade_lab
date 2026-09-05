/**
 * Search and answer-engine surface for The Upgrade Lab.
 *
 * Two audiences, one set of facts:
 *   - SEO — crawlers reading titles, headings, links and JSON-LD.
 *   - GEO — answer engines reading llms.txt, ai.txt and the MCP endpoint,
 *           which reward clearly-scoped, dated, citable claims.
 *
 * Keywords are declared here so pages can be checked against them by the build
 * audit rather than stuffed by hand. Nothing here is rendered as hidden text:
 * every term has to earn its place inside a sentence a human would read, or it
 * does not ship.
 *
 * The programme is bilingual because Cameroon is. French carries the sponsor
 * market in Douala; English carries the founder, the anglophone regions, the
 * diaspora and international scouts. Two full keyword fields, one set of facts,
 * hreflang between them.
 *
 * Every value marked TODO is unverified. Nothing marked TODO reaches a public
 * build — see the indexability lock in docs/SEO-GEO.md.
 */

export const LOCATION = {
  city: 'Douala',
  region: 'Littoral',
  country: 'Cameroun',
  countryEN: 'Cameroon',
  /** Douala arrondissements — used only for genuinely local phrasing. */
  boroughs: ['Douala I', 'Douala II', 'Douala III', 'Douala IV', 'Douala V'],
  /** Neighbourhoods people actually name when they say where they train. */
  districts: [
    'Akwa', 'Bonanjo', 'Bonapriso', 'Deido', 'Bali', 'New Bell',
    'Bonaberi', 'Makepe', 'Bonamoussadi', 'Bepanda', 'Logbaba', 'Ndokotti'
  ],
  transport: [
    { mode: 'Taxi jaune', detail: 'course partagee depuis Akwa, Deido et Bonamoussadi.' },
    { mode: 'Moto-taxi', detail: 'acces direct depuis les quartiers voisins.' },
    { mode: 'A pied', detail: 'depuis les etablissements scolaires du secteur.' }
  ],
  /** TODO — confirm with Blaise before any of these appear on a page. */
  landmarks: [] as string[]
} as const;

/**
 * The query field.
 * `head` drives titles and H1/H2. `body` must appear inside real sentences.
 * `related` covers the semantic neighbourhood an answer engine expects.
 */
export const KEYWORDS_FR = {
  head: [
    'club de basket Douala',
    'ecole de basket Douala',
    'centre de formation basket Douala',
    'basket jeunes Douala',
    'academie de basket Cameroun'
  ],
  body: [
    'basket enfant Douala',
    'basket ado Douala',
    'basket fille Douala',
    'entrainement de basket Douala',
    'inscription basket Douala',
    'detection basket Douala',
    'stage de basket Douala',
    'cours de basket Douala',
    'basket U12 Douala',
    'basket U14 Douala',
    'basket U16 Douala',
    'basket U18 Douala',
    'club de basket Littoral',
    'formation basket Cameroun',
    'sport etudes basket Cameroun'
  ],
  related: [
    'bourse sportive basket Cameroun',
    'parrainer un jeune sportif Cameroun',
    'sponsoring sportif Douala',
    'mecenat sportif Cameroun',
    'responsabilite societale entreprise Cameroun',
    'programme jeunesse Douala',
    'encadrement sportif des mineurs',
    'protection de l enfance sport Cameroun',
    'devenir basketteur professionnel Cameroun',
    'academie NBA Afrique',
    'Basketball Africa League',
    'FECABASKET'
  ]
} as const;

export const KEYWORDS_EN = {
  head: [
    'basketball academy Douala',
    'youth basketball Cameroon',
    'basketball club Douala',
    'basketball development programme Cameroon'
  ],
  body: [
    'basketball training Douala',
    'basketball tryouts Douala',
    'girls basketball Cameroon',
    'basketball camp Cameroon',
    'U16 basketball Cameroon',
    'U18 basketball Cameroon',
    'basketball coaching Douala',
    'basketball pathway Africa'
  ],
  related: [
    'sponsor a young athlete Cameroon',
    'basketball scholarship Africa',
    'corporate social responsibility Cameroon',
    'youth sport sponsorship Africa',
    'basketball scouting Central Africa',
    'NBA Academy Africa',
    'Basketball Africa League',
    'safeguarding in youth sport'
  ]
} as const;

export const ALL_KEYWORDS: string[] = [
  ...KEYWORDS_FR.head, ...KEYWORDS_FR.body, ...KEYWORDS_FR.related,
  ...KEYWORDS_EN.head, ...KEYWORDS_EN.body, ...KEYWORDS_EN.related
];

/**
 * Questions the site is written to answer outright — the unit answer engines
 * quote. Each maps to a section or FAQ entry that answers in the first
 * sentence, before any elaboration.
 */
export const ANSWER_TARGETS = [
  'A partir de quel age peut-on rejoindre The Upgrade Lab ?',
  'Ou s entraine le programme a Douala ?',
  'Combien coute une saison pour un jeune ?',
  'Les filles sont-elles acceptees ?',
  'Comment se passe une detection ?',
  'Que devient un athlete a la fin du parcours ?',
  'Comment devenir sponsor du programme ?',
  'Que recoit une entreprise qui parraine une categorie ?',
  'Comment parrainer un seul athlete pour une saison ?',
  'Quelles garanties existent pour la protection des mineurs ?',
  'Qui encadre les entrainements et avec quels diplomes ?',
  'Un jeune sans moyens peut-il participer ?'
] as const;

/**
 * Short answers, written to be lifted verbatim.
 *
 * An answer engine extracts a span, not a page. Each of these is a complete,
 * self-contained sentence that answers its question without the surrounding
 * paragraph, and every one is rendered visibly on the site.
 *
 * Answers with verified:false are placeholders pending the intake
 * questionnaire. They must not reach a public build.
 */
export const SHORT_ANSWERS: { q: string; a: string; verified: boolean }[] = [
  {
    q: 'A partir de quel age peut-on rejoindre The Upgrade Lab ?',
    a: 'Le programme accueille les jeunes de 10 a 20 ans, repartis en six categories : U10, U12, U14, U16, U18 et U20.',
    verified: true
  },
  {
    q: 'Comment fonctionne le parcours de developpement ?',
    a: 'En cinq niveaux successifs — Discover, Develop, Compete, Perform, Progress — qui menent de la decouverte du ballon jusqu aux clubs superieurs, aux academies et aux bourses.',
    verified: true
  },
  {
    q: 'Les filles sont-elles acceptees ?',
    a: 'Oui. Le programme developpe des groupes garcons et filles, et prevoit des places financees par des parrains pour que le manque de moyens n ecarte personne.',
    verified: true
  },
  {
    q: 'Comment parrainer un seul athlete ?',
    a: 'Le parrainage couvre une saison complete pour un jeune nomme — tenue, entrainement et inscription en competition — avec deux rapports ecrits par an sur cette personne.',
    verified: true
  },
  {
    q: 'Ou s entraine le programme a Douala ?',
    a: 'TODO — depend de l accord de terrain. Aucune adresse ni horaire ne sera publie a cote d images de mineurs.',
    verified: false
  },
  {
    q: 'Combien coute une saison pour un jeune ?',
    a: 'TODO — calcule a partir du budget, en attente des chiffres du questionnaire d entree.',
    verified: false
  }
];

/**
 * Pages that carry genuinely distinct content.
 *
 * These are not doorway pages: each describes a different thing, never the same
 * thing relabelled with another city. The doorway risk is called out in
 * docs/SEO-GEO.md and it is the reason there is no /basket-yaounde/ here — the
 * programme does not operate in Yaounde, so a page targeting it would be
 * exactly the pattern Google penalises.
 */
export const PAGE_INTENTS = [
  { url: '/',                        intent: 'club de basket Douala' },
  { url: '/le-programme/',           intent: 'ecole de basket Douala' },
  { url: '/le-parcours/',            intent: 'formation basket Cameroun' },
  { url: '/le-parcours/discover/',   intent: 'initiation basket enfant Douala' },
  { url: '/le-parcours/develop/',    intent: 'entrainement basket jeunes Douala' },
  { url: '/le-parcours/compete/',    intent: 'competition basket jeunes Cameroun' },
  { url: '/le-parcours/perform/',    intent: 'preparation physique basket Cameroun' },
  { url: '/le-parcours/progress/',   intent: 'bourse et academie basket Afrique' },
  { url: '/sponsors/',               intent: 'sponsoring sportif Douala' },
  { url: '/sponsors/friend/',        intent: 'sponsor local club de basket' },
  { url: '/sponsors/bronze/',        intent: 'partenariat sportif Douala' },
  { url: '/sponsors/silver/',        intent: 'sponsor categorie jeune basket' },
  { url: '/sponsors/gold/',          intent: 'partenaire principal club sportif Cameroun' },
  { url: '/sponsors/bourse/',        intent: 'parrainer un jeune sportif Cameroun' },
  { url: '/encadrement/',            intent: 'entraineurs basket Douala' },
  { url: '/protection-des-mineurs/', intent: 'protection de l enfance sport Cameroun' },
  { url: '/rejoindre/',              intent: 'inscription basket Douala' },
  { url: '/questions/',              intent: 'questions club de basket Douala' }
] as const;

export const AREA_SENTENCE = `${LOCATION.city}, region du ${LOCATION.region}, ${LOCATION.country}`;
