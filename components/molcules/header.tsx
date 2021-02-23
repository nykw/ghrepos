import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { signInWithGitHub } from '../../lib/github/signin';
import Link from 'next/link';
import getUserInfo from '../../lib/github/userInfo';
import { signOut } from '../../lib/github/signOut';

type Props = {
  siteName: string;
};

const Header: FC<Props> = ({ siteName }) => {
  const [displayName, setDisplayName] = useState<string | undefined>(parseCookies().displayName);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();

  // Sign Inボタンがクリックされたときの処理
  const signInHander = async (e: SyntheticEvent<HTMLButtonElement>) => {
    try {
      // Firebase Authを使ってGitHub認証を使ったログインを行い、ログインしたユーザー情報を取得する
      const user = await signInWithGitHub();

      console.log(user);
      setDisplayName(user.displayName);

      // GitHubからユーザー情報を取得する
      const userInfo = await getUserInfo(user.displayName);
      setAvatarUrl(userInfo.avatar_url);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

  // Sign Outボタンがクリックされたときの処理
  const signOutHandler = async (e: SyntheticEvent<HTMLButtonElement>) => {
    await signOut();
    setDisplayName(undefined);
    setAvatarUrl(undefined);
  };

  // stateが変更されたら、cookieに反映させる。
  useEffect(() => {
    // displayName
    if (typeof displayName === 'string') {
      setCookie(null, 'displayName', displayName);
    } else {
      destroyCookie(null, 'displayName');
    }

    // avatarUrl
    if (typeof avatarUrl === 'string') {
      setCookie(null, 'avatarUrl', avatarUrl);
    } else {
      destroyCookie(null, 'avatarUrl');
    }
  }, [displayName, avatarUrl]);

  return (
    <header className="h-20 bg-gray-100">
      <h1 className="font-bold font-mono text-4xl box-content object-center">{siteName}</h1>
      <div>
        {displayName ? (
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
