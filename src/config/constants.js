const REDIS_SERVER_URL = process.env.REDIS_SERVER_URL;
const PORT = process.env.PORT;
const PROJECT_ID = process.env.PROJECT_ID;
const SERVICE_ACCOUNT_ID = process.env.SERVICE_ACCOUNT_ID;
const CONFIG = process.env.CONFIG;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PWD = process.env.MONGO_PWD;
const MONGO_ADMIN_DB = process.env.MONGO_ADMIN_DB;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;
const AUTH_ENABLED = process.env.AUTH_ENABLED;

module.exports = {
  REDIS_SERVER_URL,
  PORT,
  PROJECT_ID,
  SERVICE_ACCOUNT_ID,
  CONFIG,
  MONGO_USER,
  MONGO_PWD,
  MONGO_ADMIN_DB,
  MONGO_URI,
  AUTH_ENABLED,
  DB_NAME,
};
