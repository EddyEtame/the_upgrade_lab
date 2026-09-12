/**
 * audit-build.mjs — le contrôle de build. Rouge, pas orange.
 *
 * Tourne sur dist/ après `astro build` et échoue (exit 1) sur :
 *   1. INTENTION      une intention prioritaire (seo-map PAGE_INTENTS) absente du
 *                     texte VISIBLE de sa page
 *   2. FAIT_FAUX      une réponse `verified:false` de SHORT_ANSWERS qui atteint la sortie
 *   3. TEINTE_TEXTE   une teinte du logo (#0068E0, #F0005A, #F89800) posée en `color:`
 *   4. POIDS          une page > 100 Ko gzip, ou l'accueil > 40 Ko gzip
 *   5. VENTE_NEGATIVE une ouverture sur une absence dans le premier h1 ou le premier p
 *   6. IMAGE          un <img> ou <picture> hors de /brand/ (seul le logo du client passe)
 *   7. ANNEXE_A       une adresse ou un motif d'horaire d'entraînement
 *
 * Node seul, aucune dépendance. Les fichiers TypeScript du socle sont lus au
 * regex : ce script ne doit jamais dépendre d'un chargeur.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { gzipSync } from 'node:zlib';

const DIST = 'dist';
const SEO = readFileSync('src/data/seo-map.ts', 'utf8');
const erreurs = [];
const ok = [];
const echec = (code, page, detail) => erreurs.push({ code, page, detail });

/* ---------- utilitaires ---------- */
const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[’'.,;:!?()«»"—–-]/g, ' ').replace(/\s+/g, ' ').toLowerCase();
function visible(html) {
  return norm(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;|&#160;/g, ' ')
      .replace(/&[a-z]+;/g, ' ')
  );
}
function* html(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) yield* html(p);
    else if (f.endsWith('.html')) yield p;
  }
}
const urlDe = (p) => '/' + relative(DIST, p).replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\.html$/, '/');

/**
 * Une intention est une REQUÊTE, pas une chaîne à coller (loi 3 du registre :
 * « club de basket {ville} » se répond « club de basket à {ville} »). On exige
 * donc chaque mot significatif de l'intention, dans l'ordre, dans le texte
 * visible, en tolérant jusqu'à quatre mots-outils entre deux d'entre eux et le
 * pluriel. Ce que ça refuse toujours : un mot manquant, ou l'ordre inversé.
 */
const OUTILS = new Set(['a', 'au', 'aux', 'de', 'du', 'des', 'd', 'l', 'le', 'la', 'les', 'un', 'une', 'en', 'et', 'pour', 'qu', 'on', 'sur',
  'the', 'an', 'of', 'in', 'for', 'to', 'and', 'at', 'is', 'are', 'with', 'that', 'this', 'your']);
const racine = (w) => w.replace(/(s|x)$/, '');
function contientIntention(txt, intention) {
  const cible = intention.split(' ').filter((w) => w && !OUTILS.has(w)).map(racine);
  const mots = txt.split(' ').filter((w) => w && !OUTILS.has(w)).map(racine);
  if (!cible.length) return true;
  /* chaque occurrence du premier mot est un départ possible ; ensuite chaque
     mot suivant doit se trouver dans les cinq mots qui suivent le précédent */
  for (let s = 0; s < mots.length; s++) {
    if (mots[s] !== cible[0]) continue;
    let pos = s, ok = true;
    for (let i = 1; i < cible.length && ok; i++) {
      let trouve = -1;
      for (let j = pos + 1; j <= pos + 5 && j < mots.length; j++) {
        if (mots[j] === cible[i]) { trouve = j; break; }
      }
      if (trouve < 0) ok = false; else pos = trouve;
    }
    if (ok) return true;
  }
  return false;
}

/* ---------- ce que le socle déclare ---------- */
const intents = [...SEO.matchAll(/\{\s*url:\s*'([^']+)',\s*intent:\s*'([^']+)'/g)].map((m) => ({ url: m[1], intent: norm(m[2]) }));
const nonVerifiees = [...SEO.matchAll(/a:\s*'([^']+)',\s*verified:\s*false/g)].map((m) => norm(m[1]).slice(0, 60));

/* ---------- les pages ---------- */
const pages = [...html(DIST)];
if (!pages.length) { console.error('audit : dist/ est vide — lancer astro build d’abord.'); process.exit(1); }

for (const p of pages) {
  const url = urlDe(p);
  const src = readFileSync(p, 'utf8');
  const txt = visible(src);
  const gz = gzipSync(src).length;

  /* 1 · intention prioritaire visible */
  const it = intents.find((i) => i.url === url);
  if (it) {
    if (contientIntention(txt, it.intent)) ok.push(`${url}  intention « ${it.intent} » présente`);
    else echec('INTENTION', url, `« ${it.intent} » absente du texte visible`);
  }

  /* 2 · aucune réponse non vérifiée */
  for (const a of nonVerifiees) if (a && txt.includes(a)) echec('FAIT_FAUX', url, `réponse non vérifiée émise : « ${a}… »`);

  /* 3 · teinte du logo en couleur de texte */
  const css = (src.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || []).join('\n') + ' ' + (src.match(/style="[^"]*"/g) || []).join(' ');
  const hit = css.match(/(?:^|[;{\s"])color\s*:\s*#(0068E0|F0005A|F89800)\b/i);
  if (hit) echec('TEINTE_TEXTE', url, `#${hit[1]} posé en color: — les teintes du logo sont des aplats, jamais du texte`);

  /* 4 · poids */
  const plafond = url === '/' ? 40 * 1024 : 100 * 1024;
  if (gz > plafond) echec('POIDS', url, `${(gz / 1024).toFixed(1)} Ko gzip > ${plafond / 1024} Ko`);
  else ok.push(`${url}  ${(gz / 1024).toFixed(1)} Ko gzip`);

  /* 5 · vente négative en ouverture */
  const h1 = norm((src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || ['', ''])[1].replace(/<[^>]+>/g, ' '));
  const mainHtml = (src.match(/<main[\s\S]*?<\/main>/i) || [src])[0];
  const p1 = norm((mainHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i) || ['', ''])[1].replace(/<[^>]+>/g, ' '));
  for (const neg of ['nous n avons pas', 'il n y a pas de', 'pas encore de', 'n existe pas encore', 'ne propose pas',
                     'we do not have', 'we don t have', 'there is no', 'not yet available', 'does not yet', 'we do not offer']) {
    if (h1.includes(neg) || p1.includes(neg)) echec('VENTE_NEGATIVE', url, `ouverture sur une absence : « ${neg} »`);
  }

  /* 6 · aucune image raster */
  if (/<picture\b/i.test(src) || /<img\b(?![^>]*\bsrc="\/brand\/)/i.test(src))
    echec('IMAGE', url, '<img> hors de /brand/ — le site ne publie aucune photographie, seul le logo du client passe');

  /* 7 · Annexe A : adresse ou horaire d'entraînement */
  if (/\b(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\b[^.]{0,40}\b\d{1,2}\s?h(\s?\d{2})?\b/i.test(txt))
    echec('ANNEXE_A', url, 'jour + heure : ressemble à un horaire d’entraînement publié');
  if (/\b\d{1,4}\s+(rue|avenue|boulevard|bd|carrefour|rond-point)\b/i.test(txt))
    echec('ANNEXE_A', url, 'motif d’adresse postale dans le texte visible');
}

/* ---------- la sortie ---------- */
const ligne = '─'.repeat(72);
console.log(`\naudit-build · ${pages.length} pages\n${ligne}`);
for (const o of ok) console.log('  ✓ ' + o);
if (erreurs.length) {
  console.log(`\n${ligne}\n  ${erreurs.length} ÉCHEC(S)\n`);
  for (const e of erreurs) console.log(`  ✗ ${e.code.padEnd(15)} ${e.page.padEnd(30)} ${e.detail}`);
  console.log();
  process.exit(1);
}
console.log(`\n  aucun échec — ${pages.length} pages, ${intents.length} intentions déclarées\n`);
