import Joi from 'joi';
import CoreSchema from './core.js';

export default class AchatEnTeteSchema extends CoreSchema {
  static createBody = Joi.object({
    fournisseur_id: Joi.number().integer().positive().required(),
    statut: Joi.boolean(),
    creation_by: Joi.string().pattern(new RegExp("^[a-zA-Z][\w -]{3,30}$"))
  });
}