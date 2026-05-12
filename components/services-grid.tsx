import { CalendarHeart, BriefcaseBusiness, PartyPopper, HeartHandshake, Mic2, Music2, Sparkles } from 'lucide-react';

const services = [
  { icon: Music2, title: 'Serenatas', text: 'Momentos íntimos con repertorio romántico y presentación impecable.' },
  { icon: HeartHandshake, title: 'Bodas', text: 'Acompañamiento ceremonial y festivo con presencia elegante.' },
  { icon: PartyPopper, title: 'Cumpleaños', text: 'Ambiente alegre y memorable para celebrar en grande.' },
  { icon: CalendarHeart, title: 'XV años', text: 'Entrada, vals y momento especial con música que emociona.' },
  { icon: BriefcaseBusiness, title: 'Eventos empresariales', text: 'Una experiencia sobria y premium para marcas y recepciones.' },
  { icon: Mic2, title: 'Trío romántico', text: 'Boleros y canciones inolvidables con interpretación cálida.' },
  { icon: Sparkles, title: 'Mariachi completo', text: 'Presencia contundente para grandes celebraciones y escenarios.' },
];

export function ServicesGrid() {
  return (
    <section id="servicios" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.35em] text-gold2/85">Servicios</p>
        <h2 className="mt-4 text-3xl font-semibold text-text md:text-5xl" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Presentaciones diseñadas para eventos importantes</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article key={service.title} className="rounded-[1.5rem] border border-line bg-surface2 p-6 shadow-glow transition hover:-translate-y-1 hover:border-gold/35">
              <Icon className="h-7 w-7 text-gold2" />
              <h3 className="mt-5 text-xl font-semibold text-text" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{service.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
