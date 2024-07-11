import CoreController from "./core.js";
import EmplacementDatamapper from "../datamappers/emplacement.js";

export default class EmplacementController extends CoreController {
  static datamapper = EmplacementDatamapper;
  static className = "Emplacement";
}