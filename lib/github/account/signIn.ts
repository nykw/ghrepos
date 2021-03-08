import { auth, githubAuthProvider } from '../../auth';

type User = {
  displayName: string;
  email?: string;
  username: string;
};

type AuthCredential = {
  accessToken: string;
  providerId: string;
  signInMethod: string;
};

type Result = {
  user: User;
  credential: AuthCredential;
  idToken: string | undefined
};

/** GitHubアカウントを使ったサインインを行います。 */
export const signInWithGitHub = async (): Promise<Result> => {
  try {
    const userCredential = await auth.signInWithPopup(githubAuthProvider);

    console.log(userCredential);

    const {user, additionalUserInfo} = userCredential;
    const authCredential = userCredential.credential;

    const {username} = additionalUserInfo!
    if (!username) throw new Error("error")

    const idToken = await auth.currentUser?.getIdToken(true)

    const { displayName, email } = user as any
    const { accessToken, providerId, signInMethod } = authCredential as any

    return {
      user: {displayName, email, username},
      credential: {accessToken, providerId, signInMethod}, idToken
    };
  } catch (e) {
    // see https://firebase.google.com/docs/reference/js/firebase.auth.Auth?hl=ja#signinandretrievedatawithcredential
    switch (e.code as string) {
      case 'auth/account-exists-with-different-credential':
        throw new Error(
          '資格情報によって表明された電子メールアドレスを持つアカウントがすでに存在します。',
        );
      case 'auth/invalid-credential':
        throw new Error('資格情報の形式が正しくないか、有効期限が切れています。');
      case 'auth/operation-not-allowed':
        throw new Error();
      case 'auth/user-disabled':
        throw new Error();
      case 'auth/user-not-found':
        throw new Error();
      case 'auth/wrong-password':
        throw new Error();
      case 'auth/invalid-verification-code':
        throw new Error();
      case 'auth/invalid-verification-id':
        throw new Error();
      case 'auth/unauthorized-domain':
        throw new Error('このドメインは承認済みドメインではありません。');
      default:
        throw new Error('予期しないエラーです。');
    }
  }
};
