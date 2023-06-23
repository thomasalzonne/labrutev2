module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host : '127.0.0.1',
        port : 3306,
        user : 'root',
        password : 'azerty31',
        database : 'db'
      },
      seeds: {
        directory: './data/seeds'
      }
    },
  };