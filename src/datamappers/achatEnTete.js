
import CoreDatamapper from './core.js';

export default class AchatEnTeteDatamapper extends CoreDatamapper{
  static ReadTableName = "achat";
  static WriteTableName = "achat_en_tete";

  static queryAdaptator(condition, query) {
    let result = {text: "", values: query.values};
    let {tableName, propertyName, operator, value} = condition;
    let type = String(value).match(/^\d+$/) ? "int" : "text";
    if (operator === "ilike") {
      type = "text";
      value = `%${value}%`;
    }

    if (tableName === "lignes") {
      
      if (type === "int") {
        result.values.push(parseInt(value));
        operator = operator === "=" || operator === "in" ? "IN" : "NOT IN";
        result.text += `($${result.values.length} ${operator} (SELECT (jsonb_array_elements(${tableName})->>'${propertyName}')::${type}))`;
      } else {
        result.values.push(value);
        result.text += `(EXISTS (SELECT 1 FROM jsonb_array_elements(${tableName}) as ${tableName}(property) WHERE (property->>'${propertyName}') ${operator} $${result.values.length}))`;
      }
      
      return [result.text, result.values];
    }

    if (tableName === "fournisseur" || tableName === "statut") {
      result.values.push(value);
      result.text += `((${tableName}->>'${propertyName}')::${type} ${operator} $${result.values.length})`;
      return [result.text, result.values];
    }

    result.values.push(value);
    result.text += `("${propertyName}" ${operator} $${result.values.length})`;

    return [result.text, result.values];
  }
}