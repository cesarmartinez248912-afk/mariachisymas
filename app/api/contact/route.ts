import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(5),
  eventType: z.string().min(2),
  date: z.string().min(4),
  message: z.string().min(5),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Revisa los campos del mensaje.' }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    preview: true,
    message: 'El sitio ahora dirige el contacto por WhatsApp. Este endpoint quedó como compatibilidad.',
    data: parsed.data,
  });
}
