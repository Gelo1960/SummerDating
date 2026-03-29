import type { Metadata } from 'next';
import HomeInteractions from '@/components/HomeInteractions';

export const metadata: Metadata = {
  title: 'Summer Dating — Transforme ton quotidien en aventure',
  description:
    "Découvre des lieux, des événements et des gens autour de toi. L'app qui te pousse à sortir et vivre. Disponible sur l'App Store.",
  alternates: {
    canonical: 'https://summer.dating/',
  },
  openGraph: {
    type: 'website',
    url: 'https://summer.dating/',
    title: 'Summer Dating — Transforme ton quotidien en aventure',
    description:
      "Découvre des lieux, des événements et des gens autour de toi. L'app qui te pousse à sortir et vivre.",
    images: [
      {
        url: 'https://summer.dating/ee39fd9e-4cae-44ca-91f7-a91f053f9abf.png',
      },
    ],
    locale: 'fr_FR',
    siteName: 'Summer Dating',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Summer Dating — Transforme ton quotidien en aventure',
    description:
      "Découvre des lieux, des événements et des gens autour de toi. L'app qui te pousse à sortir et vivre.",
    images: [
      'https://summer.dating/ee39fd9e-4cae-44ca-91f7-a91f053f9abf.png',
    ],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'Summer Dating',
  operatingSystem: 'iOS',
  applicationCategory: 'SocialNetworkingApplication',
  description:
    "L'app qui te pousse à sortir, découvrir des endroits, rejoindre des événements et rencontrer des gens IRL.",
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
  author: {
    '@type': 'Person',
    name: 'Kouassi Ange Yao',
  },
  downloadUrl:
    'https://apps.apple.com/fr/app/summer-dating/id6670174638',
  installUrl:
    'https://apps.apple.com/fr/app/summer-dating/id6670174638',
  screenshot: 'https://summer.dating/imagedemain.png',
  softwareVersion: '1.0',
  contentRating: '17+',
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      <header>
        <nav id="main-nav">
          <a href="/" className="logo">
            <img
              src="/ee39fd9e-4cae-44ca-91f7-a91f053f9abf.png"
              alt="SummerDating"
              className="logo-img"
              loading="eager"
            />
          </a>
          <div className="nav-links-group">
            <a href="/lieux" className="nav-link">
              Guides
            </a>
            <a href="/blog/" className="nav-link">
              Blog
            </a>
            <a
              href="https://apps.apple.com/fr/app/summer-dating/id6670174638"
              className="nav-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Télécharger
            </a>
          </div>
        </nav>
      </header>

      <main id="main-content">
        {/* Section: Hero */}
        <section className="hero" id="sec-accueil">
          <div className="page-wrapper">
            <h1>
              Chaque sortie
              <br />
              <span className="highlight">est une aventure.</span>
            </h1>
            <p>
              Découvre des lieux, des événements et des gens autour de toi.
              L&apos;app qui te pousse à sortir et vivre.
            </p>

            <a
              href="https://apps.apple.com/fr/app/summer-dating/id6670174638"
              className="appstore-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Télécharger Summer Dating sur l'App Store"
            >
              <svg
                viewBox="0 0 384 512"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <div className="btn-text">
                <small>Télécharger sur</small>
                <span>l&apos;App Store</span>
              </div>
            </a>
            <div className="hero-subtitle">Gratuit · iPhone</div>

            <div className="visual-area">
              <img
                src="/imagedemain.webp"
                alt="Application SummerDating sur un téléphone"
                className="phone-image"
                width={560}
                height={743}
                loading="eager"
              />
              <div className="feature-bubble" id="bubble1">
                <span>📍</span> Événements &amp; Lieux
              </div>
              <div className="feature-bubble" id="bubble2">
                <span>✨</span> Construit ta carte
              </div>
              <div className="feature-bubble" id="bubble3">
                <span>👥</span> Rencontres IRL
              </div>
            </div>
          </div>
        </section>

        {/* Section: Bento Grid */}
        <section className="bento-section" id="sec-fonctions">
          <div className="page-wrapper">
            <div className="bento-grid">
              {/* Row 1: Concept + Stats */}
              <div className="bento-card bento-concept reveal">
                <span className="section-badge">Le concept</span>
                <h2 className="bento-title">
                  Comme les Sims, mais dans la vraie vie
                </h2>
                <p>
                  Summer Dating te propose des activités, des lieux et des
                  rencontres basés sur où tu es et ce que tu aimes.
                </p>
              </div>

              <div className="bento-card bento-stats reveal">
                <div className="bento-stat">
                  <span className="bento-stat-number">4.8</span>
                  <span className="bento-stat-label">App Store</span>
                </div>
                <div className="bento-stat">
                  <span className="bento-stat-number">1K+</span>
                  <span className="bento-stat-label">Téléchargements</span>
                </div>
                <div className="bento-stat">
                  <span className="bento-stat-number">Paris</span>
                  <span className="bento-stat-label">
                    &amp; Île-de-France
                  </span>
                </div>
              </div>

              {/* Row 2: Steps with screenshots */}
              <div className="bento-card bento-with-phone reveal">
                <div className="bento-phone">
                  <div className="bento-phone-frame">
                    <img
                      src="/imagesapp/screen-carte-clusters.webp"
                      alt="Carte avec lieux autour de toi"
                      width={560}
                      height={1212}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="bento-content">
                  <div className="step-number">1</div>
                  <h3>Explore autour de toi</h3>
                  <p>
                    L&apos;app détecte ta position et te propose des lieux,
                    événements et activités à proximité.
                  </p>
                </div>
              </div>

              <div className="bento-card bento-text reveal">
                <span className="bento-icon" aria-hidden="true">
                  🎯
                </span>
                <h3>Choisis ton aventure</h3>
                <p>
                  Expos, concerts, restos, lieux insolites — trouve ce qui te
                  correspond et rejoins des groupes.
                </p>
              </div>

              <div className="bento-card bento-text reveal">
                <span className="bento-icon" aria-hidden="true">
                  ✨
                </span>
                <h3>Vis le moment</h3>
                <p>
                  Sors, découvre, rencontre. Construis ta carte personnelle des
                  endroits que tu aimes.
                </p>
              </div>

              {/* Row 3: Features with screenshots */}
              <div className="bento-card bento-icon-card reveal">
                <span className="bento-icon" aria-hidden="true">
                  🗺️
                </span>
                <h3>Ta carte personnelle</h3>
                <p>
                  Enregistre tes spots préférés, partage-les, échange avec les
                  autres.
                </p>
              </div>

              <div className="bento-card bento-with-phone bento-wide reveal">
                <div className="bento-phone">
                  <div className="bento-phone-frame">
                    <img
                      src="/imagesapp/screen-feed.webp"
                      alt="Feed avec notifications de lieux"
                      width={560}
                      height={1212}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="bento-content">
                  <h3>Notifications intelligentes</h3>
                  <p>
                    L&apos;app te prévient quand un lieu ou un événement cool
                    est près de toi.
                  </p>
                </div>
              </div>

              {/* Row 4 */}
              <div className="bento-card bento-with-phone bento-wide reveal">
                <div className="bento-phone">
                  <div className="bento-phone-frame">
                    <img
                      src="/imagesapp/screen-decouverte.webp"
                      alt="Découverte de personnes à proximité"
                      width={560}
                      height={1212}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="bento-content">
                  <h3>Groupes spontanés</h3>
                  <p>
                    Rejoins des gens qui veulent faire la même chose que toi, au
                    même moment.
                  </p>
                </div>
              </div>

              <div className="bento-card bento-icon-card reveal">
                <span className="bento-icon" aria-hidden="true">
                  🏆
                </span>
                <h3>Défis hebdomadaires</h3>
                <p>
                  Des challenges pour te motiver à découvrir de nouveaux
                  endroits chaque semaine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Screenshots -- iPhone Coverflow */}
        <section className="screenshots" id="sec-app">
          <div className="page-wrapper">
            <div
              className="phones-showcase"
              role="region"
              aria-label="Galerie de captures d'écran de l'application"
            >
              <div className="phone-item" data-label="Ton feed">
                <div className="phone-frame">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <img
                      src="/imagesapp/screen-feed.webp"
                      alt="Feed principal avec lieux et météo"
                      width={560}
                      height={1212}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="phone-item" data-label="Sorties">
                <div className="phone-frame">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <img
                      src="/imagesapp/screen-sorties.webp"
                      alt="Liste des sorties"
                      width={560}
                      height={1212}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="phone-item" data-label="Découverte">
                <div className="phone-frame">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <img
                      src="/imagesapp/screen-decouverte.webp"
                      alt="Découverte de profils"
                      width={560}
                      height={1212}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="phone-item" data-label="Détail lieu">
                <div className="phone-frame">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <img
                      src="/imagesapp/screen-lieu.webp"
                      alt="Fiche détaillée d'un lieu"
                      width={560}
                      height={1212}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="phone-item" data-label="Carte">
                <div className="phone-frame">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <img
                      src="/imagesapp/screen-carte.webp"
                      alt="Carte interactive de Paris"
                      width={560}
                      height={1212}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="phone-item" data-label="Lieux proches">
                <div className="phone-frame">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <img
                      src="/imagesapp/screen-carte-clusters.webp"
                      alt="Clusters de lieux"
                      width={560}
                      height={1212}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="phone-item" data-label="Europe">
                <div className="phone-frame">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <img
                      src="/imagesapp/screen-carte-large.webp"
                      alt="Vue Europe"
                      width={560}
                      height={1212}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="phone-item" data-label="Navigation">
                <div className="phone-frame">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <img
                      src="/imagesapp/screen-navigation.webp"
                      alt="Navigation GPS"
                      width={560}
                      height={1212}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="phone-item" data-label="Globe">
                <div className="phone-frame">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <img
                      src="/imagesapp/screen-carte-globe.webp"
                      alt="Vue globe mondiale"
                      width={560}
                      height={1212}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel dots */}
            <div className="carousel-dots" aria-label="Indicateurs de slide" />

            <h2 className="section-title reveal">Découvre l&apos;app</h2>
            <p className="section-description reveal">
              Un aperçu de ce qui t&apos;attend sur Summer Dating.
            </p>
          </div>
        </section>

        {/* Section: Video Demo */}
        <section className="demo-video" id="sec-video">
          <div className="page-wrapper">
            <h2 className="section-title reveal">
              Vois l&apos;app en action
            </h2>
            <p className="section-description reveal">
              Une démo rapide de Summer Dating pour te donner un avant-goût.
            </p>

            <div className="video-container reveal">
              <video
                controls
                playsInline
                preload="metadata"
                poster="/imagesapp/screen-feed.webp"
                aria-label="Vidéo de démonstration de l'application Summer Dating"
              >
                <source src="/imagesapp/demo-video.mp4" type="video/mp4" />
                Ton navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
          </div>
        </section>

        {/* Section: CTA Final */}
        <section className="cta-final reveal">
          <div className="page-wrapper">
            <h2 className="section-title">
              Arrête de scroller.
              <br />
              Commence à vivre.
            </h2>
            <p className="section-description">
              Rejoins Summer Dating et transforme ton quotidien.
            </p>

            <a
              href="https://apps.apple.com/fr/app/summer-dating/id6670174638"
              className="appstore-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Télécharger Summer Dating sur l'App Store"
            >
              <svg
                viewBox="0 0 384 512"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <div className="btn-text">
                <small>Télécharger sur</small>
                <span>l&apos;App Store</span>
              </div>
            </a>
          </div>
        </section>
      </main>

      {/* Mobile Tab Bar */}
      <nav className="mobile-tab-bar" aria-label="Navigation mobile">
        <a
          href="#sec-accueil"
          className="tab-item active"
          data-section="sec-accueil"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Accueil</span>
        </a>
        <a
          href="#sec-fonctions"
          className="tab-item"
          data-section="sec-fonctions"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>Comment</span>
        </a>
        <a href="#sec-app" className="tab-item" data-section="sec-app">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
          <span>L&apos;app</span>
        </a>
        <a href="#sec-video" className="tab-item" data-section="sec-video">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span>Vidéo</span>
        </a>
        <a
          href="https://apps.apple.com/fr/app/summer-dating/id6670174638"
          className="tab-item tab-download"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Obtenir</span>
        </a>
      </nav>

      <footer>
        <div className="page-wrapper">
          <ul className="footer-links">
            <li>
              <a href="/lieux">Guides</a>
            </li>
            <li>
              <a href="/blog/">Blog</a>
            </li>
            <li>
              <a href="/support">Support</a>
            </li>
            <li>
              <a href="/privacy-policy">Confidentialité</a>
            </li>
            <li>
              <a href="/terms-of-service">Conditions d&apos;utilisation</a>
            </li>
          </ul>
          <div className="footer-copy">
            &copy; 2026 Summer Dating. Tous droits réservés.
          </div>
        </div>
      </footer>

      <HomeInteractions />
    </>
  );
}
