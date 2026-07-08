import type { Metadata } from 'next';
import './globals.css';
import { Bodoni_Moda, DM_Sans } from 'next/font/google';

const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-bodoni',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const SITE_URL = 'https://remotevakil.com';
const SITE_NAME = 'RemoteVakil';
const DEFAULT_TITLE = 'RemoteVakil — NRI Legal Services & Remote Advocate India';
const DEFAULT_DESC = 'RemoteVakil connects NRI and foreign clients with verified Indian advocates for property disputes, POA, inheritance, family law, and more. 100% remote, trusted by clients in 40+ countries.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: DEFAULT_DESC,
  keywords: [
    'NRI legal services India',
    'remote advocate India',
    'NRI property dispute lawyer',
    'power of attorney India NRI',
    'Indian lawyer for foreigners',
    'NRI legal help',
    'property lawyer India remote',
    'NRI legal consultation online',
    'Indian property law NRI',
    'legal services for Indians abroad',
    'NRI family law India',
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
        alt: 'RemoteVakil — NRI Legal Services India',
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
    'NRI Legal Services',
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
      name: "Can you handle my case if I'm living abroad?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Absolutely — RemoteVakil was built for NRI clients. We work with clients in over 40 countries including the UAE, USA, UK, Canada, and Australia. Everything is managed remotely.",
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
    <html lang="en" className={`${bodoniModa.variable} ${dmSans.variable}`}>
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
