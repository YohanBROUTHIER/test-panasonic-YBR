import CoreController from "./core.js";
import FournisseurDatamapper from "../datamappers/fournisseur.js";
import FournisseurSchema from "../schemas/fournisseur.js";

export default class FournisseurController extends CoreController {
  static datamapper = FournisseurDatamapper;
  static className = "Fournisseur";
  static schema = FournisseurSchema;
}