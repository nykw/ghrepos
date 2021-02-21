import 'firebase/auth';
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCp8o5pV6OfPJIpaBF5UkcvstcloeaXpjo',
  authDomain: 'ghsearch-6e745.firebaseapp.com',
  projectId: 'ghsearch-6e745',
  storageBucket: 'PROJECT_ID.appspot.com',
  messagingSenderId: 'SENDER_ID',
  appId: 'ghsearch-6e745',
  measurementId: 'G-MEASUREMENT_ID',
};

const login = async (): Promise<firebase.User> => {
  if (firebase.apps.length === 0) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  // GitHub プロバイダ オブジェクトのインスタンスを作成します。
  const provider = new firebase.auth.GithubAuthProvider();

  try {
    const credential = await firebase.auth().signInWithPopup(provider);

    const user = credential.user;

    if (!user) throw new Error('user not found');

    return user;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    throw e;
  }
};
export default login;
