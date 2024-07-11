import Joi from 'joi';

export default class AchatLigneSchema {
  static createBody = Joi.object({
    achat_en_tete_id: Joi.number().integer().positive().required(),
    article_id: Joi.number().integer().positive().required(),
    quantite_commande: Joi.number().integer().positive().required(),
    statut: Joi.boolean(),
    prix_unitaire: Joi.number().integer().positive().required(),
    creation_by: Joi.string().required().pattern(new RegExp("^[a-zA-Z][\w -]{3,30}$"))
  });
}