const Redis_Url = process.env.REDIS_SERVER_URL;
const Queue = require("bull");
const getQueueInstance = ()=>{
    const myQueue = new Queue("myQueue", Redis_Url);
    return myQueue;
}

module.exports = {getQueueInstance};