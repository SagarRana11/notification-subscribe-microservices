const { ObjectID } = require("mongodb");

const {
  insertAppNotificationData,
} = require("../dbService/notificationService");
const { getUserDevices } = require("../dbService/userDeviceService");
const admin = require("../config/firebaseConfig");
const { insertFirebaseLog } = require("../dbService/firebaseService");
const {
  getNewNotificationBody,
  getBatchingArray,
  getAppNotificationPayload,
  getNotificationPayload,
} = require("../utils/notificationHelpers");
const socketService = require('../config/socketConfig')

const notificationService = async (job, db) => {
  const userDetails = job.data.user;
  const result = job.data.payload;
  const params = ({
    title,
    message,
    data = {},
    isNewService = false,
    sound = null,
    vibrate = null,
  } = result);
  const userIds = result.userIds;
  const batchedArrayOfUsers = getBatchingArray(userIds);
  for (const batchedUsers of batchedArrayOfUsers) {
    for (const user of batchedUsers) {
      const userId = user._id;
      if (userId === userDetails._id && title != "Test Alarm!") return;
      const payload = getAppNotificationPayload(user, result);
      await insertAppNotificationData(payload, db, userDetails);
      const devices = await getUserDevices(userId, db);
      if (!devices) return;
      for (const device of devices) {
        const notificationPayload = getNotificationPayload(params, device);
        const finalPayload = getNewNotificationBody({
          params: notificationPayload,
        });
        const startTime = Date.now();
        try {
          await admin.messaging().send(finalPayload);
          socketService.emit("fcm_app_notification", `${userId}-notif`);
        } catch (err) {
          const error = err.errorInfo && err.errorInfo || err;
          const endTime = Date.now();
          const totalTime = Math.abs(endTime - startTime);
          await insertFirebaseLog(
            {
              startTime: startTime,
              endTime: endTime,
              error: error,
              totalTime: totalTime,
              status: "failure",
              user: { _id: ObjectID(userId) },
            },
            db
          );
        }
      }
    }
  }
};

module.exports = { notificationService };
