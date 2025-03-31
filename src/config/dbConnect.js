const { MongoClient } = require("mongodb");

const dbName = "msh_old";

async function connectDb() {
  try {
    const dbURI = process.env.DBURI;
    console.log("🚀 ~ MongoDB URI:", dbURI);
    if (!dbURI) {
      throw new Error("Database connection URI is missing!");
    }
    const client = await MongoClient.connect(dbURI);
    const db = client.db(dbName);
    return db;
  } catch (e) {
    console.log("🚀 ~ main ~ e:", e);
  }
}

module.exports = connectDb;
