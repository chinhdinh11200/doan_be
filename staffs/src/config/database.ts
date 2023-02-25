import dotenv from 'dotenv';

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
    "dialect": dialect
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
