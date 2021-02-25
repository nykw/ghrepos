import { parseCookies } from 'nookies';
import { FC, SyntheticEvent } from 'react';
import { signInWithGitHub } from '../../lib/github/signIn';
import Link from 'next/link';
import getUserInfo from '../../lib/github/userInfo';
import { useDispatch, useSelector } from 'react-redux';
import { cookieSlice, CookieState } from '../../features/cookie';
import { signOut } from '../../lib/github/signOut';
import { setCookies } from '../../lib/cookie';

type Props = {
  siteName: string;
};

const Header: FC<Props> = ({ siteName }) => {
  const { displayName, accessToken, avatarUrl } = useSelector<CookieState, CookieState>(
    (state) => state,
  );
  const dispatch = useDispatch();
  const { register } = cookieSlice.actions;

  // Sign Inボタンがクリックされたときの処理
  const signInHander = async (e: SyntheticEvent<HTMLButtonElement>) => {
    try {
      // Firebase Authを使ってGitHub認証を使ったサインインを行い、サインインしたユーザー情報を取得する
      const { user, credential } = await signInWithGitHub();

      // GitHubからユーザー情報を取得する
      const userInfo = await getUserInfo(user.displayName);

      // cookieに情報を登録する
      setCookies({
        displayName: user.displayName,
        accessToken: credential.accessToken,
        avatarUrl: userInfo.avatar_url,
      });

      // Reduxにアクションを発行する
      dispatch(
        register({
          displayName: parseCookies().displayName,
          accessToken: parseCookies().accessToken,
          avatarUrl: parseCookies().avatarUrl,
        }),
      );
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

  // Sign Outボタンがクリックされたときの処理
  const signOutHandler = async (e: SyntheticEvent<HTMLButtonElement>) => {
    // Firebase Authでサインアウトを行う
    await signOut();

    // cookieから情報を削除する
    setCookies({});

    // Reduxにアクションを発行する
    dispatch(register({}));
  };

  return (
    <header className="h-20 bg-gray-100">
      <div className="flex">
        <div className="p-5">
          <Link href="/">
            <h1 className="font-bold font-mono text-4xl flex-nowrap">{siteName}</h1>
          </Link>
        </div>

        <div className="flex md:flex-row p-5">
          {accessToken ? (
            <>
              <Link href="/search">
                <button className="btn btn-blue">Search</button>
              </Link>
              <div className="flex flex-row">
                <Link href={`/users/${displayName}`}>
                  <div className="flex flex-row">
                    <button className="btn btn-blue">
                      <div>{displayName} 's Page</div>
                    </button>
                    {avatarUrl && <img src={avatarUrl} className="h-10 w-10"></img>}
                  </div>
                </Link>
                <button className="btn btn-blue" onClick={signOutHandler}>
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <button className="btn btn-blue flex-right" onClick={signInHander}>
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
