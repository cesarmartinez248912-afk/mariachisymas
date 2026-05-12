'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Button, Input, Textarea } from '@/components/ui';
import { Plus, Trash2, Edit3, LogOut, ShieldCheck } from 'lucide-react';
import type { SiteContent } from '@/lib/content';

type Props = { initialAuthed: boolean };

const emptyItem: Partial<SiteContent> = {
  section: 'gallery',
  kind: 'image',
  title: '',
  description: '',
  media_url: '',
  embed_url: '',
  link_url: '',
  author_name: '',
  event_name: '',
  rating: 5,
  sort_order: 0,
  active: true,
};

export function AdminClient({ initialAuthed }: Props) {
  const [authed, setAuthed] = useState(initialAuthed);
  const [password, setPassword] = useState('');
  const [items, setItems] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Partial<SiteContent> | null>(null);

  const title = useMemo(() => (editing?.id ? 'Editar contenido' : 'Nuevo contenido'), [editing?.id]);

  async function loadContent() {
    setLoading(true);
    const res = await fetch('/api/admin/content', { credentials: 'include' });
    const data = await res.json().catch(() => ({}));
    if (res.ok) setItems(data.items || []);
    setLoading(false);
  }

  useEffect(() => {
    if (authed) loadContent();
  }, [authed]);

  async function login() {
    setError(null);
    setNotice(null);
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || 'No se pudo iniciar sesión');
      return;
    }
    setAuthed(true);
    setPassword('');
    setNotice('Acceso concedido.');
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthed(false);
    setItems([]);
  }

  async function saveItem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const method = editing?.id ? 'PUT' : 'POST';
    const body = editing?.id ? { ...payload, id: editing.id } : payload;
    const res = await fetch('/api/admin/content', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || 'No se pudo guardar');
      return;
    }
    setEditing(null);
    setNotice('Contenido guardado.');
    loadContent();
  }

  async function removeItem(id: string) {
    const res = await fetch('/api/admin/content', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
      credentials: 'include',
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || 'No se pudo eliminar');
      return;
    }
    setNotice('Elemento eliminado.');
    loadContent();
  }

  if (!authed) {
    return (
      <main className="min-h-screen bg-background px-5 py-10 text-text">
        <div className="mx-auto max-w-md rounded-[1.5rem] border border-line bg-surface2 p-8 shadow-glow">
          <div className="flex items-center gap-3 text-gold2"><ShieldCheck className="h-5 w-5" /> Acceso admin</div>
          <h1 className="mt-4 text-3xl font-semibold" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Ingresa tu contraseña</h1>
          <p className="mt-3 text-sm leading-7 text-muted">El panel vive en <span className="text-gold2">/admin</span> y protege el contenido del sitio.</p>
          <form onSubmit={(e) => { e.preventDefault(); void login(); }}>
            <Input className="mt-6" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" className="mt-4 w-full bg-gold px-5 py-3 text-black hover:bg-gold2">Entrar</Button>
          </form>
          {error ? <p className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</p> : null}
          {notice ? <p className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-200">{notice}</p> : null}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-text md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 rounded-[1.5rem] border border-line bg-surface2 p-6 shadow-glow md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold2/85">Panel de administración</p>
            <h1 className="mt-3 text-3xl font-semibold" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Gestiona imágenes, videos y testimonios</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setEditing({ ...emptyItem })} className="bg-gold px-5 py-3 text-black hover:bg-gold2"><Plus className="mr-2 h-4 w-4" /> Nuevo</Button>
            <Button onClick={logout} className="border border-gold/35 bg-transparent px-5 py-3 text-text hover:bg-gold/10"><LogOut className="mr-2 h-4 w-4" /> Salir</Button>
          </div>
        </div>

        {notice ? <p className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">{notice}</p> : null}
        {error ? <p className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</p> : null}

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.2fr]">
          <form key={editing?.id || 'new'} onSubmit={saveItem} className="rounded-[1.5rem] border border-line bg-surface2 p-6 shadow-glow">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>{title}</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <select name="section" defaultValue={editing?.section || 'gallery'} className="w-full rounded-2xl border border-line bg-surface2 px-4 py-3 text-sm text-text outline-none focus:border-gold/60">
                <option value="hero">Hero</option>
                <option value="gallery">Galería</option>
                <option value="videos">Videos</option>
                <option value="testimonials">Testimonios</option>
              </select>
              <select name="kind" defaultValue={editing?.kind || 'image'} className="w-full rounded-2xl border border-line bg-surface2 px-4 py-3 text-sm text-text outline-none focus:border-gold/60">
                <option value="image">Imagen</option>
                <option value="video">Video</option>
                <option value="quote">Testimonio</option>
                <option value="audio">Audio</option>
                <option value="text">Texto</option>
              </select>
              <Input name="title" defaultValue={editing?.title || ''} placeholder="Título" />
              <Input name="author_name" defaultValue={editing?.author_name || ''} placeholder="Autor / Cliente" />
              <Input name="event_name" defaultValue={editing?.event_name || ''} placeholder="Evento" />
              <Input name="rating" type="number" min="1" max="5" defaultValue={editing?.rating || 5} placeholder="Rating" />
              <Input name="media_url" defaultValue={editing?.media_url || ''} placeholder="URL de imagen o video" className="md:col-span-2" />
              <Input name="embed_url" defaultValue={editing?.embed_url || ''} placeholder="Embed URL (YouTube)" className="md:col-span-2" />
              <Input name="link_url" defaultValue={editing?.link_url || ''} placeholder="Link URL" className="md:col-span-2" />
              <Input name="sort_order" type="number" defaultValue={editing?.sort_order ?? 0} placeholder="Orden" />
              <select name="active" defaultValue={editing?.active === false ? 'false' : 'true'} className="w-full rounded-2xl border border-line bg-surface2 px-4 py-3 text-sm text-text outline-none focus:border-gold/60">
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
            <Textarea name="description" defaultValue={editing?.description || ''} placeholder="Descripción" className="mt-4" rows={5} />
            <div className="mt-5 flex gap-3">
              <Button type="submit" className="bg-gold px-5 py-3 text-black hover:bg-gold2">Guardar</Button>
              <Button type="button" onClick={() => setEditing(null)} className="border border-gold/35 bg-transparent px-5 py-3 text-text hover:bg-gold/10">Cancelar</Button>
            </div>
            <p className="mt-4 text-xs leading-6 text-muted">Usa <span className="text-gold2">section</span>: hero, gallery, videos, testimonials.</p>
          </form>

          <div className="rounded-[1.5rem] border border-line bg-surface2 p-6 shadow-glow">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Contenido actual</h2>
              <span className="text-sm text-muted">{loading ? 'Cargando…' : `${items.length} elementos`}</span>
            </div>
            <div className="mt-5 grid gap-4">
              {items.map((item) => (
                <article key={item.id} className="rounded-2xl border border-line bg-background/70 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.3em] text-gold2/80">{item.section} · {item.kind}</p>
                      <h3 className="mt-1 text-lg font-semibold text-text">{item.title || '(Sin título)'}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted ">{item.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setEditing(item)} className="rounded-full border border-gold/25 p-2 text-gold2"><Edit3 className="h-4 w-4" /></button>
                      <button type="button" onClick={() => removeItem(item.id)} className="rounded-full border border-red-500/25 p-2 text-red-300"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                </article>
              ))}
              {!items.length ? <p className="rounded-2xl border border-dashed border-line p-6 text-sm text-muted">No hay contenido todavía.</p> : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
