import { MessageCircle, Phone, MapPin, Clock3 } from 'lucide-react';

const phoneNumber = '5210000000000';

export function ContactForm() {
  return (
    <section id="contacto" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-20 md:px-8">
      <div data-reveal className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
        <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-8 shadow-[0_14px_40px_rgba(0,0,0,.2)]">
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold2/85">Contacto</p>
          <h2 className="mt-4 text-3xl font-semibold text-text" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Escríbenos por WhatsApp</h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Sin formularios ni correos. Solo toca el botón y se abrirá WhatsApp para mandarnos tu mensaje directo.
          </p>
          <div className="mt-8 space-y-4 text-sm text-muted">
            <div className="rounded-2xl border border-white/8 bg-[#111114]/70 p-4">
              <Phone className="mr-2 inline h-4 w-4 text-gold2" /> Teléfono: +52 000 000 0000
            </div>
            <div className="rounded-2xl border border-white/8 bg-[#111114]/70 p-4">
              <MapPin className="mr-2 inline h-4 w-4 text-gold2" /> Cobertura: eventos privados y sociales
            </div>
            <div className="rounded-2xl border border-white/8 bg-[#111114]/70 p-4">
              <Clock3 className="mr-2 inline h-4 w-4 text-gold2" /> Respuesta rápida por mensaje
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-8 shadow-[0_14px_40px_rgba(0,0,0,.2)]">
          <div className="rounded-[1.4rem] border border-gold/15 bg-[radial-gradient(circle_at_top,rgba(212,175,55,.12),transparent_52%),linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,0))] p-8">
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold2/85">Mensaje directo</p>
            <h3 className="mt-4 text-3xl font-semibold text-text" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Abre WhatsApp y envíanos tu fecha
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
              Cuéntanos el tipo de evento, la fecha, la zona y cuántas personas asistirán. Te respondemos con disponibilidad y detalles.
            </p>
            <a
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hola, quiero información para mi evento.')}`}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-7 py-4 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(37,211,102,.3)] transition hover:scale-[1.02]"
            >
              <MessageCircle className="h-5 w-5" />
              Enviar mensaje por WhatsApp
            </a>
            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-muted">Sin correo · Sin cotización por email · Solo WhatsApp</p>
          </div>
        </div>
      </div>
    </section>
  );
}
