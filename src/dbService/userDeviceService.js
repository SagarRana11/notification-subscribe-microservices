const {ObjectId} = require('mongodb');
const { getDeviceModel } = require('../model/device.model');
const getUserDevices = async ( userId, db ) => {
  const appUserDeviceModel = getDeviceModel(db);

  const devices = await appUserDeviceModel.findOne({
    "user._id": new ObjectId(userId),
  });
  return devices;
};

module.exports = {getUserDevices}
