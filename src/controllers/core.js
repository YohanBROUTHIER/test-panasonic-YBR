import ApiError from "../helpers/apiError.js";

// Classe servant de fabrique pour tout les controllers. Il n'est pas utilisé directement.
export default class CoreController {
  static datamapper;
  static className;
  static schema;
  
  // Méthode pour la création d'un enregistrement
  static async create(req, res) {
    await this.schema.createBody.validateAsync(req.body);
    const row = await this.datamapper.create(req.body);
    res.status(201).json(row);
  }
  
  // Méthode pour obtenir tout les élément d'une table
  static async getAll(req, res) {
    this.schema.checkQueryForGet(req.query);
    const rows = await this.datamapper.findAll(req.query);
    res.status(200).json(rows);
  }

  // Méthode permettant de récupérer un élement d'une table
  static async getByPk(req, res) {
    const { id } = req.params;
    if (!id || !String(id).match(/^[1-9]\d*$/)) {
      throw new ApiError("Le paramètre dois être un entier positif.", {httpStatus: 400});
    }

    const row = await this.datamapper.findByPk(id);
    if (!row) {
      throw new ApiError("Il n'existe pas délément avec cette ID", {httpStatus:404});
    }

    return res.status(200).json(row);
  }
}