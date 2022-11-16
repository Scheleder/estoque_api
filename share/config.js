require('dotenv').config(); 
const db_name = process.env.DB_DATABASE;
const db_user = process.env.DB_USERNAME;
const db_pass = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOSTNAME;
const db_type = process.env.DB_DATATYPE;

module.exports = {
  "development": {
      "username": db_user,
      "password": db_pass,
      "database": db_name,
      "host": db_host,
      "dialect": db_type
  },
  "test": {
    "username": db_user,
    "password": db_pass,
    "database": db_name,
    "host": db_host,
    "dialect": db_type
  },
  "production": {
    "username": db_user,
    "password": db_pass,
    "database": db_name,
    "host": db_host,
    "dialect": db_type
  }
};
