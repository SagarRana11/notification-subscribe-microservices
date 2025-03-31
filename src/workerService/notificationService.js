const { insertAppNotificationData } = require("../dbService/notificationService");
const { getUserDevices } = require("../dbService/userDeviceService");
const { getUser } = require("../dbService/userService");

const notificationService = async (job, db) => {
  console.log("we aaaaaaaaaaaaaaaaaaaaaa");
  const result = job.data.payload;
  const userIds = job.data.payload.userIds;
  console.log("userIds recieved from redis", userIds);
  const users = await getUser(userIds, db);
  console.log("all users>>>>>>>>>>>>>>>>>>>", users);

  users.forEach(async (user) => {
    let userId = user._id;
    const payload = {
      user: { _id: userId },
      date: new Date(),
      request_id: { _id: result.data.id },
      id: "",
      title: result.title,
      message: result.message,
    };
    const appNotificationData = await insertAppNotificationData(payload, db);
    console.log(
      "appNotificationData for every user>>>>>>>",
      appNotificationData
    );
    const devices = await getUserDevices(userId, db);
    console.log("device>>>>>>>>>>", devices);
  });
};

module.exports ={notificationService}