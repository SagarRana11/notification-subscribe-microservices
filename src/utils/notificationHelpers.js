const { ObjectId } = require("mongodb");

const getNewNotificationBody = ({ params }) => {
  let color;
  let {
    deviceId,
    title,
    message,
    icon,
    android_channel_id,
    sound = true,
    data,
    click_action,
  } = params;
  if (!deviceId) {
    throw new Error("deviceId must be provided to send notification");
  }

  let payload = {
    token: deviceId,
    notification: {
      title,
      body: message,
    },
    android: {
      priority: "high",
      notification: {
        notification_priority: "PRIORITY_MAX",
        visibility: "PUBLIC",
        sound: (sound && sound.toString()) || "notif",
        icon,
        color,
        channel_id: android_channel_id,
        vibrate_timings: ["10s"],
      },
    },
    webpush: {
      notification: {
        click_action: click_action,
      },
    },
    apns: {
      payload: {
        aps: {
          sound: (sound && sound.toString()) || "notif",
          icon,
          color,
          channel_id: android_channel_id,
          vibrate_timings: ["10s"],
        },
      },
    },
    data: {
      ...data,
      id: (data.id && data.id.toString()) || "",
      special_sound:
        (data.special_sound && data.special_sound.toString()) || "",
      title,
      message,
      sound: (data.sound && data.sound.toString()) || "",
      fromVideo: (data.fromVideo && data.fromVideo.toString()) || "",
      apiKey: (data.apiKey && data.apiKey.toString()) || "",
    },
  };
  return payload;
};

const getAppNotificationPayload = (user, result) => {
  let userId = user._id;
  const payload = {
    user: { _id: new ObjectId(userId) },
    date: new Date(),
    request_id: { _id: new ObjectId(result.data.id) },
    id: null,
    title: result.title,
    message: result.message,
  };
  return payload;
};

const getNotificationPayload = (params, device) => {
  const { device: deviceId, type } = device;
  params.deviceId = deviceId;
  params.type = type;
  return params;
};

const getBatchingArray = (userIds) => {
  const total = userIds.length;
  const groupElementMax = 100;
  const totalBatch = Math.ceil(total / groupElementMax);
  const batchingArray = [];
  for (let i = 0; i < totalBatch; i++) {
    if (i == totalBatch - 1) {
      batchingArray.push(userIds.slice(i * 100));
    } else batchingArray.push(userIds.slice(i * 100, i * 100 + 100));
  }
  return batchingArray;
};

module.exports = {
  getNewNotificationBody,
  getAppNotificationPayload,
  getNotificationPayload,
  getBatchingArray,
};
