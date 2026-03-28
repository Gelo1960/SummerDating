// scripts/generate-article.js
// Pipeline de génération : DeepSeek uniquement

const OpenAI = require("openai");
const config = require("./config");

// === DeepSeek Client (compatible OpenAI SDK) ===
const deepseek = new OpenAI({
  apiKey: config.deepseek.apiKey,
  baseURL: config.deepseek.baseURL,
});

/**
 * Génère l'article complet avec DeepSeek
 */
async function generateArticle(brief) {
  console.log("\n✍️  DeepSeek génère l'article...");

  const systemPrompt = `Tu es un rédacteur web expert en SEO francophone spécialisé dans le dating, les sorties et le lifestyle parisien.
Tu écris pour le blog de Summer Dating, une app iOS de rencontres et sorties à Paris.

RÈGLES DE RÉDACTION :
- Ton : ${config.article.tone}
- Longueur : ${config.article.minWords}-${config.article.maxWords} mots
- Structure : titre H1 accrocheur + intro captivante + 3-5 sections H2 + conclusion
- SEO : intègre naturellement les keywords dans les titres et le texte
- INTERDIT : pas de "Cher lecteur", pas de "Dans cet article nous allons", pas de ton corporate
- OBLIGATOIRE : mentionner Summer Dating de façon naturelle ${config.article.ctaFrequency} fois dans l'article
- Les mentions de Summer Dating doivent être organiques, pas des pubs forcées
- Utilise des emojis avec parcimonie (max 3-4 dans tout l'article)
- Ajoute des données chiffrées ou stats quand possible (même approximatives)
- Rédige en français naturel, comme un article de blog tendance
- STYLE : Texte vivant, percutant. Paragraphes courts (3-4 lignes max). Phrases directes.
- ACCROCHE : Le titre doit donner envie de cliquer. L'intro doit accrocher en 2 lignes max.
- Summer Dating c'est une app de sorties et rencontres à Paris. L'app propose des événements, des lieux curatés, et des aventures contextuelles.
- Le lien App Store est : ${config.site.appStoreUrl}

FORMAT DE SORTIE (JSON strict) :
{
  "title": "Titre SEO accrocheur (50-65 caractères)",
  "metaDescription": "Meta description engageante (150-160 caractères)",
  "slug": "url-slug-en-minuscules",
  "category": "dating|sorties|lifestyle|buzz",
  "tags": ["tag1", "tag2", "tag3"],
  "sections": [
    {
      "heading": "Titre H2 de la section",
      "content": "Contenu de la section en markdown (paragraphes, listes, etc.)"
    }
  ],
  "intro": "Paragraphe d'introduction captivant",
  "conclusion": "Paragraphe de conclusion avec CTA"
}`;

  const userPrompt = `Écris un article de blog pour Summer Dating basé sur ce brief :

ANGLE : ${brief.articleAngle}
KEYWORDS PRINCIPAUX : ${brief.keywordAngle.allKeywords.join(", ")}
CATÉGORIE : ${brief.keywordAngle.category}
${
  brief.hasRealTrend
    ? `ACTUALITÉ À INTÉGRER : ${brief.trendingContext.map((t) => t.title).join(" | ")}`
    : "PAS D'ACTU SPÉCIFIQUE — fais un article evergreen engageant"
}
DATE : ${new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}

Réponds UNIQUEMENT avec le JSON, sans markdown ni backticks.`;

  const response = await deepseek.chat.completions.create({
    model: config.deepseek.model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.8,
    max_tokens: 3000,
  });

  const raw = response.choices[0].message.content.trim();

  // Parse JSON (gérer les backticks potentiels)
  const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const article = JSON.parse(cleaned);

  console.log(`   ✅ Article généré : "${article.title}"`);
  console.log(`   📊 ${article.sections.length} sections`);

  return article;
}

module.exports = { generateArticle };
