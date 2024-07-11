import Joi from 'joi';

export default class TransactionSchema {
  static createBody = Joi.object({
    articleId: Joi.number().integer().positive().required(),
    typeMvt: Joi.number().integer().positive().required(),
    quantityMvt: Joi.string().required().pattern(new RegExp("^(INV|RCPT|OFP|VNT|OFC)$")),
    emplacementId: Joi.number().integer().positive().required(),
    description: Joi.number().integer().positive().required(),
    stockId: Joi.number().integer().positive().required(),
    creation_by: Joi.string().required().pattern(new RegExp("^[a-zA-Z][\w -]{3,30}$"))
  });
}