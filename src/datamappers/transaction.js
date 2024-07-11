import client from '../helpers/pgClient.js';
import CoreDatamapper from './core.js';

export default class TransactionDatamapper extends CoreDatamapper{
  static tableName = "transaction";

  static async create({articleId, typeMvt, quantityMvt, emplacementId, description}) {
    // Cette fonction a pour responsailité l'échange de données aves la BDD.
    // Le contrôle des variables doit se faire dans le côntroleur.

    // Creation d'une requette préparé. L'utilisation de "BEGIN ... COMMIT" evite une incohérence du a une opération inachevé
    const query = {
      text: `BEGING
        INSERT INTO ${this.tableName} (
          "article_id",
          "type_mvt",
          "quantite_mvt",
          "emplacement_id",
          "description"
        ) VALUES (
          $1,
          $2,
          $3,
          $4,
          $5
	      );

        UPDATE "article"
        SET (
          "unite_de_stock"
        ) = (
          "unite_de_stock" - $3
        )
        WHERE "id" = $1;

        UPDATE "stock"
        SET (
          "unite_de_stock"
        ) = (
          "unite_de_stock" - $3
        )
        WHERE "article_id" = $1 and "emplacement_id" = $4;

      COMMIT;`,
      values: [articleId, typeMvt, quantityMvt, emplacementId, description]
    }

    // Utilisation du module PG pour envoyer la requete à la base de données
    const result = await client.query(query);
    return result.rows[0];
  }
}