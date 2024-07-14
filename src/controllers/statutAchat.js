import CoreController from "./core.js";
import StatutAchatDatamapper from "../datamappers/statutAchat.js";
import StatutAchatSchema from "../schemas/statutAchat.js";

export default class StatutAchatController extends CoreController {
  static datamapper = StatutAchatDatamapper;
  static className = "StatutAchat";
  static schema = StatutAchatSchema;
}