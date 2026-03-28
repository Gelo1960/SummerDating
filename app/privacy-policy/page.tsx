import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description:
    'Politique de confidentialité de Summer Dating. Découvrez comment nous protégeons vos données personnelles.',
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
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
          <span className="badge">Confidentialité</span>
          <div className="hero-title">Vos données, en sécurité.</div>
          <div className="hero-sub">
            Découvrez comment nous collectons, utilisons et protégeons vos
            informations pour vous offrir une expérience fiable et transparente.
          </div>
          <div
            className="chip"
            style={{ left: '15%', top: '68%' }}
            aria-hidden="true"
          >
            🔐 Données chiffrées
          </div>
          <div
            className="chip"
            style={{ right: '15%', top: '42%' }}
            aria-hidden="true"
          >
            🛡️ RGPD
          </div>
        </section>

        <section className="content-container reveal">
          <h1>🔒 Politique de Confidentialité</h1>
          <p className="last-updated">
            Dernière mise à jour : 13 novembre 2024
          </p>

          <p>
            Bienvenue sur <strong>Summer Dating</strong>. Nous respectons votre
            vie privée et nous nous engageons à protéger vos données
            personnelles. Cette politique de confidentialité vous informe sur la
            manière dont nous collectons, utilisons et protégeons vos
            informations.
          </p>

          <h2>1. Informations que nous collectons</h2>

          <h3>1.1 Informations que vous nous fournissez</h3>
          <ul>
            <li>
              <strong>Informations de compte :</strong> Adresse e-mail, nom
              d&apos;utilisateur, mot de passe
            </li>
            <li>
              <strong>Informations de profil :</strong> Photos de profil, bio,
              préférences d&apos;événements
            </li>
            <li>
              <strong>Contenu utilisateur :</strong> Messages, conversations,
              commentaires sur les événements
            </li>
            <li>
              <strong>Localisation :</strong> Localisation approximative pour
              vous proposer des événements à proximité
            </li>
          </ul>

          <h3>1.2 Informations collectées automatiquement</h3>
          <ul>
            <li>
              <strong>Données d&apos;utilisation :</strong> Pages consultées,
              événements consultés, interactions avec l&apos;application
            </li>
            <li>
              <strong>Données techniques :</strong> Type d&apos;appareil, système
              d&apos;exploitation, identifiant unique de l&apos;appareil
            </li>
            <li>
              <strong>Données de connexion :</strong> Adresse IP, heure de
              connexion, fonctionnalités utilisées
            </li>
          </ul>

          <h2>2. Comment nous utilisons vos informations</h2>

          <p>Nous utilisons vos données pour :</p>
          <ul>
            <li>Fournir et améliorer nos services</li>
            <li>
              Vous proposer des événements personnalisés basés sur votre
              localisation et vos préférences
            </li>
            <li>
              Faciliter la communication entre les utilisateurs (messagerie,
              groupes)
            </li>
            <li>
              Envoyer des notifications concernant les événements et messages
            </li>
            <li>Assurer la sécurité et prévenir les fraudes</li>
            <li>
              Analyser l&apos;utilisation de l&apos;application pour l&apos;améliorer
            </li>
            <li>Respecter nos obligations légales</li>
          </ul>

          <h2>3. Partage de vos informations</h2>

          <p>
            Nous ne vendons jamais vos données personnelles. Nous pouvons
            partager vos informations uniquement dans les cas suivants :
          </p>

          <h3>3.1 Avec d&apos;autres utilisateurs</h3>
          <ul>
            <li>
              Votre profil public (photo, nom d&apos;utilisateur, bio) est visible
              par les autres utilisateurs
            </li>
            <li>
              Vos messages sont visibles par les destinataires de ces messages
            </li>
            <li>
              Votre participation à des événements peut être visible par
              d&apos;autres participants
            </li>
          </ul>

          <h3>3.2 Avec nos prestataires de services</h3>
          <ul>
            <li>
              <strong>Supabase :</strong> Hébergement de base de données et
              authentification
            </li>
            <li>
              <strong>Services de notification :</strong> Pour envoyer des
              notifications push
            </li>
          </ul>

          <h3>3.3 Pour des raisons légales</h3>
          <p>
            Nous pouvons divulguer vos informations si la loi l&apos;exige ou pour
            protéger nos droits, votre sécurité ou celle d&apos;autres personnes.
          </p>

          <h2>4. Sécurité de vos données</h2>

          <p>
            Nous prenons la sécurité de vos données très au sérieux :
          </p>
          <ul>
            <li>Chiffrement des données en transit (HTTPS/SSL)</li>
            <li>Chiffrement des mots de passe</li>
            <li>Accès limité aux données personnelles</li>
            <li>
              Surveillance régulière pour détecter les vulnérabilités
            </li>
            <li>Hébergement sécurisé via Supabase</li>
          </ul>

          <div className="important-box">
            <strong>⚠️ Important :</strong> Aucun système n&apos;est totalement
            sécurisé. Bien que nous mettions en œuvre des mesures de sécurité,
            nous ne pouvons garantir une sécurité absolue.
          </div>

          <h2>5. Vos droits</h2>

          <p>
            Conformément au RGPD (Règlement Général sur la Protection des
            Données), vous disposez des droits suivants :
          </p>

          <ul>
            <li>
              <strong>Droit d&apos;accès :</strong> Demander une copie de vos
              données personnelles
            </li>
            <li>
              <strong>Droit de rectification :</strong> Corriger vos données
              inexactes
            </li>
            <li>
              <strong>Droit à l&apos;effacement :</strong> Demander la suppression
              de vos données
            </li>
            <li>
              <strong>Droit à la portabilité :</strong> Recevoir vos données
              dans un format structuré
            </li>
            <li>
              <strong>Droit d&apos;opposition :</strong> Vous opposer au traitement
              de vos données
            </li>
            <li>
              <strong>Droit de limitation :</strong> Demander la limitation du
              traitement
            </li>
          </ul>

          <p>
            Pour exercer ces droits, contactez-nous à :{' '}
            <a href="mailto:kouassiange744@gmail.com">
              kouassiange744@gmail.com
            </a>
          </p>

          <h2>6. Conservation des données</h2>

          <p>
            Nous conservons vos données personnelles tant que votre compte est
            actif ou aussi longtemps que nécessaire pour vous fournir nos
            services. Si vous supprimez votre compte, nous supprimerons ou
            anonymiserons vos données personnelles dans un délai de 30 jours,
            sauf si nous sommes légalement tenus de les conserver plus longtemps.
          </p>

          <h2>7. Données de localisation</h2>

          <p>
            Summer Dating collecte votre localisation approximative pour vous
            proposer des événements à proximité. Vous pouvez désactiver
            l&apos;accès à la localisation dans les paramètres de votre appareil,
            mais cela limitera certaines fonctionnalités de l&apos;application.
          </p>

          <h2>8. Cookies et technologies similaires</h2>

          <p>
            Nous utilisons des technologies de suivi pour améliorer votre
            expérience et analyser l&apos;utilisation de l&apos;application. Ces
            technologies nous aident à comprendre comment vous utilisez Summer
            Dating et à personnaliser votre expérience.
          </p>

          <h2>9. Modifications de cette politique</h2>

          <p>
            Nous pouvons mettre à jour cette politique de confidentialité de
            temps en temps. Nous vous informerons de tout changement important en
            publiant la nouvelle politique sur cette page et en mettant à jour la
            date de &quot;Dernière mise à jour&quot;.
          </p>

          <h2>10. Utilisateurs mineurs</h2>

          <p>
            Summer Dating est destiné aux utilisateurs âgés de 18 ans et plus.
            Nous ne collectons pas sciemment d&apos;informations auprès de personnes
            de moins de 18 ans. Si vous pensez qu&apos;un mineur nous a fourni des
            informations personnelles, contactez-nous immédiatement.
          </p>

          <h2>11. Transferts internationaux de données</h2>

          <p>
            Vos données peuvent être transférées et stockées sur des serveurs
            situés en dehors de votre pays de résidence. Nous veillons à ce que
            ces transferts soient effectués conformément aux lois applicables en
            matière de protection des données.
          </p>

          <div className="contact-box">
            <h2>📧 Nous contacter</h2>
            <p>
              Si vous avez des questions concernant cette politique de
              confidentialité ou vos données personnelles, vous pouvez nous
              contacter à :
            </p>
            <p>
              <strong>Email :</strong>{' '}
              <a href="mailto:kouassiange744@gmail.com">
                kouassiange744@gmail.com
              </a>
            </p>
            <p>
              <strong>Nom de l&apos;application :</strong> Summer Dating
            </p>
            <p>
              <strong>Responsable du traitement :</strong> Summer Dating
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
