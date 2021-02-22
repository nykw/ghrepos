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

export const loginWithGitHub = async (): Promise<User> => {
  if (firebase.apps.length === 0) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  const provider = new firebase.auth.GoogleAuthProvider();

  try {
    const credential = await firebase.auth().signInWithPopup(provider);

    const user = credential.user;

    if (!user) throw new Error('User not found');

    const { displayName, email } = user;

    return { displayName, email } as User;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
    throw e;
  }
};
