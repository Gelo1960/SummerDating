import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import '../lieux.css';

import {
  getAllCityCategories,
  getPlacesByCityAndCategory,
  getCategoriesForCity,
} from '@/lib/supabase';
import {
  buildPageSlug,
  parsePageSlug,
  getCityBySlug,
  getCategoryBySlug,
  CATEGORY_MAPPING,
  CITY_MAPPING,
} from '@/lib/mappings';
import { generateIntro, generateFAQ, generateTips } from '@/lib/content';

import PlaceCard from '@/components/PlaceCard';
import CTABox from '@/components/CTABox';
import FAQSection from '@/components/FAQSection';
import RelatedGuides from '@/components/RelatedGuides';
import SchemaMarkup from '@/components/SchemaMarkup';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CITY_HUB_PREFIX = 'date-a-';

function parseCityHubSlug(slug: string) {
  if (!slug.startsWith(CITY_HUB_PREFIX)) return null;
  const citySlug = slug.slice(CITY_HUB_PREFIX.length);
  return getCityBySlug(citySlug) ? citySlug : null;
}

// ---------------------------------------------------------------------------
// Static params — generate city×category slugs + city hub slugs
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const combos = await getAllCityCategories();

  // Build a reverse lookup: lowercase city name → CITY_MAPPING entry
  const cityByName = new Map<string, (typeof CITY_MAPPING)[string]>();
  for (const mapping of Object.values(CITY_MAPPING)) {
    cityByName.set(mapping.name.toLowerCase(), mapping);
  }

  const slugs = new Set<string>();

  // Category × City pages
  const categoryPages = combos
    .map(({ city, category }) => {
      const cityMapping = cityByName.get(city.toLowerCase());
      const categoryMapping = CATEGORY_MAPPING[category];

      if (!cityMapping || !categoryMapping) return null;

      const slug = buildPageSlug(categoryMapping.slug, cityMapping.slug);
      if (slugs.has(slug)) return null;
      slugs.add(slug);

      return { slug };
    })
    .filter(Boolean) as { slug: string }[];

  // City hub pages (date-a-paris, date-a-london, etc.)
  const cityHubPages = Object.values(CITY_MAPPING).map((mapping) => ({
    slug: `${CITY_HUB_PREFIX}${mapping.slug}`,
  }));

  return [...categoryPages, ...cityHubPages];
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // City hub page
  const cityHubSlug = parseCityHubSlug(slug);
  if (cityHubSlug) {
    const city = getCityBySlug(cityHubSlug);
    if (!city) return {};

    const title = `Les meilleurs lieux pour un date à ${city.name}`;
    const description = `Découvrez notre sélection des meilleurs spots pour un date à ${city.name}. Restaurants, bars, balades, sorties culturelles et plus encore.`;
    const canonicalUrl = `https://summer.dating/lieux/${slug}`;

    return {
      title,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: { title, description, url: canonicalUrl, type: 'website' },
    };
  }

  // Category × City page
  const parsed = parsePageSlug(slug);
  if (!parsed) return {};

  const city = getCityBySlug(parsed.citySlug);
  const category = getCategoryBySlug(parsed.categorySlug);
  if (!city || !category) return {};

  const places = await getPlacesByCityAndCategory(city.name, category.key);
  const count = places.length;

  const title = category.h1Template
    .replace(/\{city\}/g, city.name)
    .replace(/\{count\}/g, String(count));

  const description = category.metaTemplate
    .replace(/\{city\}/g, city.name)
    .replace(/\{count\}/g, String(count));

  const canonicalUrl = `https://summer.dating/lieux/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, type: 'article' },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

const APP_STORE_URL =
  'https://apps.apple.com/fr/app/summer-dating/id6670174638';

export default async function LieuPage({ params }: PageProps) {
  const { slug } = await params;

  // City hub page?
  const cityHubSlug = parseCityHubSlug(slug);
  if (cityHubSlug) {
    return <CityHubContent citySlug={cityHubSlug} slug={slug} />;
  }

  // Category × City page
  return <CategoryCityContent slug={slug} />;
}

// ---------------------------------------------------------------------------
// City Hub Content
// ---------------------------------------------------------------------------

async function CityHubContent({
  citySlug,
  slug,
}: {
  citySlug: string;
  slug: string;
}) {
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const categories = await getCategoriesForCity(city.name);
  if (categories.length === 0) notFound();

  const categoryPreviews = await Promise.all(
    categories.map(async ({ category: catKey, count }) => {
      const mapping = CATEGORY_MAPPING[catKey];
      if (!mapping) return null;

      const places = await getPlacesByCityAndCategory(city.name, catKey);
      const preview = places.slice(0, 3);
      const pageSlug = buildPageSlug(mapping.slug, city.slug);

      return { key: catKey, mapping, count, pageSlug, preview };
    }),
  );

  const validPreviews = categoryPreviews.filter(Boolean) as NonNullable<
    (typeof categoryPreviews)[number]
  >[];

  return (
    <div className="lieux-page">
      <Nav />

      <header className="lieux-header">
        <h1>
          Les meilleurs lieux pour un date à{' '}
          <span className="highlight">{city.name}</span>
        </h1>
      </header>

      <p className="lieux-intro">
        Explorez nos guides thématiques pour trouver le spot parfait pour votre
        prochain date à {city.name}. {categories.length} catégories, des
        dizaines de lieux sélectionnés.
      </p>

      {validPreviews.map(({ key, mapping, count, pageSlug, preview }) => (
        <section key={key} className="lieux-content" style={{ marginBottom: 56 }}>
          <div style={{ marginBottom: 8 }}>
            <h2 className="place-name" style={{ fontSize: 26 }}>
              {mapping.emoji} {mapping.titleFR}
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  opacity: 0.6,
                  marginLeft: 10,
                }}
              >
                {count} lieux
              </span>
            </h2>
          </div>

          {preview.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}

          <Link
            href={`/lieux/${pageSlug}`}
            className="related-card"
            style={{ justifyContent: 'center', fontWeight: 700 }}
          >
            Voir les {count} {mapping.titleFR.toLowerCase()} &rarr;
          </Link>
        </section>
      ))}

      <CTABox />
      <Footer />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Category × City Content
// ---------------------------------------------------------------------------

async function CategoryCityContent({ slug }: { slug: string }) {
  const parsed = parsePageSlug(slug);
  if (!parsed) notFound();

  const city = getCityBySlug(parsed.citySlug);
  const category = getCategoryBySlug(parsed.categorySlug);
  if (!city || !category) notFound();

  const places = await getPlacesByCityAndCategory(city.name, category.key);
  if (places.length === 0) notFound();

  const count = places.length;

  const intro = generateIntro(category.key, city.name, count);
  const faqs = generateFAQ(category.key, city.name);
  const tips = generateTips(category.key);

  const h1 = category.h1Template
    .replace(/\{city\}/g, city.name)
    .replace(/\{count\}/g, String(count));

  const metaDescription = category.metaTemplate
    .replace(/\{city\}/g, city.name)
    .replace(/\{count\}/g, String(count));

  const canonicalUrl = `https://summer.dating/lieux/${slug}`;

  const categoriesForCity = await getCategoriesForCity(city.name);

  const allCategories = categoriesForCity
    .map(({ category: catKey }) => {
      const mapping = CATEGORY_MAPPING[catKey];
      if (!mapping) return null;
      return { slug: mapping.slug, name: mapping.titleFR, emoji: mapping.emoji };
    })
    .filter(Boolean) as { slug: string; name: string; emoji: string }[];

  const allCities = Object.values(CITY_MAPPING).map((c) => ({
    slug: c.slug,
    name: c.name,
  }));

  return (
    <div className="lieux-page">
      <Nav />

      <header className="lieux-header">
        <h1>{h1}</h1>
      </header>

      <p className="lieux-intro">{intro}</p>

      <section className="lieux-content">
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </section>

      <section className="lieux-content" style={{ marginTop: 48 }}>
        <div className="place-card">
          <h2 className="place-name">Nos conseils</h2>
          <p className="place-description">{tips}</p>
        </div>
      </section>

      <CTABox />

      <RelatedGuides
        currentCitySlug={city.slug}
        currentCategorySlug={category.slug}
        allCategories={allCategories}
        allCities={allCities}
      />

      <FAQSection
        faqs={faqs}
        city={city.name}
        category={category.titleFR}
      />

      <SchemaMarkup
        title={h1}
        description={metaDescription}
        url={canonicalUrl}
        places={places.map((p) => ({
          name: p.name,
          address: p.address ?? undefined,
          lat: p.lat,
          lng: p.lng,
        }))}
      />

      <Footer />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared components
// ---------------------------------------------------------------------------

function Nav() {
  return (
    <nav className="lieux-nav">
      <Link href="/" className="nav-logo">
        <img
          src="/ee39fd9e-4cae-44ca-91f7-a91f053f9abf.png"
          alt="Summer Dating"
          className="nav-logo-img"
        />
      </Link>
      <div className="nav-links">
        <Link href="/lieux" className="nav-link">
          Guides
        </Link>
        <Link href="/blog" className="nav-link">
          Blog
        </Link>
        <a
          href={APP_STORE_URL}
          className="nav-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Télécharger
        </a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="lieux-footer">
      <div className="footer-wrapper">
        <ul className="lieux-footer-links">
          <li>
            <Link href="/">Accueil</Link>
          </li>
          <li>
            <Link href="/lieux">Guides</Link>
          </li>
          <li>
            <Link href="/privacy-policy">Confidentialité</Link>
          </li>
          <li>
            <Link href="/terms-of-service">CGU</Link>
          </li>
          <li>
            <Link href="/support">Support</Link>
          </li>
        </ul>
        <p className="lieux-footer-copy">
          &copy; {new Date().getFullYear()} Summer Dating. Tous droits
          réservés.
        </p>
      </div>
    </footer>
  );
}
