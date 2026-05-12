import { fetchContent, groupContent } from '@/lib/content';
import { SiteHeader } from '@/components/site-header';
import { HeroSection } from '@/components/hero-section';
import { ServicesGrid } from '@/components/services-grid';
import { GallerySection } from '@/components/gallery';
import { TestimonialsAudio } from '@/components/testimonials-audio';
import { ContactForm } from '@/components/contact-form';
import { SectionTitle } from '@/components/ui';
import { ChevronUp, MessageCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const content = groupContent(await fetchContent());
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-text">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,.05)_1px,transparent_1px)] bg-[size:120px_120px] opacity-30" />
      <SiteHeader />
      <HeroSection hero={content.hero} />

      <section id="nosotros" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:px-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold2/85">Sobre nosotros</p>
          <h2 className="mt-4 text-3xl font-semibold text-text md:text-5xl" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Tradición familiar con presencia premium</h2>
          <p className="mt-6 text-sm leading-8 text-muted md:text-base">
            Somos un negocio musical familiar enfocado en presentaciones de mariachi y trío musical para eventos sociales. Cuidamos la imagen, la puntualidad, la afinación y el trato profesional para que cada celebración se sienta especial.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {['Experiencia musical', 'Profesionalismo total', 'Tradición mexicana', 'Calidad en vivo'].map((item) => (
              <div key={item} className="rounded-2xl border border-line bg-surface2 p-4 text-sm text-muted">{item}</div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-line bg-surface2 p-6 shadow-glow">
            <p className="text-gold2">01</p>
            <h3 className="mt-4 text-xl font-semibold text-text" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Cuidamos cada detalle</h3>
            <p className="mt-3 text-sm leading-7 text-muted">Vestuario, repertorio y presencia escénica pensados para eventos formales y elegantes.</p>
          </div>
          <div className="rounded-[1.5rem] border border-line bg-surface2 p-6 shadow-glow">
            <p className="text-gold2">02</p>
            <h3 className="mt-4 text-xl font-semibold text-text" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Atención cercana</h3>
            <p className="mt-3 text-sm leading-7 text-muted">La comunicación es clara, rápida y humana desde la cotización hasta el evento.</p>
          </div>
          <div className="rounded-[1.5rem] border border-line bg-surface2 p-6 shadow-glow sm:col-span-2">
            <p className="text-gold2">03</p>
            <h3 className="mt-4 text-xl font-semibold text-text" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Listo para crecer contigo</h3>
            <p className="mt-3 text-sm leading-7 text-muted">El sitio está preparado para cambiar imágenes, videos, testimonios y mensajes desde el panel administrativo.</p>
          </div>
        </div>
      </section>

      <ServicesGrid />
      <GallerySection gallery={content.gallery} videos={content.videos} />

      <section id="videos" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionTitle eyebrow="Videos" title="Reproductor embebido y contenido editable" description="Agrega o reemplaza videos desde el panel admin y muéstralos aquí sin tocar el diseño." />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {content.videos.map((video) => (
            <article key={video.id} className="overflow-hidden rounded-[1.5rem] border border-line bg-surface2 shadow-glow">
              <div className="aspect-video bg-black">
                {video.embed_url ? (
                  <iframe src={video.embed_url} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                ) : (
                  <video className="h-full w-full object-cover" src={video.media_url || ''} controls />
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
      </section>

      <TestimonialsAudio testimonials={content.testimonials} />
      <ContactForm />

      <footer className="border-t border-line/40 bg-surface/95">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-3 md:px-8">
          <div>
            <p className="text-2xl font-semibold text-text" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Mariachi Luxe</p>
            <p className="mt-4 text-sm leading-7 text-muted">Mariachi y trío musical para bodas, serenatas, cumpleaños, XV años y eventos empresariales.</p>
          </div>
          <div className="text-sm text-muted">
            <p>Teléfono: +52 000 000 0000</p>
            <p className="mt-2">Correo: contacto@mariachi.com</p>
            <p className="mt-2">Ubicación: disponible para eventos locales y foráneos</p>
          </div>
          <div className="text-sm text-muted md:text-right">
            <a href="/admin" className="block text-gold2 transition hover:text-gold">Panel admin</a>
            <p className="mt-6">© 2026 Mariachi Luxe. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <a href="https://wa.me/5210000000000" target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-4 text-sm font-semibold text-white shadow-glow transition hover:scale-105">
        <MessageCircle className="h-5 w-5" /> WhatsApp
      </a>
      <a href="#inicio" className="fixed bottom-5 left-5 z-50 inline-flex items-center rounded-full border border-gold/25 bg-surface2 px-4 py-3 text-sm text-text shadow-glow hover:border-gold/50">
        <ChevronUp className="h-4 w-4" />
      </a>
    </main>
  );
}
