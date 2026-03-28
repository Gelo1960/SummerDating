// scripts/publish.js
// Convertit l'article JSON en page HTML et met à jour le sitemap

const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
const dayjs = require("dayjs");
require("dayjs/locale/fr");
const config = require("./config");

dayjs.locale("fr");

/**
 * Convertit du markdown basique en HTML
 */
function markdownToHtml(md) {
  if (!md) return "";
  return (
    md
      // Bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      // Unordered lists
      .replace(/^[-•] (.+)$/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
      // Paragraphs (lignes non-vides qui ne sont pas déjà du HTML)
      .split("\n\n")
      .map((block) => {
        block = block.trim();
        if (!block) return "";
        if (block.startsWith("<ul>") || block.startsWith("<ol>") || block.startsWith("<li>"))
          return block;
        if (block.startsWith("<")) return block;
        return `<p>${block.replace(/\n/g, "<br>")}</p>`;
      })
      .join("\n")
  );
}

/**
 * Génère le HTML d'un article depuis le JSON
 */
function buildArticleHtml(article) {
  const templatePath = path.join(__dirname, "..", "templates", "article.html");
  let template = fs.readFileSync(templatePath, "utf-8");

  const now = dayjs();
  const slug =
    article.slug ||
    slugify(article.title, { lower: true, strict: true, locale: "fr" });

  // Construire le body HTML depuis les sections
  let bodyHtml = "";
  for (const section of article.sections) {
    bodyHtml += `<h2>${section.heading}</h2>\n`;
    bodyHtml += markdownToHtml(section.content) + "\n";
  }

  // Ajouter la conclusion
  if (article.conclusion) {
    bodyHtml += markdownToHtml(article.conclusion);
  }

  // Tags HTML
  const tagsHtml = (article.tags || [])
    .map((tag) => `<span class="tag">#${tag}</span>`)
    .join("\n      ");

  // Remplacements dans le template
  const replacements = {
    "{{TITLE}}": article.title,
    "{{META_DESCRIPTION}}": article.metaDescription || "",
    "{{SLUG}}": slug,
    "{{CATEGORY}}": article.category || "lifestyle",
    "{{DATE_ISO}}": now.toISOString(),
    "{{DATE_DISPLAY}}": now.format("D MMMM YYYY"),
    "{{INTRO}}": markdownToHtml(article.intro),
    "{{BODY}}": bodyHtml,
    "{{TAGS}}": (article.tags || []).join(", "),
    "{{TAGS_HTML}}": tagsHtml,
    "{{APP_STORE_URL}}": config.site.appStoreUrl,
    "{{YEAR}}": now.year().toString(),
  };

  for (const [key, value] of Object.entries(replacements)) {
    template = template.replaceAll(key, value);
  }

  return { html: template, slug, date: now };
}

/**
 * Écrit l'article HTML sur le disque
 */
function writeArticle(article) {
  const { html, slug, date } = buildArticleHtml(article);
  const outputDir = path.join(__dirname, "..", config.publishing.outputDir);

  // Créer le dossier blog si nécessaire
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, `${slug}.html`);
  fs.writeFileSync(filePath, html, "utf-8");

  console.log(`\n📄 Article publié : ${filePath}`);

  // Sauvegarder les métadonnées pour l'index
  const metaPath = path.join(outputDir, "articles.json");
  let articles = [];
  if (fs.existsSync(metaPath)) {
    articles = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
  }

  articles.unshift({
    title: article.title,
    slug,
    metaDescription: article.metaDescription,
    category: article.category,
    tags: article.tags,
    date: date.toISOString(),
    dateDisplay: date.format("D MMMM YYYY"),
  });

  fs.writeFileSync(metaPath, JSON.stringify(articles, null, 2), "utf-8");
  console.log(`📑 Index mis à jour : ${articles.length} articles`);

  // Générer le sitemap
  generateSitemap(articles);

  return { filePath, slug, date };
}

/**
 * Génère le sitemap XML du blog
 */
function generateSitemap(articles) {
  const urls = [
    {
      loc: config.site.url,
      priority: "1.0",
      changefreq: "weekly",
    },
    {
      loc: `${config.site.url}/blog/`,
      priority: "0.9",
      changefreq: "daily",
    },
    ...articles.map((a) => ({
      loc: `${config.site.url}/blog/${a.slug}.html`,
      lastmod: a.date,
      priority: "0.8",
      changefreq: "monthly",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod.split("T")[0]}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  const sitemapPath = path.join(__dirname, "..", "sitemap.xml");
  fs.writeFileSync(sitemapPath, xml, "utf-8");
  console.log("🗺️  Sitemap mis à jour");
}

module.exports = { writeArticle, buildArticleHtml };
