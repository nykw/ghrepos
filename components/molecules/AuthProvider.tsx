import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CookieState } from '../../features/cookie';
import { setCookies } from '../../lib/cookie';

const AuthProvider: FC = ({ children }) => {
  const { displayName, accessToken, avatarUrl, idToken } = useSelector<CookieState, CookieState>(
    (state) => state,
  );

  // グローバルステートの変更をCookieに伝える
  useEffect(() => {
    setCookies({ displayName, accessToken, avatarUrl, idToken });
  }, [displayName, accessToken, avatarUrl, idToken]);

  return <>{children}</>;
};

export default AuthProvider;
