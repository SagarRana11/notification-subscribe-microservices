const Queue = require("bull");

const {REDIS_SERVER_URL} = require("../config/constants")

const getQueueInstance = ()=>{
    const notificationQueue = new Queue("notificationQueue", REDIS_SERVER_URL);
    return notificationQueue;
}

module.exports = {getQueueInstance};