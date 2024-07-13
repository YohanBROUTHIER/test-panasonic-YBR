import Core from "./core";

export default class OrdreAchat extends Core{
  static apiName = "AchatEnTete";
  static resultName = "achat";
  static otherGetOneList = [
    ["Fournisseur", "fournisseurList"],
    ["Article", "articleList"]
  ];
  static otherGetManyList = [];
}