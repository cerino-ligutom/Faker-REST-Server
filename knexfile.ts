import { Config } from 'knex';

export const config: Config = {
  client: 'sqlite3',
  connection: {
    filename: './faker-server-rest.db'
  },
  useNullAsDefault: true,
  migrations: {
    directory: './src/db/migrations'
  },
  seeds: {
    directory: './src/db/seeds'
  }
};

module.exports = config;
