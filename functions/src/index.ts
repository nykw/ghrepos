import * as functions from "firebase-functions";
import admin from "firebase-admin";
admin.initializeApp();

// ユーザー作成時に関数をトリガーする
export const createUserDoc = functions
    .region("asia-northeast1")
    .auth.user()
    .onCreate(async (user) => {
      if (user.displayName) {
        const {uid, displayName} = user;

        const writeResult = await admin
            .firestore()
            .collection("users")
            .doc(displayName)
            .set({displayName, uid});

        functions.logger.log(`writeResult: ${writeResult}`);
      }
    });

// ユーザー削除時に関数をトリガーする
export const deleteUserDoc = functions
    .region("asia-northeast1")
    .auth.user()
    .onDelete(async (user) => {
      if (user.displayName) {
        const {displayName} = user;

        const writeResult = await admin.
            firestore().collection("users").doc(displayName).delete();

        functions.logger.log(`writeResult: ${writeResult}`);
      }
    });
