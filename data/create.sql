BEGIN;

DROP TABLE IF EXISTS "emplacement", "article", "stock", "transaction" CASCADE;

------------------------------------------ Primaries tables -------------------------------------------------------

CREATE TABLE IF NOT EXISTS "emplacement"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "description" text NOT NULL,
  "statut_dispo" boolean NOT NULL,
  "creation_date" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "creation_by" text NOT NULL DEFAULT 'admin'
);

CREATE TABLE IF NOT EXISTS "article"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "description" text NOT NULL,
  "unite_de_stock" int NOT NULL,
  "creation_date" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "creation_by" text NOT NULL DEFAULT 'admin'
);

CREATE TABLE IF NOT EXISTS "stock"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "emplacement_id" int NOT NULL UNIQUE REFERENCES "emplacement"("id"),
  "article_id" int NOT NULL REFERENCES "article"("id"),
  "quantity" text NOT NULL,
  "statut_dispo" boolean NOT NULL,
  "creation_date" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "creation_by" text NOT NULL DEFAULT 'admin'
);

CREATE TABLE IF NOT EXISTS "transaction"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "article_id" int NOT NULL REFERENCES "article"("id"),
  "type_mvt" text NOT NULL,
  "quantite_mvt" int NOT NULL,
  "emplacement_id" int NOT NULL REFERENCES "emplacement"("id"),
  "description" text,
  "creation_date" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "creation_by" text NOT NULL DEFAULT 'admin'
);

COMMIT;