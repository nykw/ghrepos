import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { CookieState } from "../../features/cookie";
import { setCookies } from "../../lib/cookie";

const AuthProvider: FC = ({ children }) => {
  const { displayName, avatarUrl, username } = useSelector<
    CookieState,
    CookieState
  >((state) => state);

  // グローバルステートの変更をCookieに伝える
  useEffect(() => {
    setCookies({ displayName, avatarUrl, username });
  }, [displayName, avatarUrl, username]);

  return <>{children}</>;
};

export default AuthProvider;
