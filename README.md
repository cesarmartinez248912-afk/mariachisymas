# Mariachi Luxe

Sitio web en **Next.js 15 + App Router + TypeScript + Tailwind CSS** para un negocio musical familiar de mariachi y trío musical.

## Incluye

- Página principal premium y responsive
- Hero con imagen o video editable
- Secciones de servicios, galería, videos, testimonios, contacto y footer
- Panel administrativo en `/admin`
- Acceso al panel con contraseña
- CRUD de imágenes, videos y testimonios desde el panel
- Formulario conectado a Resend
- Preparado para Appwrite como base de datos

## Variables de entorno

Copia `.env.example` a `.env.local` y completa:

- `NEXT_PUBLIC_APPWRITE_ENDPOINT`
- `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
- `APPWRITE_API_KEY`
- `APPWRITE_DATABASE_ID`
- `APPWRITE_COLLECTION_ID`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `RESEND_API_KEY`
- `CONTACT_EMAIL`

## Appwrite

Crea una base de datos y una colección llamada `site_content`, luego agrega estos atributos:

- `section` string
- `kind` string
- `title` string
- `description` string
- `media_url` string
- `embed_url` string
- `link_url` string
- `author_name` string
- `event_name` string
- `rating` integer
- `sort_order` integer
- `active` boolean
- `meta` string

## Panel admin

Entra a:

`/admin`

Ahí podrás:

- agregar imágenes
- agregar videos embebidos o archivos de video
- editar y eliminar elementos
- publicar testimonios

## Envío de formulario

El contacto público dirige a WhatsApp. La ruta `/api/contact` quedó solo como compatibilidad.

## Desarrollo

```bash
npm install
npm run dev
```

## Despliegue

1. Sube el proyecto a GitHub.
2. Conecta el repositorio a Vercel.
3. Agrega las variables de entorno.
4. Crea la base de datos y la colección en Appwrite.
5. Despliega.
