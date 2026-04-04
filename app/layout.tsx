import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#ff9ccf',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://summer.dating'),
  title: {
    default: 'Summer Dating | App de rencontres IRL et sorties à Paris',
    template: '%s | Summer Dating',
  },
  description:
    "Découvrez des lieux insolites, participez à des événements et faites des rencontres IRL à Paris et en Île-de-France. Téléchargez Summer Dating gratuitement !",
  keywords:
    'app rencontre paris, sortir paris, rencontres IRL, activités paris, événements paris, lieux insolites paris, que faire à paris, sorties ile de france, rencontrer du monde paris, premier date paris',
  authors: [{ name: 'Kouassi Ange Yao' }],
  icons: {
    icon: '/apple-icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Summer Dating',
    images: [{ url: '/logo.webp' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  other: {
    'apple-itunes-app': 'app-id=6753696473',
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
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
