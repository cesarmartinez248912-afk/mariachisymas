import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { ID, Query } from 'node-appwrite';
import { isAdminAuthed } from '@/lib/auth';
import { defaultContent, type SiteContent } from '@/lib/content';
import { getAppwriteDatabasesClient, hasAppwriteConfig, APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID } from '@/lib/appwrite/server';

let memoryStore: SiteContent[] = [...defaultContent];

async function requireAdmin() {
  if (!(await isAdminAuthed())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  return null;
}

function toPayload(body: Record<string, unknown>) {
  const payload: Record<string, unknown> = {
    section: String(body.section ?? 'gallery') as SiteContent['section'],
    kind: String(body.kind ?? 'image') as SiteContent['kind'],
    title: body.title ? String(body.title) : '',
    description: body.description ? String(body.description) : '',
    media_url: body.media_url ? String(body.media_url) : '',
    embed_url: body.embed_url ? String(body.embed_url) : '',
    link_url: body.link_url ? String(body.link_url) : '',
    author_name: body.author_name ? String(body.author_name) : '',
    event_name: body.event_name ? String(body.event_name) : '',
    sort_order: body.sort_order !== undefined ? Number(body.sort_order) : 0,
    active: body.active === 'false' ? false : body.active === false ? false : true,
    meta: body.meta && typeof body.meta === 'object' ? JSON.stringify(body.meta) : JSON.stringify({}),
  };

  if (body.rating !== undefined && body.rating !== '') {
    payload.rating = Number(body.rating);
  }

  return payload;
}

function normalizeUpdate(body: Record<string, unknown>) {
  const payload: Record<string, unknown> = {};

  if (body.section !== undefined) payload.section = String(body.section);
  if (body.kind !== undefined) payload.kind = String(body.kind);
  if (body.title !== undefined) payload.title = body.title ? String(body.title) : '';
  if (body.description !== undefined) payload.description = body.description ? String(body.description) : '';
  if (body.media_url !== undefined) payload.media_url = body.media_url ? String(body.media_url) : '';
  if (body.embed_url !== undefined) payload.embed_url = body.embed_url ? String(body.embed_url) : '';
  if (body.link_url !== undefined) payload.link_url = body.link_url ? String(body.link_url) : '';
  if (body.author_name !== undefined) payload.author_name = body.author_name ? String(body.author_name) : '';
  if (body.event_name !== undefined) payload.event_name = body.event_name ? String(body.event_name) : '';
  if (body.rating !== undefined && body.rating !== '') payload.rating = Number(body.rating);
  if (body.sort_order !== undefined) payload.sort_order = Number(body.sort_order);
  if (body.active !== undefined) payload.active = body.active === 'false' ? false : body.active === false ? false : true;
  if (body.meta !== undefined) payload.meta = body.meta && typeof body.meta === 'object' ? JSON.stringify(body.meta) : JSON.stringify({});

  return payload;
}

function fromAppwriteDocument(doc: any): SiteContent {
  let meta: Record<string, unknown> = {};
  if (typeof doc.meta === 'string' && doc.meta.trim()) {
    try {
      const parsed = JSON.parse(doc.meta);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        meta = parsed as Record<string, unknown>;
      }
    } catch {
      meta = {};
    }
  } else if (doc.meta && typeof doc.meta === 'object' && !Array.isArray(doc.meta)) {
    meta = doc.meta as Record<string, unknown>;
  }

  return {
    id: doc.$id,
    section: doc.section,
    kind: doc.kind,
    title: doc.title ? String(doc.title) : null,
    description: doc.description ? String(doc.description) : null,
    media_url: doc.media_url ? String(doc.media_url) : null,
    embed_url: doc.embed_url ? String(doc.embed_url) : null,
    link_url: doc.link_url ? String(doc.link_url) : null,
    author_name: doc.author_name ? String(doc.author_name) : null,
    event_name: doc.event_name ? String(doc.event_name) : null,
    rating: doc.rating ?? null,
    sort_order: Number(doc.sort_order ?? 0),
    active: Boolean(doc.active),
    meta,
  };
}

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  if (!hasAppwriteConfig()) {
    return NextResponse.json({ items: memoryStore });
  }

  const databases = getAppwriteDatabasesClient();
  if (!databases) return NextResponse.json({ items: memoryStore });

  try {
    const response = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      [Query.orderAsc('sort_order')],
    );

    return NextResponse.json({ items: response.documents.map(fromAppwriteDocument) });
  } catch (error) {
    return NextResponse.json({ error: 'Error cargando contenido' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const body = (await req.json()) as Record<string, unknown>;

  const payload = toPayload(body);

  if (!hasAppwriteConfig()) {
    const item: SiteContent = {
      id: crypto.randomUUID(),
      section: payload.section as SiteContent['section'],
      kind: payload.kind as SiteContent['kind'],
      title: payload.title as string,
      description: payload.description as string,
      media_url: payload.media_url as string,
      embed_url: payload.embed_url as string,
      link_url: payload.link_url as string,
      author_name: payload.author_name as string,
      event_name: payload.event_name as string,
      rating:
        typeof payload.rating === 'number'
          ? payload.rating
          : payload.rating
            ? Number(payload.rating)
            : null,
      sort_order: Number(payload.sort_order ?? 0),
      active: payload.active as boolean,
      meta: payload.meta ? JSON.parse(payload.meta as string) : {},
    };
    memoryStore = [item, ...memoryStore];
    return NextResponse.json({ item });
  }

  const databases = getAppwriteDatabasesClient();
  if (!databases) return NextResponse.json({ error: 'Appwrite no configurado' }, { status: 500 });
  try {
    const data = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      ID.unique(),
      payload,
    );
    return NextResponse.json({ item: fromAppwriteDocument(data) });
  } catch (error) {
    return NextResponse.json({ error: 'Error creando contenido' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const body = await req.json();
  const id = body.id as string | undefined;
  if (!id) return NextResponse.json({ error: 'Falta id' }, { status: 400 });

  const normalizedUpdate = normalizeUpdate(body as Record<string, unknown>);

  if (!hasAppwriteConfig()) {
    memoryStore = memoryStore.map((item) => {
      if (item.id !== id) return item;
      const nextItem = { ...item, ...normalizedUpdate } as SiteContent;
      if (typeof nextItem.meta === 'string') {
        try { nextItem.meta = JSON.parse(nextItem.meta); } catch { nextItem.meta = {}; }
      }
      return nextItem;
    });
    return NextResponse.json({ ok: true });
  }

  const databases = getAppwriteDatabasesClient();
  if (!databases) return NextResponse.json({ error: 'Appwrite no configurado' }, { status: 500 });
  try {
    const updated = await databases.updateDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      id,
      normalizedUpdate,
    );
    return NextResponse.json({ ok: true, item: fromAppwriteDocument(updated) });
  } catch (error) {
    return NextResponse.json({ error: 'Error actualizando contenido' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Falta id' }, { status: 400 });

  if (!hasAppwriteConfig()) {
    memoryStore = memoryStore.filter((item) => item.id !== id);
    return NextResponse.json({ ok: true });
  }

  const databases = getAppwriteDatabasesClient();
  if (!databases) return NextResponse.json({ error: 'Appwrite no configurado' }, { status: 500 });
  try {
    await databases.deleteDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      id,
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error eliminando contenido' }, { status: 500 });
  }
}
