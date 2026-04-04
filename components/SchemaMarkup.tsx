interface SchemaPlace {
  name: string;
  address?: string;
  lat?: number;
  lng?: number;
}

interface SchemaMarkupProps {
  title: string;
  description: string;
  url: string;
  places: SchemaPlace[];
}

export default function SchemaMarkup({
  title,
  description,
  url,
  places,
}: SchemaMarkupProps) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    author: {
      '@type': 'Organization',
      name: 'Summer Dating',
      url: 'https://summer.dating',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Summer Dating',
      logo: {
        '@type': 'ImageObject',
        url: 'https://summer.dating/logo.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    description: description,
    numberOfItems: places.length,
    itemListElement: places.map((place, index) => {
      const item: Record<string, unknown> = {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'LocalBusiness',
          name: place.name,
          ...(place.address ? { address: place.address } : {}),
          ...(place.lat != null && place.lng != null
            ? {
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: place.lat,
                  longitude: place.lng,
                },
              }
            : {}),
        },
      };
      return item;
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </>
  );
}
