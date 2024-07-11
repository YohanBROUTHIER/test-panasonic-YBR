import CoreController from "./core.js";
import AchatEnTeteDatamapper from "../datamappers/achatEnTete.js";
import AchatEnTeteSchema from "../schemas/achatEnTete.js";

export default class AchatEnTeteController extends CoreController {
  static datamapper = AchatEnTeteDatamapper;
  static className = "AchatEnTete";
  static schema = AchatEnTeteSchema;
}