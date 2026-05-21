import type { Metadata } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import './globals.css';
import Header from '@/components/Header';
import TopBanner from '@/components/TopBanner';
import Footer from '@/components/Footer';
import LeadMagnetPopup from '@/components/LeadMagnetPopup';
import GeoTracker from '@/components/GeoTracker';
import Tracker from '@/components/Tracker';
import { buildMetadata, orgSchema, jsonLd } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${serif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(orgSchema)}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <TopBanner />
        <Header />
        <main className="flex-1">{children}</main>
        <LeadMagnetPopup />
        <Footer />
        <Analytics />
        <SpeedInsights />
        <GeoTracker />
        <Tracker />
      </body>
    </html>
  );
}
