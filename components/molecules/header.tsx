import { parseCookies } from 'nookies';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { signInWithGitHub } from '../../lib/github/signin';
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
      <h1 className="font-bold font-mono text-4xl box-content object-center">{siteName}</h1>
      <div>
        {accessToken ? (
          <div>
            {avatarUrl && <img src={avatarUrl} className="h-10 w-10"></img>}
            <Link href={`/users/${displayName}`}>
              <button className="bg-blue-700 h-10 w-32 font-bold text-white rounded-md">
                {displayName} 's Page
              </button>
            </Link>{' '}
            <button
              className="bg-blue-700 h-10 w-32 font-bold text-white rounded-md"
              onClick={signOutHandler}
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-700 h-10 w-20 font-bold text-white rounded-md"
            onClick={signInHander}
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
