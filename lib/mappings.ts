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
    h1Template: 'Top {count} sorties culturelles pour un date a {city}',
    metaTemplate:
      'Decouvrez {count} idees de sorties culturelles pour un date inoubliable a {city}. Musees, expos, spectacles : les meilleurs plans selectionnes.',
    emoji: '\uD83C\uDFAD',
  },
  gastronomie: {
    slug: 'restaurants-date',
    titleFR: 'Restaurants',
    h1Template: 'Top {count} restaurants pour un date a {city}',
    metaTemplate:
      'Les {count} meilleurs restaurants pour un date a {city}. Cuisine locale, gastronomie, ambiance romantique : notre selection.',
    emoji: '\uD83C\uDF7D\uFE0F',
  },
  'vie-locale': {
    slug: 'bars-ambiance-date',
    titleFR: 'Bars & ambiance',
    h1Template: 'Top {count} bars et spots ambiance pour un date a {city}',
    metaTemplate:
      'Decouvrez {count} bars et lieux d\'ambiance pour un date reussi a {city}. Vie locale, terrasses, ambiance authentique.',
    emoji: '\uD83C\uDF7A',
  },
  nightlife: {
    slug: 'bars-cocktails-date',
    titleFR: 'Bars & cocktails',
    h1Template: 'Top {count} bars a cocktails pour un date a {city}',
    metaTemplate:
      '{count} bars a cocktails et spots nightlife pour un date a {city}. Speakeasy, rooftops, ambiance tamisee.',
    emoji: '\uD83C\uDF78',
  },
  nature: {
    slug: 'balades-romantiques',
    titleFR: 'Balades romantiques',
    h1Template: 'Top {count} balades romantiques pour un date a {city}',
    metaTemplate:
      '{count} idees de balades romantiques a {city}. Parcs, jardins, bords de l\'eau : les plus beaux itineraires en amoureux.',
    emoji: '\uD83C\uDF3F',
  },
  insolite: {
    slug: 'sorties-insolites-date',
    titleFR: 'Sorties insolites',
    h1Template: 'Top {count} sorties insolites pour un date a {city}',
    metaTemplate:
      '{count} idees de sorties insolites et originales pour un date a {city}. Surprenez votre moitie avec des lieux hors du commun.',
    emoji: '\uD83E\uDE84',
  },
  romantique: {
    slug: 'lieux-romantiques',
    titleFR: 'Lieux romantiques',
    h1Template: 'Top {count} lieux romantiques pour un date a {city}',
    metaTemplate:
      'Les {count} lieux les plus romantiques de {city} pour un date. Restaurants intimes, vues panoramiques, spots secrets.',
    emoji: '\u2764\uFE0F',
  },
  shopping: {
    slug: 'shopping-date',
    titleFR: 'Shopping',
    h1Template: 'Top {count} spots shopping pour un date a {city}',
    metaTemplate:
      '{count} idees shopping pour un date fun a {city}. Marches, boutiques, concept stores : faites du shopping a deux.',
    emoji: '\uD83D\uDECD\uFE0F',
  },
  'bien-etre': {
    slug: 'bien-etre-couple',
    titleFR: 'Bien-etre en couple',
    h1Template: 'Top {count} experiences bien-etre pour un date a {city}',
    metaTemplate:
      '{count} experiences bien-etre et detente pour un date a {city}. Spas, hammams, massages duo : prenez soin de vous a deux.',
    emoji: '\uD83E\uDDD6',
  },
  cafe: {
    slug: 'cafes-date',
    titleFR: 'Cafes',
    h1Template: 'Top {count} cafes pour un date a {city}',
    metaTemplate:
      'Les {count} meilleurs cafes pour un premier date a {city}. Ambiance cosy, bon cafe, spots Instagram : notre selection.',
    emoji: '\u2615',
  },
  famille: {
    slug: 'activites-date',
    titleFR: 'Activites',
    h1Template: 'Top {count} activites pour un date a {city}',
    metaTemplate:
      '{count} idees d\'activites pour un date original a {city}. Sorties ludiques, ateliers, experiences a partager a deux.',
    emoji: '\uD83C\uDFAF',
  },
  sport: {
    slug: 'activites-sportives-date',
    titleFR: 'Activites sportives',
    h1Template: 'Top {count} activites sportives pour un date a {city}',
    metaTemplate:
      '{count} activites sportives pour un date dynamique a {city}. Escalade, velo, yoga, paddle : bougez ensemble.',
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
    country: 'Thailande',
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
    country: 'Republique tcheque',
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
    country: 'Grece',
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
    country: 'Coree du Sud',
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
    country: 'Suede',
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
    country: 'Bresil',
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
