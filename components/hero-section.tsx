import { Play, ArrowRight } from 'lucide-react';
import { Button, Pill } from './ui';
import type { SiteContent } from '@/lib/content';

export function HeroSection({ hero }: { hero: SiteContent[] }) {
  const media = hero[0];
  const isVideo = media?.kind === 'video' && media?.media_url;
  const imageUrl = media?.media_url || 'https://images.unsplash.com/photo-1511192336575-5a79af67f3d7?auto=format&fit=crop&w=1800&q=80';
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,.14),transparent_35%),linear-gradient(180deg,rgba(11,11,13,.15),rgba(11,11,13,.96))]" />
      <div className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8">
        <div className="relative z-10 max-w-2xl">
          <Pill>Mariachi y Trío Musical</Pill>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-text md:text-6xl" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Mariachi y Trío Musical para Eventos Especiales
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted md:text-lg">
            Música en vivo para bodas, serenatas, cumpleaños y eventos privados con una presentación elegante, confiable y llena de tradición mexicana.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gold px-7 py-3 text-sm text-black hover:bg-gold2">
              Solicitar Cotización <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={() => document.querySelector('#videos')?.scrollIntoView({ behavior: 'smooth' })} className="border border-gold/35 bg-transparent px-7 py-3 text-sm text-text hover:bg-gold/10">
              Ver Videos <Play className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4 text-sm text-muted">
            <div className="rounded-2xl border border-line bg-surface2/70 p-4">Bodas y XV años</div>
            <div className="rounded-2xl border border-line bg-surface2/70 p-4">Serenatas premium</div>
            <div className="rounded-2xl border border-line bg-surface2/70 p-4">Eventos empresariales</div>
          </div>
        </div>
        <div className="relative z-10">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-surface2 shadow-glow">
            {isVideo ? (
              <video className="h-full w-full object-cover" src={media?.media_url || undefined} autoPlay muted loop playsInline />
            ) : (
              <img src={imageUrl} alt="Mariachi elegante" className="h-full w-full object-cover" />
            )}
            <div className="absolute inset-0 bg-hero-overlay" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="rounded-2xl border border-gold/20 bg-black/35 p-4 backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.3em] text-gold2/80">Experiencia visual premium</p>
                <p className="mt-2 text-sm text-text/90">Imágenes y videos administrables desde /admin con contraseña.</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-line bg-surface2/65 px-5 py-4 text-sm text-muted">
            <span>Disponible para eventos en toda la región</span>
            <span className="text-gold2">Respuesta rápida</span>
          </div>
        </div>
      </div>
    </section>
  );
}
