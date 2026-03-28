import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Conditions d'Utilisation",
  description:
    "Conditions d'utilisation de Summer Dating. Lisez nos règles pour une expérience sûre et agréable.",
  robots: { index: false, follow: true },
};

export default function TermsOfServicePage() {
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
          <span className="badge">Conditions</span>
          <div className="hero-title">Utilisez l&apos;app en confiance.</div>
          <div className="hero-sub">
            Lisez nos règles d&apos;utilisation pour garantir une expérience sûre et
            agréable pour tous les membres de la communauté.
          </div>
          <div
            className="chip"
            style={{ left: '15%', top: '68%' }}
            aria-hidden="true"
          >
            📜 Transparence
          </div>
          <div
            className="chip"
            style={{ right: '15%', top: '42%' }}
            aria-hidden="true"
          >
            🤝 Respect
          </div>
        </section>

        <section className="content-container reveal">
          <h1>📜 Conditions d&apos;Utilisation</h1>
          <p className="last-updated">
            Dernière mise à jour : 13 novembre 2024
          </p>

          <p>
            Bienvenue sur <strong>Summer Dating</strong>. En utilisant notre
            application, vous acceptez les présentes conditions d&apos;utilisation.
            Veuillez les lire attentivement.
          </p>

          <div className="important-box">
            <strong>⚠️ Important :</strong> En téléchargeant, installant ou
            utilisant l&apos;application Summer Dating, vous acceptez d&apos;être lié par
            ces conditions. Si vous n&apos;acceptez pas ces conditions, veuillez ne
            pas utiliser l&apos;application.
          </div>

          <h2>1. Acceptation des conditions</h2>

          <p>
            En accédant à et en utilisant Summer Dating (&quot;l&apos;Application&quot;,
            &quot;le Service&quot;), vous acceptez d&apos;être lié par les présentes
            Conditions d&apos;Utilisation, ainsi que par notre{' '}
            <Link href="/privacy-policy">Politique de Confidentialité</Link>.
            Ces conditions s&apos;appliquent à tous les utilisateurs de
            l&apos;Application.
          </p>

          <h2>2. Description du service</h2>

          <p>
            Summer Dating est une application mobile qui permet aux utilisateurs
            de :
          </p>
          <ul>
            <li>
              Découvrir des événements culturels, musicaux et sociaux à Paris et
              en Île-de-France
            </li>
            <li>
              Se connecter avec d&apos;autres utilisateurs partageant les mêmes
              intérêts
            </li>
            <li>
              Communiquer via un système de messagerie privée et de groupe
            </li>
            <li>Organiser et planifier leur vie sociale</li>
            <li>
              Rejoindre des événements et rencontrer de nouvelles personnes
            </li>
          </ul>

          <h2>3. Conditions d&apos;éligibilité</h2>

          <p>Pour utiliser Summer Dating, vous devez :</p>
          <ul>
            <li>
              Avoir au moins <strong>18 ans</strong>
            </li>
            <li>
              Être légalement capable de conclure un contrat contraignant
            </li>
            <li>
              Ne pas être interdit d&apos;utiliser l&apos;Application en vertu des lois
              applicables
            </li>
            <li>
              Ne pas avoir été précédemment suspendu ou banni de l&apos;Application
            </li>
          </ul>

          <div className="important-box">
            <strong>⚠️ Âge minimum :</strong> L&apos;utilisation de Summer Dating est
            strictement réservée aux personnes âgées de 18 ans et plus. En
            utilisant l&apos;Application, vous déclarez avoir au moins 18 ans.
          </div>

          <h2>4. Création et sécurité du compte</h2>

          <h3>4.1 Inscription</h3>
          <p>
            Pour accéder à certaines fonctionnalités, vous devez créer un
            compte. Vous vous engagez à :
          </p>
          <ul>
            <li>
              Fournir des informations exactes, actuelles et complètes
            </li>
            <li>
              Maintenir et mettre à jour vos informations pour qu&apos;elles restent
              exactes
            </li>
            <li>Garder votre mot de passe confidentiel</li>
            <li>Ne pas partager votre compte avec d&apos;autres personnes</li>
            <li>
              Nous informer immédiatement de toute utilisation non autorisée de
              votre compte
            </li>
          </ul>

          <h3>4.2 Responsabilité du compte</h3>
          <p>
            Vous êtes seul responsable de toutes les activités qui se produisent
            sous votre compte. Summer Dating ne peut être tenu responsable de
            toute perte ou dommage résultant de votre non-respect des obligations
            de sécurité du compte.
          </p>

          <h2>5. Règles de conduite</h2>

          <p>En utilisant Summer Dating, vous vous engagez à :</p>

          <h3>5.1 Comportements interdits</h3>
          <p>Vous ne devez PAS :</p>
          <ul>
            <li>
              Harceler, menacer, intimider ou discriminer d&apos;autres utilisateurs
            </li>
            <li>
              Publier du contenu offensant, haineux, violent ou sexuellement
              explicite
            </li>
            <li>Usurper l&apos;identité d&apos;une autre personne</li>
            <li>Partager de fausses informations ou du spam</li>
            <li>
              Solliciter de l&apos;argent ou des biens auprès d&apos;autres utilisateurs
            </li>
            <li>Promouvoir des activités illégales</li>
            <li>
              Utiliser l&apos;Application à des fins commerciales sans autorisation
            </li>
            <li>
              Collecter des informations sur d&apos;autres utilisateurs
            </li>
            <li>Interférer avec le fonctionnement de l&apos;Application</li>
            <li>
              Utiliser des robots, scripts ou autres moyens automatisés
            </li>
          </ul>

          <h3>5.2 Contenu utilisateur</h3>
          <p>
            Vous êtes seul responsable du contenu que vous publiez (photos,
            messages, commentaires). En publiant du contenu, vous garantissez
            que :
          </p>
          <ul>
            <li>Vous possédez tous les droits sur ce contenu</li>
            <li>
              Le contenu ne viole aucun droit de propriété intellectuelle
            </li>
            <li>Le contenu respecte les présentes conditions</li>
            <li>Le contenu ne contient aucun virus ou code malveillant</li>
          </ul>

          <h2>6. Droits de propriété intellectuelle</h2>

          <h3>6.1 Contenu de l&apos;Application</h3>
          <p>
            Tous les droits, titres et intérêts relatifs à l&apos;Application, y
            compris le code, les graphiques, le design, la structure et le
            contenu, sont la propriété exclusive de Summer Dating. Vous ne
            pouvez pas :
          </p>
          <ul>
            <li>Copier, modifier ou distribuer l&apos;Application</li>
            <li>Créer des œuvres dérivées</li>
            <li>Décompiler ou effectuer de l&apos;ingénierie inverse</li>
            <li>Supprimer les mentions de copyright</li>
          </ul>

          <h3>6.2 Licence d&apos;utilisation du contenu</h3>
          <p>
            En publiant du contenu sur Summer Dating, vous nous accordez une
            licence mondiale, non exclusive, libre de redevances, transférable et
            sous-licenciable pour utiliser, reproduire, distribuer, modifier et
            afficher ce contenu dans le cadre de nos services.
          </p>

          <h2>7. Vie privée et données personnelles</h2>

          <p>
            L&apos;utilisation de vos données personnelles est régie par notre{' '}
            <Link href="/privacy-policy">Politique de Confidentialité</Link>. En
            utilisant l&apos;Application, vous consentez à la collecte et à
            l&apos;utilisation de vos informations conformément à cette politique.
          </p>

          <h2>8. Modération et suppression de contenu</h2>

          <p>
            Summer Dating se réserve le droit, mais n&apos;a pas l&apos;obligation, de :
          </p>
          <ul>
            <li>Surveiller le contenu publié sur l&apos;Application</li>
            <li>Supprimer tout contenu qui viole ces conditions</li>
            <li>
              Suspendre ou résilier les comptes des utilisateurs qui ne
              respectent pas ces conditions
            </li>
            <li>
              Signaler aux autorités compétentes toute activité illégale
            </li>
          </ul>

          <h2>9. Résiliation</h2>

          <h3>9.1 Par vous</h3>
          <p>
            Vous pouvez supprimer votre compte à tout moment depuis les
            paramètres de l&apos;Application ou en nous contactant à{' '}
            <a href="mailto:kouassiange744@gmail.com">
              kouassiange744@gmail.com
            </a>
            . Vos données seront supprimées conformément à notre Politique de
            Confidentialité.
          </p>

          <h3>9.2 Par Summer Dating</h3>
          <p>
            Nous pouvons suspendre ou résilier votre accès à l&apos;Application à
            tout moment, sans préavis, si :
          </p>
          <ul>
            <li>Vous violez ces conditions d&apos;utilisation</li>
            <li>
              Votre comportement met en danger d&apos;autres utilisateurs
            </li>
            <li>Nous sommes tenus de le faire par la loi</li>
            <li>Nous décidons de cesser d&apos;offrir l&apos;Application</li>
          </ul>

          <h2>10. Limitation de responsabilité</h2>

          <div className="info-box">
            <strong>
              L&apos;Application est fournie &quot;en l&apos;état&quot; et &quot;selon
              disponibilité&quot;.
            </strong>
          </div>

          <p>Summer Dating ne garantit pas que :</p>
          <ul>
            <li>
              L&apos;Application sera toujours disponible ou sans interruption
            </li>
            <li>L&apos;Application sera exempte d&apos;erreurs ou de virus</li>
            <li>Les résultats obtenus seront précis ou fiables</li>
            <li>Les défauts seront corrigés</li>
          </ul>

          <p>
            Dans toute la mesure permise par la loi, Summer Dating décline toute
            responsabilité pour :
          </p>
          <ul>
            <li>
              Les dommages directs, indirects, accessoires ou consécutifs
            </li>
            <li>
              La perte de profits, de données ou d&apos;opportunités commerciales
            </li>
            <li>Les interactions entre utilisateurs</li>
            <li>Le contenu publié par les utilisateurs</li>
          </ul>

          <h2>11. Indemnisation</h2>

          <p>
            Vous acceptez d&apos;indemniser et de dégager de toute responsabilité
            Summer Dating, ses dirigeants, employés et partenaires contre toute
            réclamation, demande, perte ou dommage résultant de :
          </p>
          <ul>
            <li>Votre utilisation de l&apos;Application</li>
            <li>Votre violation de ces conditions</li>
            <li>Votre violation des droits d&apos;un tiers</li>
            <li>Le contenu que vous publiez</li>
          </ul>

          <h2>12. Rencontres et sécurité</h2>

          <div className="important-box">
            <strong>⚠️ Sécurité importante :</strong>
            <ul style={{ marginTop: '10px' }}>
              <li>
                Summer Dating n&apos;organise pas d&apos;événements et ne peut garantir la
                sécurité des rencontres
              </li>
              <li>
                Nous vous encourageons à toujours rencontrer des personnes dans
                des lieux publics
              </li>
              <li>Informez vos proches de vos plans</li>
              <li>Faites confiance à votre instinct</li>
              <li>Signalez tout comportement suspect</li>
            </ul>
          </div>

          <h2>13. Modifications des conditions</h2>

          <p>
            Nous nous réservons le droit de modifier ces conditions à tout
            moment. Les modifications entrent en vigueur dès leur publication
            dans l&apos;Application. Votre utilisation continue de l&apos;Application
            après la publication des modifications constitue votre acceptation de
            ces modifications.
          </p>

          <p>
            Nous vous informerons des modifications importantes par notification
            dans l&apos;Application ou par email.
          </p>

          <h2>14. Loi applicable et juridiction</h2>

          <p>
            Ces conditions sont régies par les lois françaises. Tout litige sera
            soumis à la compétence exclusive des tribunaux français.
          </p>

          <h2>15. Divisibilité</h2>

          <p>
            Si une disposition de ces conditions est jugée invalide ou
            inapplicable, cette disposition sera limitée ou éliminée dans la
            mesure minimale nécessaire, et les autres dispositions resteront en
            vigueur.
          </p>

          <h2>16. Intégralité de l&apos;accord</h2>

          <p>
            Ces conditions, ainsi que notre Politique de Confidentialité,
            constituent l&apos;intégralité de l&apos;accord entre vous et Summer Dating
            concernant l&apos;utilisation de l&apos;Application.
          </p>

          <div className="contact-box">
            <h2>📧 Questions sur ces conditions ?</h2>
            <p>
              Si vous avez des questions concernant ces Conditions
              d&apos;Utilisation, contactez-nous à :
            </p>
            <p>
              <strong>Email :</strong>{' '}
              <a href="mailto:kouassiange744@gmail.com">
                kouassiange744@gmail.com
              </a>
            </p>
          </div>
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
