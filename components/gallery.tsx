'use client';

import { X, Play } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { SiteContent } from '@/lib/content';

function isYouTubeUrl(url?: string | null) {
  return Boolean(url && /youtube\.com|youtu\.be/i.test(url));
}

export function GallerySection({ gallery, videos }: { gallery: SiteContent[]; videos: SiteContent[] }) {
  const [selected, setSelected] = useState<SiteContent | null>(null);
  const firstVideo = useMemo(() => videos[0], [videos]);

  return (
    <>
      <section id="galeria" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-20 md:px-8">
        <div data-reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold2/85">Galería</p>
            <h2 className="mt-4 text-3xl font-semibold text-text md:text-5xl" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Imágenes y momentos con estética limpia</h2>
          </div>
          {firstVideo ? (
            <button onClick={() => setSelected(firstVideo)} className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-text transition hover:bg-white/[0.06]">
              <Play className="mr-2 h-4 w-4 text-gold2" /> Ver video destacado
            </button>
          ) : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              data-reveal
              style={{ transitionDelay: `${index * 70}ms` }}
              className="group relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/8 bg-white/[0.03] text-left shadow-[0_14px_40px_rgba(0,0,0,.2)]"
            >
              <img src={item.media_url || 'https://images.unsplash.com/photo-1511192336575-5a79af67f3d7?auto=format&fit=crop&w=1400&q=80'} alt={item.title || 'Galería'} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(0,0,0,.7))]" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[11px] uppercase tracking-[0.25em] text-gold2/80">{item.section}</p>
                <h3 className="mt-2 text-lg font-semibold text-text">{item.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selected ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#101014] shadow-[0_30px_80px_rgba(0,0,0,.5)]" onClick={(e) => e.stopPropagation()}>
            <button className="absolute right-4 top-4 z-10 rounded-full bg-black/70 p-2 text-text" onClick={() => setSelected(null)}>
              <X className="h-5 w-5" />
            </button>
            <div className="relative min-h-[52vh] w-[90vw] max-w-5xl bg-black">
              <img src={selected.media_url || 'https://images.unsplash.com/photo-1511192336575-5a79af67f3d7?auto=format&fit=crop&w=1400&q=80'} alt={selected.title || 'Imagen'} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      ) : null}

      {selected?.kind === 'video' ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#101014] shadow-[0_30px_80px_rgba(0,0,0,.5)]" onClick={(e) => e.stopPropagation()}>
            <button className="absolute right-4 top-4 z-10 rounded-full bg-black/70 p-2 text-text" onClick={() => setSelected(null)}>
              <X className="h-5 w-5" />
            </button>

            {selected.media_url && !isYouTubeUrl(selected.media_url) ? (
              <video className="h-full w-full object-cover" src={selected.media_url} controls autoPlay />
            ) : (
              <div className="grid min-h-[60vh] place-items-center p-10 text-center">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-gold2/85">Video</p>
                  <h3 className="mt-4 text-2xl font-semibold text-text" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                    {selected.title || 'Video destacado'}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    Para evitar bloqueos del navegador, este video se abre como enlace externo.
                  </p>
                  {selected.embed_url ? (
                    <a href={selected.embed_url} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black transition hover:bg-gold2">
                      Abrir video
                    </a>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
