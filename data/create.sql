BEGIN;

DROP VIEW IF EXISTS "emplacement_with_stock", "article_global_view", "achat";
DROP TABLE IF EXISTS "emplacement", "article", "stock", "transaction",
  "fournisseur", "achat_en_tete", "achat_ligne" CASCADE;

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

CREATE TABLE "fournisseur"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "description" text,
  "creation_date" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "creation_by" text NOT NULL DEFAULT 'admin'
);

CREATE TABLE "achat_en_tete"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "fournisseur_id" int NOT NULL REFERENCES "fournisseur"("id"),
  "statut" boolean NOT NULL DEFAULT false,
  "creation_date" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "creation_by" text NOT NULL DEFAULT 'admin'
);

CREATE TABLE "achat_ligne"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "achat_en_tete_id" int NOT NULL REFERENCES "achat_en_tete"("id"),
  "article_id" int NOT NULL REFERENCES "article"("id"),
  "quantite_commande" int NOT NULL,
  "quantite_reception" int NOT NULL DEFAULT 0,
  "unite_commande" text NOT NULL,
  "delai_demande" TIMESTAMPTZ,
  "delai_confirme" TIMESTAMPTZ,
  "statut" boolean NOT NULL DEFAULT false,
  "prix_unitaire" int NOT NULL,
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

CREATE VIEW "achat" AS
  WITH lines AS (
    SELECT
      al."id",
      al."achat_en_tete_id",
      row_to_json(a.*) as "article",
      al."quantite_commande",
      al."quantite_reception",
      al."unite_commande",
      al."delai_demande",
      al."delai_confirme",
      al."statut",
      al."prix_unitaire",
      al."creation_date",
      al."creation_by"
    FROM "achat_ligne" AS al
    LEFT JOIN "article" AS a
    ON al.article_id = a.id
    GROUP BY al.id, a.*
  )

  SELECT aet."id", aet."statut", aet."creation_date", aet."creation_by",
    row_to_json(f.*) AS "fournisseur",
    jsonb_agg(al) AS "lignes",
    sum(al.prix_unitaire * al.quantite_commande) AS "cout",
    max(COALESCE(al.delai_confirme, al.delai_demande)) AS "reception_date"
  FROM "achat_en_tete" AS aet
  LEFT JOIN "lines" AS al
  ON aet.id = al.achat_en_tete_id
  LEFT JOIN "fournisseur" AS f
  ON aet.fournisseur_id = f.id
  GROUP BY aet.id, f.*;

COMMIT;