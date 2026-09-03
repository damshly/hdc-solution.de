import type { Metadata, Viewport } from 'next';
import { SITE_INFO } from '@/constants/site';
import Navbar from '@/components/layout/navbar/index';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import CookieBanner from '@/components/layout/CookieBanner';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#0284c7',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_INFO.url),
  title: {
    default: `${SITE_INFO.name} | Schweinfurt`,
    template: `%s | ${SITE_INFO.name}`,
  },
  description: SITE_INFO.description,
  keywords: [
    'Gebäudereinigung Schweinfurt',
    'Winterdienst Schweinfurt 24/7',
    'Gartenpflege Schweinfurt',
    'Treppenhausreinigung',
    'Büroreinigung Schweinfurt',
    'Unterhaltsreinigung',
    'HDC Dienstleistungen',
  ],
  authors: [{ name: SITE_INFO.name }],
  creator: SITE_INFO.name,
  publisher: SITE_INFO.name,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: `${SITE_INFO.name} | Professionelle Gebäudedienstleistungen`,
    description: SITE_INFO.description,
    url: SITE_INFO.url,
    siteName: SITE_INFO.name,
    images: [
      {
        url: SITE_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_INFO.name,
      },
    ],
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    images: [SITE_INFO.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" dir="ltr" suppressHydrationWarning>
      <body className="bg-surface-subtle text-slate-800 antialiased font-sans">
        {/* <Navbar /> */}
        {children}
        <Footer />
        <FloatingWhatsApp />
        <CookieBanner />
      </body>
    </html>
  );
}
