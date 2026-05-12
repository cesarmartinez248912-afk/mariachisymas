'use client';

import { X, Play } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { SiteContent } from '@/lib/content';

export function GallerySection({ gallery, videos }: { gallery: SiteContent[]; videos: SiteContent[] }) {
  const [selected, setSelected] = useState<SiteContent | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<SiteContent | null>(null);
  const firstVideo = useMemo(() => videos[0], [videos]);

  return (
    <>
      <section id="galeria" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold2/85">Galería</p>
            <h2 className="mt-4 text-3xl font-semibold text-text md:text-5xl" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Imágenes elegantes, administrables desde /admin</h2>
          </div>
          {firstVideo ? (
            <button onClick={() => setSelectedVideo(firstVideo)} className="hidden rounded-full border border-gold/30 px-4 py-2 text-sm text-text transition hover:bg-gold/10 md:inline-flex">
              <Play className="mr-2 h-4 w-4 text-gold2" /> Ver video destacado
            </button>
          ) : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item) => (
            <button key={item.id} onClick={() => setSelected(item)} className="group relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-line bg-surface2 text-left shadow-glow">
              <img src={item.media_url || 'https://images.unsplash.com/photo-1511192336575-5a79af67f3d7?auto=format&fit=crop&w=1400&q=80'} alt={item.title || 'Galería'} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-gold2/80">{item.section}</p>
                <h3 className="mt-2 text-lg font-semibold text-text">{item.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selected ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4" onClick={() => setSelected(null)}>
          <div className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-[1.5rem] border border-line bg-surface2 shadow-glow" onClick={(e) => e.stopPropagation()}>
            <button className="absolute right-4 top-4 z-10 rounded-full bg-black/70 p-2 text-text" onClick={() => setSelected(null)}>
              <X className="h-5 w-5" />
            </button>
            <div className="relative h-[80vh] w-[90vw] max-w-5xl">
              <img src={selected.media_url || 'https://images.unsplash.com/photo-1511192336575-5a79af67f3d7?auto=format&fit=crop&w=1400&q=80'} alt={selected.title || 'Imagen'} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      ) : null}

      {selectedVideo ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4" onClick={() => setSelectedVideo(null)}>
          <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-line bg-black shadow-glow" onClick={(e) => e.stopPropagation()}>
            <button className="absolute right-4 top-4 z-10 rounded-full bg-black/70 p-2 text-text" onClick={() => setSelectedVideo(null)}>
              <X className="h-5 w-5" />
            </button>
            {selectedVideo.embed_url ? (
              <iframe src={selectedVideo.embed_url} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            ) : (
              <video className="h-full w-full object-cover" src={selectedVideo.media_url || ''} controls autoPlay />
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
