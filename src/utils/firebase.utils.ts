import admin from "firebase-admin";
import type { ServiceAccount } from "firebase-admin";

import serviceAccount from "../../firebaseServiceAccount.json";

    const storageBucketName = process.env.FIREBASE_STORAGE_BUCKET;
    if (!storageBucketName) {
        throw new Error("FIREBASE_STORAGE_BUCKET is not defined in .env");
      }
      

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    storageBucket: storageBucketName,
  });

const bucket = admin.storage().bucket();

export default bucket;
