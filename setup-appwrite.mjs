/**
 * ╔══════════════════════════════════════════════════╗
 * ║        SETUP AUTOMÁTICO DE APPWRITE              ║
 * ║        Mariachi Luxe — Base de datos             ║
 * ╚══════════════════════════════════════════════════╝
 *
 * USO:
 *   1. Llena las 3 variables de abajo (ENDPOINT, PROJECT_ID, API_KEY)
 *   2. Corre:  node setup-appwrite.mjs
 *   3. Copia los IDs que imprime al final y pégalos en tu .env
 */

// ─── CONFIGURA AQUÍ TUS DATOS DE APPWRITE ─────────────────────────────────────
const ENDPOINT = 'https://cloud.appwrite.io/v1'; // déjalo así si usas Appwrite Cloud
const PROJECT_ID = '6a02b2650003af74c6f8';       // Appwrite Console → tu proyecto → Settings → Project ID
const API_KEY = 'standard_8cc0f8f41b7cb0be633b3abc173053a1e2122eaa41b4a725e71a380a655d178557dee86a00ebc24fc50808b3ebf8785d3da6fd9b07788e6e09af79e07d9433419bade629cb6bc142222400f90736bfaba5b1bee64e1fad7b5caf62b9f6981a0d167e41ae8694e3cd492d7ca5fc69d3686378709b45409ca4cf642c57969df9e0';           // Appwrite Console → tu proyecto → Overview → Integrations → API Keys → Create Key (marcar Database scope)
// ──────────────────────────────────────────────────────────────────────────────

import { Client, Databases, ID, Permission, Role } from 'node-appwrite';

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const db = new Databases(client);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── Colores para la terminal ──────────────────────────────────────────────────
const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  gold: '\x1b[33m',
};

function log(icon, msg, color = C.reset) {
  console.log(`${color}${icon}  ${msg}${C.reset}`);
}

// ─── Datos de demostración para cargar al inicio ───────────────────────────────
const DEMO_CONTENT = [
  {
    section: 'hero',
    kind: 'image',
    title: 'Mariachi en escenario elegante',
    description: 'Imagen principal del hero',
    media_url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1800&q=80',
    embed_url: null,
    link_url: null,
    author_name: null,
    event_name: null,
    rating: null,
    sort_order: 0,
    active: true,
    meta: '{}',
  },
  {
    section: 'gallery',
    kind: 'image',
    title: 'Presentación en boda',
    description: 'Foto de galería',
    media_url: 'https://images.unsplash.com/photo-1524594157360-9e9f2f4e4db0?auto=format&fit=crop&w=1400&q=80',
    embed_url: null,
    link_url: null,
    author_name: null,
    event_name: null,
    rating: null,
    sort_order: 1,
    active: true,
    meta: '{}',
  },
  {
    section: 'gallery',
    kind: 'image',
    title: 'Trío romántico',
    description: 'Foto de galería',
    media_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=80',
    embed_url: null,
    link_url: null,
    author_name: null,
    event_name: null,
    rating: null,
    sort_order: 2,
    active: true,
    meta: '{}',
  },
  {
    section: 'videos',
    kind: 'video',
    title: 'Video de presentación',
    description: 'Video de muestra — reemplaza con tu link de YouTube',
    media_url: null,
    embed_url: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    link_url: null,
    author_name: null,
    event_name: null,
    rating: null,
    sort_order: 1,
    active: true,
    meta: '{}',
  },
  {
    section: 'testimonials',
    kind: 'quote',
    title: 'Muy profesionales y puntuales',
    description: 'Llegaron impecables, la música fue perfecta y todos los invitados quedaron encantados.',
    media_url: null,
    embed_url: null,
    link_url: null,
    author_name: 'María Fernanda',
    event_name: 'Boda',
    rating: 5,
    sort_order: 1,
    active: true,
    meta: '{}',
  },
  {
    section: 'testimonials',
    kind: 'quote',
    title: 'El mejor regalo para mi mamá',
    description: 'Contratamos la serenata sorpresa y fue un momento que ella nunca va a olvidar. ¡Gracias!',
    media_url: null,
    embed_url: null,
    link_url: null,
    author_name: 'Carlos Mendoza',
    event_name: 'Serenata',
    rating: 5,
    sort_order: 2,
    active: true,
    meta: '{}',
  },
  {
    section: 'testimonials',
    kind: 'quote',
    title: 'Puntuales y muy profesionales',
    description: 'En los XV años de mi hija todo salió perfecto. El vals con mariachi fue el momento favorito de todos.',
    media_url: null,
    embed_url: null,
    link_url: null,
    author_name: 'Lupita Ramírez',
    event_name: 'XV años',
    rating: 5,
    sort_order: 3,
    active: true,
    meta: '{}',
  },
];

// ─── Atributos de la colección ─────────────────────────────────────────────────
async function createAttributes(databaseId, collectionId) {
  const STRING_ATTRS = [
    { key: 'section', size: 32, required: true },
    { key: 'kind', size: 32, required: true },
    { key: 'title', size: 255, required: false },
    { key: 'description', size: 5000, required: false },
    { key: 'media_url', size: 2048, required: false },
    { key: 'embed_url', size: 2048, required: false },
    { key: 'link_url', size: 2048, required: false },
    { key: 'author_name', size: 255, required: false },
    { key: 'event_name', size: 255, required: false },
    { key: 'meta', size: 5000, required: false },
  ];

  for (const attr of STRING_ATTRS) {
    try {
      await db.createStringAttribute(databaseId, collectionId, attr.key, attr.size, attr.required);
      log('  ✓', `Atributo string: ${attr.key}`, C.green);
    } catch (e) {
      if (e.code === 409) {
        log('  ~', `Ya existe: ${attr.key}`, C.yellow);
      } else {
        throw e;
      }
    }
    await sleep(300);
  }

  // sort_order — integer required
  try {
    await db.createIntegerAttribute(databaseId, collectionId, 'sort_order', true);
    log('  ✓', 'Atributo integer: sort_order', C.green);
  } catch (e) {
    if (e.code === 409) log('  ~', 'Ya existe: sort_order', C.yellow);
    else throw e;
  }
  await sleep(300);

  // rating — integer optional
  try {
    await db.createIntegerAttribute(databaseId, collectionId, 'rating', false);
    log('  ✓', 'Atributo integer: rating', C.green);
  } catch (e) {
    if (e.code === 409) log('  ~', 'Ya existe: rating', C.yellow);
    else throw e;
  }
  await sleep(300);

  // active — boolean required
  try {
    await db.createBooleanAttribute(databaseId, collectionId, 'active', true);
    log('  ✓', 'Atributo boolean: active', C.green);
  } catch (e) {
    if (e.code === 409) log('  ~', 'Ya existe: active', C.yellow);
    else throw e;
  }
  await sleep(300);
}

// ─── Índices ───────────────────────────────────────────────────────────────────
async function createIndexes(databaseId, collectionId) {
  await sleep(2000); // Appwrite necesita que los atributos estén listos

  try {
    await db.createIndex(databaseId, collectionId, 'idx_section_sort', 'key', ['section', 'sort_order'], ['ASC', 'ASC']);
    log('  ✓', 'Índice: section + sort_order', C.green);
  } catch (e) {
    if (e.code === 409) log('  ~', 'Índice ya existe', C.yellow);
    else log('  !', `Índice (no crítico): ${e.message}`, C.yellow);
  }
}

// ─── Carga de datos demo ───────────────────────────────────────────────────────
async function insertDemoContent(databaseId, collectionId) {
  log('\n📥', 'Insertando contenido de demostración...', C.cyan);

  for (const item of DEMO_CONTENT) {
    // Limpiar campos null para Appwrite
    const data = Object.fromEntries(
      Object.entries(item).filter(([, v]) => v !== null)
    );

    try {
      await db.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        data,
        [
          Permission.read(Role.any()),
          Permission.write(Role.users()),
        ]
      );
      log('  ✓', `Documento: [${item.section}] ${item.title || item.kind}`, C.green);
    } catch (e) {
      log('  ✗', `Error al insertar "${item.title}": ${e.message}`, C.red);
    }
    await sleep(250);
  }
}

// ─── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n${C.gold}${C.bold}╔═══════════════════════════════════════╗${C.reset}`);
  console.log(`${C.gold}${C.bold}║   Mariachi Luxe — Setup de Appwrite   ║${C.reset}`);
  console.log(`${C.gold}${C.bold}╚═══════════════════════════════════════╝${C.reset}\n`);

  if (PROJECT_ID === 'PEGA_TU_PROJECT_ID_AQUI' || API_KEY === 'PEGA_TU_API_KEY_AQUI') {
    console.log(`${C.red}${C.bold}❌  ERROR: Debes llenar PROJECT_ID y API_KEY en este archivo primero.${C.reset}`);
    console.log(`\n   Abre setup-appwrite.mjs y edita las líneas 14-16.\n`);
    process.exit(1);
  }

  // ── 1. Crear base de datos ────────────────────────────────────────────────
  log('🗄️ ', 'Creando base de datos "mariachi_luxe"...', C.cyan);
  let databaseId;
  try {
    const database = await db.create(ID.unique(), 'mariachi_luxe');
    databaseId = database.$id;
    log('  ✓', `Base de datos creada: ${databaseId}`, C.green);
  } catch (e) {
    log('  ✗', `Error al crear base de datos: ${e.message}`, C.red);
    process.exit(1);
  }

  await sleep(500);

  // ── 2. Crear colección ────────────────────────────────────────────────────
  log('\n📁', 'Creando colección "site_content"...', C.cyan);
  let collectionId;
  try {
    const collection = await db.createCollection(
      databaseId,
      'site_content',
      'site_content',
      [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ]
    );
    collectionId = collection.$id;
    log('  ✓', `Colección creada: ${collectionId}`, C.green);
  } catch (e) {
    log('  ✗', `Error al crear colección: ${e.message}`, C.red);
    process.exit(1);
  }

  await sleep(500);

  // ── 3. Crear atributos ────────────────────────────────────────────────────
  log('\n🏷️ ', 'Creando atributos...', C.cyan);
  await createAttributes(databaseId, collectionId);

  // ── 4. Crear índices ──────────────────────────────────────────────────────
  log('\n🔍', 'Creando índices...', C.cyan);
  await createIndexes(databaseId, collectionId);

  // ── 5. Insertar datos demo ────────────────────────────────────────────────
  await insertDemoContent(databaseId, collectionId);

  // ── 6. Mostrar resumen ────────────────────────────────────────────────────
  console.log(`\n${C.gold}${C.bold}╔═══════════════════════════════════════════════════════════╗${C.reset}`);
  console.log(`${C.gold}${C.bold}║   ✅  ¡LISTO! Copia estos valores a tu archivo .env       ║${C.reset}`);
  console.log(`${C.gold}${C.bold}╚═══════════════════════════════════════════════════════════╝${C.reset}\n`);

  console.log(`${C.cyan}NEXT_PUBLIC_APPWRITE_ENDPOINT=${ENDPOINT}${C.reset}`);
  console.log(`${C.cyan}NEXT_PUBLIC_APPWRITE_PROJECT_ID=${PROJECT_ID}${C.reset}`);
  console.log(`${C.cyan}APPWRITE_API_KEY=${API_KEY}${C.reset}`);
  console.log(`${C.cyan}${C.bold}APPWRITE_DATABASE_ID=${databaseId}${C.reset}`);
  console.log(`${C.cyan}${C.bold}APPWRITE_COLLECTION_ID=site_content${C.reset}`);

  console.log(`\n${C.yellow}Pega todo eso en tu archivo .env (renombra .env.example a .env)${C.reset}`);
  console.log(`${C.yellow}Luego haz un nuevo deploy en Vercel con esas variables de entorno.${C.reset}\n`);
}

main().catch((e) => {
  console.error(`\n${C.red}Error inesperado:${C.reset}`, e.message);
  process.exit(1);
});
