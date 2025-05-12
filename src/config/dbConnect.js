const { MongoClient } = require("mongodb");

const {
  MONGO_URI,
  AUTH_ENABLED,
  MONGO_USER,
  MONGO_PWD,
  MONGO_ADMIN_DB,
  DB_NAME,
} = require("./constants");

async function connectDb() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URI, async (err, client) => {
      if (err) {
        return reject(err);
      }

      try {
        if (AUTH_ENABLED) {
          const adminDb = client.db(MONGO_ADMIN_DB);
          const authResult = await adminDb.authenticate(MONGO_USER, MONGO_PWD);
          if (!authResult) {
            return reject(new Error("DB Authentication Failed"));
          }
        }

        const db = client.db(DB_NAME);
        resolve(db);
      } catch (authError) {
        reject(authError);
      }
    });
  });
}

module.exports = connectDb;
