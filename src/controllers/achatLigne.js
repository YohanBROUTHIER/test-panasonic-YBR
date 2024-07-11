import CoreController from "./core.js";
import AchatLigneDatamapper from "../datamappers/achatLigne.js";
import AchatLigneSchema from "../schemas/achatLigne.js";

export default class AchatLigneController extends CoreController {
  static datamapper = AchatLigneDatamapper;
  static className = "AchatLigne";
  static schema = AchatLigneSchema;
}