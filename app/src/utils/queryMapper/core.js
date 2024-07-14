import urlQueryJsonParser from "url-query-json-parser";

export default class Core{
  static allSearchPrpoperty;
  static tableName;
  static wherePattern;
  static whereAdaptator;
  static limitItemsPage;
  
  static parseOnly(data) {
    return urlQueryJsonParser.parseJSON(data);
  }

  static advancedParser(urlClient) {
    if (!urlClient.search) {
      return null;
    }
  
    let result = {};
    for (const [paramName, paramValue] of urlClient.searchParams) {
  
      if (paramName === "order") {
        if (!result.order) {
          result.orderBy = [];
        }
  
        const order = paramValue.split("-");
        result.orderBy.push(order);
        continue;
      }
  
      if (paramName === "page") {
        result.limit = this.limitItemsPage;
        result.offset = paramValue > 1 ? result.limit * (paramValue - 1) : undefined;
  
        continue;
      }
  
      if (!result.where) {
        result.where = {
          separator: "and",
          conditions: []
        };
      }
      if (this.whereAdaptator && paramName.match(this.wherePattern)) {
        result = this.whereAdaptator(result, paramName, paramValue);
        continue;
      }
  
      if (paramName.match(/-list$/)) {
        const newResult = paramValue
          .split("-")
          .map(value => {
            return {
              tableName: paramName.split("-list")[0],
              propertyName: "id",
              operator: "=",
              value
            };
          });
        result.where.conditions.push({separator: "or", conditions: newResult});
        continue;
      }
  
      if (paramName === "search") {
        const newResult = this.allSearchPrpoperty.map(([tableName, property]) => {
          return {
            tableName,
            propertyName: property,
            operator: "ilike",
            value: paramValue
          };
        });
        result.where.conditions.push({separator: "or", conditions: newResult});
        continue;
      }
  
      const newResult = {
        tableName: this.tableName,
        propertyName: paramName,
        operator: "=",
        value: paramValue
      };
      result.where.conditions.push(newResult);
    }
    return urlQueryJsonParser.parseJSON(result);
  }
}