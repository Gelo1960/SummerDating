// scripts/fetch-trends.js
// Détecte les sujets tendance et génère un brief d'article

const Parser = require("rss-parser");
const config = require("./config");

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "SummerDating-SEO-Bot/1.0",
  },
});

/**
 * Récupère les tendances depuis les flux RSS configurés
 */
async function fetchRSSTopics() {
  const topics = [];

  for (const source of config.trendSources) {
    try {
      const feed = await parser.parseURL(source.url);
      const items = feed.items.slice(0, 5).map((item) => ({
        title: item.title,
        link: item.link,
        source: source.name,
        type: source.type,
        date: item.pubDate || item.isoDate,
      }));
      topics.push(...items);
      console.log(`✅ ${source.name}: ${items.length} sujets récupérés`);
    } catch (err) {
      console.warn(`⚠️  ${source.name} indisponible: ${err.message}`);
    }
  }

  return topics;
}

/**
 * Sélectionne un angle d'article depuis les keyword pools
 * Rotation basée sur le jour de l'année pour ne jamais répéter
 */
function pickKeywordAngle() {
  const pools = config.keywordPools;
  const categories = Object.keys(pools);
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  );

  // Rotation catégorie par jour
  const categoryIndex = dayOfYear % categories.length;
  const category = categories[categoryIndex];
  const keywords = pools[category];

  // Rotation keyword dans la catégorie
  const keywordIndex = Math.floor(dayOfYear / categories.length) % keywords.length;
  const primaryKeyword = keywords[keywordIndex];

  // Keyword secondaire aléatoire d'une autre catégorie
  const otherCategory = categories[(categoryIndex + 1) % categories.length];
  const secondaryKeyword =
    pools[otherCategory][Math.floor(Math.random() * pools[otherCategory].length)];

  return {
    category,
    primaryKeyword,
    secondaryKeyword,
    allKeywords: [primaryKeyword, secondaryKeyword],
  };
}

/**
 * Filtre les tendances RSS pour ne garder que celles pertinentes
 * pour Summer Dating (dating, sorties, événements, lifestyle parisien)
 */
function filterRelevantTrends(topics) {
  const relevanceKeywords = [
    "paris",
    "sortie",
    "rencontre",
    "dating",
    "événement",
    "festival",
    "bar",
    "restaurant",
    "soirée",
    "concert",
    "expo",
    "culture",
    "été",
    "weekend",
    "amour",
    "couple",
    "célibataire",
    "tinder",
    "bumble",
    "app",
    "tendance",
    "génération",
    "jeune",
    "social",
    "nuit",
    "brunch",
    "rooftop",
    "terrasse",
    "quartier",
    "arrondissement",
  ];

  return topics.filter((t) => {
    const text = (t.title || "").toLowerCase();
    return relevanceKeywords.some((kw) => text.includes(kw));
  });
}

/**
 * Construit le brief final pour la génération d'article
 */
async function buildArticleBrief() {
  console.log("\n🔍 Recherche de sujets tendance...\n");

  // 1. Fetch RSS trends
  const rssTopics = await fetchRSSTopics();
  const relevantTrends = filterRelevantTrends(rssTopics);

  // 2. Pick keyword angle
  const keywordAngle = pickKeywordAngle();

  // 3. Construire le brief
  const brief = {
    timestamp: new Date().toISOString(),
    keywordAngle,
    trendingContext: relevantTrends.slice(0, 3),
    hasRealTrend: relevantTrends.length > 0,
  };

  // Si on a une vraie tendance, on l'utilise comme angle principal
  if (brief.hasRealTrend) {
    brief.articleAngle = `Article buzz basé sur l'actualité: "${relevantTrends[0].title}" — angle ${keywordAngle.category} avec focus sur ${keywordAngle.primaryKeyword}`;
  } else {
    brief.articleAngle = `Article SEO evergreen: ${keywordAngle.primaryKeyword} — catégorie ${keywordAngle.category}, keyword secondaire: ${keywordAngle.secondaryKeyword}`;
  }

  console.log("\n📋 Brief généré:");
  console.log(`   Angle: ${brief.articleAngle}`);
  console.log(`   Catégorie: ${keywordAngle.category}`);
  console.log(`   Keywords: ${keywordAngle.allKeywords.join(", ")}`);
  console.log(`   Tendances trouvées: ${relevantTrends.length}`);

  return brief;
}

module.exports = { buildArticleBrief, fetchRSSTopics, pickKeywordAngle };

// Exécution directe
if (require.main === module) {
  buildArticleBrief()
    .then((brief) => console.log("\n✅ Brief prêt:", JSON.stringify(brief, null, 2)))
    .catch(console.error);
}
