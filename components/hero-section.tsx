import { ArrowRight, Star, Sparkles, Play } from 'lucide-react';
import type { ReactNode } from 'react';
import type { SiteContent } from '@/lib/content';

function ActionLink({ href, children, variant = 'primary' }: { href: string; children: ReactNode; variant?: 'primary' | 'secondary' }) {
  const base = 'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300';
  const styles =
    variant === 'primary'
      ? 'bg-gold text-black hover:bg-gold2 hover:-translate-y-0.5 shadow-glow'
      : 'border border-white/10 bg-white/[0.03] text-text hover:bg-white/[0.06] hover:-translate-y-0.5';

  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
}

export function HeroSection({ hero }: { hero: SiteContent[] }) {
  const media = hero[0];
  const isVideo = media?.kind === 'video' && media?.media_url;
  const imageUrl = media?.media_url || 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1800&q=80';

  return (
    <section id="inicio" className="relative overflow-hidden scroll-mt-28 pt-28 md:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,.16),transparent_36%),radial-gradient(circle_at_80%_25%,rgba(255,255,255,.08),transparent_18%),linear-gradient(180deg,rgba(11,11,13,.12),rgba(11,11,13,.96))]" />
      <div className="pointer-events-none absolute left-[-6rem] top-28 h-80 w-80 rounded-full bg-gold/10 blur-3xl animate-floatSlow" />
      <div className="pointer-events-none absolute right-[-5rem] top-16 h-96 w-96 rounded-full bg-white/5 blur-3xl animate-drift" />

      <div className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-12 px-5 pb-16 md:grid-cols-2 md:px-8 lg:gap-16">
        <div data-reveal className="relative z-10 max-w-2xl">
          <span className="inline-flex rounded-full border border-gold/20 bg-gold/10 px-4 py-1 text-[11px] uppercase tracking-[0.28em] text-gold2">
            Mariachi y Trío Musical
          </span>
          <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.05] text-text md:text-6xl lg:text-[4.3rem]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Música en vivo con presencia limpia, elegante y memorable.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted md:text-lg">
            Serenatas, bodas, XV años y eventos privados con un estilo premium, una atención cercana y una experiencia visual más moderna y refinada.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ActionLink href="#contacto">
              WhatsApp directo <ArrowRight className="ml-2 h-4 w-4" />
            </ActionLink>
            <ActionLink href="#videos" variant="secondary">
              Ver videos <Play className="ml-2 h-4 w-4" />
            </ActionLink>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {['Bodas y XV años', 'Serenatas premium', 'Eventos empresariales'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-muted shadow-[0_12px_30px_rgba(0,0,0,.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05]">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.28em] text-gold2/80">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-gold/8 px-3 py-2">
              <Star className="h-4 w-4 fill-current" /> Tradición
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-gold/8 px-3 py-2">
              <Sparkles className="h-4 w-4" /> Estilo limpio
            </span>
          </div>
        </div>

        <div data-reveal className="relative z-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_rgba(0,0,0,.35)]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.05),transparent_34%,rgba(0,0,0,.55))]" />
            {isVideo ? (
              <video className="h-[34rem] w-full object-cover md:h-[42rem]" src={media?.media_url || undefined} autoPlay muted loop playsInline />
            ) : (
              <img src={imageUrl} alt="Mariachi elegante" className="h-[34rem] w-full object-cover md:h-[42rem]" />
            )}

            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5 backdrop-blur-xl">
                <p className="text-[11px] uppercase tracking-[0.32em] text-gold2/85">Disponibles para tu evento</p>
                <p className="mt-2 text-sm leading-7 text-text/90">
                  Agenda tu fecha con tiempo. Escríbenos por WhatsApp y te respondemos el mismo día.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              ['Respuesta rápida', 'WhatsApp directo'],
              ['Música en vivo', 'Para eventos especiales'],
              ['Disponibilidad', 'Toda la región'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm shadow-[0_10px_30px_rgba(0,0,0,.16)]">
                <p className="text-text font-semibold">{title}</p>
                <p className="mt-1 text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
