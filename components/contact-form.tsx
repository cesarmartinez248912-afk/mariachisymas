'use client';

import { useState, type FormEvent } from 'react';
import { Button, Input, Textarea } from './ui';

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    setError(null);
    const payload = Object.fromEntries(formData.entries());
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data?.error || 'No se pudo enviar el mensaje.');
      return;
    }
    setMessage('Mensaje enviado. Te responderemos pronto.');
    (document.getElementById('contact-form') as HTMLFormElement | null)?.reset();
  }

  return (
    <section id="contacto" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
        <div className="rounded-[1.5rem] border border-line bg-surface2 p-8 shadow-glow">
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold2/85">Contacto</p>
          <h2 className="mt-4 text-3xl font-semibold text-text" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Solicita disponibilidad y cotización</h2>
          <p className="mt-4 text-sm leading-7 text-muted">El formulario envía el mensaje por Resend al correo configurado. Puedes dejar lista la página para recibir solicitudes reales.</p>
          <div className="mt-8 space-y-4 text-sm text-muted">
            <div className="rounded-2xl border border-line bg-background/70 p-4">Teléfono: +52 000 000 0000</div>
            <div className="rounded-2xl border border-line bg-background/70 p-4">Correo: contacto@mariachi.com</div>
            <div className="rounded-2xl border border-line bg-background/70 p-4">Cobertura: eventos privados y sociales</div>
          </div>
        </div>

        <form
          id="contact-form"
          onSubmit={async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            await onSubmit(new FormData(e.currentTarget));
          }}
          className="rounded-[1.5rem] border border-line bg-surface2 p-8 shadow-glow"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Input name="name" placeholder="Nombre" required />
            <Input name="phone" placeholder="Teléfono" required />
            <Input name="email" type="email" placeholder="Correo" required />
            <Input name="eventType" placeholder="Tipo de evento" required />
            <Input name="date" type="date" required />
            <Input name="subject" placeholder="Asunto" />
          </div>
          <Textarea name="message" placeholder="Cuéntanos fecha, ubicación y detalles del evento" rows={5} required className="mt-4" />
          <div className="mt-5 flex items-center gap-3">
            <Button type="submit" className="bg-gold px-7 py-3 text-sm text-black hover:bg-gold2" disabled={loading}>{loading ? 'Enviando…' : 'Enviar solicitud'}</Button>
            <span className="text-sm text-muted">Respuesta por correo profesional.</span>
          </div>
          {message ? <p className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">{message}</p> : null}
          {error ? <p className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</p> : null}
        </form>
      </div>
    </section>
  );
}
