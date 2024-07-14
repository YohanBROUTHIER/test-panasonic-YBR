import Joi from 'joi';
import CoreSchema from './core.js';

export default class AchatLigneSchema extends CoreSchema {
  static createBody = Joi.object({
    achat_en_tete_id: Joi.number().integer().positive().required(),
    article_id: Joi.number().integer().positive().required(),
    quantite_commande: Joi.number().integer().positive().required(),
    quantite_reception: Joi.number().integer(),
    unite_commande: Joi.string(),
    delai_demande: Joi.date(),
    delai_confirme: Joi.date(),
    statut: Joi.boolean(),
    prix_unitaire: Joi.number().integer().required(),
    creation_by: Joi.string().pattern(new RegExp("^[a-zA-Z][\w -]{3,30}$"))
  });
}