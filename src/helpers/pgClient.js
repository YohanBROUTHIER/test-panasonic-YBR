import pg from 'pg';

// Pool allow multiple connexion, but dont use for secure transaction
const pool = new pg.Pool();

// For transaction only
const client = new pg.Client();

export default pool;