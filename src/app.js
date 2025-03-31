require('dotenv').config();
const express = require("express");
const connectDb = require("./config/dbConnect");
const { callRespectiveJobs } = require("./utils/workerMethods");
const { getQueueInstance } = require("./utils/myQueue");
const app = express();
const port = process.env.PORT;
let db = null;
const myQueue = getQueueInstance();

connectDb().then((value) => {
  console.log("🚀 ~ connectDb ~ value:", value);
  db = value;
  myQueue.process(async (job) => {
    callRespectiveJobs(job, db)
  })
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});


