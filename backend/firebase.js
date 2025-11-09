const admin = require('firebase-admin');
const serviceAccount = require('./careerplatform-4a8b4-firebase-adminsdk-fbsvc-8cffafbdfe.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'careerplatform-4a8b4.firebasestorage.app'
});

const db = admin.firestore();
const storage = admin.storage();

module.exports = { db, storage };
