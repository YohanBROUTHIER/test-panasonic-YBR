import pool from '../helpers/pgClient.js';

// Classe servant de fabrique pour tout les datamappers. Il n'est pas utilisé directement.
export default class CoreDatamapper {
  static ReadTableName;
  static WriteTableName;

  // Méthode permetant la récupération de tout les élements d'une table.
  static async findAll({where, orderBy, limit, offset}={}) {
    let query = {
      text: `SELECT * FROM ${this.ReadTableName}`,
      values: []
    };

    if (where) {
      query = this.addWhereToQuery(where, query);
    }
    if (orderBy) {
      query = this.addOrderByToQuery(orderBy, query);
    }
    if (limit) {
      query = this.addLimitToQuery(limit, query);
    }
    if (offset) {
      query = this.addOffsetToQuery(offset, query);
    }

    const result = await pool.query(query);
    return result.rows;
  }

  // Méthode permetant de récuper un élément par son ID.
  static async findByPk(id) {
    const result = await pool.query(`SELECT * FROM ${this.ReadTableName} WHERE id = $1`, [id]);
    return result.rows[0];
  }

  // Permet d'effectuer un eregistrement dans la table.
  static async create(data) {
    // Converti un objet en array de tupples [key, value]
    const propertyList = Object.entries(data);

    // Construction de la requête préparé
    const query ={
      text: `
        INSERT INTO ${this.WriteTableName} (
          ${propertyList.map(([key,_]) => `"${key}"`).join(", ")}
        ) VALUES (
          ${propertyList.map((_,index) => `$${index + 1}`).join(", ")}
        )
        RETURNING *;`,
      values: propertyList.map(([_,value]) => value)
    }

    // Effectue la requête via le module PG
    const result = await pool.query(query);
    
    return result.rows[0];
  }

  static addWhereToQuery(where, query) {
    let result = query;
    result.text += " WHERE ";

    const [newText, newValues] = this.addConditionToQuery(where, result);
    result.values = newValues;
    result.text += newText;
    return result;
  }
  static addConditionToQuery(where, query) {
    let result = {text: "", values: query.values};

    result.text += "(" + where.conditions.map((condition) => {
      if (condition.separator) {
        const [newText, newValues] = this.addConditionToQuery(condition, result);
        result.values = newValues;
        return newText;
      }

      if (this.queryAdaptator) {
        const [newText, newValues] = this.queryAdaptator(condition, result);
        result.values = newValues;
        return newText;
      }

      let value = condition.value;
      if (condition.operator === "ilike") {
        value = `%${value}%`;
      }

      result.values.push(value);
      return `("${condition.propertyName}" ${condition.operator} $${result.values.length})`;

    }).join(` ${where.separator} `) + ")";
    return [result.text, result.values];
  }
  static addOrderByToQuery(orderBy, query) {
    let result = query;
    result.text += " ORDER BY ";

    result.text += orderBy.map(order => {
      return `"${order[0]}" ${order[1] || "ASC"}`;
    }).join(", ");

    return result;
  }
  static addLimitToQuery(limit, query) {
    let result = query;
    result.values.push(limit);
    result.text += ` limit $${result.values.length}`;
    return result;
  }
  static addOffsetToQuery(offset, query) {
    let result = query;
    result.values.push(offset);
    result.text += ` offset $${result.values.length}`;
    return result;
  }
}