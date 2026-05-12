# Colección `site_content`

Crea una base de datos en Appwrite y dentro una colección llamada `site_content`.

## Atributos recomendados

- `section` — string, size 32, required
- `kind` — string, size 32, required
- `title` — string, size 255, optional
- `description` — mediumtext o string largo, optional
- `media_url` — string, size 2048, optional
- `embed_url` — string, size 2048, optional
- `link_url` — string, size 2048, optional
- `author_name` — string, size 255, optional
- `event_name` — string, size 255, optional
- `rating` — integer, optional
- `sort_order` — integer, required
- `active` — boolean, required
- `meta` — mediumtext, optional

## Índice sugerido

- `sort_order` ascendente
- opcionalmente `section` + `sort_order`

## Permisos

Si vas a usar API Key desde el servidor, con la configuración del proyecto basta.
