const workerjobs = require("../workerService/index");

async function callRespectiveJobs(job, db) {
  const pickJob = workerjobs[job.data.jobId];
  await pickJob(job, db);
}

module.exports = {
  callRespectiveJobs,
};
