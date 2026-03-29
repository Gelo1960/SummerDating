// scripts/config.js
// Configuration centrale du pipeline SEO Summer Dating

module.exports = {
  // === API Keys (via env vars) ===
  deepseek: {
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com",
    model: "deepseek-chat",
  },
  // === Site ===
  site: {
    name: "Summer Dating",
    url: "https://summer.dating",
    blogPath: "/blog",
    appStoreUrl:
      "https://apps.apple.com/fr/app/summer-dating/id6753696473",
    description:
      "L'app qui transforme chaque sortie en aventure. Événements, rencontres, expériences uniques.",
  },

  // === SEO Keywords Pools ===
  // On rotate à travers ces catégories pour varier les articles
  keywordPools: {
    dating: [
      "rencontres paris 2026",
      "dating trends 2026",
      "application rencontre originale",
      "rencontrer des gens paris",
      "premier rendez-vous idées paris",
      "dating app france",
      "rencontres authentiques",
      "slow dating paris",
      "speed dating paris",
      "rencontre activité paris",
    ],
    sorties: [
      "où sortir paris ce weekend",
      "meilleurs bars paris",
      "rooftops paris été",
      "soirées insolites paris",
      "activités originales paris",
      "événements gratuits paris",
      "sorties entre amis paris",
      "afterwork paris",
      "brunch paris tendance",
      "terrasses cachées paris",
    ],
    lifestyle: [
      "vie sociale paris",
      "solitude grandes villes",
      "comment se faire des amis paris",
      "vie nocturne paris",
      "culture dating france",
      "génération z rencontres",
      "dating sans app",
      "événements culturels paris",
      "festivals paris 2026",
      "expériences immersives paris",
    ],
    buzz: [
      "tendances été 2026",
      "nouveautés paris",
      "phénomène tiktok dating",
      "hot takes rencontres",
      "red flags dating 2026",
      "green flags relation",
      "situationship 2026",
      "dating fatigue solutions",
      "ick dating culture",
      "soft launching relation",
    ],
  },

  // === Trending Topics Sources (RSS) ===
  trendSources: [
    {
      name: "Google Trends FR",
      url: "https://trends.google.fr/trending/rss?geo=FR",
      type: "trends",
    },
    {
      name: "Le Monde Culture",
      url: "https://www.lemonde.fr/culture/rss_full.xml",
      type: "news",
    },
    {
      name: "Time Out Paris",
      url: "https://www.timeout.fr/paris/rss.xml",
      type: "events",
    },
  ],

  // === Article Settings ===
  article: {
    minWords: 800,
    maxWords: 1500,
    language: "fr",
    tone: "conversationnel, engageant, jeune mais pas forcé",
    ctaFrequency: 2, // nombre de CTA Summer Dating par article
  },

  // === Publishing ===
  publishing: {
    articlesPerRun: 1, // 1 article par exécution cron
    outputDir: "blog",
  },
};
