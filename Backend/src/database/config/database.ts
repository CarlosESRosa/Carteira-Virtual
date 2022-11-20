import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '1234',
  database: 'ng_cash',
  host: 'api.localhost',
  port: Number(process.env.DB_PORT) || 5432,
  dialect: 'postgres',
  logging: false,
}



module.exports = config;
