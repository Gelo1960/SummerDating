import fs from 'fs';
import path from 'path';

export interface Article {
  title: string;
  slug: string;
  metaDescription: string;
  category: string;
  tags: string[];
  date: string;
  dateDisplay: string;
}

export interface ArticleContent extends Article {
  intro: string;
  bodyHtml: string;
}

const BLOG_DIR = path.join(process.cwd(), 'blog');

function extractDivContent(html: string, className: string): string {
  const openTag = `<div class="${className}">`;
  const startIdx = html.indexOf(openTag);
  if (startIdx === -1) return '';

  const contentStart = startIdx + openTag.length;
  let depth = 1;
  let i = contentStart;

  while (i < html.length && depth > 0) {
    if (html.startsWith('<div', i)) {
      const nextChar = html[i + 4];
      if (nextChar === ' ' || nextChar === '>' || nextChar === '\n') {
        depth++;
      }
    } else if (html.startsWith('</div>', i)) {
      depth--;
      if (depth === 0) {
        return html.substring(contentStart, i).trim();
      }
    }
    i++;
  }

  return '';
}

export function getArticles(): Article[] {
  const metaPath = path.join(BLOG_DIR, 'articles.json');
  if (!fs.existsSync(metaPath)) return [];
  const articles: Article[] = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticleContent(slug: string): ArticleContent | null {
  const articles = getArticles();
  const article = articles.find((a) => a.slug === slug);

  const htmlPath = path.join(BLOG_DIR, `${slug}.html`);
  if (!fs.existsSync(htmlPath)) return null;

  const html = fs.readFileSync(htmlPath, 'utf-8');

  const intro = extractDivContent(html, 'article-intro');
  const bodyHtml = extractDivContent(html, 'article-body');

  if (!article) {
    const titleMatch = html.match(/<h1>([\s\S]*?)<\/h1>/);
    const title = titleMatch ? titleMatch[1].trim() : slug;

    const descMatch = html.match(/<meta name="description" content="(.*?)">/);
    const metaDescription = descMatch ? descMatch[1] : '';

    const categoryMatch = html.match(
      /<span class="article-category">(.*?)<\/span>/
    );
    const category = categoryMatch ? categoryMatch[1] : '';

    const dateMatch = html.match(/<span class="article-date">(.*?)<\/span>/);
    const dateDisplay = dateMatch ? dateMatch[1] : '';

    const datePublishedMatch = html.match(/"datePublished":\s*"(.*?)"/);
    const date = datePublishedMatch ? datePublishedMatch[1] : '';

    const tagsMatch = html.match(/<span class="tag">(.*?)<\/span>/g);
    const tags = tagsMatch
      ? tagsMatch.map((t) => t.replace(/<\/?span[^>]*>/g, ''))
      : [];

    return {
      title,
      slug,
      metaDescription,
      category,
      tags,
      date,
      dateDisplay,
      intro,
      bodyHtml,
    };
  }

  return { ...article, intro, bodyHtml };
}

export function getAllSlugs(): string[] {
  const fromJson = getArticles().map((a) => a.slug);

  let fromFiles: string[] = [];
  if (fs.existsSync(BLOG_DIR)) {
    fromFiles = fs
      .readdirSync(BLOG_DIR)
      .filter((f) => f.endsWith('.html') && f !== 'index.html')
      .map((f) => f.replace('.html', ''));
  }

  return [...new Set([...fromJson, ...fromFiles])];
}
