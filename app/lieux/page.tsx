import { Metadata } from 'next';
import Link from 'next/link';

import './lieux.css';

import { getAllCities } from '@/lib/supabase';
import { CITY_MAPPING } from '@/lib/mappings';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Guide des meilleurs lieux pour un date',
  description:
    'Retrouvez nos guides des meilleurs spots pour un date dans toutes les grandes villes. Restaurants, bars, balades romantiques, sorties culturelles et plus encore.',
  alternates: { canonical: 'https://summer.dating/lieux' },
  openGraph: {
    title: 'Guide des meilleurs lieux pour un date',
    description:
      'Retrouvez nos guides des meilleurs spots pour un date dans toutes les grandes villes.',
    url: 'https://summer.dating/lieux',
    type: 'website',
  },
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

const APP_STORE_URL =
  'https://apps.apple.com/fr/app/summer-dating/id6753696473';

export default async function LieuxIndexPage() {
  const cities = await getAllCities();

  return (
    <div className="lieux-page">
      {/* --- Nav --- */}
      <nav className="lieux-nav">
        <Link href="/" className="nav-logo">
          <img
            src="/logo.webp"
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

      {/* --- Header --- */}
      <header className="lieux-header">
        <h1>Tous nos guides de dating par ville</h1>
      </header>

      <p className="lieux-intro">
        Découvrez les meilleurs spots pour un date dans les plus belles villes
        du monde. Restaurants, bars, balades romantiques, sorties culturelles :
        on a tout sélectionné pour vous.
      </p>

      {/* --- City Grid --- */}
      <section className="lieux-content">
        <div className="related-grid">
          {cities.map(({ city, count }) => {
            const cityKey = city.toLowerCase();
            const mapping = CITY_MAPPING[cityKey];
            if (!mapping) return null;

            return (
              <Link
                key={mapping.slug}
                href={`/lieux/date-a-${mapping.slug}`}
                className="related-card"
              >
                <span className="related-card-emoji" aria-hidden="true">
                  {'\uD83C\uDFD9\uFE0F'}
                </span>
                <span>
                  {mapping.name}
                  <br />
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 400,
                      opacity: 0.7,
                    }}
                  >
                    {count} lieux
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* --- Footer --- */}
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
              <Link href="/blog">Blog</Link>
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
    </div>
  );
}
