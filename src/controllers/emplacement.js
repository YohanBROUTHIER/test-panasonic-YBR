import CoreController from "./core.js";
import EmplacementDatamapper from "../datamappers/emplacement.js";
import EmplacementSchema from "../schemas/emplacement.js";

export default class EmplacementController extends CoreController {
  static datamapper = EmplacementDatamapper;
  static className = "Emplacement";
  static schema = EmplacementSchema;
}