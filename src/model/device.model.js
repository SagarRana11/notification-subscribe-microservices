const getDeviceModel = (db) => {
    return db.collection("app_user_devices");
  };
  module.exports = { getDeviceModel };
  