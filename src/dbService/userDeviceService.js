const { ObjectId } = require("mongodb");

const { getRespectiveModel } = require("../utils/dbHelpers");
const { APP_USER_DEVICES } = require("../model/collectionsName");

const getUserDevices = async (userId, db) => {
  const appUserDeviceModel = getRespectiveModel(db, APP_USER_DEVICES);

  const cursor = await appUserDeviceModel.find({
    "user._id": new ObjectId(userId),
  });

  const devices = await cursor.toArray();
  return devices && devices;
};

module.exports = { getUserDevices };
