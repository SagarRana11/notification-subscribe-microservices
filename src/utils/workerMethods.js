const workerjobs = require("../workerService/index");

async function callRespectiveJobs(job, db) {
  console.log("job>>>>>>>>>>>>>>>>>>>>>>>",job)
  console.log("jobId>>>>>>>>>>>>>>>>>>>>>>>>>>>>.", job.data.jobId);
  console.log("payload>>>>>>>>>>>>>>>>", job.data.payload);
  const pickJob = workerjobs[job.data.jobId];
  console.log("pickJob>>>>>>>>>>>>>>>>>>>>>>>", pickJob);
  await pickJob(job, db);
}

module.exports = {
  callRespectiveJobs,
};

// { user: { _id: 65d2fc8bbac9574738f12807 },
// date: 2025-03-29T10:01:04.259Z,
// request_id: { _id: 67d126ea16116324e01713b1 },
// id: undefined,
// title: 'Patient Details Updated.',
// message: 'Patient details updated for Case ID:744' }
//   additionalParam>>>>>>>>>>>>>>>> { request_id: { _id: 67d126ea16116324e01713b1 } }
// notificationInsert>>>>> { id: undefined,
//   title: 'Patient Details Updated.',
//   message: 'Patient details updated for Case ID:744' }
