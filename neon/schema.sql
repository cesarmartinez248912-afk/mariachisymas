-- ══════════════════════════════════════════════════
--   Mariachi Luxe — Schema para Neon (PostgreSQL)
--   Ejecuta este SQL en el SQL Editor de Neon
-- ══════════════════════════════════════════════════

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
);

CREATE INDEX IF NOT EXISTS idx_section_sort ON site_content (section, sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_active       ON site_content (active);
