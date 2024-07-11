import Joi from 'joi';

export default class AchatEnTeteSchema {
  static createBody = Joi.object({
    fournisseur_id: Joi.number().integer().positive().required(),
    creation_by: Joi.string().required().pattern(new RegExp("^[a-zA-Z][\w -]{3,30}$"))
  });
}