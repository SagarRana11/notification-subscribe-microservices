const admin = require('firebase-admin')
const projectId = process.env.PROJECT_ID 
const serviceAccountId = process.env.SERVICE_ACCOUNT_ID;
const serviceAccount = require('../../serviceAccountKey.json')
let firebaseAdminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: projectId,
  serviceAccountId: serviceAccountId,
});

module.exports ={firebaseAdminApp}