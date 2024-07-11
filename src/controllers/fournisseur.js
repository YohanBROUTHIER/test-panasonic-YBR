import CoreController from "./core.js";
import FournisseurDatamapper from "../datamappers/fournisseur.js";

export default class FournisseurController extends CoreController {
  static datamapper = FournisseurDatamapper;
  static className = "Fournisseur";
}