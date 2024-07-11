BEGIN;

DROP VIEW IF EXISTS "emplacement_with_stock", "article_global_view";
DROP TABLE IF EXISTS "emplacement", "article", "stock", "transaction" CASCADE;

------------------------------------------ Primaries tables -------------------------------------------------------

CREATE TABLE "emplacement"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "description" text NOT NULL,
  "statut_dispo" boolean NOT NULL,
  "creation_date" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "creation_by" text NOT NULL DEFAULT 'admin'
);

CREATE TABLE "article"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "description" text NOT NULL,
  "unite_de_stock" bigint NOT NULL,
  "creation_date" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "creation_by" text NOT NULL DEFAULT 'admin'
);

CREATE TABLE "stock"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "emplacement_id" int NOT NULL REFERENCES "emplacement"("id"),
  "article_id" int NOT NULL REFERENCES "article"("id"),
  "quantity" bigint NOT NULL,
  "statut_dispo" boolean NOT NULL,
  "creation_date" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "creation_by" text NOT NULL DEFAULT 'admin'
);

CREATE TABLE "transaction"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "article_id" int NOT NULL REFERENCES "article"("id"),
  "type_mvt" text NOT NULL,
  "quantite_mvt" int NOT NULL,
  "emplacement_id" int NOT NULL REFERENCES "emplacement"("id"),
  "description" text,
  "creation_date" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "creation_by" text NOT NULL DEFAULT 'admin'
);

------------------------------------------ View -------------------------------------------------------

CREATE VIEW "emplacement_with_stock" AS
  SELECT e.*, jsonb_agg(s.*) AS stocks
  FROM "emplacement" AS e
  LEFT JOIN "stock" AS s
  ON e.id = s.emplacement_id
  GROUP BY e.id;

CREATE VIEW "article_global_view" AS
  WITH "stock_sum" AS (
    SELECT s.article_id, sum(s.quantity) AS stock_quantity
    FROM "stock" AS s
    GROUP BY s.article_id
  ),
  "transaction_sum" AS (
    SELECT s.article_id, sum(s.quantite_mvt) AS transaction_quantity
    FROM "transaction" AS s
    GROUP BY s.article_id
  )

  SELECT a.id, a.description, a.unite_de_stock, ss.stock_quantity, COALESCE(transaction_quantity, 0) AS mvt_quantity
  FROM "article" AS a
  LEFT JOIN "stock_sum" AS ss
  ON a.id = ss.article_id
  LEFT JOIN "transaction_sum" AS ts
  ON a.id = ts.article_id;

COMMIT;