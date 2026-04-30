import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://taxi-james.it';

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Taxi James',
  title: {
    default: 'Taxi James | Alpine Mobility & Concierge',
    template: '%s | Taxi James'
  },
  description:
    'Refined taxi and NCC transfers from Bressanone/Brixen across Alto Adige, Italy and Europe. Airport transfers, station pickups, tours, events and rapid delivery with direct booking by phone, WhatsApp, email and contact form.',
  keywords: [
    'Taxi Bressanone',
    'Taxi Brixen',
    'NCC Bressanone',
    'Airport transfer Alto Adige',
    'Dolomites transfer',
    'Taxi James'
  ],
  alternates: {
    canonical: '/it',
    languages: {
      'it-IT': '/it',
      'de-IT': '/de',
      'en-IT': '/en'
    }
  },
  openGraph: {
    title: 'Taxi James | Alpine Mobility & Concierge',
    description:
      'Trusted local taxi and NCC transfers rooted in Bressanone/Brixen for airports, hotels, rail stations, tours, events and more.',
    url: siteUrl,
    siteName: 'Taxi James',
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80',
        width: 1600,
        height: 900,
        alt: 'Premium Alpine mobility by Taxi James'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taxi James | Alpine Mobility & Concierge',
    description:
      'Private transfers, airport pickups, Dolomite excursions and premium local mobility from Bressanone/Brixen.',
    images: ['https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1
    }
  },
  category: 'transportation'
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
