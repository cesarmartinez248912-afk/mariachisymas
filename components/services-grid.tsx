import { CalendarHeart, BriefcaseBusiness, PartyPopper, HeartHandshake, Mic2, Music2, Sparkles, Gift } from 'lucide-react';

const services = [
  { icon: Music2, title: 'Serenatas', text: 'Momentos íntimos con repertorio romántico y presencia impecable.' },
  { icon: HeartHandshake, title: 'Bodas', text: 'Acompañamiento ceremonial y festivo con un toque elegante.' },
  { icon: PartyPopper, title: 'Cumpleaños', text: 'Ambiente alegre y memorable para celebrar en grande.' },
  { icon: CalendarHeart, title: 'XV años', text: 'Entrada, vals y momentos especiales con música que emociona.' },
  { icon: BriefcaseBusiness, title: 'Eventos empresariales', text: 'Una experiencia sobria y premium para marcas y recepciones.' },
  { icon: Mic2, title: 'Trío romántico', text: 'Boleros y canciones inolvidables con interpretación cálida.' },
  { icon: Sparkles, title: 'Mariachi completo', text: 'Presencia contundente para grandes celebraciones y escenarios.' },
  { icon: Gift, title: 'Bautizos y posadas', text: 'Festejos familiares con el calor de la música tradicional mexicana.' },
];

export function ServicesGrid() {
  return (
    <section id="servicios" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-20 md:px-8">
      <div data-reveal className="mb-10 max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.35em] text-gold2/85">Servicios</p>
        <h2 className="mt-4 text-3xl font-semibold text-text md:text-5xl" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Presentaciones pensadas para eventos importantes</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <article
              key={service.title}
              data-reveal
              style={{ transitionDelay: `${index * 70}ms` }}
              className="group rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-6 shadow-[0_14px_40px_rgba(0,0,0,.2)] transition duration-300 hover:-translate-y-1 hover:border-gold/25 hover:bg-white/[0.05]"
            >
              <div className="inline-flex rounded-2xl border border-gold/15 bg-gold/8 p-3 text-gold2 transition group-hover:scale-105">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-text" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{service.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
