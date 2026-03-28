// scripts/build-index.js
// Génère la page d'index du blog (listing de tous les articles)

const fs = require("fs");
const path = require("path");
const config = require("./config");

function buildBlogIndex() {
  const blogDir = path.join(__dirname, "..", config.publishing.outputDir);
  const metaPath = path.join(blogDir, "articles.json");

  if (!fs.existsSync(metaPath)) {
    console.log("⚠️  Pas encore d'articles publiés");
    return;
  }

  const articles = JSON.parse(fs.readFileSync(metaPath, "utf-8"));

  const articleCards = articles
    .map(
      (a) => `
        <a href="/blog/${a.slug}.html" class="article-card">
          <div class="card-category">${a.category || "lifestyle"}</div>
          <h2>${a.title}</h2>
          <p>${a.metaDescription || ""}</p>
          <div class="card-meta">
            <span class="card-date">${a.dateDisplay}</span>
            <span class="card-tags">${(a.tags || []).slice(0, 3).map((t) => `#${t}`).join(" ")}</span>
          </div>
        </a>`
    )
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog — Summer Dating | Sorties, Dating & Lifestyle à Paris</title>
  <meta name="description" content="Découvrez nos articles sur les sorties, le dating et le lifestyle parisien. Tips, tendances et bons plans pour transformer chaque sortie en aventure.">
  <link rel="canonical" href="https://summer-dating.vercel.app/blog/">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,700;1,500&display=swap');

    :root {
      --primary: #6366F1;
      --primary-light: #818CF8;
      --primary-dark: #4F46E5;
      --bg: #0A0A0F;
      --bg-card: rgba(255,255,255,0.04);
      --bg-card-hover: rgba(255,255,255,0.08);
      --text: #E8E8ED;
      --text-muted: #9CA3AF;
      --text-dim: #6B7280;
      --border: rgba(255,255,255,0.08);
      --radius: 16px;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Outfit', sans-serif;
      background: var(--bg);
      color: var(--text);
      -webkit-font-smoothing: antialiased;
    }
    nav {
      position: fixed; top: 0; width: 100%; z-index: 100;
      padding: 1rem 2rem;
      background: rgba(10,10,15,0.85);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      display: flex; justify-content: space-between; align-items: center;
    }
    nav .logo {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem; font-weight: 700;
      color: var(--text); text-decoration: none;
    }
    nav .logo span { color: var(--primary-light); }
    nav .nav-links { display: flex; gap: 1.5rem; align-items: center; }
    nav .nav-links a {
      color: var(--text-muted); text-decoration: none;
      font-size: 0.9rem; transition: color 0.2s;
    }
    nav .nav-links a:hover { color: var(--text); }
    .cta-nav {
      background: var(--primary) !important; color: white !important;
      padding: 0.5rem 1.2rem; border-radius: 100px; font-weight: 500 !important;
    }

    .blog-header {
      max-width: 900px; margin: 0 auto;
      padding: 8rem 2rem 3rem; text-align: center;
    }
    .blog-header h1 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.5rem, 5vw, 3.5rem);
      font-weight: 700; color: white;
      margin-bottom: 1rem;
    }
    .blog-header p {
      color: var(--text-muted); font-size: 1.1rem;
      max-width: 600px; margin: 0 auto;
    }

    .articles-grid {
      max-width: 900px; margin: 0 auto;
      padding: 0 2rem 4rem;
      display: grid; gap: 1.5rem;
    }
    .article-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 2rem;
      text-decoration: none; color: var(--text);
      transition: background 0.3s, border-color 0.3s, transform 0.2s;
    }
    .article-card:hover {
      background: var(--bg-card-hover);
      border-color: rgba(99,102,241,0.3);
      transform: translateY(-2px);
    }
    .card-category {
      display: inline-block;
      background: var(--primary); color: white;
      padding: 0.2rem 0.7rem; border-radius: 100px;
      font-size: 0.72rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.05em;
      margin-bottom: 1rem;
    }
    .article-card h2 {
      font-family: 'Playfair Display', serif;
      font-size: 1.4rem; font-weight: 600;
      color: white; margin-bottom: 0.6rem; line-height: 1.3;
    }
    .article-card p {
      color: var(--text-muted); font-size: 0.92rem;
      line-height: 1.6; margin-bottom: 1rem;
    }
    .card-meta {
      display: flex; justify-content: space-between;
      align-items: center; flex-wrap: wrap; gap: 0.5rem;
    }
    .card-date { color: var(--text-dim); font-size: 0.82rem; }
    .card-tags { color: var(--primary-light); font-size: 0.82rem; }

    .empty-state {
      text-align: center; padding: 4rem 2rem;
      color: var(--text-dim);
    }

    footer {
      text-align: center; padding: 3rem 2rem;
      color: var(--text-dim); font-size: 0.85rem;
      border-top: 1px solid var(--border);
    }
    footer a { color: var(--primary-light); text-decoration: none; }

    @media (max-width: 640px) {
      .blog-header { padding: 6rem 1.2rem 2rem; }
      .articles-grid { padding: 0 1.2rem 3rem; }
      .article-card { padding: 1.5rem; }
    }
  </style>
</head>
<body>

  <nav>
    <a href="https://summer-dating.vercel.app" class="logo">Summer<span>Dating</span></a>
    <div class="nav-links">
      <a href="https://summer-dating.vercel.app">Accueil</a>
      <a href="https://summer-dating.vercel.app/blog/">Blog</a>
      <a href="${config.site.appStoreUrl}" class="cta-nav">Télécharger</a>
    </div>
  </nav>

  <header class="blog-header">
    <h1>Le Blog</h1>
    <p>Tendances dating, meilleurs spots parisiens et lifestyle — tout pour transformer tes sorties en aventures.</p>
  </header>

  <section class="articles-grid">
    ${articles.length > 0 ? articleCards : '<div class="empty-state"><p>Les premiers articles arrivent bientôt !</p></div>'}
  </section>

  <footer>
    <p>&copy; ${new Date().getFullYear()} Summer Dating — <a href="https://summer-dating.vercel.app">summer.dating</a></p>
  </footer>

</body>
</html>`;

  const indexPath = path.join(blogDir, "index.html");
  fs.writeFileSync(indexPath, html, "utf-8");
  console.log(`\n📚 Blog index généré : ${indexPath} (${articles.length} articles)`);
}

module.exports = { buildBlogIndex };

if (require.main === module) {
  buildBlogIndex();
}
