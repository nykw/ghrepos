import {FC, useEffect} from "react";
import {useSelector} from "react-redux";
import {CookieState} from "../../features/cookie";
// import {auth} from "../../lib/auth";
import {setCookies} from "../../lib/cookie";

const AuthProvider: FC = ({children}) => {
  const {displayName, accessToken, avatarUrl, idToken, username} =
    useSelector<CookieState, CookieState>(
        (state) => state,
    );

  // グローバルステートの変更をCookieに伝える
  useEffect(() => {
    setCookies({displayName, accessToken, avatarUrl, idToken, username});
  }, [displayName, accessToken, avatarUrl, idToken, username]);

  return <>{children}</>;
};

export default AuthProvider;
