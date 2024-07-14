import Core from "./core";

export default class AchatQueryMapper extends Core{
  static limitItemsPage = 20;
  static allSearchPrpoperty= [
    ["fournisseur", "description"],
    ["achat_en_tete", "creation_by"],
    ["article", "description"]
  ];

  static tableName = "achat";
  static wherePattern= /^(start_date|end_date)$/;
  static whereAdaptator(result, paramName, paramValue) {
    let newResult = {
      tableName: "event",
      propertyName: paramName,
      value: paramValue
    };

    if (paramName === "start_date") {
      newResult.propertyName = "creation_date";
      newResult.operator = ">";
    }

    if (paramName === "end_date") {
      newResult.propertyName = "creation_date";
      newResult.operator = "<";
    }

    result.where.conditions.push(newResult);
    return result;
  };
}