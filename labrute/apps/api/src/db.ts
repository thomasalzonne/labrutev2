import knex from 'knex';

const db = knex({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'toor',
    database: 'labrute',
  },
});
export default db;
