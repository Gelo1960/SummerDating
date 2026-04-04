import { Metadata } from 'next';
import Link from 'next/link';

import { getArticles } from '@/lib/blog';
import './blog.css';

export const metadata: Metadata = {
  title: 'Blog — Sorties, Dating & Lifestyle à Paris',
  description:
    'Découvrez nos articles sur les sorties, le dating et le lifestyle parisien. Tips, tendances et bons plans pour transformer chaque sortie en aventure.',
  alternates: { canonical: 'https://summer.dating/blog' },
  openGraph: {
    title: 'Blog — Summer Dating',
    description:
      'Découvrez nos articles sur les sorties, le dating et le lifestyle parisien.',
    url: 'https://summer.dating/blog',
    type: 'website',
  },
};

const APP_STORE_URL =
  'https://apps.apple.com/fr/app/summer-dating/id6753696473';

export default function BlogPage() {
  const articles = getArticles();

  return (
    <div className="blog-page">
      <nav className="blog-nav">
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

      <header className="blog-header">
        <div className="blog-badge">Blog</div>
        <h1>Le Blog Summer</h1>
        <p>
          Tendances dating, meilleurs spots parisiens et lifestyle — tout pour
          transformer tes sorties en aventures.
        </p>
      </header>

      <section className="articles-grid">
        {articles.length > 0 ? (
          articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="article-card"
            >
              <div className="card-category">{article.category}</div>
              <h2>{article.title}</h2>
              <p>{article.metaDescription}</p>
              <div className="card-meta">
                <span className="card-date">{article.dateDisplay}</span>
                <span className="card-tags">
                  {(article.tags || [])
                    .slice(0, 3)
                    .map((t) => `#${t}`)
                    .join(' ')}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="empty-state">
            <p>Les premiers articles arrivent bientôt !</p>
          </div>
        )}
      </section>

      <footer className="blog-footer">
        <div className="footer-wrapper">
          <ul className="blog-footer-links">
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
          <p className="blog-footer-copy">
            &copy; {new Date().getFullYear()} Summer Dating. Tous droits
            réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
