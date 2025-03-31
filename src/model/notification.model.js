const getNotificationModel = (db) => {
  return db.collection("app_notifications");
};
module.exports = { getNotificationModel };
