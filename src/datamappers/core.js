import pool from '../helpers/pgClient.js';

export default class CoreDatamapper {
  static ReadTableName;
  static WriteTableName;

  static async findAll() {
    let query = {
      text: `SELECT * FROM "${this.ReadTableName}"`,
      values: []
    };

    const result = await pool.query(query);
    return result.rows;
  }

  static async findByPk(id) {
    const result = await pool.query(`SELECT * FROM ${this.ReadTableName} WHERE id = $1`, [id]);
    return result.rows[0];
  }

  static async create(data) {
    // Converti un objet en array de tupples [key, value]
    const propertyList = Object.entries(data)

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
}