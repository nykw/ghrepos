import Template from '../components/molcules/template';
import login from '../lib/github/login';
import { SyntheticEvent } from 'react';
import { useRouter } from 'next/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

export default function Index() {
  const router = useRouter();

  const handleClick = async (e: SyntheticEvent<HTMLButtonElement>) => {
    try {
      const user = await login();

      console.log(user);
      console.log(user.email);
      console.log(user.displayName);

      router.push('/search');
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
      router.push('/');
    }
  };

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/search',
    signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
  };

  return (
    <Template pageName="GitHub Search">
      <button
        className="bg-blue-700 h-10 w-20 font-bold text-white rounded-md"
        onClick={handleClick}
      >
        ログイン
      </button>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}></StyledFirebaseAuth>
    </Template>
  );
}
