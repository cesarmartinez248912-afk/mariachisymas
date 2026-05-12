import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mariachi y Trío Musical para Eventos Especiales',
  description: 'Página premium para promocionar mariachi y trío musical con galería, videos, testimonios, formulario y panel admin.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'Mariachi y Trío Musical para Eventos Especiales',
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
