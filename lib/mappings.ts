// ---------------------------------------------------------------------------
// SEO Mappings — Categories & Cities
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Category mapping
// ---------------------------------------------------------------------------

export interface CategoryMapping {
  slug: string;
  titleFR: string;
  h1Template: string;
  metaTemplate: string;
  emoji: string;
}

export const CATEGORY_MAPPING: Record<string, CategoryMapping> = {
  culture: {
    slug: 'sorties-culturelles-date',
    titleFR: 'Sorties culturelles',
    h1Template: 'Top {count} sorties culturelles pour un date à {city}',
    metaTemplate:
      'Découvrez {count} idées de sorties culturelles pour un date inoubliable à {city}. Musées, expos, spectacles : les meilleurs plans sélectionnés.',
    emoji: '\uD83C\uDFAD',
  },
  gastronomie: {
    slug: 'restaurants-date',
    titleFR: 'Restaurants',
    h1Template: 'Top {count} restaurants pour un date à {city}',
    metaTemplate:
      'Les {count} meilleurs restaurants pour un date à {city}. Cuisine locale, gastronomie, ambiance romantique : notre sélection.',
    emoji: '\uD83C\uDF7D\uFE0F',
  },
  'vie-locale': {
    slug: 'bars-ambiance-date',
    titleFR: 'Bars & ambiance',
    h1Template: 'Top {count} bars et spots ambiance pour un date à {city}',
    metaTemplate:
      'Découvrez {count} bars et lieux d\'ambiance pour un date réussi à {city}. Vie locale, terrasses, ambiance authentique.',
    emoji: '\uD83C\uDF7A',
  },
  nightlife: {
    slug: 'bars-cocktails-date',
    titleFR: 'Bars & cocktails',
    h1Template: 'Top {count} bars à cocktails pour un date à {city}',
    metaTemplate:
      '{count} bars à cocktails et spots nightlife pour un date à {city}. Speakeasy, rooftops, ambiance tamisée.',
    emoji: '\uD83C\uDF78',
  },
  nature: {
    slug: 'balades-romantiques',
    titleFR: 'Balades romantiques',
    h1Template: 'Top {count} balades romantiques pour un date à {city}',
    metaTemplate:
      '{count} idées de balades romantiques à {city}. Parcs, jardins, bords de l\'eau : les plus beaux itinéraires en amoureux.',
    emoji: '\uD83C\uDF3F',
  },
  insolite: {
    slug: 'sorties-insolites-date',
    titleFR: 'Sorties insolites',
    h1Template: 'Top {count} sorties insolites pour un date à {city}',
    metaTemplate:
      '{count} idées de sorties insolites et originales pour un date à {city}. Surprenez votre moitié avec des lieux hors du commun.',
    emoji: '\uD83E\uDE84',
  },
  romantique: {
    slug: 'lieux-romantiques',
    titleFR: 'Lieux romantiques',
    h1Template: 'Top {count} lieux romantiques pour un date à {city}',
    metaTemplate:
      'Les {count} lieux les plus romantiques de {city} pour un date. Restaurants intimes, vues panoramiques, spots secrets.',
    emoji: '\u2764\uFE0F',
  },
  shopping: {
    slug: 'shopping-date',
    titleFR: 'Shopping',
    h1Template: 'Top {count} spots shopping pour un date à {city}',
    metaTemplate:
      '{count} idées shopping pour un date fun à {city}. Marchés, boutiques, concept stores : faites du shopping à deux.',
    emoji: '\uD83D\uDECD\uFE0F',
  },
  'bien-etre': {
    slug: 'bien-etre-couple',
    titleFR: 'Bien-être en couple',
    h1Template: 'Top {count} expériences bien-être pour un date à {city}',
    metaTemplate:
      '{count} expériences bien-être et détente pour un date à {city}. Spas, hammams, massages duo : prenez soin de vous à deux.',
    emoji: '\uD83E\uDDD6',
  },
  cafe: {
    slug: 'cafes-date',
    titleFR: 'Cafés',
    h1Template: 'Top {count} cafés pour un date à {city}',
    metaTemplate:
      'Les {count} meilleurs cafés pour un premier date à {city}. Ambiance cosy, bon café, spots Instagram : notre sélection.',
    emoji: '\u2615',
  },
  famille: {
    slug: 'activites-date',
    titleFR: 'Activités',
    h1Template: 'Top {count} activités pour un date à {city}',
    metaTemplate:
      '{count} idées d\'activités pour un date original à {city}. Sorties ludiques, ateliers, expériences à partager à deux.',
    emoji: '\uD83C\uDFAF',
  },
  sport: {
    slug: 'activites-sportives-date',
    titleFR: 'Activités sportives',
    h1Template: 'Top {count} activités sportives pour un date à {city}',
    metaTemplate:
      '{count} activités sportives pour un date dynamique à {city}. Escalade, vélo, yoga, paddle : bougez ensemble.',
    emoji: '\uD83C\uDFC4',
  },
};

// ---------------------------------------------------------------------------
// City mapping
// ---------------------------------------------------------------------------

export interface CityMapping {
  name: string;
  country: string;
  lang: string;
  slug: string;
}

export const CITY_MAPPING: Record<string, CityMapping> = {
  paris: {
    name: 'Paris',
    country: 'France',
    lang: 'fr',
    slug: 'paris',
  },
  'new york': {
    name: 'New York',
    country: 'USA',
    lang: 'en',
    slug: 'new-york',
  },
  barcelona: {
    name: 'Barcelona',
    country: 'Espagne',
    lang: 'es',
    slug: 'barcelona',
  },
  tokyo: {
    name: 'Tokyo',
    country: 'Japon',
    lang: 'ja',
    slug: 'tokyo',
  },
  lisbon: {
    name: 'Lisbon',
    country: 'Portugal',
    lang: 'pt',
    slug: 'lisbon',
  },
  london: {
    name: 'London',
    country: 'Royaume-Uni',
    lang: 'en',
    slug: 'london',
  },
  amsterdam: {
    name: 'Amsterdam',
    country: 'Pays-Bas',
    lang: 'nl',
    slug: 'amsterdam',
  },
  bangkok: {
    name: 'Bangkok',
    country: 'Thaïlande',
    lang: 'th',
    slug: 'bangkok',
  },
  istanbul: {
    name: 'Istanbul',
    country: 'Turquie',
    lang: 'tr',
    slug: 'istanbul',
  },
  rome: {
    name: 'Rome',
    country: 'Italie',
    lang: 'it',
    slug: 'rome',
  },
  marseille: {
    name: 'Marseille',
    country: 'France',
    lang: 'fr',
    slug: 'marseille',
  },
  marrakech: {
    name: 'Marrakech',
    country: 'Maroc',
    lang: 'ar',
    slug: 'marrakech',
  },
  prague: {
    name: 'Prague',
    country: 'République tchèque',
    lang: 'cs',
    slug: 'prague',
  },
  vienna: {
    name: 'Vienna',
    country: 'Autriche',
    lang: 'de',
    slug: 'vienna',
  },
  athens: {
    name: 'Athens',
    country: 'Grèce',
    lang: 'el',
    slug: 'athens',
  },
  florence: {
    name: 'Florence',
    country: 'Italie',
    lang: 'it',
    slug: 'florence',
  },
  sydney: {
    name: 'Sydney',
    country: 'Australie',
    lang: 'en',
    slug: 'sydney',
  },
  edinburgh: {
    name: 'Edinburgh',
    country: 'Royaume-Uni',
    lang: 'en',
    slug: 'edinburgh',
  },
  berlin: {
    name: 'Berlin',
    country: 'Allemagne',
    lang: 'de',
    slug: 'berlin',
  },
  nice: {
    name: 'Nice',
    country: 'France',
    lang: 'fr',
    slug: 'nice',
  },
  'san francisco': {
    name: 'San Francisco',
    country: 'USA',
    lang: 'en',
    slug: 'san-francisco',
  },
  'buenos aires': {
    name: 'Buenos Aires',
    country: 'Argentine',
    lang: 'es',
    slug: 'buenos-aires',
  },
  lyon: {
    name: 'Lyon',
    country: 'France',
    lang: 'fr',
    slug: 'lyon',
  },
  singapore: {
    name: 'Singapore',
    country: 'Singapour',
    lang: 'en',
    slug: 'singapore',
  },
  seoul: {
    name: 'Seoul',
    country: 'Corée du Sud',
    lang: 'ko',
    slug: 'seoul',
  },
  chicago: {
    name: 'Chicago',
    country: 'USA',
    lang: 'en',
    slug: 'chicago',
  },
  melbourne: {
    name: 'Melbourne',
    country: 'Australie',
    lang: 'en',
    slug: 'melbourne',
  },
  copenhagen: {
    name: 'Copenhagen',
    country: 'Danemark',
    lang: 'da',
    slug: 'copenhagen',
  },
  stockholm: {
    name: 'Stockholm',
    country: 'Suède',
    lang: 'sv',
    slug: 'stockholm',
  },
  'mexico city': {
    name: 'Mexico City',
    country: 'Mexique',
    lang: 'es',
    slug: 'mexico-city',
  },
  milan: {
    name: 'Milan',
    country: 'Italie',
    lang: 'it',
    slug: 'milan',
  },
  'rio de janeiro': {
    name: 'Rio de Janeiro',
    country: 'Brésil',
    lang: 'pt',
    slug: 'rio-de-janeiro',
  },
};

// ---------------------------------------------------------------------------
// Reverse-lookup indexes (built once at import time)
// ---------------------------------------------------------------------------

const categoriesBySlug = new Map<string, CategoryMapping & { key: string }>();
for (const [key, mapping] of Object.entries(CATEGORY_MAPPING)) {
  categoriesBySlug.set(mapping.slug, { ...mapping, key });
}

const citiesBySlug = new Map<string, CityMapping>();
for (const mapping of Object.values(CITY_MAPPING)) {
  citiesBySlug.set(mapping.slug, mapping);
}

// ---------------------------------------------------------------------------
// URL helpers
// ---------------------------------------------------------------------------

/**
 * Build a page URL slug from the category and city slugs.
 * Example: buildPageSlug('restaurants-date', 'paris') → 'restaurants-date-paris'
 */
export function buildPageSlug(categorySlug: string, citySlug: string): string {
  return `${categorySlug}-${citySlug}`;
}

/**
 * Parse a combined page slug back into its category and city parts.
 * We try matching known category slugs from longest to shortest to avoid
 * ambiguity (e.g. "bars-ambiance-date" must not be split at the first dash).
 */
export function parsePageSlug(
  slug: string,
): { categorySlug: string; citySlug: string } | null {
  // Sort category slugs longest-first so greedy match works
  const sortedCategorySlugs = Array.from(categoriesBySlug.keys()).sort(
    (a, b) => b.length - a.length,
  );

  for (const catSlug of sortedCategorySlugs) {
    const prefix = `${catSlug}-`;
    if (slug.startsWith(prefix)) {
      const citySlug = slug.slice(prefix.length);
      if (citySlug && citiesBySlug.has(citySlug)) {
        return { categorySlug: catSlug, citySlug };
      }
    }
  }

  return null;
}

/**
 * Look up a city mapping by its URL slug.
 */
export function getCityBySlug(slug: string): CityMapping | undefined {
  return citiesBySlug.get(slug);
}

/**
 * Look up a category mapping by its URL slug.
 * Returns the mapping plus the internal `key` (e.g. "gastronomie").
 */
export function getCategoryBySlug(
  slug: string,
): (CategoryMapping & { key: string }) | undefined {
  return categoriesBySlug.get(slug);
}
