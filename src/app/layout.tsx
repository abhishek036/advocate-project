import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RemoteVakil — Your Remote Legal Advocate',
  description: 'RemoteVakil is a premium, tech-forward legal services platform offering contract drafting, compliance, case tracking, document review, and dedicated relationship managers — delivered remotely with boutique precision.',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: '/logo.svg',
  },
  openGraph: {
    title: 'RemoteVakil — Your Remote Legal Advocate',
    type: 'website',
  }
};

import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
