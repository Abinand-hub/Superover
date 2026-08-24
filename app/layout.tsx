import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SuperOver | Where Stats Meet Instincts',
  description: 'Low-stakes 6-stat cricket selection game for fans',
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
