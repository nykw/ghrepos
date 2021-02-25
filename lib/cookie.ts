import { destroyCookie, setCookie } from 'nookies';

export type Cookie = {
  displayName?: string;
  accessToken?: string;
  avatarUrl?: string;
};

// 渡されたデータをCookieに登録する
export const setCookies = (cookie: Cookie): void => {
  Object.entries(cookie).forEach(([key, value]) => {
    if (value) {
      setCookie(null, key, value);
    } else {
      destroyCookie(null, key);
    }
  });
};
