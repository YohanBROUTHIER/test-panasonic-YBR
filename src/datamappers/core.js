import client from '../helpers/pgClient.js';

export default class CoreDatamapper {
  static tableName;

  static async findAll() {
    let query = {
      text: `SELECT * ${this.tableName}`,
      values: []
    };

    const result = await client.query(query);
    return result.rows;
  }

  static async findByPk(id) {
    const result = await client.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
    return result.rows[0];
  }

  static async create(data) {
    // Converti un objet en array de tupples [key, value]
    const propertyList = Object.entries(data)

    // Construction de la requête préparé
    const query ={
      text: `
        INSERT INTO ${this.tableName} (
          ${propertyList.map(([key,_]) => `"${key}"`).join(", ")}
        ) VALUES (
          ${propertyList.map((_,index) => `$${index + 1}`).join(", ")}
        )
        RETURNING *;`,
      values: propertyList.map(([_,value]) => value)
    }

    // Effectue la requête via le module PG
    const result = await client.query(query);
    
    return result.rows[0];
  }
}