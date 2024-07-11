import pg from 'pg';

// Pool allow multiple connexion, but dont use for secure transaction
const client = new pg.Pool();

export default client;