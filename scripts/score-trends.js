// scripts/score-trends.js
// DeepSeek analyse les trends et choisit le meilleur angle article

const OpenAI = require("openai");
const config = require("./config");

const deepseek = new OpenAI({
  apiKey: config.deepseek.apiKey,
  baseURL: config.deepseek.baseURL,
});

/**
 * DeepSeek reçoit toutes les tendances et choisit LE meilleur sujet
 * pour un article Summer Dating
 */
async function pickBestTrend(allTrends) {
  console.log("\n🧠 DeepSeek analyse les tendances...");

  // Dédupliquer par titre similaire
  const uniqueTrends = deduplicateTrends(allTrends);

  const response = await deepseek.chat.completions.create({
    model: config.deepseek.model,
    messages: [
      {
        role: "system",
        content: `Tu es un directeur éditorial pour Summer Dating, une app de rencontres et sorties à Paris.
Tu dois choisir LE meilleur sujet parmi une liste de tendances actuelles pour écrire un article de blog SEO qui va générer du trafic.

CRITÈRES DE SÉLECTION (par ordre d'importance) :
1. PERTINENCE : Le sujet doit pouvoir être relié au dating, aux sorties, aux événements, au lifestyle parisien, ou à la vie sociale
2. BUZZ POTENTIAL : Privilégie les sujets que les gens cherchent activement
3. ANGLE ORIGINAL : On doit pouvoir écrire quelque chose d'unique, pas juste résumer l'actu
4. CTA NATUREL : Le sujet doit permettre de mentionner Summer Dating de façon organique

IMPORTANT : Même si un sujet n'est pas directement lié au dating, tu peux le relier avec un angle créatif.
Exemples :
- "Canicule à Paris" → "Les meilleurs spots climatisés pour un date à Paris"
- "Finale Roland Garros" → "Les bars où regarder Roland Garros et rencontrer du monde"
- "Grève RATP" → "Comment transformer une grève en aventure : les dates à faire à pied"
- "Festival de Cannes" → "Les soirées cinéma en plein air à Paris pour un date original"

RÉPONDS UNIQUEMENT en JSON :
{
  "selectedTrend": "Le sujet choisi",
  "source": "La source (google_trends/twitter/reddit/google_news)",
  "articleAngle": "L'angle article proposé (1 phrase)",
  "title": "Titre SEO proposé (50-65 caractères)",
  "primaryKeyword": "Le keyword SEO principal",
  "secondaryKeywords": ["keyword2", "keyword3"],
  "category": "dating|sorties|lifestyle|buzz",
  "reasoning": "Pourquoi ce sujet (1-2 phrases)"
}`,
      },
      {
        role: "user",
        content: `Voici les ${uniqueTrends.length} tendances actuelles (${new Date().toLocaleDateString("fr-FR")}) :

${uniqueTrends.map((t, i) => `${i + 1}. [${t.source}] ${t.title} ${t.volume !== "unknown" ? `(volume: ${t.volume})` : ""}`).join("\n")}

Choisis LE meilleur sujet et propose un angle article pour Summer Dating.`,
      },
    ],
    temperature: 0.7,
    max_tokens: 800,
  });

  const raw = response.choices[0].message.content.trim();
  const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const result = JSON.parse(cleaned);

  console.log(`   ✅ Sujet sélectionné : "${result.selectedTrend}"`);
  console.log(`   📐 Angle : ${result.articleAngle}`);
  console.log(`   🏷️  Keyword : ${result.primaryKeyword}`);
  console.log(`   💡 Raison : ${result.reasoning}`);

  return result;
}

/**
 * Déduplique les tendances par titre similaire
 */
function deduplicateTrends(trends) {
  const seen = new Set();
  return trends.filter((t) => {
    const key = t.title.toLowerCase().slice(0, 40);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

module.exports = { pickBestTrend };
