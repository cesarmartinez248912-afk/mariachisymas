import type { SiteContent } from '@/lib/content';
import { MessageCircle, Music4 } from 'lucide-react';

function Stars({ rating = 5 }: { rating?: number | null }) {
  return <span className="text-gold2">{'★'.repeat(rating || 5)}{'☆'.repeat(Math.max(0, 5 - (rating || 5)))}</span>;
}

export function TestimonialsAudio({ testimonials }: { testimonials: SiteContent[] }) {
  return (
    <section id="testimonios" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-20 md:px-8">
      <div data-reveal>
        <p className="text-[11px] uppercase tracking-[0.35em] text-gold2/85">Testimonios</p>
        <div className="mt-4 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-6 shadow-[0_14px_40px_rgba(0,0,0,.2)]">
            <h2 className="text-3xl font-semibold text-text" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Opiniones reales de clientes</h2>
            <div className="mt-6 grid gap-4">
              {testimonials.map((item, index) => (
                <article key={item.id} data-reveal style={{ transitionDelay: `${index * 60}ms` }} className="rounded-2xl border border-white/8 bg-[#111114]/70 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-text">{item.author_name}</h3>
                      <p className="text-sm text-muted">{item.event_name}</p>
                    </div>
                    <Stars rating={item.rating} />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-6 shadow-[0_14px_40px_rgba(0,0,0,.2)]">
            <div className="flex items-center gap-3 text-gold2">
              <Music4 className="h-5 w-5" />
              <h3 className="text-2xl font-semibold text-text" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Escucha un demo</h3>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted">Una muestra de nuestro repertorio para que sientas la calidad antes de contactarnos.</p>
            <div className="mt-6 rounded-2xl border border-white/8 bg-[#111114]/70 p-4">
              <audio controls className="w-full" src="/audio/demo.wav" />
            </div>
            <a href="#contacto" className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-transparent px-5 py-3 text-sm text-text transition hover:bg-gold/10">
              <MessageCircle className="h-4 w-4 text-gold2" /> Pedir información
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

