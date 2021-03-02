/**
 * Firebase appの初期化を行う。
 */

import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// 初期化していない場合は初期化を行う。
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

/** 初期化済みのAuth app */
export const auth = firebase.auth();

// see https://firebase.google.com/docs/auth/web/github-auth?hl=ja#handle_the_sign-in_flow_with_the_firebase_sdk
/** GitHubAuthプロバイダー */
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
githubAuthProvider.setCustomParameters({
  client_id: process.env.CLIENT_ID,
});
export { githubAuthProvider };
