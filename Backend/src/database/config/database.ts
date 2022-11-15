import { Options } from 'sequelize';

const config: Options = {
  username: 'postgres',
  password: '1234',
  database: 'ng_cash',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false,
}

module.exports = config;
