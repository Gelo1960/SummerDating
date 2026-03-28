import { MetadataRoute } from 'next';
import { getAllCityCategories, getAllCities } from '@/lib/supabase';
import { CATEGORY_MAPPING, CITY_MAPPING, buildPageSlug } from '@/lib/mappings';
import * as fs from 'fs';
import * as path from 'path';

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

  // Blog articles (from public/blog/articles.json if exists)
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const articlesPath = path.join(process.cwd(), 'public', 'blog', 'articles.json');
    if (fs.existsSync(articlesPath)) {
      const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
      blogPages = articles.map((a: { slug: string }) => ({
        url: `${baseUrl}/blog/${a.slug}.html`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    }
  } catch {
    // Blog articles not found, skip
  }

  return [...staticPages, ...cityPages, ...lieuxPages, ...blogPages];
}
