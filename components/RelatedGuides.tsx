import Link from 'next/link';

interface CategoryInfo {
  slug: string;
  name: string;
  emoji?: string;
}

interface CityInfo {
  slug: string;
  name: string;
  emoji?: string;
}

interface RelatedGuidesProps {
  currentCitySlug: string;
  currentCategorySlug: string;
  allCategories: CategoryInfo[];
  allCities: CityInfo[];
}

export default function RelatedGuides({
  currentCitySlug,
  currentCategorySlug,
  allCategories,
  allCities,
}: RelatedGuidesProps) {
  const otherCategories = allCategories.filter(
    (cat) => cat.slug !== currentCategorySlug
  );
  const otherCities = allCities.filter(
    (city) => city.slug !== currentCitySlug
  );

  if (otherCategories.length === 0 && otherCities.length === 0) return null;

  return (
    <section className="related-section" aria-label="Guides similaires">
      <h2 className="related-section-title">Autres guides</h2>

      <div className="related-grid">
        {otherCategories.map((cat) => (
          <Link
            key={`cat-${cat.slug}`}
            href={`/lieux/${cat.slug}-${currentCitySlug}`}
            className="related-card"
          >
            <span className="related-card-emoji" aria-hidden="true">
              {cat.emoji || '\uD83D\uDCCD'}
            </span>
            {cat.name}
          </Link>
        ))}

        {otherCities.map((city) => (
          <Link
            key={`city-${city.slug}`}
            href={`/lieux/${currentCategorySlug}-${city.slug}`}
            className="related-card"
          >
            <span className="related-card-emoji" aria-hidden="true">
              {city.emoji || '\uD83C\uDFD9\uFE0F'}
            </span>
            {city.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
