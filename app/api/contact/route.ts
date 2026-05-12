import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { escapeHtml } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email(),
  eventType: z.string().min(2),
  date: z.string().min(4),
  subject: z.string().optional().default('Solicitud de información'),
  message: z.string().min(5),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Revisa los campos del formulario.' }, { status: 400 });
  }

  const { name, phone, email, eventType, date, subject, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL || 'contacto@mariachi.com';

  if (!apiKey) {
    return NextResponse.json({ ok: true, preview: true, message: 'RESEND_API_KEY no configurada. El envío quedó en modo demostración.' });
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from: 'Mariachi Luxe <onboarding@resend.dev>',
    to,
    replyTo: email,
    subject: subject || `Nueva solicitud: ${eventType}`,
    text: `Nombre: ${name}\nTeléfono: ${phone}\nCorreo: ${email}\nEvento: ${eventType}\nFecha: ${date}\n\n${message}`,
    html: `
      <h2>Nueva solicitud de cotización</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
      <p><strong>Evento:</strong> ${escapeHtml(eventType)}</p>
      <p><strong>Fecha:</strong> ${escapeHtml(date)}</p>
      <p><strong>Mensaje:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
    `,
  });

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
