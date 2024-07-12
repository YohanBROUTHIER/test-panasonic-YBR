import achatDatamapper from "../../services/api/achatEnTete.js";
import Core from "./core";

export default class OrdreAchat extends Core{
  static Datamapper = achatDatamapper;
  static toastName = "L'ordre d'achat";
  static resultName = "ordreAchat";
}