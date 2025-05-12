const admin = require("firebase-admin");

const { PROJECT_ID, SERVICE_ACCOUNT_ID } = require("./constants");
const serviceAccount = require("../../serviceAccountKey.json");

class ConnectFirebase {
  constructor() {
    if (ConnectFirebase.instance) return ConnectFirebase.instance;
    this.firebaseInstance = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: PROJECT_ID,
      serviceAccountId: SERVICE_ACCOUNT_ID,
    });

    ConnectFirebase.instance = this;
    return this;
  }
}

const adminApp = new ConnectFirebase();

module.exports = adminApp.firebaseInstance;
