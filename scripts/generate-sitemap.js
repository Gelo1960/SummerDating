#!/usr/bin/env node
/**
 * generate-sitemap.js
 *
 * Génère sitemap.xml en scannant tous les fichiers HTML du site.
 * — Pages racine : index.html, support.html, privacy_policy.html, terms_of_service.html
 * — Articles blog : blog/*.html
 * — Pages lieux : lieux/*.html ou .next/server/app/lieux/*.html (build Next.js)
 *
 * Usage :
 *   node scripts/generate-sitemap.js
 *   SITE_URL=https://summer.dating node scripts/generate-sitemap.js
 *
 * Hook postbuild (package.json) :
 *   "scripts": {
 *     "build": "next build",
 *     "postbuild": "node scripts/generate-sitemap.js"
 *   }
 */

const fs = require('fs');
const path = require('path');

// ---------- CONFIG ----------
const SITE_URL = (process.env.SITE_URL || 'https://summer.dating').replace(/\/$/, '');
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'sitemap.xml');

// Pages racine (chemin local → URL publique)
const ROOT_PAGES = [
  { file: 'index.html',          url: '/',                       priority: 1.0, changefreq: 'weekly' },
  { file: 'support.html',        url: '/support.html',           priority: 0.5, changefreq: 'yearly' },
  { file: 'privacy_policy.html', url: '/privacy_policy.html',    priority: 0.3, changefreq: 'yearly' },
  { file: 'terms_of_service.html', url: '/terms_of_service.html', priority: 0.3, changefreq: 'yearly' },
];

// Dossiers où chercher les pages dynamiques
const BLOG_DIR  = path.join(ROOT, 'blog');
const LIEUX_DIR_STATIC = path.join(ROOT, 'lieux');                       // si jamais on les bouge à la racine
const LIEUX_DIR_NEXT   = path.join(ROOT, '.next', 'server', 'app', 'lieux'); // build Next.js

// ---------- HELPERS ----------
function exists(p)            { try { return fs.statSync(p).isDirectory(); } catch { return false; } }
function existsFile(p)        { try { return fs.statSync(p).isFile(); } catch { return false; } }
function ymd(date)            { return new Date(date).toISOString().slice(0, 10); }
function escapeXml(s)         { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;'); }

/** Renvoie tous les fichiers .html d'un dossier (non récursif) */
function listHtml(dir) {
  if (!exists(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.html'))
    .map(f => ({ name: f, full: path.join(dir, f), mtime: fs.statSync(path.join(dir, f)).mtime }));
}

/** Détermine la fréquence et la priorité d'un article blog selon sa date */
function blogChangefreq(mtime) {
  const days = (Date.now() - mtime.getTime()) / (1000 * 60 * 60 * 24);
  if (days < 14)  return 'weekly';
  if (days < 60)  return 'monthly';
  return 'yearly';
}

// ---------- COLLECT URLS ----------
const urls = [];

// Racine
for (const p of ROOT_PAGES) {
  const full = path.join(ROOT, p.file);
  if (existsFile(full)) {
    urls.push({
      loc: SITE_URL + p.url,
      lastmod: ymd(fs.statSync(full).mtime),
      changefreq: p.changefreq,
      priority: p.priority.toFixed(1),
    });
  }
}

// Blog
const blogFiles = listHtml(BLOG_DIR);
const hasBlogIndex = blogFiles.some(f => f.name === 'index.html');
if (hasBlogIndex) {
  const idx = blogFiles.find(f => f.name === 'index.html');
  urls.push({
    loc: SITE_URL + '/blog/',
    lastmod: ymd(idx.mtime),
    changefreq: 'daily',
    priority: '0.9',
  });
}
for (const f of blogFiles) {
  if (f.name === 'index.html') continue; // déjà ajouté ci-dessus comme /blog/
  urls.push({
    loc: SITE_URL + '/blog/' + f.name,
    lastmod: ymd(f.mtime),
    changefreq: blogChangefreq(f.mtime),
    priority: '0.8',
  });
}

// Lieux (statique en priorité, sinon build Next.js)
let lieuxFiles = listHtml(LIEUX_DIR_STATIC);
let lieuxBaseUrl = '/lieux/';
let lieuxStripExt = false;
if (!lieuxFiles.length && exists(LIEUX_DIR_NEXT)) {
  lieuxFiles = listHtml(LIEUX_DIR_NEXT);
  // Next.js sert ces pages sans .html ; on garde tout de même pour matcher l'URL existante
  // Si tu préfères les URLs sans .html, mets lieuxStripExt = true.
  lieuxStripExt = false;
}
const hasLieuxIndex = lieuxFiles.some(f => f.name === 'index.html')
                   || existsFile(path.join(LIEUX_DIR_NEXT, '..', 'lieux.html'));

if (hasLieuxIndex) {
  // page hub /lieux/ (la page hub Next.js est .next/server/app/lieux.html → URL /lieux)
  const hubFile = path.join(LIEUX_DIR_NEXT, '..', 'lieux.html');
  if (existsFile(hubFile)) {
    urls.push({
      loc: SITE_URL + '/lieux',
      lastmod: ymd(fs.statSync(hubFile).mtime),
      changefreq: 'weekly',
      priority: '0.9',
    });
  }
}
for (const f of lieuxFiles) {
  if (f.name === 'index.html') continue;
  const urlPath = lieuxBaseUrl + (lieuxStripExt ? f.name.replace(/\.html$/, '') : f.name);
  urls.push({
    loc: SITE_URL + urlPath,
    lastmod: ymd(f.mtime),
    changefreq: 'monthly',
    priority: '0.7',
  });
}

// Tri : home en premier, puis priorité décroissante, puis date de modif décroissante
urls.sort((a, b) => {
  if (a.loc === SITE_URL + '/') return -1;
  if (b.loc === SITE_URL + '/') return 1;
  const dp = parseFloat(b.priority) - parseFloat(a.priority);
  if (dp !== 0) return dp;
  return b.lastmod.localeCompare(a.lastmod);
});

// ---------- BUILD XML ----------
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(u =>
    '  <url>\n' +
    `    <loc>${escapeXml(u.loc)}</loc>\n` +
    `    <lastmod>${u.lastmod}</lastmod>\n` +
    `    <changefreq>${u.changefreq}</changefreq>\n` +
    `    <priority>${u.priority}</priority>\n` +
    '  </url>'
  ),
  '</urlset>',
  '',
].join('\n');

fs.writeFileSync(OUT, xml, 'utf8');

// ---------- LOG ----------
console.log(`✓ sitemap.xml généré : ${urls.length} URLs (${SITE_URL})`);
console.log(`  → racine : ${ROOT_PAGES.filter(p => existsFile(path.join(ROOT, p.file))).length}`);
console.log(`  → blog   : ${blogFiles.length}${hasBlogIndex ? ' (incl. /blog/)' : ''}`);
console.log(`  → lieux  : ${lieuxFiles.length}`);
console.log(`  → fichier : ${OUT}`);
