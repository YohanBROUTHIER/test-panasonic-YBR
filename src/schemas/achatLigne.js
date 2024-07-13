import Joi from 'joi';

export default class AchatLigneSchema {
  static createBody = Joi.object({
    achat_en_tete_id: Joi.number().integer().positive().required(),
    article_id: Joi.number().integer().positive().required(),
    quantite_commande: Joi.number().integer().positive().required(),
    quantite_reception: Joi.number().integer().positive(),
    unite_commande: Joi.string(),
    delai_demande: Joi.date(),
    delai_confirme: Joi.date(),
    statut: Joi.boolean(),
    prix_unitaire: Joi.number().integer().positive().required(),
    creation_by: Joi.string().pattern(new RegExp("^[a-zA-Z][\w -]{3,30}$"))
  });
}