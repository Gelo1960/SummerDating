import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Support',
  description:
    "Support et aide pour l'application Summer Dating. Contactez notre équipe pour toute question.",
  robots: { index: false, follow: true },
};

export default function SupportPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      <header>
        <nav id="main-nav">
          <Link href="/" className="logo">
            <Image
              src="/ee39fd9e-4cae-44ca-91f7-a91f053f9abf.png"
              alt="Summer Dating — Accueil"
              className="logo-img"
              width={40}
              height={40}
              priority
            />
          </Link>
          <a
            href="https://apps.apple.com/fr/app/summer-dating/id6670174638"
            className="nav-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Télécharger
          </a>
        </nav>
      </header>

      <main id="main-content">
        <section className="page-hero reveal">
          <span className="badge">Support</span>
          <div className="hero-title">Nous sommes là pour vous.</div>
          <div className="hero-sub">
            Contactez-nous pour toute question, suggestion ou problème technique.
            Notre équipe répond rapidement et efficacement.
          </div>
          <div
            className="chip"
            style={{ left: '15%', top: '68%' }}
            aria-hidden="true"
          >
            📧 Email
          </div>
          <div
            className="chip"
            style={{ right: '15%', top: '42%' }}
            aria-hidden="true"
          >
            ✅ Aide rapide
          </div>
        </section>

        <section className="content-container reveal">
          <h1>🛠️ Support Summer Dating</h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.2em',
              marginBottom: '30px',
            }}
          >
            Nous sommes là pour vous aider !
          </p>

          <div className="contact-box">
            <h2>📧 Contactez-nous</h2>
            <p>
              Pour toute question, suggestion ou problème technique, n&apos;hésitez
              pas à nous contacter :
            </p>
            <a href="mailto:kouassiange744@gmail.com">
              kouassiange744@gmail.com
            </a>
            <p style={{ marginTop: '20px', fontSize: '0.9em', opacity: 0.9 }}>
              Nous répondons généralement sous 24-48 heures
            </p>
          </div>

          <h2>🎯 À propos de Summer Dating</h2>
          <p>
            Summer Dating est votre compagnon pour découvrir les meilleurs
            endroits et événements de Paris et d&apos;Île-de-France. L&apos;app qui te
            pousse à sortir, découvrir des endroits, rejoindre des événements et
            rencontrer des gens IRL.
          </p>

          <div className="feature-grid">
            <div className="feature-card-page">
              <div className="feature-icon" aria-hidden="true">
                🎭
              </div>
              <h3>Lieux &amp; Activités</h3>
              <p>
                Culture, musique, sorties insolites... Trouve l&apos;activité
                parfaite
              </p>
            </div>

            <div className="feature-card-page">
              <div className="feature-icon" aria-hidden="true">
                👥
              </div>
              <h3>Rencontres IRL</h3>
              <p>Rencontre des gens qui partagent tes passions</p>
            </div>

            <div className="feature-card-page">
              <div className="feature-icon" aria-hidden="true">
                📍
              </div>
              <h3>Autour de toi</h3>
              <p>L&apos;app te propose des choses près de ta position</p>
            </div>
          </div>

          <h2>❓ Questions Fréquentes (FAQ)</h2>

          <div className="faq-item">
            <h3>L&apos;application est-elle gratuite ?</h3>
            <p>
              Oui ! Summer Dating est téléchargeable gratuitement sur l&apos;App
              Store pour iPhone.
            </p>
          </div>

          <div className="faq-item">
            <h3>Comment trouver des événements à proximité ?</h3>
            <p>
              L&apos;application détecte ta position (si tu l&apos;autorises) pour te
              proposer des lieux, événements et activités tout près de toi.
            </p>
          </div>

          <div className="faq-item">
            <h3>Comment fonctionnent les groupes ?</h3>
            <p>
              Trouve une expo, un concert ou un resto qui te correspond, et
              rejoins d&apos;autres personnes qui veulent faire la même chose au même
              moment.
            </p>
          </div>

          <div className="faq-item">
            <h3>Comment supprimer mon compte ?</h3>
            <p>
              Allez dans Profil &gt; Paramètres &gt; Supprimer mon compte.
              Toutes vos données seront définitivement supprimées sous 30 jours.
              Si vous avez besoin d&apos;aide, contactez-nous à{' '}
              <a href="mailto:kouassiange744@gmail.com">
                kouassiange744@gmail.com
              </a>
              .
            </p>
          </div>

          <h2>🐛 Signaler un bug ou un problème technique</h2>

          <div className="important-box">
            <strong>⚠️ Vous avez rencontré un problème ?</strong>
            <p>
              Envoyez-nous un email à{' '}
              <a href="mailto:kouassiange744@gmail.com">
                kouassiange744@gmail.com
              </a>{' '}
              avec les détails suivants :
            </p>
            <ul>
              <li>Description du problème</li>
              <li>Modèle de votre iPhone et version iOS</li>
              <li>Captures d&apos;écran (si possible)</li>
            </ul>
          </div>

          <h2>💡 Suggestions et Feedback</h2>
          <p>
            Si vous avez des idées pour améliorer l&apos;app, de nouvelles
            fonctionnalités ou de nouveaux lieux à ajouter, écrivez-nous à{' '}
            <a href="mailto:kouassiange744@gmail.com">
              kouassiange744@gmail.com
            </a>{' '}
            !
          </p>
        </section>
      </main>

      <footer>
        <div className="page-wrapper">
          <ul className="footer-links">
            <li>
              <Link href="/support">Support</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Confidentialité</Link>
            </li>
            <li>
              <Link href="/terms-of-service">Conditions d&apos;utilisation</Link>
            </li>
          </ul>
          <div className="footer-copy">
            &copy; 2026 Summer Dating. Tous droits réservés.
          </div>
        </div>
      </footer>
    </>
  );
}
