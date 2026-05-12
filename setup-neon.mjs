/**
 * ╔══════════════════════════════════════════════════╗
 * ║       SETUP AUTOMÁTICO DE NEON (PostgreSQL)      ║
 * ║       Mariachi Luxe — Base de datos              ║
 * ╚══════════════════════════════════════════════════╝
 *
 * USO:
 *   1. Asegúrate de tener DATABASE_URL en tu .env
 *   2. Corre:  node setup-neon.mjs
 *   3. La tabla se crea y los datos demo se insertan automáticamente
 */

import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Carga DATABASE_URL desde .env si existe
try {
  const envPath = join(dirname(fileURLToPath(import.meta.url)), '.env');
  const envContent = readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const [key, ...rest] = line.split('=');
    if (key && rest.length && !process.env[key.trim()]) {
      process.env[key.trim()] = rest.join('=').trim();
    }
  }
} catch {
  // .env no existe, se usan las variables de entorno del sistema
}

const DATABASE_URL = process.env.DATABASE_URL;

const C = {
  reset: '\x1b[0m', bold: '\x1b[1m',
  green: '\x1b[32m', yellow: '\x1b[33m',
  cyan: '\x1b[36m', red: '\x1b[31m', gold: '\x1b[33m',
};

function log(icon, msg, color = C.reset) {
  console.log(`${color}${icon}  ${msg}${C.reset}`);
}

const DEMO_CONTENT = [
  { section: 'hero', kind: 'image', title: 'Mariachi en escenario elegante', description: 'Imagen principal del hero', media_url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1800&q=80', embed_url: null, link_url: null, author_name: null, event_name: null, rating: null, sort_order: 0, active: true, meta: '{}' },
  { section: 'gallery', kind: 'image', title: 'Presentación en boda', description: 'Foto de galería', media_url: 'https://images.unsplash.com/photo-1524594157360-9e9f2f4e4db0?auto=format&fit=crop&w=1400&q=80', embed_url: null, link_url: null, author_name: null, event_name: null, rating: null, sort_order: 1, active: true, meta: '{}' },
  { section: 'gallery', kind: 'image', title: 'Trío romántico', description: 'Foto de galería', media_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=80', embed_url: null, link_url: null, author_name: null, event_name: null, rating: null, sort_order: 2, active: true, meta: '{}' },
  { section: 'videos', kind: 'video', title: 'Video de presentación', description: 'Video de muestra — reemplaza con tu link de YouTube', media_url: null, embed_url: 'https://www.youtube.com/embed/ScMzIvxBSi4', link_url: null, author_name: null, event_name: null, rating: null, sort_order: 1, active: true, meta: '{}' },
  { section: 'testimonials', kind: 'quote', title: 'Muy profesionales y puntuales', description: 'Llegaron impecables, la música fue perfecta y todos los invitados quedaron encantados.', media_url: null, embed_url: null, link_url: null, author_name: 'María Fernanda', event_name: 'Boda', rating: 5, sort_order: 1, active: true, meta: '{}' },
  { section: 'testimonials', kind: 'quote', title: 'El mejor regalo para mi mamá', description: 'Contratamos la serenata sorpresa y fue un momento que ella nunca va a olvidar. ¡Gracias!', media_url: null, embed_url: null, link_url: null, author_name: 'Carlos Mendoza', event_name: 'Serenata', rating: 5, sort_order: 2, active: true, meta: '{}' },
  { section: 'testimonials', kind: 'quote', title: 'Puntuales y muy profesionales', description: 'En los XV años de mi hija todo salió perfecto. El vals con mariachi fue el momento favorito de todos.', media_url: null, embed_url: null, link_url: null, author_name: 'Lupita Ramírez', event_name: 'XV años', rating: 5, sort_order: 3, active: true, meta: '{}' },
];

async function main() {
  console.log(`\n${C.gold}${C.bold}╔═══════════════════════════════════════╗${C.reset}`);
  console.log(`${C.gold}${C.bold}║   Mariachi Luxe — Setup de Neon       ║${C.reset}`);
  console.log(`${C.gold}${C.bold}╚═══════════════════════════════════════╝${C.reset}\n`);

  if (!DATABASE_URL) {
    console.error(`${C.red}${C.bold}❌  ERROR: DATABASE_URL no está definida.${C.reset}`);
    console.log('\n   Crea un proyecto en https://neon.tech, copia la connection string');
    console.log('   y agrégala a tu archivo .env como:\n');
    console.log(`   ${C.cyan}DATABASE_URL=postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require${C.reset}\n`);
    process.exit(1);
  }

  const sql = neon(DATABASE_URL);

  // ── 1. Crear tabla ────────────────────────────────────────────────────────
  log('🗄️ ', 'Creando tabla site_content...', C.cyan);
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS site_content (
        id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
        section     VARCHAR(32) NOT NULL,
        kind        VARCHAR(32) NOT NULL,
        title       VARCHAR(255),
        description TEXT,
        media_url   VARCHAR(2048),
        embed_url   VARCHAR(2048),
        link_url    VARCHAR(2048),
        author_name VARCHAR(255),
        event_name  VARCHAR(255),
        rating      INTEGER,
        sort_order  INTEGER     NOT NULL DEFAULT 0,
        active      BOOLEAN     NOT NULL DEFAULT TRUE,
        meta        TEXT        DEFAULT '{}',
        created_at  TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    log('  ✓', 'Tabla creada (o ya existía)', C.green);
  } catch (e) {
    log('  ✗', `Error al crear tabla: ${e.message}`, C.red);
    process.exit(1);
  }

  // ── 2. Crear índices ──────────────────────────────────────────────────────
  log('\n🔍', 'Creando índices...', C.cyan);
  try {
    await sql`CREATE INDEX IF NOT EXISTS idx_section_sort ON site_content (section, sort_order ASC)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_active ON site_content (active)`;
    log('  ✓', 'Índices creados', C.green);
  } catch (e) {
    log('  !', `Índices (no crítico): ${e.message}`, C.yellow);
  }

  // ── 3. Verificar si ya hay datos ──────────────────────────────────────────
  const countResult = await sql`SELECT COUNT(*) as cnt FROM site_content`;
  const count = Number(countResult[0].cnt);

  if (count > 0) {
    log('\n⚠️ ', `La tabla ya tiene ${count} registro(s). Omitiendo datos demo.`, C.yellow);
  } else {
    // ── 4. Insertar datos demo ──────────────────────────────────────────────
    log('\n📥', 'Insertando contenido de demostración...', C.cyan);
    for (const item of DEMO_CONTENT) {
      try {
        await sql`
          INSERT INTO site_content
            (section, kind, title, description, media_url, embed_url, link_url,
             author_name, event_name, rating, sort_order, active, meta)
          VALUES
            (${item.section}, ${item.kind}, ${item.title}, ${item.description},
             ${item.media_url}, ${item.embed_url}, ${item.link_url},
             ${item.author_name}, ${item.event_name}, ${item.rating},
             ${item.sort_order}, ${item.active}, ${item.meta})
        `;
        log('  ✓', `[${item.section}] ${item.title || item.kind}`, C.green);
      } catch (e) {
        log('  ✗', `Error al insertar "${item.title}": ${e.message}`, C.red);
      }
    }
  }

  // ── 5. Resumen ────────────────────────────────────────────────────────────
  console.log(`\n${C.gold}${C.bold}╔══════════════════════════════════════════╗${C.reset}`);
  console.log(`${C.gold}${C.bold}║   ✅  ¡Listo! Tu base de datos Neon       ║${C.reset}`);
  console.log(`${C.gold}${C.bold}║       está configurada y lista para usar. ║${C.reset}`);
  console.log(`${C.gold}${C.bold}╚══════════════════════════════════════════╝${C.reset}\n`);
  console.log(`${C.yellow}Asegúrate de tener DATABASE_URL en tus variables de entorno de Vercel.${C.reset}\n`);
}

main().catch((e) => {
  console.error(`\n${C.red}Error inesperado:${C.reset}`, e.message);
  process.exit(1);
});
