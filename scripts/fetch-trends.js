// scripts/fetch-trends.js — v2 Multi-Source Trend Intelligence
// Scrape Google Trends, Twitter/X, Reddit, Google News

const Parser = require("rss-parser");
const config = require("./config");

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "SummerDating-SEO-Bot/2.0",
  },
});

// ============================
// SOURCE 1 : Google Trends FR (gratuit via RSS)
// ============================
async function fetchGoogleTrends() {
  try {
    const feed = await parser.parseURL(
      "https://trends.google.fr/trending/rss?geo=FR"
    );
    const items = feed.items.slice(0, 20).map((item) => ({
      title: item.title,
      source: "google_trends",
      volume: "high",
      link: item.link,
      date: item.pubDate,
    }));
    console.log(`   ✅ Google Trends: ${items.length} sujets`);
    return items;
  } catch (e) {
    console.warn("   ⚠️  Google Trends RSS failed:", e.message);
    return [];
  }
}

// ============================
// SOURCE 2 : Twitter/X Trending France (via Apify)
// ============================
async function fetchTwitterTrends() {
  const APIFY_TOKEN = process.env.APIFY_API_TOKEN;
  if (!APIFY_TOKEN) {
    console.warn("   ⚠️  APIFY_API_TOKEN non configuré — skip Twitter");
    return [];
  }

  try {
    const runResponse = await fetch(
      `https://api.apify.com/v2/acts/easyapi~twitter-trending-topics-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: "France",
        }),
      }
    );

    const trends = await runResponse.json();
    const items = (trends || []).slice(0, 30).map((t) => ({
      title: t.name || t.trend || t.title,
      source: "twitter",
      volume: t.tweet_volume || t.tweetVolume || "unknown",
      link: t.url || "",
      date: new Date().toISOString(),
    }));
    console.log(`   ✅ Twitter/X: ${items.length} trends`);
    return items;
  } catch (e) {
    console.warn("   ⚠️  Twitter Trends failed:", e.message);
    return [];
  }
}

// ============================
// SOURCE 3 : Reddit FR (gratuit via RSS)
// ============================
async function fetchRedditTrends() {
  const subreddits = [
    "https://www.reddit.com/r/france/hot/.rss?limit=10",
    "https://www.reddit.com/r/paris/hot/.rss?limit=10",
    "https://www.reddit.com/r/AskFrance/hot/.rss?limit=5",
  ];

  const allPosts = [];
  for (const url of subreddits) {
    try {
      const feed = await parser.parseURL(url);
      const posts = feed.items.slice(0, 5).map((item) => ({
        title: item.title,
        source: "reddit",
        volume: "medium",
        link: item.link,
        date: item.pubDate,
      }));
      allPosts.push(...posts);
    } catch (e) {
      // Silently skip failed subreddit
    }
  }
  console.log(`   ✅ Reddit: ${allPosts.length} posts`);
  return allPosts;
}

// ============================
// SOURCE 4 : Google News FR (gratuit via RSS)
// ============================
async function fetchGoogleNews() {
  const queries = [
    "paris+sorties+événements",
    "dating+rencontres+france",
    "tendances+lifestyle+paris",
  ];

  const allNews = [];
  for (const q of queries) {
    try {
      const feed = await parser.parseURL(
        `https://news.google.com/rss/search?q=${q}&hl=fr&gl=FR&ceid=FR:fr`
      );
      const items = feed.items.slice(0, 5).map((item) => ({
        title: item.title,
        source: "google_news",
        volume: "medium",
        link: item.link,
        date: item.pubDate,
      }));
      allNews.push(...items);
    } catch (e) {
      // Silently skip
    }
  }
  console.log(`   ✅ Google News: ${allNews.length} articles`);
  return allNews;
}

// ============================
// AGRÉGATION : Combiner toutes les sources
// ============================
async function fetchAllTrends() {
  console.log("\n🔍 Scraping des tendances multi-sources...\n");

  const [google, twitter, reddit, news] = await Promise.allSettled([
    fetchGoogleTrends(),
    fetchTwitterTrends(),
    fetchRedditTrends(),
    fetchGoogleNews(),
  ]);

  const allTrends = [
    ...(google.status === "fulfilled" ? google.value : []),
    ...(twitter.status === "fulfilled" ? twitter.value : []),
    ...(reddit.status === "fulfilled" ? reddit.value : []),
    ...(news.status === "fulfilled" ? news.value : []),
  ];

  console.log(`\n📊 TOTAL: ${allTrends.length} tendances récupérées`);

  return allTrends;
}

module.exports = {
  fetchAllTrends,
  fetchGoogleTrends,
  fetchTwitterTrends,
  fetchRedditTrends,
  fetchGoogleNews,
};

// Exécution directe
if (require.main === module) {
  fetchAllTrends()
    .then((trends) => {
      console.log(`\n✅ ${trends.length} tendances trouvées`);
      trends.slice(0, 10).forEach((t, i) =>
        console.log(`   ${i + 1}. [${t.source}] ${t.title}`)
      );
    })
    .catch(console.error);
}
