import { MetadataRoute } from 'next';
import { getAllCityCategories } from '@/lib/supabase';
import { CATEGORY_MAPPING, CITY_MAPPING, buildPageSlug } from '@/lib/mappings';
import * as fs from 'fs';
import * as path from 'path';

// Re-generate the sitemap at most once per hour. The data comes from Supabase
// + blog/ filesystem, so we don't want it baked in at build time forever.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://summer.dating';
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/support`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.2 },
    { url: `${baseUrl}/terms-of-service`, lastModified: now, changeFrequency: 'monthly', priority: 0.2 },
    { url: `${baseUrl}/lieux`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  ];

  // City hub pages
  const cityPages: MetadataRoute.Sitemap = Object.values(CITY_MAPPING).map((city) => ({
    url: `${baseUrl}/lieux/date-a-${city.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Category x City pages from Supabase
  const combos = await getAllCityCategories();
  const lieuxPages: MetadataRoute.Sitemap = combos
    .map(({ city, category }) => {
      const citySlug = Object.values(CITY_MAPPING).find(
        (c) => c.name.toLowerCase() === city.toLowerCase()
      )?.slug;
      const catMapping = CATEGORY_MAPPING[category as keyof typeof CATEGORY_MAPPING];
      if (!citySlug || !catMapping) return null;
      return {
        url: `${baseUrl}/lieux/${buildPageSlug(catMapping.slug, citySlug)}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    })
    .filter(Boolean) as MetadataRoute.Sitemap;

  // Blog index page
  const blogIndexPage: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
  ];

  // Blog articles (from blog/articles.json + HTML files in blog/)
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const blogDir = path.join(process.cwd(), 'blog');

    // 1. Collect slugs from articles.json
    const articlesPath = path.join(blogDir, 'articles.json');
    let articleSlugs: string[] = [];
    if (fs.existsSync(articlesPath)) {
      const articles: { slug: string; date?: string }[] = JSON.parse(
        fs.readFileSync(articlesPath, 'utf-8')
      );
      articleSlugs = articles.map((a) => a.slug);
      blogPages = articles.map((a) => ({
        url: `${baseUrl}/blog/${a.slug}`,
        lastModified: a.date ? new Date(a.date) : now,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    }

    // 2. Also pick up any .html files not already in articles.json
    if (fs.existsSync(blogDir)) {
      const extraSlugs = fs
        .readdirSync(blogDir)
        .filter((f) => f.endsWith('.html') && f !== 'index.html')
        .map((f) => f.replace('.html', ''))
        .filter((s) => !articleSlugs.includes(s));

      blogPages.push(
        ...extraSlugs.map((slug) => ({
          url: `${baseUrl}/blog/${slug}`,
          lastModified: now,
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        }))
      );
    }
  } catch {
    // Blog articles not found, skip
  }

  return [...staticPages, ...cityPages, ...lieuxPages, ...blogIndexPage, ...blogPages];
}
