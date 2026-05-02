#!/usr/bin/env node
/**
 * check-orphans.js
 *
 * Diagnostic : compare le contenu de blog/articles.json (la source de vérité
 * du hub /blog/) avec les fichiers .html présents dans /blog/.
 *
 * Liste 3 catégories :
 *   - Orphelins  : fichiers .html présents mais absents de articles.json
 *                  (= invisibles sur la page hub /blog/)
 *   - Manquants  : entrées dans articles.json sans fichier .html correspondant
 *                  (= liens cassés sur la page hub)
 *   - OK         : entrées présentes des deux côtés
 *
 * Usage :
 *   node scripts/check-orphans.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'blog');
const META_PATH = path.join(BLOG_DIR, 'articles.json');

if (!fs.existsSync(META_PATH)) {
  console.error('❌ blog/articles.json introuvable');
  process.exit(1);
}

const articles = JSON.parse(fs.readFileSync(META_PATH, 'utf8'));
const slugsInJson = new Set(articles.map(a => a.slug));

const htmlFiles = fs.readdirSync(BLOG_DIR)
  .filter(f => f.endsWith('.html') && f !== 'index.html')
  .map(f => f.replace(/\.html$/, ''));
const slugsOnDisk = new Set(htmlFiles);

const orphans = htmlFiles.filter(s => !slugsInJson.has(s));
const missing = articles.filter(a => !slugsOnDisk.has(a.slug));
const okCount = articles.length - missing.length;

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  DIAGNOSTIC — ORPHELINS BLOG SUMMER DATING');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log(`  📦 Fichiers .html dans /blog/   : ${htmlFiles.length}`);
console.log(`  📋 Entrées dans articles.json   : ${articles.length}`);
console.log(`  ✅ Synchronisés                  : ${okCount}`);
console.log(`  👻 Orphelins (HTML sans entrée) : ${orphans.length}`);
console.log(`  💔 Manquants (entrée sans HTML) : ${missing.length}`);
console.log('');

if (orphans.length > 0) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  👻 ORPHELINS — ${orphans.length} articles HTML absents du hub /blog/`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Ces articles existent physiquement mais ne sont pas listés');
  console.log('  sur la page d\'index du blog. Conséquence : pas de lien interne');
  console.log('  → autorité SEO faible, pas découvrables par l\'utilisateur.');
  console.log('');
  orphans.forEach((s, i) => console.log(`  ${String(i + 1).padStart(3)}. ${s}.html`));
  console.log('');
}

if (missing.length > 0) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  💔 LIENS CASSÉS — ${missing.length} entrées dans articles.json sans fichier`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  La page hub /blog/ pointe vers ces URLs mais le fichier');
  console.log('  HTML correspondant n\'existe pas → 404 sur le clic.');
  console.log('');
  missing.forEach((a, i) => console.log(`  ${String(i + 1).padStart(3)}. ${a.slug}.html  (titre : ${a.title})`));
  console.log('');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  RECOMMANDATIONS');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
if (orphans.length > 0) {
  console.log('  Pour les orphelins, deux options :');
  console.log('  A) Si ce sont de vrais articles utiles → les rajouter à articles.json');
  console.log('     (+ rerun: npm run build-index puis npm run sitemap)');
  console.log('  B) Si ce sont des doublons / drafts → les supprimer pour éviter');
  console.log('     la cannibalisation SEO');
}
if (missing.length > 0) {
  console.log('  Pour les liens cassés, retirer les entrées de articles.json');
  console.log('  ou recréer les fichiers HTML manquants.');
}
if (orphans.length === 0 && missing.length === 0) {
  console.log('  ✨ Tout est sync. Pas d\'action nécessaire.');
}
console.log('');
