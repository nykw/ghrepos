import * as functions from "firebase-functions";
import admin from "firebase-admin";
admin.initializeApp();

// ユーザー作成時に関数をトリガーする
export const createCollectionForUser = functions
    .region("asia-northeast1")
    .auth.user()
    .onCreate(async (user) => {
      if (user.displayName) {
        const writeResult = await admin
            .firestore()
            .collection("users")
            .add({displayName: user.displayName});

        functions.logger.log(`writeResult: ${writeResult}`);
      }
    });
