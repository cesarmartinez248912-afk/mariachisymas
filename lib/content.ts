import { Query } from 'node-appwrite';
import { getAppwriteDatabasesClient, hasAppwriteConfig, APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID } from './appwrite/server';

export type ContentSection = 'hero' | 'gallery' | 'videos' | 'testimonials' | 'settings';
export type ContentKind = 'image' | 'video' | 'text' | 'quote' | 'audio';

export type SiteContent = {
  id: string;
  section: ContentSection;
  kind: ContentKind;
  title: string | null;
  description: string | null;
  media_url: string | null;
  embed_url: string | null;
  link_url: string | null;
  author_name: string | null;
  event_name: string | null;
  rating: number | null;
  sort_order: number;
  active: boolean;
  meta: Record<string, unknown>;
};

export const defaultContent: SiteContent[] = [
  {
    id: 'demo-hero-image', section: 'hero', kind: 'image', title: 'Mariachi en escenario elegante', description: 'Imagen hero', media_url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1800&q=80', embed_url: null, link_url: null, author_name: null, event_name: null, rating: null, sort_order: 0, active: true, meta: {},
  },
  {
    id: 'demo-gallery-1', section: 'gallery', kind: 'image', title: 'Presentación en boda', description: 'Galería 1', media_url: 'https://images.unsplash.com/photo-1524594157360-9e9f2f4e4db0?auto=format&fit=crop&w=1400&q=80', embed_url: null, link_url: null, author_name: null, event_name: null, rating: null, sort_order: 1, active: true, meta: {},
  },
  {
    id: 'demo-gallery-2', section: 'gallery', kind: 'image', title: 'Trío romántico', description: 'Galería 2', media_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=80', embed_url: null, link_url: null, author_name: null, event_name: null, rating: null, sort_order: 2, active: true, meta: {},
  },
  {
    id: 'demo-video-1', section: 'videos', kind: 'video', title: 'Video de presentación', description: 'YouTube embed', media_url: null, embed_url: 'https://www.youtube.com/embed/ScMzIvxBSi4', link_url: null, author_name: null, event_name: null, rating: null, sort_order: 1, active: true, meta: {},
  },
  {
    id: 'demo-testimonial-1', section: 'testimonials', kind: 'quote', title: 'Muy profesionales y puntuales', description: 'Llegaron impecables y la música fue excelente.', media_url: null, embed_url: null, link_url: null, author_name: 'María Fernanda', event_name: 'Boda', rating: 5, sort_order: 1, active: true, meta: {},
  },
];

function parseMeta(meta: unknown): Record<string, unknown> {
  if (meta && typeof meta === 'object' && !Array.isArray(meta)) {
    return meta as Record<string, unknown>;
  }

  if (typeof meta === 'string' && meta.trim()) {
    try {
      const parsed = JSON.parse(meta);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      return {};
    }
  }

  return {};
}

function mapDocument(doc: any): SiteContent {
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
    meta: parseMeta(doc.meta),
  };
}

export async function fetchContent(): Promise<SiteContent[]> {
  if (!hasAppwriteConfig()) return defaultContent;

  const databases = getAppwriteDatabasesClient();
  if (!databases) return defaultContent;

  try {
    const response = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      [Query.orderAsc('section'), Query.orderAsc('sort_order')],
    );

    return response.documents.map(mapDocument);
  } catch {
    return defaultContent;
  }
}

export function groupContent(items: SiteContent[]) {
  return {
    hero: items.filter((item) => item.section === 'hero' && item.active).sort((a, b) => a.sort_order - b.sort_order),
    gallery: items.filter((item) => item.section === 'gallery' && item.active).sort((a, b) => a.sort_order - b.sort_order),
    videos: items.filter((item) => item.section === 'videos' && item.active).sort((a, b) => a.sort_order - b.sort_order),
    testimonials: items.filter((item) => item.section === 'testimonials' && item.active).sort((a, b) => a.sort_order - b.sort_order),
  };
}
