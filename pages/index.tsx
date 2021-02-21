import Template from '../components/template';
import login from '../lib/github/login';
import { SyntheticEvent } from 'react';

export default function Index() {
  const handleClick = async (e: SyntheticEvent<HTMLButtonElement>) => {
    try {
      const credential = await login();
      console.log(credential);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

  return (
    <Template pageName="GitHub Search">
      <button
        className="bg-blue-700 h-10 w-20 font-bold text-white rounded-md"
        onClick={handleClick}
      >
        ログイン
      </button>
    </Template>
  );
}
