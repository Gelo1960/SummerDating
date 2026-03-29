import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getArticleContent, getAllSlugs } from '@/lib/blog';
import '../blog.css';

const APP_STORE_URL =
  'https://apps.apple.com/fr/app/summer-dating/id6670174638';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = getArticleContent(params.slug);
  if (!article) return {};

  return {
    title: `${article.title}`,
    description: article.metaDescription,
    alternates: { canonical: `https://summer.dating/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url: `https://summer.dating/blog/${article.slug}`,
      type: 'article',
      siteName: 'Summer Dating',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.metaDescription,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleContent(params.slug);
  if (!article) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Organization', name: 'Summer Dating' },
    publisher: {
      '@type': 'Organization',
      name: 'Summer Dating',
      url: 'https://summer.dating',
    },
    mainEntityOfPage: `https://summer.dating/blog/${article.slug}`,
    keywords: article.tags.join(', '),
  };

  return (
    <div className="blog-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="blog-nav">
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

      <article className="article-container">
        <div className="article-meta">
          <span className="article-category">{article.category}</span>
          <span className="article-date">{article.dateDisplay}</span>
        </div>

        <h1>{article.title}</h1>

        <div
          className="article-intro"
          dangerouslySetInnerHTML={{ __html: article.intro }}
        />

        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
        />

        {article.tags.length > 0 && (
          <div className="article-tags">
            {article.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      <section className="articles-grid" style={{ paddingTop: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.3rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}
          >
            Nos guides pour sortir
          </h2>
        </div>
        <Link href="/lieux/date-a-paris" className="article-card">
          <div className="card-category">Paris</div>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
          >
            Les meilleurs lieux pour un date à Paris
          </h3>
          <p>Restaurants, bars, balades romantiques et plus encore.</p>
        </Link>
        <Link href="/lieux" className="article-card">
          <div className="card-category">Toutes les villes</div>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
          >
            Tous nos guides de dating par ville
          </h3>
          <p>
            Découvrez les meilleurs spots dans toutes les grandes villes.
          </p>
        </Link>
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
