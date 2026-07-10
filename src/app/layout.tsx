import type { Metadata } from 'next';
import './globals.css';
import { Roboto, Inter } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = 'https://remotevakil.com';
const SITE_NAME = 'RemoteVakil';
const DEFAULT_TITLE = 'RemoteVakil - Your Legal Representative in India';
const DEFAULT_DESC = 'Your legal representative in India, wherever you are. RemoteVakil offers professional legal representation services to ensure your rights are protected.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: DEFAULT_DESC,
  keywords: [
    'legal services India',
    'remote advocate India',
    'property dispute lawyer India',
    'power of attorney India',
    'Indian lawyer online',
    'legal help India',
    'property lawyer India remote',
    'legal consultation online India',
    'Indian property law',
    'legal services online',
    'family law India',
    'hire Indian advocate online',
  ],
  authors: [{ name: 'RemoteVakil' }],
  creator: 'RemoteVakil',
  publisher: 'RemoteVakil',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'RemoteVakil — Legal Services in India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: [`${SITE_URL}/og-image.png`],
  },
  icons: {
    icon: [{ url: '/logo.svg', type: 'image/svg+xml' }],
    apple: '/logo.svg',
  },
};

import type { Viewport } from 'next';
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'RemoteVakil',
  description: DEFAULT_DESC,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  sameAs: [],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  availableLanguage: ['English', 'Hindi'],
  serviceType: [
    'Legal Services',
    'Property Law',
    'Power of Attorney',
    'Family Law',
    'Inheritance & Succession',
    'Corporate Law',
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Can I manage my case remotely?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Absolutely. RemoteVakil is built for remote representation. We work with clients across India and globally, managing everything securely online.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to physically be present in India for my case?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In most cases, no. We handle on-ground representation through our verified advocate network across India.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly will I hear back?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our committed SLA is a response within 48 business hours. In practice, most clients hear back within the same business day.',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
