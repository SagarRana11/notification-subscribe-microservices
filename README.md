# VERSIONS

Node Version => 10.24.1
Redis => 6.0.16

// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;

