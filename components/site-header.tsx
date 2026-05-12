'use client';

import { Button } from './ui';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const links = [
  ['Inicio', '#inicio'],
  ['Nosotros', '#nosotros'],
  ['Servicios', '#servicios'],
  ['Galería', '#galeria'],
  ['Videos', '#videos'],
  ['Testimonios', '#testimonios'],
  ['Contacto', '#contacto'],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#inicio" className="font-semibold tracking-[0.24em] text-text" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          MARIACHI LUXE
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-xs uppercase tracking-[0.22em] text-muted transition hover:text-gold2">{label}</a>
          ))}
          <Button onClick={() => (window.location.href = '#contacto')} className="bg-gold px-5 py-2 text-xs text-black hover:bg-gold2">Solicitar cotización</Button>
        </nav>
        <button aria-label="Abrir menú" className="md:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-6 w-6 text-text" /> : <Menu className="h-6 w-6 text-text" />}
        </button>
      </div>
      <div className={cn('border-t border-line/40 bg-background/95 md:hidden', open ? 'block' : 'hidden')}>
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-4">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="text-sm text-text/90">{label}</a>
          ))}
          <a href="#contacto" onClick={() => setOpen(false)} className="rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold text-black">Solicitar cotización</a>
        </div>
      </div>
    </header>
  );
}
