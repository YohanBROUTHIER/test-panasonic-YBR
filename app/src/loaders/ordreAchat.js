import AchatQueryMapper from "../utils/queryMapper/achat";
import Core from "./core";

export default class OrdreAchat extends Core{
  static apiName = "AchatEnTete";
  static resultName = "achat";
  static queryMapper = AchatQueryMapper;
  static defaultSort = "reception_date-asc";
  static otherGetOneList = [
    ["Fournisseur", "fournisseurList"],
    ["Article", "articleList"]
  ];
  static otherGetManyList = [
    ["Fournisseur", "fournisseurs"],
    ["StatutAchat", "statutAchats"]
  ];
}