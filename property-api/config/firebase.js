// import admin from 'firebase-admin';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Resolve the path to the JSON file
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const serviceAccountPath = path.join(__dirname, 'yuyiii-login-firebase.json');

// // Read and parse the JSON file
// const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// export default admin;

import admin from 'firebase-admin';

// Read and parse the JSON file
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
