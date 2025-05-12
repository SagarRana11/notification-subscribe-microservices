const { ObjectId } = require("mongodb");

const { getRespectiveModel } = require("../utils/dbHelpers");
const { APP_NOTIFICATIONS } = require("../model/collectionsName");

const insertAppNotificationData = async (payload, db, userDetails) => {
  const appUserNotificationModel = getRespectiveModel(db, APP_NOTIFICATIONS);

  const result = await appUserNotificationModel.insertOne({
    ...payload,
    read: false,
    _createdOn: new Date(),
    _createdBy: { _id: new ObjectId(userDetails._id) },
    __txs__: {},
  });
  return result && result.ops && result.ops[0];
};

module.exports = { insertAppNotificationData };
