import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mariachi Luxe',
  description: 'Sitio premium de mariachi y trío musical con galería, videos, testimonios y contacto por WhatsApp.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'Mariachi Luxe',
    description: 'Presentaciones elegantes para bodas, serenatas, XV años y eventos privados.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="dark">
      <body>{children}</body>
    </html>
  );
}
