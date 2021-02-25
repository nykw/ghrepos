import Link from 'next/link';
import { useSelector } from 'react-redux';
import Template from '../components/molecules/template';
import { CookieState } from '../features/cookie';

export default function Index() {
  const { accessToken } = useSelector<CookieState, CookieState>((state) => state);

  return (
    <Template pageName="GitHub Search">
      <div className="flex-col my-10">
        <h1 className="text-center flex-grow-0">GitHub Search</h1>
        <p className="text-center mt-7 font-bold">
          入力したユーザー名のGitHubユーザー情報を表示します。
        </p>
        <div className="mt-5 text-center">
          <Link href="/search">
            <button className="btn btn-blue">Search</button>
          </Link>
        </div>
      </div>
    </Template>
  );
}
