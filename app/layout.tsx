import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SuperOver | Low Stakes, High Thrill Cricket Predictions',
  description: 'The ultimate 6-stat cricket prediction game for fans. Join live matches, predict top players, and win real cash payouts instantly.',
  keywords: ['cricket prediction', 'fantasy cricket', 't20 world cup', 'ipl', 'superover', 'sports predictions', 'cricket gaming'],
  authors: [{ name: 'SuperOver Team' }],
  openGraph: {
    title: 'SuperOver | Where Stats Meet Instincts',
    description: 'Predict 6 key match stats and win instantly. The most thrilling low-stakes cricket game.',
    url: 'https://superover.app',
    siteName: 'SuperOver',
    images: [
      {
        url: '/icon.svg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SuperOver | Where Stats Meet Instincts',
    description: 'Predict 6 key match stats and win instantly. Play now!',
    images: ['/icon.svg'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents annoying zoom on double-tap on iOS Safari
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
