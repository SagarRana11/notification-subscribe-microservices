const { ObjectId } = require("mongodb");
const { getNotificationModel } = require("../model/notification.model");

const insertAppNotificationData = async (payload, db) => {
  const appUserNotiicationModel = getNotificationModel(db);

  const result = await appUserNotiicationModel.insert({
    payload,
  });
  return result.ops[0];
};

module.exports = { insertAppNotificationData };
