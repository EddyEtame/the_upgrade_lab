/**
 * en.ts — the English mirror's content.
 *
 * One set of facts, two languages. Nothing here states a number, a place, an
 * affiliation or a price that the French site does not state; where French
 * marks a slot as pending, English does too. The structure of each level is
 * the same DetailNiveau shape as parcours.ts so the /en/ pages render the
 * same way. Written for three readers at once: the founder (who works in
 * English), the anglophone regions and the diaspora, and a scout abroad.
 */

import { PARCOURS, FAITS, TERRAIN_3X3, type Niveau } from './site';
import type { DetailNiveau, QR } from './parcours';
import { OFFRE, type PalierOffre } from './offre';

/* -------------------------------------------------------------------------
   1. SITE STRINGS
   ---------------------------------------------------------------------- */

export const EN = {
  tagline: 'Youth basketball in Douala, Cameroon',
  statut: 'programme launching',
  lieu: `${FAITS.ville}, Littoral Region, Cameroon`,
  terrain: 'A 15 by 11 metre slab with a single basket is not half a court: it is a regulation FIBA 3x3 court, and 3x3 has been an Olympic discipline since Tokyo 2020.',
  etude: `${TERRAIN_3X3.etude.auteurs.replace(' et ', ' and ')}, in Sports Medicine (${TERRAIN_3X3.etude.annee}), reviewed ${TERRAIN_3X3.etude.etudesRevues} studies and ${TERRAIN_3X3.etude.enfants} children: scaling the equipment and the playing area improves skill acquisition.`
} as const;

export const PENDING_EN: Record<string, { label: string; source: string }> = {
  terrain: { label: 'Training venue', source: 'depends on the ground agreement — and Annex A: never published beside images of minors' },
  horaires: { label: 'Session days and times', source: 'Annex A — sent in writing to registered families, never published' },
  cotisation: { label: 'Cost of a season for one athlete', source: 'intake questionnaire, computed from the budget' },
  effectifs: { label: 'Number of young people per category', source: 'intake questionnaire' },
  encadrants: { label: 'Coaches, diplomas and certifications', source: 'intake questionnaire' },
  email: { label: 'Contact email address', source: 'intake questionnaire — to be opened on the programme domain' },
  telephone: { label: 'Public programme telephone line', source: 'intake questionnaire — the founder’s personal line is not published' },
  reseaux: { label: 'Official programme accounts', source: 'intake questionnaire' },
  affiliations: { label: 'Federal affiliation', source: 'none to date — claiming one would be a false fact' }
};

/* -------------------------------------------------------------------------
   2. THE FIVE LEVELS
   ---------------------------------------------------------------------- */

const D: Record<string, DetailNiveau> = {
  discover: {
    key: 'discover',
    titre: 'Discover — level 1 of the pathway',
    description: 'Discover, the first level of the pathway in Douala: dribbling, footwork, shooting close to the rim, and everything it takes to come back the following week.',
    intention: 'basketball for kids Douala',
    accroche: 'Discover is basketball for kids in Douala who have never held a ball: it asks for no licence, no sporting past and no new shoes. It asks you to pick up a ball, and to come back.',
    ouverture: [
      'It is the first level and the widest: the door everyone comes through, whatever their age and whatever their starting point. A ten-year-old who has never dribbled and a sixteen-year-old who has played on the neighbourhood court for three years start in the same place — they simply do not stay there for the same length of time.',
      'What is built here is not yet basketball: it is the ability to make a correct movement without thinking about it. Holding the ball without looking at it. Landing on two feet. Throwing at a precise point. These are motor skills, and they settle in best when repeated early, often, and on a playing area of the right size.',
      'Discover is also where you learn to be part of a group: waiting your turn, lending a ball, listening to an instruction to the end, putting the equipment away. Nothing spectacular — and yet it is what decides who lasts the season.'
    ],
    signal: { valeur: '15 × 11 m', libelle: 'the surface you learn on here is a regulation FIBA 3x3 court, not half a court.' },
    seance: {
      titre: 'How a session runs',
      intro: 'A Discover session always follows the same pattern, and that is deliberate: a familiar frame frees the head for the movement.',
      phases: [
        { titre: 'Arrival', texte: 'We count the group, say what we are going to do, and say why. Three sentences, no more, and everyone knows where they are going.' },
        { titre: 'Warm-up', texte: 'Running, changes of footing, coordination, ball in hand as early as possible. The body warms up before anything precise is asked of it.' },
        { titre: 'Ball handling', texte: 'Right-hand dribble, left-hand dribble, hip height, head up. We do not go fast: we go clean, and speed comes afterwards.' },
        { titre: 'Shooting close to the rim', texte: 'Two-step stop, the backboard, the guiding hand and the supporting hand. We shoot from close enough to succeed, because a movement you never succeed at cannot be learned.' },
        { titre: 'Play', texte: 'Two on two, three on three, on one basket. It is the part everyone waits for, and also the part where we see what has been understood.' },
        { titre: 'Closing', texte: 'We tidy up, and each person says one thing they will remember. Out loud, in one sentence. It is short, and it fixes the session better than a speech.' }
      ]
    },
    apprentissages: {
      titre: 'What you learn at Discover',
      intro: 'Five things, and every one of them can be checked with the naked eye.',
      liste: [
        { titre: 'Dribbling without looking at the ball', texte: 'Both hands, walking then running. As long as your eyes are on the ball you are not playing: you are driving.' },
        { titre: 'The two-step stop', texte: 'Two steps after the dribble, then the shot. It is the first rule of basketball your body has to know before your head does.' },
        { titre: 'Shooting close to the rim', texte: 'Square on, then from the angle, using the board. You move back when the movement holds — never before.' },
        { titre: 'Passing and receiving', texte: 'Hands ready, fingers spread, eyes on the passer. Receiving is a movement, not a wait.' },
        { titre: 'The vocabulary', texte: 'Travelling, double dribble, inbound, foul. Knowing the words is already half of understanding what you are asked.' }
      ]
    },
    passage: {
      titre: 'What moves you up to Develop',
      intro: 'You do not move up because you grew, or because you pulled off a nice move one Tuesday. You move up when these five things are true at the same time, several sessions in a row.',
      criteres: [
        'You dribble with both hands, on the move, without dropping your eyes.',
        'You shoot off a two-step stop from both sides of the basket.',
        'You pass and receive without stepping back.',
        'You know the basic rules and apply them without being reminded.',
        'You come back. It is the most important criterion on the list, by a distance.'
      ],
      note: 'Nobody is held at Discover for a question of age, and nobody is pushed out of it for a question of talent. A young player can spend a whole season here and become excellent afterwards: it is even the most common case.'
    },
    terrain: 'At Discover the single basket is not a limit, it is a multiplier: on a 15 by 11 metre area every player touches the ball far more often than on a full court, where the action sometimes unfolds twenty metres away. And that area is not a fallback — it is the regulation court of 3x3, an Olympic discipline since Tokyo 2020.',
    blocs: [
      { titre: 'A level, not an age group', paragraphes: [
        `The programme takes young people from ${FAITS.ageMin} to ${FAITS.ageMax}, girls and boys, in six categories: ${FAITS.categories.join(', ')}. The categories describe age. The five levels of the pathway describe the state of the game — and the two do not overlap.`,
        'In practice: a seventeen-year-old discovering the ball enters at Discover, and a thirteen-year-old with three seasons behind them can be at Compete. Confusing the two scales produces groups where nobody learns — beginners are drowned, advanced players are bored.'
      ] }
    ],
    parents: { titre: 'What Discover asks of a family', paragraphes: [
      'Two things: water, and regularity. No expensive equipment, no prior level, no entry test to pass. Sports clothing and shoes that hold the ankle are enough — balls and drill equipment are the programme’s responsibility.',
      'The venue and the days of sessions are communicated in writing to registered families. They are not on this site, and that is a choice: no address and no training schedule for minors is published here.',
      'Regularity matters more than anything else. A young player who comes every week for six months progresses more than a very gifted one who comes one time in three. It is true at every level, and spectacularly true at this one.'
    ] },
    partenaire: { titre: 'For a company', paragraphes: [
      'Discover is the programme’s widest door: the level where a single commitment reaches the most young people, and the one that decides how many children in Douala simply get the chance to try.',
      'It is also the most legible level in an impact report: the number of young people welcomed, the proportion who come back, the proportion who move up to Develop. Three indicators, measurable, with no staging.'
    ] },
    fentes: ['effectifs'],
    faq: [
      { q: 'From what age can a child join The Upgrade Lab?', a: `The programme takes young people from ${FAITS.ageMin} to ${FAITS.ageMax}, girls and boys, in six categories: ${FAITS.categories.join(', ')}. Discover is open to all of them, because it is a level of play and not an age group.` },
      { q: 'Do you need to know how to play already?', a: 'No. Discover is designed for a first contact with the ball: dribbling, footwork and shooting close to the rim, and nobody arrives late.' },
      { q: 'What equipment is needed to start?', a: 'Sports clothing, shoes that hold the ankle, and water. Balls and training equipment are the programme’s responsibility.' },
      { q: 'Are girls accepted?', a: 'Yes. The programme develops girls’ and boys’ groups, and provides sponsor-funded places so that a lack of money keeps nobody out.' }
    ]
  },

  develop: {
    key: 'develop',
    titre: 'Develop — level 2 of the pathway',
    description: 'Develop, the second level: individual technique is built, the weak hand becomes usable, and the movement finally survives fatigue.',
    intention: 'basketball training Douala',
    accroche: 'Develop is the level where a movement stops being a stroke of luck.',
    ouverture: [
      'Between being able to do something once and being able to do it again there is a whole body of work: this one. At Develop we repeat — not because repetition is pretty, but because a movement that survives neither fatigue nor a defender does not really exist yet.',
      'It is also the level where the weak hand becomes a hand. Where the shot moves back two metres because it has earned it, and not because a teammate shoots from further out. Where you start reading what the opponent does before deciding what you will do, instead of the reverse.',
      'And it is where the basketball training in Douala that a parent searches for actually takes shape: sessions with a written content, a coach who corrects an action rather than a person, and criteria you can see.'
    ],
    signal: { valeur: '2 hands', libelle: 'the weak hand is the whole point of this level: a player with one hand is a player a defender can read.' },
    seance: {
      titre: 'How a session runs',
      intro: 'The frame is the same as Discover; the content is not. Every drill has a defender in it sooner or later, because that is what a movement has to survive.',
      phases: [
        { titre: 'Arrival and intention', texte: 'One theme per session — the weak hand, the pull-up, the pass under pressure — announced at the start so that every drill points the same way.' },
        { titre: 'Warm-up with the ball', texte: 'Dribbling series, both hands, at speed, eyes up. The warm-up is already technique.' },
        { titre: 'The theme, alone', texte: 'Repetitions without opposition until the movement is clean. Volume here, not variety.' },
        { titre: 'The theme, against someone', texte: 'The same movement with a defender who is allowed to interfere. This is where a move becomes real or does not.' },
        { titre: 'Small-sided play', texte: 'Three on three on the 3x3 court, with one constraint drawn from the theme: weak hand only, or two passes before a shot.' },
        { titre: 'Closing', texte: 'One sentence each on what held and what did not. The coach writes down what he saw; it feeds the next session.' }
      ]
    },
    apprentissages: {
      titre: 'What you learn at Develop',
      intro: 'Five things, and all five are visible from the sideline.',
      liste: [
        { titre: 'A weak hand that works', texte: 'Dribble, finish and pass with your other hand well enough that a defender cannot force you onto your strong side.' },
        { titre: 'The shot, one step back', texte: 'From close to mid-range, with the same movement. The distance grows only when the arc holds.' },
        { titre: 'Reading before deciding', texte: 'Where is the defender’s weight? Where is the help? You look first, then you choose.' },
        { titre: 'Passing under pressure', texte: 'A pass that arrives when someone is in your face, not only when you have time.' },
        { titre: 'Defending with the feet', texte: 'Staying in front without reaching. The hands come last.' }
      ]
    },
    passage: {
      titre: 'What moves you up to Compete',
      intro: 'Five observable things, held over several sessions, against opposition.',
      criteres: [
        'You finish with either hand under a defender.',
        'Your shot from mid-range keeps its form when you are tired.',
        'You make the right pass more often than the spectacular one.',
        'You stay in front of your player without fouling.',
        'You can explain a drill to a Discover player — because you understood it.'
      ],
      note: 'Develop is where most players spend the most time, and that is not a problem. A season here is a season of the game becoming yours.'
    },
    terrain: 'Develop is where the 3x3 court earns its keep: one basket, three against three, and the ball in your hands every few seconds. Repetitions per session are what build a movement, and this format gives more of them than any full court can.',
    blocs: [
      { titre: 'Why the weak hand first', paragraphes: [
        'A player who can only go one way is a player a defender has already solved. The weak hand is not a refinement to add at the end; it is the difference between a move and a habit, and the earlier it is built the less it has to be unlearned.',
        'It is also the most honest indicator of work done between sessions. Nobody develops a weak hand by talent.'
      ] }
    ],
    parents: { titre: 'What Develop asks of a family', paragraphes: [
      'Regularity, again, and patience with a plateau. A player at Develop will look worse before looking better — the weak hand is slow, the new shot misses. That is what learning looks like from the outside.',
      'The venue and schedule are sent in writing to registered families and never published here.'
    ] },
    partenaire: { titre: 'For a company', paragraphes: [
      'Develop is where a sponsor’s money turns into measurable technique: a coach, balls, cones, a court in the right condition. It is the level where the cost per athlete is easiest to explain, because every line buys repetitions.',
      'It is also where the second progress report of the season carries real content: what each group could do in September, and what it can do now.'
    ] },
    fentes: ['effectifs'],
    faq: [
      { q: 'How long does a player stay at Develop?', a: 'As long as it takes for five observable criteria to hold over several sessions against opposition. Most players spend more time here than at any other level, and a full season is normal.' },
      { q: 'Is Develop only about shooting?', a: 'No. Ball handling with both hands, reading the game, passing under pressure and defending with the feet carry as much weight as the shot.' },
      { q: 'Can a player work on a Discover drill without going back down?', a: 'Yes. A level describes the whole game, not each movement in isolation. A Develop player whose shot has slipped redoes the Discover series and stays at Develop.' }
    ]
  },

  compete: {
    key: 'compete',
    titre: 'Compete — level 3 of the pathway',
    description: 'Compete, the third level: friendly games and local tournaments, the rules, the referee, the score, and what emotion does to a learned movement.',
    intention: 'youth basketball competition Cameroon',
    accroche: 'Compete is where you find out what a movement is worth when it counts.',
    ouverture: [
      'Everything learned at Develop was learned against a defender who was, in the end, a teammate. Compete changes the opponent, the stakes and the noise. The referee is a stranger. The score is real. Your parents are on the sideline. A movement that survives all of that is yours; one that does not still needs work.',
      'Youth basketball competition in Cameroon is where this level lives: friendly games against other groups, local tournaments, school competitions — the actual, organised confrontation the programme document promised. The programme seeks those opportunities; it does not invent results.',
      'And Compete is where a player learns the thing no drill teaches: how to lose, correct, and come back the following week.'
    ],
    signal: { valeur: '3 × 3', libelle: 'the format the programme competes in: an Olympic discipline with its own rules, its own clock and its own world ranking.' },
    seance: {
      titre: 'How a session runs',
      intro: 'A Compete week has two kinds of session: preparation and the game itself. Both are basketball; only one is played for a score.',
      phases: [
        { titre: 'Scouting', texte: 'What did the last game show? Two things to keep, two to fix. Said out loud, written on the board.' },
        { titre: 'Situations', texte: 'The moments a game is decided in: the last possession, the inbound under pressure, the free throw when you are tired. Rehearsed until they are boring.' },
        { titre: 'Game', texte: 'Refereed, timed, scored. Against another group of the programme, or another club when the calendar allows.' },
        { titre: 'The debrief', texte: 'Ten minutes, the same day. Not who won — what each player did that they could not do a month ago, and what they could not do today.' }
      ]
    },
    apprentissages: {
      titre: 'What you learn at Compete',
      intro: 'Five things, and only a game can teach them.',
      liste: [
        { titre: 'Playing to a score', texte: 'Making the safe choice when you are ahead and the brave one when you are behind. Knowing which is which.' },
        { titre: 'The referee is not the opponent', texte: 'A call goes against you. You play the next possession. Every time.' },
        { titre: 'Losing well', texte: 'Shaking hands, going home, coming back on Tuesday with something to fix. It is a skill, and it is taught.' },
        { titre: 'The clock', texte: 'Twelve seconds in 3x3. You learn to feel it without looking.' },
        { titre: 'Being a teammate', texte: 'The pass you make when you could have shot. The word you say when someone misses.' }
      ]
    },
    passage: {
      titre: 'What moves you up to Perform',
      intro: 'Five observable things, held across a run of games, not one good afternoon.',
      criteres: [
        'Your technique holds under a score and a referee.',
        'You make decisions that a coach can explain afterwards — even the wrong ones.',
        'You lose without disappearing, and win without stopping.',
        'You know the 3x3 rules well enough to play without a coach on the sideline.',
        'Your teammates want you on their team. This one is asked, not measured.'
      ],
      note: 'Moving up from Compete is not about winning tournaments. A player on a losing team can move up; a player who wins and learns nothing does not.'
    },
    terrain: 'At Compete the court stops being a training area and becomes a venue. The lines are the same — the key, the free-throw line, the 6.75 m arc — and that is the point: a regulation 3x3 court in Douala is the same court as the one on television.',
    blocs: [
      { titre: 'Context, not affiliation', paragraphes: [
        'Organised basketball in Cameroon runs through the national federation and its regional leagues; the 3x3 discipline has its own international circuit under FIBA. A parent has the right to know how that landscape is made.',
        'The Upgrade Lab is not affiliated with any of these bodies to date, and says so plainly. Affiliations will be announced on this site the day they exist, not before.'
      ] }
    ],
    parents: { titre: 'What Compete asks of a family', paragraphes: [
      'Presence, when possible, and restraint from the sideline. The coach coaches; the family supports. A player who hears two sets of instructions hears none.',
      'Games and tournaments may involve travel within Douala. Every trip is announced in writing, with an adult responsible, and the return time.'
    ] },
    partenaire: { titre: 'For a company', paragraphes: [
      'Compete is where a partner becomes visible: bibs, a courtside banner, a team that carries a name to another club. It is also where competition entry fees and transport become real budget lines that a sponsor can fund and see.',
      'A sponsor at the Bronze tier or above is named in every event programme. That is a contractual deliverable, not a courtesy.'
    ] },
    fentes: ['effectifs'],
    faq: [
      { q: 'Does the programme play in a league?', a: 'The programme seeks friendly games, local tournaments and school competitions. It is not affiliated with any federation or league to date, and will announce affiliations here the day they exist.' },
      { q: 'What format does the programme compete in?', a: '3x3 — three against three on a half court with one basket, an Olympic discipline since Tokyo 2020, with its own rules and a twelve-second shot clock.' },
      { q: 'Is winning required to move up?', a: 'No. Moving up from Compete is about technique that holds under a score, decisions a coach can explain, and how a player loses and wins — not results.' }
    ]
  },

  perform: {
    key: 'perform',
    titre: 'Perform — level 4 of the pathway',
    description: 'Perform, the fourth level: physical preparation, consistency, sleep and discipline — the passage from “gifted” to “reliable” over a whole season.',
    intention: 'basketball conditioning Africa',
    accroche: 'Perform is the level where talent stops being enough.',
    ouverture: [
      'Up to here a player could get by on ability. Perform is where the body, the calendar and the habits start to count as much as the hands. Strength, mobility, speed, recovery, sleep, food — basketball conditioning as it is done across Africa and everywhere else, adapted to bodies that are still growing.',
      'It is the least visible level from the outside and the one that decides the most. A player who is reliable in the fortieth minute of the fourth game of a weekend is a different athlete from one who is brilliant for ten minutes.',
      'And it is the level that prepares a player for selection: a scout, a trial, an academy camp — the doors of the next level open to athletes who are ready on the day, not on their best day.'
    ],
    signal: { valeur: 'A season', libelle: 'the unit of measurement at Perform. Not a game, not a month: from September to June, every week.' },
    seance: {
      titre: 'How a week runs',
      intro: 'Perform is measured in weeks, not sessions. A week has court time, physical preparation, and recovery — and all three are written down.',
      phases: [
        { titre: 'Physical preparation', texte: 'Strength with body weight and light loads, mobility, speed and change of direction, injury prevention around the knee and ankle. Adapted to age and growth, never copied from an adult programme.' },
        { titre: 'Individual technique', texte: 'The same movements as Develop, at a higher tempo and with more precision. Shooting volume tracked, not guessed.' },
        { titre: 'Team play', texte: 'Structured play with roles. Reading a defence, setting a screen, spacing the floor.' },
        { titre: 'Recovery', texte: 'Sleep, hydration in 30-degree heat, food. Taught as seriously as a jump shot, because they decide whether the jump shot is there on Saturday.' },
        { titre: 'Review', texte: 'Once a week, with the coach: what the numbers say, what the body says, what to change.' }
      ]
    },
    apprentissages: {
      titre: 'What you learn at Perform',
      intro: 'Five things, and they show up over months.',
      liste: [
        { titre: 'Training your body, not just your game', texte: 'Strength and mobility that protect your joints and add to your jump. Prevention before injury, not after.' },
        { titre: 'Consistency', texte: 'The same shot on Monday and Saturday. The same effort in the first minute and the last.' },
        { titre: 'Sleep and food as training', texte: 'What you eat at fifteen decides what you can do at eighteen. It is a real subject here.' },
        { titre: 'Playing a role', texte: 'Not every player is the scorer. Knowing what your team needs from you, and doing it every game.' },
        { titre: 'Being ready on the day', texte: 'A trial, a camp, a scout: the ability to be at your level when it is asked, not when it suits.' }
      ]
    },
    passage: {
      titre: 'What moves you up to Progress',
      intro: 'Five observable things, across a season.',
      criteres: [
        'Your performance in the last game of a weekend matches the first.',
        'You have been available all season: present, fit, on time.',
        'Your physical markers have moved, and you know which ones.',
        'You play a role your coach can name, and your teammates rely on it.',
        'You have been seen — by another club, a coach, a scout — and the feedback was serious.'
      ],
      note: 'Progress is not a promotion; it is an exit. Nobody moves there until a real door is open.'
    },
    terrain: 'At Perform the court is a laboratory: shooting volumes counted, sprint times taken between the baseline and the arc, recovery measured. A 15 by 11 metre space is enough to measure everything that matters, and its lines are the same as anywhere else in the world.',
    blocs: [
      { titre: 'Growing bodies', paragraphes: [
        'Physical preparation for a fourteen-year-old is not a scaled-down adult programme. Growth plates, coordination that lags behind height, and the rapid changes of adolescence all shape what is safe and what is useful.',
        'The programme’s approach is prevention first: mobility, control, body-weight strength, and load that follows the athlete’s development rather than the calendar.'
      ] }
    ],
    parents: { titre: 'What Perform asks of a family', paragraphes: [
      'Sleep, food and a calendar that makes room. This is the level where a family’s support is measured in evenings and meals rather than in presence at games.',
      'School comes first, and the coach will say so before anyone else does. A player who slips in class is a player the programme talks to the family about — before it talks about basketball.'
    ] },
    partenaire: { titre: 'For a company', paragraphes: [
      'Perform is where a sponsor funds the invisible: physical preparation, hydration, health cover, the equipment that prevents an injury nobody will ever see. It is the least glamorous budget line and the most defensible one in a CSR report.',
      'A Silver sponsor of an age category receives a quarterly written report; at Perform that report carries measured progress, not adjectives.'
    ] },
    fentes: ['effectifs', 'encadrants'],
    faq: [
      { q: 'Is physical preparation safe for teenagers?', a: 'Yes, when it is adapted: mobility, control and body-weight strength first, loads that follow the athlete’s growth, and prevention around the knee and ankle. Adult programmes are never copied.' },
      { q: 'What does hydration have to do with performance?', a: 'Training in 30-degree heat, a dehydrated player loses precision and recovery long before feeling thirsty. Hydration is taught and checked like any other part of training.' },
      { q: 'How is progress at Perform measured?', a: 'Over a season: shooting volumes, sprint and jump markers, availability, and the coach’s weekly review. Not a single game.' }
    ]
  },

  progress: {
    key: 'progress',
    titre: 'Progress — level 5 of the pathway',
    description: 'Progress, the fifth level: the exit toward a higher club, an academy, a basketball scholarship in Africa or abroad, or a career in the game.',
    intention: 'basketball scholarship Africa',
    accroche: 'Progress is the level that gives all the others their point.',
    ouverture: [
      'Everything before this was preparation. Progress is the exit: a higher club in Cameroon, a continental academy, a basketball scholarship in Africa or abroad, the international 3x3 circuit, or a profession inside the game — coaching, refereeing, sports performance.',
      'The programme does not promise any of these doors. It promises to prepare a player for them, to know where they are, and to open the ones it can: a file, contacts, a recommendation that means something because the pathway behind it is written down.',
      'And it promises honesty about the landscape. The names below are context a parent has the right to know. None of them is an affiliation.'
    ],
    signal: { valeur: '5 doors', libelle: 'the ways out of the programme: club, academy, scholarship, the 3x3 circuit, a career in basketball.' },
    seance: {
      titre: 'What a Progress season contains',
      intro: 'Progress is less a training programme than an accompaniment. The court time continues; what is added is the work of leaving well.',
      phases: [
        { titre: 'The file', texte: 'A written record of the pathway: levels passed, criteria met, physical markers, games played. Built over years, ready when a door opens.' },
        { titre: 'The video', texte: 'Game footage prepared for a coach or a scout — with parental consent, and only for approved recipients, per Annex A.' },
        { titre: 'Exposure', texte: 'Trials, camps and showcases where they exist and where the player is ready. Sought by the programme; never guaranteed.' },
        { titre: 'The school file', texte: 'For a scholarship, grades count as much as the game. The academic record is prepared alongside the sporting one.' },
        { titre: 'The conversation', texte: 'With the player and the family: what is realistic, what it costs, what it asks. Said plainly, before any decision.' }
      ]
    },
    apprentissages: {
      titre: 'What you learn at Progress',
      intro: 'Five things about leaving.',
      liste: [
        { titre: 'Knowing your level', texte: 'Honestly, against players you have not met. Ambition without illusion.' },
        { titre: 'Presenting yourself', texte: 'To a coach, a scout, an admissions office. In two languages, if you can.' },
        { titre: 'Reading an offer', texte: 'What a scholarship or a club contract actually contains, and what it does not.' },
        { titre: 'Leaving well', texte: 'A player who leaves the programme owes it nothing but a visit. The programme owes the player a file and a phone call.' },
        { titre: 'Coming back', texte: 'As a coach, a mentor, a sponsor. The pathway is a loop, not a line.' }
      ]
    },
    passage: {
      titre: 'What Progress leads to',
      intro: 'There is no level after this one. There are five doors, and they open on real criteria.',
      criteres: [
        'A higher club in Cameroon: a trial arranged and passed.',
        'A continental academy: an application supported by the file, and a selection.',
        'A scholarship: an academic record that holds, and an institution that says yes.',
        'The 3x3 circuit: a team, a ranking, a calendar.',
        'A profession in basketball: a coaching or refereeing course begun.'
      ],
      note: 'A player can reach Progress and stay in the programme as a mentor or an assistant. Leaving is a door, not an obligation.'
    },
    terrain: 'The court a Progress player leaves from is the same size as the one they are going to: 15 by 11 metres, one basket, the arc at 6.75 metres. That is the quiet argument of the whole pathway — nothing about the surface has to change for the level to.',
    blocs: [
      { titre: 'The landscape, as context', paragraphes: [
        'A parent has the right to know how African basketball is organised. NBA Academy Africa selects and trains elite prospects from across the continent. The Basketball Africa League is the professional league backed by FIBA and the NBA. Cameroon’s national federation runs domestic competition. Universities abroad award athletic scholarships that combine study and sport.',
        'The Upgrade Lab is affiliated with none of these. They are named so that a family can locate the programme on the map, not so that the programme can borrow their weight. The text says this every time, and it will keep saying it.'
      ], portes: [
        { titre: 'A higher club', texte: 'In Douala or elsewhere in Cameroon: the most common door, and the one the programme can open most directly.' },
        { titre: 'A continental academy', texte: 'Selective, rare, and real. The file and the video are what get a player looked at.' },
        { titre: 'A scholarship', texte: 'Study and sport together, at home or abroad. The academic record decides as much as the game.' },
        { titre: 'The 3x3 circuit', texte: 'An Olympic discipline with its own professional tour and world ranking — a door that a 3x3 court prepares for directly.' },
        { titre: 'A career in the game', texte: 'Coaching, refereeing, performance. The programme intends to train the adults it will need.' }
      ] }
    ],
    parents: { titre: 'What Progress asks of a family', paragraphes: [
      'Decisions, and the patience to make them well. An offer from far away is exciting and complicated. The programme sits with the family, explains what it can see, and never pushes.',
      'The school file matters here as much as anywhere. A scholarship is won in class as much as on the court.'
    ] },
    partenaire: { titre: 'For a company', paragraphes: [
      'Progress is the level a Gold partner can put their name to: a player who leaves for a club, an academy or a scholarship is the story a CSR report is written for, and it is a true one.',
      'The two scholarship places a Gold partner awards in their name are drawn from this level. They have a first name, an age category and a season — never a full name or a face without consent.'
    ] },
    fentes: ['effectifs', 'affiliations'],
    faq: [
      { q: 'Does The Upgrade Lab send players to the NBA Academy or the BAL?', a: 'No. The programme is not affiliated with NBA Academy Africa, the Basketball Africa League or any federation. They are named as context so that families understand the landscape; the programme prepares players and supports applications where they are realistic.' },
      { q: 'What does a player leave the programme with?', a: 'A written file of their pathway — levels passed, criteria met, physical markers, games played — a school record prepared alongside it, and the programme’s support for the door that is open.' },
      { q: 'Can a scholarship be abroad?', a: 'Yes, where an institution says yes and the academic record holds. The programme supports the application; it does not promise the outcome.' }
    ]
  }
};

export type NiveauEN = Niveau & DetailNiveau;
export const NIVEAUX_EN: NiveauEN[] = PARCOURS.map((n) => {
  const d = D[n.key];
  if (!d) throw new Error(`en.ts: no English content for level “${n.key}”.`);
  return { ...n, ...d, href: `/en${n.href}` };
});
export const niveauEN = (key: string) => NIVEAUX_EN.find((n) => n.key === key);
export function voisinsEN(key: string) {
  const i = NIVEAUX_EN.findIndex((n) => n.key === key);
  return { precedent: i > 0 ? NIVEAUX_EN[i - 1] : undefined, suivant: i >= 0 && i < NIVEAUX_EN.length - 1 ? NIVEAUX_EN[i + 1] : undefined };
}

export const PROMESSES_EN: Record<string, { promesse: string; resume: string }> = {
  discover: { promesse: 'Pick up the ball.', resume: 'First contact: dribbling, footwork, shooting near the rim, and the wish to come back next week.' },
  develop: { promesse: 'Repeat until it holds.', resume: 'Individual technique is built, reading the game begins, the movement finally survives fatigue.' },
  compete: { promesse: 'Play against someone else.', resume: 'Real confrontation: the rules, the referee, the score, and what emotion does to a learned movement.' },
  perform: { promesse: 'Hold up over a whole season.', resume: 'Physical preparation, consistency, sleep and discipline — from “gifted” to “reliable”.' },
  progress: { promesse: 'Walk through the next door.', resume: 'The exit toward a higher club, an academy or a scholarship, with a file and contacts to support it.' }
};

export const REGLES_EN = [
  { titre: 'You do not move up with age', texte: 'The six categories, U10 to U20, say how old you are. The five levels say the state of your game. A seventeen-year-old discovering the ball enters at Discover; a thirteen-year-old with three seasons behind them can be at Compete.' },
  { titre: 'You move up on observable criteria', texte: 'Each level publishes the five criteria that move a player to the next, and they can be checked with the naked eye over several sessions. No move up is decided on one good performance, and none is refused without a reason.' },
  { titre: 'You can work a lower drill without going back down', texte: 'A Compete player whose shot has slipped redoes the Develop series and stays at Compete. A level describes the whole game, not each movement in isolation.' },
  { titre: 'A lack of money keeps nobody out', texte: 'The programme provides sponsor-funded places so that progress depends on what a player does on the court and nothing else. Sponsoring one athlete is described on its own page.' }
];

export const FAQ_PARCOURS_EN: QR[] = [
  { q: 'How does the development pathway work?', a: 'In five successive levels — Discover, Develop, Compete, Perform, Progress — leading from first contact with the ball to higher clubs, academies and scholarships.' },
  { q: 'Does a level correspond to an age group?', a: 'No. The six categories, U10 to U20, describe age; the five levels describe the state of the game. A seventeen-year-old beginner enters at Discover, a thirteen-year-old can be at Compete.' },
  { q: 'How does a player move from one level to the next?', a: 'On observable criteria, published on each level’s page and checked over several sessions — never on time elapsed or on a single good performance.' },
  { q: 'What happens to an athlete at the end of the pathway?', a: 'They leave through one of the five doors of the Progress level: a higher club in Cameroon, a continental academy, a scholarship, the international 3x3 circuit, or a career in basketball.' },
  { q: 'Can a young person without means follow the pathway?', a: 'The programme provides sponsor-funded places so that a lack of money keeps nobody out. Sponsorship covers a full season for a named young athlete.' }
];

/* -------------------------------------------------------------------------
   3. SPONSORSHIP
   ---------------------------------------------------------------------- */

export const SECTEURS_EN: Record<string, { examples: string; argument: string; reserve?: string }> = {
  banque: { examples: 'Commercial bank, microfinance institution, mobile money.', argument: 'A first account opened at sixteen is a customer for thirty years. The pathway puts you in front of that age group, and its parents, before anyone else.' },
  telecom: { examples: 'Mobile operator, internet provider, mobile payment service.', argument: 'U16 and U18 players are already your users. Here your brand does not buy their attention: it is attached to what they do with their time three times a week.' },
  brasserie: { examples: 'Water, juices, non-alcoholic energy drinks, soft drinks.', argument: 'Hydrating a young athlete training in 30-degree heat is not a slogan, it is a budget line. A partner in this sector funds something visible at every session.', reserve: 'Non-alcoholic beverages only. No alcohol brand is associated with minors, and that limit is written into the agreement.' },
  assurance: { examples: 'Personal insurance, provident cover, health mutual.', argument: 'Risk, prevention, responsibility: your profession is already the vocabulary of a programme that supervises minors. No other sector sits as naturally beside our commitments.' },
  agroalimentaire: { examples: 'Food processing, milling, oil, dairy.', argument: 'What a fifteen-year-old athlete eats decides what they can do at eighteen. It is a real subject, and one a food partner can carry without forcing it.' },
  energie: { examples: 'Fuel distribution, gas, electricity generation and supply.', argument: 'A fleet, depots, teams across the whole city: youth sport is the most legible subject a local CSR policy can carry in Douala.' },
  transport: { examples: 'Passenger transport, logistics, freight forwarding, courier.', argument: 'Taking a U14 team to a tournament and bringing it home in the evening is a real cost and a service you know how to provide better than anyone. A deliverable can be paid in kind.' },
  distribution: { examples: 'Supermarket, sports shop, convenience network.', argument: 'A back-to-school operation, a corner in store, an equipment drive: distribution is the sector where a deliverable is measured at the till, not only in awareness.' }
};

export const EXCLUSIONS_EN = [
  { titre: 'Alcohol and tobacco', detail: 'No association possible, at any tier, whatever the amount offered. The programme is for young people aged 10 to 20.' },
  { titre: 'Sports betting and gambling', detail: 'Excluded on principle: attaching a bet to a competition between minors mixes two things that must never touch.' },
  { titre: 'Weight-loss products and doping supplements', detail: 'Nothing that promises a growing body a physical shortcut will be carried by this programme.' },
  { titre: 'Any campaign using a minor’s image without written consent', detail: 'Including a partner’s own. That is Annex A, and it overrides the partnership agreement.' }
];

export const ETAPES_EN = [
  { rang: 1, titre: 'You choose a sector and a tier', texte: 'The availability table says what is free. A one-hour meeting is enough to know whether the tier you have in mind matches what your board expects from a CSR line.' },
  { rang: 2, titre: 'We write the agreement', texte: 'A one-season agreement: the reserved sector, the deliverables listed one by one, the dates of the two reports, and the exclusions restated in black and white.' },
  { rang: 3, titre: 'The season starts, and it gets told', texte: 'Your sector switches to “taken” on this page the day of signature. Then two written reports, mid-season and at the end — the impact report you take back to your board.' }
];

export const MENTION_GRILLE_EN = {
  etiquette: 'Working grid',
  texte: 'The five amounts below are a proposal, not a set price: every line awaits the written approval of Teke Blaise Mbah. What is settled, on the other hand, is the content of each tier — the deliverables will not move.',
  consequence: 'In practice: a partner who opens the discussion now is still discussing the grid. In six months, they will sign the printed version.'
};

export const PALIERS_EN: Record<string, { pour: string; accroche: string; contreparties: string[] }> = {
  friend: {
    pour: 'A neighbourhood business, a practice, an SME, a former player who now runs a company.',
    accroche: 'The entry tier — the one that puts a name on a list other people will read.',
    contreparties: [
      'Your name and logo on the Friend of the Lab page of this site, linked to yours.',
      'A mention in every new-season announcement on the programme’s channels.',
      'The end-of-season report, two written pages: what was done, with what, and what it cost.',
      'A named invitation to the season presentation.'
    ]
  },
  bronze: {
    pour: 'A company established in Douala that wants a legible CSR line without building a department to carry it.',
    accroche: 'Your name on the bibs at every session, and on the courtside banner at every home event.',
    contreparties: [
      'Everything in Friend of the Lab.',
      'Your logo on the training bibs worn at every session.',
      'Your logo on the courtside banner at home events.',
      'Two features per year on the programme’s channels.',
      'Named in every event programme.'
    ]
  },
  silver: {
    pour: 'A company that wants to be the official sponsor of one age category, with exclusivity in its sector for the season.',
    accroche: 'One age category carries your name for a season — and you receive a page of this site at your own address.',
    contreparties: [
      'Everything in Bronze.',
      'Your logo on the sleeve of the match jersey.',
      'Your own page on this site, at its own address: your story, your logo, a link to your business.',
      'Official sponsor of one age category — your name attached to that team.',
      'A written impact report every quarter, with photographs taken under the programme’s consent rules.',
      'Four features per year.',
      'Exclusivity in your sector for the season.'
    ]
  },
  gold: {
    pour: 'A bank, a telecom, a beverage company or an insurer with a CSR budget looking for something to spend it on.',
    accroche: 'Front of every jersey, the title of Official Partner, and two athletes sponsored in your name.',
    contreparties: [
      'Everything in Silver.',
      'Front-of-jersey placement on every kit.',
      'The right to use the title Official Partner of The Upgrade Lab in your own advertising.',
      'Naming rights on one camp or one tournament per year.',
      'Your logo on every video the programme publishes.',
      'A filmed feature about your business, produced by a video supplier and funded from the partnership.',
      'A finished CSR case study you can put in your own annual report.',
      'Two athlete sponsorships awarded in your name.',
      'Exclusivity in your sector for the season.'
    ]
  },
  bourse: {
    pour: 'One sponsor, one named young athlete, one full season.',
    accroche: 'The only deliverable in the whole offer that has a face — and the easiest one to say yes to.',
    contreparties: [
      'A full season for one named athlete: kit, training, competition entry.',
      'You are told the athlete’s first name, age category and level in the pathway — never a full name, school or address.',
      'Two written progress reports a year, about that one young person.',
      'An invitation to the end-of-season event.'
    ]
  }
};

export const OFFRE_EN = OFFRE.map((p: PalierOffre) => ({ ...p, href: `/en${p.href}`, ...PALIERS_EN[p.cle] }));

/* -------------------------------------------------------------------------
   4. SAFEGUARDING, COACHING, QUESTIONS
   ---------------------------------------------------------------------- */

export const REGLES_PROTECTION_EN = [
  { titre: 'Written consent from a parent or guardian', texte: 'before a minor appears on any programme material. Without that document, the image is not published.' },
  { titre: 'Never a full name beside a child’s face', texte: 'First name and age category only. A name, a face and a training location are enough for a stranger to find a child.' },
  { titre: 'No address and no training schedule published', texte: 'alongside images of minors. Face plus place plus time is the combination to avoid.' },
  { titre: 'Location data stripped from every file', texte: 'A phone camera writes GPS coordinates inside the file. That is the address of the training ground.' },
  { titre: 'Downloads released to approved people', texte: 'not to anyone holding a link. Share links can be switched off after they are sent. A link that cannot be revoked is permanent, and permanent is the problem.' },
  { titre: 'One named adult, and a 48-hour takedown', texte: 'A parent asks, the file is gone within 48 hours. No reason has to be given.' },
  { titre: 'Consent is withdrawable at any time', texte: 'Consent that cannot be withdrawn was never consent.' }
];

export const METHODE_EN = [
  { titre: 'We correct an action, never a person', texte: '“Your left foot is late” can be worked on. “You are slow” cannot. A coach here talks about the movement, and the player leaves with something to do, not something to be.' },
  { titre: 'The level decides the content, not the age', texte: 'Two groups of thirteen-year-olds can do two different sessions. The five-level pathway exists for that, and the coach follows it rather than working around it.' },
  { titre: 'Few drills, many repetitions', texte: 'A movement that survives neither fatigue nor a defender does not exist yet. We repeat clean, and speed comes afterwards.' },
  { titre: 'An adult present, start to finish', texte: 'A group of minors is never left alone on a court — not at the warm-up, not while tidying up. It is a rule, not an intention.' },
  { titre: 'We say things, to both', texte: 'The end-of-session feedback is said to the player in their words, and said again to the parent in theirs. Nobody leaves wondering what we thought of them.' },
  { titre: 'School comes first', texte: 'A coach who learns that a player is slipping in class talks to the family before talking about basketball. The programme produces athletes; it produces pupils first.' }
];

export const EXIGENCES_EN = [
  'That the adult supervising their child is identifiable, reachable, and present at every session.',
  'That the child-protection rules are written down, and readable before enrolling a child.',
  'That honest feedback is given after the trial session, in the parent’s own words.',
  'That coaches’ qualifications are published, with the date they were verified — not merely asserted.'
];

export const COMPOSANTES_EN = [
  { titre: 'Training', texte: 'Technical and tactical, every session, set by the level of the group and not by age.' },
  { titre: 'Physical development', texte: 'Strength, mobility, speed, injury prevention — adapted to growing bodies.' },
  { titre: 'Talent identification', texte: 'Spotting potential, not only today’s level. A trial session, never a stopwatch.' },
  { titre: 'Competition', texte: 'Friendly games, tournaments: learning to play under pressure, to lose, then to stop losing.' },
  { titre: 'School', texte: 'Following schooling and work habits. Nobody progresses on the court while going backwards in class.' },
  { titre: 'Life skills', texte: 'Communication, discipline, confidence, decision-making. What remains when basketball stops.' },
  { titre: 'Mentoring', texte: 'Coaches, former players, professionals: adults who answer the questions nobody dares to ask.' },
  { titre: 'Exposure', texte: 'Chances to show what you can do in front of other clubs, other coaches, other cities.' },
  { titre: 'Community', texte: 'Open clinics, school visits, neighbourhood tournaments. A programme that gives back to where it trains.' }
];

export const VALEURS_EN: [string, string][] = [
  ['Excellence', 'We try to do better, every week, without waiting to be asked.'],
  ['Discipline', 'Regular effort and personal responsibility are the base of everything else.'],
  ['Growth', 'Every young person must be able to progress, whatever their starting point.'],
  ['Team', 'A talent alone goes fast; a talent in a team goes far.'],
  ['Respect', 'For teammates, coaches, opponents, referees, families, the court.'],
  ['Integrity', 'We do what we said, and we write down what we do.'],
  ['Inclusion', 'Girls and boys, whatever the neighbourhood or the family’s means.'],
  ['Resilience', 'We learn from a lost game, and we come back.']
];

export const QUESTIONS_EN: QR[] = [
  { q: 'From what age can a child join The Upgrade Lab?', a: `The programme takes young people from ${FAITS.ageMin} to ${FAITS.ageMax}, in six categories: ${FAITS.categories.join(', ')}.` },
  { q: 'How does the development pathway work?', a: 'In five successive levels — Discover, Develop, Compete, Perform, Progress — leading from first contact with the ball to higher clubs, academies and scholarships.' },
  { q: 'Are girls accepted?', a: 'Yes. The programme develops girls’ and boys’ groups, and provides sponsor-funded places so that a lack of money keeps nobody out.' },
  { q: 'How do you sponsor a single athlete?', a: 'Sponsorship covers a full season for one named young athlete — kit, training and competition entry — with two written progress reports a year about that person.' },
  { q: 'Is a medical certificate required to play?', a: 'The documents requested at enrolment are listed in writing in the reply sent to the family after first contact. A parent or guardian signs the enrolment: a minor does not enrol alone.' },
  { q: 'What court does the programme train on?', a: EN.terrain },
  { q: 'What guarantees exist for the protection of minors?', a: 'Seven written commitments, four of which appear on every page of the site: written parental consent before any image; never a full name beside a child’s face; no training address or schedule published; taken down within 48 hours on request. The Safeguarding page details all seven.' },
  { q: 'How does a company become a sponsor?', a: 'Through an annual partnership in one of the eight sectors offered in Douala, exclusive from the Silver tier, or by sponsoring a single athlete for a season. Deliverables are written tier by tier on the Sponsors page.' },
  { q: 'Who coaches the sessions?', a: 'Adult coaches, present at every session, who correct an action and never a person. Names, diplomas and certifications will be published on the Coaching page the day they are confirmed, with the verification date.' }
];

export const ATTENTE_QUESTIONS_EN = [
  { q: 'Where does the programme train in Douala?', cle: 'terrain' },
  { q: 'How much does a season cost for one athlete?', cle: 'cotisation' }
];
