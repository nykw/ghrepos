import { FC, SyntheticEvent, useEffect } from 'react';
import { signInWithGitHub } from '../../lib/github/signIn';
import Link from 'next/link';
import getUserInfo from '../../lib/github/userInfo';
import { useDispatch, useSelector } from 'react-redux';
import { cookieSlice, CookieState } from '../../features/cookie';
import { signOut } from '../../lib/github/signOut';
import { setCookies } from '../../lib/cookie';
import { useRouter } from 'next/dist/client/router';

type Props = {
  siteName: string;
};

const Header: FC<Props> = ({ siteName }) => {
  const { displayName, accessToken, avatarUrl } = useSelector<CookieState, CookieState>(
    (state) => state,
  );
  const dispatch = useDispatch();
  const { register } = cookieSlice.actions;
  const router = useRouter();

  // Sign Inボタンがクリックされたときの処理
  const signInHander = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      // Firebase Authを使ってGitHub認証を使ったサインインを行い、サインインしたユーザー情報を取得する
      const { user, credential } = await signInWithGitHub();

      // GitHubからユーザー情報を取得する
      const userInfo = await getUserInfo(user.displayName);

      // Reduxにアクションを発行する
      dispatch(
        register({
          displayName: user.displayName,
          accessToken: credential.accessToken,
          avatarUrl: userInfo.avatar_url,
        }),
      );

      // 検索ページに遷移する
      router.push('/search');
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

  // Sign Outボタンがクリックされたときの処理
  const signOutHandler = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      // Firebase Authでサインアウトを行う
      await signOut();

      // Reduxにアクションを発行する
      dispatch(
        register({
          displayName: undefined,
          accessToken: undefined,
          avatarUrl: undefined,
        }),
      );

      // トップページに遷移する
      router.push('/');
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

  // グローバルステートの変更をCookieに伝える
  useEffect(() => {
    setCookies({ displayName, accessToken, avatarUrl });
  }, [displayName, accessToken, avatarUrl]);

  return (
    <header className="py-3">
      <div className="flex items-center justify-between">
        <div className="p-5">
          <Link href="/">
            <button className="font-bold text-4xl">{siteName}</button>
          </Link>
        </div>

        <div className="flex w-1/7 space-x-2 mx-5">
          {accessToken && (
            <Link href={`/users/${displayName}`}>
              <img src={avatarUrl!} className="h-10 w-10 rounded-full cursor-pointer shadow-sm" />
            </Link>
          )}

          <div>
            {accessToken ? (
              <button className="btn btn-white " onClick={signOutHandler}>
                Sign out
              </button>
            ) : (
              <button className="btn btn-white" onClick={signInHander}>
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
