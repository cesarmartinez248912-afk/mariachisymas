import { NextResponse } from 'next/server';
import { isAdminAuthed } from '@/lib/auth';
import { defaultContent, mapRow, type SiteContent } from '@/lib/content';
import { getNeonClient, hasNeonConfig } from '@/lib/neon/server';

let memoryStore: SiteContent[] = [...defaultContent];

async function requireAdmin() {
  if (!(await isAdminAuthed())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  return null;
}

function toPayload(body: Record<string, unknown>) {
  return {
    section: String(body.section ?? 'gallery') as SiteContent['section'],
    kind: String(body.kind ?? 'image') as SiteContent['kind'],
    title: body.title ? String(body.title) : null,
    description: body.description ? String(body.description) : null,
    media_url: body.media_url ? String(body.media_url) : null,
    embed_url: body.embed_url ? String(body.embed_url) : null,
    link_url: body.link_url ? String(body.link_url) : null,
    author_name: body.author_name ? String(body.author_name) : null,
    event_name: body.event_name ? String(body.event_name) : null,
    rating: body.rating !== undefined && body.rating !== '' ? Number(body.rating) : null,
    sort_order: body.sort_order !== undefined ? Number(body.sort_order) : 0,
    active: body.active === 'false' || body.active === false ? false : true,
    meta: body.meta && typeof body.meta === 'object' ? JSON.stringify(body.meta) : '{}',
  };
}

// ── GET ────────────────────────────────────────────────────────────────────────
export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  if (!hasNeonConfig()) {
    return NextResponse.json({ items: memoryStore });
  }

  const sql = getNeonClient();
  if (!sql) return NextResponse.json({ items: memoryStore });

  try {
    const rows = await sql`
      SELECT * FROM site_content ORDER BY sort_order ASC
    `;
    return NextResponse.json({ items: rows.map(mapRow) });
  } catch {
    return NextResponse.json({ error: 'Error cargando contenido' }, { status: 500 });
  }
}

// ── POST ───────────────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = (await req.json()) as Record<string, unknown>;
  const p = toPayload(body);

  if (!hasNeonConfig()) {
    const item: SiteContent = {
      id: crypto.randomUUID(),
      ...p,
      meta: p.meta ? JSON.parse(p.meta) : {},
    };
    memoryStore = [item, ...memoryStore];
    return NextResponse.json({ item });
  }

  const sql = getNeonClient();
  if (!sql) return NextResponse.json({ error: 'Neon no configurado' }, { status: 500 });

  try {
    const rows = await sql`
      INSERT INTO site_content
        (section, kind, title, description, media_url, embed_url, link_url,
         author_name, event_name, rating, sort_order, active, meta)
      VALUES
        (${p.section}, ${p.kind}, ${p.title}, ${p.description}, ${p.media_url},
         ${p.embed_url}, ${p.link_url}, ${p.author_name}, ${p.event_name},
         ${p.rating}, ${p.sort_order}, ${p.active}, ${p.meta})
      RETURNING *
    `;
    return NextResponse.json({ item: mapRow(rows[0]) });
  } catch {
    return NextResponse.json({ error: 'Error creando contenido' }, { status: 500 });
  }
}

// ── PUT ────────────────────────────────────────────────────────────────────────
export async function PUT(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = (await req.json()) as Record<string, unknown>;
  const id = body.id as string | undefined;
  if (!id) return NextResponse.json({ error: 'Falta id' }, { status: 400 });

  if (!hasNeonConfig()) {
    memoryStore = memoryStore.map((item) => {
      if (item.id !== id) return item;
      const updates = { ...item };
      if (body.section !== undefined) updates.section = String(body.section) as SiteContent['section'];
      if (body.kind !== undefined) updates.kind = String(body.kind) as SiteContent['kind'];
      if (body.title !== undefined) updates.title = body.title ? String(body.title) : null;
      if (body.description !== undefined) updates.description = body.description ? String(body.description) : null;
      if (body.media_url !== undefined) updates.media_url = body.media_url ? String(body.media_url) : null;
      if (body.embed_url !== undefined) updates.embed_url = body.embed_url ? String(body.embed_url) : null;
      if (body.link_url !== undefined) updates.link_url = body.link_url ? String(body.link_url) : null;
      if (body.author_name !== undefined) updates.author_name = body.author_name ? String(body.author_name) : null;
      if (body.event_name !== undefined) updates.event_name = body.event_name ? String(body.event_name) : null;
      if (body.rating !== undefined && body.rating !== '') updates.rating = Number(body.rating);
      if (body.sort_order !== undefined) updates.sort_order = Number(body.sort_order);
      if (body.active !== undefined) updates.active = body.active === 'false' || body.active === false ? false : true;
      return updates;
    });
    return NextResponse.json({ ok: true });
  }

  const sql = getNeonClient();
  if (!sql) return NextResponse.json({ error: 'Neon no configurado' }, { status: 500 });

  // Build dynamic SET clause only for provided fields
  const p = toPayload(body);

  try {
    const rows = await sql`
      UPDATE site_content SET
        section     = COALESCE(${body.section !== undefined ? p.section : null}::varchar, section),
        kind        = COALESCE(${body.kind !== undefined ? p.kind : null}::varchar, kind),
        title       = ${body.title !== undefined ? p.title : sql`title`},
        description = ${body.description !== undefined ? p.description : sql`description`},
        media_url   = ${body.media_url !== undefined ? p.media_url : sql`media_url`},
        embed_url   = ${body.embed_url !== undefined ? p.embed_url : sql`embed_url`},
        link_url    = ${body.link_url !== undefined ? p.link_url : sql`link_url`},
        author_name = ${body.author_name !== undefined ? p.author_name : sql`author_name`},
        event_name  = ${body.event_name !== undefined ? p.event_name : sql`event_name`},
        rating      = ${body.rating !== undefined ? p.rating : sql`rating`},
        sort_order  = COALESCE(${body.sort_order !== undefined ? p.sort_order : null}::integer, sort_order),
        active      = COALESCE(${body.active !== undefined ? p.active : null}::boolean, active),
        meta        = ${body.meta !== undefined ? p.meta : sql`meta`}
      WHERE id = ${id}
      RETURNING *
    `;
    if (!rows.length) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    return NextResponse.json({ ok: true, item: mapRow(rows[0]) });
  } catch {
    return NextResponse.json({ error: 'Error actualizando contenido' }, { status: 500 });
  }
}

// ── DELETE ─────────────────────────────────────────────────────────────────────
export async function DELETE(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Falta id' }, { status: 400 });

  if (!hasNeonConfig()) {
    memoryStore = memoryStore.filter((item) => item.id !== id);
    return NextResponse.json({ ok: true });
  }

  const sql = getNeonClient();
  if (!sql) return NextResponse.json({ error: 'Neon no configurado' }, { status: 500 });

  try {
    await sql`DELETE FROM site_content WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Error eliminando contenido' }, { status: 500 });
  }
}
