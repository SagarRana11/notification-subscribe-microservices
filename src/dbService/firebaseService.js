const { getRespectiveModel } = require("../utils/dbHelpers");
const { FIREBASE_ERROR_LOGS } = require("../model/collectionsName");

const insertFirebaseLog = async (payload, db) => {
  try {
    const FirebaseErrorLogsModel = getRespectiveModel(db, FIREBASE_ERROR_LOGS);
    await FirebaseErrorLogsModel.insertOne({
      ...payload,
      _createdOn: new Date(),
      __txs__: {},
    });
  } catch (err) {
    //handle it if needed in future
  }
};

module.exports = { insertFirebaseLog };
