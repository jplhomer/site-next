const admin = require('firebase-admin');

const loadCredentials = () => JSON.parse(Buffer.from(process.env.GCLOUD_CREDENTIALS, 'base64').toString('ascii'));

try {
  admin.initializeApp({
    credential: admin.credential.cert(loadCredentials()),
  });
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

module.exports = admin.firestore();
