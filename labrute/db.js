require('dotenv').config();
const Knex = require('knex');
const db = Knex({
  client: 'mysql2',
  connection: {
    host : 'localhost',
    user : 'root',
    password : 'azerty31',
    port: 3306
  }
});


db.raw(`DROP DATABASE db`)
.then(() => console.debug(`DEV - DROP DATABASE db`))
.catch(() => console.debug(`DEV - DATABASE DOES NOT EXIST db`))
.then(() => db.raw(`CREATE DATABASE db`))
.then(() => console.debug(`DEV - CREATE DATABASE db`))
.catch(() => console.debug(`DEV - DATABASE COULDN'T BE CREATED db`))
.then(() => process.exit())