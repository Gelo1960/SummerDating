#!/usr/bin/env node
/**
 * fix-domain.js
 *
 * Remplace toutes les occurrences de `summer-dating.vercel.app` par `summer.dating`
 * dans les fichiers HTML du site. Indispensable car les anciens articles ont été
 * générés quand le domaine de prod était encore le sous-domaine Vercel.
 *
 * Sans ce fix, Google considère que les articles appartiennent à `summer-dating.vercel.app`
 * (à cause des balises canonical, og:url, twitter:url) → ils ne se rankent pas sur summer.dating.
 *
 * Usage :
 *   node scripts/fix-domain.js          (exécution réelle)
 *   node scripts/fix-domain.js --dry    (simulation, ne modifie rien)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OLD = 'summer-dating.vercel.app';
const NEW = 'summer.dating';
const DRY = process.argv.includes('--dry');

const TARGETS = [
  path.join(ROOT, 'index.html'),
  path.join(ROOT, 'support.html'),
  path.join(ROOT, 'privacy_policy.html'),
  path.join(ROOT, 'terms_of_service.html'),
  path.join(ROOT, 'blog'),
];

function listHtml(p) {
  if (!fs.existsSync(p)) return [];
  const stat = fs.statSync(p);
  if (stat.isFile() && p.endsWith('.html')) return [p];
  if (stat.isDirectory()) {
    return fs.readdirSync(p)
      .filter(f => f.endsWith('.html'))
      .map(f => path.join(p, f));
  }
  return [];
}

const files = TARGETS.flatMap(listHtml);
let changed = 0;
let occurrences = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(new RegExp(OLD.replace(/\./g, '\\.'), 'g'));
  if (!matches) continue;

  occurrences += matches.length;
  changed++;

  if (!DRY) {
    const fixed = content.split(OLD).join(NEW);
    fs.writeFileSync(file, fixed, 'utf8');
  }
  console.log(`  ${DRY ? '[DRY]' : '✓'} ${path.relative(ROOT, file)} (${matches.length} occurrence${matches.length > 1 ? 's' : ''})`);
}

console.log('');
console.log(`${DRY ? 'Simulation :' : 'Terminé :'} ${changed} fichier${changed > 1 ? 's' : ''} ${DRY ? 'à modifier' : 'modifiés'}, ${occurrences} occurrence${occurrences > 1 ? 's' : ''} de "${OLD}" ${DRY ? 'détectée' : 'remplacée'}${occurrences > 1 ? 's' : ''} par "${NEW}".`);
if (DRY) {
  console.log('\nPour appliquer réellement les changements : node scripts/fix-domain.js');
}
