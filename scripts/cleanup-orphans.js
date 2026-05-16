#!/usr/bin/env node
/**
 * cleanup-orphans.js
 *
 * Catégorise les fichiers HTML orphelins (présents dans /blog/ mais absents
 * de articles.json) et permet de supprimer les doublons et le contenu obsolète.
 *
 * Catégories :
 *   - cannibalization : variations infinies sur "fatigue apps", "alternative tinder",
 *                       etc. Toxique pour le SEO (Google détecte du spam IA).
 *   - obsolete        : événements passés (1er mai, Pâques, dates avril 2026).
 *   - duplicates      : autres doublons explicites détectés.
 *   - review          : articles uniques potentiellement intéressants — à examiner
 *                       et soit rajouter à articles.json, soit supprimer.
 *
 * Usage :
 *   node scripts/cleanup-orphans.js                     (rapport seul, ne touche à rien)
 *   node scripts/cleanup-orphans.js --delete-cannibalization
 *   node scripts/cleanup-orphans.js --delete-obsolete
 *   node scripts/cleanup-orphans.js --delete-duplicates
 *   node scripts/cleanup-orphans.js --delete-all        (les 3 premières catégories d'un coup)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'blog');
const META_PATH = path.join(BLOG_DIR, 'articles.json');

const ARGS = new Set(process.argv.slice(2));
const DELETE_CANNIBALIZATION = ARGS.has('--delete-cannibalization') || ARGS.has('--delete-all');
const DELETE_OBSOLETE        = ARGS.has('--delete-obsolete') || ARGS.has('--delete-all');
const DELETE_DUPLICATES      = ARGS.has('--delete-duplicates') || ARGS.has('--delete-all');

// ---------- Détection des cannibalisations ----------
const CANNIBALIZATION_PATTERNS = [
  /fatigue/i,
  /^marre-/i,
  /alternative-app/i,
  /alternatives-app/i,
  /alternative-tinder/i,
  /alternatives-tinder/i,
  /alternative-application/i,
  /alternatives-application/i,
  /alternative-dating/i,
  /anti-fatigue/i,
  /dating-fatigue/i,
  /nouvelles-pistes/i,
  /nouvelles-rencontres/i,
  /sortir-du-swipe/i,
  /fini-le-swipe/i,
  /lutter-contre-dating/i,
  /guide-applications-rencontre/i,
  /meilleures-applications-rencontres/i,
  /meilleures-applis-rencontres/i,
  /^application-rencontre-/i,
  /^applis-de-rencontres-paris/i,
  /^applis-rencontre-sorties-originales/i,
  /^fitvybe-vs-/i,
  /^summer-dating-nouvelle-appli/i,
  /rencontres-alternatives-paris/i,
  /rencontres-sans-appli/i,
  /^speed-dating-paris-alternatives-applis/i,
  /^speed-dating-paris-original-retour-irl/i,
  /^nouvelles-tendances-dating/i,
  /^nouvelles-tendances-rencontres-alternatives/i,
  /^tendances-lifestyle-paris-(2026-)?(date|dates|dating|rencontres|social-dating)/i,
];

// ---------- Détection des obsolètes ----------
const OBSOLETE_PATTERNS = [
  /1er-mai/i,
  /^chasse-aux-oeufs-paris-2026/i,
  /paques/i,
  /lundi-de-paques/i,
  /sortie-dimanche-paris-rencontre-idees-19-avril/i,
  /sorties-paris-11-avril/i,
  /sorties-paris-25-avril/i,
  /sorties-paris-4-avril/i,
  /sorties-paris-ce-soir-date-spontanee-22-avril/i,
  /sorties-paris-week-end-premier-date-avril/i,
  /sorties-paris-week-end-rencontres-avril/i,
  /sorties-paris-week-end-rencontres-sans-apps-25-avril/i,
  /sorties-romantiques-paris-27-avril-3-mai/i,
  /sorties-date-paris-samedi-25-avril/i,
  /date-pleine-lune-paris-(avril|mars)-2026/i,
  /^week-end-1er-mai/i,
  /^week-end-paris-date-original-1er-mai/i,
  /date-lundi-soir-paris-idees-insolites-20-avril/i,
  /^marathon-paris-2026-rencontres-dates/i,
];

// ---------- Doublons explicites ----------
// Articles dont une autre version (souvent dans articles.json) existe déjà
const DUPLICATE_FILES = [
  'meilleurs-rooftops-date-paris-2026-20260328-1800.html', // -2000 est dans articles.json
  'expo-matisse-grand-palais-date-culturel-paris-20260329-2100.html', // duplique avec article principal Matisse
  'sortie-lundi-soir-paris-date-evenements.html',
  'sortie-lundi-soir-paris-date-insolite.html',
  'sortie-lundi-soir-paris-date-original-2026.html',
  'sortie-lundi-soir-paris-rencontres-idees.html',
  'street-style-paris-date-looks-fashion-week.html', // duplique street-style-fashion-week-looks-date-paris
];

// ---------- Run ----------
if (!fs.existsSync(META_PATH)) {
  console.error('❌ blog/articles.json introuvable');
  process.exit(1);
}

const articles = JSON.parse(fs.readFileSync(META_PATH, 'utf8'));
const slugsInJson = new Set(articles.map(a => a.slug));

const allHtml = fs.readdirSync(BLOG_DIR)
  .filter(f => f.endsWith('.html') && f !== 'index.html');

const orphans = allHtml.filter(f => !slugsInJson.has(f.replace(/\.html$/, '')));

const cat = { cannibalization: [], obsolete: [], duplicates: [], review: [] };
for (const file of orphans) {
  const slug = file.replace(/\.html$/, '');
  if (CANNIBALIZATION_PATTERNS.some(rx => rx.test(slug))) {
    cat.cannibalization.push(file);
  } else if (OBSOLETE_PATTERNS.some(rx => rx.test(slug))) {
    cat.obsolete.push(file);
  } else if (DUPLICATE_FILES.includes(file)) {
    cat.duplicates.push(file);
  } else {
    cat.review.push(file);
  }
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`  CLEANUP — ${orphans.length} orphelins à traiter`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`  🚫 Cannibalisation dating  : ${cat.cannibalization.length} (suppression recommandée)`);
console.log(`  📅 Événements passés       : ${cat.obsolete.length} (suppression recommandée)`);
console.log(`  👯 Doublons explicites     : ${cat.duplicates.length} (suppression recommandée)`);
console.log(`  🔍 À examiner manuellement : ${cat.review.length}`);
console.log('');

function printGroup(title, files, willDelete) {
  if (!files.length) return;
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  ${title} ${willDelete ? '— SUPPRESSION' : ''}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  files.forEach((f, i) => console.log(`  ${String(i + 1).padStart(3)}. ${willDelete ? '🗑️  ' : '   '}${f}`));
  console.log('');
}

printGroup(`🚫 CANNIBALISATION — ${cat.cannibalization.length} fichiers`, cat.cannibalization, DELETE_CANNIBALIZATION);
printGroup(`📅 ÉVÉNEMENTS PASSÉS — ${cat.obsolete.length} fichiers`, cat.obsolete, DELETE_OBSOLETE);
printGroup(`👯 DOUBLONS — ${cat.duplicates.length} fichiers`, cat.duplicates, DELETE_DUPLICATES);
printGroup(`🔍 À EXAMINER MANUELLEMENT — ${cat.review.length} fichiers`, cat.review, false);

// Suppression effective
let deleted = 0;
function maybeDelete(files, flag) {
  if (!flag) return;
  for (const f of files) {
    fs.unlinkSync(path.join(BLOG_DIR, f));
    deleted++;
  }
}
maybeDelete(cat.cannibalization, DELETE_CANNIBALIZATION);
maybeDelete(cat.obsolete, DELETE_OBSOLETE);
maybeDelete(cat.duplicates, DELETE_DUPLICATES);

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
if (deleted > 0) {
  console.log(`  ✅ ${deleted} fichier${deleted > 1 ? 's' : ''} supprimé${deleted > 1 ? 's' : ''}.`);
  console.log(`  Pense à relancer : npm run sitemap && git add -A && git commit && git push`);
} else if (DELETE_CANNIBALIZATION || DELETE_OBSOLETE || DELETE_DUPLICATES) {
  console.log('  Aucun fichier supprimé (rien ne correspondait aux flags).');
} else {
  console.log('  Mode rapport seul. Pour supprimer, rajoute --delete-cannibalization, --delete-obsolete, --delete-duplicates ou --delete-all.');
  console.log('');
  console.log('  Suggestion : commence par un --dry visual review, puis :');
  console.log('    node scripts/cleanup-orphans.js --delete-all');
}
console.log('');

// Suggérer ce qu'il faut faire pour les "review"
if (cat.review.length > 0 && !DELETE_CANNIBALIZATION && !DELETE_OBSOLETE && !DELETE_DUPLICATES) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  POUR LES ARTICLES "À EXAMINER" :');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Ouvre chacun dans un éditeur, lis le contenu :');
  console.log('  → Si l\'article est utile et unique → ajoute-le à blog/articles.json');
  console.log('  → Si c\'est un doublon ou de la pub → supprime-le manuellement');
  console.log('');
  console.log('  Articles potentiellement intéressants à conserver :');
  console.log('  - karmine-corp-date-paris-esport-rencontres.html (esports)');
  console.log('  - sofiane-pamart-concert-date-paris-2026.html (concert)');
  console.log('  - the-strokes-concert-paris-date-rencontre-bars.html (concert)');
  console.log('  - roland-garros-2026-sorties-rencontres-paris.html (à venir mai-juin)');
  console.log('  - vide-greniers-paris-2-3-mai-2026-date-chineurs-... (ce week-end)');
  console.log('  - date-foire-de-paris-2026-guide-premier-rendez-vous-original.html');
  console.log('  - date-piscine-paris-guide-ete.html (saisonnier été)');
  console.log('  - rave-party-paris-rencontres-authentiques.html (evergreen)');
  console.log('  - fashion-week-paris-sans-invitation-spots-astuces.html');
  console.log('  - rencontre-metro-paris-aborder-securite.html');
  console.log('  - dates-originaux-paris-sans-transports-ete-2026.html');
  console.log('  - date-la-defense-parvis-terrasses-rencontre-insolite.html');
  console.log('  - travaux-transports-paris-2026-dates-insolites-ete-intense.html');
  console.log('');
  console.log('  Le reste de la liste contient probablement encore des doublons —');
  console.log('  ouvre, regarde, décide.');
}
