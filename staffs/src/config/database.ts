import dotenv from 'dotenv';
import createDebug from 'debug';
const debug = createDebug('sequelize');

dotenv.config();

const host = process.env.DB_HOST
const username = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME
const port = process.env.DB_PORT
const dialect = process.env.DIALECT

module.exports = {
  "development": {
    "username": username,
    "password": password,
    "database": database,
    "port": port,
    "host": host,
    "dialect": dialect,
    "logging": (logStr: string, time: number) => {
      debug(`${logStr} (took ${time}ms)`);
    },
  },
  "test": {
    "username": username,
    "password": password,
    "database": database,
    "port": port,
    "host": host,
    "dialect": dialect
  },
  "production": {
    "username": username,
    "password": password,
    "database": database,
    "port": port,
    "host": host,
    "dialect": dialect
  }
}
