import firebase from 'firebase';
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

type User = {
  displayName: string;
  email?: string;
};

export const signInWithGitHub = async (): Promise<User> => {
  if (firebase.apps.length === 0) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  // see https://firebase.google.com/docs/auth/web/github-auth?hl=ja#handle_the_sign-in_flow_with_the_firebase_sdk
  const provider = new firebase.auth.GithubAuthProvider();
  provider.addScope('repo');
  provider.setCustomParameters({
    client_id: process.env.CLIENT_ID,
  });

  // // GitHub認証が何故か使えないので、一時的にGoogle認証で代用しています。
  // const provider = new firebase.auth.GoogleAuthProvider();

  try {
    const credential = await firebase.auth().signInWithPopup(provider);

    const user = credential.user;

    if (!user) throw new Error('User not found');

    return user as User;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
    throw e;
  }
};
