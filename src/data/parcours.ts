/**
 * parcours.ts — le contenu réel des cinq niveaux.
 *
 * site.ts porte la STRUCTURE du parcours : la clé, le rang, l'URL, l'aplat de
 * marque, la valeur de rampe, la promesse et le résumé d'une ligne. Ce fichier
 * porte le TEXTE : ce qui se passe à chaque niveau, ce que l'athlète y apprend,
 * et ce qui le fait passer au niveau suivant.
 *
 * Les deux se rejoignent dans `NIVEAUX`, et une page n'importe que celui-là.
 *
 * ---------------------------------------------------------------------------
 * TROIS RÈGLES TENUES LIGNE À LIGNE DANS CE FICHIER
 *
 *   1. AUCUN FAIT INVENTÉ. Pas d'effectif, pas de tarif, pas d'horaire, pas de
 *      lieu, pas d'affiliation, pas de palmarès. Là où une page a besoin d'une
 *      de ces valeurs, elle liste la clé dans `fentes` et dessine la fente
 *      depuis EN_ATTENTE (site.ts). Une fente vide se remplit ; un chiffre
 *      inventé se propage.
 *
 *   2. LE CONTEXTE N'EST PAS UNE AFFILIATION. La NBA Academy Africa, la
 *      Basketball Africa League et la FECABASKET sont nommées au niveau
 *      Progress parce qu'un parent a le droit de savoir comment le paysage du
 *      basket africain est fait. Le programme n'a de lien avec aucune d'elles,
 *      le texte le dit explicitement à chaque fois, et le bloc « ce que le
 *      programme ne promet pas » existe pour que ce soit impossible à
 *      confondre.
 *
 *   3. ON NE VEND PAS UNE ABSENCE. Aucune accroche de niveau ne commence par
 *      ce qui manque. La vérité de ce qui n'est pas encore là vit dans les
 *      blocs de contexte, dans les fentes et dans la FAQ — jamais dans la
 *      première phrase.
 * ---------------------------------------------------------------------------
 *
 * Sur le ton : trois lecteurs, un seul texte. Un parent cherche à être
 * rassuré, une entreprise cherche à comprendre ce qu'elle finance, et un jeune
 * de quinze ans cherche à savoir ce qu'on attend de lui. Les blocs
 * `apprentissages` et `passage` le tutoient, parce qu'ils s'adressent à lui
 * directement ; le reste de la page le vouvoie ou parle du programme.
 */

import { PARCOURS, type Niveau } from './site';

/* -------------------------------------------------------------------------
   1. LES FORMES
   ---------------------------------------------------------------------- */

export interface Phase {
  titre: string;
  texte: string;
}

export interface Apprentissage {
  titre: string;
  texte: string;
}

/** Une porte de sortie, au niveau Progress. */
export interface Porte {
  titre: string;
  texte: string;
}

export interface QR {
  q: string;
  a: string;
}

export interface Bloc {
  titre: string;
  paragraphes: string[];
  portes?: Porte[];
}

export interface DetailNiveau {
  key: string;
  /** Titre de la page, sans le nom du site : Base.astro ajoute le suffixe. */
  titre: string;
  /** Meta description — 120 à 160 caractères, une vraie phrase de français. */
  description: string;
  /** Intention de recherche, miroir de PAGE_INTENTS dans seo-map.ts. */
  intention: string;
  /** L'accroche. Une ou deux phrases, et elle ne parle jamais d'un manque. */
  accroche: string;
  /** L'ouverture : deux à trois paragraphes qui posent le niveau. */
  ouverture: string[];
  /** Le chiffre du niveau. Chacun est vérifiable : dimensions FIBA 3x3, année
   *  olympique, effectifs de l'étude Buszard 2016, bornes d'âge du programme. */
  signal: { valeur: string; libelle: string };
  /** Le déroulé d'une séance. Aucune durée, aucun horaire, aucun lieu. */
  seance: { titre: string; intro: string; phases: Phase[] };
  /** Ce que l'athlète apprend. S'adresse à lui. */
  apprentissages: { titre: string; intro: string; liste: Apprentissage[] };
  /** Les critères de passage au niveau suivant. Observables, jamais chiffrés
   *  d'un score qui n'existe pas. */
  passage: { titre: string; intro: string; criteres: string[]; note: string };
  /** Le recadrage 3x3, décliné pour ce niveau-ci. */
  terrain: string;
  /** Blocs propres au niveau : contexte, portes de sortie, honnêteté. */
  blocs: Bloc[];
  parents: { titre: string; paragraphes: string[] };
  partenaire: { titre: string; paragraphes: string[] };
  /** Clés de EN_ATTENTE à dessiner en fente sur cette page. */
  fentes: string[];
  faq: QR[];
}

/* -------------------------------------------------------------------------
   2. LES CINQ NIVEAUX
   ---------------------------------------------------------------------- */

const DETAILS: Record<string, DetailNiveau> = {
  /* ---------------------------------------------------------------- DISCOVER */
  discover: {
    key: 'discover',
    titre: 'Discover — niveau 1 du parcours',
    description:
      'Discover, le premier niveau du parcours à Douala : dribble, appuis, tir près du cercle, et tout ce qu’il faut pour revenir la semaine suivante.',
    intention: 'initiation basket enfant Douala',
    accroche:
      'Discover ne demande ni licence, ni passé sportif, ni chaussures neuves. Il demande d’attraper un ballon, et de revenir.',
    ouverture: [
      'C’est le premier niveau, et c’est le plus large : la porte par laquelle tout le monde entre, quel que soit l’âge et quel que soit le point de départ. Un jeune de dix ans qui n’a jamais dribblé et un jeune de seize ans qui joue au quartier depuis trois ans commencent au même endroit — ils n’y restent simplement pas le même temps.',
      'Ce qui se construit ici n’est pas encore du basket : c’est la capacité à faire un geste juste sans y penser. Tenir le ballon sans le regarder. Poser deux appuis. Lancer vers un point précis. Ce sont des habiletés motrices, et elles s’installent d’autant mieux qu’on les répète tôt, souvent, et sur une aire de jeu à la bonne taille.',
      'Discover est aussi le niveau où l’on apprend à faire partie d’un groupe : attendre son tour, prêter un ballon, écouter une consigne jusqu’au bout, ranger le matériel. Rien de spectaculaire — et c’est pourtant ce qui décide qui tiendra la saison.'
    ],
    signal: {
      valeur: '15 × 11 m',
      libelle:
        'la surface sur laquelle on apprend ici est un terrain FIBA 3x3 réglementaire, pas un demi-terrain.'
    },
    seance: {
      titre: 'Le déroulé d’une séance',
      intro:
        'Une séance de Discover suit toujours la même trame, et c’est volontaire : un cadre connu libère la tête pour le geste.',
      phases: [
        {
          titre: 'L’accueil',
          texte:
            'On compte le groupe, on annonce ce qu’on va faire, on dit pourquoi. Trois phrases, pas plus, et tout le monde sait où il va.'
        },
        {
          titre: 'L’échauffement',
          texte:
            'Course, changements d’appuis, coordination, ballon dans les mains le plus tôt possible. Le corps monte en température avant qu’on lui demande quoi que ce soit de précis.'
        },
        {
          titre: 'Le maniement',
          texte:
            'Dribble main droite, dribble main gauche, à hauteur de hanche, tête levée. On ne va pas vite : on va propre, et la vitesse vient après.'
        },
        {
          titre: 'Le tir près du cercle',
          texte:
            'Double appui, planche, la main qui guide et celle qui accompagne. On tire d’assez près pour réussir, parce qu’un geste qu’on ne réussit jamais ne s’apprend pas.'
        },
        {
          titre: 'Le jeu',
          texte:
            'Deux contre deux, trois contre trois, sur un panier. C’est la partie que tout le monde attend, et c’est aussi celle où l’on voit ce qui a été compris.'
        },
        {
          titre: 'La sortie',
          texte:
            'On range, et chacun dit une chose qu’il a retenue. À voix haute, en une phrase. C’est court, et ça fixe la séance mieux qu’un discours.'
        }
      ]
    },
    apprentissages: {
      titre: 'Ce que tu apprends à Discover',
      intro: 'Cinq choses, et elles se vérifient toutes à l’œil nu.',
      liste: [
        {
          titre: 'Dribbler sans regarder le ballon',
          texte:
            'Des deux mains, en marchant puis en courant. Tant que tes yeux sont sur le ballon, tu ne joues pas : tu conduis.'
        },
        {
          titre: 'Le double appui',
          texte:
            'Deux pas après le dribble, et le tir. C’est la première règle du basket que ton corps doit connaître avant ta tête.'
        },
        {
          titre: 'Tirer près du cercle',
          texte:
            'De face, puis en angle, avec la planche. Tu recules quand le geste tient, jamais avant.'
        },
        {
          titre: 'Passer et recevoir',
          texte:
            'Les mains prêtes, les doigts écartés, le regard sur celui qui passe. Recevoir est un geste, pas une attente.'
        },
        {
          titre: 'Le vocabulaire',
          texte:
            'Marcher, reprise de dribble, remise en jeu, faute. Connaître les mots, c’est déjà comprendre la moitié de ce qu’on te demande.'
        }
      ]
    },
    passage: {
      titre: 'Ce qui te fait passer à Develop',
      intro:
        'On ne monte pas parce qu’on a grandi, ni parce qu’on a réussi un joli geste un mardi. On monte quand ces cinq choses sont vraies en même temps, plusieurs séances de suite.',
      criteres: [
        'Tu dribbles des deux mains, en mouvement, sans baisser les yeux.',
        'Tu tires en double appui des deux côtés du panier.',
        'Tu passes et tu reçois sans reculer d’un pas.',
        'Tu connais les règles de base et tu les appliques sans qu’on te les rappelle.',
        'Tu reviens. C’est le critère le plus important de la liste, et de loin.'
      ],
      note:
        'Personne n’est retenu à Discover pour une question d’âge, et personne n’en est poussé dehors pour une question de talent. Un jeune peut y passer une saison entière et devenir excellent ensuite : c’est même le cas le plus fréquent.'
    },
    terrain:
      'À Discover, le panier unique n’est pas une limite, c’est un multiplicateur : sur une aire de 15 mètres sur 11, chaque jeune touche le ballon bien plus souvent que sur un terrain complet, où l’action se déroule parfois à vingt mètres de lui. Et cette aire n’est pas un pis-aller — c’est le terrain réglementaire du 3x3, discipline olympique depuis les Jeux de Tokyo 2020.',
    blocs: [
      {
        titre: 'Un niveau, pas une classe d’âge',
        paragraphes: [
          'Le programme accueille les jeunes de 10 à 20 ans, filles et garçons, en six catégories : U10, U12, U14, U16, U18 et U20. Ces catégories disent l’âge. Les cinq niveaux du parcours, eux, disent l’état du jeu — et les deux ne se superposent pas.',
          'Concrètement : un jeune de dix-sept ans qui découvre le ballon entre à Discover, et un jeune de treize ans qui a déjà trois saisons derrière lui peut être à Compete. Confondre les deux échelles produit des groupes où personne n’apprend — les débutants sont noyés, les avancés s’ennuient.'
        ]
      }
    ],
    parents: {
      titre: 'Ce que Discover demande à une famille',
      paragraphes: [
        'Deux choses : de l’eau, et de la régularité. Pas de matériel coûteux, pas de niveau préalable, pas de test d’entrée à réussir. Une tenue de sport et des chaussures qui tiennent la cheville suffisent — les ballons et le matériel d’atelier relèvent du programme.',
        'Le lieu et les jours des séances sont communiqués par écrit aux familles inscrites. Ils ne figurent pas sur ce site, et c’est un choix : aucune adresse ni aucun horaire d’entraînement de mineurs n’est publié ici.',
        'La régularité, elle, compte plus que tout le reste. Un jeune qui vient chaque semaine pendant six mois progresse davantage qu’un jeune très doué qui vient une fois sur trois. C’est vrai à tous les niveaux, et c’est spectaculairement vrai à celui-ci.'
      ]
    },
    partenaire: {
      titre: 'Pour une entreprise',
      paragraphes: [
        'Discover est la porte la plus large du programme : c’est le niveau où un même engagement touche le plus de jeunes, et celui qui décide combien d’enfants de Douala auront simplement eu l’occasion d’essayer.',
        'C’est aussi le niveau le plus lisible dans un rapport d’impact : le nombre de jeunes accueillis, la proportion qui revient, la proportion qui passe à Develop. Trois indicateurs, mesurables, sans mise en scène.'
      ]
    },
    fentes: ['effectifs'],
    faq: [
      {
        q: 'À partir de quel âge peut-on rejoindre The Upgrade Lab ?',
        a: 'Le programme accueille les jeunes de 10 à 20 ans, filles et garçons, répartis en six catégories : U10, U12, U14, U16, U18 et U20. Discover est ouvert à toutes ces catégories, parce que c’est un niveau de jeu et non une classe d’âge.'
      },
      {
        q: 'Faut-il déjà savoir jouer au basket ?',
        a: 'Non. Discover est conçu pour un premier contact avec le ballon : on y apprend le dribble, les appuis et le tir près du cercle, et personne n’y arrive en retard.'
      },
      {
        q: 'Quel équipement faut-il pour commencer ?',
        a: 'Une tenue de sport, des chaussures qui tiennent la cheville, et de l’eau. Les ballons et le matériel d’entraînement relèvent du programme.'
      },
      {
        q: 'Les filles sont-elles acceptées ?',
        a: 'Oui. Le programme développe des groupes garçons et filles, et prévoit des places financées par des parrains pour que le manque de moyens n’écarte personne.'
      }
    ]
  },

  /* ----------------------------------------------------------------- DEVELOP */
  develop: {
    key: 'develop',
    titre: 'Develop — niveau 2 du parcours',
    description:
      'Develop, deuxième niveau du parcours : la technique individuelle se construit, la main faible devient utilisable, et le geste résiste enfin à la fatigue.',
    intention: 'entrainement basket jeunes Douala',
    accroche: 'Develop est le niveau où un geste cesse d’être un coup de chance.',
    ouverture: [
      'Entre savoir faire quelque chose une fois et pouvoir le refaire, il y a un travail entier : c’est celui-ci. À Develop, on répète — non pas parce que la répétition serait belle, mais parce qu’un geste qui ne résiste ni à la fatigue ni à un défenseur n’existe pas encore vraiment.',
      'C’est aussi le niveau où la main faible devient une main. Où le tir recule de deux mètres parce qu’il l’a mérité, et pas parce qu’un camarade tire de plus loin. Où l’on commence à lire ce que fait l’adversaire avant de décider ce qu’on va faire, au lieu de l’inverse.',
      'Develop dure. C’est, pour la plupart des jeunes, le niveau le plus long du parcours, et c’est normal : tout ce sur quoi les trois niveaux suivants s’appuieront se construit ici.'
    ],
    signal: {
      valeur: '989 enfants',
      libelle:
        'dans 25 études : réduire le matériel et l’aire de jeu améliore l’acquisition des habiletés (Buszard, Reid, Masters et Farrow, Sports Medicine, 2016).'
    },
    seance: {
      titre: 'Le déroulé d’une séance',
      intro:
        'La trame reste celle de Discover — un cadre connu libère la tête — mais chaque bloc devient exigeant, et chaque bloc se mesure.',
      phases: [
        {
          titre: 'L’échauffement',
          texte:
            'Mobilité articulaire, appuis, chevilles et genoux. Un corps d’adolescent qui grandit vite ne se prépare pas comme un corps d’adulte, et l’échauffement est le premier endroit où cela se voit.'
        },
        {
          titre: 'L’atelier technique',
          texte:
            'Un geste, une contrainte, beaucoup de répétitions. Main faible imposée, main libre interdite, regard sur la cible : la contrainte produit le geste juste plus sûrement qu’une consigne répétée.'
        },
        {
          titre: 'L’atelier de tir',
          texte:
            'On compte. Dix tirs depuis cinq positions, le score noté, la même série à la séance suivante. Ce n’est pas une compétition, c’est une mesure — et une mesure se compare.'
        },
        {
          titre: 'La situation',
          texte:
            'Un contre un, deux contre deux, avec une règle qui oriente : deux passes obligatoires, un seul dribble, tir imposé après renversement. Le jeu devient un problème à résoudre.'
        },
        {
          titre: 'Le jeu libre',
          texte:
            'Sans consigne, pour voir ce qui reste quand on ne dit plus rien. C’est le contrôle le plus honnête d’un apprentissage.'
        }
      ]
    },
    apprentissages: {
      titre: 'Ce que tu apprends à Develop',
      intro: 'Six habiletés, et chacune se mesure d’une séance à l’autre.',
      liste: [
        {
          titre: 'Ta main faible',
          texte:
            'Dribble, passe, finition. Tant que ta main faible te trahit, un défenseur sait où t’envoyer — et il t’y enverra.'
        },
        {
          titre: 'Ta distance de travail',
          texte:
            'Celle où tu réussis six tirs sur dix. Tu recules quand ce chiffre tient sur trois séances, pas parce que quelqu’un d’autre tire de loin.'
        },
        {
          titre: 'Lire avant de dribbler',
          texte:
            'Deux options en tête avant de partir. Un joueur qui décide après avoir dribblé a déjà perdu un temps qu’il ne rattrapera pas.'
        },
        {
          titre: 'Le changement de rythme',
          texte:
            'Ce n’est pas courir plus vite : c’est courir moins vite juste avant. Le basket se gagne dans les écarts de vitesse, pas dans la vitesse.'
        },
        {
          titre: 'Jouer sans le ballon',
          texte:
            'Se démarquer, couper, occuper l’espace. Sur une possession, tu passes bien plus de temps sans le ballon qu’avec : c’est là que se joue ton utilité.'
        },
        {
          titre: 'Ton corps',
          texte:
            'Gainage, appuis, réception à deux pieds, chevilles. On ne muscle pas un adolescent comme un adulte : on l’arme contre la blessure.'
        }
      ]
    },
    passage: {
      titre: 'Ce qui te fait passer à Compete',
      intro:
        'Compete se mérite, et pas au talent. Cinq critères, tenus en même temps, observés sur plusieurs séances.',
      criteres: [
        'Ton geste tient sous fatigue : la dixième répétition ressemble à la première.',
        'Tu joues de la main faible sans y penser, et sans l’annoncer.',
        'Tu connais tes chiffres au tir et tu sais si tu progresses.',
        'Tu tiens un un-contre-un des deux côtés du terrain, en attaque comme en défense.',
        'Tu appliques une consigne qui te dessert sur l’instant et sert l’équipe.'
      ],
      note:
        'Un jeune peut être le meilleur marqueur du groupe et rester à Develop parce que sa défense n’existe pas. Ce n’est pas une punition : c’est le sens du mot niveau.'
    },
    terrain:
      'Sur 15 mètres sur 11, on ne se cache pas. Chaque possession met tout le monde en situation de décider, et c’est exactement ce dont un geste a besoin pour cesser d’être un exercice. La revue de Buszard, Reid, Masters et Farrow — 25 études, 989 enfants, Sports Medicine, 2016 — conclut qu’adapter le matériel et l’aire de jeu améliore l’acquisition des habiletés. Ce n’est pas un arrangement avec la réalité : c’est la meilleure configuration disponible pour apprendre.',
    blocs: [
      {
        titre: 'Pourquoi on mesure',
        paragraphes: [
          'À Develop, presque tout est compté : les réussites au tir depuis cinq positions, le nombre de répétitions propres à la main faible, la tenue du geste en fin de séance. Non pas pour classer les jeunes entre eux, mais pour qu’un jeune puisse se comparer à lui-même d’une semaine sur l’autre.',
          'C’est ce qui rend le progrès visible quand il est lent, et c’est ce qui empêche un adolescent de se juger sur une seule mauvaise soirée. Un chiffre qui monte sur six semaines dit la vérité mieux que n’importe quel encouragement.',
          'Ces relevés suivent l’athlète tout au long du parcours. Au niveau Progress, ils deviennent la partie la plus solide de son dossier : une progression datée vaut plus, devant un club, qu’une belle vidéo de trente secondes.'
        ]
      }
    ],
    parents: {
      titre: 'Ce que les familles doivent savoir',
      paragraphes: [
        'Develop est le niveau où la patience se joue. Le progrès y est réel mais peu spectaculaire : il se voit sur un relevé de tirs, rarement sur un match. Un jeune qui semble stagner est très souvent en train de reconstruire un geste, et cette phase-là est la plus utile de toutes.',
        'C’est aussi le niveau où la comparaison entre enfants fait le plus de dégâts. Les corps d’adolescents ne grandissent pas au même rythme, et un écart de taille ou de puissance à quatorze ans ne dit rien du joueur qu’un jeune sera à dix-huit.',
        'Le programme place l’école devant l’entraînement, à ce niveau comme aux autres. Les modalités d’inscription et de détection sont décrites sur la page Rejoindre.'
      ]
    },
    partenaire: {
      titre: 'Pour une entreprise',
      paragraphes: [
        'Develop est le niveau où un soutien se transforme le plus directement en heures d’encadrement et en matériel d’entraînement. C’est prosaïque, et c’est précisément ce qui manque à la plupart des programmes de jeunes en Afrique centrale : pas les intentions, les moyens de répéter.',
        'C’est aussi le niveau qui produit la donnée. Les relevés de progression tenus ici sont ce qui permet, plus tard, d’écrire un rapport d’impact qui ne soit pas une brochure — les contreparties palier par palier sont décrites sur les pages Sponsors.'
      ]
    },
    fentes: ['encadrants', 'effectifs'],
    faq: [
      {
        q: 'Combien de temps reste-t-on au niveau Develop ?',
        a: 'Le temps qu’il faut — c’est le niveau le plus long du parcours pour la plupart des jeunes. On passe à Compete sur des critères observables, jamais sur une durée écoulée.'
      },
      {
        q: 'Peut-on entrer directement à Develop ?',
        a: 'Oui, si les critères de sortie de Discover sont déjà tenus lors de la détection. L’entrée se décide sur ce qu’on voit, pas sur ce qu’on raconte.'
      },
      {
        q: 'Mon enfant est-il trop petit pour progresser au basket ?',
        a: 'La taille décide de la place sur le terrain, pas du niveau. Develop travaille le maniement, le tir et la lecture du jeu, et ce sont ces habiletés-là qui font durer une carrière quel que soit le gabarit.'
      }
    ]
  },

  /* ----------------------------------------------------------------- COMPETE */
  compete: {
    key: 'compete',
    titre: 'Compete — niveau 3 du parcours',
    description:
      'Compete, troisième niveau du parcours : les règles, l’arbitrage et le score, le format 3x3, et ce que l’émotion fait à un geste appris à l’entraînement.',
    intention: 'competition basket jeunes Cameroun',
    accroche:
      'À Compete, le geste rencontre quelqu’un qui ne veut pas qu’il réussisse.',
    ouverture: [
      'C’est le passage du terrain d’entraînement au terrain de vérité. Un tir travaillé pendant six mois se joue soudain avec une main devant les yeux, un score au tableau, une faute sifflée qu’on juge injuste, et des gens qui regardent. Rien de tout cela ne change la technique. Tout cela change le joueur.',
      'Compete apprend d’abord à perdre correctement : sans accuser l’arbitre, sans lâcher la séquence suivante, sans se retourner contre un coéquipier. C’est une compétence, elle s’enseigne, et elle sert très au-delà du basket.',
      'Le format de référence est le 3x3 : dix minutes de jeu ou vingt et un points, douze secondes pour attaquer, deux points derrière l’arc à 6,75 mètres, un ballon qui revient à l’équipe qui vient d’encaisser, et une remise en jeu qui repasse au-dessus de l’arc. Des règles courtes, un jeu dense, et aucun endroit où se cacher.'
    ],
    signal: {
      valeur: 'Tokyo 2020',
      libelle:
        'le 3x3 devient discipline olympique. Le format d’entraînement du programme est un format de Jeux.'
    },
    seance: {
      titre: 'Le déroulé d’une séance',
      intro:
        'La séance ressemble de plus en plus à un match, et de moins en moins à un cours. C’est délibéré.',
      phases: [
        {
          titre: 'L’échauffement de match',
          texte:
            'Plus court, plus intense, terminé par des tirs à la vitesse du jeu. On ne s’échauffe pas pour s’entraîner, on s’échauffe pour jouer.'
        },
        {
          titre: 'Le rappel de règle',
          texte:
            'Une règle par séance, expliquée en une minute, puis appliquée sans discussion pendant tout le jeu. À la fin de la saison, tout le monde connaît le règlement sans l’avoir appris par cœur.'
        },
        {
          titre: 'Les séquences à enjeu',
          texte:
            'Trois possessions, un score de départ, une fin nette. On joue à partir de 18-18, ou avec deux points de retard et vingt secondes. La pression se travaille comme un geste.'
        },
        {
          titre: 'Le match',
          texte:
            'Arbitré, chronométré, marqué. Quelqu’un tient la feuille, et ce quelqu’un est parfois un joueur : on apprend aussi le basket depuis la table de marque.'
        },
        {
          titre: 'La revue',
          texte:
            'Deux minutes, deux questions : qu’est-ce qui a marché, et qu’est-ce qu’on refait autrement. Pas de reproche, pas de discours.'
        }
      ]
    },
    apprentissages: {
      titre: 'Ce que tu apprends à Compete',
      intro:
        'Cinq compétences que l’entraînement seul ne donne jamais, parce qu’il leur manque un adversaire.',
      liste: [
        {
          titre: 'Jouer sous le score',
          texte:
            'Mener change ton jeu autant qu’être mené. Un joueur de Compete se reconnaît à ce qu’il fait la même chose dans les deux cas.'
        },
        {
          titre: 'L’arbitre',
          texte:
            'On ne discute pas, on rejoue. Le temps que tu passes à contester est du temps pendant lequel l’adversaire attaque.'
        },
        {
          titre: 'Ton rôle',
          texte:
            'Toutes les tâches ne se voient pas sur la feuille de marque. L’écran posé, le rebond pris, le repli fait : une équipe se gagne surtout là.'
        },
        {
          titre: 'L’émotion',
          texte:
            'Reconnaître ce que la peur fait à ton tir et ce que la colère fait à ta passe. Le nommer suffit déjà à en reprendre le contrôle.'
        },
        {
          titre: 'L’adversaire',
          texte:
            'On serre la main avant, on la serre après, et on joue à fond entre les deux. Ces trois choses vont ensemble ou ne valent rien.'
        }
      ]
    },
    passage: {
      titre: 'Ce qui te fait passer à Perform',
      intro:
        'Compete n’est pas le niveau des meilleurs : c’est le niveau de ceux qui savent jouer contre quelqu’un.',
      criteres: [
        'Tu joues de la même façon à 20-10 et à 10-20.',
        'Une faute sifflée contre toi ne coûte pas la possession suivante.',
        'Tu tiens ton rôle sans le ballon jusqu’à la dernière seconde.',
        'Tu sais dire, pendant le match, ce que l’équipe doit changer.',
        'Tu finis tes matchs — physiquement, et dans la tête.'
      ],
      note:
        'Un joueur très adroit qui s’effondre au premier contact reste à Develop, et il a raison d’y rester. Monter trop tôt à Compete n’endurcit personne : cela apprend surtout à un adolescent qu’il n’est pas à sa place.'
    },
    terrain:
      'Le 3x3 n’est pas un basket au rabais : c’est un sport olympique, avec son règlement international, son chronomètre de douze secondes et son arc à 6,75 mètres. Compete se joue donc sur un terrain de compétition, aux règles de la compétition — pas sur un terrain d’entraînement qu’on ferait passer pour autre chose.',
    blocs: [
      {
        titre: 'La compétition au Cameroun, telle qu’elle est',
        paragraphes: [
          'Le basket camerounais est organisé par la Fédération camerounaise de basketball, la FECABASKET, qui délivre les licences et encadre les championnats, avec des ligues régionales — dont celle du Littoral, pour Douala. Un jeune qui veut disputer un championnat officiel passe par un club affilié et par une licence.',
          'The Upgrade Lab n’est affilié à aucune fédération à ce jour et ne se présente pas comme un club de championnat. C’est un programme de développement : il prépare des joueuses et des joueurs à entrer dans ces structures, et il le formule dans ces termes-là parce que c’est la vérité d’aujourd’hui.',
          'Ce que Compete offre en attendant n’est pas un lot de consolation. Le 3x3 est une compétition à part entière, dotée d’un règlement international, et il se dispute exactement sur la surface dont le programme dispose.'
        ]
      }
    ],
    parents: {
      titre: 'Ce que les familles doivent savoir',
      paragraphes: [
        'Un enfant qui perd devant vous n’a pas besoin d’une analyse technique dans la voiture. Il a besoin qu’on lui demande s’il s’est amusé, et qu’on parle d’autre chose. Les corrections appartiennent aux séances suivantes, et elles appartiennent aux entraîneurs.',
        'Le bord de terrain se tient dans le calme : le programme n’accepte ni les consignes criées depuis la touche, ni les commentaires sur l’arbitrage. Ce cadre protège les enfants — les vôtres comme ceux d’en face — et il fait partie des conditions d’accueil.',
        'Aucune image d’un mineur n’est publiée sans le consentement écrit de sa famille, et le retrait d’une image se demande sans justification, avec effet sous 48 heures. Les engagements complets sont sur la page Protection des mineurs.'
      ]
    },
    partenaire: {
      titre: 'Pour une entreprise',
      paragraphes: [
        'Compete est le niveau qui produit des moments : des matchs, des rassemblements, des images. C’est celui où un partenariat devient visible autrement que par un logo au bas d’une page — à condition que cette visibilité respecte les règles d’image applicables aux mineurs, et elles s’appliquent ici sans exception.',
        'C’est aussi le niveau où un partenaire finance de l’organisation : arbitrage, matériel de marque, dotations, logistique d’un rassemblement. Les contreparties palier par palier sont décrites sur les pages Sponsors.'
      ]
    },
    fentes: ['affiliations'],
    faq: [
      {
        q: 'Le programme engage-t-il des équipes en championnat ?',
        a: 'Le programme n’est affilié à aucune fédération à ce jour et ne se présente pas comme un club de championnat. Compete organise la confrontation à l’intérieur du programme, au format 3x3, et prépare les jeunes à intégrer un club affilié.'
      },
      {
        q: 'Le 3x3 est-il du vrai basket ?',
        a: 'C’est une discipline olympique depuis les Jeux de Tokyo 2020, avec son règlement international, son arc à 6,75 mètres et ses douze secondes d’attaque. Le terrain de 15 mètres sur 11 est un terrain réglementaire, pas un demi-terrain.'
      },
      {
        q: 'Et si mon enfant supporte mal la défaite ?',
        a: 'C’est précisément l’objet de ce niveau. Perdre correctement s’apprend et se travaille, et c’est l’une des compétences que Compete transmet le plus durablement.'
      }
    ]
  },

  /* ----------------------------------------------------------------- PERFORM */
  perform: {
    key: 'perform',
    titre: 'Perform — niveau 4 du parcours',
    description:
      'Perform, quatrième niveau du parcours : préparation physique, chaleur de Douala, sommeil et régularité — le passage de « doué » à « fiable » sur une saison.',
    intention: 'preparation physique basket Cameroun',
    accroche: 'Perform ne rend pas plus doué. Il rend disponible.',
    ouverture: [
      'Beaucoup de jeunes très doués disparaissent entre seize et dix-huit ans. Presque jamais par manque de talent : par blessure, par fatigue, par décrochage scolaire, ou simplement parce que personne ne leur a appris que la régularité est une compétence, et qu’une compétence se travaille.',
      'Perform répond à cela. Préparation physique adaptée à un corps qui grandit, chaleur et hydratation prises au sérieux dans une ville comme Douala, sommeil, alimentation, gestion de la charge — et l’école qui reste au premier plan, parce que c’est elle qui ouvre le plus de portes au niveau suivant.',
      'C’est le passage de « doué » à « fiable ». Un entraîneur, un club ou un recruteur ne prennent pas le joueur de son meilleur soir : ils prennent celui dont ils savent d’avance ce qu’il fera un mardi de mars.'
    ],
    signal: {
      valeur: '10 → 20 ans',
      libelle:
        'six catégories, une seule exigence à ce niveau : être là en avril comme on l’était en octobre.'
    },
    seance: {
      titre: 'Le déroulé d’une séance',
      intro:
        'La séance de Perform ajoute au basket tout ce qui permet de le refaire demain.',
      phases: [
        {
          titre: 'La préparation',
          texte:
            'Mobilité, gainage, appuis, sauts et surtout réceptions. Un genou qui rentre à l’atterrissage est la blessure de l’an prochain ; cela se corrige, et cela se corrige tôt.'
        },
        {
          titre: 'L’intensité',
          texte:
            'Des blocs courts, joués à la vitesse du match, avec des temps de récupération tenus à la montre. On travaille la capacité à refaire, pas la capacité à faire une fois.'
        },
        {
          titre: 'La technique sous contrainte',
          texte:
            'Les gestes de Develop, exécutés fatigué. C’est le seul test qui compte vraiment : ce qui reste quand le souffle manque.'
        },
        {
          titre: 'L’hydratation',
          texte:
            'Boire avant d’avoir soif, à intervalles fixes. Sous un climat chaud et humide, la sueur rafraîchit mal : l’hydratation est une question de sécurité avant d’être une question de performance.'
        },
        {
          titre: 'Le retour au calme',
          texte:
            'Étirements, respiration, et une minute où chacun dit comment il se sent. Une douleur signalée un mardi évite un mois d’arrêt en avril.'
        }
      ]
    },
    apprentissages: {
      titre: 'Ce que tu apprends à Perform',
      intro:
        'Six habitudes. Aucune n’est spectaculaire, et ce sont elles qui décident de la suite.',
      liste: [
        {
          titre: 'T’échauffer seul',
          texte:
            'Sans qu’on te le demande, et complètement. C’est le premier signe qu’un athlète prend son affaire au sérieux, et les entraîneurs le repèrent immédiatement.'
        },
        {
          titre: 'Protéger tes chevilles et tes genoux',
          texte:
            'Réception à deux pieds, genoux dans l’axe, atterrissage amorti. Trois choses, répétées mille fois, qui décident du nombre de saisons que tu joueras.'
        },
        {
          titre: 'Manger et boire autour de l’effort',
          texte:
            'Ce que tu avales avant, pendant et après une séance change ce que tu pourras faire à la séance suivante. Ce n’est pas un détail de haut niveau, c’est la base.'
        },
        {
          titre: 'Dormir',
          texte:
            'C’est pendant le sommeil que le corps intègre ce que la séance a demandé. Un adolescent qui dort mal ne progresse pas, quelle que soit sa volonté.'
        },
        {
          titre: 'Dire quand ça fait mal',
          texte:
            'Une douleur n’est pas une faiblesse et la cacher n’est pas du courage. Le programme n’est pas un service médical : ce qui inquiète part chez un professionnel de santé.'
        },
        {
          titre: 'Tenir l’école',
          texte:
            'Toutes les portes du niveau Progress, sans exception, se referment sur un bulletin qui s’effondre. Les bourses d’études en premier.'
        }
      ]
    },
    passage: {
      titre: 'Ce qui te fait passer à Progress',
      intro:
        'Ce sont les critères les plus exigeants du parcours, et aucun ne parle de technique.',
      criteres: [
        'Tu es là toute la saison, pas seulement quand cela t’arrange.',
        'Tu t’échauffes et tu récupères sans qu’on te le rappelle.',
        'Tes résultats scolaires tiennent, et tu peux le montrer.',
        'Tu expliques ton jeu — tes points forts, tes chantiers — en trois phrases.',
        'Tu prends soin d’un plus jeune du groupe, sans qu’on te l’ait demandé.'
      ],
      note:
        'Le dernier critère n’est pas une politesse. À Progress, on présente un athlète à des adultes qui décideront de lui : ce qu’il fait des plus petits quand personne ne le regarde en dit plus long que ses statistiques.'
    },
    terrain:
      'Un terrain de 15 mètres sur 11 avec un seul panier impose un rythme dense : peu d’arrêts, peu de replacements longs, beaucoup de répétitions à haute intensité. C’est une contrainte physique réelle, et Perform la prend au sérieux plutôt que de faire semblant qu’une dalle se joue au ralenti.',
    blocs: [
      {
        titre: 'La chaleur de Douala est un paramètre d’entraînement',
        paragraphes: [
          'Douala est chaude et humide une grande partie de l’année. Quand l’air est saturé d’humidité, la sueur s’évapore mal, et c’est l’évaporation qui refroidit le corps : à effort égal, la température interne monte plus vite et plus haut qu’en climat sec.',
          'Perform en tire des conséquences pratiques plutôt que des slogans : boire à intervalles fixes et non à la demande, ajuster l’intensité des blocs plutôt que la durée de la séance, s’abriter du soleil aux pauses, et considérer un jeune qui a mal à la tête ou qui a cessé de transpirer comme un jeune qu’on arrête, immédiatement.',
          'C’est aussi un savoir que les athlètes emportent avec eux. Un joueur qui sait gérer un effort sous cette chaleur-là possède un avantage réel partout ailleurs.'
        ]
      }
    ],
    parents: {
      titre: 'Ce que les familles doivent savoir',
      paragraphes: [
        'Le programme n’est pas un service médical et ne pose aucun diagnostic. Les douleurs persistantes, les blessures et les questions de croissance relèvent d’un professionnel de santé, et l’encadrement encourage systématiquement les familles à consulter plutôt qu’à attendre.',
        'À l’adolescence, les corps ne grandissent pas au même rythme, et une poussée de croissance rapide s’accompagne fréquemment de douleurs et d’une perte temporaire de coordination. Ce n’est ni un manque de sérieux, ni une régression : c’est une phase, et elle demande qu’on ajuste la charge plutôt qu’on la subisse.',
        'L’école passe devant. Un jeune dont les résultats s’effondrent est un jeune dont le programme réduit l’exposition à la compétition, pas un jeune qu’on pousse davantage.'
      ]
    },
    partenaire: {
      titre: 'Pour une entreprise',
      paragraphes: [
        'Perform est le niveau le moins spectaculaire du parcours et le plus décisif. C’est celui qui empêche un talent de disparaître à seize ans — par une blessure évitable, par une saison mal gérée, par un décrochage scolaire.',
        'Un partenaire qui soutient ce niveau finance des choses peu photogéniques et parfaitement mesurables : de l’encadrement qualifié, du matériel de préparation, de l’eau, du suivi. C’est le meilleur rapport entre ce que coûte un engagement et le nombre de trajectoires qu’il sauve.'
      ]
    },
    fentes: ['encadrants'],
    faq: [
      {
        q: 'La musculation est-elle dangereuse pour un adolescent ?',
        a: 'La préparation à Perform s’appuie d’abord sur le poids de corps, la qualité des appuis et le contrôle des réceptions, et elle s’adapte à un corps en croissance. Toute douleur persistante relève d’un professionnel de santé : le programme n’est pas un service médical.'
      },
      {
        q: 'Comment concilier l’école et l’entraînement ?',
        a: 'L’école passe devant, et ce n’est pas une formule : toutes les portes du niveau Progress, à commencer par les bourses d’études, s’examinent d’abord sur un bulletin scolaire.'
      },
      {
        q: 'Que fait le programme contre la chaleur de Douala ?',
        a: 'L’hydratation est cadencée pendant la séance, l’intensité des blocs est ajustée, et le retour au calme n’est pas facultatif. Dans un climat chaud et humide, la sueur rafraîchit mal : c’est une question de sécurité avant d’être une question de performance.'
      }
    ]
  },

  /* ---------------------------------------------------------------- PROGRESS */
  progress: {
    key: 'progress',
    titre: 'Progress — niveau 5 du parcours',
    description:
      'Progress, le cinquième niveau du parcours : les portes de sortie du programme — club supérieur, académie, bourse d’études, circuit 3x3 et métiers du basket.',
    intention: 'bourse et academie basket Afrique',
    accroche: 'Progress est le niveau où l’on quitte le programme par le haut.',
    ouverture: [
      'Un programme de développement qui garde ses meilleurs éléments a échoué. Progress existe pour l’inverse : préparer une sortie, la préparer sérieusement, et la construire avec le jeune plutôt qu’à sa place.',
      'Il y a plusieurs portes, et une seule d’entre elles s’appelle « devenir professionnel ». Les autres — un club supérieur, une académie, une bourse d’études, le circuit 3x3, les métiers du basket — sont plus nombreuses, plus accessibles, et changent une vie tout autant.',
      'C’est aussi le niveau où le programme rend des comptes. Une sortie réussie est le seul résultat qui prouve qu’un parcours en cinq niveaux servait à quelque chose — et c’est le résultat sur lequel The Upgrade Lab accepte d’être jugé.'
    ],
    signal: {
      valeur: '5 portes',
      libelle:
        'et une seule d’entre elles s’appelle « devenir professionnel ». Les quatre autres sont plus larges.'
    },
    seance: {
      titre: 'Le déroulé d’une séance',
      intro:
        'À Progress, l’entraînement ne change pas de nature : il change de destinataire. Chaque séance produit quelque chose que quelqu’un d’extérieur va lire.',
      phases: [
        {
          titre: 'Le travail individuel',
          texte:
            'Un plan par athlète, écrit, tenu sur plusieurs semaines, construit sur ce qui manque à son profil pour la porte qu’il vise — et pas sur ce qu’il aime déjà faire.'
        },
        {
          titre: 'Le jeu évalué',
          texte:
            'Des séquences filmées ou notées, revues avec l’athlète. On ne commente pas une impression : on regarde une action, on nomme la décision, on propose l’autre.'
        },
        {
          titre: 'Le dossier',
          texte:
            'La fiche de progression se met à jour, le relevé scolaire se joint, la liste des structures visées se précise. Un dossier se construit sur des mois, jamais la veille.'
        },
        {
          titre: 'La transmission',
          texte:
            'Chaque athlète de Progress encadre un moment d’une séance d’un niveau inférieur. C’est la meilleure preuve qu’il a compris ce qu’on lui a appris — et la première marche des métiers du basket.'
        },
        {
          titre: 'L’entretien',
          texte:
            'Régulièrement, un point à trois voix : l’athlète, l’encadrement, la famille. Où on en est, ce qui est réaliste, ce qui ne l’est pas, et ce qu’on décide.'
        }
      ]
    },
    apprentissages: {
      titre: 'Ce que tu apprends à Progress',
      intro:
        'Cinq choses qui n’ont plus grand-chose à voir avec le dribble, et tout à voir avec la suite.',
      liste: [
        {
          titre: 'Te décrire honnêtement',
          texte:
            'Ton poste, tes qualités, tes chantiers, en trois phrases et sans te vendre. Un entraîneur repère un jeune lucide en deux minutes, et cela pèse plus lourd qu’une action spectaculaire.'
        },
        {
          titre: 'Tenir un dossier',
          texte:
            'Documents d’identité, relevés scolaires, certificats, vidéos, dates. Beaucoup de portes se ferment sur un papier manquant plutôt que sur un niveau insuffisant.'
        },
        {
          titre: 'Parler à un adulte que tu ne connais pas',
          texte:
            'Se présenter, écouter une question jusqu’au bout, répondre sans exagérer. Cela s’apprend, cela se répète, et cela sert bien au-delà du basket.'
        },
        {
          titre: 'Choisir',
          texte:
            'Toutes les portes ne mènent pas au même endroit et aucune n’est gratuite en efforts. Savoir ce que tu vises — et ce à quoi tu renonces — fait partie du niveau.'
        },
        {
          titre: 'Rendre',
          texte:
            'Encadrer un plus jeune, tenir une table de marque, arbitrer une séquence. Tu ne restes pas dans ce jeu uniquement en jouant.'
        }
      ]
    },
    passage: {
      titre: 'Ce qui te fait sortir par le haut',
      intro:
        'Progress ne mène pas à un sixième niveau : il mène dehors, et c’est le but. Une sortie est prête quand ces cinq points sont réunis.',
      criteres: [
        'Ton niveau de jeu correspond réellement à la structure visée, et pas à celle dont tu rêves.',
        'Ton dossier est complet, à jour, et vérifiable.',
        'Ta scolarité tient, et elle est documentée.',
        'Ta famille est informée, d’accord, et associée à chaque échange.',
        'Tu sais ce que tu fais si la porte ne s’ouvre pas cette année-là.'
      ],
      note:
        'Le cinquième point est le plus important. Une sortie qui échoue n’est pas un échec de parcours si le jeune a un corps entraîné, une scolarité tenue, une discipline installée et des gens autour de lui. Un programme qui n’aurait préparé qu’une seule issue aurait mal travaillé.'
    },
    terrain:
      'Le format sur lequel ces athlètes s’entraînent depuis Discover est un format olympique, et il ouvre son propre circuit international. Un jeune formé au 3x3 à Douala n’arrive pas devant une structure continentale avec un basket approximatif : il arrive avec la pratique d’une discipline que la FIBA suit et classe joueur par joueur.',
    blocs: [
      {
        titre: 'Les cinq portes',
        paragraphes: [
          'Elles ne se valent pas en difficulté, et elles ne s’excluent pas. Un même athlète peut préparer un club supérieur tout en constituant un dossier de bourse, et beaucoup de trajectoires passent par deux d’entre elles.'
        ],
        portes: [
          {
            titre: 'Le club supérieur, au Cameroun',
            texte:
              'La porte la plus fréquente et la plus concrète : rejoindre un club affilié, prendre une licence, disputer un championnat régional ou national sous l’égide de la FECABASKET. Progress y prépare le niveau de jeu, la condition physique et le dossier qu’un club attend d’un jeune qui arrive.'
          },
          {
            titre: 'L’académie continentale',
            texte:
              'L’Afrique dispose désormais de structures d’élite — la NBA Academy Africa, au Sénégal, est la plus connue — qui recrutent chaque année un très petit nombre de jeunes sur tout le continent. Elles sont citées ici comme contexte du paysage africain, et rien d’autre : The Upgrade Lab n’a aucun lien avec elles et ne vend aucune sélection.'
          },
          {
            titre: 'La bourse d’études',
            texte:
              'Aux États-Unis, en Europe ou au Maghreb, une partie du basket se joue à l’université ou en section sportive scolaire, et se paie en études. Cette porte est étroite et administrative : elle demande des résultats scolaires, une langue, des documents et beaucoup d’anticipation. Elle se prépare deux ou trois ans à l’avance, ou pas du tout.'
          },
          {
            titre: 'Le circuit 3x3',
            texte:
              'Le 3x3 est olympique depuis les Jeux de Tokyo 2020, la FIBA y suit les joueuses et les joueurs individuellement, et c’est le format sur lequel ces athlètes s’entraînent depuis leur première séance. Pour un pays qui compte peu de salles couvertes, c’est la voie internationale la plus directe — et la moins encombrée.'
          },
          {
            titre: 'Les métiers du basket',
            texte:
              'Entraîneur, arbitre, marqueur, statisticien, préparateur physique, dirigeant de club, journaliste sportif. Ce sont des métiers, ils se forment, et ils gardent dans le jeu des jeunes qui n’en vivront pas comme joueurs. Progress traite cette porte exactement comme les quatre autres : sérieusement.'
          }
        ]
      },
      {
        titre: 'Le dossier d’un athlète qui sort',
        paragraphes: [
          'Une fiche de progression datée, tenue depuis l’entrée dans le programme : ce qui a été travaillé, ce qui a été mesuré, ce qui reste à construire. C’est la pièce la plus solide du dossier, parce qu’une progression sur trois ans ne s’improvise pas.',
          'Un montage vidéo de jeu, transmis nommément à une structure identifiée, avec le consentement écrit des parents — et jamais publié sur ce site ni sur un réseau social. La visibilité d’un mineur se donne à une personne précise, pour une raison précise, et se retire sur simple demande.',
          'Le point scolaire, parce qu’aucune bourse ne s’examine sans lui, et une lettre du programme qui dit ce que l’athlète vaut et ce qu’il ne vaut pas encore. Une recommandation qui ne dit que du bien ne vaut rien, et les recruteurs le savent avant nous.'
        ]
      },
      {
        titre: 'Ce que le programme ne promet pas',
        paragraphes: [
          'Aucune affiliation. The Upgrade Lab n’est lié ni à la NBA, ni à la NBA Academy Africa, ni à la Basketball Africa League, ni à aucune fédération à ce jour. Ces structures sont nommées sur cette page parce qu’un jeune et sa famille ont le droit de savoir comment le paysage est fait — jamais pour laisser croire à un raccourci.',
          'Aucune sélection ne s’achète et aucune ne se promet. Un programme qui garantit une carrière professionnelle à un adolescent ment, et c’est l’adolescent qui paie le prix de ce mensonge.',
          'Une sortie n’est pas due. Elle se construit sur des années, elle dépend d’un dossier, d’un calendrier et d’une opportunité, et il arrive qu’elle n’aboutisse pas. Ce qui reste alors — un corps entraîné, une discipline, une scolarité tenue, un réseau d’adultes fiables — n’est pas un lot de consolation.'
        ]
      }
    ],
    parents: {
      titre: 'Ce que les familles doivent savoir',
      paragraphes: [
        'Rien ne part sans vous. Aucune vidéo, aucun dossier, aucun contact avec une structure extérieure n’est transmis concernant un mineur sans le consentement écrit de sa famille, et ce consentement se retire sans avoir à se justifier.',
        'Le programme vous dira la vérité sur les chances de votre enfant, y compris quand elle est décevante. C’est inconfortable, et c’est la seule façon honnête de préparer une décision qui engage plusieurs années de sa vie.',
        'La sortie la plus fréquente n’est pas la plus spectaculaire : c’est un club supérieur à Douala ou au Cameroun, avec une licence et un championnat. Elle mérite exactement la même préparation qu’une académie, et elle la reçoit.'
      ]
    },
    partenaire: {
      titre: 'Pour une entreprise de Douala',
      paragraphes: [
        'Progress produit la seule preuve qui compte vraiment pour un partenaire : une trajectoire individuelle qu’on peut raconter, avec un nom, une date et une destination — et, lorsqu’il s’agit d’un mineur, uniquement avec le consentement écrit de sa famille.',
        'Soutenir ce niveau, ce n’est pas financer un maillot : c’est financer le passage d’un jeune de Douala vers un club supérieur, une académie ou une bourse d’études. Pour une direction de la communication ou de la responsabilité sociétale, c’est la contrepartie la plus lisible d’un rapport annuel, et la plus difficile à obtenir autrement.',
        'Le parrainage d’un athlète — une saison complète pour un jeune nommé, avec deux rapports écrits par an sur cette personne — est la forme la plus directe de ce soutien. Les paliers de partenariat et leurs contreparties sont décrits sur les pages Sponsors.'
      ]
    },
    fentes: ['affiliations', 'effectifs'],
    faq: [
      {
        q: 'Que devient un athlète à la fin du parcours ?',
        a: 'Il quitte le programme par l’une des cinq portes de Progress : un club supérieur au Cameroun, une académie continentale, une bourse d’études, le circuit international 3x3, ou un métier du basket.'
      },
      {
        q: 'Le programme garantit-il une carrière professionnelle ?',
        a: 'Non, et aucun programme sérieux ne le fait. Progress prépare une sortie et construit le dossier qui la rend possible : le niveau de jeu, la progression documentée, la scolarité et les contacts.'
      },
      {
        q: 'The Upgrade Lab est-il affilié à la NBA Academy Africa ou à la Basketball Africa League ?',
        a: 'Non. Aucune affiliation, aucun partenariat, aucun canal de sélection. Ces structures sont citées comme contexte du basket africain, jamais comme une filière que le programme ouvrirait.'
      },
      {
        q: 'Faut-il de bons résultats scolaires pour viser une bourse ?',
        a: 'Oui, et pas seulement pour la forme : toutes les bourses d’études s’examinent sur un bulletin. C’est la raison pour laquelle le programme place l’école avant l’entraînement dès le niveau Perform.'
      }
    ]
  }
};

/* -------------------------------------------------------------------------
   3. LA JONCTION
   ---------------------------------------------------------------------- */

/** Structure (site.ts) + texte (ce fichier). Une page n'importe que ceci. */
export type NiveauComplet = Niveau & DetailNiveau;

export const NIVEAUX: NiveauComplet[] = PARCOURS.map((n) => {
  const d = DETAILS[n.key];
  if (!d) throw new Error(`parcours.ts : aucun contenu pour le niveau « ${n.key} ».`);
  return { ...n, ...d };
});

export function niveauPar(key: string): NiveauComplet | undefined {
  return NIVEAUX.find((n) => n.key === key);
}

/** Le niveau d'avant et celui d'après, pour la navigation de bas de page. */
export function voisins(key: string): {
  precedent?: NiveauComplet;
  suivant?: NiveauComplet;
} {
  const i = NIVEAUX.findIndex((n) => n.key === key);
  return {
    precedent: i > 0 ? NIVEAUX[i - 1] : undefined,
    suivant: i >= 0 && i < NIVEAUX.length - 1 ? NIVEAUX[i + 1] : undefined
  };
}

/* -------------------------------------------------------------------------
   4. LE SOMMAIRE — contenu propre à /le-parcours/
   ---------------------------------------------------------------------- */

/**
 * Les quatre règles de passage. Elles sont communes aux cinq niveaux et
 * n'appartiennent donc à aucun : elles vivent sur la page de sommaire.
 */
export const REGLES_DE_PASSAGE: { titre: string; texte: string }[] = [
  {
    titre: 'On ne monte pas avec l’âge',
    texte:
      'Les six catégories, de U10 à U20, disent l’âge. Les cinq niveaux disent l’état du jeu. Un jeune de dix-sept ans qui découvre le ballon entre à Discover ; un jeune de treize ans qui a trois saisons derrière lui peut être à Compete.'
  },
  {
    titre: 'On monte sur des critères observables',
    texte:
      'Chaque niveau publie les cinq critères qui font passer au suivant, et ils se vérifient à l’œil nu, sur plusieurs séances. Aucun passage ne se décide sur une seule bonne performance, et aucun ne se refuse sans qu’on puisse dire pourquoi.'
  },
  {
    titre: 'On peut travailler un atelier d’en dessous sans redescendre',
    texte:
      'Un joueur de Compete dont le tir s’est dégradé refait les séries de Develop, et reste à Compete. Le niveau décrit l’ensemble du jeu, pas chaque geste isolément — sinon plus personne ne progresserait sans se sentir puni.'
  },
  {
    titre: 'Le manque de moyens n’écarte personne',
    texte:
      'Le programme prévoit des places financées par des parrains, précisément pour que la progression dépende de ce qu’un jeune fait sur le terrain et de rien d’autre. Le parrainage d’un athlète est décrit sur la page qui lui est consacrée.'
  }
];

/** Les questions du sommaire. Rendues visibles ET passées en FAQPage. */
export const FAQ_PARCOURS: QR[] = [
  {
    q: 'Comment fonctionne le parcours de développement ?',
    a: 'En cinq niveaux successifs — Discover, Develop, Compete, Perform, Progress — qui mènent de la découverte du ballon jusqu’aux clubs supérieurs, aux académies et aux bourses.'
  },
  {
    q: 'Un niveau correspond-il à une classe d’âge ?',
    a: 'Non. Les six catégories, de U10 à U20, décrivent l’âge ; les cinq niveaux décrivent l’état du jeu. Un jeune de dix-sept ans qui débute entre à Discover, un jeune de treize ans peut être à Compete.'
  },
  {
    q: 'Comment passe-t-on d’un niveau au suivant ?',
    a: 'Sur des critères observables, publiés sur la page de chaque niveau et vérifiés sur plusieurs séances — jamais sur une durée écoulée ni sur une seule bonne performance.'
  },
  {
    q: 'Que devient un athlète à la fin du parcours ?',
    a: 'Il quitte le programme par l’une des cinq portes du niveau Progress : un club supérieur au Cameroun, une académie continentale, une bourse d’études, le circuit international 3x3, ou un métier du basket.'
  },
  {
    q: 'Un jeune sans moyens peut-il suivre le parcours ?',
    a: 'Le programme prévoit des places financées par des parrains pour que le manque de moyens n’écarte personne. Le parrainage couvre une saison complète pour un jeune nommé.'
  }
];
