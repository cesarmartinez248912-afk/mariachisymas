'use client';

import { Button } from './ui';
import { Menu, X, ChevronUp, MessageCircle } from 'lucide-react';
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
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onScroll = () => setScrolled(window.scrollY > 24);

    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  function goHome() {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', '#inicio');
  }

  function goTo(hash: string) {
    setOpen(false);
    const target = document.querySelector(hash);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', hash);
  }

  return (
    <header className="fixed left-1/2 top-4 z-50 w-[min(1120px,calc(100%-1rem))] -translate-x-1/2 md:w-[min(1180px,calc(100%-2rem))]">
      <div
        className={cn(
          'relative overflow-hidden rounded-full border px-4 py-3 shadow-glow backdrop-blur-xl transition-all duration-500 md:px-6',
          scrolled
            ? 'border-white/10 bg-[#0b0b0d]/72 shadow-[0_24px_80px_rgba(0,0,0,.45)]'
            : 'border-white/5 bg-white/[0.03]',
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.08),transparent_18%,transparent_82%,rgba(255,255,255,.08))] opacity-30" />
        <div className="relative flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goHome}
            className="group inline-flex items-center gap-3 rounded-full px-2 py-1 text-left transition hover:opacity-90"
            aria-label="Volver al inicio"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/20 bg-gold/10 text-[11px] font-semibold tracking-[0.24em] text-gold2">
              ML
            </span>
            <span>
              <span className="block text-[11px] uppercase tracking-[0.38em] text-gold2/80">Mariachi Luxe</span>
              <span className="block text-xs text-muted">Música en vivo para eventos especiales</span>
            </span>
          </button>

          <nav className="hidden items-center gap-2 lg:flex">
            {links.map(([label, href]) => (
              <button
                key={href}
                type="button"
                onClick={() => goTo(href)}
                className="rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-muted transition hover:bg-white/[0.04] hover:text-text"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button
              onClick={() => goTo('#contacto')}
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold px-5 py-2.5 text-[12px] font-bold text-black transition hover:bg-gold2"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Button>
          </div>

          <button
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-text transition hover:bg-white/[0.08] lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className={cn('lg:hidden', open ? 'block' : 'hidden')}>
          <div className="mt-4 rounded-[1.6rem] border border-white/8 bg-[#111114]/96 p-3">
            <div className="grid gap-1">
              {links.map(([label, href]) => (
                <button
                  key={href}
                  type="button"
                  onClick={() => goTo(href)}
                  className="rounded-2xl px-4 py-3 text-left text-sm text-text transition hover:bg-white/[0.04]"
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo('#contacto')}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold px-4 py-3 text-sm font-bold text-black"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={goHome}
        aria-label="Volver arriba"
        className={cn(
          'absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center justify-center rounded-full border p-2 shadow-glow transition duration-300 hover:-translate-y-0.5',
          scrolled ? 'border-white/10 bg-[#0f0f12]/90 text-gold2' : 'border-white/10 bg-[#111114]/85 text-gold2',
        )}
      >
        <ChevronUp className="h-4 w-4" />
      </button>
    </header>
  );
}
