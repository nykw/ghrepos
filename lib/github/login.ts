import 'firebase/auth';
import firebase from 'firebase/app';

const login = async (): Promise<firebase.User> => {
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
