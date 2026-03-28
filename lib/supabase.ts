import { createClient } from '@supabase/supabase-js';

// ---------------------------------------------------------------------------
// Supabase client (server-side, used at build time in getStaticProps / generateStaticParams)
// ---------------------------------------------------------------------------

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CuratedPlace {
  id: string;
  name: string;
  slug: string | null;
  city: string;
  country: string;
  neighborhood: string | null;
  lat: number;
  lng: number;
  address: string | null;
  category: string;
  subcategory: string | null;
  tags: string[] | null;
  score_global: number | null;
  google_rating: number | null;
  why_special: string | null;
  description: string | null;
  anecdote: string | null;
  best_time: string | null;
  budget_level: string | null;
  budget_estimate: string | null;
  duration_minutes: number | null;
  good_for: string[] | null;
}

/**
 * Columns selected for place queries — avoids pulling source_*, google_place_id
 * and other internal fields that are not needed on the front-end.
 */
const PLACE_SELECT_COLUMNS = [
  'id',
  'name',
  'slug',
  'city',
  'country',
  'neighborhood',
  'lat',
  'lng',
  'address',
  'category',
  'subcategory',
  'tags',
  'score_global',
  'google_rating',
  'why_special',
  'description',
  'anecdote',
  'best_time',
  'budget_level',
  'budget_estimate',
  'duration_minutes',
  'good_for',
].join(', ');

// ---------------------------------------------------------------------------
// Data-fetching helpers
// ---------------------------------------------------------------------------

/**
 * Get all places for a given city + category combination.
 * - city: case-insensitive match (ilike)
 * - category: exact match
 * - Ordered by score_global DESC, limited to 15 results.
 */
export async function getPlacesByCityAndCategory(
  city: string,
  category: string,
): Promise<CuratedPlace[]> {
  const { data, error } = await supabase
    .from('curated_places')
    .select(PLACE_SELECT_COLUMNS)
    .ilike('city', city)
    .eq('category', category)
    .order('score_global', { ascending: false, nullsFirst: false })
    .limit(15);

  if (error) {
    console.error('[supabase] getPlacesByCityAndCategory error:', error.message);
    return [];
  }

  return (data as unknown as CuratedPlace[]) ?? [];
}

/**
 * Get all unique city + category combinations (used by generateStaticParams).
 * Returns an array of { city, category, count }.
 */
export async function getAllCityCategories(): Promise<
  { city: string; category: string; count: number }[]
> {
  // Supabase does not natively support GROUP BY via the JS client,
  // so we use an RPC call or a raw query. We fall back to fetching
  // distinct pairs and counting client-side if the RPC is unavailable.
  const { data, error } = await supabase.rpc('get_city_category_counts');

  if (!error && data) {
    return data as { city: string; category: string; count: number }[];
  }

  // Fallback: fetch all city+category pairs and aggregate in JS
  // Supabase returns max 1000 rows per request, so we paginate.
  console.warn(
    '[supabase] RPC get_city_category_counts unavailable, falling back to client-side aggregation',
  );

  const PAGE_SIZE = 1000;
  let allRows: { city: string; category: string }[] = [];
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const { data: rows, error: fallbackError } = await supabase
      .from('curated_places')
      .select('city, category')
      .range(offset, offset + PAGE_SIZE - 1);

    if (fallbackError || !rows) {
      console.error('[supabase] getAllCityCategories fallback error:', fallbackError?.message);
      return [];
    }

    allRows = allRows.concat(rows as { city: string; category: string }[]);
    hasMore = rows.length === PAGE_SIZE;
    offset += PAGE_SIZE;
  }

  const rows = allRows;

  if (rows.length === 0) {
    console.error('[supabase] getAllCityCategories: no rows returned');
    return [];
  }

  console.log(`[supabase] getAllCityCategories: fetched ${rows.length} rows`);


  const counts = new Map<string, { city: string; category: string; count: number }>();

  for (const row of rows as { city: string; category: string }[]) {
    const key = `${row.city.toLowerCase()}|${row.category}`;
    const existing = counts.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(key, { city: row.city, category: row.category, count: 1 });
    }
  }

  return Array.from(counts.values());
}

/**
 * Get all cities with their total place count.
 */
export async function getAllCities(): Promise<{ city: string; count: number }[]> {
  const PAGE_SIZE = 1000;
  let allRows: { city: string }[] = [];
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase
      .from('curated_places')
      .select('city')
      .range(offset, offset + PAGE_SIZE - 1);

    if (error || !data) {
      console.error('[supabase] getAllCities error:', error?.message);
      return [];
    }

    allRows = allRows.concat(data as { city: string }[]);
    hasMore = data.length === PAGE_SIZE;
    offset += PAGE_SIZE;
  }

  const counts = new Map<string, { city: string; count: number }>();

  for (const row of allRows) {
    const key = row.city.toLowerCase();
    const existing = counts.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(key, { city: row.city, count: 1 });
    }
  }

  return Array.from(counts.values()).sort((a, b) => b.count - a.count);
}

/**
 * Get all categories available in a specific city, with counts.
 */
export async function getCategoriesForCity(
  city: string,
): Promise<{ category: string; count: number }[]> {
  const PAGE_SIZE = 1000;
  let allRows: { category: string }[] = [];
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase
      .from('curated_places')
      .select('category')
      .ilike('city', city)
      .range(offset, offset + PAGE_SIZE - 1);

    if (error || !data) {
      console.error('[supabase] getCategoriesForCity error:', error?.message);
      return [];
    }

    allRows = allRows.concat(data as { category: string }[]);
    hasMore = data.length === PAGE_SIZE;
    offset += PAGE_SIZE;
  }

  const counts = new Map<string, number>();

  for (const row of allRows) {
    counts.set(row.category, (counts.get(row.category) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get places for a city (limited set for the hub/city page).
 * Returns up to 30 top-scored places across all categories.
 */
export async function getPlacesForCity(city: string): Promise<CuratedPlace[]> {
  const { data, error } = await supabase
    .from('curated_places')
    .select(PLACE_SELECT_COLUMNS)
    .ilike('city', city)
    .order('score_global', { ascending: false, nullsFirst: false })
    .limit(30);

  if (error) {
    console.error('[supabase] getPlacesForCity error:', error.message);
    return [];
  }

  return (data as unknown as CuratedPlace[]) ?? [];
}
