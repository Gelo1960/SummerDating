import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#ff9ccf',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://summer.dating'),
  title: {
    default: 'Summer Dating — Transforme ton quotidien en aventure',
    template: '%s — Summer Dating',
  },
  description:
    "Découvre des lieux, des événements et des gens autour de toi. L'app qui te pousse à sortir et vivre. Disponible sur l'App Store.",
  keywords:
    'sortir paris, activités paris, événements paris, lieux insolites, rencontrer des gens, que faire à paris, sorties ile de france',
  authors: [{ name: 'Kouassi Ange Yao' }],
  icons: {
    icon: '/ee39fd9e-4cae-44ca-91f7-a91f053f9abf.png',
    apple: '/ee39fd9e-4cae-44ca-91f7-a91f053f9abf.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Summer Dating',
    images: [{ url: '/ee39fd9e-4cae-44ca-91f7-a91f053f9abf.png' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  other: {
    'apple-itunes-app': 'app-id=6670174638',
    'google-site-verification': 'NYaPZrH5cCKgfs1IpJ5pf42fO1ouqzySk7JAVkyEoX4',
  },
  verification: {
    google: 'NYaPZrH5cCKgfs1IpJ5pf42fO1ouqzySk7JAVkyEoX4',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
