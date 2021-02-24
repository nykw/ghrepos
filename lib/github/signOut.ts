import firebase from 'firebase/app';
import 'firebase/auth';

export const signOut = async () => {
  try {
    if (firebase.apps.length > 0) {
      firebase.auth().signOut();
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    throw e;
  }
};
