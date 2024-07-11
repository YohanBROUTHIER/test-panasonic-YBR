import client from '../helpers/pgClient.js';
import CoreDatamapper from './core.js';

export default class TransactionDatamapper extends CoreDatamapper{
  static ReadTableName = "transaction";
  static WriteTableName = "transaction";

  static async create({articleId, typeMvt, quantityMvt, emplacementId, description, stockId}) {
    // Cette fonction a pour responsailité l'échange de données aves la BDD.
    // Le contrôle des variables doit se faire dans le côntroleur.

    // Creation d'une requette préparé. L'utilisation de "BEGIN ... COMMIT" evite une incohérence du a une opération inachevé.
    // Le module node postgré nous empèche de faire une requête préparé contenant de multiple commands.
    // Il faudrait sois réecrire la requête SQL sois contrôler les données d'entrées.
    let query =
      `BEGIN;
        INSERT INTO ${this.WriteTableName} (
          "article_id",
          "type_mvt",
          "quantite_mvt",
          "emplacement_id",
          "description"
        ) VALUES (
          ${articleId},
          '${typeMvt}',
          ${quantityMvt},
          ${emplacementId},
          '${description}'
	      );

        UPDATE "article"
        SET "unite_de_stock" = ("unite_de_stock" + ${quantityMvt})
        WHERE "id" = ${articleId};
    
        UPDATE "stock"
        SET "quantity" = ("quantity" + ${quantityMvt})
        WHERE "id" = ${stockId};
      COMMIT;`
    ;
    

    // Utilisation du module PG pour envoyer la requete à la base de données
    const result = await client.query(query);
    
    return true;
  }
}