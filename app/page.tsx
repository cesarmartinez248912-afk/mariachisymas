import { fetchContent, groupContent } from '@/lib/content';
import { SiteHeader } from '@/components/site-header';
import { HeroSection } from '@/components/hero-section';
import { ServicesGrid } from '@/components/services-grid';
import { GallerySection } from '@/components/gallery';
import { TestimonialsAudio } from '@/components/testimonials-audio';
import { ContactForm } from '@/components/contact-form';
import { ScrollReveal } from '@/components/scroll-reveal';
import { MessageCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const content = groupContent(await fetchContent());
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-text">
      <ScrollReveal />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:120px_120px] opacity-30" />
      <div className="pointer-events-none absolute -left-24 top-36 h-72 w-72 rounded-full bg-gold/10 blur-3xl animate-floatSlow" />
      <div className="pointer-events-none absolute right-[-8rem] top-[48rem] h-80 w-80 rounded-full bg-white/5 blur-3xl animate-drift" />

      <SiteHeader />
      <HeroSection hero={content.hero} />

      <section id="nosotros" className="mx-auto grid max-w-7xl scroll-mt-28 gap-10 px-5 py-20 md:grid-cols-2 md:px-8">
        <div data-reveal>
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold2/85">Sobre nosotros</p>
          <h2 className="mt-4 text-3xl font-semibold text-text md:text-5xl" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Tradición familiar con una presentación más premium</h2>
          <p className="mt-6 text-sm leading-8 text-muted md:text-base">
            Somos un negocio musical familiar enfocado en presentaciones de mariachi y trío musical para eventos sociales. Cuidamos la imagen, la puntualidad, la afinación y el trato profesional para que cada celebración se sienta especial.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {['Experiencia musical', 'Profesionalismo total', 'Tradición mexicana', 'Calidad en vivo'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-muted transition duration-300 hover:-translate-y-1 hover:bg-white/[0.05]">{item}</div>
            ))}
          </div>
        </div>
        <div data-reveal className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-6 shadow-[0_14px_40px_rgba(0,0,0,.2)] transition duration-300 hover:-translate-y-1">
            <p className="text-gold2">01</p>
            <h3 className="mt-4 text-xl font-semibold text-text" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Cuidamos cada detalle</h3>
            <p className="mt-3 text-sm leading-7 text-muted">Vestuario, repertorio y presencia escénica pensados para eventos formales y elegantes.</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-6 shadow-[0_14px_40px_rgba(0,0,0,.2)] transition duration-300 hover:-translate-y-1">
            <p className="text-gold2">02</p>
            <h3 className="mt-4 text-xl font-semibold text-text" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Atención cercana</h3>
            <p className="mt-3 text-sm leading-7 text-muted">La comunicación es clara, rápida y humana desde el primer mensaje hasta el evento.</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-6 shadow-[0_14px_40px_rgba(0,0,0,.2)] transition duration-300 hover:-translate-y-1 sm:col-span-2">
            <p className="text-gold2">03</p>
            <h3 className="mt-4 text-xl font-semibold text-text" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Listo para crecer contigo</h3>
            <p className="mt-3 text-sm leading-7 text-muted">El sitio está preparado para cambiar imágenes, videos, testimonios y mensajes sin tocar el diseño principal.</p>
          </div>
        </div>
      </section>

      <ServicesGrid />
      <GallerySection gallery={content.gallery} videos={content.videos} />

      <section id="videos" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-20 md:px-8">
        <div data-reveal>
          <div className="mb-10 max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold2/85">Videos</p>
            <h2 className="mt-4 text-3xl font-semibold text-text md:text-5xl" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Míranos en acción</h2>
            <p className="mt-4 text-sm leading-7 text-muted md:text-base">Presentaciones reales para que veas nuestra calidad antes de contactarnos.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {content.videos.map((video, index) => (
              <article key={video.id} data-reveal style={{ transitionDelay: `${index * 80}ms` }} className="overflow-hidden rounded-[1.5rem] border border-white/8 bg-white/[0.03] shadow-[0_14px_40px_rgba(0,0,0,.2)]">
                <div className="group relative aspect-video overflow-hidden bg-black">
                  {video.media_url && video.kind === 'video' && !/youtube\.com|youtu\.be/i.test(video.media_url) ? (
                    <video className="h-full w-full object-cover transition duration-700 group-hover:scale-105" src={video.media_url} controls />
                  ) : (
                    <>
                      <img
                        src={video.media_url || 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1800&q=80'}
                        alt={video.title || 'Video'}
                        className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_10%,rgba(0,0,0,.55))]" />
                      {video.embed_url ? (
                        <a href={video.embed_url} target="_blank" rel="noreferrer" className="absolute inset-0 grid place-items-center" aria-label={`Abrir ${video.title || 'video'}`}>
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:scale-105">
                            Ver video
                          </span>
                        </a>
                      ) : null}
                    </>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-gold2/80">Video</p>
                  <h3 className="mt-2 text-xl font-semibold text-text" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>{video.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{video.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsAudio testimonials={content.testimonials} />
      <ContactForm />

      <footer className="border-t border-white/8 bg-[#0d0d10]/95">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-3 md:px-8">
          <div>
            <p className="text-2xl font-semibold text-text" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Mariachi Luxe</p>
            <p className="mt-4 text-sm leading-7 text-muted">Mariachi y trío musical para bodas, serenatas, cumpleaños, XV años y eventos empresariales.</p>
          </div>
          <div className="text-sm text-muted">
            <p>Teléfono: +52 000 000 0000</p>
            <p className="mt-2">Contacto: WhatsApp directo</p>
            <p className="mt-2">Ubicación: disponible para eventos locales y foráneos</p>
          </div>
          <div className="text-sm text-muted md:text-right">
            <p className="text-gold2">Contacto directo por WhatsApp</p>
            <p className="mt-6">© 2026 Mariachi Luxe. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <a href="https://wa.me/5210000000000" target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-4 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(37,211,102,.3)] transition hover:scale-105">
        <MessageCircle className="h-5 w-5" /> WhatsApp
      </a>
    </main>
  );
}
