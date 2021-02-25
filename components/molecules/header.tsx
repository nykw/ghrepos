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
    // Firebase Authでサインアウトを行う
    await signOut();

    // Reduxにアクションを発行する
    dispatch(register({}));

    // トップページに遷移する
    router.push('/');
  };

  // グローバルステートの変更をCookieに伝える
  useEffect(() => {
    setCookies({ displayName, accessToken, avatarUrl });
  }, [displayName, accessToken, avatarUrl]);

  return (
    <header className="h-20 bg-gray-300">
      <div className="grid grid-cols-10">
        <div className="p-5 col-start-1 col-end-5">
          <Link href="/">
            <button className="font-bold text-4xl">{siteName}</button>
          </Link>
        </div>

        {accessToken ? (
          <>
            <div className="col-start-7 col-end-9 p-5">
              <div className="w-50 h-10">
                <img src={avatarUrl!} className="mx-3 h-10 w-10 rounded-full"></img>
                <div className="">
                  <Link href={`/users/${displayName}`}>
                    <button className="btn btn-blue">
                      <div>{displayName} 's Profile</div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-5 col-start-9 col-end-10">
              <button className="btn btn-blue " onClick={signOutHandler}>
                Sign out
              </button>
            </div>
          </>
        ) : (
          <div className="p-5 col-start-9 col-end-10">
            <button className="btn btn-blue flex-right" onClick={signInHander}>
              Sign in
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
