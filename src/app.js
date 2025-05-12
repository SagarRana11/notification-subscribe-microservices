require("dotenv").config();
const cors = require("cors");
const express = require("express");

const socketService = require("./config/socketConfig");
const connectDb = require("./config/dbConnect");
const { callRespectiveJobs } = require("./utils/workerMethods");
const { getQueueInstance } = require("./utils/notificationQueue");

const app = express();
app.use(cors());
app.use(express.json());

const { PORT } = require("./config/constants");
const notificationQueue = getQueueInstance();

socketService.connect();

connectDb().then((db) => {
  notificationQueue.process(async (job) => {
    await callRespectiveJobs(job, db);
  });
  app.listen(PORT, () => {
    console.log(`Server  listening on port ${PORT} ...`);
  });
});
